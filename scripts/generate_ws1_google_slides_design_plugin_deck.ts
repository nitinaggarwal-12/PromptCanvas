#!/usr/bin/env npx tsx
/**
 * Workstream 1 Google Slides Generator using the `google-slides-design` Plugin (v2.0) & `slide-design` Skill
 * Enforces all rules from `~/.gemini/config/plugins/google-slides-design/rules/AGENTS.md` & `SKILL.md`:
 *  - Sequential Google Brand Colors: 1. Blue (#4285F4) -> 2. Red (#EA4335) -> 3. Yellow (#FBBC04) -> 4. Green (#34A853)
 *  - Typography: Google Sans / Google Sans Display (#3C4043) for titles & 48pt display numbers; Roboto (#5F6368) for body & captions
 *  - Containers: Light gray (#F8F9FA) with subtle borders (#DADCE0) and 8px border-radius (0 gradient cards or purple drop-shadows)
 *  - Confidentiality: Every single slide footer contains "Proprietary + Confidential"
 *  - Aspect Ratio: Widescreen 16:9
 *  - Zero Cross-Project Merck Contamination (Rule 53): 100% pure Workstream 1 (DOC-MT-01) Cymbal Multi-Tenant architecture
 *  - Zero 2D AABB Text/Edge Collisions: Opaque pill edge labels with deterministic AABB de-collision on Slide 11 (#78)
 *  - 100% Native Editable Visual & Diagram Archetypes + Grounded Live Cloud Console Screenshots (12 Slides)
 */

import fs from 'node:fs';
import path from 'node:path';
import PptxGenJS from 'pptxgenjs';
import {
  cleanHtmlToPlainText,
  extractStructuredNodeLayout,
  normalizeDrawioHtmlForSlides,
  parseDrawioXmlForPptx,
  shrinkPptxArrowheadsInBase64,
} from '../src/lib/export/editablePptxCompiler';
import {
  OFFICIAL_ARCH_CENTER_BLUEPRINTS,
  compileOfficialArchCenterDrawioXml,
} from '../src/lib/canonical/templateOfficialGcpArchCenterHubSpoke';
import { uploadPptxBufferToGoogleSlides } from '../src/lib/server/googleWorkspaceBridge';
import {
  BRAND_TOKENS,
  GOOGLE_QUAD_COLORS,
  addConfidentialFooter,
  renderAsyncStateMachineSlide,
  renderGroundedScreenshotProofSlide,
  renderOperatingModelPillarsSlide,
  renderPayloadTransformationSlide,
  renderRoadmapTimelineSlide,
  renderSwimlaneSequenceSlide,
  renderThreeZoneArchitectureSlide,
} from '../src/lib/export/googleSlidesDesignArchetypes';

const GOOGLE_COLORS = GOOGLE_QUAD_COLORS;
const COLOR_TITLE_DARK = BRAND_TOKENS.titleDark;
const COLOR_BODY_GRAY = BRAND_TOKENS.bodyGray;
const COLOR_CARD_BG = BRAND_TOKENS.cardBg;
const COLOR_CARD_BORDER = BRAND_TOKENS.cardBorder;
const FONT_TITLE = BRAND_TOKENS.fontTitle;
const FONT_DISPLAY = BRAND_TOKENS.fontDisplay;
const FONT_BODY = BRAND_TOKENS.fontBody;

function addQuadColorBar(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  x: number,
  y: number,
  totalW: number,
  h = 0.05
) {
  const segW = totalW / 4;
  GOOGLE_COLORS.forEach((hex, idx) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: x + idx * segW,
      y,
      w: segW,
      h,
      fill: { color: hex },
      line: { type: 'none' },
    });
  });
}

function addNeutralCard(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  x: number,
  y: number,
  w: number,
  h: number,
  accentColorHex?: string
) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: COLOR_CARD_BG },
    line: { color: COLOR_CARD_BORDER, width: 1 },
  });

  if (accentColorHex) {
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.12,
      y: y + 0.01,
      w: w - 0.24,
      h: 0.05,
      fill: { color: accentColorHex },
      line: { type: 'none' },
    });
  }
}

interface AabbBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

function boxesOverlap(a: AabbBox, b: AabbBox, pad = 0.015): boolean {
  return !(
    a.x + a.w + pad <= b.x ||
    b.x + b.w + pad <= a.x ||
    a.y + a.h + pad <= b.y ||
    b.y + b.h + pad <= a.y
  );
}

