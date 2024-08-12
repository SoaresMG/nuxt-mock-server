import { resolve } from "node:path";
import { defineNuxtConfig } from "nuxt/config";
import { defineNuxtModule } from "@nuxt/kit";
import { startSubprocess } from "@nuxt/devtools-kit";
import consola from "consola";
import NuxtMockServer from "../src/module";

export default defineNuxtConfig({
  modules: [
    NuxtMockServer,
    "@nuxt/ui",
    defineNuxtModule({
      setup(_, nuxt) {
        if (!nuxt.options.dev) {
          return;
        }

        const subprocess = startSubprocess(
          {
            command: "npx",
            args: ["nuxi", "dev", "--port", "3300"],
            cwd: resolve(__dirname, "../client"),
          },
          {
            id: "nuxt-mock-server:client",
            name: "Mock-Server Client Dev",
          },
        );
        subprocess.getProcess().stdout?.on("data", (data) => {
          consola.log(` sub: ${data.toString()}`);
        });

        process.on("exit", () => {
          subprocess.terminate();
        });
      },
    })],

  mocks: {
    enabled: true,
    auto: false,
  },

  compatibilityDate: "2024-08-04",
});
