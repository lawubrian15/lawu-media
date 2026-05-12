import type { Request, Response } from "express";
import OpenAI from "openai";
import { z } from "zod";
import { config } from "../config.js";
import { retrieveContext } from "../knowledge/context.js";
import { buildSystemPrompt } from "../prompts/system.js";
import type { ChatMessage } from "../types.js";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1).max(12_000),
      }),
    )
    .min(1)
    .max(40),
  businessTypeHint: z.string().min(1).max(500).default("service business"),
  useKnowledge: z.boolean().default(true),
});

export async function postChat(req: Request, res: Response): Promise<void> {
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_body", details: parsed.error.flatten() });
    return;
  }

  if (!config.openaiKey) {
    res.status(503).json({
      error: "openai_not_configured",
      message: "Set OPENAI_API_KEY in .env",
    });
    return;
  }

  const { messages, businessTypeHint, useKnowledge } = parsed.data;
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const knowledgeContext =
    useKnowledge && lastUser ? retrieveContext(lastUser.content) : "";

  const systemContent = buildSystemPrompt({ businessTypeHint, knowledgeContext });

  const openai = new OpenAI({ apiKey: config.openaiKey });
  const fullMessages: ChatMessage[] = [
    { role: "system", content: systemContent },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const completion = await openai.chat.completions.create({
    model: config.openaiModel,
    messages: fullMessages,
    temperature: 0.7,
    max_tokens: 600,
  });

  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) {
    res.status(502).json({ error: "empty_completion" });
    return;
  }

  res.json({
    reply: text,
    meta: {
      model: config.openaiModel,
      knowledgeUsed: Boolean(knowledgeContext),
    },
  });
}
