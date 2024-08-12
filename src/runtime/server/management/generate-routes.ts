import consola from "consola";
import type { createFetch as createLocalFetch } from "unenv/runtime/fetch/index";
import type { RuntimeConfig } from "@nuxt/schema";
import type { NitroApp } from "nitropack";
import { MAIN_HEADER_KEY, PRESET_GENERATION_HEADER_KEY } from "../../utils";
import { useNitroApp } from "#imports";

async function request(localFetch: ReturnType<typeof createLocalFetch>, route: string, preset: string, isAutoMode: boolean) {
  try {
    const response = await localFetch(route, {
      method: "GET",
      cache: "no-cache",
      headers: {
        [PRESET_GENERATION_HEADER_KEY]: preset,
      },
    });

    if (!response.headers.has(MAIN_HEADER_KEY)) {
      consola.warn(isAutoMode
        ? `[Mock Server] Route ${route} was set but not catched by \`pathMatch\` nor by any \`defineMockInterceptorHandler\`.`
        : `[Mock Server] Route ${route} was set but not catched by an handler with \`defineMockInterceptorHandler\`.`,
      );
      return;
    }
  }
  catch (e) {
    consola.error(`[Mock Server] Failed to generate ${route}`, e);
    throw e;
  }
}

export const generateRoutes = async (
  runtimeConfig: RuntimeConfig,
  _nitro?: NitroApp,
  preset: string | undefined = undefined,
) => {
  const nitro = _nitro || useNitroApp();

  const { mockServer: { preset: DefaultPreset, generate, auto } = {} } = runtimeConfig;
  const _preset = preset || DefaultPreset;

  if (!generate) {
    throw new TypeError("[Mock Server] Generation is not enabled");
  }

  if (!_preset) {
    throw new TypeError("[Mock Server] Generation cannot proceed due to `preset` not being defined");
  }

  const routes: string[] = [...generate.routes || []];
  await nitro.hooks.callHook("mock-server:extendRoutes", routes);

  if (generate.parallel) {
    const routeCalls = await Promise.allSettled(routes.map(route => request(nitro.localFetch, route, _preset, !!auto)));

    const successfullCalls = routeCalls.filter(call => call.status === "fulfilled");
    const failedCalls = routeCalls.filter(call => call.status === "rejected");

    if (routeCalls.length) {
      consola.info(`[Mock Server] Generated ${successfullCalls.length} routes${failedCalls.length ? `and failed for ${failedCalls.length} routes` : ""}`);
    }
  }
  else {
    for (const route of routes) {
      await request(nitro.localFetch, route, _preset, !!auto);
    }
  }
};
