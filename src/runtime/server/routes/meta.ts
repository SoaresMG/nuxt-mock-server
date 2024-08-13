import { defineEventHandler } from "h3";
import type { MockServerMeta } from "../../types";
import { transformDevtoolsOptions } from "../../utils";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler((event): MockServerMeta | undefined => {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.package) {
    return;
  }

  const devtools = transformDevtoolsOptions(mockServer.devtools);

  return {
    package: mockServer.package,
    devtools,
  };
});
