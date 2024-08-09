import { defineEventHandler } from "h3";
import { useRuntimeConfig } from "#imports";
import type { MockServerMeta } from "~/src/runtime/types";

export default defineEventHandler((event): MockServerMeta | undefined => {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer) {
    return;
  }

  return {
    package: mockServer.package,
  };
});
