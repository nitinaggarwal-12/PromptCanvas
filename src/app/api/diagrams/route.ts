import { NextResponse } from 'next/server';
import { listDiagrams, createDiagram } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';

// GET /api/diagrams - List diagrams (user-scoped or public seed)
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const diagrams = await listDiagrams(user?.id);
    return NextResponse.json(diagrams);
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
    const { name, xml, comment, prompt, aiReasoning, businessUsecase, technicalUsecase } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "name" is required and must be a string' },
        { status: 400 }
      );
    }

    const { diagram, version } = await createDiagram(
      name,
      xml,
      comment,
      prompt,
      aiReasoning,
      businessUsecase,
      technicalUsecase,
      user?.id || null
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
