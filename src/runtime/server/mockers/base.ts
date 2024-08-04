import { resolve } from "node:path";
import { mkdir, writeFile, stat, readFile } from "node:fs/promises";
import type { SerializeObject } from "nitropack";

export interface MockEntry {
  meta: {
    path: string
    lastModified: Date
  }
  data: unknown
}

async function exists(path: string) {
  try {
    await stat(path);
    return true;
  }
  catch {
    return false;
  }
}

export abstract class Mocker {
  protected outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
  }

  protected getMockFilePath(path: string) {
    const normalizedPath = path.replace(/\//g, "_");
    return resolve(this.outputDir, `${normalizedPath}.json`);
  }

  protected async writeMockFile(entry: MockEntry): Promise<void> {
    const filePath = this.getMockFilePath(entry.meta.path);

    if (!await exists(this.outputDir)) {
      await mkdir(this.outputDir, { recursive: true });
    }

    if (!await exists(filePath)) {
      await writeFile(filePath, JSON.stringify(entry), {
        encoding: "utf-8",
      });
    }
  }

  protected async getMockFile(path: string): Promise<SerializeObject<MockEntry> | undefined> {
    const filePath = this.getMockFilePath(path);

    if (await exists(filePath)) {
      return JSON.parse(await readFile(filePath, "utf-8")) as SerializeObject<MockEntry>;
    }
  }

  public abstract create(entry: MockEntry): Promise<void>;
  public abstract get(path: string): Promise<SerializeObject<MockEntry> | undefined>;
}
