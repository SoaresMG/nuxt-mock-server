import { defineEventHandler } from "h3";
import type { MockServerMeta } from "../../types";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler((event): MockServerMeta | undefined => {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.package) {
    return;
  }

  return {
    package: mockServer.package,
  };
});
