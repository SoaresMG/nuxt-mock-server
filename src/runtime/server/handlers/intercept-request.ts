import { defineEventHandler, type EventHandler, type EventHandlerRequest, type H3Event } from "h3";
import consola from "consola";
import { AutoFormatter } from "../../formatters";
import type { FormatterDataType } from "../../types";
import { MAIN_HEADER_KEY, MAIN_HEADER_VALUE, transformHeaders } from "../../utils";
import { definePresetHandler } from "./define-preset-handler";
import { useNitroApp, useRuntimeConfig } from "#imports";

export type InterceptRequestOptions = {
  defaultPreset?: string;
} & ({ routeRegExp: RegExp; forceRouteMatch: false; } | { forceRouteMatch: true; });

export const interceptRequest = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
  options: InterceptRequestOptions = { forceRouteMatch: true },
): EventHandler<T, D> => definePresetHandler(defineEventHandler<T>(async (event: H3Event) => {
  const { mockServer } = useRuntimeConfig(event);

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

    await event.respondWith(new Response(body, {
      headers,
      status,
    }));
    return;
  }

  const localResponse = await nitro.localFetch(event.path, {
    method: "GET",
    cache: "no-cache",
    headers: {
      ...transformHeaders(event.headers),
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
          ...transformHeaders(localResponse.headers),
          "content-type": localResponse.headers.get("content-type") as FormatterDataType || "text/plain",
        },
      },
      response: localResponse,
    });

    await event.respondWith(new Response(body, {
      headers,
      status,
    }));

    event.headers.set(MAIN_HEADER_KEY, MAIN_HEADER_VALUE.CREATED);
    return;
  }

  return handler(event);
}), {
  defaultPreset: options?.defaultPreset,
});
