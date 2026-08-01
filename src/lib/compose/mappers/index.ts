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

  for (const tier of model.tiers) {
    const tierComponents = model.components.filter((c) => c.tier === tier.id);
    paragraphs.push({
      text: `Tier "${tier.label}" (${tier.kind.toUpperCase()}) contains ${tierComponents.length} operational component(s).`,
      sourceRefs: [tier.id],
    });

    for (const comp of tierComponents) {
      const inbound = model.flows.filter((f) => f.to === comp.id);
      const outbound = model.flows.filter((f) => f.from === comp.id);

      const refs = [comp.id, ...inbound.map((f) => `${f.from}->${f.to}`), ...outbound.map((f) => `${f.from}->${f.to}`)];
      const sub = comp.subtitle ? ` (${comp.subtitle})` : '';

      let text = `[Component] ${comp.label}${sub}: Primary type is ${comp.type || 'service component'}.`;
      if (inbound.length > 0) {
        const desc = inbound
          .map((f) => `receives ${f.protocol ? `*${f.protocol}* ` : ''}${f.label ? `"${f.label}" ` : ''}from ${getComponentName(model, f.from)}`)
          .join('; ');
        text += ` Inbound: ${desc}.`;
      }
      if (outbound.length > 0) {
        const desc = outbound
          .map((f) => `transmits ${f.protocol ? `*${f.protocol}* ` : ''}${f.label ? `"${f.label}" ` : ''}to ${getComponentName(model, f.to)}`)
          .join('; ');
        text += ` Outbound: ${desc}.`;
      }

      bullets.push({ text, sourceRefs: refs });
    }
  }

  return { sectionId, paragraphs, bullets };
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
        flow.protocol || 'HTTPS/REST',
        flow.async ? 'Asynchronous' : 'Synchronous',
      ],
      sourceRefs: [flow.from, flow.to],
    };
  });

  return {
    sectionId,
    paragraphs: [
      {
        text: `The system defines ${model.flows.length} distinct service interfaces and communication channels extracted directly from graph connectors.`,
        sourceRefs: model.flows.map((f) => `${f.from}->${f.to}`),
      },
    ],
    bullets: [],
    table: {
      headers: ['Consumer (Source)', 'Provider (Target)', 'Interface / Purpose', 'Protocol', 'Execution Mode'],
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
        const goal = flow.label || `interact with ${targetName}`;
        bullets.push({
          text: `As a ${actor.label}, I want to ${goal} so that I can execute system operations against ${targetName}.`,
          sourceRefs: [actor.id, flow.to],
        });
      }
    }
  }

  // Fallback to flow stories if no actors explicit
  if (bullets.length === 0) {
    for (const flow of model.flows) {
      bullets.push({
        text: `As a system consumer (${getComponentName(model, flow.from)}), I want to call ${getComponentName(model, flow.to)} (${flow.label || 'service request'}) so that processing completes.`,
        sourceRefs: [flow.from, flow.to],
      });
    }
  }

  return {
    sectionId,
    paragraphs: [
      {
        text: `Functional interactions and actor-initiated flows derived mechanically from graph connectors.`,
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
        text: `Given state "${fromName}", when transition condition "${trans.gate}" is satisfied, then system advances to state "${toName}".`,
        sourceRefs: [trans.from, trans.to],
      });
    } else {
      bullets.push({
        text: `Given lifecycle phase "${fromName}", system transitions deterministically to "${toName}".`,
        sourceRefs: [trans.from, trans.to],
      });
    }
  }

  // Fallback to flow acceptance criteria if state transitions empty
  if (bullets.length === 0) {
    for (const flow of model.flows) {
      bullets.push({
        text: `Given component "${getComponentName(model, flow.from)}", when request "${flow.label || 'invocation'}" occurs, then "${getComponentName(model, flow.to)}" must respond successfully.`,
        sourceRefs: [flow.from, flow.to],
      });
    }
  }

  return {
    sectionId,
    paragraphs: [
      {
        text: `Gated state transitions and functional acceptance criteria extracted from state machine edges.`,
        sourceRefs: model.transitions.map((t) => `${t.from}->${t.to}`),
      },
    ],
    bullets,
  };
};

