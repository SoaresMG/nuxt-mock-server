import type { MockEntry } from "./base";
import { Mocker } from "./base";

export class JsonMocker extends Mocker {
  override create(entry: MockEntry) {
    return this.writeMockFile(entry);
  }

  override get(path: string) {
    return this.getMockFile(path);
  }
}
