import { NextResponse } from 'next/server';
import { getDiagram, deleteDiagram, getDiagramVersions } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/diagrams/[id] - Get diagram details and its version history
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    const diagram = await getDiagram(id);
    if (!diagram) {
      return NextResponse.json(
        { error: `Diagram with ID ${id} not found` },
        { status: 404 }
      );
    }

    const versions = await getDiagramVersions(id);

    return NextResponse.json({
      ...diagram,
      versions
    });
  } catch (error) {
    console.error('Failed to retrieve diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/diagrams/[id] - Delete a diagram (cascades to versions)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    const diagram = await getDiagram(id);
    if (!diagram) {
      return NextResponse.json(
        { error: `Diagram with ID ${id} not found` },
        { status: 404 }
      );
    }

    await deleteDiagram(id);

    return NextResponse.json({ message: `Diagram ${id} deleted successfully` });
  } catch (error) {
    console.error('Failed to delete diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
