import { NextResponse } from 'next/server';
import { getDiagram, deleteDiagram, getDiagramVersions, updateDiagramArchitectureType } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/diagrams/[id] - Get diagram details and its version history (scoped to user)
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    const { id } = await params;
    
    const diagram = await getDiagram(id, user?.id);
    if (!diagram) {
      return NextResponse.json(
        { error: `Diagram with ID ${id} not found` },
        { status: 404 }
      );
    }

    const rawVersions = await getDiagramVersions(id);
    const versions = rawVersions.map((v: any) => {
      let xmlStr = v.xml_content;
      if (typeof xmlStr !== 'string' && xmlStr !== null && xmlStr !== undefined) {
        if (Buffer.isBuffer(xmlStr)) {
          xmlStr = xmlStr.toString('utf-8');
        } else if (typeof xmlStr === 'object') {
          xmlStr = Buffer.from(Object.values(xmlStr) as any).toString('utf-8');
        } else {
          xmlStr = String(xmlStr);
        }
      }
      const healed = validateAndHealDrawioXml(xmlStr || '');
      return { ...v, xml_content: healed.xml };
    });

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

// PATCH /api/diagrams/[id] - Update diagram metadata (e.g. architecture_type)
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    const { id } = await params;
    const body = await request.json();
    const archType = body.architecture_type || body.architectureType;
    if (archType) {
      await updateDiagramArchitectureType(id, archType);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/diagrams/[id] - Delete a diagram (scoped to user)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    const { id } = await params;
    
    const diagram = await getDiagram(id, user?.id);
    if (!diagram) {
      return NextResponse.json(
        { error: `Diagram with ID ${id} not found` },
        { status: 404 }
      );
    }

    await deleteDiagram(id, user?.id);

    return NextResponse.json({ message: `Diagram ${id} deleted successfully` });
  } catch (error) {
    console.error('Failed to delete diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
