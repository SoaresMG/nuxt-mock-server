import { inject, type InjectionKey } from "vue";
import type { MockServerMeta } from "../../src/runtime/types";
import { useRpc } from "./use-rpc";

export const moduleMetaKey: InjectionKey<MockServerMeta | undefined> = Symbol("moduleMeta");

export function useModuleMeta() {
  const moduleMeta = inject(moduleMetaKey, undefined);

  return {
    moduleMeta,
  };
}

export async function fetchModuleMeta(): Promise<MockServerMeta | undefined> {
  const { appFetch } = useRpc();

  if (appFetch.value) {
    return appFetch.value("/__mock-server__/meta");
  }
}
