/**
 * Google Cloud Native Enterprise Reference Architecture Generator
 * Pure Google Cloud Platform native topology with 6 dedicated zones:
 * 1. Ingress & Edge (Anycast Edge, Cloud Armor, External HTTPS GCLB, Apigee X)
 * 2. Application Core Mesh (GKE Autopilot, Cloud Run, Memorystore Redis)
 * 3. Real-Time Event Streaming (Cloud Pub/Sub, Datastream CDC, Cloud Dataflow Engine)
 * 4. Vertex AI & Intelligence Hub (ScaNN Vector Search, Model Armor Shield, Gemini 3.7 Flash & Pro Hybrid Engine)
 * 5. Multi-Region Lakehouse & DB (Cloud Spanner nam3, BigQuery Lakehouse, Cloud Storage Dual-Region)
 * 6. Zero-Trust Security, SRE Observability & Governance Baseline (VPC-SC, Workload Identity, Cloud KMS HSM, Secret Manager, Dataplex, Cloud SCC)
 */

import { GCP_OFFICIAL_ICONS } from "./gcpIcons";

function encodeXml(str: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getIconSvg(key: keyof typeof GCP_OFFICIAL_ICONS, size = 26): string {
  const icon = GCP_OFFICIAL_ICONS[key];
  if (!icon) return "";
  return `<div style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;">${icon.svg.replace("<svg ", `<svg width="${size}" height="${size}" `)}</div>`;
}

function createNodeCard(
  id: string,
  title: string,
  subtitle: string,
  spec: string,
  badge: string,
  iconKey: keyof typeof GCP_OFFICIAL_ICONS,
  x: number,
  y: number,
  w: number,
  h: number,
  badgeColor = "#2563EB",
  extraDetails?: string[],
  isDark = false
): string {
  const iconHtml = getIconSvg(iconKey, 24);
  const cardFill = isDark ? "#111827" : "#FFFFFF";
  const cardStroke = isDark ? "#1F2937" : "#CBD5E1";
  const titleColor = isDark ? "#F8FAFC" : "#0F172A";
  const subtitleColor = isDark ? "#94A3B8" : "#64748B";
  const detailColor = isDark ? "#CBD5E1" : "#475569";
  const specBg = isDark ? "#1E293B" : "#F1F5F9";
  const specText = isDark ? "#E2E8F0" : "#334155";
  const dividerColor = isDark ? "#334155" : "#E2E8F0";

  let detailsHtml = "";
  if (extraDetails && extraDetails.length > 0) {
    detailsHtml =
      `<div style="display:flex;flex-direction:column;gap:2.5px;margin:3px 0;border-top:1px dashed ${dividerColor};padding-top:3px;">` +
      extraDetails
        .map(
          (d) =>
            `<div style="font-size:8px;color:${detailColor};display:flex;align-items:flex-start;gap:3px;line-height:1.25;"><span style="color:${badgeColor};font-weight:700;line-height:1;">▸</span><span>${encodeXml(d)}</span></div>`
        )
        .join("") +
      `</div>`;
  }

  const label =
    `<div style="padding:8px 12px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;box-sizing:border-box;display:flex;flex-direction:column;height:100%;justify-content:space-between;overflow:hidden;">` +
    `<div>` +
    `<div style="display:flex;align-items:center;gap:6px;">` +
    `<div style="flex-shrink:0;">${iconHtml}</div>` +
    `<div style="flex:1;min-width:0;">` +
    `<div style="font-size:11px;font-weight:800;color:${titleColor};line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${encodeXml(title)}</div>` +
    `<div style="font-size:8px;font-weight:600;color:${subtitleColor};line-height:1.2;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${encodeXml(subtitle)}</div>` +
    `</div>` +
    `</div>` +
    detailsHtml +
    `</div>` +
    `<div style="display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:2px;">` +
    `<div style="font-size:7.5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:${specText};background:${specBg};padding:2px 5px;border-radius:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:${w - 90}px;font-weight:600;">${encodeXml(spec)}</div>` +
    `<div style="font-size:7.5px;font-weight:800;color:${badgeColor};background:${badgeColor}15;padding:2px 5px;border-radius:3px;border:1px solid ${badgeColor}30;white-space:nowrap;flex-shrink:0;">${encodeXml(badge)}</div>` +
    `</div>` +
    `</div>`;

  return (
    `<mxCell id="${id}" value="${encodeXml(label)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardFill};strokeColor=${cardStroke};strokeWidth=1.5;shadow=1;arcSize=8;" vertex="1" parent="1">` +
    `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
    `</mxCell>`
  );
}

function createZoneBox(
  id: string,
  title: string,
  subnet: string,
  x: number,
  y: number,
  w: number,
  h: number,
  bg: string,
  stroke: string,
  isDark = false
): string {
  const titleColor = isDark ? "#F1F5F9" : "#1E293B";
  const badgeBg = isDark ? "#1E293B" : "#FFFFFF";
  const badgeText = isDark ? "#CBD5E1" : "#334155";
  const badgeBorder = isDark ? "#334155" : "#CBD5E1";

  const headerHtml =
    `<div style="padding:8px 12px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:space-between;">` +
    `<div style="font-size:11.5px;font-weight:800;color:${titleColor};letter-spacing:0.3px;white-space:nowrap;">${encodeXml(title)}</div>` +
    (subnet
      ? `<div style="font-size:8.5px;font-family:ui-monospace,Menlo,monospace;font-weight:700;color:${badgeText};background:${badgeBg};padding:1.5px 7px;border-radius:10px;border:1px solid ${badgeBorder};box-shadow:0 1px 2px rgba(0,0,0,0.05);white-space:nowrap;">${encodeXml(subnet)}</div>`
      : "") +
    `</div>`;

  return (
    `<mxCell id="${id}" value="${encodeXml(headerHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${bg};strokeColor=${stroke};strokeWidth=1.5;dashed=1;dashPattern=6 4;verticalAlign=top;align=left;spacingTop=0;arcSize=6;" vertex="1" parent="1">` +
    `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
    `</mxCell>`
  );
}

interface EdgeOptions {
  dashed?: number;
  exitX?: number;
  exitY?: number;
  entryX?: number;
  entryY?: number;
  waypoints?: Array<{ x: number; y: number }>;
  labelPosition?: "above" | "below" | "center" | "right";
  labelOffset?: number;
  directStraight?: boolean;
  isDark?: boolean;
}

function createEdge(
  id: string,
  source: string,
  target: string,
  step: string,
  label: string,
  color: string,
  options: EdgeOptions = {}
): string {
  const {
    dashed = 0,
    exitX = 1,
    exitY = 0.5,
    entryX = 0,
    entryY = 0.5,
    waypoints = [],
    labelPosition = "above",
    directStraight = waypoints.length === 0,
    isDark = false,
  } = options;

  const pillBg = isDark ? "#1E293B" : "#FFFFFF";
  const pillBorder = isDark ? "#334155" : "#CBD5E1";
  const labelTextColor = isDark ? "#F8FAFC" : "#0F172A";

  const labelHtml =
    `<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:inline-flex;align-items:center;gap:3.5px;background:${pillBg};padding:1.5px 4.5px;border-radius:4px;border:1px solid ${pillBorder};box-shadow:0 1px 2px rgba(0,0,0,0.06);">` +
    `<span style="color:#FFFFFF;background:${color};font-size:7.5px;font-weight:800;padding:1px 3.5px;border-radius:2.5px;">${encodeXml(step)}</span>` +
    `<span style="color:${labelTextColor};font-size:8px;font-weight:750;white-space:nowrap;">${encodeXml(label)}</span>` +
    `</div>`;

  let pts = "";
  if (waypoints.length > 0) {
    pts = `<Array as="points">${waypoints.map((p) => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
  }

  let labelPlacementStyle = "verticalAlign=bottom;spacingBottom=4;";
  if (labelPosition === "below") {
    labelPlacementStyle = "verticalAlign=top;spacingTop=4;";
  } else if (labelPosition === "right") {
    labelPlacementStyle = "align=left;spacingLeft=6;verticalAlign=middle;";
  } else if (labelPosition === "center") {
    labelPlacementStyle = `verticalAlign=middle;labelBackgroundColor=${pillBg};labelBorderColor=${pillBorder};`;
  }

  const dashStyle = dashed ? "dashed=1;dashPattern=5 4;" : "dashed=0;";
  const edgeStyleStr = directStraight
    ? "edgeStyle=none;"
    : "edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;";

  return (
    `<mxCell id="${id}" value="${encodeXml(labelHtml)}" style="${edgeStyleStr}html=1;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};strokeColor=${color};strokeWidth=2;${dashStyle}${labelPlacementStyle}labelBackgroundColor=none;" edge="1" parent="1" source="${source}" target="${target}">` +
    `<mxGeometry relative="1" as="geometry">${pts}</mxGeometry>` +
    `</mxCell>`
  );
}

export interface GcpNativeArchOptions {
  projectTitle?: string;
  projectName?: string;
  useCaseName?: string;
  domain?: string;
  theme?: "light" | "dark";
}

export function generateGcpNativeArchitectureXml(options: GcpNativeArchOptions = {}): string {
  const isDark = options.theme === "dark";
  const canvasBg = isDark ? "#0B111E" : "#FFFFFF";
  const cells: string[] = [];

  const title =
    options.projectTitle ||
    (options.projectName && options.useCaseName
      ? `${options.projectName} — ${options.useCaseName}`
      : "Google Cloud Enterprise Reference Architecture");
  const domainBadge = options.domain ? options.domain.toUpperCase() : "PRODUCTION TOPOLOGY";

  // 1. TOP HEADER BANNER - Fully filling X=40 to X=1640 (W=1600, H=52)
  const headerHtml =
    `<div style="width:1560px;box-sizing:border-box;padding:0 8px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:space-between;color:#FFFFFF;">` +
    `<div style="display:flex;align-items:center;gap:14px;">` +
    `<div style="display:flex;align-items:center;gap:8px;">` +
    `<span style="font-size:18px;">⚡</span>` +
    `<div style="font-size:16px;font-weight:800;letter-spacing:0.5px;color:#38BDF8;">${encodeXml(title)}</div>` +
    `</div>` +
    `<div style="font-size:10px;font-weight:800;color:#38BDF8;background:#0369A130;border:1px solid #38BDF850;padding:3px 10px;border-radius:6px;letter-spacing:0.5px;">${encodeXml(domainBadge)}</div>` +
    `</div>` +
    `<div style="display:flex;align-items:center;gap:18px;font-size:11px;color:#E2E8F0;font-weight:600;">` +
    `<span>🌐 Dual-Hub VPC: <b style="color:#FFFFFF;">10.100.0.0/16 • 10.200.0.0/16</b></span>` +
    `<span style="color:#34D399;">● 99.999% SLA (nam3 Multi-Region)</span>` +
    `<span style="color:#C084FC;">✦ Vertex AI & Gemini 3.7 Flash Reasoning</span>` +
    `</div>` +
    `</div>`;

  cells.push(
    `<mxCell id="hdr" value="${encodeXml(headerHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;shadow=1;arcSize=6;align=left;spacingLeft=14;" vertex="1" parent="1"><mxGeometry x="40" y="20" width="1600" height="52" as="geometry"/></mxCell>`
  );

  // 2. BODY ZONES: Exact Symmetrical Distribution
  // Left Zone 1: Ingress (X=40..250, W=210)
  // Middle Zone 2 & 3: Compute & Streaming (X=265..825, W=560)
  // Right Zone 4 & 5: Vertex AI & Lakehouse (X=845..1640, W=795)
  const z1Bg = isDark ? "#061811" : "#F0FDF4";
  const z1Stroke = isDark ? "#10B981" : "#86EFAC";
  const z2Bg = isDark ? "#081528" : "#EFF6FF";
  const z2Stroke = isDark ? "#3B82F6" : "#93C5FD";
  const z3Bg = isDark ? "#1E1308" : "#FFF7ED";
  const z3Stroke = isDark ? "#F97316" : "#FDBA74";
  const z4Bg = isDark ? "#170D28" : "#FAF5FF";
  const z4Stroke = isDark ? "#A855F7" : "#D8B4FE";
  const z5Bg = isDark ? "#061A19" : "#F0FDFA";
  const z5Stroke = isDark ? "#14B8A6" : "#5EEAD4";
  const z6Bg = isDark ? "#0F172A" : "#F8FAFC";
  const z6Stroke = isDark ? "#334155" : "#CBD5E1";

  cells.push(createZoneBox("z1", "1. INGRESS & EDGE", "Anycast Edge", 40, 85, 210, 660, z1Bg, z1Stroke, isDark));
  cells.push(createZoneBox("z2", "2. APPLICATION CORE MESH", "VPC 10.200.0.0/16", 265, 85, 560, 360, z2Bg, z2Stroke, isDark));
  cells.push(createZoneBox("z3", "3. REAL-TIME EVENT STREAMING", "Subnet 10.200.32.0/20", 265, 465, 560, 280, z3Bg, z3Stroke, isDark));
  cells.push(createZoneBox("z4", "4. VERTEX AI & INTELLIGENCE HUB", "PSC / Vertex VPC Endpoint", 845, 85, 795, 360, z4Bg, z4Stroke, isDark));
  cells.push(createZoneBox("z5", "5. MULTI-REGION LAKEHOUSE & DB", "nam3 Multi-Region", 845, 465, 795, 280, z5Bg, z5Stroke, isDark));

  // 3. FOOTER ZONE 6 (Zero-Trust Security Baseline spanning X=40 to X=1640, Y=760, W=1600, H=140)
  cells.push(
    createZoneBox(
      "z6",
      "6. ZERO-TRUST SECURITY, SRE OBSERVABILITY & GOVERNANCE BASELINE",
      "VPC Service Controls: 08492041284",
      40,
      760,
      1600,
      140,
      z6Bg,
      z6Stroke,
      isDark
    )
  );

  // ZONE 1: INGRESS (X=40, W=210, Card W=178, X_pos=56) - 4 cards evenly distributed across full height (Y=125..725)
  cells.push(
    createNodeCard("n_client", "External Clients", "Web, Mobile, Partner APIs", "TLS 1.3 / QUIC", "INTERNET", "compute_engine", 56, 125, 178, 105, "#0284C7", [
      "TLS 1.3 / HTTP/3 Ingress",
      "Global Anycast Edge PoPs",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_armor", "Cloud Armor & DNS", "L7 WAF & DDoS Shield", "CRS 3.3 • 10k/min", "SECURITY", "cloud_armor", 56, 290, 178, 105, "#DC2626", [
      "OWASP Top 10 Mitigation",
      "Adaptive DDoS Layer 3/7",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_gclb", "Global HTTPS LB", "Anycast L7 App LB", "p99 SSL <12ms", "EDGE LB", "cloud_armor", 56, 455, 178, 105, "#0284C7", [
      "Single Virtual IP Routing",
      "Global SSL Acceleration",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_apigee", "Apigee X Gateway", "API Management & Auth", "50k TPS • OIDC JWT", "GATEWAY", "iap", 56, 620, 178, 105, "#7C3AED", [
      "OAuth2 & OIDC Token Verify",
      "Token Bucket Rate Limit",
    ], isDark)
  );

  // ZONE 2: APP VPC (X=265, W=560, Card W=515, X_pos=287)
  cells.push(
    createNodeCard("n_gke", "GKE Autopilot Pods", "Microservices Orchestration Cluster", "c3-standard-8 • Cilium eBPF", "K8S MESH", "gke_autopilot", 287, 130, 515, 90, "#2563EB", [
      "Workload Identity Federation (Keyless) & Envoy Mesh (mTLS)",
      "Horizontal Pod Autoscaling with Cloud Operations Telemetry",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_cloudrun", "Cloud Run Services", "Serverless Microservices & Ingestion APIs", "Direct VPC Egress 10.200.16.0/20", "CONTAINER", "cloud_run", 287, 235, 515, 90, "#2563EB", [
      "Automated 0-to-N Autoscaling with Concurrent Multi-Threading",
      "Direct Serverless VPC Ingress Connector with Internal LB",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_redis", "Memorystore Redis 7.2", "Session State & Low-Latency Query Cache", "<1ms read/write latency • Multi-AZ", "CACHE", "memorystore", 287, 340, 515, 90, "#D97706", [
      "In-Memory Read Replica Fleet (<1ms) with Auto-Failover SLA",
      "VPC Peering Low-Latency & TLS-Encrypted Transport",
    ], isDark)
  );

  // ZONE 3: EVENT STREAMING (X=265, W=560, Cards X_pos=287, Total W=515)
  cells.push(
    createNodeCard("n_pubsub", "Cloud Pub/Sub", "Real-Time Message Bus", "10M+ msg/s • Schema Reg", "EVENT BUS", "cloud_storage", 287, 515, 242, 95, "#EA580C", [
      "Exact-Once Delivery & DLQ",
      "Avro/Protobuf Schema Registry",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_datastream", "Datastream CDC", "Serverless DB WAL Stream", "<1s Replication Lag", "CDC SYNC", "spanner", 560, 515, 242, 95, "#D97706", [
      "Serverless PostgreSQL/MySQL Stream",
      "Automated Schema Evolution",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_dataflow", "Cloud Dataflow Engine", "Apache Beam Stream ETL Pipeline", "10s Sliding Windows • Liquid Sharding", "STREAM ETL", "bigquery", 287, 625, 515, 105, "#059669", [
      "Liquid Sharding Auto-Rebalancing for Dynamic Hot-Spot Elimination",
      "Sliding Window Aggregation, Deduplication & Exact-Once Sinks into Lakehouse",
    ], isDark)
  );

  // ZONE 4: VERTEX AI & INTELLIGENCE HUB (X=845, W=795, Total inside W=755, X_pos=865..1620)
  // Left Column W=325 (X=865..1190), Gap = 80px (X=1190..1270), Right Column (Gemini) W=350 (X=1270..1620)
  cells.push(
    createNodeCard("n_scann", "Vertex Vector Search (ScaNN)", "768-dim Embeddings & Search Grounding", "p99 <2.5ms @ 10M vectors", "EMBEDDINGS", "vertex_vector_search", 865, 130, 325, 140, "#7C3AED", [
      "Tree-AH Quantized Vector Index & Graph Partitioning",
      "Google Search & Enterprise Document Grounding",
      "Dynamic Real-Time Index Sharding & Continuous Sync",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_armor_ai", "Model Armor Shield", "L7 Prompt & Model Safety Guardrails", "Redact PII • Jailbreak Filter", "GUARDRAIL", "cloud_dlp", 865, 285, 325, 145, "#6D28D9", [
      "Automated Sensitive Data Protection (DLP) Redaction",
      "Real-Time Adversarial Jailbreak & Injection Defense",
      "Enterprise Toxicity & Hallucination Filter Gate",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_gemini", "Gemini 3.7 Flash & Pro Engine", "3.7 Flash (Thinking) + 2.5 Pro (Deep ReAct)", "2M Context • Dynamic Thinking", "HYBRID REASONING", "gemini", 1270, 130, 350, 300, "#9333EA", [
      "Gemini 3.7 Flash Native Dynamic Thinking & Reasoning",
      "Gemini 2.5 Pro Deep ReAct Orchestration & Planning",
      "Vertex AI Context Caching (TTL-based KV Memory)",
      "Tool Calling AST & Ephemeral Sandbox Execution",
      "Constrained Decoding & Strict JSON Schema Enforcement",
    ], isDark)
  );

  // ZONE 5: MULTI-REGION LAKEHOUSE & DB (X=845, W=795) - 3 EQUAL CARDS (W=225) & EQUAL GAPS (40px)
  cells.push(
    createNodeCard("n_spanner", "Cloud Spanner (nam3)", "Multi-Region ACID Database", "TrueTime <5ms • 99.999%", "PRIMARY DB", "spanner", 865, 515, 225, 215, "#059669", [
      "nam3 Multi-Region Topology",
      "100k QPS Distributed ACID",
      "Zero Maintenance SLA",
      "Automatic Data Sharding",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_bigquery", "BigQuery Lakehouse", "Serverless Analytics & Storage", "BigLake Iceberg Engine", "ANALYTICS", "bigquery", 1130, 515, 225, 215, "#0284C7", [
      "Iceberg Metadata Tables on GCS",
      "Real-time Continuous Ingestion",
      "BigQuery Studio SQL Analytics",
      "BI Engine In-Memory Query",
    ], isDark)
  );
  cells.push(
    createNodeCard("n_gcs", "Cloud Storage (Dual-Region)", "Data Lake & Cold Archival", "CMEK • Object Lock WORM", "LAKE STORE", "cloud_storage", 1395, 515, 225, 215, "#0D9488", [
      "Dual-Region Bucket Redundancy",
      "Automated Autoclass Tiering",
      "FIPS 140-3 CMEK Key Security",
      "Immutable Object Retention",
    ], isDark)
  );

  // ZONE 6: ZERO-TRUST BASELINE (X=40, W=1600)
  const secNodes = [
    { id: "n_vpcsc", title: "VPC Service Controls", sub: "Perimeter Isolation", spec: "Policy 08492041284", badge: "ZERO TRUST", icon: "vpc_sc" as const },
    { id: "n_wif", title: "Workload Identity", sub: "OIDC/SPIFFE Tokens", spec: "Keyless Auth 3600s", badge: "IAM", icon: "iap" as const },
    { id: "n_kms", title: "Cloud KMS HSM", sub: "FIPS 140-3 Hardware Key", spec: "AES-256 CMEK Auto-Rot", badge: "CRYPTO", icon: "scc" as const },
    { id: "n_secrets", title: "Secret Manager", sub: "Encrypted Credentials", spec: "Versioned API Keys", badge: "VAULT", icon: "cloud_dlp" as const },
    { id: "n_dataplex", title: "Dataplex Governance", sub: "Catalog & Lineage", spec: "Attribute-Based Policy", badge: "METADATA", icon: "cloud_logging" as const },
    { id: "n_scc", title: "Cloud SCC Premium", sub: "SIEM & Threat Detection", spec: "Real-time SecOps", badge: "OBSERVABILITY", icon: "cloud_monitoring" as const },
  ];

  secNodes.forEach((node, idx) => {
    const xPos = 56 + idx * 265;
    cells.push(
      createNodeCard(node.id, node.title, node.sub, node.spec, node.badge, node.icon, xPos, 805, 248, 75, "#475569", undefined, isDark)
    );
  });

  // CONNECTORS WITH ZERO COLLISION & PERFECT CHANNEL WAYPOINTS
  // ❶ Ingress Flow - 100% Straight Geometrical Vertical Lines (X=145)
  cells.push(createEdge("e1", "n_client", "n_armor", "❶", "HTTPS / 443", "#0284C7", { exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, labelPosition: "right", directStraight: true, isDark }));
  cells.push(createEdge("e2", "n_armor", "n_gclb", "❷", "WAF Verified", "#0284C7", { exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, labelPosition: "right", directStraight: true, isDark }));
  cells.push(createEdge("e3", "n_gclb", "n_apigee", "❸", "L7 Terminated", "#0284C7", { exitX: 0.5, exitY: 1, entryX: 0.5, entryY: 0, labelPosition: "right", directStraight: true, isDark }));

  // ❹ Ingress to Compute Tier (GKE + Cloud Run) - Two Distinct Non-Overlapping Channels
  cells.push(createEdge("e4a", "n_apigee", "n_gke", "❹a", "mTLS / gRPC Direct", "#2563EB", { exitX: 1, exitY: 0.4, entryX: 0, entryY: 0.5, waypoints: [{ x: 248, y: 662 }, { x: 248, y: 175 }], labelPosition: "above", isDark }));
  cells.push(createEdge("e4b", "n_apigee", "n_cloudrun", "❹b", "Serverless Route", "#2563EB", { exitX: 1, exitY: 0.6, entryX: 0, entryY: 0.5, waypoints: [{ x: 258, y: 683 }, { x: 258, y: 280 }], labelPosition: "above", isDark }));

  // ❺ App Mesh internal cache check - Clean 90-degree Orthogonal Loop
  cells.push(createEdge("e5", "n_gke", "n_redis", "❺", "Cache Check (<1ms)", "#D97706", { exitX: 0, exitY: 0.8, entryX: 0, entryY: 0.5, waypoints: [{ x: 276, y: 202 }, { x: 276, y: 385 }], labelPosition: "right", isDark }));

  // ❻ App to Event Bus - Drops in Channel X=824 down to Y=502 (below Zone 3 title, above Pub/Sub)
  cells.push(createEdge("e6", "n_gke", "n_pubsub", "❻", "Publish CDC Event", "#EA580C", { dashed: 1, exitX: 1, exitY: 0.8, entryX: 0.4, entryY: 0, waypoints: [{ x: 824, y: 202 }, { x: 824, y: 502 }, { x: 384, y: 502 }], labelPosition: "above", isDark }));

  // ❼ Event Streaming pipeline - 100% Straight Geometrical Horizontal Line (Y=562.5)
  cells.push(createEdge("e7", "n_datastream", "n_pubsub", "❼", "WAL CDC", "#EA580C", { dashed: 1, exitX: 0, exitY: 0.5, entryX: 1, entryY: 0.5, labelPosition: "above", directStraight: true, isDark }));
  cells.push(createEdge("e8", "n_pubsub", "n_dataflow", "❽", "Liquid Sharding", "#EA580C", { dashed: 1, exitX: 0.5, exitY: 1, entryX: 0.235, entryY: 0, labelPosition: "right", directStraight: true, isDark }));

  // ❾ App to Primary ACID DB (Lane X=835) - Clean 90-degree Orthogonal Route
  cells.push(createEdge("e9", "n_gke", "n_spanner", "❾", "ACID Transact", "#059669", { exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.22093, waypoints: [{ x: 835, y: 175 }, { x: 835, y: 562.5 }], labelPosition: "above", isDark }));

  // ❿ Database Change Streams to CDC - 100% Straight Geometrical Horizontal Line (Y=562.5)
  cells.push(createEdge("e10_cdc", "n_spanner", "n_datastream", "❿", "Change Stream", "#D97706", { dashed: 1, exitX: 0, exitY: 0.22093, entryX: 1, entryY: 0.5, labelPosition: "above", directStraight: true, isDark }));

  // ⓫ Streaming ETL to Lakehouse - Clean 90-degree Orthogonal Route into BigQuery Bottom
  cells.push(createEdge("e11_lake", "n_dataflow", "n_bigquery", "⓫", "Streaming Micro-batch", "#059669", { exitX: 1, exitY: 0.5, entryX: 0.5, entryY: 1, waypoints: [{ x: 835, y: 677.5 }, { x: 835, y: 742 }, { x: 1242.5, y: 742 }], labelPosition: "above", isDark }));

  // ⓬-⓯ AGENTIC AI CLOSED LOOP
  // ⓬a GKE -> Vertex ScaNN - 100% Straight Geometrical Horizontal Line (Y=175)
  cells.push(createEdge("e12_scann", "n_gke", "n_scann", "⓬a", "Vector RAG", "#7C3AED", { dashed: 1, exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.321429, labelPosition: "above", directStraight: true, isDark }));

  // ⓬b GKE -> Model Armor Shield - Clean 90-degree Orthogonal Channel (Lane X=840)
  cells.push(createEdge("e12_armor", "n_gke", "n_armor_ai", "⓬b", "L7 Guardrail & DLP", "#6D28D9", { dashed: 1, exitX: 1, exitY: 0.7, entryX: 0, entryY: 0.5, waypoints: [{ x: 840, y: 193 }, { x: 840, y: 357.5 }], labelPosition: "above", isDark }));

  // ⓭ Model Armor -> Gemini Core - 100% Straight Geometrical Horizontal Line (Y=357.5)
  cells.push(createEdge("e13_prompt", "n_armor_ai", "n_gemini", "⓭", "Clean Prompt", "#6D28D9", { exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.758333, labelPosition: "above", directStraight: true, isDark }));

  // ⓮ ScaNN -> Gemini Core - 100% Straight Geometrical Horizontal Line (Y=200)
  cells.push(createEdge("e14_rag", "n_scann", "n_gemini", "⓮", "RAG Context", "#7C3AED", { dashed: 1, exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.233333, labelPosition: "above", directStraight: true, isDark }));

  // ⓯ Gemini -> GKE - Enters GKE top at X=520 (in 100% open space between 'APPLICATION CORE MESH' and 'VPC' badge)
  cells.push(createEdge("e15_react", "n_gemini", "n_gke", "⓯", "ReAct Tool Calling Loop", "#9333EA", { dashed: 1, exitX: 0.5, exitY: 0, entryX: 0.452, entryY: 0, waypoints: [{ x: 1445, y: 78 }, { x: 520, y: 78 }], labelPosition: "below", isDark }));

  // ⓰ BigQuery to Lake Storage - 100% Straight Geometrical Horizontal Line (Y=622.5)
  cells.push(createEdge("e16_gcs", "n_bigquery", "n_gcs", "⓰", "BigLake Sync", "#0D9488", { exitX: 1, exitY: 0.5, entryX: 0, entryY: 0.5, labelPosition: "above", directStraight: true, isDark }));

  // ⓱ Gemini LLMOps Telemetry to BigQuery Lakehouse - Clean 90-degree Orthogonal Route
  cells.push(createEdge("e17_evals", "n_gemini", "n_bigquery", "⓱", "Evals & Tracing", "#64748B", { dashed: 1, exitX: 0, exitY: 0.9, entryX: 0.5, entryY: 0, waypoints: [{ x: 1242.5, y: 400 }], labelPosition: "above", isDark }));

  return (
    `<mxfile host="embed.diagrams.net">` +
    `<diagram id="spatial_gcp_reference_arch" name="${encodeXml(title)}">` +
    `<mxGraphModel dx="1680" dy="980" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1680" pageHeight="980" background="${canvasBg}">` +
    `<root>` +
    `<mxCell id="0"/>` +
    `<mxCell id="1" parent="0"/>` +
    cells.join("\n") +
    `</root>` +
    `</mxGraphModel>` +
    `</diagram>` +
    `</mxfile>`
  );
}
