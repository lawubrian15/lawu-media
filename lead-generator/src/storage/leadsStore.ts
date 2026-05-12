import { randomUUID } from "node:crypto";
import type { LeadRecord } from "../types.js";

const leads = new Map<string, LeadRecord>();

export function saveLead(record: LeadRecord): LeadRecord {
  leads.set(record.id, record);
  return record;
}

export function listLeads(limit = 50): LeadRecord[] {
  return [...leads.values()]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function newLeadId(): string {
  return randomUUID();
}
