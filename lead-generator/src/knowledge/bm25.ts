import documents from "./documents.json" with { type: "json" };

export interface KnowledgeDoc {
  id: string;
  title: string;
  body: string;
  tags: string[];
}

export const corpus = documents as KnowledgeDoc[];

const N = corpus.length;
const avgdl =
  corpus.reduce((s, d) => s + tokenize(joinDoc(d)).length, 0) / Math.max(N, 1);

const k1 = 1.2;
const b = 0.75;

function joinDoc(d: KnowledgeDoc): string {
  return `${d.title}\n${d.body}\n${d.tags.join(" ")}`;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function buildInvertedIndex(docs: KnowledgeDoc[]) {
  const df = new Map<string, number>();
  const tfPerDoc: Array<Map<string, number>> = [];

  for (const d of docs) {
    const terms = tokenize(joinDoc(d));
    const counts = new Map<string, number>();
    for (const t of terms) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    tfPerDoc.push(counts);
    const seen = new Set(counts.keys());
    for (const t of seen) {
      df.set(t, (df.get(t) ?? 0) + 1);
    }
  }

  return { tfPerDoc, df };
}

const { tfPerDoc, df } = buildInvertedIndex(corpus);

function idf(term: string): number {
  const nti = df.get(term) ?? 0;
  return Math.log(1 + (N - nti + 0.5) / (nti + 0.5));
}

export function bm25Search(
  query: string,
  topK = 4,
): Array<{ doc: KnowledgeDoc; score: number }> {
  const qTerms = tokenize(query);
  if (qTerms.length === 0) return [];

  const scores = corpus.map((doc, i) => {
    const tf = tfPerDoc[i]!;
    const dl = [...tf.values()].reduce((a, b) => a + b, 0);
    let s = 0;
    for (const term of qTerms) {
      const f = tf.get(term) ?? 0;
      if (f === 0) continue;
      const num = f * (k1 + 1);
      const den = f + k1 * (1 - b + b * (dl / avgdl));
      s += idf(term) * (num / den);
    }
    return { doc, score: s };
  });

  return scores
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function formatKnowledgeContext(
  hits: Array<{ doc: KnowledgeDoc; score: number }>,
): string {
  if (hits.length === 0) return "";
  return hits
    .map(
      (h, idx) =>
        `[#${idx + 1} ${h.doc.id}] ${h.doc.title}\n${h.doc.body.trim()}`,
    )
    .join("\n\n");
}
