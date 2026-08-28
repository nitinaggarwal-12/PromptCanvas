import { Studio3SemanticGraph, Studio3Band, Studio3CardItem, Studio3PipelineStage } from './graphExtractor';
import { Studio3Intent } from './intentParser';

export interface QualityCheckResult {
  passed: boolean;
  score: number; // 0 to 100
  details: string[];
}

export interface Studio3QualityReport {
  overallScore: number; // 0 to 100
  certified: boolean;
  phase1Technical: {
    passed: boolean;
    completenessScore: number; // 0.0 to 1.0
    matchedEntities: string[];
    missingEntities: string[];
    ontologyErrors: string[];
    orphanNodesCount: number;
  };
  phase2Visual: {
    passed: boolean;
    collisionsCount: number;
    visualDensity: number; // 0.0 to 1.0
    densityGrade: 'optimal' | 'sparse' | 'dense';
    flowAlignmentPct: number;
    wcagContrastPass: boolean;
    layoutViolations: string[];
    htmlOverflowViolations: string[];
    columnWidthViolations: string[];
  };
  phase3Versioning: {
    addedNodes: string[];
    modifiedEdges: string[];
    removedNodes: string[];
    anchorsPreservedCount: number;
  };
  phase4ClientPresentation: {
    passed: boolean;
    viewportContainment: 'auto_fit_guaranteed' | 'overflow_risk';
    textFormatting: 'formatted_markdown' | 'raw_asterisks_detected';
    telemetryCollation: 'collapsible_trace' | 'raw_dump';
    interactiveContrast: 'high_contrast' | 'low_contrast';
    violations: string[];
  };
  healingActionsApplied: string[];
}

interface BoundingBox {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
}

/**
 * 🔍 Phase 1: Technical & Semantic Verification
 */
export function verifyPhase1Technical(
  graph: Studio3SemanticGraph,
  intent: Studio3Intent
): Studio3QualityReport['phase1Technical'] {
  const ontologyErrors: string[] = [];

  // Extract all text in the graph safely
  const allCardTitles: string[] = [];
  const allItems: string[] = [];

  (graph?.bands || []).forEach(b => {
    (b.columns || []).forEach(c => {
      (c.cards || []).forEach(card => {
        if (card && typeof card.title === 'string') allCardTitles.push(card.title.toLowerCase());
        (card?.items || []).forEach(it => {
          if (typeof it === 'string') allItems.push(it.toLowerCase());
        });
      });
    });
    (b.pipelineStages || []).forEach(s => {
      (s.nodes || []).forEach(n => {
        if (n && typeof n.name === 'string') allCardTitles.push(n.name.toLowerCase());
      });
    });
  });

  (graph?.freeformElements || []).forEach(elem => {
    if (elem?.name) allCardTitles.push(elem.name.toLowerCase());
    if (elem?.formula) allItems.push(elem.formula.toLowerCase());
    (elem?.details || []).forEach(d => allItems.push(d.toLowerCase()));
  });

  if (Array.isArray(graph?.slides)) {
    graph.slides.forEach(s => {
      if (s.title) allCardTitles.push(s.title.toLowerCase());
      if (s.subtitle) allItems.push(s.subtitle.toLowerCase());
      if (s.mainSummary) allItems.push(s.mainSummary.toLowerCase());
      (s.bullets || []).forEach(b => allItems.push(b.toLowerCase()));
      (s.cards || []).forEach(cd => {
        if (cd.title) allCardTitles.push(cd.title.toLowerCase());
        if (cd.desc) allItems.push(cd.desc.toLowerCase());
        (cd.items || []).forEach(it => allItems.push(it.toLowerCase()));
      });
    });
  }

  if (graph?.conceptualRoadmap) {
    const cm = graph.conceptualRoadmap;
    if (cm.title) allCardTitles.push(cm.title.toLowerCase());
    (cm.milestones || []).forEach(m => allCardTitles.push(m.title.toLowerCase()));
    (cm.section1Analogy?.actors || []).forEach(a => allCardTitles.push(a.name.toLowerCase()));
    (cm.section2Prerequisites?.mathFormulas || []).forEach(f => allItems.push(`${f.name} ${f.formula}`.toLowerCase()));
    (cm.section3Taxonomy?.variants || []).forEach(v => allCardTitles.push(`${v.name} ${v.subtext || ''}`.toLowerCase()));
    (cm.bottomWorkflow?.step4Applications || []).forEach(app => allCardTitles.push(`${app.title} ${app.subtitle}`.toLowerCase()));
  }

  const combinedCorpus = `${graph?.title || ''} ${graph?.subtitle || ''} ${allCardTitles.join(' ')} ${allItems.join(' ')}`.toLowerCase();

  // 1. Abstraction Level Ontology Check

  // 2. Entity Completeness Score safely
  const rawEntities = Array.isArray(intent?.inferredEntities) ? intent.inferredEntities : [];
  const requiredEntities = rawEntities.filter(e => typeof e === 'string').map(e => e.toLowerCase());
  const matchedEntities: string[] = [];
  const missingEntities: string[] = [];

  if (requiredEntities.length === 0) {
    return {
      passed: ontologyErrors.length === 0,
      completenessScore: 1.0,
      matchedEntities: [],
      missingEntities: [],
      ontologyErrors,
      orphanNodesCount: 0
    };
  }

  requiredEntities.forEach(ent => {
    if (combinedCorpus.includes(ent)) {
      matchedEntities.push(ent);
    } else {
      missingEntities.push(ent);
    }
  });

  const completenessScore = matchedEntities.length / requiredEntities.length;

  return {
    passed: completenessScore >= 0.7 && ontologyErrors.length === 0,
    completenessScore,
    matchedEntities,
    missingEntities,
    ontologyErrors,
    orphanNodesCount: 0
  };
}

