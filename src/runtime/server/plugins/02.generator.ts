import type { NitroApp } from "nitropack";
import { generateRoutes } from "../management";
import { useRuntimeConfig } from "#imports";

export default async function (nitro: NitroApp) {
  const runtimeConfig = useRuntimeConfig();
  await generateRoutes(runtimeConfig, nitro);
};
