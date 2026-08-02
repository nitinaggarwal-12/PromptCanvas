import { SystemModel } from '../extract';
import { SectionContent, DerivationMapperFn, TableRow, ProvenanceText } from './types';

function getComponentName(model: SystemModel, id: string): string {
  const c = model.components.find((comp) => comp.id === id);
  return c ? c.label : id;
}

function getTierName(model: SystemModel, id: string): string {
  const t = model.tiers.find((tier) => tier.id === id);
  return t ? t.label : id;
}

export const componentDescriptionsMapper: DerivationMapperFn = (model, sectionId = 'components') => {
  const paragraphs: ProvenanceText[] = [];
  const tableRows: TableRow[] = [];

  const activeTiers = model.tiers.filter((tier) =>
    model.components.some((c) => c.tier === tier.id)
  );

  paragraphs.push({
    text: `The enterprise architecture organizes ${model.components.length} governed software components and microservices across ${activeTiers.length || 1} core logical architectural tiers.`,
    sourceRefs: activeTiers.map((t) => t.id),
  });

  // Group components by architectural tier (max 8 rows to maintain publication-grade executive readability)
  const tiersToSummarize = activeTiers.length > 0 ? activeTiers.slice(0, 8) : [{ id: 'core', label: 'Core Software & Compute Tier', kind: 'tier' }];

  for (const tier of tiersToSummarize) {
    const tierComps = model.components.filter((c) => c.tier === tier.id);
    const compNames = tierComps.slice(0, 4).map((c) => c.label);
    const extraCount = tierComps.length - topCompsLength(compNames);
    const summaryList =
      tierComps.length > 0
        ? `${compNames.join(', ')}${tierComps.length > 4 ? ` (+${tierComps.length - 4} additional pods)` : ''}`
        : 'Governed Compute & Service Pods';

    const sampleFlow = model.flows.find(
      (f) => tierComps.some((c) => c.id === f.from) || tierComps.some((c) => c.id === f.to)
    );
    const flowDesc = sampleFlow
      ? `Synchronizes via ${getComponentName(model, sampleFlow.from)} ➔ ${getComponentName(model, sampleFlow.to)}`
      : 'Internal container network & service mesh';

    tableRows.push({
      cells: [
        tier.label,
        `${tierComps.length || 1} Pod(s)`,
        compNames[0] || 'Active Architecture Tier',
        summaryList,
        flowDesc,
      ],
      sourceRefs: tierComps.map((c) => c.id),
    });
  }

  return {
    sectionId,
    paragraphs,
    bullets: [],
    table: {
      headers: ['Architectural Subsystem Tier', 'Component Count', 'Primary Lead Capability', 'Key Components & Microservices', 'Primary Integration & Event Flow'],
      rows: tableRows,
    },
  };
};

function topCompsLength(arr: string[]): number {
  return arr.length;
}

export const interfaceInventoryMapper: DerivationMapperFn = (model, sectionId = 'interfaces') => {
  // Select top 6 representative inter-service contracts instead of dumping 80 raw rows
  const representativeFlows = model.flows.slice(0, 6);
  const rows: TableRow[] = representativeFlows.map((flow) => {
    const consumer = getComponentName(model, flow.from);
    const provider = getComponentName(model, flow.to);
    return {
      cells: [
        consumer,
        provider,
        flow.label || 'Governed API / Event Payload Exchange',
        flow.protocol || 'HTTPS REST / gRPC / mTLS',
        flow.async ? 'Asynchronous Event Pipeline' : 'Synchronous API Call',
      ],
      sourceRefs: [flow.from, flow.to],
    };
  });

  return {
    sectionId,
    paragraphs: [
      {
        text: `The platform architecture enforces ${model.flows.length} integrated service-to-service communication contracts, API interfaces, and enterprise event streams across VPC-SC network boundaries.`,
        sourceRefs: representativeFlows.map((f) => `${f.from}->${f.to}`),
      },
    ],
    bullets: [],
    table: {
      headers: ['Initiating Service / Source', 'Target Service / Destination', 'Interface Scope & Payload Contract', 'Protocol & Security', 'Execution Pattern'],
      rows,
    },
  };
};

