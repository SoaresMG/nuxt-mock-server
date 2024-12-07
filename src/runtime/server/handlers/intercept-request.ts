import { defineEventHandler, type EventHandler, type EventHandlerRequest, type H3Event } from "h3";
import consola from "consola";
import { AutoFormatter } from "../../formatters";
import type { FormatterDataType } from "../../types";
import { MAIN_HEADER_KEY, MAIN_HEADER_VALUE, transformHeaders } from "../../utils";
import { requestIsSkipped, isGeneratingPreset } from "../../utils/event-context-utils";
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
    || requestIsSkipped(event)
  ) {
    return handler(event);
  }

  const formatter = new AutoFormatter(`${mockServer.mockDir}/${event.context.preset}`, consola.error);

  const mockResponse = await formatter.get(event.path);

  if (!isGeneratingPreset(event) && mockResponse) {
    // During generation of mocks we want to ignore all previously generated ones
    const { body, headers, status } = mockResponse;

    return await event.respondWith(new Response(body, {
      headers,
      status,
    }));
  }

  const localResponse = await nitro.localFetch(event.path, {
    method: "GET",
    cache: "no-cache",
    headers: {
      ...transformHeaders(event.headers),
      [MAIN_HEADER_KEY]: MAIN_HEADER_VALUE.PROXY,
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
