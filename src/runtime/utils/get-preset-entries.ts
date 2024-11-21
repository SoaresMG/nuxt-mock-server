import type { Dirent } from "node:fs";
import consola from "consola";
import { AutoFormatter } from "../formatters";
import { notUndefinedOrNull } from "./not-undefined";

const NON_MOCK_FILES = ["manifest.json"];

const getEntry = (dirent: Dirent) => {
  const formatter = new AutoFormatter(dirent.path, consola.error);
  return formatter.getEntry(dirent.name);
};

export async function getPresetEntries(mockDirents: Dirent[]) {
  return (await Promise.all(
    mockDirents
      .filter(dirent => dirent.isFile() && !NON_MOCK_FILES.includes(dirent.name))
      .map(getEntry),
  )).filter(notUndefinedOrNull);
}
