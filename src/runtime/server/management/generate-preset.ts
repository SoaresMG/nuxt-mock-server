import consola from "consola";
import type { createFetch as createLocalFetch } from "unenv/runtime/fetch/index";
import type { RuntimeConfig } from "@nuxt/schema";
import { MAIN_HEADER_KEY, PRESET_GENERATION_HEADER_KEY } from "../../utils";
import { useNitroApp } from "#imports";

async function request(localFetch: ReturnType<typeof createLocalFetch>, route: string, preset: string, isAutoMode: boolean, debug: boolean) {
  try {
    const response = await localFetch(route, {
      method: "GET",
      cache: "no-cache",
      headers: {
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
  }
  catch (e) {
    consola.error(`[mock-server] Failed to generate ${route}`, e);
    throw e;
  }
}

export const generatePreset = async (
  runtimeConfig: RuntimeConfig,
  _preset: string | undefined = undefined,
) => {
  const nitro = useNitroApp();

  const { mockServer: { defaultPreset, generate, auto, debug } = {} } = runtimeConfig;
  const preset = _preset || defaultPreset;

  if (!generate || !generate.routes?.length) {
    throw new TypeError("[mock-server] Generation is not enabled");
  }

  if (!preset) {
    throw new TypeError("[mock-server] Generation cannot proceed due to `preset` not being defined");
  }

  const routes = generate.routes || [];
  await nitro.hooks.callHook("mock-server:extendRoutes", { routes, preset });

  if (generate.parallel) {
    const routeCalls = await Promise.allSettled(routes.map(route => request(nitro.localFetch, route, preset, !!auto, !!debug)));

    const successfullCalls = routeCalls.filter(call => call.status === "fulfilled");
    const failedCalls = routeCalls.filter(call => call.status === "rejected");

    if (routeCalls.length && debug) {
      consola.info(`[mock-server] Generated ${successfullCalls.length} routes${failedCalls.length ? `and failed for ${failedCalls.length} routes` : ""}`);
    }
  }
  else {
    for (const route of routes) {
      await request(nitro.localFetch, route, preset, !!auto, !!debug);
    }
  }
};
