import { NextResponse } from 'next/server';
import { getDiagram, getDiagramVersions } from '@/lib/db';
import { checkDiagramStaleness } from '@/lib/diagramStaleness';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const diagram = await getDiagram(id);
    if (!diagram) {
      return NextResponse.json({ error: 'Diagram not found' }, { status: 404 });
    }

    const versions = await getDiagramVersions(id);
    const diagramWithVersions = {
      ...diagram,
      versions
    };

    const staleness = checkDiagramStaleness(diagramWithVersions);
    return NextResponse.json({
      diagramId: id,
      diagramName: diagram.name,
      architectureType: diagram.architecture_type,
      ...staleness
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  } catch (error) {
    console.error('Error checking diagram staleness:', error);
    return NextResponse.json(
      { error: 'Failed to check diagram staleness', details: String(error) },
      { status: 500 }
    );
  }
}
