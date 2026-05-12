export type Channel = "web_widget" | "whatsapp" | "instagram" | "mobile" | "other";

export type ConversationPhase = "hook" | "qualify" | "capture" | "close" | "nurture";

export type BudgetBand = "unknown" | "low" | "mid" | "high";

export type TimelineUrgency = "unknown" | "browsing" | "this_quarter" | "asap";

export interface LeadSignals {
  serviceNeedClarity: "unknown" | "vague" | "clear";
  budget: BudgetBand;
  timeline: TimelineUrgency;
  hasContact: boolean;
}

export interface LeadRecord {
  id: string;
  createdAt: string;
  channel: Channel;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budgetBand?: BudgetBand;
  timeline?: TimelineUrgency;
  notes?: string;
  score: number;
  hot: boolean;
  transcript?: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
