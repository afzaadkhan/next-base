import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    API_BASE_URL: z.string().url().optional(),
    API_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().default("/api"),
    NEXT_PUBLIC_APP_NAME: z.string().default("Advance Tech"),
    NEXT_PUBLIC_APP_URL: z.url().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})