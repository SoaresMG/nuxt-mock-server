import { defineEventHandler } from "h3";
import { useMockServer } from "#imports";

export default defineEventHandler((event): boolean => {
  return useMockServer(event).isPaused();
});
