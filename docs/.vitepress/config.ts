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
          { text: "Modes", link: "/features/modes" },
          { text: "Generations", link: "/features/generations" },
          { text: "Composables", link: "/features/composables" },
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
