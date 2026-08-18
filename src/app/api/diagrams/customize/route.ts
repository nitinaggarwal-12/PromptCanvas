import { NextResponse } from 'next/server';
import { executeUnifiedDiagramPipeline } from '@/lib/unifiedDiagramEngine';
import { getDiagram } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { acquireGeminiLock, releaseGeminiLock, deriveLockKey } from '@/lib/geminiLock';
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
    const { diagramId, architectureType, prompt } = body;

    if (!architectureType) {
      return NextResponse.json({ error: 'Missing architectureType' }, { status: 400 });
    }

    let effectivePrompt = prompt;
    if (diagramId) {
      const diagram = await getDiagram(diagramId, user?.id);
      if (!diagram) {
        return NextResponse.json({ error: `Diagram with ID ${diagramId} not found or access denied` }, { status: 404 });
      }
      if (diagram.access_level === 'Viewer') {
        return NextResponse.json({ error: 'Forbidden: You have read-only access to this diagram.' }, { status: 403 });
      }
      if (!effectivePrompt) {
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
  } finally {
    releaseGeminiLock(lockKey);
  }
}
