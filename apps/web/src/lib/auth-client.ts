import { env } from "@same-room-different-life/env/web";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.VITE_CONVEX_SITE_URL,
  plugins: [adminClient()],
});
