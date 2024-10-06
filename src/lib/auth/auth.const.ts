import { env } from "process";

export const AUTH_COOKIE_NAME =
  env.NODE_ENV === "development"
    ? "authjs.session-token"
    : "__Secure-authjs.session-token";