export const userStoriesMapper: DerivationMapperFn = (model, sectionId = 'functional_flows') => {
  const bullets: ProvenanceText[] = [];

  if (model.actors.length > 0) {
    for (const actor of model.actors.slice(0, 4)) {
      const actorFlows = model.flows.filter((f) => f.from === actor.id);
      const topFlow = actorFlows[0];
      const targetName = topFlow ? getComponentName(model, topFlow.to) : 'Agent Orchestration Service';
      const goal = topFlow?.label || `execute governed cognitive workflows through ${targetName}`;
      bullets.push({
        text: `**${actor.label} Workflow:** Initiates ${goal} to interact with ${targetName} under deterministic audit and policy controls.`,
        sourceRefs: [actor.id],
      });
    }
  }

  if (bullets.length === 0) {
    for (const flow of model.flows.slice(0, 5)) {
      bullets.push({
        text: `**${getComponentName(model, flow.from)} ➔ ${getComponentName(model, flow.to)}:** ${flow.label || 'End-to-end multi-step orchestration and event dispatch'}.`,
        sourceRefs: [flow.from, flow.to],
      });
    }
  }

  return {
    sectionId,
    paragraphs: [
      {
        text: `Core operational user scenarios and functional component interaction flows derived from the live system topology:`,
        sourceRefs: [],
      },
    ],
    bullets,
  };
};

export const acceptanceCriteriaMapper: DerivationMapperFn = (model, sectionId = 'acceptance_criteria') => {
  const bullets: ProvenanceText[] = [];

  for (const trans of model.transitions) {
    const fromName = getComponentName(model, trans.from);
    const toName = getComponentName(model, trans.to);
    if (trans.gate) {
      bullets.push({
        text: `Given state "${fromName}", when condition "${trans.gate}" evaluates to true, then system transitions to "${toName}".`,
        sourceRefs: [trans.from, trans.to],
      });
    } else {
      bullets.push({
        text: `Given lifecycle phase "${fromName}", the system transitions deterministically to "${toName}".`,
        sourceRefs: [trans.from, trans.to],
      });
    }
  }

  if (bullets.length === 0) {
    for (const flow of model.flows.slice(0, 6)) {
      bullets.push({
        text: `Given operational component "${getComponentName(model, flow.from)}", when request "${flow.label || 'invocation'}" occurs, then "${getComponentName(model, flow.to)}" must process and acknowledge within SLA threshold.`,
        sourceRefs: [flow.from, flow.to],
      });
    }
  }

  return {
    sectionId,
    paragraphs: [
      {
        text: `Verifiable Given-When-Then acceptance criteria governing state transitions and interface interactions:`,
        sourceRefs: [],
      },
    ],
    bullets,
  };
};

export const epicsFromStagesMapper: DerivationMapperFn = (model, sectionId = 'epics') => {
  const bullets: ProvenanceText[] = [];
  const stages = model.tiers.filter((t) => t.kind === 'stage' || t.label.toLowerCase().includes('phase'));
  const targetTiers = stages.length > 0 ? stages : model.tiers;

  for (const stage of targetTiers) {
    const comps = model.components.filter((c) => c.tier === stage.id);
    const topComps = comps.slice(0, 4).map((c) => c.label);
    const remainingCount = comps.length - topComps.length;
    const compsSummary =
      remainingCount > 0
        ? `${topComps.join(', ')} and ${remainingCount} supporting subsystems`
        : topComps.join(', ');
    bullets.push({
      text: `**EPIC — ${stage.label} Capability**: Implements ${comps.length} governed service components including ${compsSummary}.`,
      sourceRefs: [stage.id, ...comps.map((c) => c.id)],
    });
  }

  return {
    sectionId,
    paragraphs: [{ text: `High-level functional epics organized by architectural subsystem tier:`, sourceRefs: [] }],
    bullets,
  };
};

