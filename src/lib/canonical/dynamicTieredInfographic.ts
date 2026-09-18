/**
 * Universal Dynamic 4-Tier Architectural Infographic Generator
 *
 * Implements Rule 41: Anti-Static-Spoofing & Layout Archetype vs. Subject Domain Separation Law.
 * When a user prompts for ANY new topic with the "Infographic" layout archetype
 * (e.g., "Healthcare FHIR Infographic", "Zero-Trust Security Infographic", "FinOps Cloud Cost Infographic"),
 * this engine synthesizes a complete 16:9 4-Tier Architectural Infographic:
 *   - Left vertical numbered spine (01..04) with color-coded tier headers
 *   - Dashed architectural enclaves per tier
 *   - 3-column domain cards per tier tailored to the user's subject matter
 *   - Right-rail validation / governance decision gates per tier
 *   - Bottom actionable rule / prompt bars per tier
 */

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export interface TierSpec {
  num: string;
  title: string;
  subtitle: string;
  primaryColor: string;
  lightBg: string;
  borderColor: string;
  cards: { title: string; badge: string; bullets: string[] }[];
  gateTitle: string;
  gatePassLabel: string;
  bottomRuleText: string;
}

/**
 * Extracts a clean subject title and synthesizes 4 domain-specific architectural tiers
 * tailored to the user's prompt topic.
 */
