import { inject, provide, type InjectionKey } from "vue";
import type { MockServerMeta } from "../../src/runtime/types";
import { useRpc } from "./use-rpc";

const moduleMetaKey: InjectionKey<MockServerMeta | undefined> = Symbol("moduleMeta");

export function useModuleMeta() {
  const moduleMeta = inject(moduleMetaKey, undefined);

  return {
    moduleMeta,
  };
}

export function setModuleMeta(meta: MockServerMeta) {
  provide(moduleMetaKey, meta);
}

export async function fetchModuleMeta(): Promise<MockServerMeta | undefined> {
  const { appFetch } = useRpc();

  if (appFetch.value) {
    return await appFetch.value("/__mock-server__/meta");
  }
}
