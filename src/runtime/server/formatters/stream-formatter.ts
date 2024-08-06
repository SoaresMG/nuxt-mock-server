import type { MockEntry, MockRequest } from "../../types";
import { TextFormatter } from "./text-formatter";

export class StreamFormatter extends TextFormatter {
  override async create(request: MockRequest) {
    const buffer = await request.response.arrayBuffer();
    const data = Buffer.from(buffer).toString("base64");

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

  override processRaw(entry: MockEntry): Promise<MockEntry | undefined> {
    this.assertEntryAsString(entry.data);

    const data = Buffer.from(entry.data, "base64");
    return Promise.resolve({ ...entry, data });
  }
}
