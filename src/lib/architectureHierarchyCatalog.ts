export type { ArchitectureHierarchyDomain, ArchitectureHierarchyPhase } from './architectureHierarchy';
export { PHASE_DEFINITIONS, DOMAIN_METADATA } from './architectureHierarchy';

import {
  PHASE_DEFINITIONS,
  DOMAIN_METADATA,
} from './architectureHierarchy';
import type {
  ArchitectureHierarchyDomain,
  ArchitectureHierarchyPhase,
} from './architectureHierarchy';
import {
  BLUEPRINT_KNOWLEDGE_MATRIX,
  type BlueprintKnowledgeItem,
} from './blueprintKnowledgeMatrixCatalog';
import { normalizeArchitectureId } from './architectureTypesCertified';

/** Catalog-aware hierarchy that includes the approved Blueprint 61 extension. */
export function getArchitectureHierarchy(): ArchitectureHierarchyPhase[] {
  return PHASE_DEFINITIONS.map((pDef) => {
    const phaseBlueprints = BLUEPRINT_KNOWLEDGE_MATRIX.filter((item) => {
      const p = item.phaseName || item.phase;
      return p.startsWith(pDef.phasePrefix) || item.phase === `Phase ${pDef.phaseNum}`;
    });

    const domainMap: Record<string, BlueprintKnowledgeItem[]> = {};
    phaseBlueprints.forEach((bp) => {
      const dKey = bp.domain || 'General';
      if (!domainMap[dKey]) domainMap[dKey] = [];
      domainMap[dKey].push(bp);
    });

    const domains: ArchitectureHierarchyDomain[] = Object.keys(domainMap).map((dKey) => {
      const meta = DOMAIN_METADATA[dKey] || {
        name: dKey,
        shortName: dKey,
        iconName: 'Layers',
        color: 'text-slate-300 border-slate-500/30 bg-slate-500/10',
      };
      return {
        id: `${pDef.id}_${dKey.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
        name: meta.name,
        shortName: meta.shortName,
        iconName: meta.iconName,
        color: meta.color,
        phaseId: pDef.id,
        phaseName: pDef.phaseName,
        blueprints: domainMap[dKey],
      };
    });

    return {
      id: pDef.id,
      phaseNum: pDef.phaseNum,
      phasePrefix: pDef.phasePrefix,
      phaseKey: pDef.id,
      phaseName: pDef.phaseName,
      shortName: pDef.shortName,
      iconName: pDef.iconName,
      badgeColor: pDef.badgeColor,
      accentColor: pDef.accentColor,
      description: pDef.description,
      domains,
      totalBlueprintsCount: phaseBlueprints.length,
    };
  });
}

export function getBlueprintBreadcrumbs(blueprintOrArchId: string): {
  phase: ArchitectureHierarchyPhase;
  domain: ArchitectureHierarchyDomain;
  blueprint: BlueprintKnowledgeItem;
} | null {
  if (!blueprintOrArchId) return null;

  const normTarget = normalizeArchitectureId(blueprintOrArchId);
  const hierarchy = getArchitectureHierarchy();

  for (const phase of hierarchy) {
    for (const domain of phase.domains) {
      for (const bp of domain.blueprints) {
        if (
          bp.combinedId === blueprintOrArchId ||
          normalizeArchitectureId(bp.combinedId) === normTarget
        ) {
          return { phase, domain, blueprint: bp };
        }
      }
    }
  }

  const lowerTarget = blueprintOrArchId.toLowerCase();
  for (const phase of hierarchy) {
    for (const domain of phase.domains) {
      for (const bp of domain.blueprints) {
        if (
          bp.combinedId.toLowerCase().includes(lowerTarget) ||
          lowerTarget.includes(bp.combinedId.toLowerCase()) ||
          bp.diagramName.toLowerCase().includes(lowerTarget)
        ) {
          return { phase, domain, blueprint: bp };
        }
      }
    }
  }

  return null;
}

export function getSiblingBlueprints(blueprintOrArchId: string): BlueprintKnowledgeItem[] {
  const crumbs = getBlueprintBreadcrumbs(blueprintOrArchId);
  return crumbs?.domain?.blueprints?.length ? crumbs.domain.blueprints : BLUEPRINT_KNOWLEDGE_MATRIX;
}
