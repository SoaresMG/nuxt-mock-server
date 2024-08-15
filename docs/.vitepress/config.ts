import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "nuxt-mock-server",
  base: "/nuxt-mock-server/",
  description: "Module that easily adds a mock server to your Nuxt project",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/SoaresMG/nuxt-mock-server" },
    ],
  },
});
