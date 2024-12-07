import { deleteCookie, setCookie, type H3Event } from "h3";
import consola from "consola";
import { PAUSED_COOKIE_KEY } from "../../utils/constants";
import { useRuntimeConfig } from "#imports";

export function togglePause(event: H3Event, enable: boolean) {
  const { mockServer } = useRuntimeConfig(event);

  if (!mockServer || !mockServer.enabled) {
    return;
  }

  event.context.mockServerIsPaused = !enable;

  if (enable) {
    deleteCookie(event, PAUSED_COOKIE_KEY);
    consola.debug("[mock-server] Mocks have been resumed");
  }
  else {
    setCookie(event, PAUSED_COOKIE_KEY, "true");
    consola.debug("[mock-server] Mocks have been paused");
  }
}
