import { getDefaultXmlForArchitecture } from './architectureTypes';

export interface StalenessReport {
  isStale: boolean;
  reason: string;
  templateName: string;
  lastTemplateUpdate: string;
  hasCustomPrompt: boolean;
}

/**
 * Checks whether an existing diagram's XML or version is stale relative to the
 * latest canonical Master Template definition in the codebase.
 */
export function checkDiagramStaleness(
  diagram: {
    id?: string;
    name?: string;
    architecture_type?: string | null;
    updated_at?: string | Date;
    versions?: Array<{
      version_number?: number;
      xml_content?: string;
      created_at?: string | Date;
      prompt?: string | null;
      comment?: string | null;
    }>;
    xml_content?: string;
    prompt?: string | null;
  }
): StalenessReport {
  const archType = diagram.architecture_type || 'conceptual_diagram';
  const latestVersion = diagram.versions?.[0];
  const currentXml = latestVersion?.xml_content || diagram.xml_content || '';
  const comment = latestVersion?.comment || '';

  // Master template timestamps & signature markers
  const MASTER_UPDATE_TIMESTAMP = '2026-08-08T02:15:00Z';

  // If already explicitly refreshed via Live API recently
  if (comment.includes('Force Refreshed from Master Template') || comment.includes('Master Template Live API')) {
    return {
      isStale: false,
      reason: 'Up-to-date with canonical Master Template',
      templateName: archType,
      lastTemplateUpdate: MASTER_UPDATE_TIMESTAMP,
      hasCustomPrompt: Boolean(diagram.prompt || latestVersion?.prompt)
    };
  }

  // 1. Check Serverless GCP Master Template Signatures
  if (archType === 'tech_serverless_gcp' || archType === 'serverless_gcp') {
    const hasFlowBadges = currentXml.includes('c1') && currentXml.includes('c9') && currentXml.includes('flow_1_2');
    const hasColContainers = currentXml.includes('col_ingestion') && currentXml.includes('col_storage');
    const hasFullNineSteps = currentXml.includes('Global Cloud Load Balancing') && currentXml.includes('Cloud Operations Suite');
    
    if (!hasFlowBadges || !hasColContainers || !hasFullNineSteps) {
      return {
        isStale: true,
        reason: 'Master Template updated with 9-step numbered data flow badges (c1..c9) & zero-collision layout',
        templateName: 'Serverless Web Application - GCP',
        lastTemplateUpdate: MASTER_UPDATE_TIMESTAMP,
        hasCustomPrompt: Boolean(diagram.prompt || latestVersion?.prompt)
      };
    }
  }

  // 2. Check Multi-Region DR GCP Active-Passive Master Template Signatures
  if (archType === 'tech_multi_region_dr' || archType === 'multi_region_dr') {
    const hasDualRegionGcs = currentXml.includes('Google Cloud Storage') && (currentXml.includes('dual-region') || currentXml.includes('dual-region bucket'));
    const hasZeroCollisionLayout = currentXml.includes('gcp_low_a_hdr') && currentXml.includes('gtm_hub');
    const hasPageTwoSla = currentXml.includes('DR Playbook') || currentXml.includes('RECOVERY MATRIX') || currentXml.includes('SLA Matrix');

    if (!hasDualRegionGcs || !hasZeroCollisionLayout || !hasPageTwoSla) {
      return {
        isStale: true,
        reason: 'Master Template updated with SRE Pilot Light architecture, zero-collision GCS layout & SLA Matrix',
        templateName: 'Multi-Region DR GCP Active-Passive',
        lastTemplateUpdate: MASTER_UPDATE_TIMESTAMP,
        hasCustomPrompt: Boolean(diagram.prompt || latestVersion?.prompt)
      };
    }
  }

  // 3. Generic timestamp check against master template updates
  const diagramUpdatedAt = new Date(diagram.updated_at || latestVersion?.created_at || 0).getTime();
  const masterUpdateTime = new Date(MASTER_UPDATE_TIMESTAMP).getTime();

  // If the diagram was created before the latest master template lock and lacks master template comment
  if (diagramUpdatedAt < masterUpdateTime && !comment.includes('Force Refreshed')) {
    return {
      isStale: true,
      reason: 'Canonical Master Template has been updated in codebase. Click to force refresh via Live API.',
      templateName: archType,
      lastTemplateUpdate: MASTER_UPDATE_TIMESTAMP,
      hasCustomPrompt: Boolean(diagram.prompt || latestVersion?.prompt)
    };
  }

  return {
    isStale: false,
    reason: 'Up-to-date with canonical Master Template',
    templateName: archType,
    lastTemplateUpdate: MASTER_UPDATE_TIMESTAMP,
    hasCustomPrompt: Boolean(diagram.prompt || latestVersion?.prompt)
  };
}