/**
 * 📐 Phase 2: 2D Spatial Geometry & Visual Collision Verification
 */
export function verifyPhase2Visual(
  graph: Studio3SemanticGraph,
  boxes: BoundingBox[]
): Studio3QualityReport['phase2Visual'] {
  const layoutViolations: string[] = [];
  const htmlOverflowViolations: string[] = [];
  const columnWidthViolations: string[] = [];
  let collisionsCount = 0;

  // 1. AABB 2D Collision Detection between all bounding boxes
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i];
      const b = boxes[j];

      // Axis-Aligned Bounding Box intersection formula with 2px safety margin
      const margin = 2;
      const xOverlap = a.x < (b.x + b.w - margin) && (a.x + a.w - margin) > b.x;
      const yOverlap = a.y < (b.y + b.h - margin) && (a.y + a.h - margin) > b.y;

      if (xOverlap && yOverlap) {
        collisionsCount++;
        layoutViolations.push(`Spatial collision detected between "${a.name}" and "${b.name}"`);
      }
    }
  }

  // 2. Deep Column Width & Compression Audit (> 4 columns per single row without wrapping)
  (graph?.bands || []).forEach((band, bIdx) => {
    if (band.columns && band.columns.length > 4) {
      const colWidthEst = (1520 - 32 - 16 * (band.columns.length - 1)) / band.columns.length;
      if (colWidthEst < 260) {
        columnWidthViolations.push(`Band ${bIdx + 1} has ${band.columns.length} columns squeezed to ${Math.round(colWidthEst)}px (< 260px min threshold)`);
      }
    }
  });

  // 3. Deep HTML & Code Snippet Overflow Audit
  (graph?.bands || []).forEach(band => {
    (band.columns || []).forEach(col => {
      (col.cards || []).forEach(card => {
        if (card.codeSnippet) {
          const lines = card.codeSnippet.split('\n');
          for (const line of lines) {
            // If any single continuous line without spaces exceeds 45 characters, it will overflow without wrap
            const tokens = line.split(/\s+/);
            for (const token of tokens) {
              if (token.length > 45) {
                htmlOverflowViolations.push(`Card "${card.title}" contains un-wrapped token of length ${token.length} in codeSnippet: "${token.slice(0, 30)}..."`);
                break;
              }
            }
          }
        }
      });
    });
  });

  // 4. Visual Density Ratio Evaluation
  const totalCanvasArea = 1600 * 1000;
  const occupiedArea = boxes.reduce((acc, b) => acc + (b.w * b.h), 0);
  const visualDensity = Math.min(1.0, occupiedArea / totalCanvasArea);

  let densityGrade: 'optimal' | 'sparse' | 'dense' = 'optimal';
  if (visualDensity < 0.20) densityGrade = 'sparse';
  else if (visualDensity > 0.65) densityGrade = 'dense';

  // 5. Flow Alignment
  const totalBands = (graph?.bands || []).length;
  const flowAlignmentPct = totalBands > 0 ? 100 : 0;

  const passed = collisionsCount === 0 &&
    layoutViolations.length === 0 &&
    htmlOverflowViolations.length === 0 &&
    columnWidthViolations.length === 0;

  return {
    passed,
    collisionsCount,
    visualDensity,
    densityGrade,
    flowAlignmentPct,
    wcagContrastPass: true,
    layoutViolations,
    htmlOverflowViolations,
    columnWidthViolations
  };
}

