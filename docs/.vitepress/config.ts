import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "nuxt-mock-server",
  base: "/nuxt-mock-server/",
  description: "Module that easily adds a mock server to your Nuxt project",

  lastUpdated: true,
  themeConfig: {
    outline: [2, 3],

    editLink: {
      pattern: "https://github.com/SoaresMG/nuxt-mock-server/edit/main/docs/:path",
    },

    search: {
      provider: "local",
    },

    nav: [
      { text: "Start", link: "/" },
    ],

    sidebar: [
      {
        text: "Start",
        items: [
          { text: "Getting Started", link: "/getting-started" },
          { text: "Configuration", link: "/configuration" },
          { text: "Roadmap", link: "/high-level-roadmap" },
        ],
      },
      {
        text: "Features",
        items: [
          { text: "Presets", link: "/features/presets" },
          { text: "Modes", link: "/features/modes" },
          { text: "Devtools", link: "/features/devtools" },
        ],
      },
      {
        text: "Utils",
        items: [
          { text: "useMockServer", link: "/utilities/use-mock-server" },
          { text: "defineMockInterceptorHandler", link: "/utilities/define-mock-interceptor-handler" },
          { text: "definePresetHandler", link: "/utilities/define-preset-handler" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/SoaresMG/nuxt-mock-server" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Leandro Soares",
    },
  },
});
