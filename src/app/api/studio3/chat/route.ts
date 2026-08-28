import { NextRequest, NextResponse } from 'next/server';
import { parseStudio3IntentWithLLM } from '@/lib/studio3/intentParser';
import { extractStudio3SemanticGraph } from '@/lib/studio3/graphExtractor';
import { solveAndRenderStudio3Xml } from '@/lib/studio3/layoutSolver';
import { evaluateStudio3Quality } from '@/lib/studio3/qualityValidator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, currentXml, previousGraph, theme = 'light', userApiKey } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Missing messages array in chat request.' },
        { status: 400 }
      );
    }

    const latestUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';
    const conversationHistory = messages
      .map((m: any) => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n');

    // 1. Classify Intent in Conversational Context
    const intent = await parseStudio3IntentWithLLM({
      prompt: latestUserMessage,
      previousContext: conversationHistory,
      userApiKey
    });

    // 2. Synthesize Updated Graph
    const graph = await extractStudio3SemanticGraph({
      prompt: latestUserMessage,
      intent,
      previousContext: conversationHistory,
      userApiKey
    });

    // 3. Render Updated Draw.io XML
    const xml = solveAndRenderStudio3Xml(graph, {
      theme: theme === 'dark' ? 'dark' : 'light'
    });

    // 4. Run 3-Phase Quality Inspection
    const qualityReport = evaluateStudio3Quality({
      graph,
      intent,
      previousGraph: previousGraph || null
    });

    let explanation = `I've synthesized a **${intent.abstractionLevel.toUpperCase()}** representation for "${latestUserMessage}".`;
    if (intent.actionType === 'band_expansion') {
      explanation = `Expanded the canvas into a **Multi-Band Composite Architecture**: added the top comparative matrix tier and bottom 4-stage operational ingestion pipeline.`;
    }

    return NextResponse.json({
      success: true,
      message: explanation,
      intent,
      xml,
      graph,
      qualityReport
    });
  } catch (error: any) {
    console.error('Studio 3 Chat API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed in Studio 3 chat turn.' },
      { status: 500 }
    );
  }
}
