import type { NitroApp } from "nitropack";

export default function (nitroApp: NitroApp) {
  nitroApp.hooks.hook("mock-server:extendRoutes", async (ctx) => {
    // Fetch Slugs/Routes from somewhere (e.g CMS)
    await new Promise(resolve => setTimeout(resolve, 3000));

    const cmsSlugs = ["/category1/my-product", "/category1/my-other-product", "/category2/my-third-product"];

    ctx.routes.push(...cmsSlugs.map(slug => `/api/pages/product?slug=${slug}`));
  });
};
