import { defineEventHandler, type EventHandler, type EventHandlerRequest, type H3Event } from "h3";
import { interceptRequest } from "./intercept-request";
import { useRuntimeConfig } from "#imports";

export const defineMockInterceptorHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> => defineEventHandler<T>(async (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig(event);

  return interceptRequest(handler, runtimeConfig)(event);
});
