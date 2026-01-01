import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    GOOGLE_OAUTH_CLIENT_ID: z.string().min(1, {
      message: "El ID de cliente de OAuth de Google es requerido",
    }),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1, {
      message: "El secreto de cliente de OAuth de Google es requerido",
    }),
    GOOGLE_OAUTH_REDIRECT_URL: z.string().min(1, {
      message: "El URI de redirección de OAuth de Google es requerido",
    }),
  },
  client: {},
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});
