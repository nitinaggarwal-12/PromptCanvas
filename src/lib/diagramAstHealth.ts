import { validateDrawioXml, type ValidationResult } from './validate/validator';
import {
  clusterCompositeCards,
  parseDrawioXmlSpatialState,
} from './freeform/directDrawioSpatialMutator';

export type DiagramDomainKind =
  | 'cloud_infrastructure'
  | 'agentic_ai'
  | 'data_medallion'
  | 'uml_erd_schema'
  | 'sequence_state_flow'
  | 'executive_overview';

export type AuditDimensionCategory = 'security' | 'visual' | 'topology' | 'responsive' | 'accessibility' | 'vendor';

export interface HonestAstIssue {
  category: AuditDimensionCategory;
  severity: 'ERROR' | 'WARNING';
  code: string;
  cellId?: string;
  message: string;
}

export interface HonestAuditDimension {
  category: AuditDimensionCategory;
  name: string;
  score: number;
  status: 'passed' | 'warning' | 'critical';
  summary: string;
  recommendations: string[];
  evaluationSource: 'deterministic_ast' | 'live_multi_model_judge';
}

export function classifyDiagramDomainKind(xmlContent: string, promptText = ''): DiagramDomainKind {
  const combined = `${promptText}\n${(xmlContent || '').slice(0, 12000)}`.toLowerCase();
  if (
    /\b(erd|crow'?s[- ]foot|entity[- ]relationship|uml class|class diagram|primary key|foreign key|\bpk\b|\bfk\b|star schema|fact_|dim_)\b/.test(
      combined
    )
  ) {
    return 'uml_erd_schema';
  }
  if (
    /\b(sequence diagram|lifeline|state machine|finite state|fsm|state transition|bpmn|swimlane process)\b/.test(
      combined
    )
  ) {
    return 'sequence_state_flow';
  }
  if (/\b(medallion|bronze|silver|gold|lakehouse|iceberg|bigquery|dataflow|dbt|etl|elt)\b/.test(combined)) {
    return 'data_medallion';
  }
  if (/\b(agent|adk|mcp|a2a|rag|llm|gemini|vertex ai|langgraph|react loop|guardrail|model armor)\b/.test(combined)) {
    return 'agentic_ai';
  }
  if (/\b(vpc|gke|cloud run|spanner|alloydb|kubernetes|load balanc|gclb|cloud armor|interconnect|psc|aws|azure)\b/.test(combined)) {
    return 'cloud_infrastructure';
  }
  return 'executive_overview';
}

/**
 * Pure deterministic, zero-floor, honest 6-dimension XML health computation.
 * Safe in both server routes and browser React views (zero fake numbers, zero 85%/50% floors).
 */
