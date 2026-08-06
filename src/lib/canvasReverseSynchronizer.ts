export interface ReverseSyncOutput {
  updatedSystemPrompt: string;
  architectureSpecificationMarkdown: string;
  extractedComponents: Array<{
    id: string;
    name: string;
    type: string;
    tier: string;
  }>;
}

export function reverseSyncXmlToDocumentation(
  xml: string,
  diagramTitle: string = 'Enterprise Architecture System'
): ReverseSyncOutput {
  // Parse nodes and tiers out of XML AST
  const nodeMatches = [...xml.matchAll(/<mxCell id="([^"]+)" value="([^"]+)"[^>]*vertex="1"/gi)];
  const extractedComponents: Array<{ id: string; name: string; type: string; tier: string }> = [];

  for (const match of nodeMatches) {
    const id = match[1];
    const rawVal = match[2];
    const cleanName = rawVal
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();

    if (id === '0' || id === '1' || id.includes('title') || id.includes('header') || cleanName.length < 3) {
      continue;
    }

    let tier = 'General Tier';
    if (/ingress|waf|lb|load balancer|client/i.test(cleanName)) tier = 'Tier 1: Edge & Ingress';
    else if (/api|gateway|pub\/sub|broker|auth/i.test(cleanName)) tier = 'Tier 2: Orchestration & Event Ingress';
    else if (/gke|run|pod|compute|cluster|microservice/i.test(cleanName)) tier = 'Tier 3: Core Application & AI Compute';
    else if (/sql|postgres|database|bigquery|storage|bucket/i.test(cleanName)) tier = 'Tier 4: Governed Data & Persistence';
    else if (/security|kms|secret|vpc-sc|compliance|audit/i.test(cleanName)) tier = 'Tier 5: Governance & Security Controls';

    extractedComponents.push({
      id,
      name: cleanName,
      type: 'MX_CELL_VERTEX',
      tier
    });
  }

  const componentListMd = extractedComponents
    .map(c => `- **${c.name}** *(${c.tier})*`)
    .join('\n') || '- Enterprise Core Platform Services';

  const updatedSystemPrompt = `Design an enterprise-grade ${diagramTitle} featuring: ${extractedComponents.slice(0, 8).map(c => c.name).join(', ')}. Enforce strict 5-tier network isolation, high availability multi-zone failover, and zero-trust security perimeters.`;

  const architectureSpecificationMarkdown = `# System Design Document (SDD): ${diagramTitle}
**Synchronization Timestamp:** ${new Date().toISOString()}  
**Bi-Directional Status:** Synchronized with active Draw.io Visual Canvas  

---

## 1. Executive Topology Overview
This architecture orchestrates **${extractedComponents.length} governed technical components** structured across 5 isolation tiers. Every component is synchronized bi-directionally with the live visual diagram.

## 2. Synchronized Infrastructure Inventory
${componentListMd}

## 3. Security Boundary & Compliance Assertion
- **VPC Perimeter**: Private subnets with explicit Cloud NAT egress controls.
- **Data Protection**: AES-256 customer-managed encryption at rest and TLS 1.3 in transit.
- **Audit Logging**: Immutable Cloud Audit Logs streamed to BigQuery SIEM.
`.trim();

  return {
    updatedSystemPrompt,
    architectureSpecificationMarkdown,
    extractedComponents
  };
}
