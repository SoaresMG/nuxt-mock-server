import { resolve } from "node:path";
import { mkdir, writeFile, stat, readFile } from "node:fs/promises";
import superjson from "superjson";
import type { MockRequest, MockEntry, MockResponse, MockMeta } from "../../types";

async function exists(path: string) {
  try {
    await stat(path);
    return true;
  }
  catch {
    return false;
  }
}

export abstract class BaseFormatter {
  public abstract create(entry: MockRequest): Promise<MockResponse>;
  public abstract get(path: string): Promise<MockResponse | undefined>;
  public abstract getEntry(path: string): Promise<MockEntry | undefined>;

  public abstract raw(path: string): Promise<MockEntry | undefined>;
  public abstract processRaw(entry: MockEntry): Promise<MockEntry | undefined>;
  public abstract processEntry(entry: MockEntry): Promise<MockResponse | undefined>;
  public abstract assertEntry(entry: MockEntry, path: string): void;
}

export type OnErrorCallback = (err: Error) => void;

export abstract class Formatter implements BaseFormatter {
  protected outputDir: string;
  protected compressionEnabled: boolean;
  onError: OnErrorCallback;

  constructor(outputDir: string, compressionEnabled: boolean, onError: OnErrorCallback) {
    this.outputDir = outputDir;
    this.compressionEnabled = compressionEnabled;
    this.onError = onError;
  }

  protected getMockFilePath(path: string) {
    const normalizedPath = path.replace(/\//g, "_");
    return resolve(this.outputDir, normalizedPath);
  }

  private stringify(entry: MockEntry) {
    return superjson.stringify(entry);
  }

  protected async writeMockFile(entry: MockEntry): Promise<void> {
    const filePath = this.getMockFilePath(entry.meta.path);

    if (!await exists(this.outputDir)) {
      await mkdir(this.outputDir, { recursive: true });
    }

    if (!await exists(filePath)) {
      await writeFile(`${filePath}.json`, this.stringify(entry), {
        encoding: "utf-8",
      });
    }
  }

  public async raw(path: string): Promise<MockEntry | undefined> {
    const filePath = this.getMockFilePath(path);
    const extensionfullPath = filePath.includes(".json") ? filePath : `${filePath}.json`;

    if (await exists(extensionfullPath)) {
      return superjson.parse(await readFile(extensionfullPath, "utf-8"));
    }
  }

  public async processRaw(entry: MockEntry): Promise<MockEntry | undefined> {
    return Promise.resolve(entry);
  }

  protected createResponse(data: MockResponse["body"], meta: MockMeta): MockResponse {
    return {
      body: data,
      headers: {
        ...meta.headers,
        "X-MOCKED": "FOUND",
        "Last-Modified": meta.lastModified.toUTCString(),
      },
      status: 200,
    };
  }

  public abstract create(entry: MockRequest): Promise<MockResponse>;
  public abstract get(path: string): Promise<MockResponse | undefined>;
  public abstract getEntry(path: string): Promise<MockEntry | undefined>;
  public abstract processEntry(entry: MockEntry): Promise<MockResponse | undefined>;

  public assertEntry(entry: MockEntry | undefined, path: string): asserts entry is MockEntry {
    if (!entry) {
      throw new Error(`Entry is missing for ${path}`);
    }

    if (!entry.meta) {
      throw new Error(`Entry is missing meta for ${path}`);
    }

    if (!entry.meta.headers) {
      throw new Error(`Entry is missing headers for ${path}`);
    }

    if (!entry.meta.headers["content-type"]) {
      throw new Error(`Entry is missing content-type for ${path}`);
    }

    if (!entry.meta.lastModified) {
      throw new Error(`Entry is missing lastModified for ${path}`);
    }

    if (entry.data === undefined) {
      throw new Error(`Entry is missing data for ${path}`);
    }
  }
}
