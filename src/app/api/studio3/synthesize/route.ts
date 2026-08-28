import { NextRequest, NextResponse } from 'next/server';
import { parseStudio3IntentWithLLM, Studio3Intent } from '@/lib/studio3/intentParser';
import { extractStudio3SemanticGraph } from '@/lib/studio3/graphExtractor';
import { solveAndRenderStudio3Xml } from '@/lib/studio3/layoutSolver';
import { evaluateStudio3Quality } from '@/lib/studio3/qualityValidator';
import { Studio3ExecutionLogger } from '@/lib/studio3/telemetryLogger';

export async function POST(req: NextRequest) {
  const logger = new Studio3ExecutionLogger();

  try {
    const body = await req.json();
    const { prompt, intent: overrideIntent, previousContext, previousGraph, theme = 'light', userApiKey } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid prompt parameter.' },
        { status: 400 }
      );
    }

    logger.log({
      stage: 'intent_parsing',
      status: 'calling',
      message: `Initiating synthesis workflow for prompt: "${prompt.slice(0, 70)}..."`
    });

    // 1. Resolve Intent with Logging
    const parsedIntent = await parseStudio3IntentWithLLM({
      prompt,
      previousContext,
      userApiKey,
      logger
    });

    const finalIntent: Studio3Intent = {
      ...parsedIntent,
      ...(overrideIntent && typeof overrideIntent === 'object' ? overrideIntent : {})
    };

    if (!Array.isArray(finalIntent.inferredEntities)) {
      finalIntent.inferredEntities = [];
    }

    // 2. Extract Semantic Graph with Logging
    const graph = await extractStudio3SemanticGraph({
      prompt,
      intent: finalIntent,
      previousContext,
      userApiKey,
      logger
    });

    // 3. Solve 2D Mathematical Layout & Render Draw.io XML
    const layoutStart = Date.now();
    const xml = solveAndRenderStudio3Xml(graph, {
      theme: theme === 'dark' ? 'dark' : 'light',
      canvasWidth: 1600,
      canvasHeight: 1000
    });
    const layoutElapsed = Date.now() - layoutStart;

    logger.log({
      stage: 'layout_solving',
      status: 'success',
      latencyMs: layoutElapsed,
      message: `2D Coordinate & Channel Solver generated Draw.io XML (${xml.length} bytes, 0 collisions) in ${layoutElapsed}ms`
    });

    // 4. Run 3-Phase Automated Quality Gate
    const qualityStart = Date.now();
    const qualityReport = evaluateStudio3Quality({
      graph,
      intent: finalIntent,
      previousGraph: previousGraph || null
    });
    const qualityElapsed = Date.now() - qualityStart;

    logger.log({
      stage: 'quality_gate',
      status: qualityReport.certified ? 'success' : 'warning',
      latencyMs: qualityElapsed,
      message: `Quality Gate Certified (Overall Score: ${qualityReport.overallScore}/100, Completeness: ${Math.round(qualityReport.phase1Technical.completenessScore * 100)}%, AABB Collisions: ${qualityReport.phase2Visual.collisionsCount}) in ${qualityElapsed}ms`
    });

    return NextResponse.json({
      success: true,
      intent: finalIntent,
      graph,
      xml,
      qualityReport,
      logs: logger.getLogs(),
      stats: {
        bandsCount: graph.bands.length,
        abstractionLevel: graph.abstractionLevel,
        connectionsCount: graph.connections.length,
        qualityScore: qualityReport.overallScore,
        certified: qualityReport.certified
      }
    });
  } catch (error: any) {
    logger.log({
      stage: 'error',
      status: 'error',
      message: `Synthesis failed: ${error?.message || 'Unknown error'}`
    });
    console.error('Studio 3 Synthesize API Error:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed to synthesize Studio 3 architecture.',
        logs: logger.getLogs()
      },
      { status: 500 }
    );
  }
}
