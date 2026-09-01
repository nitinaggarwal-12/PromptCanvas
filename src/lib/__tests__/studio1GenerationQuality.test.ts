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
    { id: 'armor', label: 'Cloud Armor', description: 'WAF and DDoS security policy', kind: 'security', stage: 2, zone: 'Edge', provider: 'GCP', serviceKey: 'cloud_armor' },
    { id: 'load_balancer', label: 'Global external Application Load Balancer', description: 'Global HTTPS entry point', kind: 'service', stage: 2, zone: 'Edge', provider: 'GCP', serviceKey: 'cloud_load_balancing' },
    { id: 'ingestion_api', label: 'Ingestion API', description: 'Receives and authenticates incoming events', kind: 'service', stage: 2, zone: 'Ingestion', provider: 'GCP', serviceKey: 'cloud_run' },
    { id: 'event_topic', label: 'Pub/Sub event topic', description: 'Durable event backbone', kind: 'queue', stage: 3, zone: 'Messaging', provider: 'GCP', serviceKey: 'pubsub' },
    { id: 'streaming_subscription', label: 'Pub/Sub streaming subscription', description: 'Delivers events with retry policy', kind: 'queue', stage: 3, zone: 'Messaging', provider: 'GCP', serviceKey: 'pubsub' },
    { id: 'validator', label: 'Schema valid?', description: 'Validate event contract and required fields', kind: 'decision', stage: 4, zone: 'Processing' },
    { id: 'processor', label: 'Dataflow', description: 'Streaming transforms and enrichment', kind: 'process', stage: 4, zone: 'Processing', provider: 'GCP', serviceKey: 'dataflow' },
    { id: 'warehouse', label: 'BigQuery', description: 'Analytics storage', kind: 'datastore', stage: 5, zone: 'Data', provider: 'GCP', serviceKey: 'bigquery' },
    { id: 'raw_archive', label: 'Cloud Storage raw archive', description: 'Immutable replay and reprocessing source', kind: 'datastore', stage: 5, zone: 'Data', provider: 'GCP', serviceKey: 'cloud_storage' },
    { id: 'dead_letter', label: 'Pub/Sub dead-letter topic', description: 'Failed event isolation and replay', kind: 'queue', stage: 3, zone: 'Messaging', provider: 'GCP', serviceKey: 'pubsub' },
    { id: 'iam', label: 'Identity and Access Management', description: 'Least-privilege workload identities', kind: 'security', stage: 6, zone: 'Controls', provider: 'GCP', serviceKey: 'cloud_iam' },
    { id: 'logging', label: 'Cloud Logging', description: 'Central application and pipeline logs', kind: 'observability', stage: 6, zone: 'Operations', provider: 'GCP', serviceKey: 'cloud_logging' },
    { id: 'monitoring', label: 'Cloud Monitoring', description: 'Metrics, SLOs, alerts, and dashboards', kind: 'observability', stage: 6, zone: 'Operations', provider: 'GCP', serviceKey: 'cloud_monitoring' },
  ],
  edges: [
    { id: 'producer_lb', source: 'producer', target: 'load_balancer', label: 'Submit HTTPS events', flowType: 'network', relationType: 'routes', step: 1 },
    { id: 'armor_lb', source: 'armor', target: 'load_balancer', label: 'Apply WAF policy', flowType: 'governance', relationType: 'protects', step: 2 },
    { id: 'lb_api', source: 'load_balancer', target: 'ingestion_api', label: 'Route valid traffic', flowType: 'network', relationType: 'routes', step: 3 },
    { id: 'api_topic', source: 'ingestion_api', target: 'event_topic', label: 'Publish events', flowType: 'asynchronous', relationType: 'publishes', step: 4 },
    { id: 'topic_subscription', source: 'event_topic', target: 'streaming_subscription', label: 'Deliver retained events', flowType: 'asynchronous', relationType: 'contains', step: 5 },
    { id: 'subscription_validator', source: 'streaming_subscription', target: 'validator', label: 'Consume subscription', flowType: 'asynchronous', relationType: 'subscribes', step: 6 },
    { id: 'valid_processor', source: 'validator', target: 'processor', label: 'Process valid event', flowType: 'data', relationType: 'processes', condition: 'schema_valid', step: 7 },
    { id: 'invalid_dlq', source: 'validator', target: 'dead_letter', label: 'Route invalid event', flowType: 'feedback', relationType: 'feedback', condition: 'schema_invalid', step: 8 },
    { id: 'processor_store', source: 'processor', target: 'warehouse', label: 'Write analytics', flowType: 'data', relationType: 'writes', step: 9 },
    { id: 'processor_archive', source: 'processor', target: 'raw_archive', label: 'Archive raw events', flowType: 'data', relationType: 'writes', step: 10 },
    { id: 'dlq_replay', source: 'dead_letter', target: 'streaming_subscription', label: 'Replay corrected event', flowType: 'feedback', relationType: 'feedback', step: 11 },
    { id: 'iam_api', source: 'iam', target: 'ingestion_api', label: 'Authorize service account', flowType: 'governance', relationType: 'authorizes', step: 12 },
    { id: 'logging_api', source: 'logging', target: 'ingestion_api', label: 'Collect request logs', flowType: 'governance', relationType: 'observes', step: 13 },
    { id: 'monitoring_processor', source: 'monitoring', target: 'processor', label: 'Monitor pipeline SLOs', flowType: 'governance', relationType: 'observes', step: 14 },
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
    expect(normalized.edges.map(edge => edge.step)).toEqual(Array.from({ length: streamingGraph.edges.length }, (_, index) => index + 1));
  });

  it('preserves meaningful product names when the model uses common schema aliases', () => {
    const normalized = normalizeStudio1Graph({
      title: 'Streaming platform',
      nodes: [
        { id: 'devices', name: 'IoT Devices', purpose: 'Publish telemetry', kind: 'actor', stage: 1, domain: 'Sources' },
        { id: 'events', name: 'Cloud Pub/Sub', purpose: 'Durable event backbone', kind: 'queue', stage: 2, domain: 'Messaging' },
        { id: 'analytics', name: 'BigQuery', purpose: 'Serve analytical queries', kind: 'datastore', stage: 3, domain: 'Data' },
      ],
      edges: [
        { id: 'publish', from: 'devices', to: 'events', name: 'Publish telemetry', type: 'asynchronous', step: 1 },
        { id: 'persist', from: 'events', to: 'analytics', name: 'Write events', type: 'data', step: 2 },
      ],
    }, 'streaming platform');
    expect(normalized.nodes.map(node => node.label)).toEqual(['IoT Devices', 'Cloud Pub/Sub', 'BigQuery']);
    expect(normalized.nodes.find(node => node.id === 'events')?.serviceKey).toBe('pubsub');
    expect(normalized.nodes.find(node => node.id === 'analytics')?.serviceKey).toBe('bigquery');
    expect(normalized.edges.map(edge => edge.label)).toEqual(['Publish telemetry', 'Write events']);
  });

  it('promotes meaningful decision-edge labels to explicit branch conditions', () => {
    const normalized = normalizeStudio1Graph({
      title: 'Validated stream',
      nodes: [
        { id: 'validator', label: 'Schema Valid?', description: 'Validate each event', kind: 'decision', stage: 3, zone: 'Processing' },
        { id: 'warehouse', label: 'BigQuery', description: 'Persist valid rows', kind: 'datastore', stage: 4, zone: 'Data' },
        { id: 'dlq', label: 'Dead-letter Topic', description: 'Hold invalid events', kind: 'queue', stage: 4, zone: 'Recovery' },
      ],
      edges: [
        { id: 'valid', source: 'validator', target: 'warehouse', label: 'valid_schema', flowType: 'data', step: 1 },
        { id: 'invalid', source: 'validator', target: 'dlq', label: 'invalid_schema', flowType: 'asynchronous', step: 2 },
      ],
    }, 'validated stream');
    expect(normalized.edges.map(edge => edge.condition)).toEqual(['valid_schema', 'invalid_schema']);
    expect(renderStudio1GraphXml(normalized).certification.violations).toEqual([]);
  });

  it('renders a certified Draw.io envelope with official local icons', () => {
    const rendered = renderStudio1GraphXml(streamingGraph);
    expect(rendered.certification.certified).toBe(true);
    expect(rendered.xml).toContain('<mxfile host="embed.diagrams.net">');
    expect(rendered.xml).toContain('<diagram id="studio1_google_cloud"');
    expect(rendered.xml).toContain('<mxGraphModel');
    expect(rendered.xml).toContain('data-google-cloud-icon=&quot;official&quot;');
    expect(rendered.xml).not.toContain('https://api.iconify.design');
  });

  it('uses Google Cloud boundaries, functional groups, and cross-cutting controls', () => {
    const rendered = renderStudio1GraphXml(streamingGraph);
    expect(rendered.xml).toContain('Google Cloud visual profile');
    expect(rendered.xml).toContain('google_cloud_scope');
    expect(rendered.xml).toContain('project_scope');
    expect(rendered.xml).toContain('region_scope');
    expect(rendered.xml).toContain('group_ingress');
    expect(rendered.xml).toContain('group_messaging');
    expect(rendered.xml).toContain('group_processing');
    expect(rendered.xml).toContain('group_data');
    expect(rendered.xml).toContain('cross_cutting_controls');
    expect(rendered.xml).not.toContain('Balanced domain layout v2');
    expect(rendered.xml).not.toContain('lane_6');

    const nodePattern = streamingGraph.nodes.map(node => node.id).join('|');
    const coordinates = [...rendered.xml.matchAll(new RegExp(`id="(${nodePattern})"[^>]*>[\\s\\S]*?<mxGeometry x="([\\d.]+)" y="([\\d.]+)" width="([\\d.]+)" height="([\\d.]+)"`, 'g'))]
      .map(match => ({ id: match[1], x: Number(match[2]), y: Number(match[3]), width: Number(match[4]), height: Number(match[5]) }));
    expect(coordinates).toHaveLength(streamingGraph.nodes.length);
    for (let leftIndex = 0; leftIndex < coordinates.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < coordinates.length; rightIndex += 1) {
        const left = coordinates[leftIndex];
        const right = coordinates[rightIndex];
        const separated = left.x + left.width + 29 < right.x || right.x + right.width + 29 < left.x || left.y + left.height + 29 < right.y || right.y + right.height + 29 < left.y;
        expect(separated, `${left.id} overlaps ${right.id}`).toBe(true);
      }
    }
  });

  it('normalizes Cloud Armor into a policy protecting Cloud Load Balancing', () => {
    const graph = structuredClone(streamingGraph);
    const rendered = renderStudio1GraphXml(graph);
    expect(rendered.xml).toContain('source="producer" target="load_balancer"');
    expect(rendered.xml).toContain('source="armor" target="load_balancer"');
    expect(rendered.xml).toContain('Applies security policy');
    expect(rendered.xml).toContain('strokeColor=#D93025');
    expect(rendered.xml).toContain('source="load_balancer" target="ingestion_api"');
  });

  it('places an ingestion runtime with edge services instead of creating a backward messaging loop', () => {
    const graph = structuredClone(streamingGraph);
    const rendered = renderStudio1GraphXml(graph);
    const ingressGroupX = Number(rendered.xml.match(/id="group_ingress"[^>]*>[\s\S]*?<mxGeometry x="([\d.]+)"/)?.[1]);
    const ingestionX = Number(rendered.xml.match(/id="ingestion_api"[^>]*>[\s\S]*?<mxGeometry x="([\d.]+)"/)?.[1]);
    expect(ingestionX).toBeGreaterThan(ingressGroupX);
    expect(ingestionX).toBeLessThan(ingressGroupX + 320);
  });
});
