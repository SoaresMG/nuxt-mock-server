import { resolve } from "node:path";
import { mkdir, writeFile, stat, readFile, rm } from "node:fs/promises";
import superjson from "superjson";
import type { MockRequest, MockEntry, MockResponse, MockMeta, PresetManifest } from "../types";
import { MAIN_HEADER_KEY, MAIN_HEADER_VALUE } from "../utils";
import { normalizePath } from "../utils/normalize-path";

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
  onError: OnErrorCallback;

  constructor(outputDir: string, onError: OnErrorCallback) {
    this.outputDir = outputDir;
    this.onError = onError;
  }

  protected getMockFilePath(path: string) {
    return resolve(this.outputDir, normalizePath(path));
  }

  private async checkOutputDir() {
    if (!await exists(this.outputDir)) {
      await mkdir(this.outputDir, { recursive: true });
    }
  }

  private async getManifest(): Promise<PresetManifest> {
    await this.checkOutputDir();

    const manifestPath = resolve(this.outputDir, "manifest.json");

    if (!await exists(manifestPath)) {
      const newManifest = {
        meta: {},
        total: 0,
      };

      return newManifest;
    }

    return superjson.parse(await readFile(manifestPath, "utf-8"));
  }

  private async getMockMeta(path: string): Promise<MockMeta> {
    const manifest = await this.getManifest();
    return manifest.meta[normalizePath(path)];
  }

  private async addToManifest({ meta }: MockEntry) {
    const manifest = await this.getManifest();

    const totalWithoutCurrent = manifest.total - (manifest.meta[meta.path] ? 1 : 0);

    const newManifest: PresetManifest = {
      ...manifest,
      meta: { ...manifest.meta, [normalizePath(meta.path)]: meta },
      total: totalWithoutCurrent + 1,
    };

    return writeFile(resolve(this.outputDir, "manifest.json"), superjson.stringify(newManifest), {
      encoding: "utf-8",
    });
  };

  protected async writeMockFile(entry: MockEntry): Promise<void> {
    const filePath = this.getMockFilePath(entry.meta.path);

    await this.checkOutputDir();
    if (await exists(filePath)) {
      await rm(filePath);
    }

    await writeFile(`${filePath}.json`, superjson.stringify(entry.data), {
      encoding: "utf-8",
    });

    await this.addToManifest(entry);
  }

  public async raw(path: string): Promise<MockEntry | undefined> {
    const filePath = this.getMockFilePath(path);
    const extensionfullPath = filePath.includes(".json") ? filePath : `${filePath}.json`;
    const pathName = path.includes(".json") ? path.replace(".json", "") : path;

    if (await exists(extensionfullPath)) {
      const meta = await this.getMockMeta(pathName);

      if (!meta) {
        throw new Error(`[mock-server] Meta is missing for ${pathName}`);
      }

      return {
        meta,
        data: superjson.parse(await readFile(extensionfullPath, "utf-8")),
      };
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
        [MAIN_HEADER_KEY]: MAIN_HEADER_VALUE.FOUND,
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
