import type { ArchitectureAst, AstComponent } from "./architectureAst";

/**
 * Canvas-grounded resilience / SPOF heuristics.
 *
 * The studio co-pilot previously answered "what is the DR capability / SPOF" with a fixed
 * paragraph (Spanner nam3 + a witness in europe-west1, "0 SPOFs detected") regardless of
 * what was on the canvas. This module derives the answer from the actual AST so the reply
 * is grounded, and it is explicit that the result is a topology heuristic rather than a
 * fault-injection test.
 */

export interface SpofCandidate {
  id: string;
  name: string;
  service: string;
  region: string;
  reason: string;
}

export interface ResilienceAnalysis {
  componentCount: number;
  connectionCount: number;
  primaryRegion: string;
  drRegions: string[];
  drComponents: AstComponent[];
  replicationLinkCount: number;
  regionsInUse: string[];
  spofCandidates: SpofCandidate[];
  declared: { slaTarget: string; rpo: string; rto: string };
  /** 'full' when both DR components and replication links exist; 'partial'; or 'none'. */
  drPosture: "full" | "partial" | "none";
}

const GLOBAL_REGION = /^(global|multi[- ]?region|anycast|worldwide)$/i;
const DR_ROLE = /(witness|replica|standby|failover|dr\b|disaster)/i;

export function analyzeResilience(ast: ArchitectureAst): ResilienceAnalysis {
  const components = ast.components || [];
  const connections = ast.connections || [];
  const drRegions = (ast.metadata?.drRegions || []).filter(Boolean);
  const primaryRegion = ast.metadata?.primaryRegion || "unspecified";

  const drComponents = components.filter(
    (c) => c.tier === "dr" || DR_ROLE.test(c.role || "") || (c.region && drRegions.includes(c.region))
  );
  const replicationLinkCount = connections.filter((k) => k.flowType === "replication").length;

  const inDegree = new Map<string, number>();
  const outDegree = new Map<string, number>();
  for (const k of connections) {
    outDegree.set(k.sourceId, (outDegree.get(k.sourceId) || 0) + 1);
    inDegree.set(k.targetId, (inDegree.get(k.targetId) || 0) + 1);
  }

  const regionsInUse = Array.from(new Set(components.map((c) => c.region).filter(Boolean)));

  const spofCandidates: SpofCandidate[] = [];
  for (const c of components) {
    if (c.tier === "dr" || c.tier === "observability") continue;
    const isGlobal = GLOBAL_REGION.test(c.region || "");
    if (isGlobal) continue; // globally-distributed managed services are not single-region SPOFs

    const onRequestPath = (inDegree.get(c.id) || 0) > 0 && (outDegree.get(c.id) || 0) > 0;
    const soleIngress = c.tier === "ingress" && components.filter((o) => o.tier === "ingress").length === 1;
    if (!onRequestPath && !soleIngress) continue;

    const peerInOtherRegion = components.some(
      (o) => o.id !== c.id && o.service === c.service && o.region && o.region !== c.region
    );
    const hasReplication = connections.some(
      (k) => k.flowType === "replication" && (k.sourceId === c.id || k.targetId === c.id)
    );
    if (peerInOtherRegion || hasReplication) continue;

    spofCandidates.push({
      id: c.id,
      name: c.name,
      service: c.service,
      region: c.region || "unspecified",
      reason: soleIngress && !onRequestPath
        ? "only ingress component and it is pinned to a single region"
        : `in-path component in a single region (${c.region || "unspecified"}) with no replica or replication link`,
    });
  }

  const drPosture: ResilienceAnalysis["drPosture"] =
    drComponents.length > 0 && replicationLinkCount > 0
      ? "full"
      : drComponents.length > 0 || replicationLinkCount > 0 || drRegions.length > 0
        ? "partial"
        : "none";

  return {
    componentCount: components.length,
    connectionCount: connections.length,
    primaryRegion,
    drRegions,
    drComponents,
    replicationLinkCount,
    regionsInUse,
    spofCandidates,
    declared: {
      slaTarget: ast.metadata?.slaTarget || "not declared",
      rpo: ast.metadata?.targetRpo || "not declared",
      rto: ast.metadata?.targetRto || "not declared",
    },
    drPosture,
  };
}

/** Markdown summary for the co-pilot chat. */
export function formatResilienceReply(ast: ArchitectureAst, versionTag: string): string {
  const r = analyzeResilience(ast);
  const drComps = r.drComponents.length
    ? r.drComponents.map((c) => `${c.name} (${c.region || "region n/a"})`).join(", ")
    : "none on canvas";
  const drRegions = r.drRegions.length ? r.drRegions.join(", ") : "none declared";
  const spofBlock = r.spofCandidates.length
    ? r.spofCandidates
        .slice(0, 6)
        .map((s) => `  - **${s.name}** (${s.service}, \`${s.region}\`) — ${s.reason}`)
        .join("\n") + (r.spofCandidates.length > 6 ? `\n  - …and ${r.spofCandidates.length - 6} more` : "")
    : `  - No single-region, unreplicated in-path component found among ${r.componentCount} components.`;
  const postureText =
    r.drPosture === "full"
      ? "DR tier present with replication links"
      : r.drPosture === "partial"
        ? "partial — DR declared or drawn, but replication links and/or DR components are missing"
        : "none — no DR region, DR component, or replication link on the canvas";

  return (
    `📊 **Resilience & SPOF Analysis — grounded on the current canvas** (${ast.metadata.projectTitle} • ${r.componentCount} components / ${r.connectionCount} connections • ${versionTag} unchanged)\n\n` +
    `• **Declared targets (metadata, not verified by test)**: SLA ${r.declared.slaTarget} • RPO ${r.declared.rpo} • RTO ${r.declared.rto}\n` +
    `• **DR footprint**: primary \`${r.primaryRegion}\`; DR regions: ${drRegions}; DR-tier components: ${drComps}; replication links: ${r.replicationLinkCount}. Posture: **${postureText}**.\n` +
    `• **Regions in use**: ${r.regionsInUse.length ? r.regionsInUse.map((x) => `\`${x}\``).join(", ") : "none recorded on components"}\n` +
    `• **SPOF candidates (${r.spofCandidates.length})**:\n${spofBlock}\n` +
    `• **Method**: topology heuristic over AST tiers, regions and \`replication\` edges — not a fault-injection or chaos test. Use "Enforce Multi-Region HA" to add DR regions, replicas and replication links.\n` +
    `• **Canvas guardrail**: non-mutating analytical query — diagram and version (**${versionTag}**) unchanged.`
  );
}
