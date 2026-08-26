import { NextResponse } from 'next/server';
import { listDiagrams, createDiagram, clearAllDiagrams } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';

// GET /api/diagrams - List diagrams (user-scoped or public seed)
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const diagrams = await listDiagrams(user?.id);
    return NextResponse.json(diagrams, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  } catch (error) {
    console.error('Failed to list diagrams:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST /api/diagrams - Create a new diagram attached to authenticated user
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const name = body.name;
    const xml = body.xml;
    const comment = body.comment;
    const prompt = body.prompt;
    const aiReasoning = body.aiReasoning || body.ai_reasoning;
    const businessUsecase = body.businessUsecase || body.business_usecase;
    const technicalUsecase = body.technicalUsecase || body.technical_usecase;
    const architectureType = body.architectureType || body.architecture_type;
    const isPrivate = body.isPrivate ?? body.is_private;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "name" is required and must be a string' },
        { status: 400 }
      );
    }

    const effectiveArchType = architectureType || 'unified_system_view';
    const effectiveXml = xml !== undefined ? xml : (getDefaultXmlForArchitecture(effectiveArchType, businessUsecase || prompt || name, prompt || name) || undefined);

    const { diagram, version } = await createDiagram(
      name,
      effectiveXml,
      comment || 'Initial version',
      prompt,
      aiReasoning,
      businessUsecase,
      technicalUsecase,
      user?.id || null,
      effectiveArchType,
      Boolean(isPrivate)
    );

    return NextResponse.json({ diagram, version }, { status: 201 });
  } catch (error) {
    console.error('Failed to create diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/diagrams - Clear/purge previous legacy diagrams and start fresh
export async function DELETE() {
  try {
    const user = await getAuthenticatedUser();
    await clearAllDiagrams(user?.id);
    return NextResponse.json({ success: true, message: 'All diagram history cleared successfully' });
  } catch (error) {
    console.error('Failed to clear diagrams:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
