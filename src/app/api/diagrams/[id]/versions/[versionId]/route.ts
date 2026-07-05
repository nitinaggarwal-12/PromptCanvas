import { NextResponse } from 'next/server';
import { getDiagramVersion } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
    versionId: string;
  }>;
}

// GET /api/diagrams/[id]/versions/[versionId] - Retrieve a specific version's details and XML
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { versionId } = await params;
    
    const version = getDiagramVersion(versionId);
    if (!version) {
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
