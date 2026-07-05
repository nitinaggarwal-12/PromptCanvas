import { NextResponse } from 'next/server';
import { getDiagram, saveDiagramVersion } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// POST /api/diagrams/[id]/versions - Save a new version of a diagram
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: diagramId } = await params;
    
    // Verify diagram exists
    const diagram = getDiagram(diagramId);
    if (!diagram) {
      return NextResponse.json(
        { error: `Diagram with ID ${diagramId} not found` },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { xmlContent, comment, createdBy } = body;

    if (xmlContent === undefined || typeof xmlContent !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "xmlContent" is required and must be a string' },
        { status: 400 }
      );
    }

    const newVersion = saveDiagramVersion(
      diagramId,
      xmlContent,
      comment,
      createdBy || 'User'
    );

    return NextResponse.json(newVersion, { status: 201 });
  } catch (error) {
    console.error('Failed to save diagram version:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
