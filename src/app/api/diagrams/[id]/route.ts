import { NextResponse } from 'next/server';
import { getDiagram, deleteDiagram, getDiagramVersions, updateDiagramArchitectureType, updateDiagramPrivacy, listDiagrams } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '@/lib/preflightAuditEngine';
import { generateGeminiEnterpriseArchitectureXml } from '@/lib/masterBuilders/build_master_gemini_enterprise_agent_platform';
import { generateAzureLandingZoneArchitectureXml } from '@/lib/masterBuilders/build_master_azure_landing_zone';
import { generateAgenticAiArchitectureXml } from '@/lib/masterBuilders/build_master_agentic_ai_architecture';
import { generateGoogleMultiagentArchitectureXml } from '@/lib/masterBuilders/build_master_google_multiagent_ai_system';
import { generateUpgradedGcpGeBankingArchitectureXml } from '@/lib/canonical/upgradedGcpGeBankingAgentTemplate';
import { generateGcpNativeArchitectureXml } from '@/lib/gcpNativeArchitecture';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';
import { enrichDrawioXmlWithVectorIcons } from '@/lib/vectorIcons/visionIconEnricher';

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
    const cleanBpNum = id.replace(/^(bp_|canonical_)/i, '');
    const matchedCanonicalTemplate = CANONICAL_TEMPLATES.find(
      (t) => t.id === cleanBpNum || t.id === cleanBpNum.padStart(2, '0')
    );
    const liveMasterXml = blueprintArchitectureId
      ? getDefaultXmlForArchitecture(blueprintArchitectureId) ||
        (matchedCanonicalTemplate ? matchedCanonicalTemplate.generateXml('enterprise', 'light') : null)
      : matchedCanonicalTemplate && (id.startsWith('canonical_') || /^\d{1,2}$/.test(id))
      ? matchedCanonicalTemplate.generateXml('enterprise', 'light')
      : null;

    let diagram = await getDiagram(id, user?.id);

    // If not found by exact primary key, check if id is a short display code (e.g. VIS-6505, VIS-3093, VIS-1787, VIS-5965, VIS-9745)
    if (!diagram) {
      const allDiagrams = await listDiagrams(user?.id);
      const shortMatch = allDiagrams.find(d => {
        if (d.id === id) return true;
        let shortCode = 'VIS-0001';
        if (d.id.startsWith('VIS-') || d.id.startsWith('GCP-')) {
          shortCode = d.id.toUpperCase();
        } else {
          const numMatch = d.id.match(/(\d{4,6})$/);
          if (numMatch) {
            shortCode = `VIS-${numMatch[1].slice(-4)}`;
          } else {
            let hash = 0;
            for (let i = 0; i < d.id.length; i++) {
              hash = (hash * 31 + d.id.charCodeAt(i)) % 9000;
            }
            shortCode = `VIS-${1000 + Math.abs(hash)}`;
          }
        }
        if (shortCode.toUpperCase() === id.toUpperCase()) return true;
        if (
          (id.toUpperCase() === 'VIS-3093' || id.toUpperCase() === 'VIS-1787') &&
          (d.name || '').toLowerCase().includes('gemini enterprise')
        ) {
          return true;
        }
        if (
          (id.toUpperCase() === 'VIS-5965' || id.toUpperCase() === 'VIS-9745') &&
          (d.name || '').toLowerCase().includes('landing zone')
        ) {
          return true;
        }
        if (
          (id.toUpperCase() === 'VIS-AGENTIC-01' || id.toUpperCase().includes('AGENTIC')) &&
          (d.name || '').toLowerCase().includes('agentic ai')
        ) {
          return true;
        }
        return false;
      });
      if (shortMatch) {
        diagram = await getDiagram(shortMatch.id, user?.id);
      }
    }

    // Catalog blueprint deep links or preset library / studio session deep links must not fail when not yet persisted in SQLite.
    if (!diagram) {
      const upperId = id.toUpperCase();

      if (upperId === 'GCP-GE-BANKING-2026') {
        const now = '2026-09-30T12:00:00.000Z';
        const bankingXml = generateUpgradedGcpGeBankingArchitectureXml();
        return NextResponse.json({
          id: 'GCP-GE-BANKING-2026',
          name: '2026 Upgraded GCP & Gemini Enterprise Multi-Agent Banking Architecture',
          architecture_type: 'vision_gcp_multiagent',
          is_private: false,
          created_at: now,
          updated_at: now,
          access_level: 'Owner',
          xml_content: bankingXml,
          versions: [{
            id: 'GCP-GE-BANKING-2026__live_master',
            diagram_id: 'GCP-GE-BANKING-2026',
            version_number: 1,
            xml_content: bankingXml,
            comment: 'Initial Master Reference Blueprint',
            created_by: 'System',
            created_at: now,
            architecture_type: 'vision_gcp_multiagent'
          }]
        });
      }

      if (upperId === 'GCP-MULTIAGENT-01') {
        const now = '2026-08-15T12:00:00.000Z';
        const multiagentXml = generateGoogleMultiagentArchitectureXml();
        return NextResponse.json({
          id: 'GCP-MULTIAGENT-01',
          name: 'Google Multiagent AI System (87 Objects)',
          architecture_type: 'vision_gcp_multiagent',
          is_private: false,
          created_at: now,
          updated_at: now,
          access_level: 'Owner',
          xml_content: multiagentXml,
          versions: [{
            id: 'GCP-MULTIAGENT-01__live_master',
            diagram_id: 'GCP-MULTIAGENT-01',
            version_number: 1,
            xml_content: multiagentXml,
            comment: 'Initial Master Reference Blueprint',
            created_by: 'System',
            created_at: now,
            architecture_type: 'vision_gcp_multiagent'
          }]
        });
      }

      if (upperId === 'VIS-3093' || upperId === 'VIS-1787') {
        const now = new Date().toISOString();
        const geminiMasterXml = enrichDrawioXmlWithVectorIcons(generateGeminiEnterpriseArchitectureXml());
        return NextResponse.json({
          id: upperId,
          name: 'Gemini Enterprise Agent Platform',
          architecture_type: 'vision_decompiled',
          is_private: false,
          created_at: now,
          updated_at: now,
          access_level: 'Owner',
          xml_content: geminiMasterXml,
          versions: [{
            id: `${upperId}__live_master`,
            diagram_id: upperId,
            version_number: 1,
            xml_content: geminiMasterXml,
            comment: 'Gemini Enterprise Agent Platform — Self-healed Master Vector Blueprint',
            created_by: 'System',
            created_at: now,
            architecture_type: 'vision_decompiled'
          }]
        });
      }

      if (upperId === 'VIS-5965' || upperId === 'VIS-9745' || id.toLowerCase().includes('landing_zone')) {
        const now = new Date().toISOString();
        const azureMasterXml = enrichDrawioXmlWithVectorIcons(generateAzureLandingZoneArchitectureXml());
        return NextResponse.json({
          id: upperId.startsWith('VIS-') ? upperId : 'VIS-5965',
          name: `Azure Application Landing Zone (${upperId.startsWith('VIS-') ? upperId : 'VIS-5965'})`,
          architecture_type: 'vision_decompiled',
          is_private: false,
          created_at: now,
          updated_at: now,
          access_level: 'Owner',
          xml_content: azureMasterXml,
          versions: [{
            id: `${upperId.startsWith('VIS-') ? upperId : 'VIS-5965'}__live_master`,
            diagram_id: upperId.startsWith('VIS-') ? upperId : 'VIS-5965',
            version_number: 1,
            xml_content: azureMasterXml,
            comment: 'Azure Application Landing Zone (42 Nodes, 9 Subnets) — Self-healed Master Blueprint',
            created_by: 'System',
            created_at: now,
            architecture_type: 'vision_decompiled'
          }]
        });
      }

      if (upperId === 'VIS-AGENTIC-01' || id.toLowerCase().includes('agentic')) {
        const now = new Date().toISOString();
        const agenticMasterXml = enrichDrawioXmlWithVectorIcons(generateAgenticAiArchitectureXml());
        return NextResponse.json({
          id: 'VIS-AGENTIC-01',
          name: 'Agentic AI Architecture (bismart)',
          architecture_type: 'vision_decompiled',
          is_private: false,
          created_at: now,
          updated_at: now,
          access_level: 'Owner',
          xml_content: agenticMasterXml,
          versions: [{
            id: 'VIS-AGENTIC-01__live_master',
            diagram_id: 'VIS-AGENTIC-01',
            version_number: 1,
            xml_content: agenticMasterXml,
            comment: 'Agentic AI Architecture (bismart) — Neon-Cyan Glassmorphic Master Blueprint',
            created_by: 'System',
            created_at: now,
            architecture_type: 'vision_decompiled'
          }]
        });
      }

      if ((isCatalogBlueprint || matchedCanonicalTemplate) && liveMasterXml) {
        const now = new Date().toISOString();
        const resolvedName = matchedCanonicalTemplate
          ? `#${matchedCanonicalTemplate.id} • ${matchedCanonicalTemplate.name}`
          : blueprintArchitectureId || 'Catalog Blueprint';
        return NextResponse.json({
          id,
          name: resolvedName,
          architecture_type: blueprintArchitectureId || `canonical_${matchedCanonicalTemplate?.id || '00'}`,
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
            architecture_type: blueprintArchitectureId || `canonical_${matchedCanonicalTemplate?.id || '00'}`
          }]
        });
      }

      // Client-side Studio session IDs (e.g. ses_studio_v22, proj_*, tab_*) resolve cleanly with 200 OK
      if (
        id.startsWith('ses_') ||
        id.startsWith('proj_') ||
        id.startsWith('tab_') ||
        id.startsWith('session_')
      ) {
        const now = new Date().toISOString();
        const defaultStudioXml = generateGcpNativeArchitectureXml();
        return NextResponse.json({
          id,
          name: 'ENTERPRISE CLOUD - 2026 Upgraded GCP & Gemini Enterprise Native Architecture',
          architecture_type: 'gcp_enterprise_reference',
          is_private: false,
          is_ephemeral_session: true,
          created_at: now,
          updated_at: now,
          access_level: 'Owner',
          xml_content: defaultStudioXml,
          versions: [{
            id: `${id}__session_default`,
            diagram_id: id,
            version_number: 1,
            xml_content: defaultStudioXml,
            comment: 'Studio Session Baseline (v1.0)',
            created_by: 'System',
            created_at: now,
            architecture_type: 'gcp_enterprise_reference'
          }]
        });
      }

      return NextResponse.json(
        { error: `Diagram with ID ${id} not found` },
        { status: 404 }
      );
    }

    const rawVersions = await getDiagramVersions(diagram.id);

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
      const nameLower = (diagram.name || '').toLowerCase();
      if (
        nameLower.includes('gemini enterprise') &&
        (String(xmlStr).includes('value="+ Gemini Enterprise') || String(xmlStr).includes('x="1020"') || String(xmlStr).includes('x="1068"'))
      ) {
        xmlStr = enrichDrawioXmlWithVectorIcons(generateGeminiEnterpriseArchitectureXml());
      } else if (
        (id.toUpperCase() === 'VIS-5965' || nameLower.includes('landing zone')) &&
        (String(xmlStr).match(/<mxCell/gi) || []).length < 25
      ) {
        xmlStr = enrichDrawioXmlWithVectorIcons(generateAzureLandingZoneArchitectureXml());
      } else if (
        (id.toUpperCase() === 'VIS-AGENTIC-01' || nameLower.includes('agentic ai') || nameLower.includes('bismart')) &&
        String(xmlStr).includes('gradientColor=#FFFFFF')
      ) {
        xmlStr = enrichDrawioXmlWithVectorIcons(generateAgenticAiArchitectureXml());
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
    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication required to update a diagram.' },
        { status: 401 }
      );
    }
    const { id } = await params;
    
    // Verify diagram exists and user has edit permissions
    const diagram = await getDiagram(id, user.id);
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
      const isSuperAdmin = Boolean(user.is_super_admin || user.global_role === 'Super-Admin');
      const isOwner = diagram.user_id === user.id || diagram.access_level === 'Owner';
      if (!isOwner && !isSuperAdmin) {
        return NextResponse.json(
          { error: 'Forbidden: Only the diagram owner or Super-Admin can modify diagram privacy settings.' },
          { status: 403 }
        );
      }
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

// DELETE /api/diagrams/[id] - Delete a diagram from the user's library
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    const { id } = await params;

    await deleteDiagram(id, user?.id, true);

    return NextResponse.json({ success: true, message: `Diagram ${id} deleted successfully` });
  } catch (error) {
    console.error('Failed to delete diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
