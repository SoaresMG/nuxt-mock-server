import { consola } from "consola";
import { JsonMocker } from "../mockers/json-mocker";
import { defineNitroPlugin, useRuntimeConfig } from "#imports";

const mockedHeader = {
  ignore: "IGNORE",
  found: "FOUND",
  created: "CREATED",
};

export default defineNitroPlugin((nitro) => {
  const { mockServer } = useRuntimeConfig();

  if (!mockServer) {
    return;
  }

  const routeRegExp = new RegExp(mockServer.pathMatch);

  const mocker = new JsonMocker(mockServer.mockDir);

  nitro.hooks.hook("request", async (event) => {
    try {
      if (
        !routeRegExp.test(event.path)
        || event.headers.get("X-MOCKED") === mockedHeader.ignore
      ) {
        return;
      }

      const mockEntry = await mocker.get(event.path);

      if (mockEntry) {
        event.respondWith(
          new Response(JSON.stringify(mockEntry.data), {
            headers: {
              "X-MOCKED": mockedHeader.found,
              "Content-Type": "application/json",
              "Last-Modified": mockEntry.meta.lastModified,
            },
            status: 200,
            statusText: "Mocked response",
          }),
        );
        return;
      }

      const response = await nitro.localFetch(event.path, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "X-MOCKED": mockedHeader.ignore,
        },
      });

      if (response.headers.get("Content-Type") === "application/json") {
        const jsonResponse = await response.json();

        if (response.ok) {
          await mocker.create({
            meta: {
              path: event.path,
              lastModified: new Date(),
            },
            data: jsonResponse,
          });

          event.headers.set("X-MOCKED", mockedHeader.created);
        }

        event.respondWith(new Response(JSON.stringify(jsonResponse), {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        }));
      }
    }
    catch (e) {
      consola.error("An error occurred while processing the mock server request", e);
      throw e;
    }
  });
});
