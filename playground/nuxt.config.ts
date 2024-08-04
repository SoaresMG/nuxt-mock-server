export default defineNuxtConfig({
  modules: ["../../src/module"],

  mocks: {
    enabled: true,
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-08-04",
});
