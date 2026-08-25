import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';

function getDomainContextualChips(
  projectTitle: string,
  selectedDomain: string,
  archetypeId: string,
  userPrompt: string
): Array<{ label: string; prompt: string }> {
  const d = selectedDomain.toLowerCase();
  const lowerPrompt = userPrompt.toLowerCase();

  if (d === 'manufacturing' || /\b(drone|aviation|ev|bess|robotics|fleet|aeronode)\b/i.test(projectTitle)) {
    if (lowerPrompt.includes('diagram') || lowerPrompt.includes('kafka') || lowerPrompt.includes('slot')) {
      return [
        { label: '📡 Add 5G Edge & ADS-B Mesh to Diagram 1', prompt: `Update Diagram 1 to include 5G private edge cells, ADS-B collision avoidance feeds, and UTM airspace corridors for ${projectTitle}.` },
        { label: '🔋 Add Battery Swapping State Machine', prompt: `Add a lifecycle state machine section detailing autonomous micro-hub robotic battery swapping and SoC telemetry thresholds.` },
        { label: '🛡️ Add FAA Part 135 Geofence Fail-Safe ADR', prompt: `Add an Architecture Decision Record (ADR) specifying autonomous Return-to-Home (RTH) and geofenced parachute release on loss of C2 telemetry.` },
      ];
    }
    return [
      { label: '🚁 Add FAA Part 135 & UTM Airspace Safety Section', prompt: `Add a dedicated chapter covering FAA Part 135 compliance, BVLOS flight rules, and automated UTM airspace deconfliction to ${projectTitle}.` },
      { label: '📡 Add 5G Telemetry & ADS-B Mesh to Diagram 1', prompt: `Update Diagram 1 to incorporate sub-20ms 5G telemetry edge nodes, ADS-B transponder ingresses, and micro-hub relay routers.` },
      { label: '⚡ Add Micro-Hub Automated Battery Swapping', prompt: `Add an architectural specification for autonomous micro-hub robotic battery hot-swapping and solar microgrid integration.` },
      { label: '⚖️ Add Loss-of-Link Geofence Contingency ADR', prompt: `Add an Architecture Decision Record (ADR) defining automated fail-safe emergency landing protocols on cellular/satellite telemetry loss.` },
    ];
  }

  if (d === 'fintech' || /\b(pay|settle|ledger|trade|bank|fraud|iso 20022|apexpay)\b/i.test(projectTitle)) {
    return [
      { label: '💳 Add Sub-5ms Pre-Trade Risk & ISO 20022 Schema', prompt: `Add a section defining sub-5ms pre-trade risk evaluation, SEC 15c3-5 checks, and ISO 20022 pacs.008 schema validation for ${projectTitle}.` },
      { label: '🗄️ Add Cloud Spanner Double-Entry Ledger to Diagram 2', prompt: `Update Diagram 2 to detail the distributed Spanner double-entry accounting ledger with TrueTime Paxos replication.` },
      { label: '🛡️ Add AML & OFAC Sanctions Real-Time Screener', prompt: `Add an automated real-time AML / OFAC sanctions screening pipeline with Kafka streaming and Bloom filter lookups.` },
      { label: '🔄 Add Multi-Region Active-Active Failover Sequence', prompt: `Add an active-active multi-region failover sequence table specifying RPO=0 and automated Anycast DNS rerouting.` },
    ];
  }

  if (d === 'retail' || /\b(cart|sku|warehouse|wms|fulfillment|catalog|omnivue)\b/i.test(projectTitle)) {
    return [
      { label: '📦 Add Omnichannel Dynamic Pricing & SKU Allocator', prompt: `Add an automated omnichannel inventory reservation and real-time SKU allocation engine specification for ${projectTitle}.` },
      { label: '🚚 Add WMS Cross-Dock & 3PL Logistics Mesh to Diagram 2', prompt: `Update Diagram 2 to incorporate automated warehouse cross-docking, automated guided vehicles (AGVs), and 3PL carrier APIs.` },
      { label: '⚡ Add Sub-50ms Cart Checkout Latency Budget', prompt: `Add a strict sub-50ms checkout latency budget breakdown across edge CDN, payment tokenization, and Spanner order store.` },
      { label: '🛡️ Add Black Friday Flash Burst Auto-Scaling Policy', prompt: `Add an auto-scaling and pre-warmed Redis cache warming runbook for 10x Black Friday traffic bursts.` },
    ];
  }

  if (d === 'saas' || /\b(tenant|workspace|billing|crm|oauth|workcloud)\b/i.test(projectTitle)) {
    return [
      { label: '🏢 Add Multi-Tenant Workspace Isolation Matrix', prompt: `Add a comprehensive multi-tenant database partitioning matrix comparing pool vs silo models with Row-Level Security (RLS) for ${projectTitle}.` },
      { label: '🔒 Add Okta OIDC & SAML 2.0 Identity Mesh to Diagram 1', prompt: `Update Diagram 1 to detail enterprise IdP federation via OIDC/SAML 2.0 with SCIM automated user provisioning.` },
      { label: '📊 Add Distributed Token Bucket Rate Limiter', prompt: `Add a distributed Redis token-bucket rate limiting specification with per-tenant quota tiers and circuit breakers.` },
      { label: '📜 Add SOC 2 Type II Immutable Audit Chaining', prompt: `Add a SOC 2 Type II compliance audit section detailing SHA-256 cryptographic hash chaining for all administrative actions.` },
    ];
  }

  // Biopharma / Default
  return [
    { label: '🧬 Add 21 CFR Part 11 Electronic Signature Matrix', prompt: `Add an FDA 21 CFR Part 11 compliance chapter detailing dual-custody electronic signatures and SHA-256 audit stamping for ${projectTitle}.` },
    { label: '🛡️ Add Pharmacovigilance Real-Time Adverse Event Gate', prompt: `Add an automated pharmacovigilance (PV) safety event detection gate with MedDRA ontology dictionary lookups.` },
    { label: '🔬 Add ScaNN Vector Knowledge Retrieval to Diagram 2', prompt: `Update Diagram 2 to feature hybrid sparse-dense ScaNN vector indexing over clinical trial protocols and IND submissions.` },
    { label: '⚖️ Add Human-in-the-Loop Medical Reviewer Workbench', prompt: `Add an architectural specification for human-in-the-loop (HITL) Medical Information Specialist review queues and overrides.` },
  ];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userPrompt,
      chatHistory = [],
      currentDocMarkdown = '',
      currentDocVersion = 'v1.0',
      currentDiagramSlots = {},
      archetypeId = 'fdd',
      selectedDomain = 'manufacturing',
      projectTitle = 'Enterprise Architecture',
    } = body;

    if (!userPrompt || typeof userPrompt !== 'string') {
      return NextResponse.json({ error: 'userPrompt is required' }, { status: 400 });
    }

    const fallbackChips = getDomainContextualChips(projectTitle, selectedDomain, archetypeId, userPrompt);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Offline fallback heuristic parser for testing and development
      const lower = userPrompt.toLowerCase();
      if (lower.includes('diagram') || lower.includes('template') || lower.includes('figure') || lower.includes('xml')) {
        return NextResponse.json({
          success: true,
          action: 'diagram_update',
          targetSlotIndex: lower.includes('2') ? 2 : lower.includes('3') ? 3 : lower.includes('4') ? 4 : 1,
          newPrompt: `Enhanced ${projectTitle} architecture flow with high-throughput event queues and zero-trust controls: ${userPrompt}`,
          changeSummary: `Updated Diagram with user specifications: ${userPrompt.slice(0, 60)}...`,
          replyMessage: `I've updated the visual architecture diagram with your specifications. The diagram version has been bumped.`,
          suggestedNextSteps: fallbackChips,
        });
      }

      if (lower.includes('add') || lower.includes('change') || lower.includes('update') || lower.includes('rewrite') || lower.includes('section') || lower.includes('chapter')) {
        const addition = `\n\n### 📝 AI Refinement: ${userPrompt.slice(0, 50)}\n\n* **Updated Scope:** ${userPrompt}\n* **Technical Target:** Sub-20ms SLA latency, 99.999% availability, and automated failover.\n* **Enforcement:** Governed by enterprise architecture review board (ARB) standards.\n`;
        return NextResponse.json({
          success: true,
          action: 'doc_update',
          newMarkdown: currentDocMarkdown + addition,
          changeSummary: `Applied refinement: ${userPrompt.slice(0, 60)}...`,
          replyMessage: `I've updated the document content to incorporate "${userPrompt}". The document version has been increased while preserving your existing visual diagrams.`,
          suggestedNextSteps: fallbackChips,
        });
      }

      return NextResponse.json({
        success: true,
        action: 'chat_only',
        replyMessage: `I am your PromptCanvas AI Copilot for "${projectTitle}". You can ask me to rewrite sections, add technical matrices, or modify specific diagram slots.`,
        suggestedNextSteps: fallbackChips,
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = process.env.GEMINI_PRO_MODEL_ID || process.env.GEMINI_MODEL_ID || 'gemini-2.5-flash';

    const systemInstruction = `You are PromptCanvas AI Copilot, an elite Principal Enterprise Systems Architect.
You assist users in refining, editing, and expanding enterprise architecture specification documents and visual diagrams.

Given the current document markdown, current diagram slots, and user request:
1. Determine whether the user wants to:
   - "doc_update": Edit, expand, rewrite, or update the document markdown text.
   - "diagram_update": Modify, restyle, reconfigure, or add components to an architectural diagram slot.
   - "chat_only": Answer a question, explain an architectural trade-off, or provide guidance without altering files.

2. ALWAYS generate 3 to 4 hyper-relevant, context-aware "suggestedNextSteps" clickable chips directly tailored to "${projectTitle}" (${selectedDomain.toUpperCase()}) and the conversation context. NEVER provide generic filler chips.

3. Return ONLY a valid JSON object matching this schema (do NOT include backticks or markdown fences):
{
  "action": "doc_update" | "diagram_update" | "chat_only",
  "replyMessage": "Polite, concise explanation to the user of what was analyzed or applied.",
  "changeSummary": "Short 1-line summary of the change for the version history ledger (e.g. 'Added STRIDE Threat Matrix to Chapter 4')",
  "newMarkdown": "The complete updated markdown document if action is 'doc_update'",
  "targetSlotIndex": 1 | 2 | 3 | 4, // If action is 'diagram_update', index of the diagram slot (1-indexed)
  "newPrompt": "Detailed technical diagram customization instructions if action is 'diagram_update'",
  "suggestedNextSteps": [
    {
      "label": "Short action label with emoji (max 45 chars, e.g. '🚁 Add FAA Part 135 UTM Section')",
      "prompt": "Full actionable prompt that will be executed when clicked"
    }
  ]
}

CRITICAL RULES:
- If action is "doc_update", ensure all visual diagram headers (### 📐 Visual Diagram [N]: ...) and mermaid blocks are fully preserved in newMarkdown.
- Never leak unrelated bio-pharma terms into non-biopharma domains (fintech, manufacturing, retail, saas).
- Always maintain rigorous technical specifications (latencies, SLAs, protocols).`;

    const userPromptPayload = `PROJECT: ${projectTitle} (${selectedDomain.toUpperCase()} domain, ${archetypeId.toUpperCase()} archetype)
CURRENT DOC VERSION: ${currentDocVersion}
CURRENT DIAGRAM SLOTS: ${JSON.stringify(Object.keys(currentDiagramSlots).map(k => ({ slot: k, templateId: (currentDiagramSlots as any)[k]?.templateId, version: (currentDiagramSlots as any)[k]?.version })))}

RECENT CHAT HISTORY:
${chatHistory.slice(-4).map((m: any) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n')}

USER REQUEST:
${userPrompt}

CURRENT DOCUMENT CONTENT (TRUNCATED PREVIEW IF LARGE):
${currentDocMarkdown.slice(0, 12000)}

Respond with the JSON object now:`;

    const response = await generateContentWithRetry(ai, {
      model,
      contents: userPromptPayload,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    let rawText = response.text || '';
    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    try {
      const parsed = JSON.parse(rawText);
      const nextSteps = Array.isArray(parsed.suggestedNextSteps) && parsed.suggestedNextSteps.length > 0
        ? parsed.suggestedNextSteps
        : fallbackChips;

      return NextResponse.json({
        success: true,
        action: parsed.action || 'chat_only',
        replyMessage: parsed.replyMessage || 'Processed your request.',
        changeSummary: parsed.changeSummary || 'AI Copilot Refinement',
        newMarkdown: parsed.newMarkdown,
        targetSlotIndex: parsed.targetSlotIndex || 1,
        newPrompt: parsed.newPrompt,
        suggestedNextSteps: nextSteps,
      });
    } catch (parseErr) {
      console.warn('[DocGen Copilot API] JSON parse fallback, using text reply:', parseErr);
      return NextResponse.json({
        success: true,
        action: 'chat_only',
        replyMessage: response.text || 'I processed your request.',
        suggestedNextSteps: fallbackChips,
      });
    }
  } catch (err: any) {
    console.error('[DocGen Copilot API] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process copilot request' },
      { status: 500 }
    );
  }
}

