/**
 * Brand-New GCP Native Multi-Tier Enterprise Cloud Architecture Generator
 * Pure Google Cloud Platform native topology with 6 dedicated tiers:
 * 1. Global Edge & Perimeter Ingress (Cloud Armor, Cloud CDN, External HTTPS GCLB, IAP, DNSSEC)
 * 2. API Gateway & Workload Compute (Apigee, GKE Autopilot, Cloud Run, Cloud Functions Gen2, Cloud Tasks)
 * 3. Vertex AI & GenAI Platform (Gemini 2.5 Flash/Pro, ScaNN Vector Search, Model Armor, Agent Builder)
 * 4. Event Mesh & Streaming (Cloud Pub/Sub, Cloud Dataflow, Eventarc, Datastream CDC)
 * 5. Unified Lakehouse & Multi-Region Storage (Cloud Spanner TrueTime, BigQuery Studio, AlloyDB, GCS CMEK)
 * 6. Zero-Trust Security, Sovereign Governance & Observability (VPC-SC, Cloud KMS, Workload Identity, Dataplex, Operations Suite, SCC)
 */

import { renderGcpIconHtml } from "./gcpIcons";

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export interface GcpNativeArchOptions {
  projectTitle?: string;
  projectName?: string;
  useCaseName?: string;
  domain?: string;
  theme?: "light" | "dark";
}

