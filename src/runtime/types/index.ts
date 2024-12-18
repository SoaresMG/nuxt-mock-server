export * from "./x-mocked-header";
export * from "./entries";
export * from "./module-meta";
export * from "./module-options";
export * from "./manifest";

export interface MockServerExtendRoutesPayload {
  routes: string[];
  preset: string;
}
