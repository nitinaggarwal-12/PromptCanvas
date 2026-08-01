import { ArchitectureGraph } from '../graph/schema';
import { xmlToGraph } from '../graph/xmlToGraph';

export interface SystemModel {
  source: 'graph_json' | 'xml_extraction';
  title: string;
  domain?: string;
  cloud?: string;
  tiers: { id: string; label: string; kind: 'layer' | 'stage' | 'lane' }[];
  components: { id: string; label: string; subtitle?: string; type?: string; tier: string }[];
  flows: { from: string; to: string; label?: string; protocol?: string; async: boolean }[];
  actors: { id: string; label: string }[];
  transitions: { from: string; to: string; gate?: string }[];
  narrative?: { reasoning?: string; businessUsecase?: string; technicalUsecase?: string };
  assumptions?: string[];
  unmapped: string[];
}

export interface ExtractInput {
  graph_json?: ArchitectureGraph | unknown;
  xml?: string;
  title?: string;
  domain?: string;
}

export function extractSystemModel(input: ExtractInput): SystemModel {
  const { graph_json, xml, title, domain } = input;

  // 1. If valid graph_json exists (v2 freeform / deterministic graph), normalize directly
  if (graph_json && typeof graph_json === 'object') {
    const g = graph_json as Partial<ArchitectureGraph>;
    if (Array.isArray(g.nodes) && Array.isArray(g.tiers)) {
      const tiers = (g.tiers || []).map((t) => ({
        id: t.id,
        label: t.label,
        kind: 'layer' as const,
      }));

      const components = (g.nodes || []).map((n) => ({
        id: n.id,
        label: n.label,
        subtitle: n.subtitle,
        type: n.type,
        tier: n.tier,
      }));

      const actors = (g.nodes || [])
        .filter((n) => n.type === 'user' || n.type === 'external')
        .map((n) => ({ id: n.id, label: n.label }));

      const flows = (g.edges || []).map((e) => ({
        from: e.source,
        to: e.target,
        label: e.label,
        protocol: e.protocol,
        async: e.style === 'dashed',
      }));

      const transitions = (g.edges || [])
        .filter((e) => e.label && /\b(APPROVED|REJECTED|GATE|VALID|INVALID)\b/i.test(e.label))
        .map((e) => ({
          from: e.source,
          to: e.target,
          gate: e.label,
        }));

      return {
        source: 'graph_json',
        title: g.title || title || 'Architecture System Model',
        domain,
        cloud: g.cloud,
        tiers,
        components,
        flows,
        actors,
        transitions,
        narrative: g.narrative,
        assumptions: [
          'Derived diagrams describe what is designed, not what was excluded; absence of a capability here is not a scope decision.',
        ],
        unmapped: [],
      };
    }
  }

  // 2. Fallback to xmlToGraph XML extraction
  if (xml && typeof xml === 'string') {
    const extracted = xmlToGraph(xml);
    if (extracted) {
      return {
        source: 'xml_extraction',
        title: extracted.title || title || 'Architecture System Model',
        domain,
        tiers: extracted.tiers,
        components: extracted.components,
        flows: extracted.flows.map((f) => ({
          from: f.from,
          to: f.to,
          label: f.label,
          protocol: f.protocol,
          async: f.async,
        })),
        actors: extracted.actors,
        transitions: extracted.transitions.map((t) => ({
          from: t.from,
          to: t.to,
          gate: t.gate,
        })),
        assumptions: [
          'Derived diagrams describe what is designed, not what was excluded; absence of a capability here is not a scope decision.',
        ],
        unmapped: extracted.unmapped,
      };
    }
  }

  // 3. Fallback empty SystemModel
  return {
    source: 'xml_extraction',
    title: title || 'Empty System Model',
    domain,
    tiers: [],
    components: [],
    flows: [],
    actors: [],
    transitions: [],
    assumptions: [
      'Derived diagrams describe what is designed, not what was excluded; absence of a capability here is not a scope decision.',
    ],
    unmapped: ['NO_VALID_INPUT_PROVIDED'],
  };
}
