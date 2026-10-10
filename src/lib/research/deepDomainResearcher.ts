/**
 * Live 6-Dimension Deep-Research Pre-Flight Stage for PromptCanvas
 *
 * Eradicates the generic template string-interpolation blindspot (Rule 42).
 * Before generating a diagram for ANY brand-new domain or topic, this engine
 * invokes Google Omni 1.1 + Gemini 3.1 Pro (`gemini-3.1-pro-preview` / `gemini-2.5-flash`)
 * to research and ground 6 mandatory architectural dimensions:
 *   1. True Domain Ontology & Canonical 4-Stage Lifecycle Spine (01..04)
 *   2. Authentic Wire Protocols, RFCs, File Formats & Regulatory Standards
 *   3. Hot Data Plane vs. Control Plane vs. Governance Plane Separation
 *   4. Quantitative Hard Decision Gates & Failure/Self-Healing Paths
 *   5. Concrete Reference Engines, Hardware & Cloud/OSS Systems
 *   6. Actionable Non-Negotiable Standing Engineering Laws (Rule 01..04)
 */

import { GoogleGenAI, Type } from '@google/genai';
import {
  getEffectiveGeminiApiKey,
  getGeminiModelWithFallbacks,
  GEMINI_PRO_MODEL_ID,
  GEMINI_FLASH_MODEL_ID
} from '../geminiConfig';
import {
  InfographicSpec,
  TierSpec,
  buildDynamicInfographicTiers,
  renderInfographicSpecToXml
} from '../canonical/dynamicTieredInfographic';

export interface SixDimensionResearchDossier {
  domainTopic: string;
  canonicalLifecycleSummary: string;
  standardsAndProtocols: string[];
  planeSeparation: {
    dataPlane: string;
    controlPlane: string;
    governancePlane: string;
  };
  quantitativeDecisionGates: string[];
  concreteEnginesAndSkus: string[];
}

export interface DeepResearchInfographicResult {
  xml: string;
  spec: InfographicSpec;
  dossier: SixDimensionResearchDossier;
  researchBriefMarkdown: string;
  modelUsed: string;
  isLiveResearched: boolean;
  groundingSources?: string[];
}

/**
 * Normalizes deprecated or legacy Google Cloud, Gemini, and DeepMind product/model names
 * to their latest authoritative 2026 nomenclature so diagrams and documentation never emit stale SKUs.
 */
export function normalizeLatestGoogleAndCloudNomenclature(text: string): string {
  if (!text) return text;
  return text
    .replace(/\bCloud DLP\b/gi, 'Sensitive Data Protection')
    .replace(/\bStackdriver\b/gi, 'Cloud Monitoring & Logging')
    .replace(/\bContainer Registry\b/gi, 'Artifact Registry')
    .replace(/\bAnthos Service Mesh\b/gi, 'Cloud Service Mesh')
    .replace(/\bDataplex (?:Data|Universal) Catalog\b/gi, 'Dataplex Catalog')
    .replace(/\bGlobal HTTPS Load Balancer\b/gi, 'Global External Application LB')
    .replace(/\bGemini\s+(?:1\.5|2\.0|2\.5|3\.5|3\.6|3\.7)\s+Pro\b/gi, 'Gemini 3.1 Pro')
    .replace(/\bGemini\s+(?:1\.5|2\.0|2\.5|3\.5|3\.6|3\.7)\s+Flash\b/gi, 'Gemini 3.8 Flash')
    .replace(/\bgemini-(?:1\.5|2\.0|2\.5|3\.5|3\.6|3\.7)-flash[a-z0-9-]*\b/gi, 'gemini-3.8-flash')
    .replace(/\bVeo\s+[12](?:\.0)?\b/gi, 'DeepMind Veo 3.1')
    .replace(/\bLyria\s+[12](?:\.0)?\b/gi, 'DeepMind Lyria 3.5');
}

