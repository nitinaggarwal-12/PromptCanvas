import { GoogleGenAI } from '@google/genai';
import { validateAndHealDrawioXml } from './xmlHealer';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from './preflightAuditEngine';
import { GEMINI_MODEL_ID } from './geminiConfig';

export interface CustomizationResult {
  xml: string;
  reasoning: string;
  businessUsecase: string;
  technicalUsecase: string;
}

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey });
}

/**
 * 🧠 Live Gemini-Powered Diagram Customizer & Semantic Architect
 * Takes a collision-free Draw.io XML template backbone and prompts Gemini to dynamically
 * rewrite all node titles, technical services, descriptions, lifelines, metadata cards,
 * and flow labels to authentically represent the user's specific prompt/domain,
 * while strictly preserving all 2D coordinates and zero-collision routing geometry.
 */
export async function customizeDiagramTemplateWithGemini(
  templateXml: string,
  userPrompt: string,
  architectureType: string = 'conceptual_diagram'
): Promise<CustomizationResult> {
  const modelName = process.env.GEMINI_MODEL_ID || 'gemini-2.5-flash';

  const systemInstruction = `You are a Principal Cloud Enterprise Architect and Draw.io Graph Compiler.

YOUR MISSION:
Take the provided baseline Draw.io XML template (which has pristine, verified 2D coordinates and zero-collision geometry) and SEMANTICALLY CUSTOMIZE ALL NODES, LABELS, TITLES, LIFELINES, AND METADATA to 100% authentically represent the user's specific architectural prompt.

USER SPECIFICATION / PROMPT:
"${userPrompt}"

ARCHITECTURE TYPE:
"${architectureType}"

CRITICAL MANDATORY RULES:
1. ZERO GEOMETRIC MUTATION:
   - Keep ALL \`x\`, \`y\`, \`width\`, \`height\`, \`sourcePoint\`, \`targetPoint\`, \`<Array as="points">\`, and \`id\` attributes EXACTLY AS THEY ARE.
   - Do NOT delete, move, or change node coordinates. The template's 2D grid is mathematically calibrated for zero collisions.

2. AUTHENTIC 1-TO-1 DOMAIN REWRITING:
   - Rewrite the \`value="..."\` attribute of EVERY single component, card, database cylinder, and step connector so that it directly models the user's prompt entities.
   - For example, if the prompt is about Indian Railways / IRCTC to Google Cloud migration:
     * Ingress: CRIS / PRS Mainframe Legacy Core, Tatkal Booking Surge Traffic Ingress, Web/Mobile App Gateway.
     * Processing: Cloud Pub/Sub High-Throughput Ticket Booking Stream, GKE Agentic Passenger Journey Cluster, Cloud Dataflow Real-Time Seat Allocation Engine.
     * Persistence: Cloud Spanner Multi-Region Active PNR & Seat Reservation Ledger, BigQuery Rail Telemetry & Passenger Analytics Lake.
     * AI & Governance: Vertex AI Agentic Multilingual Voice/Chat Booking Concierge, Looker IRCTC Railway Operations Command Tower.
   - Update the Metadata Box table:
     * Set Diagram Name to a professional title for this use case (e.g. "Indian Railways IRCTC Agentic Cloud Migration").
     * Set Persona / Creator to an authentic role (e.g. "1. Chief Railway Cloud & Agentic Architect").
     * Set Target Audience (e.g. "IRCTC Ops, Station Masters, Commuters, SREs").
     * Set Tech Stack (e.g. "GKE Autopilot, Cloud Spanner, Pub/Sub, Vertex AI, BigQuery").
     * Set Classification (e.g. "Critical National Infrastructure & High-Volume Ticketing").

3. XML ESCAPING & SYNTAX INTEGRITY:
   - All ampersands in text/HTML MUST be escaped as \`&amp;\`.
   - Never produce unclosed HTML tags inside \`value="..."\`.
   - Return valid Draw.io XML wrapped in \`\`\`xml ... \`\`\`.

4. OUTPUT FORMAT:
You must provide exactly four markdown sections:
- ### AI Architectural Plan & Reasoning
  (A concise explanation of how the architecture addresses the user's prompt, scalability, and agentic workflows)
- ### Business Use Case
  (Executive summary with Objectives, Stakeholders/Personas, Expected Value & ROI, and Core KPIs)
- ### Technical Use Case
  (Technical specification with System Execution Flow, APIs & Protocols, and Fault Tolerance/Resilience)
- ### Draw.io XML
  (The complete customized XML wrapped in \`\`\`xml ... \`\`\`)
`;

  try {
    console.log(`[Gemini Customizer] Calling ${modelName} for prompt: "${userPrompt.slice(0, 60)}"...`);
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `### Base XML Template to Customize:
\`\`\`xml
${templateXml}
\`\`\`

### Target System Prompt:
${userPrompt}`,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for precision adherence to schema
      },
    });

    const text = response.text || '';
    const parsed = parseGeminiCustomizationResponse(text, templateXml);

    // Validate and heal the customized XML to ensure 100% valid XML AST and dark mode safety
    const healed = validateAndHealDrawioXml(parsed.xml, architectureType);
    const fullyHealedXml = preflightVerifyAndHealXmlAcrossAll6Audits(healed.xml, architectureType);

    return {
      xml: fullyHealedXml,
      reasoning: parsed.reasoning || `Architected using Gemini ${modelName} strictly tailored for "${userPrompt.slice(0, 50)}".`,
      businessUsecase: parsed.businessUsecase || `Enterprise cloud architecture tailored for ${userPrompt.slice(0, 50)}.`,
      technicalUsecase: parsed.technicalUsecase || `High-availability zero-collision architecture deployed on Google Cloud.`
    };
  } catch (err: any) {
    console.error('[Gemini Customizer] Error during live AI customization:', err);
    throw err;
  }
}

function parseGeminiCustomizationResponse(text: string, fallbackXml: string): CustomizationResult {
  let reasoning = '';
  let businessUsecase = '';
  let technicalUsecase = '';
  let xml = '';

  const reasoningMatch = text.match(/###\s*AI Architectural Plan & Reasoning\s*([\s\S]*?)(?=###\s*Business Use Case|$)/i);
  if (reasoningMatch) reasoning = reasoningMatch[1].trim();

  const businessMatch = text.match(/###\s*Business Use Case\s*([\s\S]*?)(?=###\s*Technical Use Case|$)/i);
  if (businessMatch) businessUsecase = businessMatch[1].trim();

  const technicalMatch = text.match(/###\s*Technical Use Case\s*([\s\S]*?)(?=###\s*Draw\.io XML|$)/i);
  if (technicalMatch) technicalUsecase = technicalMatch[1].trim();

  const xmlMatch = text.match(/```(?:xml)?\s*([\s\S]*?)\s*```/);
  if (xmlMatch && xmlMatch[1].includes('<mxfile') && xmlMatch[1].includes('</mxfile>')) {
    xml = xmlMatch[1].trim();
  } else if (text.includes('<mxfile') && text.includes('</mxfile>')) {
    const start = text.indexOf('<mxfile');
    const end = text.lastIndexOf('</mxfile>') + '</mxfile>'.length;
    xml = text.substring(start, end).trim();
  } else {
    console.warn('[Gemini Customizer] No valid XML block found in response, using fallback XML');
    xml = fallbackXml;
  }

  return { xml, reasoning, businessUsecase, technicalUsecase };
}
