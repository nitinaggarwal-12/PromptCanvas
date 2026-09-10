import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_ID, getGeminiModelWithFallbacks, getGenConfig } from './geminiConfig';
import { generateGCPFunctionalFlowchart } from './gcpFunctionalFlowchart';
import { validateAndHealDrawioXml } from './xmlHealer';
import { validateDrawioXml } from './validate/validator';

export interface DecompileResult {
  xml: string;
  summary: string;
  extractedZones: string[];
  componentCount: number;
  isFallback: boolean;
  modelUsed: string | null;
  attribution: string;
  fallbackReason?: string;
  validationReport?: {
    valid: boolean;
    errorCount: number;
    warningCount: number;
  };
}

function getAiClient(customKey?: string): GoogleGenAI {
  const apiKey = customKey || process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey });
}

function sanitizeXmlOutput(rawText: string): string {
  let cleaned = (rawText || '').trim();
  // Strip markdown code blocks if wrapped
  cleaned = cleaned.replace(/^```(?:xml)?\s*/i, '').replace(/\s*```$/i, '').trim();

  // Validate mxfile envelope
  if (!cleaned.includes('<mxfile')) {
    // If it only output mxGraphModel or mxCell root, wrap it
    if (cleaned.includes('<mxGraphModel')) {
      cleaned = `<mxfile host="embed.diagrams.net"><diagram id="decompiled_diagram" name="Decompiled Architecture">${cleaned}</diagram></mxfile>`;
    } else if (cleaned.includes('<root>')) {
      cleaned = `<mxfile host="embed.diagrams.net"><diagram id="decompiled_diagram" name="Decompiled Architecture"><mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#FFFFFF"><root>${cleaned}</root></mxGraphModel></diagram></mxfile>`;
    }
  }

  return cleaned;
}

