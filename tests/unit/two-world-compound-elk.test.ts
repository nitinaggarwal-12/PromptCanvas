import { describe, it, expect } from 'vitest';
import {
  compileVisionSceneToDrawioXml,
  type VisionDecompiledScene,
} from '../../src/lib/freeform/compoundPromptToDiagramEngine';
import {
  parseDrawioXmlSpatialState,
  applySpatialMutationPlan,
} from '../../src/lib/freeform/directDrawioSpatialMutator';
import {
  MAX_UNDO_REDO_CHANGES,
  createEmptyUndoRedoState,
  pushUndoRedoChange,
  undoDiagramChange,
  redoDiagramChange,
  canUndoChange,
  canRedoChange,
  listOrderedChangesNewestFirst,
  jumpToSavedChangeById,
} from '../../src/lib/undoRedoHistoryStore';

describe('1:1 Vision-to-Draw.io Scene Compiler, Direct Spatial Mutator & 15-Change Undo/Redo', () => {
  const sampleScene: VisionDecompiledScene = {
    titleBanner: {
      text: 'Enterprise Borderless Lakehouse Architecture',
      subtext: 'Multi-Cloud Lakehouse & Real-Time Governance',
      box_2d: [20, 40, 80, 960],
    },
    containers: [
      {
        id: 'zone_dbx',
        label: 'Databricks Lakehouse Plane',
        box_2d: [100, 40, 860, 460],
        fillHex: '#FFF1F0',
        strokeHex: '#D93025',
        dashed: false,
      },
      {
        id: 'zone_dbx_inner',
        label: 'Unity Catalog Subnet',
        box_2d: [480, 70, 820, 430],
        fillHex: '#FEF7E0',
        strokeHex: '#E37400',
        dashed: true,
      },
      {
        id: 'zone_gcp',
        label: 'Google Cloud Analytics Plane',
        box_2d: [100, 540, 860, 960],
        fillHex: '#E8F0FE',
        strokeHex: '#1A73E8',
        dashed: false,
      },
    ],
    nodes: [
      {
        id: 'node_photon',
        label: 'Photon SQL Engine',
        sublabel: 'Vectorized Query',
        box_2d: [210, 90, 340, 390],
        hasVisibleIcon: true,
        iconKey: 'databricks',
        shape: 'card',
        fillHex: '#FFFFFF',
        strokeHex: '#CBD5E1',
      },
      {
        id: 'node_uc',
        label: 'Unity Catalog',
        sublabel: 'Delta Sharing',
        box_2d: [580, 100, 710, 390],
        hasVisibleIcon: true,
        iconKey: 'catalog',
        shape: 'card',
        fillHex: '#FFFFFF',
        strokeHex: '#CBD5E1',
      },
      {
        id: 'node_bq',
        label: 'BigQuery Omni',
        sublabel: 'Federated SQL',
        box_2d: [210, 600, 340, 900],
        hasVisibleIcon: true,
        iconKey: 'bigquery',
        shape: 'card',
        fillHex: '#FFFFFF',
        strokeHex: '#CBD5E1',
      },
      {
        id: 'node_vertex',
        label: 'Vertex AI Agents',
        sublabel: 'Grounded Reasoning',
        box_2d: [580, 600, 710, 900],
        hasVisibleIcon: true,
        iconKey: 'vertex_ai',
        shape: 'card',
        fillHex: '#FFFFFF',
        strokeHex: '#CBD5E1',
      },
    ],
    edges: [
      {
        id: 'edge_photon_uc',
        sourceId: 'node_photon',
        targetId: 'node_uc',
        label: 'Catalog ACLs',
        strokeHex: '#475569',
        dashed: false,
        bidirectional: false,
      },
      {
        id: 'edge_uc_bq',
        sourceId: 'node_uc',
        targetId: 'node_bq',
        label: 'Iceberg REST',
        strokeHex: '#1A73E8',
        dashed: false,
        bidirectional: true,
        bendPoints: [
          [645, 500],
          [275, 500],
        ],
      },
      {
        id: 'edge_bq_vertex',
        sourceId: 'node_bq',
        targetId: 'node_vertex',
        label: 'Feature View',
        strokeHex: '#1A73E8',
        dashed: true,
        bidirectional: false,
      },
    ],
  };

  it('compiles VisionDecompiledScene 1:1 to Draw.io XML preserving nested pastel fills, proportions, and edges with zero edge_auto_*', () => {
    const compiled = compileVisionSceneToDrawioXml({
      scene: sampleScene,
      fallbackTitle: 'Enterprise Borderless Lakehouse Architecture',
      fallbackSubtitle: 'Multi-Cloud Lakehouse',
      architecturalSummary: '1:1 Vision decompiled test',
      imageWidth: 1600,
      imageHeight: 900,
    });

    expect(compiled.xml).toContain('data-prompt-to-diagram="true"');
    expect(compiled.xml).not.toContain('edge_auto_');
    expect(compiled.xml).toContain('fillColor=#FEF7E0');
    expect(compiled.xml).toContain('fillColor=#FFF1F0');
    expect(compiled.xml).toContain('fillColor=#E8F0FE');

    expect(compiled.audit.groupCount).toBe(3);
    expect(compiled.audit.nodeCount).toBe(4);
    expect(compiled.audit.edgeCount).toBe(3);
    expect(compiled.audit.maxNestingDepth).toBe(2);
    expect(compiled.audit.siblingOverlaps).toBe(0);

    const parsed = parseDrawioXmlSpatialState(compiled.xml);
    expect(parsed.cells.filter((c) => c.isContainer).length).toBe(3);
    expect(parsed.cells.filter((c) => !c.isContainer).length).toBeGreaterThanOrEqual(4);
    expect(parsed.edges.length).toBe(3);
  });

  it('applies surgical in-place XML mutations preserving untouched styles, colors, and coordinates', () => {
    const compiled = compileVisionSceneToDrawioXml({
      scene: sampleScene,
      fallbackTitle: 'Enterprise Borderless Lakehouse Architecture',
      fallbackSubtitle: 'Multi-Cloud Lakehouse',
      architecturalSummary: '1:1 Vision decompiled test',
      imageWidth: 1600,
      imageHeight: 900,
    });
    const beforeState = parseDrawioXmlSpatialState(compiled.xml);
    const photonBefore = beforeState.cells.find((c) => c.id === 'node_photon')!;

    const mutated = applySpatialMutationPlan(beforeState, {
      summaryOfChanges: 'Added Cloud Armor WAF in Google Cloud Analytics Plane and connected to BigQuery Omni.',
      removeCellIds: [],
      removeEdgeIds: [],
      addZones: [],
      addNodes: [
        {
          id: 'node_armor',
          label: 'Cloud Armor WAF',
          sublabel: 'Edge Protection',
          parentZoneId: 'zone_gcp',
          placement: 'below',
          anchorId: 'node_bq',
          iconKey: 'cloud_armor',
          fillHex: '#FFFFFF',
          strokeHex: '#1A73E8',
        },
      ],
      modifyCells: [],
      addEdges: [
        {
          id: 'edge_armor_bq',
          source: 'node_armor',
          target: 'node_bq',
          label: 'Filtered SQL',
          strokeHex: '#1A73E8',
          dashed: false,
          bidirectional: false,
        },
      ],
    });

    expect(mutated.xml).toContain('node_armor');
    expect(mutated.xml).toContain('edge_armor_bq');
    expect(mutated.xml).not.toContain('e_auto_');
    expect(mutated.xml).toContain('fillColor=#FEF7E0');

    const afterState = parseDrawioXmlSpatialState(mutated.xml);
    const photonAfter = afterState.cells.find((c) => c.id === 'node_photon')!;
    expect(photonAfter.absX).toBe(photonBefore.absX);
    expect(photonAfter.absY).toBe(photonBefore.absY);
    expect(afterState.edges.length).toBe(4);
  });

  it('retains strictly the last 15 changes in the Undo/Redo ring buffer and supports full Undo, Redo, and Jump', () => {
    let state = createEmptyUndoRedoState<{ step: number }>();
    expect(canUndoChange(state)).toBe(false);
    expect(canRedoChange(state)).toBe(false);

    for (let i = 1; i <= 20; i++) {
      state = pushUndoRedoChange(state, {
        id: `chg_${i}`,
        label: `Change ${i}`,
        xml: `<mxfile id="${i}"/>`,
        payload: { step: i },
      });
    }

    expect(state.present?.id).toBe('chg_20');
    expect(state.past.length).toBe(MAX_UNDO_REDO_CHANGES);
    expect(state.past[0].id).toBe('chg_5');
    expect(state.past[14].id).toBe('chg_19');

    state = undoDiagramChange(state);
    state = undoDiagramChange(state);
    expect(state.present?.id).toBe('chg_18');
    expect(state.future.map((f) => f.id)).toEqual(['chg_19', 'chg_20']);
    expect(canRedoChange(state)).toBe(true);

    state = redoDiagramChange(state);
    expect(state.present?.id).toBe('chg_19');

    state = jumpToSavedChangeById(state, 'chg_10');
    expect(state.present?.id).toBe('chg_10');
    expect(state.past[state.past.length - 1].id).toBe('chg_9');
    expect(state.future[0].id).toBe('chg_11');

    const timeline = listOrderedChangesNewestFirst(state);
    expect(timeline.items.length).toBeLessThanOrEqual(MAX_UNDO_REDO_CHANGES + 1);
  });
});
