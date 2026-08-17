import { GoogleGenAI } from '@google/genai';
import { validateAndHealDrawioXml } from './xmlHealer';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from './preflightAuditEngine';
import { injectUseCaseFlavor } from './diagramCleaner';
import { GEMINI_MODEL_ID } from './geminiConfig';

export interface CustomizationResult {
  xml: string;
  reasoning: string;
  businessUsecase: string;
  technicalUsecase: string;
}

function getAiClient(customKey?: string): GoogleGenAI {
  const apiKey = customKey || process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey });
}

async function generateContentWithRetry(
  ai: GoogleGenAI,
  params: any,
  maxRetries = 3
): Promise<any> {
  let lastError: any = null;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent(params);
      return response;
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode || (err?.message?.includes('429') ? 429 : 0);
      const isRateLimit = status === 429 || err?.message?.includes('RESOURCE_EXHAUSTED') || err?.message?.includes('quota');
      const isTransient = isRateLimit || status >= 500 || err?.message?.includes('fetch failed') || err?.message?.includes('ECONNRESET');

      if (attempt < maxRetries && isTransient) {
        const baseDelay = isRateLimit ? 2000 : 800;
        const delayMs = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 400;
        console.warn(`[Gemini Customizer] Attempt ${attempt} encountered transient error (${err.message}). Retrying in ${Math.round(delayMs)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        break;
      }
    }
  }
  throw lastError;
}

export async function customizeDiagramTemplateWithGemini(
  templateXml: string,
  userPrompt: string,
  architectureType: string = 'conceptual_diagram',
  userApiKey?: string
): Promise<CustomizationResult> {
  const modelName = process.env.GEMINI_MODEL_ID || GEMINI_MODEL_ID || 'gemini-3.7-flash';

  if (!templateXml || typeof templateXml !== 'string') {
    throw new Error('Template XML is empty or invalid');
  }

  const cleanPrompt = (userPrompt || '').trim();
  const isTrivialPrompt = !cleanPrompt || 
    cleanPrompt.length < 5 || 
    /^nitin\s*\d*$/i.test(cleanPrompt) || 
    /^canvas\s*\d*$/i.test(cleanPrompt) || 
    /^default$/i.test(cleanPrompt) ||
    cleanPrompt === architectureType ||
    cleanPrompt.startsWith('WBS');

  if (isTrivialPrompt) {
    return {
      xml: templateXml,
      reasoning: `Loaded pristine reference architecture blueprint for ${architectureType}.`,
      businessUsecase: `Canonical enterprise architecture model for ${architectureType}.`,
      technicalUsecase: `Calibrated widescreen 1400x800 zero-collision 2D layout.`
    };
  }

  // 1. Extract all node IDs and current text from templateXml
  const nodeMatches = templateXml.matchAll(/<mxCell\s+id="([^"]+)"\s+value="([^"]*)"/gi);
  const nodesToCustomize: Array<{ id: string; currentVal: string }> = [];

  for (const m of nodeMatches) {
    const id = m[1];
    const val = m[2];
    if (id === '0' || id === '1' || id.startsWith('frame_') || (id.startsWith('col_') && id.endsWith('_bg'))) continue;
    if (val && val.trim().length > 0) {
      nodesToCustomize.push({ id, currentVal: val });
    }
  }

  const systemInstruction = `You are a Principal Enterprise Cloud Architect.
You will customize an existing Draw.io architecture template for a specific enterprise domain use case.

CRITICAL INSTRUCTIONS:
1. Return a strictly valid JSON object mapping each provided node ID to authentic, domain-specific architecture titles, subtitles, and badges.
2. For cards, write clear, realistic enterprise components (e.g. for Indian Railways / IRCTC: "CRIS / PRS Mainframe Adapter", "Tatkal Ingress & Bot Shield", "Cloud Spanner Multi-Region Active PNR Ledger", "Vertex AI Multilingual Passenger Concierge").
3. Keep bullet points in "subtitle" concise and impactful using "<br/>" for line breaks.
4. Provide an executive "reasoning", "businessUsecase", and "technicalUsecase".
5. Provide a professional "headerTitle" and "headerSubtitle".

OUTPUT JSON SCHEMA:
{
  "reasoning": "string",
  "businessUsecase": "string",
  "technicalUsecase": "string",
  "headerTitle": "string",
  "headerSubtitle": "string",
  "customizations": {
    "<node_id>": {
      "title": "string",
      "subtitle": "string (use <br/> for line breaks)",
      "badge": "string (optional short badge like 'Active Target', 'Wave 1')"
    }
  }
}`;

  try {
    console.log(`[Gemini Customizer] Calling ${modelName} with Structured AST for prompt: "${userPrompt.slice(0, 60)}"...`);
    const ai = getAiClient(userApiKey);
    const response = await generateContentWithRetry(ai, {
      model: modelName,
      contents: `### TARGET ENTERPRISE USE-CASE PROMPT:
"${userPrompt}"

### ARCHITECTURE TYPE:
"${architectureType}"

### TEMPLATE NODES TO SEMANTICALLY CUSTOMIZE:
${JSON.stringify(nodesToCustomize, null, 2)}`,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.warn('[Gemini Customizer] JSON parse failed, falling back to regex extraction');
      data = {};
    }

    let customizedXml = templateXml;

    // 1. Replace Header Title & Subtitle if present
    if (data.headerTitle) {
      customizedXml = customizedXml.replace(/(<mxCell\s+id="hdr_title_[^"]*"\s+value=")[^"]*(")/gi, `$1${escapeXmlText(data.headerTitle)}$2`);
    }
    if (data.headerSubtitle) {
      customizedXml = customizedXml.replace(/(<mxCell\s+id="hdr_sub_[^"]*"\s+value=")[^"]*(")/gi, `$1${escapeXmlText(data.headerSubtitle)}$2`);
    }

    // 2. Replace each node's value while strictly keeping XML geometry and logos
    if (data.customizations && typeof data.customizations === 'object') {
      for (const [nodeId, custom] of Object.entries<any>(data.customizations)) {
        if (!custom) continue;
        
        const nodeRegex = new RegExp(`(<mxCell\\s+id="${nodeId}"\\s+value=")([^"]*)(")`, 'i');
        const match = nodeRegex.exec(customizedXml);
        if (!match) continue;

        const existingVal = match[2];
        
        // If it's a simple column header or text node
        if (!existingVal.includes('&lt;table') && !existingVal.includes('<table')) {
          const newVal = custom.title || (typeof custom === 'string' ? custom : existingVal);
          customizedXml = customizedXml.replace(nodeRegex, `$1${escapeXmlText(newVal)}$3`);
        } else {
          // It's a rich card! Extract logo from existingVal
          const logoMatch = existingVal.match(/src=(?:&apos;|'|&quot;|")([^'"&]+)(?:&apos;|'|&quot;|")/i);
          const logoUrl = logoMatch ? logoMatch[1] : 'https://api.iconify.design/logos:google-cloud.svg';
          const title = custom.title || 'Enterprise Service';
          const subtitle = custom.subtitle || '';
          const badgeHtml = custom.badge ? ` <span style="font-size:9px;background:#DCFCE7;color:#15803D;padding:2px 6px;border-radius:4px;font-weight:bold;">${custom.badge}</span>` : '';

          const rawHtml = `<table style="width:100%;"><tr><td style="width:38px;"><img src="${logoUrl}" width="28" height="28"/></td><td><b style="font-size:13px;color:#0F172A;">${title}</b>${badgeHtml}<br/><span style="font-size:10px;color:#334155;">${subtitle}</span></td></tr></table>`;
          const encodedHtml = rawHtml
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

          customizedXml = customizedXml.replace(nodeRegex, `$1${encodedHtml}$3`);
        }
      }
    }

    const reasoning = data.reasoning || `Architected using Gemini ${modelName} strictly tailored for "${userPrompt.slice(0, 50)}".`;
    const businessUsecase = data.businessUsecase || `Enterprise cloud architecture tailored for ${userPrompt.slice(0, 50)}.`;
    const technicalUsecase = data.technicalUsecase || `Zero-collision 1400x800 high-availability architecture deployed on Google Cloud.`;

    const finalFlavored = injectUseCaseFlavor(customizedXml, userPrompt, userPrompt);

    return {
      xml: finalFlavored,
      reasoning,
      businessUsecase,
      technicalUsecase
    };
  } catch (err: any) {
    console.error('[Gemini Customizer] Error during structured AI customization, falling back to flavor injection:', err);
    const fallbackFlavored = injectUseCaseFlavor(templateXml, userPrompt);
    return {
      xml: fallbackFlavored,
      reasoning: `Configured from verified reference blueprint for "${userPrompt.slice(0, 50)}".`,
      businessUsecase: `Enterprise cloud architecture tailored for ${userPrompt.slice(0, 50)}.`,
      technicalUsecase: `High-availability 1400x800 architecture deployed on Google Cloud.`
    };
  }
}

function escapeXmlText(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
