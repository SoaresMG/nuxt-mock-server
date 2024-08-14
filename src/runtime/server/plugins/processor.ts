import type { NitroApp } from "nitropack";
import { interceptRequest } from "../handlers/intercept-request";
import { useRuntimeConfig } from "#imports";

export default function (nitro: NitroApp) {
  const { mockServer } = useRuntimeConfig();

  if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.defaultPreset) {
    return;
  }

  const routeRegExp = new RegExp(mockServer.pathMatch);

  // We can safely ignore the handler since inside the "request" hook we can return undefined and follow the normal request flow
  nitro.hooks.hook("request", (event) => {
    return interceptRequest(() => undefined, {
      routeRegExp: routeRegExp,
      forceRouteMatch: false,
      defaultPreset: mockServer.defaultPreset,
    })(event);
  });
};
