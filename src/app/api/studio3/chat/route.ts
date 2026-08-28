import { NextRequest, NextResponse } from 'next/server';
import { parseStudio3IntentWithLLM } from '@/lib/studio3/intentParser';
import { extractStudio3SemanticGraph } from '@/lib/studio3/graphExtractor';
import { solveAndRenderStudio3Xml } from '@/lib/studio3/layoutSolver';
import { evaluateStudio3Quality } from '@/lib/studio3/qualityValidator';
import { Studio3ExecutionLogger } from '@/lib/studio3/telemetryLogger';
import { saveDiagramVersion, createDiagram } from '@/lib/db';

export async function POST(req: NextRequest) {
  const logger = new Studio3ExecutionLogger();

  try {
    const body = await req.json();
    const { messages, currentXml, previousGraph, theme = 'dark', userApiKey } = body;

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

    logger.log({
      stage: 'intent_parsing',
      status: 'calling',
      message: `Processing chat refinement turn for prompt: "${latestUserMessage.slice(0, 60)}..."`
    });

    // 1. Classify Intent in Conversational Context
    const intent = await parseStudio3IntentWithLLM({
      prompt: latestUserMessage,
      previousContext: conversationHistory,
      userApiKey,
      logger
    });

    if (!Array.isArray(intent.inferredEntities)) {
      intent.inferredEntities = [];
    }

    // 2. Synthesize Updated Graph
    const graph = await extractStudio3SemanticGraph({
      prompt: latestUserMessage,
      intent,
      previousContext: conversationHistory,
      userApiKey,
      logger
    });

    // 3. Render Updated Draw.io XML
    const layoutStart = Date.now();
    const xml = solveAndRenderStudio3Xml(graph, {
      theme: theme === 'dark' ? 'dark' : 'light'
    });
    const layoutElapsed = Date.now() - layoutStart;

    logger.log({
      stage: 'layout_solving',
      status: 'success',
      latencyMs: layoutElapsed,
      message: `Rendered Draw.io XML (${xml.length} bytes) in ${layoutElapsed}ms`
    });

    // 4. Run 3-Phase Quality Inspection
    const qualityReport = evaluateStudio3Quality({
      graph,
      intent,
      previousGraph: previousGraph || null
    });

    logger.log({
      stage: 'quality_gate',
      status: qualityReport.certified ? 'success' : 'warning',
      message: `Quality Certification: ${qualityReport.overallScore}/100`
    });

    let explanation = `I've synthesized a **${intent.abstractionLevel.toUpperCase()}** representation for "${latestUserMessage}".`;
    if (intent.actionType === 'band_expansion') {
      explanation = `Expanded the canvas into a **Multi-Band Composite Architecture**: added the top comparative matrix tier and bottom 4-stage operational ingestion pipeline.`;
    }

    // 5. Persist Version to Database
    let activeDiagramId = body.diagramId || null;
    let versionId: string | null = null;
    try {
      if (activeDiagramId) {
        const v = await saveDiagramVersion(
          activeDiagramId,
          xml,
          `Chat Turn: ${latestUserMessage.slice(0, 50)}`,
          'AI',
          latestUserMessage,
          intent?.rationale || null,
          null,
          null,
          'studio3_generative',
          JSON.stringify(graph)
        );
        versionId = v.id;
      } else {
        const dbRes = await createDiagram(
          graph?.title || 'Studio 3 First-Principles Architecture',
          xml,
          'Synthesized via Studio 3 Chat Turn',
          latestUserMessage,
          intent?.rationale || null,
          null,
          null,
          null,
          'studio3_generative',
          false
        );
        activeDiagramId = dbRes.diagram.id;
        versionId = dbRes.version?.id || null;
      }
    } catch (dbErr) {
      console.warn('DB version persistence warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      diagramId: activeDiagramId,
      versionId,
      message: explanation,
      intent,
      xml,
      graph,
      qualityReport,
      logs: logger.getLogs(),
      stats: {
        bandsCount: Array.isArray(graph?.bands) ? graph.bands.length : 1,
        abstractionLevel: graph?.abstractionLevel || intent.abstractionLevel,
        connectionsCount: Array.isArray(graph?.connections) ? graph.connections.length : 0,
        qualityScore: qualityReport.overallScore,
        certified: qualityReport.certified
      }
    });
  } catch (error: any) {
    logger.log({
      stage: 'error',
      status: 'error',
      message: `Chat turn failed: ${error?.message || 'Unknown error'}`
    });
    console.error('Studio 3 Chat API Error:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed in Studio 3 chat turn.',
        logs: logger.getLogs()
      },
      { status: 500 }
    );
  }
}
