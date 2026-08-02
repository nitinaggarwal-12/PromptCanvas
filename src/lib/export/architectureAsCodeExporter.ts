import { parseXmlNodesAndEdges, DiagramNodeItem } from '../graph/xmlNodesParser';

/**
 * 🐍 Generates a ready-to-run Python script using Mingrammer's `diagrams` library
 * Supports GCP, AWS, and generic cloud stencils with cluster nesting.
 */
export function exportPythonDiagramsScript(xmlContent: string, diagramName: string = 'Cloud Architecture'): string {
  const itemsAll = parseXmlNodesAndEdges(xmlContent || '');
  const nodes = itemsAll.filter((i: DiagramNodeItem) => !i.isEdge);
  const edges = itemsAll.filter((i: DiagramNodeItem) => i.isEdge);

  const gcpImports = new Set<string>();
  const awsImports = new Set<string>();
  const genericImports = new Set<string>();

  interface PythonNode {
    id: string;
    varName: string;
    label: string;
    className: string;
    modulePath: string;
    group: string;
  }

  const pyNodes: PythonNode[] = [];

  nodes.forEach((node: DiagramNodeItem, idx: number) => {
    const rawText = (node.label || `Node ${idx + 1}`)
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const cleanLabel = rawText.replace(/"/g, '\\"');
    const varName = `node_${node.id.replace(/[^a-zA-Z0-9]/g, '_')}_${idx}`;
    const lower = rawText.toLowerCase();

    let className = 'Custom';
    let modulePath = 'diagrams.custom';
    let group = 'Cloud Infrastructure';

    if (lower.includes('vertex') || lower.includes('gemini') || lower.includes('ai') || lower.includes('nli') || lower.includes('red-teaming')) {
      className = 'AIPlatform';
      modulePath = 'diagrams.gcp.ml';
      gcpImports.add('AIPlatform');
      group = 'AI & Machine Learning';
    } else if (lower.includes('cloud storage') || lower.includes('gcs') || lower.includes('bucket')) {
      className = 'GCS';
      modulePath = 'diagrams.gcp.storage';
      gcpImports.add('GCS');
      group = 'Data & Ingestion';
    } else if (lower.includes('armor') || lower.includes('waf') || lower.includes('safety')) {
      className = 'Armor';
      modulePath = 'diagrams.gcp.security';
      gcpImports.add('Armor');
      group = 'Security & Governance';
    } else if (lower.includes('bigquery') || lower.includes('aggregator')) {
      className = 'BigQuery';
      modulePath = 'diagrams.gcp.analytics';
      gcpImports.add('BigQuery');
      group = 'Analytics & Processing';
    } else if (lower.includes('cloud run') || lower.includes('microservice')) {
      className = 'Run';
      modulePath = 'diagrams.gcp.compute';
      gcpImports.add('Run');
      group = 'Compute Services';
    } else if (lower.includes('cloud sql') || lower.includes('alloydb') || lower.includes('postgres')) {
      className = 'SQL';
      modulePath = 'diagrams.gcp.database';
      gcpImports.add('SQL');
      group = 'Database Tier';
    } else if (lower.includes('pub/sub') || lower.includes('eventbridge') || lower.includes('queue')) {
      className = 'PubSub';
      modulePath = 'diagrams.gcp.analytics';
      gcpImports.add('PubSub');
      group = 'Message Messaging';
    } else if (lower.includes('gke') || lower.includes('kubernetes') || lower.includes('eks')) {
      className = 'GKE';
      modulePath = 'diagrams.gcp.compute';
      gcpImports.add('GKE');
      group = 'Container Orchestration';
    } else if (lower.includes('s3') || lower.includes('aws')) {
      className = 'S3';
      modulePath = 'diagrams.aws.storage';
      awsImports.add('S3');
      group = 'AWS Storage';
    } else {
      className = 'Custom';
      modulePath = 'diagrams.custom';
      genericImports.add('Custom');
    }

    pyNodes.push({
      id: node.id,
      varName,
      label: cleanLabel.slice(0, 48),
      className,
      modulePath,
      group
    });
  });

  const groups = new Map<string, PythonNode[]>();
  pyNodes.forEach((n: PythonNode) => {
    const list = groups.get(n.group) || [];
    list.push(n);
    groups.set(n.group, list);
  });

  const importLines: string[] = ['from diagrams import Cluster, Diagram'];
  if (gcpImports.size > 0) {
    importLines.push(`from diagrams.gcp.ml import AIPlatform`);
    importLines.push(`from diagrams.gcp.storage import GCS`);
    importLines.push(`from diagrams.gcp.security import Armor`);
    importLines.push(`from diagrams.gcp.analytics import BigQuery, PubSub`);
    importLines.push(`from diagrams.gcp.compute import Run, GKE`);
    importLines.push(`from diagrams.gcp.database import SQL`);
  }
  if (awsImports.size > 0) {
    importLines.push(`from diagrams.aws.storage import S3`);
  }

  const clusterBlocks: string[] = [];
  groups.forEach((items: PythonNode[], grpName: string) => {
    const nodeDefs = items
      .map((item: PythonNode) => `        ${item.varName} = ${item.className}("${item.label}")`)
      .join('\n');
    clusterBlocks.push(`    with Cluster("${grpName}"):\n${nodeDefs}`);
  });

  const edgeLines: string[] = [];
  const nodeMap = new Map<string, PythonNode>(pyNodes.map((n: PythonNode) => [n.id, n]));

  edges.forEach((edge: DiagramNodeItem) => {
    const src = edge.source ? nodeMap.get(edge.source) : undefined;
    const tgt = edge.target ? nodeMap.get(edge.target) : undefined;
    if (src && tgt) {
      edgeLines.push(`    ${src.varName} >> ${tgt.varName}`);
    }
  });

  return `# ==============================================================================
# 🐍 Python Architecture-as-Code Script (Powered by Mingrammer diagrams)
# Diagram Title: ${diagramName}
# Run with: pip install diagrams && python architecture.py
# ==============================================================================

${importLines.join('\n')}

graph_attr = {
    "fontsize": "16",
    "bgcolor": "#0F172A",
    "fontcolor": "#F8FAFC",
    "pad": "0.6"
}

with Diagram("${diagramName.replace(/"/g, '\\"')}", show=True, direction="LR", graph_attr=graph_attr):
${clusterBlocks.join('\n\n')}

    # Operational & Data Flows
${edgeLines.length > 0 ? edgeLines.join('\n') : '    pass'}
`;
}

/**
 * 🔤 Generates declarative D2 Lang architecture script
 */
export function exportD2LangScript(xmlContent: string, diagramName: string = 'Cloud Architecture'): string {
  const itemsAll = parseXmlNodesAndEdges(xmlContent || '');
  const nodes = itemsAll.filter((i: DiagramNodeItem) => !i.isEdge);
  const edges = itemsAll.filter((i: DiagramNodeItem) => i.isEdge);

  const nodeMap = new Map<string, string>();
  const nodeDeclarations: string[] = [];

  nodes.forEach((n: DiagramNodeItem, idx: number) => {
    const cleanId = `node_${idx + 1}`;
    nodeMap.set(n.id, cleanId);

    const cleanLabel = (n.label || `Node ${idx + 1}`)
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/"/g, '\\"')
      .trim();

    nodeDeclarations.push(`${cleanId}: "${cleanLabel.slice(0, 50)}" {
  shape: rectangle
  style: {
    stroke: "#38BDF8"
    fill: "#1E293B"
    font-color: "#F8FAFC"
  }
}`);
  });

  const edgeDeclarations: string[] = [];
  edges.forEach((e: DiagramNodeItem) => {
    const srcId = e.source ? nodeMap.get(e.source) : undefined;
    const tgtId = e.target ? nodeMap.get(e.target) : undefined;
    if (srcId && tgtId) {
      const edgeLabel = (e.label || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (edgeLabel && edgeLabel !== 'Connection') {
        edgeDeclarations.push(`${srcId} -> ${tgtId}: "${edgeLabel}"`);
      } else {
        edgeDeclarations.push(`${srcId} -> ${tgtId}`);
      }
    }
  });

  return `# ==============================================================================
# 🔤 D2 Lang Declarative Architecture-as-Code Script
# Diagram Title: ${diagramName}
# Compile with: d2 diagram.d2 diagram.svg (or paste into https://play.d2lang.com)
# ==============================================================================

direction: right

vars: {
  d2-config: {
    theme-id: 200
  }
}

title: "${diagramName.replace(/"/g, '\\"')}" {
  shape: text
  style.font-size: 24
}

# Node Topology
${nodeDeclarations.join('\n\n')}

# Operational Connectors & Routing
${edgeDeclarations.join('\n')}
`;
}
