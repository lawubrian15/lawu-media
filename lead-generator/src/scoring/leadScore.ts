import type { BudgetBand, LeadSignals, TimelineUrgency } from "../types.js";

export interface ScoreResult {
  score: number;
  reasons: string[];
  hot: boolean;
}

/** Simple, explainable scoring — swap weights or add CRM-specific rules anytime. */
export function scoreLead(signals: LeadSignals, threshold: number): ScoreResult {
  let score = 0;
  const reasons: string[] = [];

  switch (signals.budget) {
    case "high":
      score += 3;
      reasons.push("budget: high");
      break;
    case "mid":
      score += 2;
      reasons.push("budget: mid");
      break;
    case "low":
      score += 1;
      reasons.push("budget: low");
      break;
    default:
      reasons.push("budget: unknown");
  }

  switch (signals.timeline) {
    case "asap":
      score += 2;
      reasons.push("timeline: urgent");
      break;
    case "this_quarter":
      score += 1;
      reasons.push("timeline: this quarter");
      break;
    case "browsing":
      score -= 2;
      reasons.push("timeline: browsing");
      break;
    default:
      reasons.push("timeline: unknown");
  }

  switch (signals.serviceNeedClarity) {
    case "clear":
      score += 2;
      reasons.push("need: clear");
      break;
    case "vague":
      score += 0;
      reasons.push("need: vague");
      break;
    default:
      reasons.push("need: unknown");
  }

  if (signals.hasContact) {
    score += 1;
    reasons.push("contact captured");
  }

  const hot = score >= threshold;
  if (hot) reasons.push(`hot: score ${score} ≥ ${threshold}`);

  return { score, reasons, hot };
}

export function budgetFromText(text: string): BudgetBand {
  const t = text.toLowerCase();
  if (/brows|just look|not sure|no budget|unsure/.test(t)) return "unknown";
  if (/(10k|20k|30k|40k|50k|\$50|high|enterprise|unlimited|big)/.test(t)) return "high";
  if (/(5k|8k|15k|mid|medium|moderate)/.test(t)) return "mid";
  if (/(low|small|tight|1k|2k|3k|starter|bootstrap)/.test(t)) return "low";
  return "unknown";
}

export function timelineFromText(text: string): TimelineUrgency {
  const t = text.toLowerCase();
  if (/brows|just look|no rush|someday|maybe later/.test(t)) return "browsing";
  if (
    /asap|urgent|this week|tomorrow|immediately|now|today|emergency|rush/.test(t)
  ) {
    return "asap";
  }
  if (
    /this month|next month|quarter|q[1-4]|few weeks|soon|couple weeks/.test(t)
  ) {
    return "this_quarter";
  }
  return "unknown";
}

export function needClarityFromText(text: string): LeadSignals["serviceNeedClarity"] {
  const t = text.toLowerCase();
  if (t.length < 8) return "unknown";
  if (
    /help with|need|looking for|want to|we are|we're|our company|project|scope/.test(
      t,
    )
  ) {
    return "clear";
  }
  if (/not sure|maybe|just|explor|general/.test(t)) return "vague";
  return "unknown";
}
