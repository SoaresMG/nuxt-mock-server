import type { MockMeta } from "./entries";

export interface PresetManifest {
  meta: Record<string, MockMeta>;
  total: number;
}