export const epicsFromStagesMapper: DerivationMapperFn = (model, sectionId = 'epics') => {
  const bullets: ProvenanceText[] = [];

  for (const tier of model.tiers) {
    const memberComps = model.components.filter((c) => c.tier === tier.id);
    const compNames = memberComps.map((c) => c.label).join(', ');
    bullets.push({
      text: `Epic [${tier.label}]: Encompasses functional capabilities (${compNames || 'Core Services'}).`,
      sourceRefs: [tier.id, ...memberComps.map((c) => c.id)],
    });
  }

  return {
    sectionId,
    paragraphs: [
      {
        text: `Product Epics mapped directly to architectural tiers and platform stages.`,
        sourceRefs: model.tiers.map((t) => t.id),
      },
    ],
    bullets,
  };
};

export const personasFromActorsMapper: DerivationMapperFn = (model, sectionId = 'personas') => {
  const bullets: ProvenanceText[] = [];

  for (const actor of model.actors) {
    const connectedFlows = model.flows.filter((f) => f.from === actor.id || f.to === actor.id);
    const touchpoints = Array.from(
      new Set(connectedFlows.map((f) => (f.from === actor.id ? getComponentName(model, f.to) : getComponentName(model, f.from))))
    );

    bullets.push({
      text: `Persona "${actor.label}": Primary interaction touchpoints include ${touchpoints.join(', ') || 'System Interface'}. [Further demographic & behavioral detail is human-managed]`,
      sourceRefs: [actor.id],
    });
  }

  if (bullets.length === 0) {
    bullets.push({
      text: `Persona "System API Consumer": Interacts with primary platform edge gateways.`,
      sourceRefs: [],
    });
  }

  return {
    sectionId,
    paragraphs: [
      {
        text: `Target user personas derived from actor nodes and client-tier entry points.`,
        sourceRefs: model.actors.map((a) => a.id),
      },
    ],
    bullets,
  };
};

export const nfrsFromGovernanceMapper: DerivationMapperFn = (model, sectionId = 'nfrs') => {
  const bullets: ProvenanceText[] = [];

  const govComps = model.components.filter(
    (c) => c.type === 'security' || /\b(auth|iam|security|governance|audit|vpc|firewall|rls)\b/i.test(c.label)
  );

  for (const comp of govComps) {
    bullets.push({
      text: `Security & Compliance Control "${comp.label}": Enforces zero-trust isolation, continuous audit trail logging, and policy compliance in tier "${getTierName(model, comp.tier)}".`,
      sourceRefs: [comp.id],
    });
  }

  // Ensure baseline NFRs exist with sourceRefs
  bullets.push({
    text: `Data Protection & Encryption: All inter-service communications enforce mTLS / TLS 1.3 encryption in transit.`,
    sourceRefs: model.flows.map((f) => `${f.from}->${f.to}`),
  });

  return {
    sectionId,
    paragraphs: [
      {
        text: `Non-functional requirements and governance controls mechanically derived from security nodes and policies.`,
        sourceRefs: govComps.map((c) => c.id),
      },
    ],
    bullets,
  };
};

export const trustBoundaryCrossingsMapper: DerivationMapperFn = (model, sectionId = 'trust_boundaries') => {
  const rows: TableRow[] = [];

  for (const flow of model.flows) {
    const sourceComp = model.components.find((c) => c.id === flow.from);
    const targetComp = model.components.find((c) => c.id === flow.to);

    if (sourceComp && targetComp && sourceComp.tier !== targetComp.tier) {
      const sourceTier = getTierName(model, sourceComp.tier);
      const targetTier = getTierName(model, targetComp.tier);
      rows.push({
        cells: [
          `${sourceComp.label} (${sourceTier})`,
          `${targetComp.label} (${targetTier})`,
          flow.label || 'Cross-Zone Flow',
          flow.protocol || 'TLS 1.3',
          'Inter-Tier Boundary Crossing',
        ],
        sourceRefs: [flow.from, flow.to],
      });
    }
  }

  return {
    sectionId,
    paragraphs: [
      {
        text: `Identified ${rows.length} inter-tier trust boundary crossings that require perimeter inspection and STRIDE threat analysis.`,
        sourceRefs: [],
      },
    ],
    bullets: [],
    table: {
      headers: ['Source Component (Tier)', 'Target Component (Tier)', 'Flow Label', 'Protocol', 'Boundary Class'],
      rows,
    },
  };
};

export const assumptionsMapper: DerivationMapperFn = (model, sectionId = 'assumptions') => {
  const assumptions = model.assumptions || [
    'Derived diagrams describe what is designed, not what was excluded; absence of a capability here is not a scope decision.',
  ];

  return {
    sectionId,
    paragraphs: assumptions.map((text) => ({ text, sourceRefs: ['system_model'] })),
    bullets: [],
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
