import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3850),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4o-mini"),
  HOT_LEAD_THRESHOLD: z.coerce.number().default(6),
  SALES_WEBHOOK_URL: z.string().url().optional().or(z.literal("")),
  GOOGLE_SHEETS_WEBHOOK_URL: z.string().url().optional().or(z.literal("")),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid environment:", parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  const e = parsed.data;
  return {
    port: e.PORT,
    openaiKey: e.OPENAI_API_KEY,
    openaiModel: e.OPENAI_MODEL,
    hotLeadThreshold: e.HOT_LEAD_THRESHOLD,
    salesWebhookUrl: e.SALES_WEBHOOK_URL || undefined,
    googleSheetsWebhookUrl: e.GOOGLE_SHEETS_WEBHOOK_URL || undefined,
  };
}

export const config = loadEnv();