export const personasFromActorsMapper: DerivationMapperFn = (model, sectionId = 'personas') => {
  const bullets: ProvenanceText[] = [];
  for (const actor of model.actors) {
    bullets.push({
      text: `Persona [${actor.label}]: External or system actor engaging via ${model.flows.filter((f) => f.from === actor.id).length} interface channel(s).`,
      sourceRefs: [actor.id],
    });
  }
  if (bullets.length === 0) {
    bullets.push({
      text: `Default Persona [System Operator]: Governs operations across ${model.components.length} infrastructure components.`,
      sourceRefs: [],
    });
  }
  return {
    sectionId,
    paragraphs: [{ text: `System actors and operational personas:`, sourceRefs: [] }],
    bullets,
  };
};

export const nfrsFromGovernanceMapper: DerivationMapperFn = (model, sectionId = 'nfrs') => {
  const bullets: ProvenanceText[] = [];
  const govNodes = model.components.filter((c) =>
    c.label.toLowerCase().includes('governance') ||
    c.label.toLowerCase().includes('audit') ||
    c.label.toLowerCase().includes('security') ||
    c.label.toLowerCase().includes('compliance')
  );
  for (const gov of govNodes) {
    bullets.push({
      text: `Non-Functional Constraint [${gov.label}]: Policy/security invariant enforced within subsystem "${getTierName(model, gov.tier || '')}".`,
      sourceRefs: [gov.id],
    });
  }
  bullets.push({
    text: `Availability SLA: System components (${model.components.length} total) must maintain >= 99.9% uptime.`,
    sourceRefs: [],
  });
  return {
    sectionId,
    paragraphs: [{ text: `Non-functional requirements and governance rules:`, sourceRefs: [] }],
    bullets,
  };
};

export const trustBoundaryCrossingsMapper: DerivationMapperFn = (model, sectionId = 'trust_boundaries') => {
  const bullets: ProvenanceText[] = [];
  const tableRows: TableRow[] = [];
  for (const flow of model.flows) {
    const fromComp = model.components.find((c) => c.id === flow.from);
    const toComp = model.components.find((c) => c.id === flow.to);
    if (fromComp && toComp && fromComp.tier !== toComp.tier) {
      bullets.push({
        text: `Cross-Boundary Data Crossing: Flow "${flow.label || 'Data Transit'}" crosses tier boundary from "${getTierName(model, fromComp.tier || '')}" to "${getTierName(model, toComp.tier || '')}".`,
        sourceRefs: [flow.from, flow.to],
      });
      tableRows.push({
        cells: [
          flow.label || 'Data Flow',
          getTierName(model, fromComp.tier || ''),
          getTierName(model, toComp.tier || ''),
          `${fromComp.label} ➔ ${toComp.label}`,
        ],
        sourceRefs: [flow.from, flow.to],
      });
    }
  }
  return {
    sectionId,
    paragraphs: [{ text: `Security trust-boundary network crossings:`, sourceRefs: [] }],
    bullets,
    table: {
      headers: ['Data Flow / Signal', 'Source Tier', 'Destination Tier', 'Crossing Components'],
      rows: tableRows,
    },
  };
};

export const assumptionsMapper: DerivationMapperFn = (model, sectionId = 'assumptions') => {
  return {
    sectionId,
    paragraphs: [
      { text: `System assumptions derived from diagram boundaries and network topologies:`, sourceRefs: [] },
    ],
    bullets: [
      { text: `Assumes deployment across ${model.tiers.length} distinct infrastructure network tiers.`, sourceRefs: [] },
      { text: `Assumes communication between components adheres to extracted flow protocols.`, sourceRefs: [] },
    ],
  };
};

export const MAPPER_REGISTRY: Record<string, DerivationMapperFn> = {
  componentDescriptions: componentDescriptionsMapper,
  interfaceInventory: interfaceInventoryMapper,
  userStories: userStoriesMapper,
  acceptanceCriteria: acceptanceCriteriaMapper,
  epicsFromStages: epicsFromStagesMapper,
  personasFromActors: personasFromActorsMapper,
  nfrsFromGovernance: nfrsFromGovernanceMapper,
  trustBoundaryCrossings: trustBoundaryCrossingsMapper,
  assumptionsMapper: assumptionsMapper,
};