export function buildDynamicInfographicTiers(prompt: string): {
  headerTitle: string;
  headerSubtitle: string;
  footerText: string;
  tiers: TierSpec[];
} {
  const cleanPrompt = prompt
    .replace(/\b(create|generate|build|draw|make|show|an?|the|diagram|infographic|tiered|architecture|for|of|about|on)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const subjectTopic = cleanPrompt.length > 2 ? cleanPrompt : 'Enterprise Domain Architecture';
  const upperTopic = subjectTopic.toUpperCase();

  return {
    headerTitle: `${upperTopic} — 4-TIER ARCHITECTURAL INFOGRAPHIC`,
    headerSubtitle: `End-to-End Ingestion, Governance Harness, Validation Loop & Knowledge Graph Topology for ${subjectTopic}`,
    footerText: `ARCHITECTURAL SYNTHESIS: ${upperTopic} | TIERED INFOGRAPHIC BLUEPRINT (01 INGESTION • 02 HARNESS • 03 VALIDATION • 04 GRAPH)`,
    tiers: [
      {
        num: '01',
        title: 'SOURCE INGESTION & CONTEXT LAYER',
        subtitle: `What the ${subjectTopic} system ingests, normalizes & contextualizes`,
        primaryColor: '#2563EB',
        lightBg: '#EFF6FF',
        borderColor: '#93C5FD',
        cards: [
          {
            title: `${subjectTopic} Data Sources`,
            badge: 'INGESTION',
            bullets: [
              `Primary ${subjectTopic} payloads & schemas`,
              'Real-time streaming & batch API endpoints',
              'Multi-format structural normalization'
            ]
          },
          {
            title: 'Context & Schema Registry',
            badge: 'CONTEXT',
            bullets: [
              'Canonical entity & metadata definitions',
              'Semantic context window boundaries',
              'Versioned schema contracts & lineage'
            ]
          },
          {
            title: 'Access & Identity Perimeter',
            badge: 'SECURITY',
            bullets: [
              'Role-based access control (RBAC / ABAC)',
              'Field-level encryption & PII redaction',
              'Cryptographic provenance verification'
            ]
          }
        ],
        gateTitle: 'Schema & Context Valid?',
        gatePassLabel: 'Verified Context',
        bottomRuleText: `Rule 01: Enforce strict ${subjectTopic} schema contracts at ingestion before downstream processing.`
      },
      {
        num: '02',
        title: 'ORCHESTRATION HARNESS & POLICY ENGINE',
        subtitle: `Standing guardrails, tools, and execution policies around ${subjectTopic}`,
        primaryColor: '#7C3AED',
        lightBg: '#F5F3FF',
        borderColor: '#C4B5FD',
        cards: [
          {
            title: `${subjectTopic} Policy Harness`,
            badge: 'HARNESS',
            bullets: [
              'Deterministic compliance & policy rules',
              'Automated pre-execution invariant checks',
              'Zero-bypass operational boundaries'
            ]
          },
          {
            title: 'Tooling & Connector Mesh',
            badge: 'ORCHESTRATION',
            bullets: [
              'Typed synchronous & async service adapters',
              'Idempotent transaction execution',
              'Circuit-breaker & rate-limiting armor'
            ]
          },
          {
            title: 'Telemetry & Audit Logging',
            badge: 'OBSERVABILITY',
            bullets: [
              'Immutable execution trace logs',
              'Real-time latency & SLA monitoring',
              'Forensic anomaly detection alerts'
            ]
          }
        ],
        gateTitle: 'Policy Harness Passed?',
        gatePassLabel: 'Compliant Execution',
        bottomRuleText: `Rule 02: Execute all ${subjectTopic} operations inside a policy-enforced harness with full audit telemetry.`
      },
      {
        num: '03',
        title: 'AUTONOMOUS VALIDATION & FEEDBACK LOOP',
        subtitle: `Continuous verification, reconciliation & self-healing loop for ${subjectTopic}`,
        primaryColor: '#EA580C',
        lightBg: '#FFF7ED',
        borderColor: '#FDBA74',
        cards: [
          {
            title: 'Automated Quality Gate',
            badge: 'VERIFICATION',
            bullets: [
              'Multi-stage semantic & structural validation',
              'Automated drift & regression detection',
              'Deterministic pass/fail quality rubrics'
            ]
          },
          {
            title: 'Self-Healing Reconciliation',
            badge: 'REMEDIATION',
            bullets: [
              'Closed-loop error diagnosis & retry',
              'Automated state rollback on violation',
              'Quarantine queue for unresolvable exceptions'
            ]
          },
          {
            title: 'Continuous Optimization',
            badge: 'FEEDBACK',
            bullets: [
              'Feedback telemetry back to ingestion layer',
              'Adaptive threshold & rule refinement',
              'Continuous throughput & accuracy tuning'
            ]
          }
        ],
        gateTitle: 'Quality SLA Certified?',
        gatePassLabel: 'Certified Output',
        bottomRuleText: `Rule 03: Every ${subjectTopic} state transition must pass closed-loop validation or trigger autonomous self-healing.`
      },
      {
        num: '04',
        title: 'SEMANTIC KNOWLEDGE GRAPH & CONSUMPTION',
        subtitle: `Connected entity topology, cross-domain intelligence & consumer APIs for ${subjectTopic}`,
        primaryColor: '#059669',
        lightBg: '#ECFDF5',
        borderColor: '#6EE7B7',
        cards: [
          {
            title: `${subjectTopic} Knowledge Graph`,
            badge: 'GRAPH',
            bullets: [
              'Connected entity & relationship topology',
              'Cross-domain semantic link resolution',
              'High-speed graph traversal & querying'
            ]
          },
          {
            title: 'Intelligence & Analytics Hub',
            badge: 'INSIGHTS',
            bullets: [
              'Real-time executive KPI dashboards',
              'Predictive topology & impact analysis',
              'AI-ready grounded retrieval (RAG / GraphRAG)'
            ]
          },
          {
            title: 'Enterprise Consumer APIs',
            badge: 'DELIVERY',
            bullets: [
              'Low-latency GraphQL, REST & event streams',
              'Multi-tenant partner & ecosystem syndication',
              'SLA-backed enterprise data products'
            ]
          }
        ],
        gateTitle: 'Published to Graph?',
        gatePassLabel: 'Live in Production',
        bottomRuleText: `Rule 04: Expose certified ${subjectTopic} intelligence via connected knowledge graph APIs and real-time event streams.`
      }
    ]
  };
}

export function generateDynamicTieredInfographicXml(prompt: string): string {
  const spec = buildDynamicInfographicTiers(prompt);

  const cells: string[] = [];

  // 1. Top Widescreen Header Banner
  cells.push(`
    <mxCell id="header_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=2;arcSize=6;" vertex="1" parent="1">
      <mxGeometry x="30" y="20" width="1540" height="72" as="geometry" />
    </mxCell>
    <mxCell id="header_title" value="${escapeXml(spec.headerTitle)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=20;fontStyle=1;fontColor=#F8FAFC;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
      <mxGeometry x="50" y="26" width="1100" height="32" as="geometry" />
    </mxCell>
    <mxCell id="header_subtitle" value="${escapeXml(spec.headerSubtitle)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;fontStyle=0;fontColor=#38BDF8;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
      <mxGeometry x="50" y="56" width="1100" height="24" as="geometry" />
    </mxCell>
    <mxCell id="header_badge" value="4-TIER ARCHITECTURAL INFOGRAPHIC" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#38BDF8;fontSize=11;fontStyle=1;arcSize=50;" vertex="1" parent="1">
      <mxGeometry x="1260" y="36" width="290" height="36" as="geometry" />
    </mxCell>
  `);

  const startY = 108;
  const tierHeight = 192;
  const tierGap = 14;

  spec.tiers.forEach((tier, idx) => {
    const y = startY + idx * (tierHeight + tierGap);

    // Dashed Tier Enclave Container
    cells.push(`
      <mxCell id="tier_bg_${idx}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${tier.lightBg};strokeColor=${tier.borderColor};strokeWidth=2;dashed=1;dashPattern=6 4;arcSize=4;" vertex="1" parent="1">
        <mxGeometry x="30" y="${y}" width="1540" height="${tierHeight}" as="geometry" />
      </mxCell>
    `);

    // Left Numbered Spine Badge (01..04)
    cells.push(`
      <mxCell id="tier_spine_${idx}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${tier.primaryColor};strokeColor=none;arcSize=8;" vertex="1" parent="1">
        <mxGeometry x="44" y="${y + 14}" width="220" height="${tierHeight - 28}" as="geometry" />
      </mxCell>
      <mxCell id="tier_num_${idx}" value="TIER ${tier.num}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=12;fontStyle=1;fontColor=#E2E8F0;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
        <mxGeometry x="60" y="${y + 26}" width="188" height="22" as="geometry" />
      </mxCell>
      <mxCell id="tier_title_${idx}" value="${escapeXml(tier.title)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=14;fontStyle=1;fontColor=#FFFFFF;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
        <mxGeometry x="60" y="${y + 50}" width="188" height="48" as="geometry" />
      </mxCell>
      <mxCell id="tier_sub_${idx}" value="${escapeXml(tier.subtitle)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=10.5;fontStyle=0;fontColor=#F1F5F9;fontFamily=Inter,sans-serif;" vertex="1" parent="1">
        <mxGeometry x="60" y="${y + 104}" width="188" height="64" as="geometry" />
      </mxCell>
    `);

    // 3 Domain Cards inside the tier
    const cardStartX = 284;
    const cardWidth = 315;
    const cardGap = 18;
    const cardHeight = 124;

    tier.cards.forEach((card, cIdx) => {
      const cx = cardStartX + cIdx * (cardWidth + cardGap);
      const cy = y + 14;

      const bulletHtml = card.bullets
        .map(b => `<li style="margin-bottom:3px;">${escapeXml(b)}</li>`)
        .join('');

      const cardHtml = `<div style="font-family:Inter,sans-serif;text-align:left;padding:6px 10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:12.5px;font-weight:700;color:#0F172A;">${escapeXml(card.title)}</span>
          <span style="font-size:9px;font-weight:700;color:${tier.primaryColor};background:${tier.lightBg};border:1px solid ${tier.borderColor};padding:1px 6px;border-radius:10px;">${escapeXml(card.badge)}</span>
        </div>
        <ul style="margin:0;padding-left:15px;font-size:10.5px;color:#334155;line-height:1.35;">
          ${bulletHtml}
        </ul>
      </div>`;

      cells.push(`
        <mxCell id="tier_${idx}_card_${cIdx}" value="${escapeXml(cardHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${tier.borderColor};strokeWidth=1.5;verticalAlign=top;align=left;arcSize=6;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="${cx}" y="${cy}" width="${cardWidth}" height="${cardHeight}" as="geometry" />
        </mxCell>
      `);

      // Horizontal connector arrow between cards
      if (cIdx < tier.cards.length - 1) {
        cells.push(`
          <mxCell id="tier_${idx}_edge_${cIdx}" value="" style="edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${tier.primaryColor};strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="tier_${idx}_card_${cIdx}" target="tier_${idx}_card_${cIdx + 1}">
            <mxGeometry relative="1" as="geometry" />
          </mxCell>
        `);
      }
    });

    // Right-rail Governance Decision Gate Rhombus
    const gateX = 1300;
    const gateY = y + 26;
    cells.push(`
      <mxCell id="tier_${idx}_gate" value="${escapeXml(tier.gateTitle)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${tier.primaryColor};strokeWidth=2;fontColor=#0F172A;fontSize=10.5;fontStyle=1;" vertex="1" parent="1">
        <mxGeometry x="${gateX}" y="${gateY}" width="130" height="96" as="geometry" />
      </mxCell>
      <mxCell id="tier_${idx}_gate_edge" value="" style="edgeStyle=none;html=1;strokeColor=${tier.primaryColor};strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="tier_${idx}_card_2" target="tier_${idx}_gate">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
      <mxCell id="tier_${idx}_pass_pill" value="✓ ${escapeXml(tier.gatePassLabel)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${tier.primaryColor};strokeColor=none;fontColor=#FFFFFF;fontSize=10;fontStyle=1;arcSize=50;" vertex="1" parent="1">
        <mxGeometry x="1446" y="${gateY + 32}" width="110" height="32" as="geometry" />
      </mxCell>
      <mxCell id="tier_${idx}_pass_edge" value="" style="edgeStyle=none;html=1;strokeColor=${tier.primaryColor};strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="tier_${idx}_gate" target="tier_${idx}_pass_pill">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
    `);

    // Bottom Standing Rule / Actionable Prompt Bar per Tier
    cells.push(`
      <mxCell id="tier_${idx}_rule_bar" value="⚡ ${escapeXml(tier.bottomRuleText)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${tier.borderColor};strokeWidth=1.5;align=left;spacingLeft=14;fontSize=11;fontStyle=1;fontColor=#0F172A;arcSize=16;" vertex="1" parent="1">
        <mxGeometry x="284" y="${y + 146}" width="1272" height="34" as="geometry" />
      </mxCell>
    `);

    // Vertical spine flow connector between tiers
    if (idx < spec.tiers.length - 1) {
      cells.push(`
        <mxCell id="spine_flow_${idx}" value="" style="edgeStyle=none;html=1;strokeColor=#475569;strokeWidth=2.5;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;" edge="1" parent="1" source="tier_spine_${idx}" target="tier_spine_${idx + 1}">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      `);
    }
  });

  // Bottom Footer Pill
  const footerY = startY + spec.tiers.length * (tierHeight + tierGap) + 4;
  cells.push(`
    <mxCell id="footer_pill" value="${escapeXml(spec.footerText)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;fontColor=#E2E8F0;fontSize=11;fontStyle=1;arcSize=50;" vertex="1" parent="1">
      <mxGeometry x="30" y="${footerY}" width="1540" height="36" as="geometry" />
    </mxCell>
  `);

  return `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas Dynamic Tiered Infographic Engine" version="24.0.0" type="device">
  <diagram id="dynamic_tiered_infographic" name="Tiered Architectural Infographic">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="980" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        ${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
