import consola from "consola";
import type { createFetch as createLocalFetch } from "unenv/runtime/fetch/index";
import type { H3Event } from "h3";
import { MAIN_HEADER_KEY, PRESET_GENERATION_HEADER_KEY, transformHeaders } from "../../utils";
import { getPreset } from "./get-preset";
import { deleteMockFiles } from "./delete-mock-files";
import { useNitroApp, useRuntimeConfig } from "#imports";

export interface GeneratePresetOptions {
  cleanUnused?: boolean;
  _preset?: string | undefined;
}

export const generatePreset = async (
  event: H3Event,
  { _preset, cleanUnused }: GeneratePresetOptions = {},
) => {
  const nitro = useNitroApp();

  const { mockServer: { defaultPreset, generate, auto, debug } = {} } = useRuntimeConfig(event);
  const presetName = _preset || defaultPreset;

  if (!presetName) {
    throw new TypeError("[mock-server] Generation cannot proceed due to `preset` not being defined");
  }

  const routes = generate?.routes || [];
  await nitro.hooks.callHook("mock-server:extendRoutes", { routes, preset: presetName });

  if (!routes.length) {
    consola.warn("[mock-server] No routes to generate");
    return;
  }

  consola.info(`[mock-server] Generating ${routes.length} routes for preset ${presetName}`);

  if (generate?.parallel) {
    const routeCalls = await Promise.allSettled(
      routes.map(route => request(
        nitro.localFetch,
        event.headers,
        route,
        presetName,
        !!auto,
        !!debug,
      )),
    );

    const successfullCalls = routeCalls.filter(call => call.status === "fulfilled");
    const failedCalls = routeCalls.filter(call => call.status === "rejected");

    if (routeCalls.length && debug) {
      consola.info(`[mock-server] Generated ${successfullCalls.length} routes${failedCalls.length ? `and failed for ${failedCalls.length} routes` : ""}`);
    }
  }
  else {
    for (const route of routes) {
      await request(nitro.localFetch, event.headers, route, presetName, !!auto, !!debug);
    }
  }

  if (cleanUnused) {
    const presetStructure = await getPreset(event, presetName);
    const filePaths = presetStructure.entries.map(x => x.meta.path);
    const deltaPaths = filePaths.filter(x => !routes.includes(x));

    if (deltaPaths.length) {
      await deleteMockFiles(event, {
        preset: presetName,
        files: deltaPaths,
      });
    }

    consola.info(`[mock-server] Deleted ${deltaPaths.length} unused routes for preset ${presetName}`);
  }
};

async function request(
  localFetch: ReturnType<typeof createLocalFetch>,
  headers: Headers,
  route: string,
  preset: string,
  isAutoMode: boolean,
  debug: boolean,
) {
  try {
    const response = await localFetch(route, {
      method: "GET",
      cache: "no-cache",
      headers: {
        ...transformHeaders(headers),
        [PRESET_GENERATION_HEADER_KEY]: preset,
      },
    });

    if (!response.headers.has(MAIN_HEADER_KEY) && debug) {
      consola.warn(isAutoMode
        ? `[mock-server] Route ${route} was set but not catched by \`pathMatch\` nor by any \`defineMockInterceptorHandler\`.`
        : `[mock-server] Route ${route} was set but not catched by an handler with \`defineMockInterceptorHandler\`.`,
      );
      return;
    }
    else if (debug) {
      consola.success(`[mock-server] ${route}`);
    }

    return false;
  }
  catch (e) {
    consola.error(`[mock-server] ${route}`, e);
    throw e;
  }
}
