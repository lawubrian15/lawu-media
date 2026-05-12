import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./config.js";
import { postChat } from "./routes/chat.js";
import { getLeadsDev, postLead } from "./routes/leads.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(
  cors({
    origin: true,
    maxAge: 600,
  }),
);
app.use(express.json({ limit: "512kb" }));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/health", (_req, res) => {
  res.json({ ok: true, openaiConfigured: Boolean(config.openaiKey) });
});

app.post("/api/chat", (req, res, next) => {
  postChat(req, res).catch(next);
});

app.post("/api/leads", (req, res, next) => {
  postLead(req, res).catch(next);
});

app.get("/api/leads", getLeadsDev);

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: "internal_error" });
  },
);

app.listen(config.port, () => {
  console.log(`lead-generator listening on http://localhost:${config.port}`);
});
