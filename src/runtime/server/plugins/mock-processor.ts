import consola from "consola";
import { defineErrorHandler } from "../utils/define-error-handler";
import { AutoFormatter } from "../formatters";
import type { FormatterDataType } from "../types";
import { defineNitroPlugin, useRuntimeConfig } from "#imports";

const mockedHeader = {
  ignore: "IGNORE",
  found: "FOUND",
  created: "CREATED",
};

export default defineNitroPlugin((nitro) => {
  const { mockServer } = useRuntimeConfig();

  if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.mockDir) {
    return;
  }

  const routeRegExp = new RegExp(mockServer.pathMatch);

  const formatter = new AutoFormatter(mockServer.mockDir, !!mockServer.compress, consola.error);

  nitro.hooks.hook("request", defineErrorHandler(async (event) => {
    if (
      !routeRegExp.test(event.path)
      || event.headers.get("X-MOCKED") === mockedHeader.ignore
    ) {
      return;
    }

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
        "X-MOCKED": mockedHeader.ignore,
      },
    });

    if (localResponse.ok) {
      const { body, headers, status } = await formatter.create({
        meta: {
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

      event.headers.set("X-MOCKED", mockedHeader.created);
    }
  }));
});
