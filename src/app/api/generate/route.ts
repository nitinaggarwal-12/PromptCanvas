import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { acquireGeminiLock, releaseGeminiLock, deriveLockKey } from '@/lib/geminiLock';
import { executeUnifiedDiagramPipeline } from '@/lib/unifiedDiagramEngine';
import { isLayoutEngineV2Enabled } from '@/lib/featureFlags';
import { classifyIntent } from '@/lib/router/intentClassifier';
import { runV2Pipeline, runV2EditPipeline } from '@/lib/pipeline/v2Pipeline';
import { GEMINI_MODEL_ID } from '@/lib/geminiConfig';
import { createDiagram, saveDiagramVersion, getLatestDiagramVersion, updateDiagramArchitectureType } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  const clientIp = rawIp.split(',')[0]?.trim() || '';
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('promptcanvas_session')?.value;
  const lockKey = deriveLockKey(user?.id, clientIp, sessionId);

  const contentLength = Number(request.headers.get('content-length') || '0');
  if (contentLength > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: 'Payload too large: Request body must not exceed 5MB.' },
      { status: 413 }
    );
  }

  if (!acquireGeminiLock(lockKey)) {
    return NextResponse.json(
      { error: 'An AI request is already in progress. Please wait for it to complete before initiating another.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const prompt = body.prompt;
    const diagramId = body.diagramId || body.diagram_id;
    const name = body.name;
    const architectureType = body.architectureType || body.architecture_type;
    const existingXml = body.existingXml || body.existing_xml;
    const isPrivate = body.isPrivate ?? body.is_private;
    const phaseName = body.phaseName || body.phase_name;
    const domain = body.domain;
    const abstractionLevel = body.abstractionLevel || body.abstraction_level;
    const stackLayer = body.stackLayer || body.stack_layer;
    const layoutDirection = body.layoutDirection || body.layout_direction;
    const salesStage = body.salesStage || body.sales_stage;
    const lifecyclePhase = body.lifecyclePhase || body.lifecycle_phase;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "prompt" is required and must be a string' },
        { status: 400 }
      );
    }

    const isV2 = isLayoutEngineV2Enabled(body, request.url, request.headers);

    if (isV2) {
      if (diagramId) {
        const latest = await getLatestDiagramVersion(diagramId, architectureType);
        if (latest?.architecture_type === 'v2_freeform' && latest?.graph_json) {
          try {
            const prevGraph = JSON.parse(latest.graph_json);
            const v2Result = await runV2EditPipeline(prevGraph, prompt, GEMINI_MODEL_ID);
            const comment = `AI Refined: "${prompt.slice(0, 40)}${prompt.length > 40 ? '...' : ''}"`;
            const reasoning = v2Result.graph?.narrative?.reasoning || 'Refined architecture components with continuous flow.';
            const businessUsecase = v2Result.graph?.narrative?.businessUsecase || 'Refined functional architecture and domain services.';
            const technicalUsecase = v2Result.graph?.narrative?.technicalUsecase || 'Updated layout topology and service connectors.';
            const version = await saveDiagramVersion(
              diagramId,
              v2Result.xml,
              comment,
              'AI-V2',
              prompt,
              reasoning,
              businessUsecase,
              technicalUsecase,
              'v2_freeform',
              JSON.stringify(v2Result.graph)
            );
            return NextResponse.json({
              version,
              refreshed: true,
              isStale: false,
              xml: v2Result.xml,
              reasoning,
              businessUsecase,
              technicalUsecase,
              graph: v2Result.graph,
              telemetry: v2Result.telemetry
            });
          } catch (editErr) {
            console.warn('[V2 Edit Pipeline Fallback] Error editing freeform graph, falling back to unified engine:', editErr);
          }
        }
      } else if (!architectureType || architectureType === 'blank_canvas' || architectureType === 'arch_blank_canvas') {
        const promptLower = prompt.toLowerCase();
        const hasExplicitTemplateKeyword =
          /entity relationship diagram|\berd\b|sequence diagram|system context|c4 context|c4 container|data pipeline|zero trust/i.test(promptLower);

        if (!hasExplicitTemplateKeyword) {
          const classification = await classifyIntent(prompt);
          if (classification) {
            if (classification.confidence < 0.6) {
              return NextResponse.json({
                needsDisambiguation: true,
                suggestedTypes: classification.alternativeTypes,
                reasoning: classification.reasoning
              }, { status: 200 });
            }

            if (classification.confidence >= 0.8 && classification.selectedType) {
              const result = await executeUnifiedDiagramPipeline({
                prompt,
                diagramId,
                architectureType: classification.selectedType,
                name,
                existingXml,
                isPrivate: isPrivate,
                userId: user?.id || null
              });

              return NextResponse.json({
                diagram: result.diagram,
                version: result.version,
                xml: result.xml,
                reasoning: result.reasoning,
                businessUsecase: result.businessUsecase,
                technicalUsecase: result.technicalUsecase,
                classifiedType: classification.selectedType,
                assumptions: classification.assumptions
              }, { status: 201 });
            }
          }

          // Freeform prompt with LayoutEngineV2 -> run V2 Pipeline
          const v2Result = await runV2Pipeline(prompt, GEMINI_MODEL_ID);
          const diagramName = name || (prompt.length > 45 ? `${prompt.slice(0, 40)}...` : prompt);
          const reasoning = v2Result.graph?.narrative?.reasoning || 'Automated multi-tier cloud topology generation.';
          const businessUsecase = v2Result.graph?.narrative?.businessUsecase || 'Enterprise workload orchestration and service boundaries.';
          const technicalUsecase = v2Result.graph?.narrative?.technicalUsecase || 'Microservices, data persistence, and security controls.';

          const { diagram, version } = await createDiagram(
            diagramName,
            v2Result.xml,
            `V2 AI Generated: "${prompt.slice(0, 40)}"`,
            prompt,
            reasoning,
            businessUsecase,
            technicalUsecase,
            user?.id || null,
            'v2_freeform',
            Boolean(isPrivate)
          );

          return NextResponse.json({
            diagram,
            version,
            xml: v2Result.xml,
            reasoning,
            businessUsecase,
            technicalUsecase,
            graph: v2Result.graph,
            telemetry: v2Result.telemetry
          }, { status: 201 });
        }
      }
    }

    const result = await executeUnifiedDiagramPipeline({
      prompt,
      diagramId,
      architectureType,
      name,
      existingXml,
      isPrivate: isPrivate,
      userId: user?.id || null,
      phaseName,
      domain,
      abstractionLevel,
      stackLayer,
      layoutDirection,
      salesStage,
      lifecyclePhase
    });

    if (diagramId) {
      return NextResponse.json({ 
        version: result.version, 
        refreshed: true, 
        isStale: false,
        xml: result.xml,
        reasoning: result.reasoning,
        businessUsecase: result.businessUsecase,
        technicalUsecase: result.technicalUsecase
      });
    }

    return NextResponse.json({
      diagram: result.diagram,
      version: result.version,
      xml: result.xml,
      reasoning: result.reasoning,
      businessUsecase: result.businessUsecase,
      technicalUsecase: result.technicalUsecase
    }, { status: 201 });
  } catch (error) {
    console.error('Unified Diagram Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate diagram', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    releaseGeminiLock(lockKey);
  }
}

