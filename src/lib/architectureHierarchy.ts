import { BLUEPRINT_KNOWLEDGE_MATRIX, BlueprintKnowledgeItem } from './blueprintKnowledgeMatrix';
import { normalizeArchitectureId } from './architectureTypes';

export interface ArchitectureHierarchyDomain {
  id: string;
  name: string;
  shortName: string;
  iconName: string;
  color: string;
  phaseId: string;
  phaseName: string;
  blueprints: BlueprintKnowledgeItem[];
}

export interface ArchitectureHierarchyPhase {
  id: string;
  phaseNum: number;
  phasePrefix: string;
  phaseKey?: string;
  phaseName: string;
  shortName: string;
  iconName: string;
  badgeColor: string;
  accentColor: string;
  description: string;
  domains: ArchitectureHierarchyDomain[];
  totalBlueprintsCount: number;
}

export const PHASE_DEFINITIONS = [
  {
    id: 'phase_1',
    phaseNum: 1,
    phasePrefix: 'Phase 1',
    phaseName: 'Phase 1: Current State Assessment & Baseline',
    shortName: 'Phase 1: Baseline',
    iconName: 'Search',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    accentColor: 'border-cyan-500 text-cyan-300',
    description: 'Current-state discovery, on-prem legacy dependency mapping, StratoZone wave planning, and As-Is vs. To-Be evaluation.'
  },
  {
    id: 'phase_2',
    phaseNum: 2,
    phasePrefix: 'Phase 2',
    phaseName: 'Phase 2: Business Vision & Strategy Alignment',
    shortName: 'Phase 2: Strategy',
    iconName: 'Target',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    accentColor: 'border-emerald-500 text-emerald-300',
    description: 'Cloud FinOps unit economics, multi-tenant cost chargeback models, and executive transformation business drivers.'
  },
  {
    id: 'phase_3',
    phaseNum: 3,
    phasePrefix: 'Phase 3',
    phaseName: 'Phase 3: Target State Logical Architecture',
    shortName: 'Phase 3: Target State',
    iconName: 'Layers',
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    accentColor: 'border-teal-500 text-teal-300',
    description: 'Target-state logical topologies, Medallion BigLake lakehouses, ReAct cognitive RAG rings, and unified system context.'
  },
  {
    id: 'phase_4',
    phaseNum: 4,
    phasePrefix: 'Phase 4',
    phaseName: 'Phase 4: Technical Deep-Dive & Security Validation',
    shortName: 'Phase 4: Security & Tech',
    iconName: 'Shield',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    accentColor: 'border-indigo-500 text-indigo-300',
    description: 'Zero-Trust IAM SSO, multi-region VPC Landing Zones, sovereign data residency, AI TRiSM guardrails, and event-driven EDA.'
  },
  {
    id: 'phase_5',
    phaseNum: 5,
    phasePrefix: 'Phase 5',
    phaseName: 'Phase 5: Transition Planning & Operational Readiness',
    shortName: 'Phase 5: Transition & SRE',
    iconName: 'Rocket',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    accentColor: 'border-purple-500 text-purple-300',
    description: 'Enterprise SRE observability, Go-Live Cutover war rooms, LLMOps lifecycle, and multi-region BCDR automated failover.'
  },
  {
    id: 'phase_6',
    phaseNum: 6,
    phasePrefix: 'Phase 6',
    phaseName: 'Phase 6: Industry Specialized Solutions',
    shortName: 'Phase 6: Industry',
    iconName: 'Building2',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    accentColor: 'border-pink-500 text-pink-300',
    description: 'Verticalized reference blueprints for FinTech Banking, Pharma Genomics, Retail E-Commerce, Manufacturing, and Healthcare.'
  },
  {
    id: 'phase_7',
    phaseNum: 7,
    phasePrefix: 'Phase 7',
    phaseName: 'Phase 7: Universal Architecture Standards',
    shortName: 'Phase 7: Standards',
    iconName: 'Award',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    accentColor: 'border-amber-500 text-amber-300',
    description: 'Formal standards including C4 Model System Context & Containers, BPMN 2.0 Workflows, STRIDE Threat Modeling, and MCP Gateways.'
  }
];