export function generateGcpNativeArchitectureXml(options: GcpNativeArchOptions = {}): string {
  const isDark = options.theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const cardBg = isDark ? "#111827" : "#FFFFFF";
  const cardBorder = isDark ? "#1F2937" : "#E2E8F0";
  const textPrimary = isDark ? "#F9FAFB" : "#0F172A";
  const textSecondary = isDark ? "#9CA3AF" : "#64748B";
  const pillBg = isDark ? "#1E293B" : "#F1F5F9";

  const title = options.projectTitle || (options.projectName && options.useCaseName ? `${options.projectName} — ${options.useCaseName}` : "Enterprise Google Cloud Native Architecture");
  const subtitle = options.useCaseName ? `${options.useCaseName} • Production-Grade GCP Reference Topology` : "Multi-Region Microservices, Vertex AI GenAI Studio & Unified BigQuery Lakehouse";
  const domainLabel = options.domain ? options.domain.toUpperCase() : "ENTERPRISE PRODUCTION";

  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const edge = (id: string, v: string, s: string, t: string, style: string, extraPts?: { x: number; y: number }[]) => {
    let ptsXml = "";
    if (extraPts && extraPts.length > 0) {
      ptsXml = `\n            <Array as="points">\n              ${extraPts.map((p) => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("\n              ")}\n            </Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(v)}" edge="1" parent="1" source="${s}" target="${t}" style="${style}">\n          <mxGeometry relative="1" as="geometry">${ptsXml}\n          </mxGeometry>\n        </mxCell>`
    );
  };

  // Outer Canvas Backdrop
  cell(
    "canvas_bg",
    "",
    20,
    20,
    1560,
    920,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? "#060B13" : "#F8FAFC"};strokeColor=${isDark ? "#1E293B" : "#E2E8F0"};strokeWidth=2;`
  );

  // Top Header Banner (Engineering Specification Standard)
  cell(
    "header_banner",
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;">
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="background:#1A73E8;color:#FFFFFF;font-size:10px;font-weight:800;padding:3px 8px;border-radius:4px;letter-spacing:0.5px;">GCP PRODUCTION SPECIFICATION</span>
          <span style="background:${pillBg};color:${isDark ? "#60A5FA" : "#1D4ED8"};font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;">VPC: 10.100.0.0/16 &bull; 10.200.0.0/16</span>
          <span style="color:${textSecondary};font-size:10px;font-weight:600;">ACTIVE-ACTIVE MULTI-REGION (99.999% SLA &bull; RPO=0, RTO &lt; 30s)</span>
        </div>
        <div style="font-size:19px;font-weight:800;color:${textPrimary};letter-spacing:-0.3px;">${title}</div>
        <div style="font-size:11px;color:${textSecondary};margin-top:2px;">Production Topology: GCLB &bull; Apigee X &bull; GKE Autopilot &bull; Vertex AI ScaNN &bull; Pub/Sub Mesh &bull; TrueTime Spanner &bull; BigLake</div>
      </div>
    </div>`,
    50,
    35,
    1100,
    65,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;"
  );

  // Top Right Google Cloud Technical Badge
  cell(
    "brand_capsule",
    `<div style="display:flex;align-items:center;gap:10px;padding:4px 8px;">
      <div style="width:36px;height:36px;background:${isDark ? "#1E293B" : "#EFF6FF"};border-radius:8px;border:1px solid #1A73E8;display:flex;align-items:center;justify-content:center;">
        ${renderGcpIconHtml("gemini", 22, "brand")}
      </div>
      <div style="text-align:left;">
        <div style="font-size:12px;font-weight:800;color:${isDark ? "#93C5FD" : "#1A73E8"};">Google Cloud Platform</div>
        <div style="font-size:9.5px;color:${textSecondary};">Zero-Trust Enterprise Reference Architecture</div>
      </div>
    </div>`,
    1240,
    35,
    310,
    65,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${isDark ? "#1E3A8A" : "#BFDBFE"};strokeWidth=1.5;align=center;verticalAlign=middle;`
  );

  // -------------------------------------------------------------------------------------------------------------------
  // 5 MAIN VERTICAL ARCHITECTURE TIERS (Y: 115 to 735, Height: 605px)
  // -------------------------------------------------------------------------------------------------------------------

  // TIER 1: GLOBAL EDGE & INGRESS (X: 50, W: 275) - Subnet 10.100.0.0/16
  cell(
    "col_edge",
    `<div style="font-size:12px;font-weight:800;color:#1D4ED8;margin-bottom:2px;">🌐 1. GLOBAL EDGE &amp; INGRESS</div>
     <div style="font-size:9px;color:${textSecondary};">Anycast IP &bull; DDoS L3-L7 &bull; TLS 1.3 &bull; OAuth2/OIDC</div>`,
    50,
    115,
    275,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? "#0B1528" : "#EFF6FF"};strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 1.1: Cloud Armor WAF & Adaptive DDoS
  cell(
    "pod_armor",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("cloud_armor", 18, "armor")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Armor (WAF &amp; DDoS)</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">OWASP Top 10, ModSecurity CRS 3.3, ML L7 Rate Limit (10k req/min/IP), reCAPTCHA Enterprise &gt; 0.7.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#2563EB;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">ModSec CRS 3.3</span>
        <span style="background:${pillBg};color:#2563EB;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">L7 Rate-Limit</span>
      </div>
    </div>`,
    62,
    165,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 1.2: Cloud CDN & Media Edge
  cell(
    "pod_cdn",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("cloud_cdn", 18, "cdn")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud CDN (HTTP/3 Edge)</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">100+ Anycast PoPs, HTTP/3 (QUIC) &amp; TLS 1.3 0-RTT, Byte-Range Slicing, Cache TTL: 86400s.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#0284C7;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">QUIC / HTTP3</span>
        <span style="background:${pillBg};color:#0284C7;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">0-RTT Handshake</span>
      </div>
    </div>`,
    62,
    275,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 1.3: Global External Load Balancer (GCLB)
  cell(
    "pod_gclb",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("gclb", 18, "gclb")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Global HTTPS Load Balancer</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">Anycast IPv4/IPv6, Serverless NEGs, SSL Policy: RESTRICTED (ECDHE-ECDSA), p99 SSL &lt; 12ms.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#1D4ED8;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Serverless NEGs</span>
        <span style="background:${pillBg};color:#1D4ED8;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">p99 &lt; 12ms</span>
      </div>
    </div>`,
    62,
    385,
    250,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 1.4: Identity-Aware Proxy (IAP)
  cell(
    "pod_iap",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("iap", 18, "iap")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Identity-Aware Proxy (IAP)</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">Zero-Trust OIDC JWT Auth, Context-Aware Access (mTLS device posture), X-Goog-IAP-JWT Header.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#7C3AED;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">OIDC / RS256</span>
        <span style="background:${pillBg};color:#7C3AED;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Context Access</span>
      </div>
    </div>`,
    62,
    500,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 1.5: Cloud DNSSEC & Traffic Director
  cell(
    "pod_dns",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("cloud_dns", 18, "dns")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud DNS &amp; Traffic Director</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">Authoritative DNSSEC RSA-SHA256, 100% SLA, Geo-fenced Split-Horizon, 30s Health-checked failover.</div>
    </div>`,
    62,
    610,
    250,
    85,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // TIER 2: API GATEWAY & WORKLOAD COMPUTE (X: 350, W: 285) - Subnet 10.200.0.0/16
  cell(
    "col_compute",
    `<div style="font-size:12px;font-weight:800;color:#7C3AED;margin-bottom:2px;">⚡ 2. API &amp; WORKLOAD COMPUTE</div>
     <div style="font-size:9px;color:${textSecondary};">Apigee X &bull; GKE Autopilot (us-central1-a/b/c) &bull; Cloud Run</div>`,
    350,
    115,
    285,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? "#140E26" : "#FAF5FF"};strokeColor=#8B5CF6;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 2.1: Apigee X Enterprise Gateway
  cell(
    "pod_apigee",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("apigee", 18, "apigee")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Apigee X Enterprise Gateway</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">OAuth 2.0 / JWT RS256 token mediation, 50k TPS quota enforcement, Envoy mTLS, Spike Arrest 1000ps.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#9333EA;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">50k TPS Quota</span>
        <span style="background:${pillBg};color:#9333EA;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Envoy mTLS</span>
      </div>
    </div>`,
    365,
    165,
    255,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 2.2: GKE Autopilot Private Cluster
  cell(
    "pod_gke",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("gke_autopilot", 18, "gke")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">GKE Autopilot Private Cluster</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">c3-standard-8 node pools, Multi-Zone (us-central1-a/b/c), Workload Identity Federation, Cilium eBPF mesh.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#1D4ED8;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">c3-standard-8</span>
        <span style="background:${pillBg};color:#1D4ED8;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Cilium eBPF</span>
      </div>
    </div>`,
    365,
    275,
    255,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 2.3: Cloud Run Microservices
  cell(
    "pod_cloudrun",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("cloud_run", 18, "run")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Run Microservices</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">Direct VPC Egress (10.200.16.0/20), 80 max conns/instance, 0-10,000 autoscale, HTTP/2 &amp; gRPC.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#0284C7;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Direct VPC Egress</span>
        <span style="background:${pillBg};color:#0284C7;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">gRPC HTTP/2</span>
      </div>
    </div>`,
    365,
    385,
    255,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 2.4: Cloud Functions Gen2
  cell(
    "pod_functions",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("cloud_functions", 18, "func")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Functions Gen2</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">16GB RAM / 4 vCPU, Concurrency: 100, Eventarc triggered, Cold-start &lt; 120ms (Min instances: 2).</div>
    </div>`,
    365,
    500,
    255,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 2.5: Cloud Tasks & Scheduler
  cell(
    "pod_tasks",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("cloud_tasks", 18, "tasks")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Tasks &amp; Scheduler</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">HTTP target dispatch queue, Exponential backoff (50ms - 3600s), Rate: 500 dispatches/sec.</div>
    </div>`,
    365,
    610,
    255,
    85,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // TIER 3: VERTEX AI & GENAI STUDIO (X: 655, W: 280) - Private Service Connect (PSC)
  cell(
    "col_ai",
    `<div style="font-size:12px;font-weight:800;color:#D97706;margin-bottom:2px;">✨ 3. VERTEX AI &amp; GENAI STUDIO</div>
     <div style="font-size:9px;color:${textSecondary};">Gemini 2.5 Pro &bull; ScaNN Vector Search &bull; Model Armor</div>`,
    655,
    115,
    280,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? "#1E1608" : "#FFFBEB"};strokeColor=#F59E0B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 3.1: Gemini 2.5 Flash / Pro
  cell(
    "pod_gemini",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("gemini", 18, "gemini_core")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Gemini 2.5 Flash / Pro</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">2M Token Context Window, Temperature 0.2, Top-P 0.95, JSON Schema AST validation, PSC VPC Endpoint.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#D97706;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">2M Context</span>
        <span style="background:${pillBg};color:#D97706;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">JSON Schema AST</span>
      </div>
    </div>`,
    670,
    165,
    250,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 3.2: Vertex Vector Search (ScaNN)
  cell(
    "pod_scann",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("vertex_vector_search", 18, "scann")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Vertex AI Vector Search</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">768-dim embeddings, ScaNN Tree-AH Index, COSINE metric, p99 search latency &lt; 2.5ms @ 10M vectors.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#2563EB;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">ScaNN Tree-AH</span>
        <span style="background:${pillBg};color:#2563EB;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">p99 &lt; 2.5ms</span>
      </div>
    </div>`,
    670,
    275,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 3.3: Vertex Model Armor
  cell(
    "pod_model_armor",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("model_armor", 18, "armor_ai")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Vertex Model Armor</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">L7 Prompt Injection Shield, PII Redaction (Regex + NER), Harm Category: BLOCK_LOW_AND_ABOVE.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#DC2626;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Prompt Shield</span>
        <span style="background:${pillBg};color:#DC2626;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">PII NER Redact</span>
      </div>
    </div>`,
    670,
    385,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 3.4: Vertex AI Agent Builder
  cell(
    "pod_agent_builder",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("agent_builder", 18, "agents")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Vertex AI Agent Builder</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">ReAct multi-agent orchestration, OpenAPI 3.0 function calling specs, Tool Router with Grounding.</div>
    </div>`,
    670,
    495,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 3.5: Feature Store & MLOps Registry
  cell(
    "pod_feature_store",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("vertex_ai", 18, "mlops")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Feature Store &amp; MLOps Registry</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">Online: Bigtable (&lt;5ms), Offline: BigQuery, Vertex Pipelines (Kubeflow DSL) drift detection.</div>
    </div>`,
    670,
    605,
    250,
    90,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // TIER 4: EVENT MESH & PIPELINES (X: 955, W: 280) - Subnet 10.200.32.0/20
  cell(
    "col_event",
    `<div style="font-size:12px;font-weight:800;color:#0D9488;margin-bottom:2px;">⚡ 4. EVENT MESH &amp; PIPELINES</div>
     <div style="font-size:9px;color:${textSecondary};">Pub/Sub (10M+ msg/s) &bull; Dataflow Beam 2.54 &bull; Datastream</div>`,
    955,
    115,
    280,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? "#081716" : "#F0FDFA"};strokeColor=#14B8A6;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 4.1: Cloud Pub/Sub
  cell(
    "pod_pubsub",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("pubsub", 18, "pubsub")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Pub/Sub Event Mesh</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">10M+ msg/sec throughput, Exactly-Once Delivery, Avro/Protobuf Schema Registry, Dead-Letter Queue.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#0D9488;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">10M+ msg/s</span>
        <span style="background:${pillBg};color:#0D9488;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Schema Registry</span>
      </div>
    </div>`,
    970,
    165,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 4.2: Cloud Dataflow
  cell(
    "pod_dataflow",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("cloud_dataflow", 18, "beam")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Dataflow (Apache Beam)</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">Apache Beam 2.54 Streaming Engine, 10s Tumbling &amp; Sliding Windows, Liquid Sharding, Checkpoints 30s.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#0284C7;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Liquid Sharding</span>
        <span style="background:${pillBg};color:#0284C7;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Exactly-Once ETL</span>
      </div>
    </div>`,
    970,
    275,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 4.3: Datastream (CDC)
  cell(
    "pod_datastream",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("datastream", 18, "cdc")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Datastream (Serverless CDC)</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">Log-based Change Data Capture (PostgreSQL WAL), &lt; 1s replication lag into BigQuery &amp; GCS.</div>
    </div>`,
    970,
    385,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 4.4: Managed Service for Apache Kafka
  cell(
    "pod_kafka",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("pubsub", 18, "kafka")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Managed Kafka v3.6</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">Multi-AZ Cluster, 100MB/s ingress, mTLS / SASL_SSL authentication, BigQuery Sink connector.</div>
    </div>`,
    970,
    495,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 4.5: Eventarc Bus Broker
  cell(
    "pod_eventarc",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("eventarc", 18, "events")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Eventarc Bus Broker</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">CloudEvents v1.0 spec, filter: type=google.cloud.storage.object.v1.finalized, direct push to Cloud Run.</div>
    </div>`,
    970,
    605,
    250,
    90,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // TIER 5: LAKEHOUSE & STORAGE (X: 1255, W: 280) - Multi-Region nam3
  cell(
    "col_storage",
    `<div style="font-size:12px;font-weight:800;color:#059669;margin-bottom:2px;">🗄️ 5. LAKEHOUSE &amp; MULTI-REGION DB</div>
     <div style="font-size:9px;color:${textSecondary};">Cloud Spanner (nam3 TrueTime) &bull; BigLake Iceberg &bull; CMEK</div>`,
    1255,
    115,
    280,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? "#061911" : "#ECFDF5"};strokeColor=#10B981;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 5.1: Cloud Spanner (TrueTime)
  cell(
    "pod_spanner",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("spanner", 18, "spanner")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Spanner (TrueTime)</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">3-Region nam3 (us-central1, us-east1, us-east4), 99.999% SLA, TrueTime Bound &epsilon; &lt; 5ms, 100k QPS/node.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#059669;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">nam3 Multi-Region</span>
        <span style="background:${pillBg};color:#059669;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">&epsilon; &lt; 5ms TrueTime</span>
      </div>
    </div>`,
    1270,
    165,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 5.2: BigQuery Studio & BigLake
  cell(
    "pod_bigquery",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("bigquery", 18, "bq")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">BigQuery Studio &amp; BigLake</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">Apache Iceberg on GCS, Partitioned by DATE(_PARTITIONTIME), Clustered by (tenant_id), BI Engine 50GB.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#0284C7;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">BigLake Iceberg</span>
        <span style="background:${pillBg};color:#0284C7;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">BI Engine 50GB</span>
      </div>
    </div>`,
    1270,
    275,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 5.3: AlloyDB for PostgreSQL
  cell(
    "pod_alloydb",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("alloydb", 18, "alloy")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">AlloyDB for PostgreSQL</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">4x Transactional Throughput vs Standard PG, Columnar Engine in-memory store, Cross-Region Read Pool.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#2563EB;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">4x Postgres IOPS</span>
        <span style="background:${pillBg};color:#2563EB;font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:3px;">Columnar Engine</span>
      </div>
    </div>`,
    1270,
    385,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 5.4: Cloud Storage (Dual-Region)
  cell(
    "pod_gcs",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("cloud_storage", 18, "gcs")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Storage (Dual-Region)</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">11 9s Durability, Autoclass (Standard &rarr; Coldline &rarr; Archive), CMEK AES-256, Object Lock WORM.</div>
    </div>`,
    1270,
    495,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 5.5: Memorystore for Redis / Valkey
  cell(
    "pod_memorystore",
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        ${renderGcpIconHtml("memorystore", 18, "redis")}
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Memorystore for Redis / Valkey</span>
      </div>
      <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">High-Availability Master/Replica cluster, p99 &lt; 1ms, Redis 7.2 with Keyspace Notifications.</div>
    </div>`,
    1270,
    605,
    250,
    90,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // -------------------------------------------------------------------------------------------------------------------
  // TIER 6: ZERO-TRUST SECURITY FOUNDATION, SOVEREIGN GOVERNANCE & CLOUD OPERATIONS (Bottom Banner)
  // -------------------------------------------------------------------------------------------------------------------
  cell(
    "col_security",
    `<div style="font-size:12px;font-weight:800;color:#0F172A;margin-bottom:2px;">🛡️ 6. ZERO-TRUST SECURITY FOUNDATION, SOVEREIGN GOVERNANCE &amp; CLOUD OPERATIONS</div>
     <div style="font-size:9px;color:${textSecondary};">VPC-SC Access Policy 08492041284 &bull; FIPS 140-3 HSM KMS &bull; Dataplex Catalog &bull; SCC Threat Intel</div>`,
    50,
    740,
    1485,
    170,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? "#0A0F1D" : "#F8FAFC"};strokeColor=${isDark ? "#334155" : "#CBD5E1"};strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  const secCards = [
    {
      id: "sec_vpcsc",
      iconKey: "vpc_sc",
      title: "VPC Service Perimeters",
      desc: "Access Policy 08492041284, Ingress/Egress rules for BigQuery/GCS/Vertex, Zero Public IP Exfiltration.",
      tag: "VPC-SC Perimeter",
      x: 65,
      w: 235
    },
    {
      id: "sec_iam",
      iconKey: "iam",
      title: "Workload Identity Federation",
      desc: "OIDC / SPIFFE ID Token exchange, Short-lived STS tokens (3600s max), Attribute: assertion.sub==k8s-sa.",
      tag: "OIDC / SPIFFE",
      x: 315,
      w: 235
    },
    {
      id: "sec_kms",
      iconKey: "cloud_kms",
      title: "Cloud KMS / HSM",
      desc: "FIPS 140-3 Level 3 HSM, AES-256 GCM Key Encryption Key (KEK), 90-Day Automated Key Rotation, Cloud EKM.",
      tag: "FIPS 140-3 HSM",
      x: 565,
      w: 235
    },
    {
      id: "sec_secret",
      iconKey: "secret_manager",
      title: "Secret Manager & Certs",
      desc: "Encrypted at Rest, Automated SSL/TLS Wildcard Cert Issuance via Google CA / Let\x27s Encrypt, Version Pinning.",
      tag: "Auto-Rotation",
      x: 815,
      w: 235
    },
    {
      id: "sec_dataplex",
      iconKey: "dataplex",
      title: "Dataplex Universal Governance",
      desc: "Automated Metadata Catalog, Data Quality Checks (Great Expectations), Attribute-Based Column Masking.",
      tag: "Data Lineage & ACL",
      x: 1065,
      w: 235
    },
    {
      id: "sec_ops",
      iconKey: "scc",
      title: "Cloud Operations & SCC Premium",
      desc: "OpenTelemetry Collector, Prometheus Sidecars, Cloud Audit Logs (Data Access + Admin), Event Threat Detection.",
      tag: "OpenTelemetry / SCC",
      x: 1315,
      w: 205
    }
  ];

  secCards.forEach((sc) => {
    cell(
      sc.id,
      `<div style="padding:4px 6px;">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;">
          ${renderGcpIconHtml(sc.iconKey, 16, sc.id)}
          <span style="font-size:10px;font-weight:800;color:${textPrimary};">${sc.title}</span>
        </div>
        <div style="font-size:8px;color:${textSecondary};line-height:1.2;">${sc.desc}</div>
        <div style="margin-top:4px;">
          <span style="background:${pillBg};color:${isDark ? "#94A3B8" : "#475569"};font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:2px;">${sc.tag}</span>
        </div>
      </div>`,
      sc.x,
      790,
      sc.w,
      105,
      `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
    );
  });

  // -------------------------------------------------------------------------------------------------------------------
  // COLLISION-FREE TYPED CONNECTORS & FLOW STEP BADGES (❶..❻)
  // -------------------------------------------------------------------------------------------------------------------

  // 1. GCLB to Apigee (Direct Ingress)
  edge(
    "conn_ingress",
    "❶ HTTPS / TLS 1.3 Ingress",
    "pod_gclb",
    "pod_apigee",
    `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;strokeColor=#1D4ED8;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#1D4ED8;labelBackgroundColor=${cardBg};labelBorderColor=#93C5FD;`
  );

  // 2. Apigee to GKE Autopilot (Direct Vertical API Mesh)
  edge(
    "conn_api_gke",
    "❷ API Mesh Dispatch (mTLS)",
    "pod_apigee",
    "pod_gke",
    `edgeStyle=straight;rounded=0;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;strokeColor=#7C3AED;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#7C3AED;labelBackgroundColor=${cardBg};labelBorderColor=#C4B5FD;lblX=32;lblY=-10;align=left;`
  );

  // 3. GKE Autopilot to Gemini 2.5 (GenAI RAG Inference)
  edge(
    "conn_gke_ai",
    "❸ Gemini 2.5 Inference &amp; RAG",
    "pod_gke",
    "pod_gemini",
    `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;strokeColor=#D97706;strokeWidth=2;dashed=1;dashPattern=4 4;fontSize=9;fontStyle=1;fontColor=#D97706;labelBackgroundColor=${cardBg};labelBorderColor=#FDE68A;`,
    [
      { x: 645, y: 325 },
      { x: 645, y: 215 }
    ]
  );

  // 4. Gemini to ScaNN Vector Search (Internal AI Stack Query)
  edge(
    "conn_ai_scann",
    "❹ ScaNN Vector Retrieval (&lt;2.5ms)",
    "pod_gemini",
    "pod_scann",
    `edgeStyle=straight;rounded=0;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;strokeColor=#2563EB;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#2563EB;labelBackgroundColor=${cardBg};labelBorderColor=#BFDBFE;lblX=28;lblY=-10;align=left;`
  );

  // 5. Dataflow to BigQuery (Streaming ETL)
  edge(
    "conn_stream_bq",
    "❺ Real-Time Streaming ETL (Exactly-Once)",
    "pod_dataflow",
    "pod_bigquery",
    `edgeStyle=straight;rounded=0;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;strokeColor=#059669;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#059669;labelBackgroundColor=${cardBg};labelBorderColor=#A7F3D0;`
  );

  // 6. Pub/Sub to Dataflow (Internal Streaming Pipeline)
  edge(
    "conn_pubsub_df",
    "Event Stream (10M+ msg/s)",
    "pod_pubsub",
    "pod_dataflow",
    `edgeStyle=straight;rounded=0;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;strokeColor=#0D9488;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#0D9488;labelBackgroundColor=${cardBg};labelBorderColor=#99F6E4;lblX=24;lblY=-10;align=left;`
  );

  // 7. GKE Autopilot to Spanner via Open Top Channel Waypoints (Collision-Free ACID Transact)
  edge(
    "conn_gke_spanner",
    "❻ Multi-Region ACID Transact (nam3 TrueTime &epsilon;&lt;5ms)",
    "pod_gke",
    "pod_spanner",
    `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.2;entryX=0;entryY=0.2;strokeColor=#059669;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#059669;labelBackgroundColor=${cardBg};labelBorderColor=#A7F3D0;`,
    [
      { x: 645, y: 295 },
      { x: 645, y: 98 },
      { x: 1255, y: 98 },
      { x: 1255, y: 184 }
    ]
  );

  return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_native_master" name="${E(title)}">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
