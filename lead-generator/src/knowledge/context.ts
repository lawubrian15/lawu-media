import { bm25Search, corpus, formatKnowledgeContext } from "./bm25.js";
import { relatedServiceIds } from "./graphStub.js";

/** BM25 + light graph expansion. Swap for full GraphRAG without changing callers. */
export function retrieveContext(userMessage: string): string {
  const hits = bm25Search(userMessage, 4);
  let text = formatKnowledgeContext(hits);
  const topId = hits[0]?.doc.id;
  if (topId) {
    const neighborIds = relatedServiceIds(topId).filter((id) => id !== topId);
    const extra = corpus.filter(
      (d) =>
        neighborIds.includes(d.id) &&
        !hits.some((h) => h.doc.id === d.id),
    );
    if (extra.length) {
      const block = extra
        .map((d) => `[related ${d.id}] ${d.title}\n${d.body.trim()}`)
        .join("\n\n");
      text = text ? `${text}\n\n${block}` : block;
    }
  }
  return text;
}
