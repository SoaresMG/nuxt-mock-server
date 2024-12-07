import { defineEventHandler } from "h3";
import { useMockServer } from "#imports";

export default defineEventHandler((event) => {
  useMockServer(event).pause();
});
