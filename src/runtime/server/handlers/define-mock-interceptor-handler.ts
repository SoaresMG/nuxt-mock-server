import type { EventHandler, EventHandlerRequest } from "h3";
import { interceptRequest } from "./intercept-request";

export const defineMockInterceptorHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> => interceptRequest(handler);