export function computeHonestDiagramHealth(
  xmlContent: string,
  promptText = ''
): {
  isBlank: boolean;
  isStub: boolean;
  overall: number;
  scores: Record<AuditDimensionCategory, number>;
  issues: HonestAstIssue[];
  domainKind: DiagramDomainKind;
  validation: ValidationResult;
  dimensions: HonestAuditDimension[];
  inventory: {
    zoneCount: number;
    cardCount: number;
    edgeCount: number;
    overlapCount: number;
    intersectingEdgeCount: number;
    danglingEdgeCount: number;
    contrastErrorCount: number;
    brokenImageCount: number;
  };
  compactInventoryJson: string;
} {
  if (!xmlContent || !xmlContent.trim() || xmlContent.includes('data-blank-canvas="true"')) {
    const emptyVal = validateDrawioXml(xmlContent || '');
    const zeroDims: HonestAuditDimension[] = [
      {
        category: 'security',
        name: 'Security & Domain Invariants',
        score: 0,
        status: 'critical',
        summary: 'Empty canvas: 0 components and 0 boundaries present.',
        recommendations: ['Synthesize or select a template to evaluate architecture controls.'],
        evaluationSource: 'deterministic_ast',
      },
      {
        category: 'visual',
        name: 'Visual Layout & Geometry',
        score: 0,
        status: 'critical',
        summary: 'Empty canvas: 0 bounding boxes and 0 connectors.',
        recommendations: ['Add architecture tiers and components.'],
        evaluationSource: 'deterministic_ast',
      },
      {
        category: 'topology',
        name: 'Topology & Connectivity',
        score: 0,
        status: 'critical',
        summary: 'Empty canvas: 0 directed flows or relationships.',
        recommendations: ['Connect ingress, processing, and persistence nodes.'],
        evaluationSource: 'deterministic_ast',
      },
      {
        category: 'responsive',
        name: 'Viewport & Boundary Fit',
        score: 0,
        status: 'critical',
        summary: 'Empty canvas (0 rendered elements).',
        recommendations: ['Populate 16:9 canvas bounds.'],
        evaluationSource: 'deterministic_ast',
      },
      {
        category: 'accessibility',
        name: 'WCAG Contrast & Legibility',
        score: 0,
        status: 'critical',
        summary: '0 text labels rendered.',
        recommendations: ['Add high-contrast labeled cards (>= 4.5:1 WCAG AA).'],
        evaluationSource: 'deterministic_ast',
      },
      {
        category: 'vendor',
        name: 'Icons & Asset Integrity',
        score: 0,
        status: 'critical',
        summary: '0 vector icons or notation primitives present.',
        recommendations: ['Attach verified SVG icons or standard UML/ERD notation.'],
        evaluationSource: 'deterministic_ast',
      },
    ];
    return {
      isBlank: true,
      isStub: false,
      overall: 0,
      scores: {
        security: 0,
        visual: 0,
        topology: 0,
        responsive: 0,
        accessibility: 0,
        vendor: 0,
      },
      issues: [],
      domainKind: 'executive_overview',
      validation: emptyVal,
      dimensions: zeroDims,
      inventory: {
        zoneCount: 0,
        cardCount: 0,
        edgeCount: 0,
        overlapCount: 0,
        intersectingEdgeCount: 0,
        danglingEdgeCount: 0,
        contrastErrorCount: 0,
        brokenImageCount: 0,
      },
      compactInventoryJson: '{}',
    };
  }

  const domainKind = classifyDiagramDomainKind(xmlContent, promptText);
  const validation = validateDrawioXml(xmlContent);
  const state = parseDrawioXmlSpatialState(xmlContent);
  const clustered = clusterCompositeCards(state);

  const zoneCount = clustered.zones.length;
  const cardCount = clustered.cards.length;
  const edgeCount = state.edges.length;
  const isStub = cardCount < 3 || (edgeCount < 2 && cardCount < 5);

  const countCode = (code: string) => validation.errors.filter((e) => e.code === code).length;
  const countWarn = (code: string) => validation.warnings.filter((w) => w.code === code).length;

  const overlapCount = countCode('OVERLAP');
  const intersectingEdgeCount = countCode('EDGE_INTERSECTS_VERTEX') + countCode('CONTAINER_HEADER_SLICED');
  const nonOrthoCount = countCode('NON_ORTHOGONAL_EDGE_SEGMENT');
  const outOfContainerCount = countCode('OUT_OF_CONTAINER');
  const textOverflowCount = countCode('TEXT_OVERFLOW_HEIGHT');
  const fosterCount = countCode('HTML_FOSTER_PARENTING_IN_TABLE');

  const danglingEdgeCount = countCode('EDGE_DANGLING');
  const orphanCount = countCode('ORPHAN_NODE');
  const disconnectedStoreCount = countCode('DATA_STORE_DISCONNECTED') + countCode('UNCONNECTED_LOAD_BALANCER');
  const backtrackCount = countCode('FLOW_BACKTRACKING_DETECTED') + countCode('CLOSED_LOOP_MISSING_EDGE');

  const outOfBoundsCount = countCode('OUT_OF_BOUNDS');
  const contrastErrorCount = countCode('LOW_COLOR_CONTRAST');
  const contrastWarnCount = countWarn('LOW_COLOR_CONTRAST');
  const pseudoTagWarnCount = countWarn('UNESCAPED_PSEUDO_HTML_TAG');
  const brokenImageCount = countCode('BROKEN_IMAGE_ASSET');

  const rawVisual =
    100 -
    overlapCount * 14 -
    intersectingEdgeCount * 10 -
    nonOrthoCount * 10 -
    outOfContainerCount * 10 -
    textOverflowCount * 5 -
    fosterCount * 15;
  const visualScore = isStub ? Math.min(35, Math.max(0, rawVisual)) : Math.max(0, rawVisual);
  const visualRecs: string[] = [];
  if (overlapCount > 0) visualRecs.push(`Resolve ${overlapCount} overlapping component bounding box pair(s).`);
  if (intersectingEdgeCount > 0) visualRecs.push(`Reroute ${intersectingEdgeCount} connector(s) slicing across unrelated cards or container headers.`);
  if (nonOrthoCount > 0) visualRecs.push(`Convert ${nonOrthoCount} slanted diagonal connector(s) to 90-degree orthogonal routing.`);
  if (outOfContainerCount > 0) visualRecs.push(`Expand parent container bounds for ${outOfContainerCount} overflowing child node(s).`);

  const rawTopo =
    100 -
    danglingEdgeCount * 18 -
    orphanCount * 8 -
    disconnectedStoreCount * 14 -
    backtrackCount * 8 -
    (edgeCount === 0 ? 60 : 0);
  const topoScore = isStub ? Math.min(30, Math.max(0, rawTopo)) : Math.max(0, rawTopo);
  const topoRecs: string[] = [];
  if (danglingEdgeCount > 0) topoRecs.push(`Repair ${danglingEdgeCount} dangling connector endpoint(s).`);
  if (orphanCount > 0) topoRecs.push(`Wire ${orphanCount} disconnected component(s) into the end-to-end flow.`);
  if (disconnectedStoreCount > 0) topoRecs.push(`Connect isolated data stores / load balancers to upstream & downstream services.`);

  let maxRight = 0;
  let maxBottom = 0;
  let minLeft = Infinity;
  let minTop = Infinity;
  for (const c of state.cells) {
    maxRight = Math.max(maxRight, c.absX + c.w);
    maxBottom = Math.max(maxBottom, c.absY + c.h);
    minLeft = Math.min(minLeft, c.absX);
    minTop = Math.min(minTop, c.absY);
  }
  const negPenalty = (minLeft < 0 ? 20 : 0) + (minTop < 0 ? 20 : 0);
  const rightOverflowPx = Math.max(0, maxRight - Math.max(state.canvasW, 1640));
  const bottomOverflowPx = Math.max(0, maxBottom - Math.max(state.canvasH, 1100));
  const overflowPenalty =
    (rightOverflowPx > 20 ? Math.min(35, Math.ceil(rightOverflowPx / 30) * 5) : 0) +
    (bottomOverflowPx > 20 ? Math.min(25, Math.ceil(bottomOverflowPx / 40) * 5) : 0) +
    outOfBoundsCount * 15;
  const respScore = isStub
    ? Math.min(45, Math.max(0, 100 - negPenalty - overflowPenalty))
    : Math.max(0, 100 - negPenalty - overflowPenalty);
  const respRecs: string[] = [];
  if (minLeft < 0 || minTop < 0) respRecs.push(`Shift negative coordinates (min=[${Math.round(minLeft)}, ${Math.round(minTop)}]) inside positive canvas margins.`);
  if (rightOverflowPx > 20 || bottomOverflowPx > 20) {
    respRecs.push(`Expand pageWidth/pageHeight or compact layout to fit [${Math.round(maxRight)}x${Math.round(maxBottom)}]px content.`);
  }

  const microFontMatches = (xmlContent.match(/font-size:\s*[1-7](?:\.\d+)?px|fontSize=[1-7]\b/gi) || []).length;
  const rawAcc =
    100 -
    contrastErrorCount * 18 -
    contrastWarnCount * 6 -
    pseudoTagWarnCount * 8 -
    microFontMatches * 5;
  const accScore = isStub ? Math.min(50, Math.max(0, rawAcc)) : Math.max(0, rawAcc);
  const accRecs: string[] = [];
  if (contrastErrorCount + contrastWarnCount > 0) {
    accRecs.push(`Increase text/fill contrast to >= 4.5:1 WCAG AA on ${contrastErrorCount + contrastWarnCount} node(s).`);
  }
  if (pseudoTagWarnCount > 0) {
    accRecs.push(`HTML-escape angle-bracket type tokens (&lt;...&gt;) on ${pseudoTagWarnCount} html=1 node(s) so tags are not swallowed.`);
  }
  if (microFontMatches > 0) {
    accRecs.push(`Upgrade ${microFontMatches} sub-8px micro-font label(s) to >= 9.5px.`);
  }

  const iconCellCount = state.cells.filter(
    (c) =>
      c.style.includes('image=data:image/') ||
      c.style.includes('shape=mxgraph.') ||
      c.value.includes('<img ') ||
      c.value.includes('<svg')
  ).length;
  const expectsCloudIcons =
    domainKind === 'cloud_infrastructure' ||
    domainKind === 'agentic_ai' ||
    domainKind === 'data_medallion';
  const iconCoverageRatio = cardCount > 0 ? Math.min(1, iconCellCount / Math.max(1, Math.round(cardCount * 0.5))) : 0;
  const missingIconPenalty = expectsCloudIcons ? Math.round((1 - iconCoverageRatio) * 20) : 0;
  const rawVendor = 100 - brokenImageCount * 25 - missingIconPenalty;
  const vendorScore = isStub ? Math.min(40, Math.max(0, rawVendor)) : Math.max(0, rawVendor);
  const vendorRecs: string[] = [];
  if (brokenImageCount > 0) {
    vendorRecs.push(`Replace ${brokenImageCount} broken or unresolvable external image URL(s) with inline data:image/svg+xml assets.`);
  }
  if (expectsCloudIcons && iconCoverageRatio < 0.6) {
    vendorRecs.push(`Bind official vector service icons across remaining unbadged infrastructure cards (${iconCellCount} icon(s) across ${cardCount} card(s)).`);
  }

  const lowerXml = xmlContent.toLowerCase();
  let secScore = 100;
  const secRecs: string[] = [];
  let secSummary = '';

  if (domainKind === 'uml_erd_schema') {
    const hasKeys = /\b(pk|fk|primary key|foreign key|id\b|uuid|int|varchar|timestamp)\b/i.test(xmlContent);
    const hasRelationships = edgeCount >= 2;
    if (!hasKeys) {
      secScore -= 20;
      secRecs.push('Annotate entity attributes with explicit Primary Key (PK), Foreign Key (FK), and column types.');
    }
    if (!hasRelationships) {
      secScore -= 25;
      secRecs.push('Define cardinality connectors between related schema entities.');
    }
    secSummary = `Evaluated schema/UML invariants (${cardCount} entities/classes, ${edgeCount} relationships${hasKeys ? ', PK/FK typed attributes present' : ', missing explicit PK/FK annotations'}).`;
  } else if (domainKind === 'sequence_state_flow') {
    const hasGuardsOrLabels = state.edges.filter((e) => e.plainLabel.trim().length > 0).length >= Math.min(2, edgeCount);
    const hasErrorOrTimeout = /\b(timeout|error|reject|retry|fail|cancel|dlq|fallback|guard|deny|invalid)\b/i.test(lowerXml);
    if (!hasGuardsOrLabels) {
      secScore -= 15;
      secRecs.push('Label transitions/messages with explicit trigger events, HTTP/RPC verbs, or guard conditions.');
    }
    if (!hasErrorOrTimeout) {
      secScore -= 12;
      secRecs.push('Model failure/timeout/rejection transition paths alongside the happy path.');
    }
    secSummary = `Evaluated behavioral flow invariants (${cardCount} states/actors, ${edgeCount} transitions${hasErrorOrTimeout ? ', error/guard path modeled' : ', happy-path only'}).`;
  } else {
    const hasEdgeAuth = /\b(waf|cloud armor|iap|oauth|oidc|iam|jwt|mtls|auth|api gateway|apigee|envoy|gclb)\b/i.test(lowerXml);
    const hasDataSec = /\b(kms|cmek|secret|dlp|model armor|guardrail|vpc-sc|perimeter|private|psc|encryption|audit|governance|policy)\b/i.test(lowerXml);
    const hasResilience = /\b(monitoring|logging|trace|otel|dlq|replica|multi-region|standby|failover|eval|quarantine|slo)\b/i.test(lowerXml);
    if (!hasEdgeAuth) {
      secScore -= 14;
      secRecs.push('Include explicit ingress authentication / WAF / IAM policy enforcement.');
    }
    if (!hasDataSec) {
      secScore -= 14;
      secRecs.push('Include data-plane security controls (VPC-SC / Private connectivity / KMS CMEK / Model Armor / Secret Manager).');
    }
    if (!hasResilience) {
      secScore -= 10;
      secRecs.push('Include observability, evaluation, or HA/DLQ resilience telemetry.');
    }
    secSummary = `Evaluated ${domainKind.replace(/_/g, ' ')} controls: ${hasEdgeAuth ? 'Ingress/IAM present' : 'Missing Ingress/IAM'}, ${hasDataSec ? 'Data/Boundary security present' : 'Missing Data/Boundary security'}, ${hasResilience ? 'Telemetry/Resilience present' : 'Missing Telemetry/Resilience'}.`;
  }
  if (isStub) secScore = Math.min(25, secScore);
  secScore = Math.max(0, secScore);

  const mkStatus = (s: number): 'passed' | 'warning' | 'critical' =>
    s >= 88 ? 'passed' : s >= 65 ? 'warning' : 'critical';

  const dimensions: HonestAuditDimension[] = [
    {
      category: 'security',
      name: 'Security & Domain Invariants',
      score: secScore,
      status: mkStatus(secScore),
      summary: secSummary,
      recommendations: secRecs,
      evaluationSource: 'deterministic_ast',
    },
    {
      category: 'visual',
      name: 'Visual Layout & Geometry',
      score: visualScore,
      status: mkStatus(visualScore),
      summary: `Inspected ${cardCount} composite/leaf cards, ${zoneCount} zones, and ${edgeCount} connectors (${overlapCount} overlap(s), ${intersectingEdgeCount} edge-card intersection(s), ${nonOrthoCount} non-orthogonal segment(s)).`,
      recommendations: visualRecs,
      evaluationSource: 'deterministic_ast',
    },
    {
      category: 'topology',
      name: 'Topology & Connectivity',
      score: topoScore,
      status: mkStatus(topoScore),
      summary: `Verified ${edgeCount} connectors across ${cardCount} components (${danglingEdgeCount} dangling, ${orphanCount} disconnected, ${disconnectedStoreCount} isolated store/LB).`,
      recommendations: topoRecs,
      evaluationSource: 'deterministic_ast',
    },
    {
      category: 'responsive',
      name: 'Viewport & Boundary Fit',
      score: respScore,
      status: mkStatus(respScore),
      summary: `Content bounds [${Math.round(minLeft === Infinity ? 0 : minLeft)}, ${Math.round(minTop === Infinity ? 0 : minTop)}] -> [${Math.round(maxRight)}, ${Math.round(maxBottom)}]px within ${state.canvasW}x${state.canvasH}px canvas.`,
      recommendations: respRecs,
      evaluationSource: 'deterministic_ast',
    },
    {
      category: 'accessibility',
      name: 'WCAG Contrast & Legibility',
      score: accScore,
      status: mkStatus(accScore),
      summary: `Evaluated W3C relative luminance & HTML label syntax (${contrastErrorCount} critical contrast error(s), ${contrastWarnCount} <4.5:1 warning(s), ${pseudoTagWarnCount} unescaped tag warning(s)).`,
      recommendations: accRecs,
      evaluationSource: 'deterministic_ast',
    },
    {
      category: 'vendor',
      name: 'Icons & Asset Integrity',
      score: vendorScore,
      status: mkStatus(vendorScore),
      summary: `Verified ${iconCellCount} vector icon/glyph cell(s) across ${cardCount} cards (${brokenImageCount} broken image URL(s)).`,
      recommendations: vendorRecs,
      evaluationSource: 'deterministic_ast',
    },
  ];

  const cardById = new Map(clustered.cards.map((c) => [c.id, c]));
  const zoneById = new Map(clustered.zones.map((z) => [z.id, z]));
  const resolveEndpointLabel = (id: string, pt?: { x: number; y: number }): string => {
    if (id) {
      const c = cardById.get(id);
      if (c) return `${c.id}("${c.label.slice(0, 60)}")`;
      const z = zoneById.get(id);
      if (z) return `${z.id}[Zone:"${z.label.slice(0, 50)}"]`;
      const raw = state.cells.find((x) => x.id === id);
      if (raw) return `${raw.id}("${(raw.plainLabel || raw.id).slice(0, 50)}")`;
    }
    if (pt) {
      const hit = clustered.cards.find(
        (c) =>
          pt.x >= c.rect[0] - 10 &&
          pt.x <= c.rect[0] + c.rect[2] + 10 &&
          pt.y >= c.rect[1] - 10 &&
          pt.y <= c.rect[1] + c.rect[3] + 10
      );
      if (hit) return `${hit.id}("${hit.label.slice(0, 60)}")`;
      return `@(${Math.round(pt.x)},${Math.round(pt.y)})`;
    }
    return id || 'unconnected';
  };

  const compactInventory = {
    title: state.title,
    canvas: [state.canvasW, state.canvasH],
    domainKind,
    zones: clustered.zones.slice(0, 40).map((z) => ({
      id: z.id,
      label: z.label.slice(0, 80),
      rect: z.rect,
    })),
    cards: clustered.cards.slice(0, 90).map((c) => ({
      id: c.id,
      label: c.label.slice(0, 110),
      zone: c.parentZoneId || '1',
      rect: c.rect,
    })),
    edges: state.edges.slice(0, 110).map((e) => ({
      id: e.id,
      from: resolveEndpointLabel(e.source, e.sourcePoint),
      to: resolveEndpointLabel(e.target, e.targetPoint),
      label: e.plainLabel.slice(0, 60),
      bidirectional: e.style.includes('startArrow=') && !e.style.includes('startArrow=none'),
      dashed: e.style.includes('dashed=1'),
    })),
    validatorErrors: validation.errors.slice(0, 20),
    validatorWarnings: validation.warnings.slice(0, 12),
  };

  const mapCodeToCategory = (code: string): AuditDimensionCategory => {
    if (code === 'LOW_COLOR_CONTRAST') return 'accessibility';
    if (code === 'BROKEN_IMAGE_ASSET' || code === 'UNESCAPED_PSEUDO_HTML_TAG') return 'vendor';
    if (code === 'EDGE_DANGLING' || code === 'ISOLATED_NODE') return 'topology';
    if (code === 'OUT_OF_VIEWPORT') return 'responsive';
    return 'visual';
  };

  const issues: HonestAstIssue[] = [
    ...validation.errors.map((e) => ({
      category: mapCodeToCategory(e.code),
      severity: 'ERROR' as const,
      code: e.code,
      cellId: e.cells?.[0],
      message: e.detail,
    })),
    ...validation.warnings.map((w) => ({
      category: mapCodeToCategory(w.code),
      severity: 'WARNING' as const,
      code: w.code,
      cellId: w.cells?.[0],
      message: w.detail,
    })),
  ];

  const scores: Record<AuditDimensionCategory, number> = {
    security: 0,
    visual: 0,
    topology: 0,
    responsive: 0,
    accessibility: 0,
    vendor: 0,
  };
  for (const dim of dimensions) {
    scores[dim.category] = dim.score;
  }
  const overall = Math.round(
    dimensions.reduce((sum, dim) => sum + dim.score, 0) / Math.max(1, dimensions.length)
  );

  return {
    isBlank: false,
    isStub,
    overall,
    scores,
    issues,
    domainKind,
    validation,
    dimensions,
    inventory: {
      zoneCount,
      cardCount,
      edgeCount,
      overlapCount,
      intersectingEdgeCount,
      danglingEdgeCount,
      contrastErrorCount,
      brokenImageCount,
    },
    compactInventoryJson: JSON.stringify(compactInventory, null, 2),
  };
}
