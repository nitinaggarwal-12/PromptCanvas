import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { acquireGeminiLock, releaseGeminiLock } from '@/lib/geminiLock';
import { executeUnifiedDiagramPipeline } from '@/lib/unifiedDiagramEngine';

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  const lockKey = user?.id || 'anonymous_global';

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

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "prompt" is required and must be a string' },
        { status: 400 }
      );
    }

    const result = await executeUnifiedDiagramPipeline({
      prompt,
      diagramId,
      architectureType,
      name,
      existingXml,
      isPrivate: isPrivate,
      userId: user?.id || null
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