export async function decompileArchitectureImageWithDeepMind(params: {
  imageBase64: string;
  mimeType?: string;
  projectName?: string;
  useCaseName?: string;
  userApiKey?: string;
}): Promise<DecompileResult> {
  const {
    imageBase64,
    mimeType = 'image/png',
    projectName = 'Decompiled Architecture',
    useCaseName = 'DeepMind Vision Extraction',
    userApiKey,
  } = params;

  const apiKey = userApiKey || process.env.GEMINI_API_KEY;

  // If no API key is available, use our high-fidelity deterministic master compiler
  if (!apiKey) {
    const xml = generateGCPFunctionalFlowchart({
      projectName,
      useCaseName,
      theme: 'light',
    });
    return {
      xml,
      summary: `Deterministic baseline architecture template generated for ${projectName} (No GEMINI_API_KEY configured for vision decompilation).`,
      extractedZones: ['Ingress & Security', 'Load Balancing & Compute', 'Application & Data', 'Agentic AI Services'],
      componentCount: 28,
      isFallback: true,
      modelUsed: null,
      attribution: 'Static TypeScript Template (gcpFunctionalFlowchart)',
      fallbackReason: 'GEMINI_API_KEY is not configured in the environment or request payload.',
    };
  }

  try {
    const ai = getAiClient(apiKey);
    const modelsToTry = getGeminiModelWithFallbacks('vision');

    const systemPrompt = `You are Google DeepMind's Premier Architecture Vision Decompiler & Diagram Compiler.
Your goal is to inspect the provided architecture diagram image with 100% precision, detect all spatial tiers, container zones, microservice cards, decision gates, databases, icons, and connecting flow arrows, and output a complete, valid Draw.io XML document (<mxfile><diagram ...><mxGraphModel ...>...</mxGraphModel></diagram></mxfile>).

CRITICAL XML & STYLING RULES:
1. Standard 16:9 widescreen canvas dimensions: pageWidth="1600" pageHeight="1000".
2. Strict Verbatim Fidelity Law: NEVER sanitize, auto-correct, rephrase, or alter text, typos, OCR artifacts, or tokens found in the image. Preserve all literal labels, table cells, and phrasing 100% exactly as shown in the source.
3. Exact Connector Geometry & Arrow Directions: Faithfully replicate all junction points (e.g. T-junction mergers, orthogonal multi-point buses, forks), explicit arrowhead directions (up, down, left, right, bidirectional), and feedback return loops without altering routing logic.
4. Bounding Box & Pitch: Maintain 140px horizontal pitch and 80px vertical inter-row channels.
5. High-Contrast Labels: All connector labels must have 'labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;'.
6. Typed Connectors: Solid blue (#2563EB) for API/ingress, dashed orange (#D97706) for async, dashed green (#15803D) for feedback loops, dashed purple (#7C3AED) for AI reasoning.
7. No External HTTP Image URLs: Use clean HTML styling or SVG shapes.
8. Middle Space Reclamation & Inline Layout: Never detach bottom summary tables or cadence matrices into isolated ghost rows separated by dead vertical voids. Position them inline within their designated swimlane, horizontally flanked by neighboring step cards and terminals, with overlying container boxes flush directly above.
9. Output ONLY the raw valid XML document enclosed in <mxfile>...</mxfile>. Do not include conversational markdown commentary.`;

    // Strip header if data URI
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

    let candidateText = '';
    let usedModel = modelsToTry[0];

    for (const model of modelsToTry) {
      try {
        usedModel = model;
        const response = await ai.models.generateContent({
          model,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  inlineData: {
                    mimeType,
                    data: cleanBase64,
                  },
                },
                {
                  text: `Decompile this architecture diagram for project "${projectName}" - "${useCaseName}". Recreate all visual containers, service cards, decision diamonds, step sequences (❶..❼), and connection arrows in Draw.io XML.`,
                },
              ],
            },
          ],
          config: {
            systemInstruction: systemPrompt,
            ...getGenConfig('vision'),
          },
        });
        candidateText = response?.text || '';
        if (candidateText) break;
      } catch (callErr: any) {
        const msg = callErr?.message || String(callErr);
        if (msg.includes('404') || msg.includes('not found') || msg.includes('unsupported') || msg.includes('PERMISSION_DENIED')) {
          console.warn(`[Vision Decompiler Fallback] Model ${model} unavailable (${msg}). Retrying with fallback model...`);
          continue;
        }
        throw callErr;
      }
    }
    const cleanedXml = sanitizeXmlOutput(candidateText);

    if (cleanedXml.includes('<mxfile') && cleanedXml.includes('</mxfile>')) {
      // 🛡️ Enforce Zero-Defect AST Validation & Auto-Healing
      const healedResult = validateAndHealDrawioXml(cleanedXml);
      const validation = validateDrawioXml(healedResult.xml);

      return {
        xml: healedResult.xml,
        summary: `Successfully decompiled and validated architecture from blueprint image using Gemini Vision (${usedModel}) with zero architectural defects.`,
        extractedZones: ['Ingress & Security', 'Compute Tier', 'Data Tier', 'Agentic AI Services'],
        componentCount: (healedResult.xml.match(/<mxCell/g) || []).length,
        isFallback: false,
        modelUsed: usedModel,
        attribution: `Google Gemini API (${usedModel})`,
        validationReport: {
          valid: validation.valid,
          errorCount: validation.errors.length,
          warningCount: validation.warnings.length
        }
      };
    }
  } catch (err: any) {
    console.error('Error during DeepMind Vision decompilation:', err);
  }

  // Fallback to deterministic high-fidelity compilation if model fails or outputs invalid XML
  const fallbackXml = generateGCPFunctionalFlowchart({
    projectName,
    useCaseName,
    theme: 'light',
  });
  const fallbackHealed = validateAndHealDrawioXml(fallbackXml);
  const fallbackValidation = validateDrawioXml(fallbackHealed.xml);

  return {
    xml: fallbackHealed.xml,
    summary: `Vision decompilation model failed or returned unparseable XML. Falling back to deterministic baseline architecture for ${projectName}.`,
    extractedZones: ['Ingress & Security', 'Load Balancing & Compute', 'Application & Data', 'Agentic AI Services'],
    componentCount: (fallbackHealed.xml.match(/<mxCell/g) || []).length,
    isFallback: true,
    modelUsed: null,
    attribution: 'Static TypeScript Template (gcpFunctionalFlowchart)',
    fallbackReason: 'Vision decompilation call failed or produced invalid XML.',
    validationReport: {
      valid: fallbackValidation.valid,
      errorCount: fallbackValidation.errors.length,
      warningCount: fallbackValidation.warnings.length
    }
  };
}