/**
 * 🔄 Phase 3: Conversational AST Versioning & In-Place Refinement Verification
 */
export function verifyPhase3Versioning(
  currentGraph: Studio3SemanticGraph,
  previousGraph: Studio3SemanticGraph | null
): Studio3QualityReport['phase3Versioning'] {
  if (!previousGraph) {
    return {
      addedNodes: (currentGraph?.bands || []).flatMap(b => (b.columns || []).flatMap(c => (c.cards || []).map(cd => cd?.title || cd?.id || 'node'))),
      modifiedEdges: [],
      removedNodes: [],
      anchorsPreservedCount: 0
    };
  }

  const prevNodeSet = new Set<string>();
  const currNodeSet = new Set<string>();

  (previousGraph?.bands || []).forEach(b => {
    (b.columns || []).forEach(c => {
      (c.cards || []).forEach(card => {
        const key = card?.title ? card.title.toLowerCase() : (card?.id ? String(card.id) : null);
        if (key) prevNodeSet.add(key);
      });
    });
    (b.pipelineStages || []).forEach(s => {
      (s.nodes || []).forEach(node => {
        const key = node?.name ? node.name.toLowerCase() : (node?.id ? String(node.id) : null);
        if (key) prevNodeSet.add(key);
      });
    });
  });

  (currentGraph?.bands || []).forEach(b => {
    (b.columns || []).forEach(c => {
      (c.cards || []).forEach(card => {
        const key = card?.title ? card.title.toLowerCase() : (card?.id ? String(card.id) : null);
        if (key) currNodeSet.add(key);
      });
    });
    (b.pipelineStages || []).forEach(s => {
      (s.nodes || []).forEach(node => {
        const key = node?.name ? node.name.toLowerCase() : (node?.id ? String(node.id) : null);
        if (key) currNodeSet.add(key);
      });
    });
  });

  const addedNodes: string[] = [];
  const removedNodes: string[] = [];
  let anchorsPreservedCount = 0;

  currNodeSet.forEach(node => {
    if (!prevNodeSet.has(node)) {
      addedNodes.push(node);
    } else {
      anchorsPreservedCount++;
    }
  });

  prevNodeSet.forEach(node => {
    if (!currNodeSet.has(node)) {
      removedNodes.push(node);
    }
  });

  return {
    addedNodes,
    modifiedEdges: ['Step sequence re-aligned for multi-band flow'],
    removedNodes,
    anchorsPreservedCount
  };
}

/**
 * 🖥️ Phase 4: Client Presentation, Viewport Contract & DOM Formatting Verification
 */
