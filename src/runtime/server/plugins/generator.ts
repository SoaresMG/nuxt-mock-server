// import type { NitroAppPlugin } from "nitropack";
// import { defineMockInterceptor } from "../handlers/define-mock-interceptor";
// import { useRuntimeConfig } from "#imports";

// const mockProcessorPlugin: NitroAppPlugin = (nitro) => {
//   const { mockServer } = useRuntimeConfig();

//   if (!mockServer || !mockServer.enabled || !mockServer.pathMatch || !mockServer.preset) {
//     return;
//   }

//   const routeRegExp = new RegExp(mockServer.pathMatch);

//   nitro.hooks.hook("request", defineMockInterceptor(undefined, {
//     routeRegExp: routeRegExp,
//     force: false,
//     defaultPreset: mockServer.preset,
//   }));
// };

// export default mockProcessorPlugin;