/**
 * Executes a fast pre-flight Google Search Grounding query (`tools: [{ googleSearch: {} }]`)
 * to retrieve the latest product release notes, capabilities, wire protocols, or bug-fix advisories
 * before structured JSON schema compilation. Gracefully returns empty string when offline or unsupported.
 */
export async function fetchLiveGoogleSearchGroundingBrief(
  ai: GoogleGenAI,
  prompt: string,
  modelId: string = GEMINI_FLASH_MODEL_ID
): Promise<{ brief: string; sources: string[] }> {
  if (process.env.ENABLE_LIVE_GOOGLE_SEARCH_GROUNDING === 'false') {
    return { brief: '', sources: [] };
  }
  try {
    const res = await ai.models.generateContent({
      model: modelId,
      contents: `Retrieve the latest 2026 technical facts, official product SKU names, wire protocols, architecture boundaries, and recent capability/bug-fix updates for: "${prompt}". Summarize in 5 concise bullet points.`,
      config: {
        temperature: 0.1,
        tools: [{ googleSearch: {} }]
      }
    });
    const brief = normalizeLatestGoogleAndCloudNomenclature(res.text || '');
    const chunks = (res as any)?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: string[] = chunks
      .map((c: any) => c?.web?.uri || c?.retrievedContext?.uri)
      .filter(Boolean);
    return { brief, sources: Array.from(new Set(sources)) };
  } catch {
    return { brief: '', sources: [] };
  }
}

const TIER_PALETTE = [
  { num: '01', primaryColor: '#2563EB', lightBg: '#EFF6FF', borderColor: '#93C5FD' },
  { num: '02', primaryColor: '#7C3AED', lightBg: '#F5F3FF', borderColor: '#C4B5FD' },
  { num: '03', primaryColor: '#EA580C', lightBg: '#FFF7ED', borderColor: '#FDBA74' },
  { num: '04', primaryColor: '#059669', lightBg: '#ECFDF5', borderColor: '#6EE7B7' }
];

