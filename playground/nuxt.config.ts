import { resolve } from "node:path";
import { defineNuxtModule } from "@nuxt/kit";
import { startSubprocess } from "@nuxt/devtools-kit";
import consola from "consola";

export default defineNuxtConfig({
  modules: [
    "../../src/module",
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

  nitro: {
    typescript: {
      internalPaths: true,
    },
  },

  compatibilityDate: "2024-08-04",
});
