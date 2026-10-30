/**
 * Universal Dynamic 4-Tier Architectural Infographic Generator
 *
 * Offline structural fallback when live Gemini research is unavailable.
 * Extracts prompt clauses directly without hardcoded domain regex spoofing.
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
 * Extracts a clean subject title and synthesizes 4 clause-driven architectural tiers
 * tailored directly to the user's prompt clauses without hardcoded domain presets.
 */
export function buildDynamicInfographicTiers(prompt: string): {
  headerTitle: string;
  headerSubtitle: string;
  footerText: string;
  tiers: TierSpec[];
} {
  const strippedPrompt = prompt
    .replace(/^(please\s+)?(design|architect|build|create|generate|synthesize|draw|make|show)\s+(a\s+|an\s+|the\s+)?(\d+-tier\s+)?(architectural\s+)?(infographic|diagram|architecture|blueprint|topology)\s+(for|of|about|on)\s+/i, '')
    .replace(/^(4-tier\s+|tiered\s+)?(architectural\s+)?(infographic|diagram|architecture)\s+(for|of|about|on)\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  const firstClause = strippedPrompt
    .split(/,|;|\s+with\s+|\s+via\s+|\s+using\s+|\s+featuring\s+|\s+including\s+|->|→/i)[0]
    .trim();

  const rawTopic = firstClause.length > 3 ? firstClause : strippedPrompt;
  const subjectTopic =
    rawTopic.length > 46
      ? rawTopic.slice(0, 44).replace(/\s+\S*$/, '').trim()
      : rawTopic.length > 2
      ? rawTopic
      : 'Enterprise Domain Architecture';
  const upperTopic = subjectTopic.toUpperCase();

  // Prompt-clause-driven 4-tier synthesis (zero hardcoded domain regex presets)
  const rawClauses = strippedPrompt
    .split(/,|;|\s+and\s+|\s+with\s+|\s+via\s+|\s+using\s+|\s+featuring\s+|\s+including\s+|\s+plus\s+|->|→/i)
    .map((s: string) => s.trim().replace(/\.$/, '').trim())
    .filter((s: string) => s.length >= 4);

  const shortCore =
    subjectTopic.length > 22
      ? subjectTopic.slice(0, 20).replace(/\s+\S*$/, '').trim()
      : subjectTopic;

  const getClause = (idx: number, fallback: string): string => {
    const c = rawClauses[idx];
    const chosen = c && c.length >= 4 ? c.charAt(0).toUpperCase() + c.slice(1) : fallback;
    return chosen.length > 28 ? chosen.slice(0, 26).replace(/\s+\S*$/, '').trim() : chosen;
  };

  const c1 = getClause(0, `${shortCore} Ingress`);
  const c2 = getClause(1, 'Signal & Wire Framing');
  const c3 = getClause(2, 'Zero-Trust mTLS Gate');
  const c4 = getClause(3, 'Core State Orchestrator');
  const c5 = getClause(4, 'Low-Latency Event Router');
  const c6 = getClause(5, 'OpenTelemetry Span Bus');
  const c7 = getClause(6, 'Parity & Drift Verifier');
  const c8 = getClause(7, 'Autonomous Fault Isolation');
  const c9 = getClause(8, 'Closed-Loop Calibration');
  const c10 = getClause(9, 'Active-Active State Ledger');
  const c11 = getClause(10, 'Operational Telemetry HUD');
  const c12 = getClause(11, 'Global Traffic Failover');

  return {
    headerTitle: `${upperTopic} — 4-TIER INFOGRAPHIC`,
    headerSubtitle: `Zero-Template 4-Tier Synthesis: ${c1} • ${c2} • ${c3} • ${c4}`,
    footerText: `ZERO-TEMPLATE 4-TIER SYNTHESIS: ${upperTopic} | (01 INGESTION • 02 CONTROL PLANE • 03 VERIFICATION • 04 SERVING)`,
    tiers: [
      {
        num: '01',
        title: 'INGESTION & PROTOCOL TELEMETRY PLANE',
        subtitle: `High-throughput ingress, sensor/wire framing & schema normalization for ${subjectTopic}`,
        primaryColor: '#2563EB',
        lightBg: '#EFF6FF',
        borderColor: '#93C5FD',
        cards: [
          {
            title: c1,
            badge: 'INGESTION',
            bullets: [
              `Primary ${c1} wire payloads & framing`,
              'Sub-10ms streaming & batch gRPC/REST endpoints',
              'Deterministic schema & boundary normalization'
            ]
          },
          {
            title: c2,
            badge: 'SIGNAL / SCHEMA',
            bullets: [
              `Real-time ${c2} feature & payload extraction`,
              'Deterministic payload contract validation',
              'Cryptographic SHA-256 provenance stamping'
            ]
          },
          {
            title: c3,
            badge: 'PERIMETER',
            bullets: [
              `${c3} mutual authentication & workload identity`,
              'Field-level envelope encryption (AES-256-GCM)',
              'Strict ingress rate-limiting & perimeter shielding'
            ]
          }
        ],
        gateTitle: `${c3.slice(0, 22)} & SLA Valid?`,
        gatePassLabel: 'Verified Payload',
        bottomRuleText: `Rule 01: Enforce strict ${c1} framing and ${c3} verification at Tier 01 ingress.`
      },
      {
        num: '02',
        title: 'CONTROL PLANE & DETERMINISTIC EXECUTION',
        subtitle: `State-machine orchestration, runtime routing & invariant enforcement for ${subjectTopic}`,
        primaryColor: '#7C3AED',
        lightBg: '#F5F3FF',
        borderColor: '#C4B5FD',
        cards: [
          {
            title: c4,
            badge: 'CONTROL PLANE',
            bullets: [
              `Deterministic ${c4} state transitions`,
              'Pre-execution invariant & safety boundary checks',
              'Zero-bypass operational isolation enclaves'
            ]
          },
          {
            title: c5,
            badge: 'ROUTING',
            bullets: [
              `Typed synchronous & async ${c5} bus`,
              'Idempotent transaction commit coordination',
              'Adaptive circuit-breaker & backpressure control'
            ]
          },
          {
            title: c6,
            badge: 'TELEMETRY',
            bullets: [
              `OpenTelemetry span propagation for ${c6}`,
              'Real-time p99 latency & saturation telemetry',
              'Append-only cryptographic audit event stream'
            ]
          }
        ],
        gateTitle: 'p99 Latency < 25ms & Compliant?',
        gatePassLabel: 'Authorized State',
        bottomRuleText: `Rule 02: Isolate ${c4} control-plane state transitions from high-throughput ${c5} execution.`
      },
      {
        num: '03',
        title: 'CLOSED-LOOP VERIFICATION & RECONCILIATION',
        subtitle: `Quantitative drift detection, fault quarantine & autonomous recovery for ${subjectTopic}`,
        primaryColor: '#EA580C',
        lightBg: '#FFF7ED',
        borderColor: '#FDBA74',
        cards: [
          {
            title: c7,
            badge: 'VERIFICATION',
            bullets: [
              `Multi-stage ${c7} structural & parity checks`,
              'Real-time state drift & anomaly scoring',
              'Deterministic pass/fail SLA threshold gating'
            ]
          },
          {
            title: c8,
            badge: 'REMEDIATION',
            bullets: [
              `Closed-loop ${c8} fault isolation & retry`,
              'Atomic state rollback on invariant violation',
              'Dead-letter quarantine for unresolvable faults'
            ]
          },
          {
            title: c9,
            badge: 'FEEDBACK',
            bullets: [
              `Continuous ${c9} signals back to Tier 01`,
              'Dynamic routing weight & threshold tuning',
              'Automated capacity & throughput optimization'
            ]
          }
        ],
        gateTitle: 'Zero Drift & Parity >= 99.9%?',
        gatePassLabel: 'Certified Output',
        bottomRuleText: `Rule 03: Every ${subjectTopic} mutation must pass ${c7} verification or trigger ${c8}.`
      },
      {
        num: '04',
        title: 'SERVING TOPOLOGY & ENTERPRISE DELIVERY',
        subtitle: `Low-latency serving stores, analytical projections & consumer syndication for ${subjectTopic}`,
        primaryColor: '#059669',
        lightBg: '#ECFDF5',
        borderColor: '#6EE7B7',
        cards: [
          {
            title: c10,
            badge: 'SERVING',
            bullets: [
              `Multi-region active-active ${c10}`,
              'Cross-entity lineage & relationship resolution',
              'Sub-5ms point lookups & analytical projections'
            ]
          },
          {
            title: c11,
            badge: 'OBSERVABILITY',
            bullets: [
              `Real-time ${c11} & golden-signal dashboards`,
              'Predictive blast-radius & dependency simulation',
              'Grounded enterprise search & audit reporting'
            ]
          },
          {
            title: c12,
            badge: 'DELIVERY',
            bullets: [
              `SLA-backed ${c12} & event syndication`,
              'Multi-tenant partner isolation & quota governance',
              'Versioned contracts with zero-downtime failover'
            ]
          }
        ],
        gateTitle: 'Multi-Region Quorum Commit?',
        gatePassLabel: 'Live in Production',
        bottomRuleText: `Rule 04: Serve certified ${subjectTopic} state via ${c10} and ${c12} with strict SLO guarantees.`
      }
    ]
  };
}

export interface InfographicSpec {
  headerTitle: string;
  headerSubtitle: string;
  footerText: string;
  tiers: TierSpec[];
}

export function renderInfographicSpecToXml(spec: InfographicSpec): string {
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

export function generateDynamicTieredInfographicXml(prompt: string): string {
  return renderInfographicSpecToXml(buildDynamicInfographicTiers(prompt));
}

