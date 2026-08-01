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
  const bullets: ProvenanceText[] = [];
  const tableRows: TableRow[] = [];

  const activeTiers = model.tiers.filter((tier) =>
    model.components.some((c) => c.tier === tier.id)
  );

  if (activeTiers.length > 0) {
    paragraphs.push({
      text: `The system architecture is organized across ${activeTiers.length} functional subsystem tiers comprising ${model.components.length} operational components.`,
      sourceRefs: activeTiers.map((t) => t.id),
    });
  } else if (model.components.length > 0) {
    paragraphs.push({
      text: `The architecture defines ${model.components.length} operational software and infrastructure components.`,
      sourceRefs: model.components.map((c) => c.id),
    });
  }

  for (const comp of model.components) {
    const tierName = comp.tier ? getTierName(model, comp.tier) : 'Core Subsystem';
    const inbound = model.flows.filter((f) => f.to === comp.id);
    const outbound = model.flows.filter((f) => f.from === comp.id);

    const interactions: string[] = [];
    if (inbound.length > 0) {
      interactions.push(`Inbound from ${inbound.map((f) => getComponentName(model, f.from)).join(', ')}`);
    }
    if (outbound.length > 0) {
      interactions.push(`Outbound to ${outbound.map((f) => getComponentName(model, f.to)).join(', ')}`);
    }
    const flowDesc = interactions.length > 0 ? interactions.join(' | ') : 'Internal processing / standalone node';

    tableRows.push({
      cells: [
        comp.label,
        tierName,
        comp.type || 'Service Component',
        comp.subtitle || 'Operational component',
        flowDesc,
      ],
      sourceRefs: [comp.id],
    });

    const subText = comp.subtitle ? ` (${comp.subtitle})` : '';
    bullets.push({
      text: `${comp.label}${subText} — Deployed in "${tierName}" tier. ${flowDesc}.`,
      sourceRefs: [comp.id],
    });
  }

  return {
    sectionId,
    paragraphs,
    bullets,
    table: {
      headers: ['Component Name', 'Subsystem / Tier', 'Type', 'Description / Role', 'Interactions & Communication'],
      rows: tableRows,
    },
  };
};

export const interfaceInventoryMapper: DerivationMapperFn = (model, sectionId = 'interfaces') => {
  const rows: TableRow[] = model.flows.map((flow) => {
    const consumer = getComponentName(model, flow.from);
    const provider = getComponentName(model, flow.to);
    return {
      cells: [
        consumer,
        provider,
        flow.label || 'Data / Event Exchange',
        flow.protocol || 'HTTPS / REST / gRPC',
        flow.async ? 'Asynchronous Event' : 'Synchronous Request',
      ],
      sourceRefs: [flow.from, flow.to],
    };
  });

  return {
    sectionId,
    paragraphs: [
      {
        text: `The architecture specifies ${model.flows.length} integrated service-to-service communication contracts and data exchange interfaces derived directly from system topology.`,
        sourceRefs: model.flows.map((f) => `${f.from}->${f.to}`),
      },
    ],
    bullets: [],
    table: {
      headers: ['Consumer / Source', 'Provider / Destination', 'Interface Purpose & Data Exchange', 'Protocol', 'Execution Pattern'],
      rows,
    },
  };
};

export const userStoriesMapper: DerivationMapperFn = (model, sectionId = 'functional_flows') => {
  const bullets: ProvenanceText[] = [];

  if (model.actors.length > 0) {
    for (const actor of model.actors) {
      const actorFlows = model.flows.filter((f) => f.from === actor.id);
      for (const flow of actorFlows) {
        const targetName = getComponentName(model, flow.to);
        const goal = flow.label || `execute operational requests against ${targetName}`;
        bullets.push({
          text: `As a ${actor.label}, I want to ${goal} so that end-to-end processing is executed reliably through ${targetName}.`,
          sourceRefs: [actor.id, flow.to],
        });
      }
    }
  }

  if (bullets.length === 0) {
    for (const flow of model.flows) {
      bullets.push({
        text: `As ${getComponentName(model, flow.from)}, I want to communicate with ${getComponentName(model, flow.to)} (${flow.label || 'service request'}) to complete processing.`,
        sourceRefs: [flow.from, flow.to],
      });
    }
  }

  return {
    sectionId,
    paragraphs: [
      {
        text: `Functional sequence scenarios and user/system interaction flows extracted mechanically from visual graph connectors:`,
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
    for (const flow of model.flows) {
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
    bullets.push({
      text: `EPIC [${stage.label}]: Deliver capability across ${comps.length} architectural component(s): ${comps.map((c) => c.label).join(', ')}.`,
      sourceRefs: [stage.id, ...comps.map((c) => c.id)],
    });
  }

  return {
    sectionId,
    paragraphs: [{ text: `High-level capability epics organized by system stage:`, sourceRefs: [] }],
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
