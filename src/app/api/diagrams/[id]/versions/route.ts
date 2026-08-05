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
    const diagram = await getDiagram(diagramId);
    if (!diagram) {
      return NextResponse.json(
        { error: `Diagram with ID ${diagramId} not found` },
        { status: 404 }
      );
    }

    const body = await request.json();
    const xmlContent = body.xmlContent ?? body.xml_content;
    const comment = body.comment;
    const createdBy = body.createdBy ?? body.created_by;
    const architectureType = body.architectureType ?? body.architecture_type;

    if (xmlContent === undefined || typeof xmlContent !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "xmlContent" is required and must be a string' },
        { status: 400 }
      );
    }

    const newVersion = await saveDiagramVersion(
      diagramId,
      xmlContent,
      comment,
      createdBy || 'User',
      null,
      null,
      null,
      null,
      architectureType || diagram.architecture_type || 'unified_system_view'
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
