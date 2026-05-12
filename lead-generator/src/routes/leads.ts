import type { Request, Response } from "express";
import { z } from "zod";
import { config } from "../config.js";
import {
  budgetFromText,
  needClarityFromText,
  scoreLead,
  timelineFromText,
} from "../scoring/leadScore.js";
import { appendToSheetsMvp, notifyHotLead } from "../integrations/notify.js";
import { newLeadId, saveLead, listLeads } from "../storage/leadsStore.js";
import type { BudgetBand, Channel, TimelineUrgency } from "../types.js";

const createSchema = z.object({
  channel: z
    .enum(["web_widget", "whatsapp", "instagram", "mobile", "other"])
    .default("web_widget"),
  name: z.string().min(1).max(200).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).max(40).optional(),
  service: z.string().max(2000).optional(),
  budgetText: z.string().max(2000).optional(),
  timelineText: z.string().max(2000).optional(),
  needText: z.string().max(4000).optional(),
  budgetBand: z.enum(["unknown", "low", "mid", "high"]).optional(),
  timeline: z.enum(["unknown", "browsing", "this_quarter", "asap"]).optional(),
  notes: z.string().max(8000).optional(),
  transcript: z.string().max(50_000).optional(),
});

function mergeBudget(a?: string, b?: BudgetBand): BudgetBand {
  if (b && b !== "unknown") return b;
  if (a) return budgetFromText(a);
  return "unknown";
}

function mergeTimeline(a?: string, b?: TimelineUrgency): TimelineUrgency {
  if (b && b !== "unknown") return b;
  if (a) return timelineFromText(a);
  return "unknown";
}

export async function postLead(req: Request, res: Response): Promise<void> {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_body", details: parsed.error.flatten() });
    return;
  }

  const d = parsed.data;
  const budgetBand = mergeBudget(d.budgetText, d.budgetBand);
  const timeline = mergeTimeline(d.timelineText, d.timeline);

  const pooledNeed = [d.service, d.needText, d.notes, d.transcript]
    .filter(Boolean)
    .join(" \n ");
  const serviceNeedClarity = needClarityFromText(pooledNeed);
  const hasContact = Boolean(
    d.email?.trim() || d.phone?.trim() || (d.name && d.email),
  );

  const scored = scoreLead(
    {
      serviceNeedClarity,
      budget: budgetBand,
      timeline,
      hasContact: hasContact && Boolean(d.email || d.phone),
    },
    config.hotLeadThreshold,
  );

  const record = saveLead({
    id: newLeadId(),
    createdAt: new Date().toISOString(),
    channel: d.channel as Channel,
    name: d.name,
    email: d.email,
    phone: d.phone,
    service: d.service,
    budgetBand,
    timeline,
    notes: d.notes,
    score: scored.score,
    hot: scored.hot,
    transcript: d.transcript,
  });

  void appendToSheetsMvp(record);
  if (record.hot) {
    void notifyHotLead(record);
  }

  res.status(201).json({
    id: record.id,
    score: scored.score,
    reasons: scored.reasons,
    hot: scored.hot,
  });
}

export function getLeadsDev(_req: Request, res: Response): void {
  if (process.env.NODE_ENV === "production") {
    res.status(404).end();
    return;
  }
  res.json({ leads: listLeads(100) });
}