async function main() {
  console.log('🎨 Building Workstream 1 Google Slides Deck (12 Slides) using `google-slides-design` v2.0 & `slide-design` skill...');

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9'; // 10.0" x 5.625" Widescreen 16:9
  pptx.author = 'Principal AI Architect • Cloud Solutions Architecture';
  pptx.company = 'Google Cloud';
  pptx.subject = 'Workstream 1: Building Multi-Tenant Agentic AI Systems on Google Cloud';
  pptx.title = 'WS1 — Multi-Tenant Agentic AI Systems: Visual Architecture, Payload Pipeline, Sequence & Live GCP Proofs (v2.0)';

  const TOTAL_SLIDES = 12;

  // =========================================================================
  // SLIDE 1: `title-cover`
  // =========================================================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };

    addQuadColorBar(pptx, slide, 0.5, 0.45, 9.0, 0.06);

    addNeutralCard(pptx, slide, 0.5, 0.8, 5.2, 0.36);
    slide.addText('CLOUD ARCHITECTURE CENTER • WORKSTREAM 1 (DOC-MT-01 • V2.0)', {
      x: 0.62,
      y: 0.84,
      w: 4.95,
      h: 0.28,
      fontFace: FONT_TITLE,
      fontSize: 9,
      bold: true,
      color: GOOGLE_COLORS[0],
    });

    slide.addText('Workstream 1: Multi-Tenant Agentic AI Systems on Google Cloud', {
      x: 0.5,
      y: 1.38,
      w: 9.0,
      h: 1.1,
      fontFace: FONT_DISPLAY,
      fontSize: 27,
      bold: true,
      color: COLOR_TITLE_DARK,
      valign: 'top',
    });

    slide.addText(
      '5-Hop Cryptographic Identity, 3-Zone Gateway Normalization, Scale-to-Zero Sequence Flows, Async Webhook Loops & Live GCP Proofs',
      {
        x: 0.5,
        y: 2.58,
        w: 8.8,
        h: 0.68,
        fontFace: FONT_BODY,
        fontSize: 13.5,
        color: COLOR_BODY_GRAY,
        valign: 'top',
      }
    );

    addNeutralCard(pptx, slide, 0.5, 3.6, 9.0, 1.3);
    slide.addText('Authors & Engineering Attribution (Role Labels Only)', {
      x: 0.75,
      y: 3.76,
      w: 5.5,
      h: 0.28,
      fontFace: FONT_TITLE,
      fontSize: 11,
      bold: true,
      color: COLOR_TITLE_DARK,
    });
    slide.addText(
      'Principal AI Architect • Cloud Solutions Architecture • Enterprise AI Field Engineering\nGoogle Cloud Architecture Center Engineering Team • 100% Native Editable Visuals & Grounded Screenshots',
      {
        x: 0.75,
        y: 4.08,
        w: 6.2,
        h: 0.6,
        fontFace: FONT_BODY,
        fontSize: 9.5,
        color: COLOR_BODY_GRAY,
      }
    );
    slide.addText('October 15, 2026\n12 Native Editable Slides\nProprietary + Confidential', {
      x: 6.8,
      y: 3.95,
      w: 2.45,
      h: 0.7,
      fontFace: FONT_BODY,
      fontSize: 9,
      color: COLOR_BODY_GRAY,
      align: 'right',
    });

    addConfidentialFooter(pptx, slide, 1, TOTAL_SLIDES);
  }

  // =========================================================================
  // SLIDE 2: `quad-metrics` (4 KPI Tiles with 48pt numbers & 1-line captions)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };

    slide.addText('Workstream 1 Executive Impact & Production Telemetry (20/20 PASS)', {
      x: 0.5,
      y: 0.28,
      w: 9.0,
      h: 0.38,
      fontFace: FONT_TITLE,
      fontSize: 18,
      bold: true,
      color: COLOR_TITLE_DARK,
    });
    slide.addText(
      'Verified across 20/20 live Google Cloud simulations in cymbal-mt-prod (#638420508320) and ramp-portal-dev (#248990048888)',
      {
        x: 0.5,
        y: 0.66,
        w: 9.0,
        h: 0.26,
        fontFace: FONT_BODY,
        fontSize: 10,
        color: COLOR_BODY_GRAY,
      }
    );

    const kpis = [
      {
        color: GOOGLE_COLORS[0],
        label: 'MULTI-TENANT CONTROL PLANE SCALE',
        number: '10,000+',
        caption: 'Enterprise & SMB tenants served concurrently on a unified Google ADK control plane',
      },
      {
        color: GOOGLE_COLORS[1],
        label: 'CRYPTOGRAPHIC ISOLATION GUARANTEE',
        number: '0',
        caption: 'Cross-tenant SQL, vector, or session memory leaks across 10 red-team breach simulations',
      },
      {
        color: GOOGLE_COLORS[2],
        label: 'UNIT ECONOMICS & FINOPS EFFICIENCY',
        number: '-84.7%',
        caption: 'Token & orchestration COGS reduction via 90% Vertex AI system-prompt prefix caching',
      },
      {
        color: GOOGLE_COLORS[3],
        label: 'SUB-MILLISECOND HMAC VERIFICATION',
        number: '0.084ms',
        caption: '5-Hop cryptographic token & HMAC verification latency from Cloud Armor to BigQuery RLS',
      },
    ];

    const positions = [
      { x: 0.5, y: 1.15 },
      { x: 5.1, y: 1.15 },
      { x: 0.5, y: 3.15 },
      { x: 5.1, y: 3.15 },
    ];

    kpis.forEach((kpi, idx) => {
      const pos = positions[idx];
      addNeutralCard(pptx, slide, pos.x, pos.y, 4.4, 1.82, kpi.color);

      slide.addText(kpi.label, {
        x: pos.x + 0.25,
        y: pos.y + 0.16,
        w: 3.9,
        h: 0.2,
        fontFace: FONT_TITLE,
        fontSize: 8.5,
        bold: true,
        color: kpi.color,
      });

      slide.addText(kpi.number, {
        x: pos.x + 0.25,
        y: pos.y + 0.38,
        w: 3.9,
        h: 0.88,
        fontFace: FONT_DISPLAY,
        fontSize: 48,
        bold: true,
        color: COLOR_TITLE_DARK,
      });

      slide.addText(kpi.caption, {
        x: pos.x + 0.25,
        y: pos.y + 1.3,
        w: 3.9,
        h: 0.4,
        fontFace: FONT_BODY,
        fontSize: 9.2,
        color: COLOR_BODY_GRAY,
      });
    });

    addConfidentialFooter(pptx, slide, 2, TOTAL_SLIDES);
  }

  // =========================================================================
  // SLIDE 3: `three-zone-architecture` (Visual Archetype 1 — Page 1)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    renderThreeZoneArchitectureSlide(
      pptx,
      slide,
      {
        title: 'Workstream 1: Three-Zone Boundary & Sovereign Interconnect',
        subtitle:
          '100% Native Editable 3-Column Topology: Gemini Enterprise Ingress → Cloud Run 5-Hop Gateway → Sovereign Tenant VPC',
        leftZoneTitle: 'GEMINI ENTERPRISE & VERTEX AI',
        leftZoneSubtitle: '(Webhooks & User Interface)',
        leftClients: [
          { label: 'Gemini Web\nUser Interface', badgeText: 'Gemini' },
          { label: 'Vertex AI\nWorkbench', badgeText: '</> IDE' },
          { label: 'External\nAPI Clients', badgeText: 'REST/gRPC' },
        ],
        ingressLabel: 'Webhooks\n(HTTPS)\nEndpoint',
        centerZoneTitle: 'CLOUD RUN GATEWAY',
        centerZoneSubtitle: '(GCP Shared Control Plane)',
        centerServiceBanner: 'Google Cloud Run',
        centerStages: [
          { title: 'Cloud Armor & IAP\nHeader Stripper' },
          { title: 'Tenant Policy & Schema\nNormalizer' },
          { title: 'RFC 8693 OBO &\nDPoP Token Sealer' },
        ],
        interconnectTopLabel: 'Validated &\nNormalized\nPayload',
        interconnectBottomLabel: 'Secure PSC\nInterconnect /\nVPC Peering',
        rightZoneTitle: 'SOVEREIGN TENANT VPC',
        rightZoneSubtitle: '(Internal Isolated Enclave)',
        rightSovereignCards: [
          {
            badge: 'GOOGLE ADK',
            title: 'Vertex AI Agent Engine Runtime',
            subtitle: 'gVisor Sandbox & temp:tenant_id Prefix',
          },
          {
            badge: 'A2A MESH',
            title: 'Agent 1  •  Agent 2',
            subtitle: 'FinVault & RetailStream Domain Specialists',
          },
          {
            badge: 'RLS + CMEK',
            title: 'AlloyDB & BigQuery RLS',
            subtitle: 'tenant_pooled_rls_policy & finvault-silo-cmek',
          },
        ],
      },
      3,
      TOTAL_SLIDES
    );
  }

  // =========================================================================
  // SLIDE 4: `payload-transformation` (Visual Archetype 2 — Page 2)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    renderPayloadTransformationSlide(
      pptx,
      slide,
      {
        title: 'Deterministic Multi-Tenant Header Stripping & OBO/DPoP Sealing Pipeline',
        subtitle:
          'Stripping spoofed X-Tenant-Id headers, screening unscoped prompts via Model Armor, and sealing RFC 8693 OBO / DPoP claims',
        leftTitle: 'Incoming\nContaminated Request',
        leftPills: [
          {
            contextLine: '  "headers": [',
            label: '"X-Tenant-Id: spoofed-alpha"',
            fillHex: 'CFD8DC',
            textHex: '202124',
          },
          {
            contextLine: '  "prompt": [',
            label: '<unscoped cross-tenant SQL>',
            fillHex: 'FAD2CF',
            textHex: '3C4043',
          },
          {
            contextLine: '  "auth": [',
            label: '<unbound bearer token>',
            fillHex: 'EA4335',
            textHex: 'FFFFFF',
          },
        ],
        centerTitle: 'Cloud Run\nNormalization Engine',
        centerStages: ['IAP Header Stripper', 'Model Armor Sanitizer', 'OBO / DPoP Sealer'],
        rightTitle: 'Clean Zero-Trust\nCompliant Payload',
        rightJsonLines: [
          '{',
          '  "jsonrpc": "2.0",',
          '  "tenant_id": "cymbal-ent-01",',
          '  "tier": "PATTERN_A_POOL",',
          '  "payloads": {',
          '    "schema_ver": 1,',
          '    "scope": "tenant:cymbal",',
          '    "rls_verified": true',
          '  },',
          '  "dpop_seal": "0.084ms_ok",',
          '  "dispatch": "ADK_Worker"',
          '}',
        ],
      },
      4,
      TOTAL_SLIDES
    );
  }

  // =========================================================================
  // SLIDE 5: `swimlane-sequence` (Visual Archetype 3 — Page 3)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    renderSwimlaneSequenceSlide(
      pptx,
      slide,
      {
        title: '5-Actor Cryptographic Sequence & Scale-to-Zero Approval Flow',
        subtitle:
          'End-to-end 6-step lifecycle from tenant OIDC query through 48-hour zero-instance dormancy to 0.084ms HMAC verification & audit',
        actors: [
          { name: 'Tenant User', iconLabel: 'USER', colorHex: BRAND_TOKENS.execNavy },
          { name: 'Gemini Enterprise (AI)', iconLabel: 'AI', colorHex: BRAND_TOKENS.execTeal },
          { name: 'API & Auth Gateway', iconLabel: 'GW', colorHex: BRAND_TOKENS.execSlate },
          { name: 'A2UI Portal (UI)', iconLabel: 'A2UI', colorHex: BRAND_TOKENS.execTeal },
          { name: 'Cloud Run Service', iconLabel: 'RUN', colorHex: GOOGLE_COLORS[0] },
        ],
        step1Label: 'User prompts\nGemini Enterprise',
        step1Arrow: 'Tenant Query (OIDC)',
        step2Label: 'Gateway fetches tenant\ndata & seals HMAC token',
        step2Arrow: 'Fetch Tenant Context',
        step2Return: 'Generate & Seal\nHMAC / DPoP Token',
        step3Label: 'A2UI card\ndisplayed in UI',
        step3Arrow: 'Decision Review Card',
        step4Label: 'Cloud Run scales down to 0\ninstances (48-hr review window)',
        dormantBandTitle: 'Scale to 0 (Dormant — $0 Compute Idle Cost)',
        dormantWindowLabel: '48-Hour Review Period',
        step5Label: 'Tenant Approver\nclicks Approve in UI',
        step5Arrow: 'Click Approve (Signed State Token)',
        step6Label: 'Cloud Run wakes up,\nverifies HMAC in 0.084ms',
        step6VerifyLoop: 'Verify HMAC Token\n(0.084ms latency)',
        step6AuditWrite: 'Write Audit Log\n(Cloud Audit + BQ)',
        auditDbLabel: 'Audit Log DB',
      },
      5,
      TOTAL_SLIDES
    );
  }

  // =========================================================================
  // SLIDE 6: `async-state-machine` (Visual Archetype 5 — Page 5)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    renderAsyncStateMachineSlide(
      pptx,
      slide,
      {
        title: 'Asynchronous Processing Flow for Long Multi-Tenant Tasks (>5 min)',
        subtitle:
          'Non-blocking HTTP 202 Accepted state machine with Google Cloud Pub/Sub decoupling and out-of-band A2UI webhook push callbacks',
        nodes: [
          { label: 'Gemini\nEnterprise', fillHex: BRAND_TOKENS.execNavy },
          { label: 'Cloud Run\nGateway', fillHex: BRAND_TOKENS.execAmber },
          { label: 'Google Cloud\nPub/Sub Topic', fillHex: BRAND_TOKENS.execTeal },
          { label: 'Internal Tenant\nDomain Worker', fillHex: BRAND_TOKENS.execTeal },
        ],
        step1Text: '1. Gemini Enterprise\nsends tenant request',
        step2Text: '2. Gateway returns\nimmediate HTTP 202 Accepted /\nState: WORKING',
        step3Text: '3. Gateway publishes\ntenant-scoped task to\nGoogle Cloud Pub/Sub Topic',
        step4Text: '4. Internal Tenant Worker\nprocesses deep RAG &\nmulti-hop reasoning',
        step5WebhookLoopText:
          '5. Gateway dispatches Out-of-band HTTPS Webhook Push with rendered A2UI card back to Gemini Enterprise',
      },
      6,
      TOTAL_SLIDES
    );
  }

  // =========================================================================
  // SLIDE 7: `roadmap-timeline` (Visual Archetype 4 — Page 4)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    renderRoadmapTimelineSlide(
      pptx,
      slide,
      {
        title: 'Enterprise Multi-Tenant Technology Roadmap Timeline',
        subtitle:
          '3-Phase architectural progression across Pattern A (Pooled SaaS), Pattern C (Hybrid PSC Bridge) & Pattern B (Sovereign Silos)',
        phases: [
          {
            phaseBanner: 'Phase 1: Pattern A',
            headerColorHex: BRAND_TOKENS.execNavy,
            primaryTitle: 'Pooled Runtime\n& BigQuery RLS',
            horizonSubtitle: '(Months 1-3)',
            outcomeLine1: '10,000+ Pooled SaaS Tenants',
            outcomeLine2: '90% Vertex AI Prefix Cache',
          },
          {
            phaseBanner: 'Phase 2: Pattern C',
            headerColorHex: BRAND_TOKENS.execTeal,
            primaryTitle: 'Hybrid PSC Bridge\n& 3LO MCP Mesh',
            horizonSubtitle: '(Months 4-6)',
            outcomeLine1: 'Dedicated /28 PSC NAT Subnets',
            outcomeLine2: 'Zero-Trust Cross-VPC Routing',
          },
          {
            phaseBanner: 'Phase 3: Pattern B',
            headerColorHex: BRAND_TOKENS.execSlate,
            primaryTitle: 'Sovereign Silos\n& HSM CMEK',
            horizonSubtitle: '(Months 7-12)',
            outcomeLine1: 'VPC-SC Air-Gapped Enclaves',
            outcomeLine2: '1-Click Tenant Crypto-Shredding',
          },
        ],
      },
      7,
      TOTAL_SLIDES
    );
  }

  // =========================================================================
  // SLIDE 8: `operating-model-pillars` (Visual Archetype 6 — Page 6)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    renderOperatingModelPillarsSlide(
      pptx,
      slide,
      {
        title: 'Elevated Multi-Tenant Governance & Strategic Operating Model',
        subtitle:
          'Joint platform security, 30-day schema SLAs, and automated Tier-1 Pool to Tier-3 Silo graduation across enterprise tenants',
        pillars: [
          {
            accentColorHex: BRAND_TOKENS.execNavy,
            iconSymbol: 'SHIELD',
            title: 'Immediate Production\nStability (Weeks 1-2)',
            bullets: [
              'Deploy Cloud Run 5-Hop Gateway & Model Armor into shared control plane',
              'Enforce SESSION_USER() Row-Level Security across AlloyDB & BigQuery',
              '100% zero-leak compliance across 20/20 automated red-team gates',
            ],
          },
          {
            accentColorHex: BRAND_TOKENS.execTeal,
            iconSymbol: 'SYNC',
            title: 'Direct Product Engineering\nSync & 30-Day SLA',
            bullets: [
              'Bi-weekly core architecture & FinOps OTel chargeback review cadence',
              'Formal 30-Day Change Freeze SLA on multi-tenant contract schemas',
              'Pre-release staging verification in cymbal-mt-prod (#638420508320) & ramp-portal-dev',
            ],
          },
          {
            accentColorHex: BRAND_TOKENS.execSlate,
            iconSymbol: '</>',
            title: 'Automated Tier Graduation\n& Co-Design (Q1-Q2)',
            bullets: [
              'Co-design AIP-127 multi-tenant resource & RFC 8693 OBO standards',
              'Formalize Pub/Sub async push & 48-hr scale-to-zero HITL specs',
              'Automated Terraform Factory for Pattern A Pool -> Pattern B Silo graduation',
            ],
          },
        ],
      },
      8,
      TOTAL_SLIDES
    );
  }

  // =========================================================================
  // SLIDE 9: `grounded-screenshot-proof` (Live Screenshot Proof 1: BigQuery RLS)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    const screenshot1Path = path.join(
      process.cwd(),
      'public',
      'blogs-verification-screenshots',
      'gcp_console_03_bigquery_studio_pattern_a_rls.png'
    );
    renderGroundedScreenshotProofSlide(
      pptx,
      slide,
      {
        title: 'Grounded GCP Proof 1: BigQuery Row-Level Security (Pattern A Pool)',
        subtitle:
          'Live Google Cloud Console capture (#638420508320) verifying deterministic tenant row filtering and 90% prefix cache economics',
        screenshotAbsPath: screenshot1Path,
        browserWindowTitle:
          'console.cloud.google.com/bigquery?project=638420508320 • pattern_a_pooled_rls_entities',
        screenshotCaption:
          'Figure 9.1 — Authentic Google Cloud Console capture of BigQuery Studio querying cymbal_agentic_finops_otel.pattern_a_pooled_rls_entities.',
        callouts: [
          {
            badge: '1. BLUE • VERIFIED GCP PROJECT',
            title: 'Project #638420508320 (BigQuery Studio)',
            detail: 'Live BigQuery Studio dataset cymbal_agentic_finops_otel.pattern_a_pooled_rls_entities (4 rows, 856 B).',
          },
          {
            badge: '2. RED • STORAGE-LAYER RLS POLICY',
            title: 'tenant_pooled_rls_policy (0 Leaks)',
            detail: 'Banner confirms: "Your query results may be limited because you do not have access to certain rows."',
          },
          {
            badge: '3. YELLOW • FINOPS UNIT ECONOMICS',
            title: '-84.7% Token Cost via 90% Cache',
            detail: 'Shared system instructions cached across 10,000+ pooled tenants, billed via zero-PII OTel spans.',
          },
          {
            badge: '4. GREEN • RED-TEAM BREACH AUDIT',
            title: '10/10 SQL & Vector Spoof Blocked',
            detail: 'Cross-tenant horizontal privilege escalation attempts deterministically rejected at Hop 5.',
          },
        ],
      },
      9,
      TOTAL_SLIDES
    );
  }

  // =========================================================================
  // SLIDE 10: `grounded-screenshot-proof` (Live Screenshot Proof 2: Cloud Run Logs 20/20 PASS)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    const screenshot2Path = path.join(
      process.cwd(),
      'public',
      'blogs-verification-screenshots',
      'gcp_console_07_logs_explorer_20_20_pass.png'
    );
    renderGroundedScreenshotProofSlide(
      pptx,
      slide,
      {
        title: 'Grounded GCP Proof 2: Cloud Run E2E Telemetry (20/20 Gates PASS)',
        subtitle:
          'Live Cloud Run service logs (#638420508320 / us-central1) confirming 20/20 multi-tenant isolation, PSC NAT, and CMEK gates',
        screenshotAbsPath: screenshot2Path,
        browserWindowTitle:
          'console.cloud.google.com/run/detail/us-central1/cymbal-multi-tenant-patterns/logs?project=638420508320',
        screenshotCaption:
          'Figure 10.1 — Authentic Cloud Run Logs capture for cymbal-multi-tenant-patterns emitting E2E_MULTI_TENANT_PATTERNS_20_20_PASS.',
        callouts: [
          {
            badge: '1. BLUE • CLOUD RUN SERVICE',
            title: 'cymbal-multi-tenant-patterns',
            detail: 'Live Cloud Run service (#638420508320 / us-central1) serving HTTP 200 OK with 0.084ms HMAC verify.',
          },
          {
            badge: '2. RED • SOVEREIGN HSM CMEK',
            title: 'finvault-silo-cmek (Cloud KMS HSM)',
            detail: 'Customer-managed encryption keys in us-central1 enabling 1-click tenant crypto-shredding.',
          },
          {
            badge: '3. YELLOW • HYBRID PSC BRIDGE',
            title: 'cymbal-psc-nat-us-west1 (/28)',
            detail: 'Dedicated Private Service Connect NAT subnet isolating hybrid enterprise spoke traffic.',
          },
          {
            badge: '4. GREEN • E2E QUALITY GATE',
            title: '20/20 Assertions Passed (all_suites)',
            detail: 'Structured JSON payload verifies "all_suites_passed": true, "assertions_passed": 20.',
          },
        ],
      },
      10,
      TOTAL_SLIDES
    );
  }

  // =========================================================================
  // SLIDE 11: Workstream 1 Native Editable Official #78 Hub-and-Spoke Topology
  //           With Opaque Pill Edge Labels & Deterministic 2D AABB De-Collision
  // =========================================================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };

    slide.addText('Workstream 1 Reference Architecture: 5-Hop Identity & Hub-and-Spoke Topology (#78)', {
      x: 0.5,
      y: 0.24,
      w: 9.0,
      h: 0.34,
      fontFace: FONT_TITLE,
      fontSize: 15,
      bold: true,
      color: COLOR_TITLE_DARK,
    });
    slide.addText(
      '100% Native Editable Google Slides Shapes (56 Vertices + 23 Orthogonal Connectors across Routing Hub, Governance Hub & Pool/Silo Spokes)',
      {
        x: 0.5,
        y: 0.6,
        w: 9.0,
        h: 0.24,
        fontFace: FONT_BODY,
        fontSize: 9.5,
        color: COLOR_BODY_GRAY,
      }
    );

    addNeutralCard(pptx, slide, 0.5, 0.92, 9.0, 4.2, GOOGLE_COLORS[0]);

    const ws1Bp =
      OFFICIAL_ARCH_CENTER_BLUEPRINTS.find(
        (b) => b.id === 'ws1-multi-tenant-taxonomy-overview'
      ) || OFFICIAL_ARCH_CENTER_BLUEPRINTS[0];
    const ws1DrawioXml = compileOfficialArchCenterDrawioXml(ws1Bp);
    const { cells, minX, minY, maxX, maxY } = parseDrawioXmlForPptx(ws1DrawioXml);

    const visibleVertices = cells.filter(
      (c) =>
        c.vertex &&
        c.id !== 'hdr_title_box' &&
        c.id !== 'hdr_subtitle_box' &&
        !((c.id === 'bg' || c.id.includes('bg')) && c.width >= 700 && c.height >= 400) &&
        (c.width > 0 || c.height > 0)
    );
    const effMinX = visibleVertices.length > 0 ? Math.min(...visibleVertices.map((c) => c.absX)) : minX;
    const effMinY = visibleVertices.length > 0 ? Math.min(...visibleVertices.map((c) => c.absY)) : minY;
    const effMaxX = visibleVertices.length > 0 ? Math.max(...visibleVertices.map((c) => c.absX + c.width)) : maxX;
    const effMaxY = visibleVertices.length > 0 ? Math.max(...visibleVertices.map((c) => c.absY + c.height)) : maxY;
    const effGraphW = Math.max(400, effMaxX - effMinX);
    const effGraphH = Math.max(300, effMaxY - effMinY);

    const CANVAS_X = 0.62;
    const CANVAS_Y = 1.02;
    const CANVAS_W = 8.76;
    const CANVAS_H = 4.02;
    const scaleX = CANVAS_W / effGraphW;
    const scaleY = CANVAS_H / effGraphH;

    const toSlideX = (x: number) => Number((CANVAS_X + (x - effMinX) * scaleX).toFixed(3));
    const toSlideY = (y: number) => Number((CANVAS_Y + (y - effMinY) * scaleY).toFixed(3));
    const toSlideW = (w: number) => Number(Math.max(0.06, w * scaleX).toFixed(3));
    const toSlideH = (h: number) => Number(Math.max(0.06, h * scaleY).toFixed(3));

    const normalizeHex = (raw: string | undefined, fallback: string) => {
      if (!raw || raw === 'none' || raw === 'transparent') return fallback;
      const clean = raw.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
      return clean.length === 6 ? clean : fallback;
    };

    const cellMap = new Map(cells.map((c) => [c.id, c]));
    const parentIds = new Set<string>();
    cells.forEach((c) => {
      if (c.parent && c.parent !== '0' && c.parent !== '1') parentIds.add(c.parent);
    });

    const sortedVertices = [...visibleVertices].sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return b.width * b.height - a.width * a.height;
    });

    const bgVertices = sortedVertices.filter(
      (n) =>
        parentIds.has(n.id) ||
        n.id.startsWith('gcp_') ||
        n.id.startsWith('enclave_') ||
        n.id.startsWith('zone_') ||
        n.id.startsWith('wrapper_') ||
        n.id.startsWith('spoke_') ||
        (n.width >= 260 && n.height >= 160)
    );
    const textLabelVertices = sortedVertices.filter(
      (n) => !bgVertices.includes(n) && (n.id.startsWith('lbl_') || n.style.text === '1')
    );
    const fgVertices = sortedVertices.filter(
      (n) => !bgVertices.includes(n) && !textLabelVertices.includes(n)
    );

    const occupiedBoxes: AabbBox[] = [];

    const renderNode = (node: (typeof visibleVertices)[number]) => {
      const style = node.style;
      const isCircle = (style.ellipse === '1' || style.shape === 'ellipse') && node.width <= 55 && node.height <= 55;
      const bh = toSlideH(node.height);
      const bw = isCircle ? bh : toSlideW(node.width);
      const bx = isCircle ? Number((toSlideX(node.absX + node.width / 2) - bw / 2).toFixed(3)) : toSlideX(node.absX);
      const by = isCircle ? Number((toSlideY(node.absY + node.height / 2) - bh / 2).toFixed(3)) : toSlideY(node.absY);

      const isTextOnly = node.id.startsWith('lbl_') || style.text === '1';
      const hasFill = !isTextOnly && style.fillColor && style.fillColor !== 'none' && style.fillColor !== 'transparent';
      const hasStroke = !isTextOnly && style.strokeColor && style.strokeColor !== 'none' && style.strokeColor !== 'transparent';

      const fillHex = normalizeHex(style.fillColor, 'FFFFFF');
      const strokeHex = normalizeHex(style.strokeColor, 'DADCE0');
      const isContainer = bgVertices.includes(node);

      if (!isContainer) {
        occupiedBoxes.push({ x: bx, y: by, w: bw, h: bh });
      }

      if (hasFill || hasStroke) {
        const shapeType = isCircle
          ? pptx.ShapeType.ellipse
          : style.rounded === '1'
            ? pptx.ShapeType.roundRect
            : pptx.ShapeType.rect;
        slide.addShape(shapeType, {
          x: bx,
          y: by,
          w: bw,
          h: bh,
          rectRadius: shapeType === pptx.ShapeType.roundRect ? 0.04 : undefined,
          fill: hasFill ? { color: fillHex } : undefined,
          line: hasStroke
            ? {
                color: strokeHex,
                width: node.id === 'gcp_outer_frame' ? 1.25 : 0.75,
                dashType: style.dashed === '1' ? 'dash' : 'solid',
              }
            : { type: 'none' },
        });
      }

      const layout = extractStructuredNodeLayout(normalizeDrawioHtmlForSlides(node.value));
      const lines = layout.bodyLines.length > 0 ? layout.bodyLines : layout.headerLines.map((t) => ({ text: t, bold: true }));
      if (lines.length === 0) return;

      if (isCircle) {
        slide.addText(lines[0].text, {
          x: bx,
          y: by,
          w: bw,
          h: bh,
          fontFace: FONT_TITLE,
          fontSize: 5.5,
          bold: true,
          color: 'FFFFFF',
          align: 'center',
          valign: 'middle',
          margin: 0,
        });
        return;
      }

      const effectiveLines = isContainer ? [lines[0]] : lines.slice(0, 2);
      const textStr = effectiveLines.map((l) => l.text).join('\n');
      const hdrH = isContainer ? 0.16 : Math.max(0.15, bh - 0.02);
      if (isContainer) {
        occupiedBoxes.push({ x: bx + 0.03, y: by + 0.01, w: Math.min(2.4, bw - 0.06), h: hdrH });
      }
      slide.addText(textStr, {
        x: bx + 0.04,
        y: by + 0.01,
        w: Math.max(0.15, bw - 0.08),
        h: hdrH,
        fontFace: isContainer ? FONT_TITLE : FONT_BODY,
        fontSize: isContainer ? 4.8 : 4.8,
        bold: isContainer || effectiveLines.length === 1,
        color: isContainer && node.id === 'gcp_outer_frame' ? 'FFFFFF' : COLOR_TITLE_DARK,
        align: isContainer ? 'left' : 'center',
        valign: isContainer ? 'top' : 'middle',
        margin: 0,
      });
    };

    // 1. Render background containers first
    bgVertices.forEach(renderNode);

    // 2. Render all 23 orthogonal connector lines
    const edges = cells.filter((c) => c.edge);
    const pendingEdgeLabels: { lbl: string; midX: number; midY: number }[] = [];
    const seenEdgeLabelPositions = new Set<string>();

    for (const tv of textLabelVertices) {
      const { fullText } = cleanHtmlToPlainText(tv.value);
      const lbl = fullText.replace(/\s+/g, ' ').trim();
      if (!lbl) continue;
      const midX = toSlideX(tv.absX + tv.width / 2);
      const midY = toSlideY(tv.absY + tv.height / 2);
      const key = `${lbl.toLowerCase()}@${midX.toFixed(1)},${midY.toFixed(1)}`;
      if (!seenEdgeLabelPositions.has(key)) {
        seenEdgeLabelPositions.add(key);
        pendingEdgeLabels.push({ lbl, midX, midY });
      }
    }

    for (const edge of edges) {
      const src = cellMap.get(edge.source || '');
      const tgt = cellMap.get(edge.target || '');
      const ptStart = src
        ? {
            x: src.absX + src.width * parseFloat(edge.style.exitX ?? '0.5'),
            y: src.absY + src.height * parseFloat(edge.style.exitY ?? '0.5'),
          }
        : edge.sourcePoint;
      const ptEnd = tgt
        ? {
            x: tgt.absX + tgt.width * parseFloat(edge.style.entryX ?? '0.5'),
            y: tgt.absY + tgt.height * parseFloat(edge.style.entryY ?? '0.5'),
          }
        : edge.targetPoint;
      if (!ptStart || !ptEnd) continue;

      const pts = [ptStart, ...edge.waypoints, ptEnd];
      const strokeColor = normalizeHex(edge.style.strokeColor, COLOR_BODY_GRAY);
      const isDashed = edge.style.dashed === '1';

      for (let i = 0; i < pts.length - 1; i++) {
        const x1 = toSlideX(pts[i].x);
        const y1 = toSlideY(pts[i].y);
        const x2 = toSlideX(pts[i + 1].x);
        const y2 = toSlideY(pts[i + 1].y);
        const w = Number(Math.abs(x2 - x1).toFixed(3));
        const h = Number(Math.abs(y2 - y1).toFixed(3));
        if (w === 0 && h === 0) continue;
        const isLast = i === pts.length - 2;
        slide.addShape(pptx.ShapeType.line, {
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          w,
          h,
          flipH: x2 < x1,
          flipV: y2 < y1,
          line: {
            color: strokeColor,
            width: 0.85,
            dashType: isDashed ? 'dash' : 'solid',
            endArrowType: isLast ? 'triangle' : undefined,
          },
        });
      }

      const { fullText } = cleanHtmlToPlainText(edge.value);
      const lbl = fullText.replace(/\s+/g, ' ').trim();
      if (lbl) {
        let bestSegIdx = 0;
        let bestSegLen = -1;
        for (let i = 0; i < pts.length - 1; i++) {
          const segLen = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
          if (segLen > bestSegLen) {
            bestSegLen = segLen;
            bestSegIdx = i;
          }
        }
        const pA = pts[bestSegIdx];
        const pB = pts[bestSegIdx + 1];
        if (bestSegLen >= 68) {
          const midX = toSlideX((pA.x + pB.x) / 2);
          const midY = toSlideY((pA.y + pB.y) / 2);
          const key = `${lbl.toLowerCase()}@${midX.toFixed(1)},${midY.toFixed(1)}`;
          if (!seenEdgeLabelPositions.has(key)) {
            seenEdgeLabelPositions.add(key);
            pendingEdgeLabels.push({ lbl, midX, midY });
          }
        }
      }
    }

    // 3. Render foreground component cards & numbered circles
    fgVertices.forEach(renderNode);

    // 4. Render De-Collided Opaque White Pill Edge Labels on Top of Lines (0 AABB overlaps, 0 line strikethroughs)
    for (const item of pendingEdgeLabels) {
      const pillW = Number(Math.min(0.84, Math.max(0.42, item.lbl.length * 0.028 + 0.08)).toFixed(3));
      const pillH = 0.125;
      const candidateOffsets = [
        { dx: 0, dy: 0 },
        { dx: 0, dy: -0.14 },
        { dx: 0, dy: 0.14 },
        { dx: -0.18, dy: 0 },
        { dx: 0.18, dy: 0 },
        { dx: 0, dy: -0.26 },
        { dx: 0, dy: 0.26 },
      ];

      let placedBox: AabbBox | null = null;
      for (const off of candidateOffsets) {
        const cand: AabbBox = {
          x: Number((item.midX - pillW / 2 + off.dx).toFixed(3)),
          y: Number((item.midY - pillH / 2 + off.dy).toFixed(3)),
          w: pillW,
          h: pillH,
        };
        const collides = occupiedBoxes.some((ob) => boxesOverlap(cand, ob, 0.01));
        if (!collides) {
          placedBox = cand;
          break;
        }
      }

      if (placedBox) {
        occupiedBoxes.push(placedBox);
        slide.addText(item.lbl, {
          shape: pptx.ShapeType.roundRect,
          x: placedBox.x,
          y: placedBox.y,
          w: placedBox.w,
          h: placedBox.h,
          rectRadius: 0.03,
          fill: { color: 'FFFFFF' },
          line: { color: 'DADCE0', width: 0.4 },
          fontFace: FONT_BODY,
          fontSize: 4.1,
          bold: true,
          color: COLOR_TITLE_DARK,
          align: 'center',
          valign: 'middle',
          margin: 0,
        });
      }
    }

    addConfidentialFooter(pptx, slide, 11, TOTAL_SLIDES);
  }

  // =========================================================================
  // SLIDE 12: `next-steps` (Sequenced Action Items with Owners in Blue->Red->Yellow->Green)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };

    slide.addText('Workstream 1 Implementation Roadmap & Next Steps', {
      x: 0.5,
      y: 0.28,
      w: 9.0,
      h: 0.38,
      fontFace: FONT_TITLE,
      fontSize: 18,
      bold: true,
      color: COLOR_TITLE_DARK,
    });
    slide.addText(
      'Sequenced deployment actions and engineering ownership across the 4 Google Cloud capability stages',
      {
        x: 0.5,
        y: 0.66,
        w: 9.0,
        h: 0.26,
        fontFace: FONT_BODY,
        fontSize: 10,
        color: COLOR_BODY_GRAY,
      }
    );

    const steps = [
      {
        num: '01',
        color: GOOGLE_COLORS[0],
        title: 'Deploy 5-Hop Edge PEP, IAP Header Stripper & OBO/DPoP Token Exchange',
        detail:
          'Configure Cloud Armor, Identity-Aware Proxy (IAP), and Cloud Run Token Broker to mint DPoP-bound tenant JWTs.',
        owner: 'Owner: Platform Security Engineering',
      },
      {
        num: '02',
        color: GOOGLE_COLORS[1],
        title: 'Enforce Scoped ADK Sessions, Model Armor & BigQuery RLS (Pattern A)',
        detail:
          'Bind Vertex AI Agent Engine session namespaces and activate tenant_pooled_rls_policy on cymbal_agentic_finops_otel.',
        owner: 'Owner: Cloud Solutions Architecture',
      },
      {
        num: '03',
        color: GOOGLE_COLORS[2],
        title: 'Enable Scale-to-Zero HITL Sequences & Pub/Sub Async Webhook Loops',
        detail:
          'Wire HTTP 202 Accepted + Cloud Pub/Sub topics + 48-hour zero-instance A2UI approval callbacks with 0.084ms HMAC checks.',
        owner: 'Owner: Enterprise AI Field Engineering',
      },
      {
        num: '04',
        color: GOOGLE_COLORS[3],
        title: 'Provision PSC Hybrid Spokes, Sovereign HSM CMEK & OTel Chargeback',
        detail:
          'Execute Terraform modules for /28 PSC NAT subnets (cymbal-psc-nat-us-west1) and Cloud KMS HSM (finvault-silo-cmek).',
        owner: 'Owner: Data & FinOps Engineering',
      },
    ];

    steps.forEach((st, idx) => {
      const rowY = 1.15 + idx * 0.96;
      addNeutralCard(pptx, slide, 0.5, rowY, 9.0, 0.84);

      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.65,
        y: rowY + 0.16,
        w: 0.52,
        h: 0.52,
        rectRadius: 0.08,
        fill: { color: st.color },
        line: { type: 'none' },
      });
      slide.addText(st.num, {
        x: 0.65,
        y: rowY + 0.16,
        w: 0.52,
        h: 0.52,
        fontFace: FONT_DISPLAY,
        fontSize: 13,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
        valign: 'middle',
      });

      slide.addText(st.title, {
        x: 1.32,
        y: rowY + 0.12,
        w: 5.6,
        h: 0.28,
        fontFace: FONT_TITLE,
        fontSize: 11,
        bold: true,
        color: COLOR_TITLE_DARK,
      });

      slide.addText(st.detail, {
        x: 1.32,
        y: rowY + 0.4,
        w: 5.7,
        h: 0.34,
        fontFace: FONT_BODY,
        fontSize: 8.8,
        color: COLOR_BODY_GRAY,
      });

      slide.addText(st.owner, {
        x: 7.1,
        y: rowY + 0.26,
        w: 2.2,
        h: 0.32,
        fontFace: FONT_TITLE,
        fontSize: 8.8,
        bold: true,
        color: st.color,
        align: 'right',
      });
    });

    addConfidentialFooter(pptx, slide, 12, TOTAL_SLIDES);
  }

  // Export base64 & shrink arrowheads across all slides
  const rawBase64 = (await pptx.write({ outputType: 'base64' })) as string;
  const base64 = await shrinkPptxArrowheadsInBase64(rawBase64);
  const buffer = Buffer.from(base64, 'base64');

  const outDir = path.join(process.cwd(), 'public', 'exports');
  fs.mkdirSync(outDir, { recursive: true });
  const localPptxPath = path.join(outDir, 'ws1-google-slides-design-plugin-deck.pptx');
  fs.writeFileSync(localPptxPath, buffer);
  console.log(`   ✓ Wrote ${buffer.length.toLocaleString()} bytes (12 slides) to ${localPptxPath}`);

  // Upload & convert in-place on Google Slides via Rule 47 Server-Side refresh_token Bridge
  const entry = await uploadPptxBufferToGoogleSlides({
    pptxBuffer: buffer,
    title: 'WS1 — Multi-Tenant Agentic AI Systems on Google Cloud (Google Slides Design Plugin v2.0)',
    cacheKey: 'PLUGIN-GSLIDES-WS1',
    force: true,
  });

  console.log(`\n✅ Created & Synced 12-Slide Workstream 1 Google Slides Presentation (v2.0)!`);
  console.log(`   • Google Slides ID: ${entry.googleSlidesId}`);
  console.log(`   • Edit in Google Slides: ${entry.googleSlidesEditUrl}`);
  console.log(`   • Preview URL: ${entry.googleSlidesPreviewUrl}`);
  console.log(`   • Embed URL: ${entry.googleSlidesEmbedUrl}`);
  console.log(`   • PDF Export URL: ${entry.googleSlidesPdfUrl}`);
}

main().catch((err) => {
  console.error('❌ Error generating WS1 Google Slides deck:', err);
  process.exit(1);
});
