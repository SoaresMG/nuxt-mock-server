import { consola } from "consola";
import type { EventHandler, EventHandlerRequest, H3Event } from "h3";
import { defineEventHandler } from "#imports";

export const defineErrorHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event: H3Event) => {
    try {
      return await handler(event);
    }
    catch (e) {
      consola.error("An error occurred while processing the mock server request", e);
      throw e;
    }
  });