export const DOMAIN_METADATA: Record<string, { name: string; shortName: string; iconName: string; color: string }> = {
  'AI Agentic & LLMOps': {
    name: 'AI & Cognitive Systems',
    shortName: 'AI & Agents',
    iconName: 'Bot',
    color: 'text-sky-400 border-sky-500/30 bg-sky-500/10'
  },
  'AI & Agentic': {
    name: 'AI & Cognitive Systems',
    shortName: 'AI & Agents',
    iconName: 'Bot',
    color: 'text-sky-400 border-sky-500/30 bg-sky-500/10'
  },
  'Data & Analytics': {
    name: 'Data Lakehouse & Analytics',
    shortName: 'Data & Analytics',
    iconName: 'Database',
    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
  },
  'Cloud Infra Security': {
    name: 'Zero-Trust Security & Infrastructure',
    shortName: 'Security & Infra',
    iconName: 'Shield',
    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
  },
  'App & Integration': {
    name: 'Applications & Microservices Integration',
    shortName: 'App & Integration',
    iconName: 'Cpu',
    color: 'text-teal-400 border-teal-500/30 bg-teal-500/10'
  },
  'Strategy & Governance': {
    name: 'Enterprise Strategy & Governance',
    shortName: 'Strategy & Governance',
    iconName: 'Briefcase',
    color: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
  },
  'Industry': {
    name: 'Industry Specialized Verticals',
    shortName: 'Industry Solutions',
    iconName: 'Building2',
    color: 'text-pink-400 border-pink-500/30 bg-pink-500/10'
  },
  'General': {
    name: 'General Architecture',
    shortName: 'General',
    iconName: 'Layers',
    color: 'text-slate-400 border-slate-500/30 bg-slate-500/10'
  }
};

/**
 * Builds the canonical top-down hierarchy:
 * 7 Phases -> Domains -> Leaf Blueprints
 */
export function getArchitectureHierarchy(): ArchitectureHierarchyPhase[] {
  return PHASE_DEFINITIONS.map(pDef => {
    // Find all blueprints belonging to this phase
    const phaseBlueprints = BLUEPRINT_KNOWLEDGE_MATRIX.filter(item => {
      const p = item.phaseName || item.phase;
      return p.startsWith(pDef.phasePrefix) || item.phase === `Phase ${pDef.phaseNum}`;
    });

    // Group blueprints by domain
    const domainMap: Record<string, BlueprintKnowledgeItem[]> = {};
    phaseBlueprints.forEach(bp => {
      const dKey = bp.domain || 'General';
      if (!domainMap[dKey]) domainMap[dKey] = [];
      domainMap[dKey].push(bp);
    });

    const domains: ArchitectureHierarchyDomain[] = Object.keys(domainMap).map(dKey => {
      const meta = DOMAIN_METADATA[dKey] || {
        name: dKey,
        shortName: dKey,
        iconName: 'Layers',
        color: 'text-slate-300 border-slate-500/30 bg-slate-500/10'
      };
      return {
        id: `${pDef.id}_${dKey.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
        name: meta.name,
        shortName: meta.shortName,
        iconName: meta.iconName,
        color: meta.color,
        phaseId: pDef.id,
        phaseName: pDef.phaseName,
        blueprints: domainMap[dKey]
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
      totalBlueprintsCount: phaseBlueprints.length
    };
  });
}

/**
 * Returns full breadcrumbs (Phase -> Domain -> Leaf Blueprint) for any blueprint ID or architecture type
 */
export function getBlueprintBreadcrumbs(blueprintOrArchId: string): {
  phase: ArchitectureHierarchyPhase;
  domain: ArchitectureHierarchyDomain;
  blueprint: BlueprintKnowledgeItem;
} | null {
  if (!blueprintOrArchId) return null;

  const normTarget = normalizeArchitectureId(blueprintOrArchId);
  const hierarchy = getArchitectureHierarchy();

  // 1. Direct combinedId match or normalized ID match
  for (const phase of hierarchy) {
    for (const domain of phase.domains) {
      for (const bp of domain.blueprints) {
        if (
          bp.combinedId === blueprintOrArchId ||
          normalizeArchitectureId(bp.combinedId) === normTarget ||
          normalizeArchitectureId(bp.combinedId) === normalizeArchitectureId(blueprintOrArchId)
        ) {
          return { phase, domain, blueprint: bp };
        }
      }
    }
  }

  // 2. Fuzzy / partial substring match
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

  // Fallback: If not found directly, return default Phase 5 (Transition & SRE) or Phase 3
  const defaultPhase = hierarchy.find(p => p.id === 'phase_5') || hierarchy[2] || hierarchy[0];
  const defaultDomain = defaultPhase.domains.find(d => d.shortName === 'AI & Agents') || defaultPhase.domains[0];
  const defaultBlueprint = defaultDomain?.blueprints.find(bp => bp.combinedId.includes('capacity_quota')) || defaultDomain?.blueprints[0] || BLUEPRINT_KNOWLEDGE_MATRIX[0];

  return {
    phase: defaultPhase,
    domain: defaultDomain,
    blueprint: defaultBlueprint
  };
}

/**
 * Returns the list of sibling blueprints within the same domain/phase for cycling < >
 */
export function getSiblingBlueprints(blueprintOrArchId: string): BlueprintKnowledgeItem[] {
  const crumbs = getBlueprintBreadcrumbs(blueprintOrArchId);
  if (crumbs && crumbs.domain?.blueprints?.length > 0) {
    return crumbs.domain.blueprints;
  }
  return BLUEPRINT_KNOWLEDGE_MATRIX;
}
