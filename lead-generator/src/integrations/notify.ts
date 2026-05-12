import { config } from "../config.js";
import type { LeadRecord } from "../types.js";

export async function notifyHotLead(lead: LeadRecord): Promise<void> {
  if (!config.salesWebhookUrl) {
    console.warn("[hot-lead] SALES_WEBHOOK_URL not set; logging only.");
    console.info(JSON.stringify({ type: "hot_lead", lead }, null, 2));
    return;
  }

  const res = await fetch(config.salesWebhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "hot_lead", lead }),
  });

  if (!res.ok) {
    console.error("[hot-lead] webhook failed", res.status, await res.text());
  }
}

export async function appendToSheetsMvp(lead: LeadRecord): Promise<void> {
  if (!config.googleSheetsWebhookUrl) return;

  const res = await fetch(config.googleSheetsWebhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      submittedAt: lead.createdAt,
      name: lead.name ?? "",
      email: lead.email ?? "",
      phone: lead.phone ?? "",
      service: lead.service ?? "",
      score: lead.score,
      hot: lead.hot,
      channel: lead.channel,
      notes: lead.notes ?? "",
    }),
  });

  if (!res.ok) {
    console.error("[sheets] webhook failed", res.status, await res.text());
  }
}
