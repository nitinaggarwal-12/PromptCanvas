import { NextResponse } from 'next/server';
import { executeUnifiedDiagramPipeline } from '@/lib/unifiedDiagramEngine';
import { getDiagram } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { diagramId, architectureType, prompt } = body;

    if (!architectureType) {
      return NextResponse.json({ error: 'Missing architectureType' }, { status: 400 });
    }

    let effectivePrompt = prompt;
    if (!effectivePrompt && diagramId) {
      const diagram = await getDiagram(diagramId, user?.id);
      if (diagram) {
        const dAny = diagram as any;
        effectivePrompt = dAny.prompt || diagram.name || dAny.business_usecase || dAny.technical_usecase;
      }
    }

    if (!effectivePrompt) {
      effectivePrompt = architectureType;
    }

    const result = await executeUnifiedDiagramPipeline({
      prompt: effectivePrompt,
      diagramId,
      architectureType,
      userId: user?.id || null
    });

    return NextResponse.json({
      success: true,
      architectureType: result.architectureType,
      xml: result.xml,
      reasoning: result.reasoning,
      businessUsecase: result.businessUsecase,
      technicalUsecase: result.technicalUsecase,
      version: result.version
    });
  } catch (error) {
    console.error('Failed to customize diagram architecture:', error);
    return NextResponse.json(
      { error: 'Failed to customize architecture', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
