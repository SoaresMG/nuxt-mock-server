import { defineEventHandler } from "h3";
import { useRuntimeConfig } from "#imports";
import type { MockServerMeta } from "~/src/runtime/types";

export default defineEventHandler((): MockServerMeta | undefined => {
  const { mockServer } = useRuntimeConfig();

  if (!mockServer) {
    return;
  }

  return {
    package: mockServer.package,
  };
});
