import { defineEventHandler, type EventHandler, type EventHandlerRequest, type H3Event } from "h3";
import consola from "consola";
import type { RuntimeConfig } from "@nuxt/schema";
import { AutoFormatter } from "../../formatters";
import type { FormatterDataType } from "../../types";
import { MAIN_HEADER_KEY, MAIN_HEADER_VALUE } from "../../utils";
import { definePresetHandler } from "./define-preset-handler";
import { defineErrorHandler } from "./define-error-handler";

export type InterceptRequestOptions = {
  defaultPreset?: string;
} & ({ routeRegExp: RegExp; forceRouteMatch: false; } | { forceRouteMatch: true; });

export const interceptRequest = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
  runtimeConfig: RuntimeConfig,
  options: InterceptRequestOptions = { forceRouteMatch: true },
): EventHandler<T, D> => defineErrorHandler(definePresetHandler(defineEventHandler<T>(async (event: H3Event) => {
  const { mockServer } = runtimeConfig;

  // @ts-expect-error For some reason #imports isn't recognized ONLY when calling `tsc --noEmit` through `test:types`
  const nitro = useNitroApp();

  if (
    (!options.forceRouteMatch && !options?.routeRegExp.test(event.path))
    || event.headers.get(MAIN_HEADER_KEY) === MAIN_HEADER_VALUE.IGNORE
    || !mockServer?.enabled
  ) {
    return handler(event);
  }

  const formatter = new AutoFormatter(`${mockServer.mockDir}/${event.context.preset}`, consola.error);

  const mockResponse = await formatter.get(event.path);

  if (mockResponse) {
    const { body, headers, status } = mockResponse;

    event.respondWith(new Response(body, {
      headers,
      status,
    }));
    return;
  }

  const localResponse = await nitro.localFetch(event.path, {
    method: "GET",
    cache: "no-cache",
    headers: {
      [MAIN_HEADER_KEY]: MAIN_HEADER_VALUE.IGNORE,
    },
  });

  if (localResponse.ok) {
    const { body, headers, status } = await formatter.create({
      meta: {
        preset: event.context.preset,
        path: event.path,
        lastModified: new Date(),
        headers: {
          ...Object.fromEntries(localResponse.headers.entries()),
          "content-type": localResponse.headers.get("content-type") as FormatterDataType || "text/plain",
        },
      },
      response: localResponse,
    });

    event.respondWith(new Response(body, {
      headers,
      status,
    }));

    event.headers.set(MAIN_HEADER_KEY, MAIN_HEADER_VALUE.CREATED);
  }

  return handler(event);
}), {
  defaultPreset: options?.defaultPreset,
}));
