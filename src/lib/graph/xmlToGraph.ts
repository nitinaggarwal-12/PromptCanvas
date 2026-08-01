import { XMLParser } from 'fast-xml-parser';

export interface ExtractedTier {
  id: string;
  label: string;
  kind: 'layer' | 'stage' | 'lane';
}

export interface ExtractedComponent {
  id: string;
  label: string;
  subtitle?: string;
  type?: string;
  tier: string;
}

export interface ExtractedFlow {
  id: string;
  from: string;
  to: string;
  label?: string;
  protocol?: string;
  async: boolean;
}

export interface ExtractedActor {
  id: string;
  label: string;
}

export interface ExtractedTransition {
  id: string;
  from: string;
  to: string;
  gate?: string;
}

export interface ExtractedGraph {
  title?: string;
  tiers: ExtractedTier[];
  components: ExtractedComponent[];
  nodes: ExtractedComponent[];
  flows: ExtractedFlow[];
  edges: ExtractedFlow[];
  actors: ExtractedActor[];
  transitions: ExtractedTransition[];
  unmapped: string[];
}

function stripHtml(raw: string | undefined): string {
  if (!raw) return '';
  return String(raw)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractProtocol(label: string): string | undefined {
  const match = label.match(/\b(gRPC|JDBC|HTTP|HTTPS|mTLS|Kafka|REST|AMQP|SQS|TLS|OIDC|OAuth2)\b/i);
  return match ? match[1].toUpperCase() : undefined;
}

function isGateTransition(label: string): boolean {
  if (!label) return false;
  return /\b(APPROVED|REJECTED|VALID|INVALID|GATE|CONDITION|IF|WHEN)\b/i.test(label) || label.includes('[') && label.includes(']');
}

export function xmlToGraph(mxGraphXml: string): ExtractedGraph | null {
  if (!mxGraphXml || typeof mxGraphXml !== 'string') return null;

  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
    });

    const parsed = parser.parse(mxGraphXml);
    if (!parsed) return null;

    // Support both direct <mxGraphModel> and wrapped <mxfile><diagram><mxGraphModel>
    const model = parsed.mxGraphModel || parsed.mxfile?.diagram?.mxGraphModel;
    if (!model || !model.root || !model.root.mxCell) return null;

    const rawCells = Array.isArray(model.root.mxCell)
      ? model.root.mxCell
      : [model.root.mxCell];

    const tiersMap = new Map<string, ExtractedTier>();
    const componentsMap = new Map<string, ExtractedComponent>();
    const flows: ExtractedFlow[] = [];
    const actorsMap = new Map<string, ExtractedActor>();
    const transitions: ExtractedTransition[] = [];
    const unmapped: string[] = [];

    // Pre-pass: Identify tier containers
    for (const cell of rawCells) {
      const id = cell['@_id'];
      if (!id || id === '0' || id === '1') continue;

      const style = cell['@_style'] || '';
      const rawValue = cell['@_value'] || '';
      const cleanLabel = stripHtml(rawValue);

      const isContainer =
        cell['@_isContainer'] === '1' ||
        style.includes('swimlane') ||
        id.startsWith('col_') ||
        id.startsWith('sw') ||
        id.startsWith('tier_') ||
        id.startsWith('phase_') ||
        cleanLabel.toUpperCase().startsWith('[STAGE') ||
        cleanLabel.toUpperCase().includes('TIER') ||
        cleanLabel.toUpperCase().includes('LAYER') ||
        cleanLabel.toUpperCase().includes('ZONE');

      if (isContainer && cleanLabel) {
        let kind: 'layer' | 'stage' | 'lane' = 'layer';
        if (cleanLabel.toUpperCase().startsWith('[STAGE') || style.includes('horizontal=0')) {
          kind = 'stage';
        } else if (style.includes('swimlane')) {
          kind = 'lane';
        }
        tiersMap.set(id, {
          id,
          label: cleanLabel,
          kind,
        });
      }
    }

    // Default tier if none found
    if (tiersMap.size === 0) {
      tiersMap.set('default_tier', {
        id: 'default_tier',
        label: 'System Components',
        kind: 'layer',
      });
    }

    const tierIds = new Set(tiersMap.keys());

    // Main pass: Process vertices and edges
    for (const cell of rawCells) {
      const id = cell['@_id'];
      if (!id || id === '0' || id === '1') continue;

      const isVertex = cell['@_vertex'] === '1';
      const isEdge = cell['@_edge'] === '1';
      const rawValue = cell['@_value'] || '';
      const cleanLabel = stripHtml(rawValue);
      const style = cell['@_style'] || '';
      const parent = cell['@_parent'] || 'default_tier';

      if (tiersMap.has(id)) {
        continue; // already a tier
      }

      if (isVertex) {
        if (!cleanLabel || cleanLabel.length < 2) {
          unmapped.push(id);
          continue;
        }

        // Avoid mapping pure legend/note boxes or watermarks as components if they contain meta text
        const lines = cleanLabel.split('\n').map(s => s.trim()).filter(Boolean);
        const label = lines[0] || cleanLabel;
        const subtitle = lines.length > 1 ? lines.slice(1).join(' - ') : undefined;

        const resolvedTier = tierIds.has(parent) ? parent : Array.from(tierIds)[0];

        // Infer node type
        let type: string | undefined = undefined;
        const lower = cleanLabel.toLowerCase();
        if (lower.includes('user') || lower.includes('actor') || lower.includes('client') || lower.includes('analyst') || lower.includes('physician') || lower.includes('payer')) {
          type = 'user';
        } else if (lower.includes('database') || lower.includes('db') || lower.includes('table') || lower.includes('warehouse') || lower.includes('lakehouse')) {
          type = 'database';
        } else if (lower.includes('storage') || lower.includes('bucket') || lower.includes('s3')) {
          type = 'storage';
        } else if (lower.includes('queue') || lower.includes('kafka') || lower.includes('pubsub') || lower.includes('event')) {
          type = 'queue';
        } else if (lower.includes('security') || lower.includes('auth') || lower.includes('iam') || lower.includes('firewall') || lower.includes('vpc')) {
          type = 'security';
        } else if (lower.includes('ai') || lower.includes('llm') || lower.includes('gemini') || lower.includes('rag') || lower.includes('model')) {
          type = 'ai';
        }

        const component: ExtractedComponent = {
          id,
          label,
          subtitle,
          type,
          tier: resolvedTier,
        };

        componentsMap.set(id, component);

        if (type === 'user' || resolvedTier.toLowerCase().includes('client') || resolvedTier.toLowerCase().includes('user')) {
          actorsMap.set(id, { id, label });
        }
      } else if (isEdge) {
        const source = cell['@_source'];
        const target = cell['@_target'];

        if (!source || !target) {
          unmapped.push(id);
          continue;
        }

        const protocol = extractProtocol(cleanLabel);
        const isAsync = style.includes('dashed=1') || cleanLabel.toLowerCase().includes('async') || cleanLabel.toLowerCase().includes('event');

        if (isGateTransition(cleanLabel) || style.includes('state') || style.includes('transition')) {
          transitions.push({
            id,
            from: source,
            to: target,
            gate: cleanLabel || undefined,
          });
        } else {
          flows.push({
            id,
            from: source,
            to: target,
            label: cleanLabel || undefined,
            protocol,
            async: isAsync,
          });
        }
      } else {
        unmapped.push(id);
      }
    }

    const componentsList = Array.from(componentsMap.values());
    return {
      tiers: Array.from(tiersMap.values()),
      components: componentsList,
      nodes: componentsList,
      flows,
      edges: flows,
      actors: Array.from(actorsMap.values()),
      transitions,
      unmapped,
    };
  } catch {
    return null;
  }
}
