import consola from "consola";
import { AutoFormatter } from "../formatters";
import type { FormatterDataType } from "../../types";
import { MAIN_HEADER_KEY, MAIN_HEADER_VALUE } from "../utils/constants";
import { defineErrorHandler, definePresetHandler } from "../handlers";
import { defineNitroPlugin, useRuntimeConfig } from "#imports";

export default defineNitroPlugin((nitro) => {
  const { mockServer } = useRuntimeConfig();

  if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.mockDir || !mockServer.preset) {
    return;
  }

  const routeRegExp = new RegExp(mockServer.pathMatch);

  nitro.hooks.hook("request", defineErrorHandler(definePresetHandler(async (event) => {
    if (
      !routeRegExp.test(event.path)
      || event.headers.get(MAIN_HEADER_KEY) === MAIN_HEADER_VALUE.IGNORE
    ) {
      return;
    }

    const formatter = new AutoFormatter(`${mockServer.mockDir!}/${event.context.preset}`, consola.error);

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
  }, { defaultPreset: mockServer.preset })));
});
