import { describe, it, expect, vi } from 'vitest';
import { buildMcpContextGatewayXml } from '@/lib/masterBuilders/master_builder_mcp_gateway';
import { buildMasterSaasMultiTenantXml } from '@/lib/masterBuilders/build_master_saas_multi_tenant';
import { buildMasterGkeEnterprisePlatformXml } from '@/lib/masterBuilders/build_master_gke_enterprise_platform';
import { buildMasterEnterpriseApiManagementXml } from '@/lib/masterBuilders/build_master_enterprise_api_management';
import { buildMasterGraphragKnowledgeGraphXml } from '@/lib/masterBuilders/build_master_graphrag_knowledge_graph';
import {
  extractCustomizableNodes,
  applyStructuredCustomizationsToTemplateXml,
} from '@/lib/geminiDiagramCustomizer';
import {
  findFosterParentedTableCells,
  healFosterParentedHtmlInXml,
} from '@/lib/htmlTableSanitizer';
import { validateDrawioXml } from '@/lib/validate/validator';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';

describe('Anti-Foster-Parenting & Blueprint Customizer Hardening', () => {
  it('blocks HTML5 foster-parenting pill injection, lane header suffix bloat, and Agentspace legacy copy on mcp_context_gateway', () => {
    const baseXml = buildMcpContextGatewayXml();
    const nodes = extractCustomizableNodes(baseXml);

    // Confirm structural cells (number circles, legend) are excluded from LLM customization
    expect(nodes.find((n) => n.id === 'hosts_number')).toBeUndefined();
    expect(nodes.find((n) => n.id === 'legend')).toBeUndefined();

    // Simulate the EXACT adversarial Gemini payload that produced the broken screenshot:
    // badges on every card, tier suffixes on lane headers, verbose <br/> bullet lists, deprecated branding, typos
    const adversarialCustomizations: Record<string, { title: string; subtitle: string; badge: string }> = {
      hosts_title: {
        title: 'GCP AI HOSTS & AGENTIC RUNTIMES',
        subtitle: 'Autonomous reasoning loops & orchestrators embedding MCP clients',
        badge: 'Tier 1: Hosts',
      },
      gateway_title: {
        title: 'GCP ENTERPRISE MCP CONTEXT GATEWAY',
        subtitle: 'Zero-trust OIDC/IAM auth, Model Armor inspection, policy & routing',
        badge: 'Tier 3: Control Plane',
      },
      governance_title: {
        title: 'GCP ZERO-TRUST SECURITY, GOVERNANCE & OBSERVABILITY',
        subtitle: 'Policies and guardrails spanning Vertex AI hosts, MCP Gateway, servers and data stores',
        badge: 'Tier 0: Governance',
      },
      transport_note: {
        title: 'STATELESS JSON-RPC 2.0 OVER STREAMABLE HTTP / SSE',
        subtitle: 'Gateway & Cloud Run MCP servers remain stateless; conversational state lives in the Agent Host',
        badge: 'Protocol Invariant',
      },
      host_gemini: {
        title: 'Gemini Agentspace & Workspace AI',
        subtitle: '• Enterprise multimodal assistant<br/>• Native multi-turn MCP tool invocation<br/>• Grounded across enterprise data',
        badge: 'Managed Host',
      },
      gateway_quota: {
        title: 'Token Bucket Rate Limiting & Quotes',
        subtitle: '• Per-agent & per-tenant concurrency ceilings<br/>• Sheds load & prevents runaway agent loops',
        badge: 'Quota Guard',
      },
      gateway_auth: {
        title: 'OAuth 2.1 / OIDC Token Validation',
        subtitle: '• Verifies Identity Platform / Workforce JWTs<br/>• Enforces strict audience binding & short TTLs',
        badge: 'Token Auth',
      },
      e_gateway_server: {
        title: 'Approved Tool Execution (mTLS) with Very Long Overflowing Label Text',
        subtitle: 'Should never inject subtitle on edge',
        badge: 'Edge Badge',
      },
    };

    const resultXml = applyStructuredCustomizationsToTemplateXml(
      baseXml,
      { customizations: adversarialCustomizations },
      nodes,
      { isIteration: false }
    );

    // 1. ZERO HTML5 foster-parenting elements inside <tr> outside <td>/<th>
    expect(findFosterParentedTableCells(resultXml)).toEqual([]);

    // 2. ZERO cyan #38bdf8 pill injections
    expect(resultXml).not.toContain('#38bdf8');
    expect(resultXml).not.toContain('Managed Host');
    expect(resultXml).not.toContain('Quota Guard');
    expect(resultXml).not.toContain('Token Auth');

    // 3. ZERO stray badge suffixes on lane headers, transport_note, or edges
    expect(resultXml).not.toContain('Tier 1: Hosts');
    expect(resultXml).not.toContain('Tier 3: Control Plane');
    expect(resultXml).not.toContain('Tier 0: Governance');
    expect(resultXml).not.toContain('Protocol Invariant');
    expect(resultXml).not.toContain('Edge Badge');

    // 4. Modern GCP copy normalization (Agentspace -> Gemini Enterprise, Quotes -> Quotas)
    expect(resultXml).not.toMatch(/\bAgentspace\b/i);
    expect(resultXml).toContain('Gemini Enterprise');
    expect(resultXml).not.toMatch(/Rate Limiting &amp; Quotes/i);
    expect(resultXml).toContain('Quotas');

    // 5. Compact cards strip multi-line bullet overflow (`•` / `<br/>`)
    expect(resultXml).not.toContain('• Enterprise multimodal');

    // 6. Validator passes with zero HTML_FOSTER_PARENTING_IN_TABLE errors
    const validation = validateDrawioXml(resultXml);
    expect(validation.errors.filter((e) => e.code === 'HTML_FOSTER_PARENTING_IN_TABLE')).toHaveLength(0);
  });

  it('guarantees zero foster-parented HTML even during explicit iteration mode across multiple table master builders', () => {
    const builders = [
      buildMcpContextGatewayXml,
      buildMasterSaasMultiTenantXml,
      buildMasterGkeEnterprisePlatformXml,
      buildMasterEnterpriseApiManagementXml,
      buildMasterGraphragKnowledgeGraphXml,
    ];

    for (const build of builders) {
      const xml = build();
      const nodes = extractCustomizableNodes(xml);
      const firstCard = nodes.find((n) => n.role === 'card');
      expect(firstCard).toBeDefined();

      const mutated = applyStructuredCustomizationsToTemplateXml(
        xml,
        {
          customizations: {
            [firstCard!.id]: {
              title: 'Refined Security Component',
              subtitle: 'Added strict mTLS & DLP enforcement',
              badge: 'Refined',
            },
          },
        },
        nodes,
        { isIteration: true }
      );

      expect(findFosterParentedTableCells(mutated)).toEqual([]);
      expect(mutated).toContain('Refined');
    }
  });

  it('validator flags raw foster-parented <span> before </tr> as a hard error and xmlHealer repairs it even on protected master blueprints', () => {
    const poisonedXml = buildMcpContextGatewayXml().replace(
      '&lt;/tr&gt;',
      '&lt;span style=&quot;background:#38bdf8;&quot;&gt;Managed Host&lt;/span&gt;&lt;/tr&gt;'
    );

    const badVal = validateDrawioXml(poisonedXml);
    expect(badVal.errors.some((e) => e.code === 'HTML_FOSTER_PARENTING_IN_TABLE')).toBe(true);
    expect(badVal.valid).toBe(false);

    // Even with archType='mcp_context_gateway' (protected master blueprint), xmlHealer MUST strip the foster-parented span!
    const healed = validateAndHealDrawioXml(poisonedXml, 'mcp_context_gateway');
    expect(healed.isHealed).toBe(true);
    expect(findFosterParentedTableCells(healed.xml)).toEqual([]);
    expect(healed.xml).not.toContain('Managed Host');

    const postHealVal = validateDrawioXml(healed.xml);
    expect(postHealVal.errors.filter((e) => e.code === 'HTML_FOSTER_PARENTING_IN_TABLE')).toHaveLength(0);
  });

  it('healFosterParentedHtmlInXml is idempotent on clean XML', () => {
    const clean = buildMcpContextGatewayXml();
    const res = healFosterParentedHtmlInXml(clean);
    expect(res.healedCount).toBe(0);
    expect(res.xml).toBe(clean);
  });
});
