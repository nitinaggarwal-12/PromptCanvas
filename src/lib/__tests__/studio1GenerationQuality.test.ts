import { describe, expect, it } from 'vitest';
import {
  assessStudio1InitialPrompt,
  inferStudio1RequiredCapabilities,
  validateStudio1ArchitectureQuality,
  validateStudio1GraphCompleteness,
  type Studio1GenerationContext,
} from '../studio1ArchitectureCore';
import {
  normalizeStudio1Graph,
  renderStudio1GraphXml,
  type Studio1SemanticGraph,
} from '../studio1HybridEngine';

const context: Studio1GenerationContext = {
  action: 'create',
  persona: 'solution_architect',
  level: 'technical',
  viewpoint: 'end_to_end',
  depth: 'standard',
  lifecycleState: 'target',
  platform: 'gcp',
};

const streamingGraph: Studio1SemanticGraph = {
  title: 'High-throughput streaming platform',
  subtitle: 'Secure event ingestion, processing, analytics, recovery, and operations',
  patterns: ['event-driven', 'layered'],
  assumptions: ['Events are retained for replay and failed records use a dead-letter path.'],
  nodes: [
    { id: 'producer', label: 'Event Producers', description: 'Applications and devices', kind: 'actor', stage: 1, zone: 'Sources' },
    { id: 'ingress', label: 'Protected Ingress', description: 'Authenticated event admission', kind: 'security', stage: 2, zone: 'Edge', provider: 'GCP', serviceKey: 'cloud_armor' },
    { id: 'event_bus', label: 'Pub/Sub', description: 'Durable event backbone', kind: 'queue', stage: 3, zone: 'Messaging', provider: 'GCP', serviceKey: 'pubsub' },
    { id: 'dead_letter', label: 'Dead-letter Topic', description: 'Failed event isolation and replay', kind: 'queue', stage: 3, zone: 'Messaging', provider: 'GCP', serviceKey: 'pubsub' },
    { id: 'processor', label: 'Dataflow', description: 'Streaming transforms and enrichment', kind: 'process', stage: 4, zone: 'Processing', provider: 'GCP', serviceKey: 'dataflow' },
    { id: 'warehouse', label: 'BigQuery', description: 'Analytics storage', kind: 'datastore', stage: 5, zone: 'Data', provider: 'GCP', serviceKey: 'bigquery' },
    { id: 'operations', label: 'Cloud Monitoring', description: 'Metrics, logs, traces, and alerts', kind: 'observability', stage: 6, zone: 'Operations', provider: 'GCP', serviceKey: 'cloud_monitoring' },
  ],
  edges: [
    { id: 'producer_ingress', source: 'producer', target: 'ingress', label: 'Submit events', flowType: 'synchronous', step: 1 },
    { id: 'ingress_bus', source: 'ingress', target: 'event_bus', label: 'Publish', flowType: 'asynchronous', step: 2 },
    { id: 'bus_processor', source: 'event_bus', target: 'processor', label: 'Consume stream', flowType: 'asynchronous', step: 3 },
    { id: 'processor_store', source: 'processor', target: 'warehouse', label: 'Write analytics', flowType: 'data', step: 4 },
    { id: 'processor_dlq', source: 'processor', target: 'dead_letter', label: 'Failed event', flowType: 'feedback', step: 5 },
    { id: 'dlq_processor', source: 'dead_letter', target: 'processor', label: 'Replay', flowType: 'asynchronous', step: 6 },
    { id: 'processor_ops', source: 'processor', target: 'operations', label: 'Emit telemetry', flowType: 'governance', step: 7 },
  ],
};

describe('Studio 1 deterministic generation quality gate', () => {
  it('treats the standard streaming prompt as a valid generation request', () => {
    const assessment = assessStudio1InitialPrompt('Architect a high streaming event platform');
    expect(assessment.disposition).toBe('generate');
  });

  it('infers workload-specific capabilities before calling the model', () => {
    expect(inferStudio1RequiredCapabilities(context, 'Architect a high streaming event platform')).toEqual(expect.arrayContaining([
      'connected_topology',
      'ordered_flow',
      'event_backbone',
      'persistent_data',
      'security',
      'observability',
      'failure_handling',
    ]));
  });

  it('accepts a complete, connected, production streaming architecture', () => {
    const result = validateStudio1ArchitectureQuality(streamingGraph, context, 'Architect a high streaming event platform');
    expect(result.valid).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(85);
    expect(result.violations).toEqual([]);
  });

  it('rejects a graph that passes counts but lacks required architecture semantics', () => {
    const weakGraph: Studio1SemanticGraph = {
      title: 'Generic Architecture', subtitle: 'Six boxes', patterns: ['layered'], assumptions: [],
      nodes: Array.from({ length: 6 }, (_, index) => ({
        id: `service_${index + 1}`, label: `Service ${index + 1}`, description: 'Generic service', kind: 'service' as const,
        stage: index + 1, zone: `Stage ${index + 1}`,
      })),
      edges: Array.from({ length: 5 }, (_, index) => ({
        id: `edge_${index + 1}`, source: `service_${index + 1}`, target: `service_${index + 2}`,
        label: 'Request', flowType: 'synchronous' as const, step: index + 1,
      })),
    };
    expect(validateStudio1GraphCompleteness(weakGraph, 'standard').valid).toBe(true);
    const result = validateStudio1ArchitectureQuality(weakGraph, context, 'Architect a high streaming event platform');
    expect(result.valid).toBe(false);
    expect(result.violations.join(' ')).toMatch(/event backbone|persistent data|security|observability|failure handling/i);
  });

  it('rejects orphaned components even when the overall edge count is sufficient', () => {
    const graph = structuredClone(streamingGraph);
    graph.nodes.push({ id: 'orphan', label: 'Unused Cache', description: 'Not connected', kind: 'datastore', stage: 5, zone: 'Data' });
    const result = validateStudio1ArchitectureQuality(graph, context, 'Architect a high streaming event platform');
    expect(result.valid).toBe(false);
    expect(result.violations.join(' ')).toContain('Orphaned components: orphan');
  });

  it('normalizes ambiguous model step numbers into one deterministic sequence', () => {
    const raw = structuredClone(streamingGraph);
    raw.edges.forEach(edge => { edge.step = 1; });
    const normalized = normalizeStudio1Graph(raw, 'streaming platform');
    expect(normalized.edges.map(edge => edge.step)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('renders a certified Draw.io envelope with official local icons and straight adjacent routes', () => {
    const rendered = renderStudio1GraphXml(streamingGraph);
    expect(rendered.certification.certified).toBe(true);
    expect(rendered.xml).toContain('<mxfile host="embed.diagrams.net">');
    expect(rendered.xml).toContain('<diagram id="studio1_hybrid"');
    expect(rendered.xml).toContain('<mxGraphModel');
    expect(rendered.xml).toContain('edgeStyle=none;');
    expect(rendered.xml).not.toContain('https://api.iconify.design');
  });
});
