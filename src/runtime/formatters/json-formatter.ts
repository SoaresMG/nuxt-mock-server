import type { MockEntry, MockRequest } from "../types";
import { Formatter } from "./base";

export class JsonFormatter extends Formatter {
  override async create(request: MockRequest) {
    const data = await request.response.json();

    const [entry] = await Promise.all(
      [
        this.processEntry({
          meta: request.meta,
          data,
        }),
        this.writeMockFile({
          meta: request.meta,
          data,
        }),
      ],
    );

    return entry;
  }

  override async get(path: string) {
    const entry = await this.getEntry(path);
    this.assertEntry(entry, path);
    return this.processEntry(entry);
  }

  override async getEntry(path: string) {
    const raw = await this.raw(path);

    if (!raw) {
      return;
    }

    return await this.processRaw(raw);
  }

  override async processEntry(entry: MockEntry) {
    return this.createResponse(JSON.stringify(entry.data), entry.meta);
  }

  override assertEntry(entry: MockEntry | undefined, path: string): asserts entry is MockEntry {
    super.assertEntry(entry, path);

    if (typeof entry.data !== "object") {
      throw new TypeError(`Expected data to be an object for ${path}`);
    }
  }
}
