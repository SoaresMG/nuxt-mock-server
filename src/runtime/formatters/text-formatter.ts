import type { MockEntry, MockRequest } from "../types";
import { Formatter } from "./base";

export class TextFormatter extends Formatter {
  override async create(request: MockRequest) {
    const data = await request.response.text();

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

    return this.processRaw(raw);
  }

  override async processEntry(entry: MockEntry) {
    this.assertEntryAsString(entry.data);
    return this.createResponse(entry.data, entry.meta);
  }

  override assertEntry(entry: MockEntry | undefined, path: string): asserts entry is MockEntry {
    super.assertEntry(entry, path);
    this.assertEntryAsString(entry.data);
  }

  protected assertEntryAsString(data: unknown): asserts data is string {
    if (typeof data !== "string") {
      throw new TypeError("Expected data to be a string");
    }
  }
}
