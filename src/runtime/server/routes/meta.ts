import { defineEventHandler } from "h3";
import { useRuntimeConfig } from "nuxt/app";
import type { MockServerMeta } from "../../types";

export default defineEventHandler((event): MockServerMeta | undefined => {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.package) {
    return;
  }

  return {
    package: mockServer.package,
  };
});
