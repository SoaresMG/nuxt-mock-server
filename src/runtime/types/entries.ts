export type FormatterDataType = "application/json" | "application/xml" | "text/plain" | "text/html" | "application/octet-stream";

export interface MockMeta {
  path: string;
  lastModified: Date;
  preset: string;
  headers: Record<string, string> & { "content-type": FormatterDataType; };
}

export interface MockEntry {
  meta: MockMeta;
  data: string | Buffer;
}

export interface MockPreset {
  name: string;
  isCurrent: boolean;
  entries: MockEntry[];
}

export interface MockRequest {
  meta: MockMeta;
  response: Response;
}

export interface MockResponse {
  body: BodyInit;
  headers: Record<string, string>;
  status: number;
};
