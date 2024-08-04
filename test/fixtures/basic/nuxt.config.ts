import MyModule from "../../../src/module";

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  mocks: {
    enabled: true,
    pathMatch: "^/api/.*$",
  },
});