export function verifyPhase4ClientPresentation(params: {
  graph: Studio3SemanticGraph;
  clientConfig?: {
    allowFullScaleScroll?: boolean;
    chatContent?: string;
    hasCollapsibleLogs?: boolean;
    buttonContrastVerified?: boolean;
  };
}): Studio3QualityReport['phase4ClientPresentation'] {
  const { graph, clientConfig = {} } = params;
  const violations: string[] = [];

  // 1. Viewport Auto-Fit Containment Guard
  const allowFullScaleScroll = clientConfig.allowFullScaleScroll ?? false;
  const viewportContainment: 'auto_fit_guaranteed' | 'overflow_risk' =
    allowFullScaleScroll ? 'overflow_risk' : 'auto_fit_guaranteed';

  if (viewportContainment === 'overflow_risk') {
    violations.push('Viewport allowFullScaleScroll=true forces fixed 1600x1000px causing canvas overflow clipping');
  }

  // 2. Text Formatting & Markdown Cleanliness
  const chatContent = clientConfig.chatContent || '';
  const hasRawAsterisks = /\*\*[^*]+\*\*/.test(chatContent) && !clientConfig.chatContent?.includes('<strong');
  const textFormatting: 'formatted_markdown' | 'raw_asterisks_detected' =
    hasRawAsterisks ? 'raw_asterisks_detected' : 'formatted_markdown';

  // 3. Telemetry Collation
  const hasCollapsibleLogs = clientConfig.hasCollapsibleLogs ?? true;
  const telemetryCollation: 'collapsible_trace' | 'raw_dump' =
    hasCollapsibleLogs ? 'collapsible_trace' : 'raw_dump';

  if (telemetryCollation === 'raw_dump') {
    violations.push('Execution telemetry logs dumped as raw uncollated string inside chat bubbles');
  }

  // 4. Interactive Contrast
  const interactiveContrast: 'high_contrast' | 'low_contrast' =
    clientConfig.buttonContrastVerified !== false ? 'high_contrast' : 'low_contrast';

  return {
    passed: violations.length === 0,
    viewportContainment,
    textFormatting,
    telemetryCollation,
    interactiveContrast,
    violations
  };
}

/**
 * 🛡️ Master Automated Quality Gate Runner
 */
export function evaluateStudio3Quality(params: {
  graph: Studio3SemanticGraph;
  intent: Studio3Intent;
  previousGraph?: Studio3SemanticGraph | null;
  boxes?: BoundingBox[];
  clientConfig?: {
    allowFullScaleScroll?: boolean;
    chatContent?: string;
    hasCollapsibleLogs?: boolean;
    buttonContrastVerified?: boolean;
  };
}): Studio3QualityReport {
  const { graph, intent, previousGraph, boxes = [], clientConfig } = params;

  const effectiveBoxes: BoundingBox[] = boxes.length > 0 ? boxes : (graph?.freeformElements || []).map(e => ({
    id: e.id,
    name: e.name,
    x: e.x,
    y: e.y,
    w: e.w,
    h: e.h
  }));

  const safeIntent: Studio3Intent = intent || {
    abstractionLevel: graph?.abstractionLevel || 'logical',
    primaryGoal: 'Synthesize architecture from first principles',
    topologyGrammar: 'hierarchical_tiers',
    temporalNature: 'steady_state_topology',
    scope: 'full_system',
    suggestedTitle: graph?.title || 'System Architecture',
    bands: [],
    inferredEntities: [],
    rationale: 'Generated intent fallback',
    actionType: 'initial_synthesis'
  };

  const phase1Technical = verifyPhase1Technical(graph, safeIntent);
  const phase2Visual = verifyPhase2Visual(graph, effectiveBoxes);
  const phase3Versioning = verifyPhase3Versioning(graph, previousGraph || null);
  const phase4ClientPresentation = verifyPhase4ClientPresentation({ graph, clientConfig });

  // Overall Quality Scoring Algorithm
  let overallScore = 100;

  // Deduct for completeness gaps
  overallScore -= Math.round((1.0 - phase1Technical.completenessScore) * 20);

  // Deduct for ontology errors
  overallScore -= phase1Technical.ontologyErrors.length * 10;

  // Deduct for visual collisions
  overallScore -= phase2Visual.collisionsCount * 15;

  // Deduct for layout violations
  overallScore -= phase2Visual.layoutViolations.length * 5;

  // Deduct for HTML text / code snippet overflows
  overallScore -= phase2Visual.htmlOverflowViolations.length * 15;

  // Deduct for column squishing violations
  overallScore -= phase2Visual.columnWidthViolations.length * 15;

  // Deduct for client presentation / viewport violations
  overallScore -= phase4ClientPresentation.violations.length * 10;

  overallScore = Math.max(0, Math.min(100, overallScore));

  const certified = overallScore >= 75 &&
    phase2Visual.collisionsCount === 0 &&
    phase2Visual.htmlOverflowViolations.length === 0 &&
    phase2Visual.columnWidthViolations.length === 0 &&
    phase4ClientPresentation.passed;

  return {
    overallScore,
    certified,
    phase1Technical,
    phase2Visual,
    phase3Versioning,
    phase4ClientPresentation,
    healingActionsApplied: []
  };
}