export async function researchAndCompileDomainInfographic(
  prompt: string,
  customApiKey?: string
): Promise<DeepResearchInfographicResult> {
  const normalizedPrompt = normalizeLatestGoogleAndCloudNomenclature(prompt);
  const apiKey = getEffectiveGeminiApiKey(customApiKey) || process.env.GOOGLE_API_KEY || '';
  const candidateModels = Array.from(new Set([
    ...getGeminiModelWithFallbacks('pro'),
    GEMINI_FLASH_MODEL_ID,
    ...getGeminiModelWithFallbacks('medium')
  ]));
  let modelName = GEMINI_PRO_MODEL_ID;

  if (!apiKey) {
    const fallbackSpec = buildDynamicInfographicTiers(prompt);
    return {
      xml: renderInfographicSpecToXml(fallbackSpec),
      spec: fallbackSpec,
      dossier: {
        domainTopic: prompt,
        canonicalLifecycleSummary: 'Deterministic domain preset synthesis',
        standardsAndProtocols: [],
        planeSeparation: {
          dataPlane: 'Primary ingestion and runtime execution path',
          controlPlane: 'Orchestration harness and routing engine',
          governancePlane: 'Policy guardrails and audit telemetry'
        },
        quantitativeDecisionGates: fallbackSpec.tiers.map(t => t.gateTitle),
        concreteEnginesAndSkus: []
      },
      researchBriefMarkdown: `Synthesized 4-Tier Architectural Infographic for **${prompt}**.`,
      modelUsed: 'deterministic-preset',
      isLiveResearched: false
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are Google Omni 1.1, Chief Enterprise & Systems Architect.
Your task is to perform rigorous 6-Dimension Domain Engineering Research for the user's requested topic BEFORE compiling a 4-Tier Architectural Infographic.

CRITICAL ANTI-GENERIC RULES (STRICT ZERO-PLACEHOLDER LAW):
1. NEVER use generic placeholder titles like "Data Sources", "Policy Harness", "Automated Quality Gate", or "Knowledge Graph".
2. Every single tier title, card title, badge, bullet point, decision gate, and bottom rule MUST name real, domain-specific physics, wire protocols, RFCs, file formats, regulatory standards (e.g., ITU-T, IEEE, ISO, HL7 FHIR, FDA 21 CFR Part 11, PCI-DSS, NIST, W3C), hardware/software engines, and quantitative engineering metrics.
3. Structure the architecture into the true 4-stage canonical progression of the domain (Tier 01 -> Tier 02 -> Tier 03 -> Tier 04).
4. Each tier MUST have:
   - title: Uppercase domain-authentic stage title (max 42 chars)
   - subtitle: Crisp engineering explanation (max 75 chars)
   - cards: Exactly 3 cards per tier (Card 1: Data/Physical Plane, Card 2: Control/Processing Plane, Card 3: Security/Governance Plane). Each card has title (max 30 chars), badge (uppercase 1-2 words), and exactly 3 concise technical bullet points (max 58 chars each) naming real protocols/engines/metrics.
   - gateTitle: A quantitative or formal pass/fail decision gate question (max 28 chars, e.g., "OSNR >= 18.5 dB?", "Indel Rate < 0.05%?", "QBER < 11.0%?").
   - gatePassLabel: Short certified output badge (max 22 chars).
   - bottomRuleText: Actionable standing engineering rule starting with "Rule 01:", "Rule 02:", "Rule 03:", or "Rule 04:" (max 115 chars).`;

    const requestSchema = {
      type: Type.OBJECT,
      properties: {
        headerTitle: { type: Type.STRING },
        headerSubtitle: { type: Type.STRING },
        footerText: { type: Type.STRING },
        dossier: {
          type: Type.OBJECT,
          properties: {
            domainTopic: { type: Type.STRING },
            canonicalLifecycleSummary: { type: Type.STRING },
            standardsAndProtocols: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            planeSeparation: {
              type: Type.OBJECT,
                  properties: {
                    dataPlane: { type: Type.STRING },
                    controlPlane: { type: Type.STRING },
                    governancePlane: { type: Type.STRING }
                  },
                  required: ['dataPlane', 'controlPlane', 'governancePlane']
                },
                quantitativeDecisionGates: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                concreteEnginesAndSkus: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: [
                'domainTopic',
                'canonicalLifecycleSummary',
                'standardsAndProtocols',
                'planeSeparation',
                'quantitativeDecisionGates',
                'concreteEnginesAndSkus'
              ]
            },
            tiers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  cards: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        bullets: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING }
                        }
                      },
                      required: ['title', 'badge', 'bullets']
                    }
                  },
                  gateTitle: { type: Type.STRING },
                  gatePassLabel: { type: Type.STRING },
                  bottomRuleText: { type: Type.STRING }
                },
                required: ['title', 'subtitle', 'cards', 'gateTitle', 'gatePassLabel', 'bottomRuleText']
              }
            }
          },
          required: ['headerTitle', 'headerSubtitle', 'footerText', 'dossier', 'tiers']
    };

    const grounding = await fetchLiveGoogleSearchGroundingBrief(ai, normalizedPrompt);
    const groundingContext = grounding.brief
      ? `\n\nLIVE GOOGLE SEARCH GROUNDING BRIEF (2026 Latest Product/Feature/Bug-Fix Facts):\n${grounding.brief}`
      : '';

    let rawText = '';
    let lastError: unknown = null;
    for (const candidateModel of candidateModels) {
      try {
        modelName = candidateModel;
        const response = await ai.models.generateContent({
          model: candidateModel,
          contents: `Perform 6-Dimension Domain Architecture Research and compile a complete 4-Tier Architectural Infographic specification for:\n"${normalizedPrompt}"${groundingContext}`,
          config: {
            systemInstruction,
            temperature: 0.25,
            responseMimeType: 'application/json',
            responseSchema: requestSchema
          }
        });
        rawText = response.text || '';
        if (rawText) break;
      } catch (err) {
        lastError = err;
        console.warn(`[DeepDomainResearcher] Model ${candidateModel} failed, trying next fallback...`);
      }
    }

    if (!rawText && lastError) {
      throw lastError;
    }

    const parsed = JSON.parse(rawText);

    if (!Array.isArray(parsed.tiers) || parsed.tiers.length < 4) {
      throw new Error('Researched response did not contain 4 complete tiers');
    }

    const hydratedTiers: TierSpec[] = parsed.tiers.slice(0, 4).map((t: any, idx: number) => {
      const palette = TIER_PALETTE[idx];
      return {
        num: palette.num,
        title: String(t.title || `STAGE ${palette.num}`).toUpperCase(),
        subtitle: String(t.subtitle || ''),
        primaryColor: palette.primaryColor,
        lightBg: palette.lightBg,
        borderColor: palette.borderColor,
        cards: (Array.isArray(t.cards) ? t.cards.slice(0, 3) : []).map((c: any) => ({
          title: String(c.title || ''),
          badge: String(c.badge || 'DOMAIN').toUpperCase(),
          bullets: Array.isArray(c.bullets) ? c.bullets.slice(0, 3).map(String) : []
        })),
        gateTitle: String(t.gateTitle || 'SLA Verified?'),
        gatePassLabel: String(t.gatePassLabel || 'Certified'),
        bottomRuleText: String(t.bottomRuleText || '')
      };
    });

    const spec: InfographicSpec = {
      headerTitle: String(parsed.headerTitle || normalizedPrompt).toUpperCase(),
      headerSubtitle: String(parsed.headerSubtitle || ''),
      footerText: String(parsed.footerText || '').toUpperCase(),
      tiers: hydratedTiers
    };

    const xml = renderInfographicSpecToXml(spec);
    const dossier: SixDimensionResearchDossier = parsed.dossier;

    const researchBriefMarkdown = [
      `🔬 **6-Dimension Deep Domain Research Complete** (*Model: \`${modelName}\`*)`,
      ``,
      `**1. Domain Ontology & Lifecycle Spine:**`,
      `• ${dossier.canonicalLifecycleSummary}`,
      ``,
      `**2. Authentic Protocols, Standards & RFCs Grounded:**`,
      `• ${dossier.standardsAndProtocols.join(' • ')}`,
      ``,
      `**3. Operational Plane Separation:**`,
      `• **Data Plane:** ${dossier.planeSeparation.dataPlane}`,
      `• **Control Plane:** ${dossier.planeSeparation.controlPlane}`,
      `• **Governance Plane:** ${dossier.planeSeparation.governancePlane}`,
      ``,
      `**4. Quantitative Hard Decision Gates:**`,
      `• ${dossier.quantitativeDecisionGates.join(' | ')}`,
      ``,
      `**5. Concrete Reference Engines & Systems:**`,
      `• ${dossier.concreteEnginesAndSkus.join(', ')}`
    ].join('\n');

    return {
      xml,
      spec,
      dossier,
      researchBriefMarkdown,
      modelUsed: modelName,
      isLiveResearched: true,
      groundingSources: grounding.sources
    };
  } catch (err) {
    console.warn('[DeepDomainResearcher] Live research fallback triggered:', err);
    const fallbackSpec = buildDynamicInfographicTiers(prompt);
    return {
      xml: renderInfographicSpecToXml(fallbackSpec),
      spec: fallbackSpec,
      dossier: {
        domainTopic: prompt,
        canonicalLifecycleSummary: 'Domain architecture synthesis',
        standardsAndProtocols: [],
        planeSeparation: {
          dataPlane: 'Primary ingestion and runtime execution path',
          controlPlane: 'Orchestration harness and routing engine',
          governancePlane: 'Policy guardrails and audit telemetry'
        },
        quantitativeDecisionGates: fallbackSpec.tiers.map(t => t.gateTitle),
        concreteEnginesAndSkus: []
      },
      researchBriefMarkdown: `Synthesized 4-Tier Architectural Infographic for **${prompt}**.`,
      modelUsed: 'deterministic-preset',
      isLiveResearched: false
    };
  }
}
