import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      archetypeId,
      projectTitle,
      projectScopePrompt,
      selectedDomain,
      slotCustomizations = {},
    } = body;

    if (!archetypeId || !projectTitle) {
      return NextResponse.json({ error: 'archetypeId and projectTitle are required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = process.env.GEMINI_PRO_MODEL_ID || process.env.GEMINI_MODEL_ID || 'gemini-2.5-flash';

    const systemPrompt = `You are a Principal Enterprise Systems Architect and Chief Solutions Architect at a Fortune 50 enterprise.
Your role is to author an authoritative, publication-ready, deeply technical, and structured ${archetypeId.toUpperCase()} (Enterprise Architecture Specification Document) tailored 100% to the user's specific project title and architectural scope prompt.

STRICT RULES:
1. Write in professional, rigorous executive markdown with clear headings (#, ##, ###), markdown tables, structured key-value bullet points, and code/JSON interface blocks.
2. DO NOT use generic filler text or placeholder phrases. Every section MUST be concretely tailored to "${projectTitle}" and the provided scope prompt.
3. If the project is about Drone Delivery, EV Charging, FinTech, Retail, IoT, etc., USE ONLY terms, protocols, and microservices relevant to that domain (e.g. 5G, ADS-B, UTM, OCPP 2.0, BESS, ISO 20022, Kafka, Spanner). NEVER include unrelated bio-pharma/clinical terms unless the project is explicitly bio-pharma.
4. Structure the document with numbered chapters (Chapter 1 to Chapter 6) that align with enterprise architecture review board (ARB) standards.
5. In each chapter where an architectural diagram is assigned, include the exact diagram reference header:
   ### 📐 Visual Diagram [N]: [Slot Title] (Template [ID])
   followed by a short mermaid overview flowchart highlighting the end-to-end data flow.
6. Include exact Non-Functional Requirements (NFRs), SLAs (99.999% uptime, <20ms latency), STRIDE threat mitigation tables, and interface contracts.`;

    const userPrompt = `Project Title: ${projectTitle}
Target Document Archetype: ${archetypeId.toUpperCase()}
Domain Category: ${selectedDomain}
Business Context & Architectural Scope:
${projectScopePrompt}

Author the full, end-to-end ${archetypeId.toUpperCase()} specification document in markdown now:`;

    const response = await generateContentWithRetry(ai, {
      model,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
      },
    });

    const generatedMarkdown = response.text || '';

    if (!generatedMarkdown || generatedMarkdown.trim().length < 100) {
      throw new Error('Gemini returned an empty or invalid document.');
    }

    return NextResponse.json({
      success: true,
      markdown: generatedMarkdown.trim(),
      model,
    });
  } catch (err: any) {
    console.error('[DocGen API] Gemini generation error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate custom document with Gemini AI' },
      { status: 500 }
    );
  }
}
