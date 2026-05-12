/**
 * Graph layer placeholder: map intents → service nodes, enrich BM25 hits.
 * Replace with a real graph store (Nebula, Neo4j, or in-memory adjacency) when you go elite.
 */
export interface ServiceNode {
  id: string;
  label: string;
  related: string[];
}

const nodes: ServiceNode[] = [
  { id: "svc-web", label: "Web / landing", related: ["svc-ads", "svc-crm"] },
  { id: "svc-ads", label: "Paid acquisition", related: ["svc-web", "svc-crm"] },
  { id: "svc-crm", label: "CRM & routing", related: ["svc-web", "svc-ads"] },
];

export function relatedServiceIds(seedId: string): string[] {
  const n = nodes.find((x) => x.id === seedId);
  return n ? [seedId, ...n.related] : [];
}
