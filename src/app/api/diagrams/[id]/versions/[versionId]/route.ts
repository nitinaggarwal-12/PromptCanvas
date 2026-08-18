import { NextResponse } from 'next/server';
import { getDiagram, getDiagramVersion } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';

interface RouteParams {
  params: Promise<{
    id: string;
    versionId: string;
  }>;
}

// GET /api/diagrams/[id]/versions/[versionId] - Retrieve a specific version's details and XML
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    const { id, versionId } = await params;

    const diagram = await getDiagram(id, user?.id);
    if (!diagram) {
      return NextResponse.json(
        { error: `Diagram with ID ${id} not found or access denied` },
        { status: 404 }
      );
    }
    
    const version = await getDiagramVersion(versionId);
    if (!version || version.diagram_id !== id) {
      return NextResponse.json(
        { error: `Diagram version with ID ${versionId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(version);
  } catch (error) {
    console.error('Failed to retrieve diagram version:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
