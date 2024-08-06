import type { FormatterDataType, MockRequest, MockEntry, MockResponse } from "../../types";
import type { BaseFormatter, OnErrorCallback } from "./base";
import { JsonFormatter } from "./json-formatter";
import { TextFormatter } from "./text-formatter";
import { StreamFormatter } from "./stream-formatter";

export class AutoFormatter implements BaseFormatter {
  protected formatters: Record<FormatterDataType, BaseFormatter>;
  private defaultFormatter: JsonFormatter;

  constructor(outputDir: string, compressionEnabled: boolean, onError: OnErrorCallback) {
    this.defaultFormatter = new JsonFormatter(outputDir, compressionEnabled, onError);
    const textFormatter = new TextFormatter(outputDir, compressionEnabled, onError);

    this.formatters = {
      "application/json": this.defaultFormatter,
      "application/xml": textFormatter,
      "text/plain": textFormatter,
      "text/html": textFormatter,
      "application/octet-stream": new StreamFormatter(outputDir, compressionEnabled, onError),
    };
  }

  public create(entry: MockRequest) {
    return this.formatters[entry.meta.headers["content-type"]].create(entry);
  }

  public async get(path: string) {
    const raw = await this.raw(path);

    if (!raw) {
      return;
    }

    const entry = await this.processRaw(raw);

    if (entry === undefined) {
      throw new TypeError(`Expected entry to be defined for ${path}`);
    }

    this.assertEntry(entry, path);

    return this.formatters[entry.meta.headers["content-type"]].processEntry(entry);
  }

  public raw(path: string): Promise<MockEntry | undefined> {
    return this.defaultFormatter.raw(path);
  }

  public processEntry(entry: MockEntry): Promise<MockResponse | undefined> {
    return this.formatters[entry.meta.headers["content-type"]].processEntry(entry);
  }

  public async getEntry(path: string): Promise<MockEntry | undefined> {
    const raw = await this.raw(path);

    if (!raw) {
      throw new TypeError(`Expected raw to be defined for ${path}`);
    }

    return this.formatters[raw.meta.headers["content-type"]].processRaw(raw);
  }

  public processRaw(entry: MockEntry): Promise<MockEntry | undefined> {
    return this.formatters[entry.meta.headers["content-type"]].processRaw(entry);
  }

  public assertEntry(entry: MockEntry, path: string): void {
    this.formatters[entry.meta.headers["content-type"]].assertEntry(entry, path);
  }
}
