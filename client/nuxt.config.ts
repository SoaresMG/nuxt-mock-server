import { resolve } from "node:path";
import DevtoolsUIKit from "@nuxt/devtools-ui-kit";

export default defineNuxtConfig({
  modules: [
    DevtoolsUIKit,
  ],
  ssr: false,
  devtools: {
    enabled: false,
  },
  app: {
    baseURL: "/__mock-server__/devtools",
  },
  compatibilityDate: "2024-08-06",
  nitro: {
    output: {
      publicDir: resolve(__dirname, "../dist/client"),
    },
  },
});
