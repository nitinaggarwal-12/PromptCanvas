import { NextRequest, NextResponse } from 'next/server';
import { parseStudio3IntentWithLLM, Studio3Intent } from '@/lib/studio3/intentParser';
import { extractStudio3SemanticGraph } from '@/lib/studio3/graphExtractor';
import { solveAndRenderStudio3Xml } from '@/lib/studio3/layoutSolver';
import { evaluateStudio3Quality } from '@/lib/studio3/qualityValidator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, intent: overrideIntent, previousContext, previousGraph, theme = 'light', userApiKey } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid prompt parameter.' },
        { status: 400 }
      );
    }

    // 1. Resolve Intent & Abstraction Level
    let finalIntent: Studio3Intent = overrideIntent;
    if (!finalIntent) {
      finalIntent = await parseStudio3IntentWithLLM({
        prompt,
        previousContext,
        userApiKey
      });
    }

    // 2. Extract Semantic Graph from First Principles (Zero Predefined Blueprints)
    const graph = await extractStudio3SemanticGraph({
      prompt,
      intent: finalIntent,
      previousContext,
      userApiKey
    });

    // 3. Solve 2D Mathematical Layout & Render Draw.io XML
    const xml = solveAndRenderStudio3Xml(graph, {
      theme: theme === 'dark' ? 'dark' : 'light',
      canvasWidth: 1600,
      canvasHeight: 1000
    });

    // 4. Run 3-Phase Automated Quality Gate
    const qualityReport = evaluateStudio3Quality({
      graph,
      intent: finalIntent,
      previousGraph: previousGraph || null
    });

    return NextResponse.json({
      success: true,
      intent: finalIntent,
      graph,
      xml,
      qualityReport,
      stats: {
        bandsCount: graph.bands.length,
        abstractionLevel: graph.abstractionLevel,
        connectionsCount: graph.connections.length,
        qualityScore: qualityReport.overallScore,
        certified: qualityReport.certified
      }
    });
  } catch (error: any) {
    console.error('Studio 3 Synthesize API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to synthesize Studio 3 architecture.' },
      { status: 500 }
    );
  }
}
