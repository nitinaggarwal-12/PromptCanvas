import { NextResponse } from 'next/server';
import { getDiagram, deleteDiagram, getDiagramVersions, updateDiagramArchitectureType, updateDiagramPrivacy } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '@/lib/preflightAuditEngine';

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

    const isCatalogBlueprint = id.startsWith('bp_');
    const blueprintArchitectureId = isCatalogBlueprint ? id.slice(3) : null;
    const liveMasterXml = blueprintArchitectureId
      ? getDefaultXmlForArchitecture(blueprintArchitectureId)
      : null;

    const diagram = await getDiagram(id, user?.id);

    // Catalog blueprint deep links must not depend on a persisted/cached DB row.
    // If the bp_* cache entry is missing, synthesize a read-only runtime diagram from
    // the current code-owned master so refresh/deep-link navigation still works.
    if (!diagram) {
      if (isCatalogBlueprint && liveMasterXml) {
        const now = new Date().toISOString();
        return NextResponse.json({
          id,
          name: blueprintArchitectureId || 'Catalog Blueprint',
          architecture_type: blueprintArchitectureId,
          is_private: false,
          created_at: now,
          updated_at: now,
          access_level: 'Viewer',
          xml_content: liveMasterXml,
          versions: [{
            id: `${id}__live_master`,
            diagram_id: id,
            version_number: 1,
            xml_content: liveMasterXml,
            comment: 'Current catalog master',
            created_by: 'System',
            created_at: now,
            architecture_type: blueprintArchitectureId
          }]
        });
      }

      return NextResponse.json(
        { error: `Diagram with ID ${id} not found` },
        { status: 404 }
      );
    }

    const rawVersions = await getDiagramVersions(id);

    // Catalog blueprint records (bp_*) are cached DB representations of code-owned masters.
    // Always render the current code master as the latest version so deep links never show
    // a stale/corrupted DB snapshot after a master is repaired. Historical versions remain intact.
    let versions = rawVersions.map((v: any, index: number) => {
      if (index === 0 && liveMasterXml) {
        return {
          ...v,
          xml_content: liveMasterXml,
          architecture_type: blueprintArchitectureId || v.architecture_type,
          comment: v.comment || 'Current catalog master'
        };
      }

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
      const healedXml = preflightVerifyAndHealXmlAcrossAll6Audits(
        xmlStr || '',
        diagram.architecture_type || 'unified_system_view'
      );
      return { ...v, xml_content: healedXml };
    });

    if (liveMasterXml && versions.length === 0) {
      versions = [{
        id: `${id}__live_master`,
        diagram_id: id,
        version_number: 1,
        xml_content: liveMasterXml,
        comment: 'Current catalog master',
        created_by: 'System',
        created_at: new Date().toISOString(),
        architecture_type: blueprintArchitectureId
      }];
    }

    return NextResponse.json({
      ...diagram,
      architecture_type: blueprintArchitectureId || diagram.architecture_type,
      xml_content: liveMasterXml || diagram.xml_content,
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

// PATCH /api/diagrams/[id] - Update diagram metadata (e.g. architecture_type, is_private)
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    const { id } = await params;
    
    // Verify diagram exists and user has edit permissions
    const diagram = await getDiagram(id, user?.id);
    if (!diagram) {
      return NextResponse.json(
        { error: `Diagram with ID ${id} not found` },
        { status: 404 }
      );
    }

    if (diagram.access_level === 'Viewer') {
      return NextResponse.json(
        { error: 'Forbidden: You have read-only access to this diagram.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const archType = body.architecture_type || body.architectureType;
    const xmlContent = body.xml_content || body.xmlContent;
    const diagramName = body.name;
    const businessUseCase = body.business_usecase || body.businessUseCase;

    const { updateDiagramName, updateLatestDiagramVersionContent } = await import('@/lib/db');

    if (archType) {
      await updateDiagramArchitectureType(id, archType);
    }
    if (diagramName) {
      await updateDiagramName(id, diagramName);
    }
    if (xmlContent || archType || businessUseCase) {
      await updateLatestDiagramVersionContent(id, xmlContent, archType, businessUseCase);
    }
    if (body.is_private !== undefined || body.isPrivate !== undefined) {
      const isPriv = Boolean(body.is_private ?? body.isPrivate);
      await updateDiagramPrivacy(id, isPriv);
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

    if (user?.id && diagram.user_id && diagram.user_id !== user.id && !diagram.user_id.startsWith('guest-') && diagram.access_level === 'Viewer') {
      return NextResponse.json(
        { error: 'Forbidden: Only the diagram owner can delete this diagram.' },
        { status: 403 }
      );
    }

    await deleteDiagram(id, user?.id);

    return NextResponse.json({ success: true, message: `Diagram ${id} deleted successfully` });
  } catch (error) {
    console.error('Failed to delete diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
