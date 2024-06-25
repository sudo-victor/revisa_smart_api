import { z } from "zod";

const _env = z.object({
  OPENAI_API_KEY: z.string(),
  GEMINI_KEY: z.string(),
  DATABASE_URL: z.string(),
  QUEUE_HOST: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_BUCKET_URL: z.string(),
  PAYMENT_KEY: z.string(),
  PORT: z.coerce.number().default(3333),
  ENV: z.string().default('dev'),
  AWS_ENDPOINT: z.string().optional(),
  AWS_QUEUE_NAME: z.string(),
  AWS_ACCOUNT_ID: z.string().optional()
})

export const env = _env.parse(process.env)