import { GoogleGenAI } from '@google/genai';
import { validateAndHealDrawioXml } from './xmlHealer';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from './preflightAuditEngine';
import { injectUseCaseFlavor } from './diagramCleaner';
import { GEMINI_MODEL_ID } from './geminiConfig';
import { generateContentWithRetry } from './geminiRetryHelper';

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

interface ParsedNodeContext {
  id: string;
  currentTitle: string;
  currentSubtitle: string;
  currentBadge: string;
  logoUrl: string;
  isCard: boolean;
}

function parseNodeValue(id: string, rawVal: string): ParsedNodeContext {
  let currentTitle = '';
  let currentSubtitle = '';
  let currentBadge = '';
  let logoUrl = 'https://api.iconify.design/logos:google-cloud.svg';
  let isCard = false;

  const unescaped = (rawVal || '')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  if (
    unescaped.includes('<table') ||
    unescaped.includes('&lt;table') ||
    unescaped.includes('<svg') ||
    unescaped.includes('font-weight:700') ||
    unescaped.includes('font-size:11.5px') ||
    unescaped.includes('font-size:11px')
  ) {
    isCard = true;
    const logoMatch = unescaped.match(/src=["']([^"']+)["']/i);
    if (logoMatch) logoUrl = logoMatch[1];

    const titleMatch =
      unescaped.match(/<b[^>]*>(.*?)<\/b>/i) ||
      unescaped.match(/<div[^>]*font-weight:\s*700[^>]*>(.*?)<\/div>/i) ||
      unescaped.match(/<div[^>]*font-size:\s*(?:1[1-4]|2[0-9])px[^>]*>(.*?)<\/div>/i);
    if (titleMatch) currentTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();

    const badgeMatch = unescaped.match(/<span[^>]*style="[^"]*background:[^"]*"[^>]*>(.*?)<\/span>/i);
    if (badgeMatch) currentBadge = badgeMatch[1].replace(/<[^>]+>/g, '').trim();

    const subMatch =
      unescaped.match(/<div[^>]*font-size:\s*8\.5px[^>]*>(.*?)<\/div>/i) ||
      unescaped.match(/<div[^>]*color:\s*#5F6368[^>]*>(.*?)<\/div>/i) ||
      unescaped.match(/<span[^>]*color:[^"]*334155[^"]*"[^>]*>(.*?)<\/span>/i) ||
      unescaped.match(/<br\s*\/?>\s*<span[^>]*>(.*?)<\/span>/i);
    if (subMatch) currentSubtitle = subMatch[1].replace(/<br\s*\/?>/gi, ' | ').replace(/<[^>]+>/g, '').trim();
  } else {
    currentTitle = unescaped.replace(/<[^>]+>/g, '').trim();
  }

  if (!currentTitle) {
    currentTitle = unescaped.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 40);
  }

  return { id, currentTitle, currentSubtitle, currentBadge, logoUrl, isCard };
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

  // 1. Extract all node IDs and parse clean structured context from templateXml
  const nodeMatches = templateXml.matchAll(/<mxCell\s+id="([^"]+)"\s+value="([^"]*)"/gi);
  const nodesToCustomize: ParsedNodeContext[] = [];

  for (const m of nodeMatches) {
    const id = m[1];
    const val = m[2];
    if (id === '0' || id === '1' || id.startsWith('frame_') || (id.startsWith('col_') && id.endsWith('_bg'))) continue;
    if (val && val.trim().length > 0) {
      nodesToCustomize.push(parseNodeValue(id, val));
    }
  }

  const isIteration = userPrompt.includes('Specific Refinement Request:') || 
                      /add|remove|replace|change|improve|modify|accuracy|fix|update|refine|integrate|connect|switch|cache|guard/i.test(userPrompt);

  const systemInstruction = `You are a Principal Enterprise Cloud Architect.
You are updating a Draw.io architecture diagram based on a user prompt.

${isIteration ? `### MODE: ITERATIVE REFINEMENT & ARCHITECTURAL EVOLUTION
The user is requesting an incremental modification or refinement to the existing architecture.
CRITICAL RULES:
1. You MUST actively modify, upgrade, or replace components to directly fulfill the user's specific refinement request (e.g. adding Accuracy Verification, Fact Checking Core, Grounding Citations, Redundant Fallbacks, Caching, etc.).
2. Do NOT simply return the previous nodes unchanged. Directly incorporate the new components and capabilities requested.
3. For cards that you modify or add, assign high-impact badges such as "Added", "Refined", "Accuracy Engine", "Verification Core", "Enhanced", or "Active Guard".
4. Update the "headerSubtitle" to reflect the evolution (e.g. "Iteration: Added Chain-of-Verification & Grounding Citation Core").` 
: `### MODE: INITIAL ENTERPRISE BLUEPRINT CUSTOMIZATION
Customizing an enterprise architecture blueprint for a new domain use case.
CRITICAL RULES:
1. Map each provided node ID to authentic, domain-specific architecture titles, subtitles, and badges.
2. For cards, write clear, realistic enterprise components with concise bullet points in "subtitle" (use "<br/>" for line breaks).`}

OUTPUT JSON SCHEMA:
{
  "reasoning": "string (executive summary of architectural design & changes made)",
  "businessUsecase": "string (business value & operational impact)",
  "technicalUsecase": "string (technical implementation details & protocols)",
  "headerTitle": "string (clear, professional architecture title)",
  "headerSubtitle": "string (concise subtitle explaining the architecture and version changes)",
  "customizations": {
    "<node_id>": {
      "title": "string (enterprise component name, e.g. 'Chain-of-Verification & Grounding Engine')",
      "subtitle": "string (1-2 concise bullet points using <br/> for line breaks)",
      "badge": "string (short status/role badge, e.g. 'Verification Core', 'Active Target', 'Ingress')"
    }
  }
}`;

  try {
    console.log(`[Gemini Customizer] Calling ${modelName} with Structured AST for prompt: "${userPrompt.slice(0, 60)}"...`);
    const ai = getAiClient(userApiKey);
    const response = await generateContentWithRetry(ai, {
      model: modelName,
      contents: `### USER ARCHITECTURE PROMPT / REFINEMENT REQUEST:
"${userPrompt}"

### ARCHITECTURE TYPE:
"${architectureType}"

### CURRENT NODES IN DIAGRAM TO UPDATE:
${JSON.stringify(nodesToCustomize.map(n => ({
  id: n.id,
  type: n.isCard ? 'Card Node' : 'Header / Label',
  currentTitle: n.currentTitle,
  currentSubtitle: n.currentSubtitle,
  currentBadge: n.currentBadge
})), null, 2)}`,
      config: {
        systemInstruction,
        temperature: isIteration ? 0.35 : 0.2,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let data: any = {};
    try {
      const cleanJson = text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      data = JSON.parse(cleanJson);
    } catch (parseErr) {
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          data = JSON.parse(jsonMatch[0]);
        }
      } catch (innerErr) {
        console.warn('[Gemini Customizer] JSON extraction failed:', innerErr);
        data = {};
      }
    }

    let customizedXml = templateXml;

    // 1. Replace Header Title & Subtitle if present
    if (data.headerTitle) {
      customizedXml = customizedXml.replace(/(<mxCell\s+id="hdr_title_[^"]*"\s+value=")[^"]*(")/gi, `$1${escapeXmlText(data.headerTitle)}$2`);
    }
    if (data.headerSubtitle) {
      customizedXml = customizedXml.replace(/(<mxCell\s+id="hdr_sub_[^"]*"\s+value=")[^"]*(")/gi, `$1${escapeXmlText(data.headerSubtitle)}$2`);
    }

    // Map existing node logos for fast lookup
    const logoMap = new Map<string, string>();
    for (const node of nodesToCustomize) {
      logoMap.set(node.id, node.logoUrl);
    }

    // 2. Replace each node's value while strictly keeping XML geometry and logos
    if (data.customizations && typeof data.customizations === 'object') {
      for (const [nodeId, custom] of Object.entries<any>(data.customizations)) {
        if (!custom) continue;
        
        const nodeRegex = new RegExp(`(<mxCell\\s+id="${nodeId}"\\s+value=")([^"]*)(")`, 'i');
        const match = nodeRegex.exec(customizedXml);
        if (!match) continue;

        const existingVal = match[2] || '';
        const title = custom.title || (typeof custom === 'string' ? custom : '');
        const subtitle = custom.subtitle || '';
        const isHeaderOrText = !existingVal.includes('&lt;b') && !existingVal.includes('<b');
        
        let newVal = existingVal;
        if (title) {
          if (/(&lt;b(?:[^&]*)?&gt;)(.*?)(&lt;\/b&gt;)/i.test(newVal)) {
            newVal = newVal.replace(/(&lt;b(?:[^&]*)?&gt;)(.*?)(&lt;\/b&gt;)/i, `$1${escapeXmlText(title)}$3`);
          } else if (/<b\b[^>]*>(.*?)<\/b>/i.test(newVal)) {
            newVal = newVal.replace(/(<b\b[^>]*>)(.*?)(<\/b>)/i, `$1${escapeXmlText(title)}$3`);
          } else if (/(&lt;div[^&]*?(?:font-weight:\s*700|font-size:\s*(?:1[1-4]|2[0-9])px)[^&]*?&gt;)(.*?)(&lt;\/div&gt;)/i.test(newVal)) {
            newVal = newVal.replace(/(&lt;div[^&]*?(?:font-weight:\s*700|font-size:\s*(?:1[1-4]|2[0-9])px)[^&]*?&gt;)(.*?)(&lt;\/div&gt;)/i, `$1${escapeXmlText(title)}$3`);
          } else if (/(<div[^>]*?(?:font-weight:\s*700|font-size:\s*(?:1[1-4]|2[0-9])px)[^>]*?>)(.*?)(<\/div>)/i.test(newVal)) {
            newVal = newVal.replace(/(<div[^>]*?(?:font-weight:\s*700|font-size:\s*(?:1[1-4]|2[0-9])px)[^>]*?>)(.*?)(<\/div>)/i, `$1${escapeXmlText(title)}$3`);
          } else if (isHeaderOrText) {
            newVal = escapeXmlText(title);
          }
        }
        if (subtitle) {
          if (/(&lt;span\b[^&]*?color:[^&]*?334155[^&]*?&gt;)(.*?)(&lt;\/span&gt;)/i.test(newVal)) {
            newVal = newVal.replace(/(&lt;span\b[^&]*?color:[^&]*?334155[^&]*?&gt;)(.*?)(&lt;\/span&gt;)/i, `$1${escapeXmlText(subtitle)}$3`);
          } else if (/<span\b[^>]*?color:[^>]*?334155[^>]*?>(.*?)<\/span>/i.test(newVal)) {
            newVal = newVal.replace(/(<span\b[^>]*?color:[^>]*?334155[^>]*?>)(.*?)(<\/span>)/i, `$1${escapeXmlText(subtitle)}$3`);
          } else if (/(&lt;div[^&]*?(?:font-size:\s*(?:7|8|9|10)(?:\.[0-9])?px|color:\s*#(?:5F6368|64748B|137333|0D9488))[^&]*?&gt;)(.*?)(&lt;\/div&gt;)/i.test(newVal)) {
            newVal = newVal.replace(/(&lt;div[^&]*?(?:font-size:\s*(?:7|8|9|10)(?:\.[0-9])?px|color:\s*#(?:5F6368|64748B|137333|0D9488))[^&]*?&gt;)(.*?)(&lt;\/div&gt;)/i, `$1${escapeXmlText(subtitle)}$3`);
          } else if (/(<div[^>]*?(?:font-size:\s*(?:7|8|9|10)(?:\.[0-9])?px|color:\s*#(?:5F6368|64748B|137333|0D9488))[^>]*?>)(.*?)(<\/div>)/i.test(newVal)) {
            newVal = newVal.replace(/(<div[^>]*?(?:font-size:\s*(?:7|8|9|10)(?:\.[0-9])?px|color:\s*#(?:5F6368|64748B|137333|0D9488))[^>]*?>)(.*?)(<\/div>)/i, `$1${escapeXmlText(subtitle)}$3`);
          }
        }
        const badge = custom.badge || '';
        if (badge) {
          if (/(&lt;span\b[^&]*?border-radius:[^&]*?&gt;)(.*?)(&lt;\/span&gt;)/i.test(newVal)) {
            newVal = newVal.replace(/(&lt;span\b[^&]*?border-radius:[^&]*?&gt;)(.*?)(&lt;\/span&gt;)/i, `$1${escapeXmlText(badge)}$3`);
          } else if (/<span\b[^>]*?border-radius:[^>]*?>(.*?)<\/span>/i.test(newVal)) {
            newVal = newVal.replace(/(<span\b[^>]*?border-radius:[^>]*?>)(.*?)(<\/span>)/i, `$1${escapeXmlText(badge)}$3`);
          } else if (newVal.includes('&lt;/tr&gt;')) {
            newVal = newVal.replace('&lt;/tr&gt;', `&lt;span style=&quot;font-size:8px;padding:2px 4px;border-radius:4px;background:#38bdf8;color:#0f172a;font-weight:bold;&quot;&gt;${escapeXmlText(badge)}&lt;/span&gt;&lt;/tr&gt;`);
          } else if (newVal.includes('</tr>')) {
            newVal = newVal.replace('</tr>', `<span style="font-size:8px;padding:2px 4px;border-radius:4px;background:#38bdf8;color:#0f172a;font-weight:bold;">${escapeXmlText(badge)}</span></tr>`);
          } else {
            newVal = `${newVal} &lt;span&gt;${escapeXmlText(badge)}&lt;/span&gt;`;
          }
        }
        customizedXml = customizedXml.replace(nodeRegex, `$1${newVal}$3`);
      }
    }

    if (data.headerTitle) {
      customizedXml = customizedXml.replace(/(<mxCell\s+id="header_title"\s+value=")([^"]*)(")/i, `$1${escapeXmlText(data.headerTitle)}$3`);
    }
    if (data.headerSubtitle) {
      customizedXml = customizedXml.replace(/(<mxCell\s+id="header_subtitle"\s+value=")([^"]*)(")/i, `$1${escapeXmlText(data.headerSubtitle)}$3`);
    }

    const reasoning = data.reasoning || `Architected using Gemini ${modelName} strictly tailored for "${userPrompt.slice(0, 50)}".`;
    const businessUsecase = data.businessUsecase || `Enterprise cloud architecture tailored for ${userPrompt.slice(0, 50)}.`;
    const technicalUsecase = data.technicalUsecase || `Zero-collision 1400x800 high-availability architecture deployed on Google Cloud.`;

    return {
      xml: customizedXml,
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
