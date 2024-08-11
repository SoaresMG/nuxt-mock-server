import type { NitroApp } from "nitropack";
import { interceptRequest } from "../handlers/intercept-request";
import { useRuntimeConfig } from "#imports";

export default function (nitro: NitroApp) {
  const runtimeConfig = useRuntimeConfig();
  const { mockServer } = runtimeConfig;

  if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.preset) {
    return;
  }

  const routeRegExp = new RegExp(mockServer.pathMatch);

  // We can safely ignore the handler since inside the "request" hook we can return undefined and follow the normal request flow
  nitro.hooks.hook("request", (event) => {
    return interceptRequest(() => undefined, runtimeConfig, {
      routeRegExp: routeRegExp,
      forceRouteMatch: false,
      defaultPreset: mockServer.preset,
    })(event);
  });
};
