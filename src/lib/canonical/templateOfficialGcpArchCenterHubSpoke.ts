/**
 * Canonical Blueprint #78: Official Google Cloud Architecture Center Hub-and-Spoke
 * (`multi-tenant-agentic-ai-system.svg` / `ws1-multi-tenant-taxonomy-overview.drawio`)
 *
 * Matches the exact visual format, palette, icons, numbered callouts (①–⑦),
 * and hub-and-spoke layout of the Google Cloud Architecture Center:
 * - Outer Google Cloud Frame : #1a73e8 (stroke #202124) + white Google Cloud wordmark
 * - Nested Boundary Frames   : #ffffff (stroke #202124)
 * - Routing / Ingress Hub    : #aecbfa (stroke #202124)
 * - Central Governance Hub   : #ceead6 (stroke #202124)
 * - Left Tenant / Pool Zone  : #feefc3 (stroke #202124)
 * - Right Tenant / Spoke Zone: #fad2cf (stroke #202124)
 * - Component Cards          : #ffffff (stroke #202124, stroke-width 2px, rx 6px)
 * - Numbered Step Badges     : #174ea6 circle (r=20) with white bold step numbers (1..7)
 */

import officialAssetsRaw from './officialArchCenterAssets.json';
import { resolveArchIconUri } from './workstreamTopologyRenderers';

const OFFICIAL_ASSETS = officialAssetsRaw as Record<string, string>;

const USER_SILHOUETTE_DATA_URI =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDQ0IDM2Ij48Y2lyY2xlIGN4PSIyMiIgY3k9IjExIiByPSI4LjUiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJNIDYgMzQgQyA2IDI0IDM4IDI0IDM4IDM0IFoiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=';

interface OfficialArchCardItem {
  icon: string;
  title: string;
  title2?: string;
  sub: string;
  l400Badge?: string;
  l400Spec?: string;
}

export interface OfficialArchCenterBlueprintConfig {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  topUserTitle: string;
  topUserSub: string;
  step1LeftLabel: string;
  step7RightLabel: string;
  outerWrapperLabel: string;
  innerWrapperLabel: string;
  routingHubTitle: string;
  routingHubSub: string;
  routingCards: {
    topLeft: OfficialArchCardItem;
    midLeft: OfficialArchCardItem;
    botLeft: OfficialArchCardItem;
    topRight: OfficialArchCardItem;
    botRight: OfficialArchCardItem;
    edgeTopLeft: [string, string];
    edgeMidLeft: [string, string];
    edgeBotLeft: [string, string];
    step2Left: string;
    step7Mid: string;
  };
  govHubTitle: string;
  govHubTitle2: string;
  govCards: {
    top: OfficialArchCardItem;
    mid: OfficialArchCardItem;
    bot: OfficialArchCardItem;
  };
  midStep3Label: [string, string];
  midStep7Label: [string, string];
  midGovLabel: string[];
  leftBoundaryLabel: string;
  leftZoneTitle: string;
  leftZoneSub: string;
  leftCards: {
    modelArmor: OfficialArchCardItem;
    llm: OfficialArchCardItem;
    runtime: OfficialArchCardItem;
    mcp: OfficialArchCardItem;
    datastore: OfficialArchCardItem;
    step4Label: string;
    step6Label: string;
    step5Label: [string, string];
    ragLabel: [string, string];
    toolLabel: [string, string];
  };
  rightBoundaryLabel: string;
  rightZoneTitle: string;
  rightZoneSub: string;
  rightCards: {
    modelArmor: OfficialArchCardItem;
    llm: OfficialArchCardItem;
    runtime: OfficialArchCardItem;
    mcp: OfficialArchCardItem;
    datastore: OfficialArchCardItem;
    ragLabel: [string, string];
    toolLabel: [string, string];
  };
}

function escXml(str: string | undefined | null): string {
  return String(str ?? '')
    .replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const OFFICIAL_ARCH_CENTER_BLUEPRINTS: OfficialArchCenterBlueprintConfig[] = [
  // =========================================================================
  // 1. WORKSTREAM 1.1: B2B SaaS Multi-Tenant Taxonomy Overview (Pattern A, B, C)
  // =========================================================================
  {
    id: 'ws1-multi-tenant-taxonomy-overview',
    badge: 'WORKSTREAM 1.1 BLUEPRINT',
    title: 'Multi-Tenant Agentic AI Taxonomy: Pooled (Pattern A), Sovereign Silos (Pattern B) & Hybrid (Pattern C)',
    subtitle: 'B2B ISV SaaS Reference Architecture Expanding Google Cloud Architecture Center (Cymbal SaaS Serving FinVault & RetailStream)',
    topUserTitle: 'Competing B2B Tenants',
    topUserSub: 'FinVault (OIDC) & RetailStream (Entra)',
    step1LeftLabel: 'Request',
    step7RightLabel: 'Response',
    outerWrapperLabel: 'Shared Control Plane & Multi-Tenant Governance Perimeter (80% Reusable Core + 20% Topology Delta)',
    innerWrapperLabel: 'VPC & 5-Hop Cryptographic Context Chain',
    routingHubTitle: 'Routing hub (Hop 1 & Hop 2 PEP/PDP)',
    routingHubSub: 'Central ingress, OBO+DPoP & Discovery Engine Agent Catalog filter',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF & IAP Header Strip' },
      midLeft: { icon: 'model_armor', title: 'Model Armor', sub: 'Ingress Prompt Screen' },
      botLeft: { icon: 'iap_iam_shield', title: 'RFC 8693 OBO + DPoP', sub: 'Sender-Constrained JWT' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Cloud Load Balancing' },
      botRight: { icon: 'cloud_run', title: 'Cloud Run', sub: 'Topology Router & Agent Catalog PDP' },
      edgeTopLeft: ['Header & WAF', 'policies'],
      edgeMidLeft: ['Sanitize', 'prompt'],
      edgeBotLeft: ['OBO + DPoP', 'verification'],
      step2Left: 'Request',
      step7Mid: 'Response',
    },
    govHubTitle: 'Central governance and',
    govHubTitle2: 'FinOps observability hub',
    govCards: {
      top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center', sub: 'Cross-Pattern Breach Alerts' },
      mid: { icon: 'iap_iam_shield', title: 'Central IAM & PAB', sub: 'Agent Identity (2LO/3LO)' },
      bot: { icon: 'bigquery_analytics', title: 'Cloud Logging & BQ', sub: 'Zero-PII OTel & Chargeback' },
    },
    midStep3Label: ['Route by tenant tier', '(Pool, Silo or PSC)'],
    midStep7Label: ['Sanitized response', 'with SDP redaction'],
    midGovLabel: ['Security, OTel & FinOps', 'chargeback telemetry'],
    leftBoundaryLabel: 'Pattern A: Pooled Shared Runtime (Standard & High-Density SaaS)',
    leftZoneTitle: 'Tenant Pool (Shared Runtime)',
    leftZoneSub: 'FinVault (8k Cap) & RetailStream (4k Cap)',
    leftCards: {
      modelArmor: { icon: 'model_armor', title: 'Model Armor', sub: 'Tenant Rai Filters & SDP PII' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro', sub: '90% Prefix Cache Savings' },
      runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Agent Engine', sub: 'gVisor + temp:tenant_id' },
      mcp: { icon: 'mcp_servers', title: 'MCP servers', sub: '2LO + 3LO OIDC/Entra' },
      datastore: { icon: 'datastore_alloydb_bq', title: 'Shared AlloyDB', sub: 'FORCE Row-Level Security' },
      step4Label: 'Sanitize request',
      step6Label: 'Sanitize response',
      step5Label: ['Generates', 'response'],
      ragLabel: ['Scoped', 'MCP & RAG'],
      toolLabel: ['SET LOCAL', 'current_tenant'],
    },
    rightBoundaryLabel: 'Pattern B (Sovereign Silos) & Pattern C (Hybrid PSC Spokes)',
    rightZoneTitle: 'Dedicated Sovereign Tenant Project',
    rightZoneSub: 'VPC-SC + IAM PAB + CMEK Kill-Switch + PSC',
    rightCards: {
      modelArmor: { icon: 'vpc_sc', title: 'VPC-SC & Model Armor', sub: 'Sovereign Silo Guardrails' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini / Gemma 3', sub: 'Private GKE or PT Endpoint' },
      runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Agent Engine', sub: 'Dedicated Silo + Agent Alpha' },
      mcp: { icon: 'mcp_servers', title: 'MCP servers', sub: 'Local Silo 3LO Connectors' },
      datastore: { icon: 'cloud_kms', title: 'CMEK Datastore', sub: 'AlloyDB, BQ & KMS 423 Lock' },
      ragLabel: ['Air-Gapped', 'Silo RAG'],
      toolLabel: ['CMEK-Encrypted', 'State & Tools'],
    },
  },

  // =========================================================================
  // 2. WORKSTREAM 1.3: Cloud Architecture Center PR Baseline (5-Hop Context Chain)
  // =========================================================================
  {
    id: 'ws1-cloud-arch-center-5hop-baseline',
    badge: 'WORKSTREAM 1.3 DOC PR BLUEPRINT',
    title: 'Cloud Architecture Center: Multi-Tenant Agentic AI System with 5-Hop Cryptographic Governance',
    subtitle: 'Official Hub-and-Spoke Reference Architecture (docs.cloud.google.com/architecture/multi-tenant-agentic-ai-system)',
    topUserTitle: 'User',
    topUserSub: 'OIDC / Entra JWT',
    step1LeftLabel: 'Request',
    step7RightLabel: 'Response',
    outerWrapperLabel: 'Shared hubs (VPC Service Controls Organization Perimeter)',
    innerWrapperLabel: 'VPC',
    routingHubTitle: 'Routing hub (Hop 1 & Hop 2)',
    routingHubSub: 'Central ingress & cryptographic token exchange',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF & Header Strip (X-Tenant-ID)' },
      midLeft: { icon: 'model_armor', title: 'Model Armor', sub: 'Edge Prompt Injection Gate' },
      botLeft: { icon: 'iap_iam_shield', title: 'IAP', sub: 'RFC 8693 OBO + DPoP' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Cloud Load Balancing' },
      botRight: { icon: 'cloud_run', title: 'Cloud Run', sub: 'Frontend portal & Hop 2 PDP' },
      edgeTopLeft: ['Security', 'policies'],
      edgeMidLeft: ['Sanitize', 'prompt'],
      edgeBotLeft: ['User', 'authentication'],
      step2Left: 'Request',
      step7Mid: 'Response',
    },
    govHubTitle: 'Central governance and',
    govHubTitle2: 'security hub',
    govCards: {
      top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center', sub: 'Continuous Threat Detection' },
      mid: { icon: 'iap_iam_shield', title: 'Central IAM', sub: 'Auth Manager (2LO / 3LO)' },
      bot: { icon: 'bigquery_analytics', title: 'Cloud Logging & BQ', sub: 'BigQuery OTel Audit Sink' },
    },
    midStep3Label: ['Route request', 'to tenant'],
    midStep7Label: ['Sanitized response', 'from tenant'],
    midGovLabel: ['Security and', 'observability', 'monitoring'],
    leftBoundaryLabel: 'PAB • Hop 3–5 Isolation Boundary (Tenant Alpha)',
    leftZoneTitle: 'Tenant A (FinVault Bank)',
    leftZoneSub: 'Tenant project • Enterprise Tier (Google OIDC)',
    leftCards: {
      modelArmor: { icon: 'model_armor', title: 'Model Armor', sub: 'Hop 4: Bank SDP & FINRA Filter' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro & Flash', sub: 'Agent Engine (8k Budget)' },
      runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Agent Engine', sub: 'Hop 3: Shared + Agent Alpha' },
      mcp: { icon: 'mcp_servers', title: 'MCP servers', sub: 'Hop 5: Workspace & Jira 3LO' },
      datastore: { icon: 'alloydb', title: 'Datastore', sub: 'BigQuery, AlloyDB RLS, CMEK' },
      step4Label: 'Sanitize request',
      step6Label: 'Sanitize response',
      step5Label: ['Generates', 'response'],
      ragLabel: ['Secure', 'RAG'],
      toolLabel: ['Agent-tool', 'interaction'],
    },
    rightBoundaryLabel: 'PAB • Hop 3–5 Isolation Boundary (Tenant Beta)',
    rightZoneTitle: 'Tenant B (RetailStream Corp)',
    rightZoneSub: 'Tenant project • Standard Tier (Entra ID)',
    rightCards: {
      modelArmor: { icon: 'model_armor', title: 'Model Armor', sub: 'Hop 4: PCI PAN SDP & Filter' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini', sub: 'Agent Engine (4k Cap)' },
      runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Agent Engine', sub: 'Hop 3: Shared Diagnostic' },
      mcp: { icon: 'mcp_servers', title: 'MCP servers', sub: 'Hop 5: SharePoint & SNOW' },
      datastore: { icon: 'datastore_alloydb_bq', title: 'Datastore', sub: 'BigQuery, AlloyDB RLS, Valkey' },
      ragLabel: ['Secure', 'RAG'],
      toolLabel: ['Agent-tool', 'interaction'],
    },
  },

  // =========================================================================
  // 3. WORKSTREAM 2.1: Pattern A — High-Density Pooled Multi-Tenant Architecture
  // =========================================================================
  {
    id: 'ws2-pattern-a-pooled-5hop-architecture',
    badge: 'WORKSTREAM 2.1 • PATTERN A BLUEPRINT',
    title: 'Pattern A: High-Density Pooled Multi-Tenant Architecture & Shared Runtime Governance',
    subtitle: 'Milestone 1 (Weeks 1–4) • Shared Project (cymbal-pooled-saas-prod) with 90% Prompt Prefix Cache Savings & 0 Bleed',
    topUserTitle: 'FinVault & RetailStream',
    topUserSub: 'Competing SaaS Tenants',
    step1LeftLabel: 'Request',
    step7RightLabel: 'Response',
    outerWrapperLabel: 'Shared GCP Project: cymbal-pooled-saas-prod (Maximum Density Pooled SaaS)',
    innerWrapperLabel: 'Shared VPC • 5-Hop Cryptographic Context Chain',
    routingHubTitle: 'Hop 1 & Hop 2: Edge PEP & Agent Catalog PDP',
    routingHubSub: 'Header stripping, OBO+DPoP & Discovery Engine Agent Catalog pruning',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF & DDoS (Strips X-Tenant-ID)' },
      midLeft: { icon: 'discovery_engine', title: 'Discovery Engine PDP', sub: 'Catalog Filter (403 Alpha)' },
      botLeft: { icon: 'iap_iam_shield', title: 'IAP + OBO Broker', sub: 'RFC 8693 OBO + DPoP (jkt)' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Cloud Load Balancing' },
      botRight: { icon: 'cloud_run', title: 'ADK Callback Gate', sub: 'before_agent_callback Prune' },
      edgeTopLeft: ['Strip header', 'X-Tenant-ID'],
      edgeMidLeft: ['Filter Agent', 'Catalog'],
      edgeBotLeft: ['Mint OBO +', 'DPoP token'],
      step2Left: 'Request',
      step7Mid: 'Response',
    },
    govHubTitle: 'Hop 3 & 5: Shared FinOps,',
    govHubTitle2: 'Cache & OTel Hub',
    govCards: {
      top: { icon: 'gemini_agent_platform', title: 'ContextCacheConfig', title2: '(90% COGS Save)', sub: '32k Shared Operator Prefix' },
      mid: { icon: 'valkey_cache', title: 'Memorystore Valkey', sub: '4k Standard vs 8k Enterprise' },
      bot: { icon: 'bigquery_analytics', title: 'BigQuery OTel Sink', sub: 'Zero-PII Token Chargeback' },
    },
    midStep3Label: ['Bind immutable', 'temp:tenant_id'],
    midStep7Label: ['SDP-redacted', 'tenant response'],
    midGovLabel: ['84.7% Net Input', 'COGS Savings & OTel'],
    leftBoundaryLabel: 'Logical & Cryptographic Slice A • FinVault Bank (Enterprise Tier)',
    leftZoneTitle: 'FinVault Logical Partition',
    leftZoneSub: 'Namespace: finvault:user:session (Envelope CMEK)',
    leftCards: {
      modelArmor: { icon: 'model_armor', title: 'Model Armor', sub: 'Masks IBAN/SWIFT + FINRA Policy' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro & Flash', sub: '8,000 Thinking-Token Budget' },
      runtime: { icon: 'gemini_agent_platform', title: 'Pooled gVisor Pod', sub: 'Shared + Private Agent Alpha' },
      mcp: { icon: 'mcp_servers', title: '3LO Workspace/Jira', sub: 'Drive, Calendar, Gmail, Jira' },
      datastore: { icon: 'datastore_alloydb_bq', title: 'Shared AlloyDB RLS', sub: "app.current_tenant='finvault'" },
      step4Label: 'Sanitize request',
      step6Label: 'Sanitize response',
      step5Label: ['Generates', 'response'],
      ragLabel: ['GCS Skills:', 'cymbal-skills-fv'],
      toolLabel: ['RLS Filtered', 'FinVault Rows'],
    },
    rightBoundaryLabel: 'Logical & Cryptographic Slice B • RetailStream Corp (Standard Tier)',
    rightZoneTitle: 'RetailStream Logical Partition',
    rightZoneSub: 'Namespace: retailstream:user:session (120 RPM Cap)',
    rightCards: {
      modelArmor: { icon: 'model_armor', title: 'Model Armor', sub: 'Masks Card PAN + PCI Policy' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro', sub: 'Clamped to 4,000 Tokens' },
      runtime: { icon: 'gemini_agent_platform', title: 'Pooled gVisor Pod', sub: 'Shared Agent Only (403 Alpha)' },
      mcp: { icon: 'mcp_servers', title: '3LO Entra & SNOW', sub: 'Inline OAuth Consent Gate' },
      datastore: { icon: 'datastore_alloydb_bq', title: 'Shared AlloyDB RLS', sub: "current_tenant='retailstream'" },
      ragLabel: ['GCS Skills:', 'cymbal-skills-rs'],
      toolLabel: ['RLS Filtered', 'Retail Rows'],
    },
  },

  // =========================================================================
  // 4. WORKSTREAM 2.5: Pattern A — 10-Point Breach Simulation & Defense
  // =========================================================================
  {
    id: 'ws2-pattern-a-breach-defense-sequence',
    badge: 'WORKSTREAM 2.5 • BREACH SUITE BLUEPRINT',
    title: 'Pattern A: 10-Point Cross-Tenant Breach Simulation & Cryptographic Defense Matrix',
    subtitle: 'Workstream 2.2 & 2.5 (run_breach_simulations.py) • 10/10 Adversarial Vectors Neutralized Across Hops 1–5',
    topUserTitle: 'Red-Team Attacker',
    topUserSub: 'Spoofed Headers & Injections',
    step1LeftLabel: 'Attack Probe',
    step7RightLabel: 'Blocked / Safe',
    outerWrapperLabel: 'Adversarial Breach Verification Harness (10/10 Deterministic Security Gates PASS)',
    innerWrapperLabel: 'VPC • Zero-Trust 5-Hop Enforcement Pipeline',
    routingHubTitle: 'Hop 1 & Hop 2 Gates (Vectors 1, 2, 3 & 10)',
    routingHubSub: 'Neutralizes header spoofing, Agent Alpha & MCP leaks',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Vector 1: Cloud Armor', sub: 'WAF Drops Forged X-Tenant-ID' },
      midLeft: { icon: 'discovery_engine', title: 'Vector 2: Agent 403', sub: 'Blocks Retail -> Agent Alpha' },
      botLeft: { icon: 'iap_iam_shield', title: 'Vector 3: Tool Prune', sub: 'Prunes FinVault Jira MCP' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Cloud Armor Edge PEP' },
      botRight: { icon: 'cloud_run', title: 'Hop 2 Catalog PDP', sub: 'Discovery Catalog + ADK Callback' },
      edgeTopLeft: ['Strip spoofed', 'header'],
      edgeMidLeft: ['Return HTTP', '403 Forbidden'],
      edgeBotLeft: ['Prune 3LO', 'MCP tools'],
      step2Left: 'Probe',
      step7Mid: '403 / 200',
    },
    govHubTitle: 'Hop 3 & 5 FinOps &',
    govHubTitle2: 'Audit Gates (Vectors 6 & 9)',
    govCards: {
      top: { icon: 'valkey_cache', title: 'Vector 6: Valkey 429', title2: '& 4k Token Clamp', sub: 'Blocks 250 RPM Flood & 16k' },
      mid: { icon: 'iap_iam_shield', title: 'Vector 10: Inline 3LO', sub: 'HTTP 401 Entra OAuth Challenge' },
      bot: { icon: 'bigquery_analytics', title: 'BigQuery OTel Audit', sub: 'Logs Every Blocked Vector' },
    },
    midStep3Label: ['Verified context', 'enters Hop 3–5'],
    midStep7Label: ['Zero cross-tenant', 'data/cache bleed'],
    midGovLabel: ['Real-time security', 'violation spans'],
    leftBoundaryLabel: 'Hop 4 Guardrail Gates (Vectors 4, 5 & 8) • Prompt, Safety Filter & SDP DLP',
    leftZoneTitle: 'Model Armor & Safety Filters',
    leftZoneSub: 'Ingress Injection Screen & Egress SDP Redaction',
    leftCards: {
      modelArmor: { icon: 'model_armor', title: 'Vector 4: HTTP 400', sub: 'Blocks SQLi & Cache Dump' },
      llm: { icon: 'model_armor', title: 'Vector 5: HTTP 422', sub: 'Blocks FINRA Escalation Bypass' },
      runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Agent Engine', sub: 'Executes Only Clean Turns' },
      mcp: { icon: 'cloud_sdp_dlp', title: 'Vector 8: SDP Mask', sub: 'Redacts IBAN, SWIFT & PAN' },
      datastore: { icon: 'datastore_alloydb_bq', title: 'Zero Raw PII Egress', sub: '[REDACTED-FINVAULT-*]' },
      step4Label: 'Screen prompt',
      step6Label: 'Redact PII',
      step5Label: ['Evaluate', 'Safety rules'],
      ragLabel: ['DLP Egress', 'Filter'],
      toolLabel: ['Zero PII in', 'Completion'],
    },
    rightBoundaryLabel: 'Hop 3 & Hop 5 Storage Gates (Vectors 7 & 9) • Memory, Skills & RLS',
    rightZoneTitle: 'Memory Bank, Skills & AlloyDB RLS',
    rightZoneSub: 'Cryptographic Namespace & Storage-Engine Isolation',
    rightCards: {
      modelArmor: { icon: 'gemini_agent_platform', title: 'Vector 7A: L4 Memory', sub: 'PermissionError on Cross-Read' },
      llm: { icon: 'cloud_storage', title: 'Vector 7B: GCS Skills', sub: 'Blocks gs://cymbal-skills-fv' },
      runtime: { icon: 'valkey_cache', title: 'Vector 9: Prefix Cache', sub: 'READ_ONLY_IMMUTABLE_PREFIX' },
      mcp: { icon: 'iap_iam_shield', title: 'Auth Manager Vault', sub: 'Tenant-Scoped OAuth Tokens' },
      datastore: { icon: 'datastore_alloydb_bq', title: 'Vector 7C: AlloyDB RLS', sub: '0 Cross-Tenant Rows Returned' },
      ragLabel: ['Isolated', 'Prefix Cache'],
      toolLabel: ['SET LOCAL', 'current_tenant'],
    },
  },

  // =========================================================================
  // 5. WORKSTREAM 3.1: Pattern B — Zero-Trust Sovereign Silos (VPC-SC, PAB, CMEK)
  // =========================================================================
  {
    id: 'ws3-pattern-b-sovereign-silos-architecture',
    badge: 'WORKSTREAM 3.1 • PATTERN B BLUEPRINT',
    title: 'Pattern B: Zero-Trust Sovereign Silos (VPC-SC, IAM PAB, CMEK Kill-Switch & Air-Gapped Gemma 3 on GKE)',
    subtitle: 'Milestone 2 (Weeks 4–7) • Dedicated Per-Tenant GCP Projects with Physical Isolation & Instant HTTP 423 CMEK Lock',
    topUserTitle: 'mTLS SPIFFE Clients',
    topUserSub: 'FinVault & RetailStream',
    step1LeftLabel: 'mTLS Request',
    step7RightLabel: 'Silo Response',
    outerWrapperLabel: 'Multi-Project Sovereign Topology (80% Core 5-Hop Pipeline + 20% Sovereign VPC-SC / PAB / CMEK Delta)',
    innerWrapperLabel: 'Central mTLS Routing & Governance Hub VPC',
    routingHubTitle: 'Central mTLS & SPIFFE Routing Hub',
    routingHubSub: 'Client certificate pinning (HTTP 401 on SAN mismatch)',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF & mTLS SPIFFE Pinning' },
      midLeft: { icon: 'model_armor', title: 'Model Armor', sub: 'Edge Prompt & DDoS Filter' },
      botLeft: { icon: 'iap_iam_shield', title: 'IAM PAB Verifier', sub: 'HTTP 403 Cross-Project Block' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'SNI Silo Routing' },
      botRight: { icon: 'cloud_run', title: 'Sovereign Hub Router', sub: 'Routes to Dedicated Silo' },
      edgeTopLeft: ['Verify client', 'SPIFFE SAN'],
      edgeMidLeft: ['Sanitize', 'prompt'],
      edgeBotLeft: ['Enforce org', 'PAB policy'],
      step2Left: 'mTLS Valid',
      step7Mid: '200 / 423',
    },
    govHubTitle: 'Cloud KMS CMEK &',
    govHubTitle2: 'Sovereign Security Hub',
    govCards: {
      top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center', sub: 'VPC-SC & PAB Violation Feed' },
      mid: { icon: 'cloud_kms', title: 'Cloud KMS / EKM Key', sub: 'Customer Kill-Switch (HTTP 423)' },
      bot: { icon: 'bigquery_analytics', title: 'Silo Security Suite', sub: '6/6 Sovereign Tests PASS' },
    },
    midStep3Label: ['Route to isolated', 'VPC-SC tenant project'],
    midStep7Label: ['Sovereign response', '(or HTTP 423 Locked)'],
    midGovLabel: ['CMEK state & VPC-SC', 'audit monitoring'],
    leftBoundaryLabel: 'PAB + VPC-SC Perimeter Alpha • Project: cymbal-finvault-silo-prod',
    leftZoneTitle: 'Tenant A Silo (FinVault Bank)',
    leftZoneSub: 'Dedicated Project • CMEK: finvault-kr/agent-memory',
    leftCards: {
      modelArmor: { icon: 'vpc_sc', title: 'VPC-SC & Model Armor', sub: 'Dedicated FinVault Perimeter' },
      llm: { icon: 'gke', title: 'Gemma 3 (27B) GKE', sub: 'Air-Gapped vLLM & Gemini PT' },
      runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Agent Engine', sub: 'Dedicated Silo + Agent Alpha' },
      mcp: { icon: 'mcp_servers', title: 'Local Silo MCP', sub: 'Workspace & Jira (0 Egress)' },
      datastore: { icon: 'cloud_kms', title: 'CMEK Datastore', sub: 'Dedicated AlloyDB & Memory' },
      step4Label: 'Sanitize request',
      step6Label: 'Sanitize response',
      step5Label: ['Air-gapped', 'inference'],
      ragLabel: ['Private GKE', 'Zero Egress'],
      toolLabel: ['CMEK Kill-Switch', 'HTTP 423 Ready'],
    },
    rightBoundaryLabel: 'PAB + VPC-SC Perimeter Beta • Project: cymbal-retailstream-silo-prod',
    rightZoneTitle: 'Tenant B Silo (RetailStream)',
    rightZoneSub: 'Dedicated Project • CMEK: retailstream-kr/memory',
    rightCards: {
      modelArmor: { icon: 'vpc_sc', title: 'VPC-SC & Model Armor', sub: 'Dedicated Retail PCI Perimeter' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro PT', sub: 'Dedicated Provisioned Quota' },
      runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Agent Engine', sub: 'Dedicated RetailStream Silo' },
      mcp: { icon: 'mcp_servers', title: 'Local Silo MCP', sub: 'Entra SharePoint & SNOW' },
      datastore: { icon: 'cloud_kms', title: 'CMEK Datastore', sub: 'Dedicated AlloyDB & Memory' },
      ragLabel: ['VPC-SC Bound', 'Secure RAG'],
      toolLabel: ['CMEK Kill-Switch', 'HTTP 423 Ready'],
    },
  },

  // =========================================================================
  // 6. WORKSTREAM 4.1: Pattern C — Dynamic Hybrid, PSC Bridge & Live Migration
  // =========================================================================
  {
    id: 'ws4-pattern-c-hybrid-psc-and-migration',
    badge: 'WORKSTREAM 4.1 • PATTERN C BLUEPRINT',
    title: 'Pattern C: Dynamic Hybrid Hub-and-Spoke, Private Service Connect (PSC) & Live Tier Migration',
    subtitle: 'Milestone 3 (Weeks 7–10) • Unified Control Plane Routing Standard to Shared Pool & Enterprise to PSC Spokes (0 Dropped Turns)',
    topUserTitle: 'Standard & Enterprise',
    topUserSub: 'Single Unified SaaS URL',
    step1LeftLabel: 'Request',
    step7RightLabel: 'Response',
    outerWrapperLabel: 'Unified Hybrid Control Hub (cymbal-hybrid-hub-prod) + PSC Bridge to Sovereign Spokes',
    innerWrapperLabel: 'Hub VPC • Tenant-Aware Router & 3-Phase Live Tier Migrator',
    routingHubTitle: 'Unified Control Plane & Intelligent Router Hub',
    routingHubSub: 'Firestore live routing table + Cross-Project Agent Catalog',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF & IAP (Single SaaS URL)' },
      midLeft: { icon: 'discovery_engine', title: 'Cross-Project Catalog', sub: 'Federated Agent Catalog' },
      botLeft: { icon: 'firestore_db', title: 'Firestore Route Table', sub: 'Maps Tenant -> Pool or PSC' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Cloud Load Balancing' },
      botRight: { icon: 'cloud_run', title: 'Cloud Run Router', sub: 'Tier Router & Live Migrator' },
      edgeTopLeft: ['Security', 'policies'],
      edgeMidLeft: ['Resolve', 'agent route'],
      edgeBotLeft: ['Atomic route', 'lookup'],
      step2Left: 'Request',
      step7Mid: 'Response',
    },
    govHubTitle: '3-Phase Zero-Downtime',
    govHubTitle2: 'Tier Migration Engine',
    govCards: {
      top: { icon: 'dms_migration', title: '1. SHADOW_SYNC', title2: '(0ms Lag DMS CDC)', sub: 'Streams RLS & L4 Memory' },
      mid: { icon: 'firestore_db', title: '2. ATOMIC_CUTOVER', sub: 'Flips Firestore Route to PSC' },
      bot: { icon: 'psc_bridge', title: '3. DRAIN_AND_VERIFY', sub: '0 Dropped Turns (4/4 PASS)' },
    },
    midStep3Label: ['Route Standard to Pool', 'or Enterprise via PSC'],
    midStep7Label: ['Seamless response', '(0 dropped sessions)'],
    midGovLabel: ['Live promotion:', 'Pool -> PSC Spoke'],
    leftBoundaryLabel: 'Standard Tier: Shared Pooled Plane (Initial RetailStream Route)',
    leftZoneTitle: 'Shared Pooled Runtime',
    leftZoneSub: 'pool://cymbal-shared-pooled-v2 (90% Cache Savings)',
    leftCards: {
      modelArmor: { icon: 'model_armor', title: 'Shared Model Armor', sub: 'Multi-Tenant Prompt & SDP' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro', sub: '4,000 Thinking Cap + Cache' },
      runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Agent Engine', sub: 'Serves Standard SaaS Tier' },
      mcp: { icon: 'mcp_servers', title: 'Pooled MCP Hub', sub: '2LO + Delegated 3LO Tools' },
      datastore: { icon: 'datastore_alloydb_bq', title: 'Shared AlloyDB RLS', sub: 'Source for Phase 1 Shadow Sync' },
      step4Label: 'Sanitize request',
      step6Label: 'Sanitize response',
      step5Label: ['Pooled', 'inference'],
      ragLabel: ['Shared Pool', 'RAG'],
      toolLabel: ['Streams State to', 'PSC Spoke'],
    },
    rightBoundaryLabel: 'Enterprise Tier: Private Service Connect (PSC) Spokes (FinVault + Upgraded RetailStream)',
    rightZoneTitle: 'Dedicated Enterprise PSC Spokes',
    rightZoneSub: 'psc://10.10.0.50 (FinVault) & psc://10.10.0.51 (Retail)',
    rightCards: {
      modelArmor: { icon: 'psc_bridge', title: 'PSC ServiceAttachment', sub: 'Unidirectional Spoke Ingress' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro & Flash', sub: 'Upgraded 8,000 Thinking Cap' },
      runtime: { icon: 'gemini_agent_platform', title: 'Spoke Agent Engine', sub: 'PSC ServiceAttachment Target' },
      mcp: { icon: 'mcp_servers', title: 'Dedicated Spoke MCP', sub: 'Isolated Inside VPC-SC Spoke' },
      datastore: { icon: 'cloud_kms', title: 'CMEK Spoke AlloyDB', sub: 'Replicated State + CMEK Lock' },
      ragLabel: ['Unidirectional', 'PSC Bridge'],
      toolLabel: ['CMEK-Encrypted', 'Spoke Storage'],
    },
  },

  // =========================================================================
  // 7. WORKSTREAM 5.1 & 5.2: Executive Decision Tree & The Agentic Triad
  // =========================================================================
  {
    id: 'ws5-decision-tree-and-agentic-triad',
    badge: 'WORKSTREAM 5.1 & 5.2 • CAPSTONE BLUEPRINT',
    title: 'Workstream 5 Capstone: Executive Topology Decision Guide & The Multi-Tenant Agentic Triad',
    subtitle: 'Unifying Zero-Trust Security, FinOps Unit Economics (90% Prefix Cache), and Zero-PII OpenTelemetry Across All 3 Patterns',
    topUserTitle: 'Enterprise & SMB Users',
    topUserSub: '10,000+ Multi-Tier Tenants',
    step1LeftLabel: 'Request',
    step7RightLabel: 'Response',
    outerWrapperLabel: 'The Multi-Tenant Agentic Triad: Security (Hops 1–5) • FinOps COGS (-84.7%) • Zero-PII Observability',
    innerWrapperLabel: 'Unified Vertex AI Agent Engine & Google ADK Reference Architecture (20/20 Simulations PASS)',
    routingHubTitle: 'Triad Pillar 1: Zero-Trust Cryptographic Security',
    routingHubSub: '5-Hop Context Chain across Ingress, Catalog & Runtime',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Hop 1: Cloud Armor', sub: 'WAF Header Strip + OBO + DPoP' },
      midLeft: { icon: 'model_armor', title: 'Hop 4: Model Armor', sub: 'Injection 400 + Policy 422 + SDP' },
      botLeft: { icon: 'discovery_engine', title: 'Hop 2: Catalog PDP', sub: 'Discovery Catalog + Tool Prune' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Global Anycast Ingress' },
      botRight: { icon: 'cloud_run', title: 'Architecture Selector', sub: 'Routes Pattern A, B or C' },
      edgeTopLeft: ['Verify OBO', '& DPoP'],
      edgeMidLeft: ['Screen &', 'redact PII'],
      edgeBotLeft: ['Prune Catalog', '& MCP tools'],
      step2Left: 'Request',
      step7Mid: 'Response',
    },
    govHubTitle: 'Triad Pillar 3: Zero-PII',
    govHubTitle2: 'OTel & FinOps Chargeback',
    govCards: {
      top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center', sub: 'Unified SIEM & Audit Lineage' },
      mid: { icon: 'bigquery_analytics', title: '3 Chargeback Models', sub: 'Even, Proportional & Tiered' },
      bot: { icon: 'bigquery_analytics', title: 'BigQuery OTel Sink', sub: 'Zero-PII Cryptographic Spans' },
    },
    midStep3Label: ['Dispatch to optimal', 'cost/security tier'],
    midStep7Label: ['Verified zero-bleed', 'agent completion'],
    midGovLabel: ['Real-time COGS &', 'security telemetry'],
    leftBoundaryLabel: 'Triad Pillar 2 (High Density): Pattern A Pooled FinOps & COGS Engine',
    leftZoneTitle: 'Pattern A: Pooled Unit Economics',
    leftZoneSub: 'Lowest COGS ($) • 84.7% Net Input Token Savings',
    leftCards: {
      modelArmor: { icon: 'valkey_cache', title: 'Valkey Rate Bulkhead', sub: '120 RPM Std / 600 RPM Ent' },
      llm: { icon: 'gemini_agent_platform', title: 'ContextCacheConfig', sub: '90% Discount on 32k Prefix' },
      runtime: { icon: 'gemini_agent_platform', title: 'Thinking Budget Cap', sub: 'Clamps 4k Std vs 8k Ent' },
      mcp: { icon: 'iap_iam_shield', title: '2LO & 3LO Auth Mgr', sub: 'Scoped Per-Tenant Vault' },
      datastore: { icon: 'datastore_alloydb_bq', title: 'AlloyDB RLS & L1–L5', sub: 'Shared Storage Density' },
      step4Label: 'Check quota',
      step6Label: 'Log COGS',
      step5Label: ['90% Cached', 'inference'],
      ragLabel: ['Zero Cache', 'Bleed'],
      toolLabel: ['Storage-Engine', 'RLS Policy'],
    },
    rightBoundaryLabel: 'Triad Pillar 2 (Regulated Scale): Pattern B Silos ($$$) & Pattern C Hybrid ($$)',
    rightZoneTitle: 'Pattern B Silos & Pattern C PSC Spokes',
    rightZoneSub: 'Zero Blast Radius + Zero-Downtime Tier Promotion',
    rightCards: {
      modelArmor: { icon: 'vpc_sc', title: 'VPC-SC & IAM PAB', sub: 'Hard Perimeter Isolation' },
      llm: { icon: 'gke', title: 'Gemma 3 & Gemini 2.5 Pro', sub: 'Air-Gapped GKE & Dedicated PT' },
      runtime: { icon: 'psc_bridge', title: 'PSC Spoke Runtime', sub: '3-Phase Live Tier Upgrade' },
      mcp: { icon: 'mcp_servers', title: 'Dedicated Silo MCP', sub: 'Zero Cross-Project Egress' },
      datastore: { icon: 'cloud_kms', title: 'Cloud KMS CMEK Lock', sub: 'Instant HTTP 423 Kill-Switch' },
      ragLabel: ['Private PSC', 'NAT Bridge'],
      toolLabel: ['Customer-Revocable', 'CMEK Keys'],
    },
  },

  // =========================================================================
  // 8. DOC-REF-07: Multimodal GraphRAG Resource Orchestration with Spanner Graph
  // =========================================================================
  {
    id: 'ref07-multimodal-graphrag-spanner',
    badge: 'REFERENCE GUIDE • MULTIMODAL GRAPHRAG',
    title: 'Multimodal GraphRAG Resource Orchestration with Cloud Spanner Graph',
    subtitle: 'Consolidating PDFs, Audio & Market Charts into Cloud Spanner Graph (ISO GQL + 768-d Vector RRF) via Cloud Run & Agent Engine',
    topUserTitle: 'Financial Analyst',
    topUserSub: 'Multimodal Query & Upload UI',
    step1LeftLabel: 'Request',
    step7RightLabel: 'Response',
    outerWrapperLabel: 'VPC Service Controls Multimodal GraphRAG Perimeter',
    innerWrapperLabel: 'Shared VPC • Sequential Ingestion & Hybrid RRF Query Planes',
    routingHubTitle: 'Coordinator & Multimodal Ingress Hub',
    routingHubSub: 'Ingress security, session state & Coordinator Agent routing',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF & Upload Rate Limiting' },
      midLeft: { icon: 'model_armor', title: 'Model Armor', sub: 'Multimodal Prompt Guardrails' },
      botLeft: { icon: 'iap_iam_shield', title: 'IAP & Enterprise OIDC', sub: 'Analyst Tenant Auth' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Global HTTPS Ingress' },
      botRight: { icon: 'cloud_run', title: 'Cloud Run Coordinator', sub: 'Routes Ingestion vs RRF Search' },
      edgeTopLeft: ['WAF & upload', 'policies'],
      edgeMidLeft: ['Sanitize', 'prompt'],
      edgeBotLeft: ['Verify analyst', 'tenant scope'],
      step2Left: 'Request',
      step7Mid: 'Response',
    },
    govHubTitle: 'Central governance and',
    govHubTitle2: 'graph lineage hub',
    govCards: {
      top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center', sub: 'Data Exfiltration & DLP Posture' },
      mid: { icon: 'iap_iam_shield', title: 'Central IAM & PAB', sub: 'Interleaved Tenant Graph ACLs' },
      bot: { icon: 'bigquery_analytics', title: 'Cloud Logging & BQ', sub: 'GQL Hop Depth & RRF Telemetry' },
    },
    midStep3Label: ['Dispatch to Ingestion', 'or Hybrid RRF Spoke'],
    midStep7Label: ['Synthesized RRF', 'citation response'],
    midGovLabel: ['Graph audit &', 'RRF latency spans'],
    leftBoundaryLabel: 'Spoke 1: Sequential Multimodal Ingestion Pipeline (Upload → Extract → Graph Upsert)',
    leftZoneTitle: 'Multimodal Ingestion Spoke',
    leftZoneSub: 'PDF, audio & chart entity extraction with deterministic entity linking',
    leftCards: {
      modelArmor: { icon: 'model_armor', title: 'Model Armor & DLP', sub: 'Redacts PII Before Graph Upsert' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro & Emb', sub: 'Entity Extraction & 768-d Vectors' },
      runtime: { icon: 'cloud_run', title: 'Extraction & Upsert Agents', sub: 'Sequential Cloud Run Pipeline' },
      mcp: { icon: 'mcp_servers', title: 'Entity Resolution MCP', sub: 'Canonical Company ID Linker' },
      datastore: { icon: 'cloud_storage', title: 'Cloud Storage & Spanner', sub: 'Raw Assets & Interleaved Graph' },
      step4Label: 'Screen asset',
      step6Label: 'Verify entity triples',
      step5Label: ['Extract nodes', '& 768-d vectors'],
      ragLabel: ['Canonical', 'Entity Match'],
      toolLabel: ['Upsert Nodes', '& GQL Edges'],
    },
    rightBoundaryLabel: 'Spoke 2: Hybrid Spanner Graph ISO GQL + ANN Vector RRF Retrieval',
    rightZoneTitle: 'Hybrid GraphRAG Search Spoke',
    rightZoneSub: 'Multi-hop ISO GQL traversal fused with ANN cosine similarity via RRF',
    rightCards: {
      modelArmor: { icon: 'model_armor', title: 'Model Armor', sub: 'Citation & Hallucination Guard' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro', sub: 'Multi-Hop Synthesis Engine' },
      runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Agent Engine', sub: 'GraphRAG Search Agent + Memory' },
      mcp: { icon: 'mcp_servers', title: 'Spanner Graph MCP', sub: 'Bounded ISO GQL + Vector Tool' },
      datastore: { icon: 'datastore_alloydb_bq', title: 'Cloud Spanner Graph', sub: 'ISO GQL + 768-d RRF Scoring' },
      ragLabel: ['Reciprocal Rank', 'Fusion (RRF)'],
      toolLabel: ['3-Hop Bounded', 'ISO GQL Query'],
    },
  },

  // =========================================================================
  // 9. DOC-REF-09: Scalable Multi-Agent Ecosystems with Agent Engine, MCP & A2A
  // =========================================================================
  {
    id: 'ref09-scalable-mcp-a2a-ecosystem',
    badge: 'REFERENCE GUIDE • AGENT ENGINE, MCP & A2A',
    title: 'Scalable Multi-Agent Ecosystems: Vertex AI Agent Engine, Stateless MCP & A2A Protocol',
    subtitle: 'Decoupling Intra-Domain Tool Access (Cloud Run Stateless MCP) from Inter-Agent Delegation (A2A Agent Cards)',
    topUserTitle: 'Enterprise Caller',
    topUserSub: 'Root Orchestrator Client',
    step1LeftLabel: 'Request',
    step7RightLabel: 'Response',
    outerWrapperLabel: 'VPC Service Controls Multi-Agent Ecosystem Perimeter',
    innerWrapperLabel: 'A2A JSON-RPC Mesh & OBO+DPoP Scope Narrowing',
    routingHubTitle: 'A2A Discovery & Federation Hub',
    routingHubSub: 'Agent Card registry (/.well-known/agent.json) & OBO token narrowing',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'Ingress WAF & Rate Control' },
      midLeft: { icon: 'model_armor', title: 'Model Armor', sub: 'Cross-Agent Payload Screen' },
      botLeft: { icon: 'iap_iam_shield', title: 'OBO + DPoP Broker', sub: 'Per-Hop Scope Narrowing' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Global A2A Gateway Ingress' },
      botRight: { icon: 'discovery_engine', title: 'Gemini Enterprise Catalog', sub: 'A2A Agent Card Discovery' },
      edgeTopLeft: ['WAF & ingress', 'policies'],
      edgeMidLeft: ['Sanitize A2A', 'task payload'],
      edgeBotLeft: ['Narrow OBO', 'token scope'],
      step2Left: 'Request',
      step7Mid: 'Response',
    },
    govHubTitle: 'Central governance and',
    govHubTitle2: 'circuit-breaker telemetry',
    govCards: {
      top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center', sub: 'A2A & MCP Posture Monitoring' },
      mid: { icon: 'iap_iam_shield', title: 'Central IAM & PAB', sub: 'Workload Identity Federation' },
      bot: { icon: 'bigquery_analytics', title: 'Cloud Trace & BigQuery', sub: '8s Deadline & 4k Token Budgets' },
    },
    midStep3Label: ['Delegate A2A task', 'via Agent Card'],
    midStep7Label: ['Aggregated multi-agent', 'JSON-RPC result'],
    midGovLabel: ['Distributed A2A &', 'MCP trace spans'],
    leftBoundaryLabel: 'Domain Spoke A: Order & Warehouse Inventory Agent (ADK + Stateless MCP)',
    leftZoneTitle: 'Order & Inventory Domain Agent',
    leftZoneSub: 'Independent ADK deployment with Stateless Cloud Run MCP Server',
    leftCards: {
      modelArmor: { icon: 'model_armor', title: 'Model Armor Spoke Guard', sub: 'Domain Input/Output Guard' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro', sub: '4,000-Token Circuit Breaker' },
      runtime: { icon: 'vertex_agent_engine', title: 'Order Agent (ADK)', sub: 'Vertex AI Agent Engine' },
      mcp: { icon: 'mcp_servers', title: 'Inventory MCP Server', sub: 'Stateless Cloud Run SSE Pool' },
      datastore: { icon: 'alloydb', title: 'BigQuery & AlloyDB', sub: 'Regional Warehouse Stock Ledger' },
      step4Label: 'Screen A2A task',
      step6Label: 'Screen A2A output',
      step5Label: ['Plan tool', 'invocations'],
      ragLabel: ['Stateless MCP', 'SSE Call'],
      toolLabel: ['Parameterized', 'Stock Query'],
    },
    rightBoundaryLabel: 'Domain Spoke B: Distributor & Logistics Tracking Agent (A2A Peer)',
    rightZoneTitle: 'Distributor & Tracking Domain Agent',
    rightZoneSub: 'Federated A2A peer with partner API circuit breakers',
    rightCards: {
      modelArmor: { icon: 'cloud_sdp_dlp', title: 'Cloud DLP & Model Armor', sub: 'Partner Payload Sanitization' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Flash', sub: '8-Second SLA Deadline' },
      runtime: { icon: 'cloud_run', title: 'Tracking Agent (A2A)', sub: 'Cloud Run + Agent Engine' },
      mcp: { icon: 'apigee_gateway', title: 'Logistics MCP Server', sub: 'Stateless Cloud Run Partner API' },
      datastore: { icon: 'cloud_spanner', title: 'BigQuery & Spanner', sub: 'Carrier Telemetry & Fallback Cache' },
      ragLabel: ['Stateless MCP', 'Tool Call'],
      toolLabel: ['Partner API &', 'Cache Fallback'],
    },
  },

  // =========================================================================
  // 10. DOC-REF-08: Zero-Trust AI Agents with Google ADK, Cloud KMS HSM & gVisor
  // =========================================================================
  {
    id: 'arch-center-zero-trust-adk',
    badge: 'GOOGLE DEVELOPERS BLOG • ZERO-TRUST ADK BLUEPRINT',
    title: 'Zero-Trust AI Agents with Google Agent Development Kit (ADK), Cloud KMS HSM & gVisor',
    subtitle: 'Cryptographic Ed25519 Agent Attestation, Semantic Firewalls, and Hardware-Isolated Sandboxes on Google Cloud',
    topUserTitle: 'Enterprise Operator',
    topUserSub: 'OIDC + Passkey MFA',
    step1LeftLabel: 'Signed Intent',
    step7RightLabel: 'Verified Output',
    outerWrapperLabel: 'Zero-Trust Defense-in-Depth Perimeter (VPC Service Controls + BeyondCorp Enterprise)',
    innerWrapperLabel: 'VPC • 5-Hop Cryptographic Attestation & Semantic Firewall Chain',
    routingHubTitle: 'Hop 1 & Hop 2: Zero-Trust Ingress & Identity Gate',
    routingHubSub: 'Google Cloud Armor WAF, Model Armor Screen & Ed25519 Signature Gate',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF, mTLS & Context-Aware IAP' },
      midLeft: { icon: 'model_armor', title: 'Model Armor Shield', sub: 'Prompt Injection & Jailbreak Gate' },
      botLeft: { icon: 'cloud_kms', title: 'Cloud KMS HSM', sub: 'Ed25519 Payload Verification' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Global Anycast TLS 1.3' },
      botRight: { icon: 'cloud_run', title: 'ADK Security Gate', sub: 'Zero-Trust Policy Coordinator' },
      edgeTopLeft: ['mTLS + WAF', 'inspection'],
      edgeMidLeft: ['Sanitize', 'prompt'],
      edgeBotLeft: ['Verify HSM', 'signature'],
      step2Left: 'Attested',
      step7Mid: 'Redacted',
    },
    govHubTitle: 'Continuous SIEM, IAM',
    govHubTitle2: '& Key Governance Hub',
    govCards: {
      top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center & Chronicle', sub: 'Real-Time Anomaly Detection' },
      mid: { icon: 'iap_iam_shield', title: 'Workload Identity', sub: 'Short-Lived SPIFFE X.509 SVID' },
      bot: { icon: 'cloud_logging', title: 'Cloud Audit Logs', sub: 'Immutable KMS & Tool Ledger' },
    },
    midStep3Label: ['Dispatch to isolated', 'ADK execution zone'],
    midStep7Label: ['DLP-scrubbed & signed', 'agent completion'],
    midGovLabel: ['Cryptographic audit', '& SIEM telemetry'],
    leftBoundaryLabel: 'Zone A: Deterministic Semantic Firewall & Policy Reasoning Plane',
    leftZoneTitle: 'ADK Coordinator & Semantic Firewall',
    leftZoneSub: 'In-Line Parameter AST Validation & Least-Privilege Scoping',
    leftCards: {
      modelArmor: { icon: 'apigee_gateway', title: 'Semantic Firewall', sub: 'Blocks Destructive SQL/Shell' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro', sub: 'Constrained JSON Schema Gen' },
      runtime: { icon: 'vertex_agent_engine', title: 'PolicyEnforcerAgent', sub: 'ADK LlmAgent + Callbacks' },
      mcp: { icon: 'mcp_servers', title: 'MCP Schema Validator', sub: 'Strict Allowlist & Arg Bounds' },
      datastore: { icon: 'alloydb', title: 'AlloyDB Policy Store', sub: 'Row-Level Security (RLS)' },
      step4Label: 'Validate AST',
      step6Label: 'DLP Scrub',
      step5Label: ['Signed', 'reasoning'],
      ragLabel: ['Scoped MCP', 'Allowlist'],
      toolLabel: ['Read-Only', 'RLS Query'],
    },
    rightBoundaryLabel: 'Zone B: Ephemeral gVisor Sandbox & Human-in-the-Loop (HITL) Vault',
    rightZoneTitle: 'Hardware-Isolated Tool Execution Enclave',
    rightZoneSub: 'Cloud Run gVisor (runsc --network=none) + KMS Approval Gate',
    rightCards: {
      modelArmor: { icon: 'cloud_sdp_dlp', title: 'Egress DLP Guard', sub: 'Redacts Secrets, Keys & PII' },
      llm: { icon: 'cloud_trace', title: 'SandboxAuditorAgent', sub: 'Monitors Syscall & Memory' },
      runtime: { icon: 'gke', title: 'gVisor Sandbox Pod', sub: 'runsc --network=none Enclave' },
      mcp: { icon: 'discovery_engine', title: 'HITL Approval Gate', sub: 'Requires Signed Operator JWT' },
      datastore: { icon: 'secret_manager', title: 'CMEK Secret Vault', sub: 'Hardware HSM Key Rotation' },
      ragLabel: ['Zero-Egress', 'IPC Socket'],
      toolLabel: ['HSM-Signed', 'Mutations'],
    },
  },
];

/**
 * Dynamically builds an Official Google Cloud Architecture Center Hub-and-Spoke
 * blueprint configuration tailored to any UseCaseBlogPreset and workflow tab.
 */
export function buildOfficialArchCenterConfigForUseCase(
  useCase?: {
    id?: string;
    shortLabel?: string;
    title?: string;
    subtitle?: string;
    summaryPrompt?: string;
    domainName?: string;
    rootAgentName?: string;
    subAgents?: Array<{ name: string; role: string; tools: string[] }>;
    primaryDataStore?: string;
    secondaryDataStore?: string;
    primaryDataStores?: string[];
    securityControls?: string[];
  },
  workflowVariant: 'high-level' | 'ingestion' | 'search' = 'high-level'
): OfficialArchCenterBlueprintConfig {
  if (!useCase || useCase.id === 'uc-multi-tenant-agentic-saas') {
    if (workflowVariant === 'ingestion') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[1]; // WS1.3 5-Hop Context Chain
    if (workflowVariant === 'search') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[2]; // WS2.1 Pattern A Pooled
    return OFFICIAL_ARCH_CENTER_BLUEPRINTS[0]; // WS1.1 Overview
  }

  if (useCase.id === 'uc-ws2-pattern-a-pooled') {
    if (workflowVariant === 'ingestion') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[1]; // WS1.3 5-Hop Context Chain
    if (workflowVariant === 'search') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[3]; // WS2.5 10-Point Breach Defense
    return OFFICIAL_ARCH_CENTER_BLUEPRINTS[2]; // WS2.1 Pattern A Pooled
  }

  if (useCase.id === 'uc-ws2-breach-simulation') {
    if (workflowVariant === 'ingestion') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[1]; // WS1.3 5-Hop Context Chain
    if (workflowVariant === 'search') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[2]; // WS2.1 Pattern A Pooled
    return OFFICIAL_ARCH_CENTER_BLUEPRINTS[3]; // WS2.5 10-Point Breach Defense
  }

  if (useCase.id === 'uc-ws3-pattern-b-sovereign-silos') {
    if (workflowVariant === 'ingestion') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[1]; // WS1.3 5-Hop Context Chain
    if (workflowVariant === 'search') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[3]; // WS2.5 10-Point Breach Defense
    return OFFICIAL_ARCH_CENTER_BLUEPRINTS[4]; // WS3.1 Pattern B Sovereign Silos
  }

  if (useCase.id === 'uc-ws4-pattern-c-hybrid-psc') {
    if (workflowVariant === 'ingestion') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[2]; // WS2.1 Pattern A Pooled
    if (workflowVariant === 'search') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[4]; // WS3.1 Pattern B Sovereign Silos
    return OFFICIAL_ARCH_CENTER_BLUEPRINTS[5]; // WS4.1 Pattern C Hybrid PSC
  }

  if (useCase.id === 'uc-ws5-decision-guide-triad') {
    if (workflowVariant === 'ingestion') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[2]; // WS2.1 Pattern A Pooled
    if (workflowVariant === 'search') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[5]; // WS4.1 Pattern C Hybrid PSC
    return OFFICIAL_ARCH_CENTER_BLUEPRINTS[6]; // WS5 Capstone Decision Guide & Triad
  }

  if (useCase.id === 'uc-scalable-agent-engine') {
    if (workflowVariant === 'ingestion') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[2]; // WS2.1 Pattern A
    if (workflowVariant === 'search') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[5]; // WS4.1 Pattern C
    return OFFICIAL_ARCH_CENTER_BLUEPRINTS.find((b) => b.id === 'ref09-scalable-mcp-a2a-ecosystem') || OFFICIAL_ARCH_CENTER_BLUEPRINTS[8];
  }

  if (useCase.id === 'uc-zero-trust-adk') {
    if (workflowVariant === 'ingestion') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[3]; // WS2.5 Breach Defense
    if (workflowVariant === 'search') return OFFICIAL_ARCH_CENTER_BLUEPRINTS[4]; // WS3.1 Sovereign Silos
    return OFFICIAL_ARCH_CENTER_BLUEPRINTS.find((b) => b.id === 'arch-center-zero-trust-adk') || OFFICIAL_ARCH_CENTER_BLUEPRINTS[9];
  }

  if (useCase.id === 'uc-multimodal-graphrag') {
    const wfTitleSuffix =
      workflowVariant === 'ingestion'
        ? ' — Sequential Multi-Agent Data Ingestion & Entity Extraction Flow'
        : workflowVariant === 'search'
        ? ' — Hybrid Spanner GraphRAG (ISO GQL + Vector RRF) & Action Flow'
        : '';
    return {
      id: `arch-center-multimodal-graphrag-${workflowVariant}`,
      badge: `CLOUD ARCHITECTURE CENTER • ${workflowVariant.toUpperCase()} BLUEPRINT (#78)`,
      title: `Agentic AI Multimodal GraphRAG & Resource Orchestration on Google Cloud${wfTitleSuffix}`,
      subtitle: 'Unifying Vertex AI Gemini 2.5 Pro, Cloud Spanner Graph (ISO GQL), Vector Search 2.0, and ADK Multi-Agent Orchestration',
      topUserTitle: 'SRE & Operations Lead',
      topUserSub: 'Multimodal Incident Console',
      step1LeftLabel: workflowVariant === 'ingestion' ? 'Ingest Payload' : 'Incident Query',
      step7RightLabel: workflowVariant === 'ingestion' ? 'Graph Upsert Receipt' : 'Action Plan',
      outerWrapperLabel: 'Google Cloud Production Perimeter (VPC Service Controls + Cloud KMS CMEK)',
      innerWrapperLabel: 'Shared VPC • Multimodal Ingestion, Hybrid GraphRAG & Remediation Mesh',
      routingHubTitle: 'Ingress, Guardrails & ADK Coordinator Hub',
      routingHubSub: 'Google Cloud Armor Edge PEP, Model Armor & IncidentCoordinatorAgent',
      routingCards: {
        topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF & Identity-Aware IAP' },
        midLeft: { icon: 'model_armor', title: 'Model Armor', sub: 'Multimodal Prompt & PII Screen' },
        botLeft: { icon: 'iap_iam_shield', title: 'Apigee X & IAM', sub: 'OAuth 2.0 & Tool Token Broker' },
        topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Global HTTPS Ingress' },
        botRight: { icon: 'cloud_run', title: 'Cloud Run ADK Host', sub: 'IncidentCoordinatorAgent' },
        edgeTopLeft: ['WAF & IAP', 'policies'],
        edgeMidLeft: ['Sanitize', 'multimodal'],
        edgeBotLeft: ['Verify OIDC', '& IAM scope'],
        step2Left: 'Dispatch',
        step7Mid: 'Synthesize',
      },
      govHubTitle: 'SRE Observability, FinOps',
      govHubTitle2: '& Safety Governance Hub',
      govCards: {
        top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center', sub: 'Blast-Radius & Policy Audit' },
        mid: { icon: 'iap_iam_shield', title: 'Cloud Monitoring', sub: 'OpenTelemetry Trace & Latency' },
        bot: { icon: 'cloud_logging', title: 'BigQuery Ops Ledger', sub: 'Token COGS & Citation Audit' },
      },
      midStep3Label: ['Parallel dispatch to', 'Ingestion & GraphRAG'],
      midStep7Label: ['Grounded remediation', 'with Spanner citations'],
      midGovLabel: ['OpenTelemetry traces', '& safety audit logs'],
      leftBoundaryLabel: 'Workflow Spoke A: Sequential Multimodal Ingestion & Knowledge Extraction',
      leftZoneTitle: 'Multimodal Ingestion & Entity Pipeline',
      leftZoneSub: 'PDF Runbooks, Architecture Diagrams, Audio Logs & Telemetry Streams',
      leftCards: {
        modelArmor: { icon: 'model_armor', title: 'Cloud DLP Redactor', sub: 'De-Identifies PII Before Index' },
        llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Flash', sub: 'Multimodal Entity & Edge Parser' },
        runtime: { icon: 'gemini_agent_platform', title: 'MultimodalIngestAgent', sub: 'Dataflow + Document AI Pipeline' },
        mcp: { icon: 'mcp_servers', title: 'text-embedding-005', sub: '768-Dim Dense Vector Chunks' },
        datastore: { icon: 'datastore_alloydb_bq', title: 'Cloud Storage & PubSub', sub: 'Raw Diagrams, PDFs & Streams' },
        step4Label: 'Redact PII',
        step6Label: 'Emit Upsert',
        step5Label: ['Extract', 'triples'],
        ragLabel: ['Generate', 'Embeddings'],
        toolLabel: ['Stream Raw', 'Artifacts'],
      },
      rightBoundaryLabel: 'Workflow Spoke B: Hybrid Spanner GraphRAG & Safe Resource Remediation',
      rightZoneTitle: 'Spanner GraphRAG & Action Execution',
      rightZoneSub: 'ISO GQL k-Hop Traversal + Vector RRF Fusion + Cloud Workflows HITL',
      rightCards: {
        modelArmor: { icon: 'model_armor', title: 'Remediation Guard', sub: 'Validates Rollout Blast Radius' },
        llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro', sub: 'RRF Fusion & Root-Cause Synthesis' },
        runtime: { icon: 'gemini_agent_platform', title: 'GraphRagSearchAgent', sub: 'Parallel Vector + GQL Retriever' },
        mcp: { icon: 'mcp_servers', title: 'MCP Remediation Server', sub: 'Cloud Workflows + GKE Patch' },
        datastore: { icon: 'datastore_alloydb_bq', title: 'Cloud Spanner Graph', sub: 'ISO GQL + Vector Search 2.0' },
        ragLabel: ['Execute Safe', 'Rollout'],
        toolLabel: ['3-Hop GQL +', 'ANN Search'],
      },
    };
  }

  // Dynamic, topic-faithful adaptation for any custom use case or domain preset
  const sub1 = useCase.subAgents?.[0] || { name: 'IngestionSubAgent', role: 'Data & Event Ingestion', tools: ['ingest_stream'] };
  const sub2 = useCase.subAgents?.[1] || { name: 'GraphRagReasoner', role: 'Hybrid Knowledge Retrieval', tools: ['query_graph'] };
  const sub3 = useCase.subAgents?.[2] || { name: 'ActionExecutorAgent', role: 'Governed Tool Execution', tools: ['execute_workflow'] };
  const store1Raw =
    useCase.primaryDataStore ||
    useCase.primaryDataStores?.[0] ||
    'Cloud Spanner Graph';
  const store2Raw =
    useCase.secondaryDataStore ||
    useCase.primaryDataStores?.[1] ||
    'AlloyDB & BigQuery';
  const store1Title = store1Raw.split('+')[0].trim().slice(0, 22) || 'Cloud Spanner Graph';
  const store2Title = store2Raw.split('+')[0].trim().slice(0, 22) || 'AlloyDB & BigQuery';
  const sub2Title = (sub2.name || 'DomainReasoningAgent').slice(0, 22);
  const sub3Title =
    (sub3.name || 'ActionExecutorAgent').slice(0, 22) === sub2Title
      ? 'GovernedActionAgent'
      : (sub3.name || 'ActionExecutorAgent').slice(0, 22);
  const wfLabel =
    workflowVariant === 'ingestion'
      ? ' — Sequential Data Ingestion & MCP Pipeline'
      : workflowVariant === 'search'
      ? ' — Hybrid GraphRAG Search & Governed Action Flow'
      : '';
  const resolvedSubtitle =
    useCase.subtitle ||
    (useCase.summaryPrompt ? useCase.summaryPrompt.slice(0, 125) : undefined) ||
    'Production Reference Architecture with Vertex AI Agent Engine, Model Armor & MCP';

  return {
    id: `arch-center-${useCase.id || 'custom'}-${workflowVariant}`,
    badge: `GOOGLE CLOUD ARCHITECTURE CENTER • ${(useCase.domainName || 'ENTERPRISE').toUpperCase()} (${workflowVariant.toUpperCase()} #78)`,
    title: `${useCase.title || 'Enterprise Multi-Agent Architecture on Google Cloud'}${wfLabel}`,
    subtitle: resolvedSubtitle,
    topUserTitle: `${useCase.shortLabel || 'Enterprise'} Users`,
    topUserSub: 'OIDC / BeyondCorp Access',
    step1LeftLabel: workflowVariant === 'ingestion' ? 'Ingest Stream' : 'Request',
    step7RightLabel: workflowVariant === 'ingestion' ? 'Upsert Receipt' : 'Response',
    outerWrapperLabel: `${useCase.domainName || 'Enterprise'} Governance Perimeter (VPC Service Controls + Cloud KMS CMEK)`,
    innerWrapperLabel: `VPC • ${useCase.rootAgentName || 'ADK Root Coordinator'} & 5-Hop Context Chain`,
    routingHubTitle: 'Routing & Policy Enforcement Hub (PEP/PDP)',
    routingHubSub: 'Central ingress, Model Armor screening & ADK orchestration',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF & Zero-Trust IAP Access' },
      midLeft: { icon: 'model_armor', title: 'Model Armor Shield', sub: 'Prompt Injection & DLP Filter' },
      botLeft: { icon: 'apigee_gateway', title: 'Apigee X & IAM', sub: 'OAuth 2.0 & Token Exchange' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'External Application', title2: 'Load Balancer', sub: 'Cloud Load Balancing' },
      botRight: { icon: 'cloud_run', title: 'Cloud Run Coordinator', sub: (useCase.rootAgentName || 'RootCoordinatorAgent').slice(0, 30) },
      edgeTopLeft: ['WAF & IAP', 'policies'],
      edgeMidLeft: ['Sanitize', 'prompt'],
      edgeBotLeft: ['Verify IAM', '& OBO token'],
      step2Left: 'Request',
      step7Mid: 'Response',
    },
    govHubTitle: 'Central governance and',
    govHubTitle2: 'FinOps observability hub',
    govCards: {
      top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center', sub: 'Continuous Threat & Drift Detection' },
      mid: { icon: 'cloud_kms', title: 'Cloud KMS & IAM', sub: (useCase.securityControls?.[0] || 'CMEK & Least-Privilege IAM').slice(0, 30) },
      bot: { icon: 'bigquery_analytics', title: 'Cloud Logging & BQ', sub: 'OpenTelemetry & Token FinOps' },
    },
    midStep3Label: ['Route to specialist', 'ADK agent spokes'],
    midStep7Label: ['Sanitized response', 'with grounded citations'],
    midGovLabel: ['Security, OTel & FinOps', 'telemetry spans'],
    leftBoundaryLabel: `Spoke A: ${sub1.name} & ${sub2.name} (Knowledge & Reasoning Plane)`,
    leftZoneTitle: `${useCase.shortLabel || 'Domain'} Reasoning & RAG Pool`,
    leftZoneSub: `${sub1.name} + ${sub2.name}`,
    leftCards: {
      modelArmor: { icon: 'cloud_sdp_dlp', title: 'Cloud DLP & Guardrails', sub: 'Domain Guardrails & PII Redaction' },
      llm: { icon: 'gemini_agent_platform', title: 'Gemini 2.5 Pro', sub: '90% Context Prefix Caching' },
      runtime: { icon: 'vertex_agent_engine', title: sub2Title, sub: (sub2.role || 'Hybrid Knowledge Retrieval').slice(0, 30) },
      mcp: { icon: 'mcp_servers', title: 'MCP Retrieval Tools', sub: (sub2.tools?.join(', ') || 'hybrid_graphrag_search').slice(0, 30) },
      datastore: { icon: 'cloud_spanner', title: store1Title, sub: 'Vector Search + Graph Index' },
      step4Label: 'Sanitize request',
      step6Label: 'Sanitize response',
      step5Label: ['Generates', 'response'],
      ragLabel: ['Grounded', 'MCP & RAG'],
      toolLabel: ['Low-Latency', 'Index Query'],
    },
    rightBoundaryLabel: `Spoke B: ${sub3.name} & Sovereign Transaction Enclave`,
    rightZoneTitle: 'Governed Action & Transaction Spoke',
    rightZoneSub: `VPC-SC + Cloud KMS CMEK + ${sub3.name}`,
    rightCards: {
      modelArmor: { icon: 'vpc_sc', title: 'VPC-SC & Action Gate', sub: 'Pre-Commit Policy Verification' },
      llm: { icon: 'cloud_trace', title: 'Gemini 2.5 Flash', sub: 'Deterministic Schema Validator' },
      runtime: { icon: 'gke', title: sub3Title, sub: (sub3.role || 'Governed Tool Execution').slice(0, 30) },
      mcp: { icon: 'discovery_engine', title: 'MCP Action Connectors', sub: (sub3.tools?.join(', ') || 'execute_transactional_tool').slice(0, 30) },
      datastore: {
        icon: 'alloydb',
        title: store2Title === store1Title ? 'AlloyDB & Audit Store' : store2Title,
        sub: 'ACID Ledger & Audit Trail',
      },
      ragLabel: ['Governed', 'Tool Call'],
      toolLabel: ['CMEK-Encrypted', 'State Commit'],
    },
  };
}

function fitAttr(str: string | undefined, maxPx: number, charPx: number): string {
  const s = String(str ?? '');
  if (s.length * charPx > maxPx) {
    return ` textLength="${maxPx}" lengthAdjust="spacingAndGlyphs"`;
  }
  return '';
}

function renderArchCardSvg(params: {
  x: number;
  y: number;
  w: number;
  h: number;
  iconKey: string;
  title: string;
  title2?: string;
  sub: string;
}): string {
  const { x, y, w, h, iconKey, title, title2, sub } = params;
  const iconDataUri = resolveArchIconUri(iconKey, title, sub);
  const iconSize = 32;
  const iconX = x + 10;
  const iconY = y + Math.round((h - iconSize) / 2);
  const textX = iconX + iconSize + 10;
  const maxTextW = w - (textX - x) - 10;

  let textSvg = '';
  if (title2 && sub) {
    textSvg = `
      <text x="${textX}" y="${y + 23}" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" font-weight="700" fill="#202124"${fitAttr(title, maxTextW, 7.6)}>${escXml(title)}</text>
      <text x="${textX}" y="${y + 41}" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" font-weight="700" fill="#202124"${fitAttr(title2, maxTextW, 7.6)}>${escXml(title2)}</text>
      <text x="${textX}" y="${y + 59}" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="11.5" font-weight="400" fill="#3c4043"${fitAttr(sub, maxTextW, 6.2)}>${escXml(sub)}</text>
    `;
  } else if (title2) {
    textSvg = `
      <text x="${textX}" y="${y + 30}" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="14" font-weight="700" fill="#202124"${fitAttr(title, maxTextW, 7.8)}>${escXml(title)}</text>
      <text x="${textX}" y="${y + 50}" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="14" font-weight="700" fill="#202124"${fitAttr(title2, maxTextW, 7.8)}>${escXml(title2)}</text>
    `;
  } else if (sub) {
    textSvg = `
      <text x="${textX}" y="${y + Math.round(h / 2) - 4}" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" font-weight="700" fill="#202124"${fitAttr(title, maxTextW, 7.6)}>${escXml(title)}</text>
      <text x="${textX}" y="${y + Math.round(h / 2) + 15}" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="11.5" font-weight="400" fill="#3c4043"${fitAttr(sub, maxTextW, 6.2)}>${escXml(sub)}</text>
    `;
  } else {
    textSvg = `
      <text x="${textX}" y="${y + Math.round(h / 2) + 5}" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="14" font-weight="700" fill="#202124"${fitAttr(title, maxTextW, 7.8)}>${escXml(title)}</text>
    `;
  }

  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" ry="6" fill="#ffffff" stroke="#202124" stroke-width="2"/>
      <image x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" preserveAspectRatio="xMidYMid meet" xlink:href="${iconDataUri}"/>
      ${textSvg}
    </g>
  `;
}

function renderStepCircleSvg(cx: number, cy: number, num: string): string {
  return `
    <g>
      <circle cx="${cx}" cy="${cy}" r="20" fill="#174ea6"/>
      <text x="${cx}" y="${cy + 6}" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="17" font-weight="700" fill="#ffffff">${escXml(num)}</text>
    </g>
  `;
}

/**
 * Compiles the standalone 1:1 SVG matching workstream-specific Google Cloud topologies
 * or the causal Hub-and-Spoke reference architecture.
 */
export function compileOfficialArchCenterSvg(bp: OfficialArchCenterBlueprintConfig): string {
  const W = 1200;
  const H = 1410;

  const rc = bp.routingCards;
  const gc = bp.govCards;
  const lc = bp.leftCards;
  const sc = bp.rightCards;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 ${W} ${H}" width="100%" height="100%">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 1 1.5 L 8 5 L 1 8.5" fill="none" stroke="#202124" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>

  <text x="20" y="22" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13" font-weight="700" fill="#174ea6">[${escXml(bp.badge)}] ${escXml(bp.title)}</text>
  <text x="20" y="40" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="11.5" font-weight="400" fill="#5f6368">${escXml(bp.subtitle)}</text>

  <!-- TOP EXTERNAL USER / TENANT BOX -->
  <g>
    <rect x="465" y="52" width="250" height="86" rx="8" ry="8" fill="#ffffff" stroke="#202124" stroke-width="2"/>
    <circle cx="590" cy="76" r="9.5" fill="#000000"/>
    <path d="M 573 101 C 573 91 607 91 607 101 Z" fill="#000000"/>
    <text x="590" y="117" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" font-weight="700" fill="#202124">${escXml(bp.topUserTitle)}</text>
    <text x="590" y="132" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="11" font-weight="400" fill="#3c4043">${escXml(bp.topUserSub)}</text>
  </g>

  <!-- OUTER GOOGLE CLOUD CONTAINER (#1a73e8) -->
  <rect x="20" y="218" width="1160" height="1172" rx="18" ry="18" fill="#1a73e8" stroke="#202124" stroke-width="1.2"/>
  <image x="38" y="232" width="138" height="25" preserveAspectRatio="xMidYMid meet" xlink:href="${OFFICIAL_ASSETS.gcp_wordmark_white}"/>

  <!-- NESTED WHITE BOUNDARY 1 -->
  <rect x="36" y="268" width="1128" height="1104" rx="14" ry="14" fill="#ffffff" stroke="#202124" stroke-width="1.2"/>
  <text x="52" y="291" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" font-weight="700" fill="#202124"${fitAttr(bp.outerWrapperLabel, 495, 7.5)}>${escXml(bp.outerWrapperLabel)}</text>

  <!-- NESTED WHITE BOUNDARY 2 -->
  <rect x="52" y="304" width="1096" height="1050" rx="14" ry="14" fill="#ffffff" stroke="#202124" stroke-width="1.2"/>
  <text x="68" y="327" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" font-weight="700" fill="#202124"${fitAttr(bp.innerWrapperLabel, 480, 7.5)}>${escXml(bp.innerWrapperLabel)}</text>

  <!-- ZONE 1: ROUTING HUB (Pastel Blue #aecbfa) -->
  <rect x="68" y="338" width="664" height="330" rx="6" ry="6" fill="#aecbfa" stroke="#202124" stroke-width="1"/>
  <text x="84" y="363" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="15" font-weight="700" fill="#202124">${escXml(bp.routingHubTitle)}</text>
  <text x="84" y="381" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13" font-weight="400" fill="#202124">${escXml(bp.routingHubSub)}</text>

  ${renderArchCardSvg({ x: 88, y: 398, w: 204, h: 66, iconKey: rc.topLeft.icon, title: rc.topLeft.title, sub: rc.topLeft.sub })}
  ${renderArchCardSvg({ x: 88, y: 482, w: 204, h: 66, iconKey: rc.midLeft.icon, title: rc.midLeft.title, sub: rc.midLeft.sub })}
  ${renderArchCardSvg({ x: 96, y: 580, w: 196, h: 66, iconKey: rc.botLeft.icon, title: rc.botLeft.title, sub: rc.botLeft.sub })}
  ${renderArchCardSvg({ x: 452, y: 432, w: 262, h: 76, iconKey: rc.topRight.icon, title: rc.topRight.title, title2: rc.topRight.title2, sub: rc.topRight.sub })}
  ${renderArchCardSvg({ x: 476, y: 580, w: 224, h: 66, iconKey: rc.botRight.icon, title: rc.botRight.title, sub: rc.botRight.sub })}

  <line x1="566" y1="138" x2="566" y2="430" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="612" y1="432" x2="612" y2="140" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="536" y="185" text-anchor="end" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="14" fill="#202124">${escXml(bp.step1LeftLabel)}</text>
  ${renderStepCircleSvg(566, 180, '1')}
  ${renderStepCircleSvg(612, 180, '7')}
  <text x="640" y="185" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="14" fill="#202124">${escXml(bp.step7RightLabel)}</text>

  <path d="M 452 470 L 418 470 L 418 431 L 294 431" fill="none" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <path d="M 418 470 L 418 515 L 294 515" fill="none" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="418" y1="470" x2="450" y2="470" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="358" y="408" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(rc.edgeTopLeft[0])}</text>
  <text x="358" y="425" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(rc.edgeTopLeft[1])}</text>
  <text x="358" y="534" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(rc.edgeMidLeft[0])}</text>
  <text x="358" y="551" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(rc.edgeMidLeft[1])}</text>

  <line x1="294" y1="613" x2="474" y2="613" stroke="#202124" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
  <text x="384" y="590" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(rc.edgeBotLeft[0])}</text>
  <text x="384" y="607" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(rc.edgeBotLeft[1])}</text>

  <line x1="566" y1="508" x2="566" y2="578" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="612" y1="580" x2="612" y2="510" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="536" y="548" text-anchor="end" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="14" fill="#202124">${escXml(rc.step2Left)}</text>
  ${renderStepCircleSvg(566, 543, '2')}
  ${renderStepCircleSvg(612, 543, '7')}
  <text x="640" y="548" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="14" fill="#202124">${escXml(rc.step7Mid)}</text>

  <!-- ZONE 2: CENTRAL GOVERNANCE & SECURITY HUB (Pastel Green #ceead6) -->
  <rect x="798" y="346" width="328" height="320" rx="6" ry="6" fill="#ceead6" stroke="#202124" stroke-width="1"/>
  <text x="816" y="372" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="15" font-weight="700" fill="#202124">${escXml(bp.govHubTitle)}</text>
  <text x="816" y="390" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="15" font-weight="700" fill="#202124">${escXml(bp.govHubTitle2)}</text>

  ${renderArchCardSvg({ x: 824, y: 406, w: 276, h: 72, iconKey: gc.top.icon, title: gc.top.title, title2: gc.top.title2, sub: gc.top.sub })}
  ${renderArchCardSvg({ x: 830, y: 492, w: 264, h: 68, iconKey: gc.mid.icon, title: gc.mid.title, sub: gc.mid.sub })}
  ${renderArchCardSvg({ x: 828, y: 574, w: 268, h: 68, iconKey: gc.bot.icon, title: gc.bot.title, sub: gc.bot.sub })}

  <!-- ZONE 3: LEFT TENANT / POOL PROJECT (Warm Yellow #feefc3) -->
  <rect x="70" y="772" width="516" height="560" rx="8" ry="8" fill="#ffffff" stroke="#202124" stroke-width="1.2"/>
  <text x="86" y="795" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13" font-weight="700" fill="#202124"${fitAttr(bp.leftBoundaryLabel, 344, 7.2)}>${escXml(bp.leftBoundaryLabel)}</text>

  <rect x="86" y="808" width="484" height="508" rx="6" ry="6" fill="#feefc3" stroke="#202124" stroke-width="1"/>
  <text x="104" y="834" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="15" font-weight="700" fill="#202124">${escXml(bp.leftZoneTitle)}</text>
  <text x="104" y="852" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13" font-weight="400" fill="#202124">${escXml(bp.leftZoneSub)}</text>

  ${renderArchCardSvg({ x: 96, y: 874, w: 194, h: 72, iconKey: lc.modelArmor.icon, title: lc.modelArmor.title, sub: lc.modelArmor.sub })}
  ${renderArchCardSvg({ x: 96, y: 1110, w: 194, h: 72, iconKey: lc.llm.icon, title: lc.llm.title, sub: lc.llm.sub })}
  ${renderArchCardSvg({ x: 342, y: 924, w: 214, h: 74, iconKey: lc.runtime.icon, title: lc.runtime.title, sub: lc.runtime.sub })}
  ${renderArchCardSvg({ x: 342, y: 1068, w: 214, h: 74, iconKey: lc.mcp.icon, title: lc.mcp.title, sub: lc.mcp.sub })}
  ${renderArchCardSvg({ x: 342, y: 1218, w: 214, h: 74, iconKey: lc.datastore.icon, title: lc.datastore.title, sub: lc.datastore.sub })}

  <!-- Causal Top-to-Bottom Step Sequence: 4 (Sanitize Request) -> 5 (LLM Generate) -> 6 (Sanitize Output) -->
  ${renderStepCircleSvg(120, 976, '4')}
  <text x="148" y="981" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(lc.step4Label)}</text>

  ${renderStepCircleSvg(120, 1024, '6')}
  <text x="148" y="1029" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(lc.step6Label)}</text>

  ${renderStepCircleSvg(120, 1214, '5')}
  <text x="148" y="1210" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(lc.step5Label[0])}</text>
  <text x="148" y="1227" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(lc.step5Label[1])}</text>

  <path d="M 290 910 L 312 910 L 312 946 L 342 946" fill="none" stroke="#202124" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
  <path d="M 290 1146 L 320 1146 L 320 972 L 342 972" fill="none" stroke="#202124" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>

  <line x1="448" y1="1068" x2="448" y2="1054" stroke="#202124" stroke-width="2" marker-start="url(#arrow)"/>
  <line x1="448" y1="1014" x2="448" y2="1000" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="448" y="1029" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(lc.ragLabel[0])}</text>
  <text x="448" y="1046" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(lc.ragLabel[1])}</text>

  <line x1="448" y1="1218" x2="448" y2="1204" stroke="#202124" stroke-width="2" marker-start="url(#arrow)"/>
  <line x1="448" y1="1158" x2="448" y2="1144" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="448" y="1176" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(lc.toolLabel[0])}</text>
  <text x="448" y="1193" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(lc.toolLabel[1])}</text>

  <!-- ZONE 4: RIGHT TENANT / SPOKE PROJECT (Coral #fad2cf) -->
  <rect x="614" y="772" width="516" height="560" rx="8" ry="8" fill="#ffffff" stroke="#202124" stroke-width="1.2"/>
  <text x="630" y="795" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13" font-weight="700" fill="#202124"${fitAttr(bp.rightBoundaryLabel, 344, 7.2)}>${escXml(bp.rightBoundaryLabel)}</text>

  <rect x="630" y="808" width="484" height="508" rx="6" ry="6" fill="#fad2cf" stroke="#202124" stroke-width="1"/>
  <text x="648" y="834" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="15" font-weight="700" fill="#202124">${escXml(bp.rightZoneTitle)}</text>
  <text x="648" y="852" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13" font-weight="400" fill="#202124">${escXml(bp.rightZoneSub)}</text>

  ${renderArchCardSvg({ x: 640, y: 874, w: 194, h: 72, iconKey: sc.modelArmor.icon, title: sc.modelArmor.title, sub: sc.modelArmor.sub })}
  ${renderArchCardSvg({ x: 640, y: 976, w: 194, h: 72, iconKey: sc.llm.icon, title: sc.llm.title, sub: sc.llm.sub })}
  ${renderArchCardSvg({ x: 886, y: 924, w: 214, h: 74, iconKey: sc.runtime.icon, title: sc.runtime.title, sub: sc.runtime.sub })}
  ${renderArchCardSvg({ x: 886, y: 1068, w: 214, h: 74, iconKey: sc.mcp.icon, title: sc.mcp.title, sub: sc.mcp.sub })}
  ${renderArchCardSvg({ x: 886, y: 1218, w: 214, h: 74, iconKey: sc.datastore.icon, title: sc.datastore.title, sub: sc.datastore.sub })}

  <path d="M 834 910 L 856 910 L 856 946 L 886 946" fill="none" stroke="#202124" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
  <path d="M 834 1012 L 864 1012 L 864 972 L 886 972" fill="none" stroke="#202124" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>

  <line x1="992" y1="1068" x2="992" y2="1054" stroke="#202124" stroke-width="2" marker-start="url(#arrow)"/>
  <line x1="992" y1="1014" x2="992" y2="1000" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="992" y="1029" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(sc.ragLabel[0])}</text>
  <text x="992" y="1046" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(sc.ragLabel[1])}</text>

  <line x1="992" y1="1218" x2="992" y2="1204" stroke="#202124" stroke-width="2" marker-start="url(#arrow)"/>
  <line x1="992" y1="1158" x2="992" y2="1144" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="992" y="1176" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(sc.toolLabel[0])}</text>
  <text x="992" y="1193" text-anchor="middle" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(sc.toolLabel[1])}</text>

  <!-- MIDDLE ROUTING & OBSERVABILITY TRUNK -->
  <line x1="586" y1="744" x2="586" y2="648" stroke="#202124" stroke-width="2" marker-end="url(#arrow)"/>
  <path d="M 448 922 L 448 744 L 992 744 L 992 922" fill="none" stroke="#202124" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>

  <path d="M 328 770 L 328 730 L 962 730 L 962 668" fill="none" stroke="#202124" stroke-width="2" stroke-dasharray="6,6" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
  <path d="M 872 730 L 872 770" fill="none" stroke="#202124" stroke-width="2" stroke-dasharray="6,6" marker-end="url(#arrow)"/>

  ${renderStepCircleSvg(404, 700, '3')}
  <text x="432" y="695" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(bp.midStep3Label[0])}</text>
  <text x="432" y="713" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(bp.midStep3Label[1])}</text>

  ${renderStepCircleSvg(616, 700, '7')}
  <text x="644" y="695" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(bp.midStep7Label[0])}</text>
  <text x="644" y="713" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13.5" fill="#202124">${escXml(bp.midStep7Label[1])}</text>

  <text x="974" y="688" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13" fill="#202124">${escXml(bp.midGovLabel[0] || '')}</text>
  <text x="974" y="705" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13" fill="#202124">${escXml(bp.midGovLabel[1] || '')}</text>
  <text x="974" y="722" font-family="'Google Sans', 'Roboto', Arial, sans-serif" font-size="13" fill="#202124">${escXml(bp.midGovLabel[2] || '')}</text>
</svg>`;
}

/**
 * Compiles 1:1 editable Draw.io XML (.drawio & .drawio.xml) matching the exact
 * Google Cloud Architecture Center Hub-and-Spoke layout with embedded base64 icons,
 * official Google Cloud wordmark, step badges, and pure coordinate-bound edges.
 */
export function compileOfficialArchCenterDrawioXml(bp: OfficialArchCenterBlueprintConfig): string {
  const rc = bp.routingCards;
  const gc = bp.govCards;
  const lc = bp.leftCards;
  const sc = bp.rightCards;

  const SVG_GUARD = '<svg width="0" height="0" style="display:none;"></svg>';
  const bgCells: string[] = [];
  const edgeCells: string[] = [];
  const fgCells: string[] = [];
  const vertexBounds = new Map<string, { x: number; y: number; w: number; h: number }>();

  const addVertex = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    rawHtmlValue: string,
    style: string,
    isBackground = false
  ) => {
    vertexBounds.set(id, { x, y, w, h });
    const cellXml = `        <mxCell id="${id}" value="${escXml(rawHtmlValue)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
    if (isBackground) {
      bgCells.push(cellXml);
    } else {
      fgCells.push(cellXml);
    }
    return id;
  };

  const addPointEdge = (
    id: string,
    srcPt: [number, number],
    tgtPt: [number, number],
    waypoints: Array<[number, number]> = [],
    opts: { dashed?: boolean; startArrow?: boolean; endArrow?: boolean; source?: string; target?: string } = {}
  ) => {
    const { dashed = false, startArrow = false, endArrow = true, source, target } = opts;
    const styleParts = [
      'edgeStyle=none',
      'rounded=0',
      'html=1',
      'strokeColor=#202124',
      'strokeWidth=2',
      startArrow ? 'startArrow=open;startFill=0;startSize=7' : 'startArrow=none',
      endArrow ? 'endArrow=open;endFill=0;endSize=7' : 'endArrow=none',
    ];
    if (dashed) styleParts.push('dashed=1;dashPattern=3 3');
    const sBox = source ? vertexBounds.get(source) : undefined;
    const tBox = target ? vertexBounds.get(target) : undefined;
    if (sBox) {
      const exitX = Number(((srcPt[0] - sBox.x) / sBox.w).toFixed(4));
      const exitY = Number(((srcPt[1] - sBox.y) / sBox.h).toFixed(4));
      styleParts.push(`exitX=${exitX}`, `exitY=${exitY}`, 'exitDx=0', 'exitDy=0', 'exitPerimeter=0');
    }
    if (tBox) {
      const entryX = Number(((tgtPt[0] - tBox.x) / tBox.w).toFixed(4));
      const entryY = Number(((tgtPt[1] - tBox.y) / tBox.h).toFixed(4));
      styleParts.push(`entryX=${entryX}`, `entryY=${entryY}`, 'entryDx=0', 'entryDy=0', 'entryPerimeter=0');
    }
    const ptsXml =
      waypoints.length > 0
        ? `<Array as="points">${waypoints.map((p) => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join('')}</Array>`
        : '';
    const srcAttr = source ? ` source="${source}"` : '';
    const tgtAttr = target ? ` target="${target}"` : '';
    edgeCells.push(
      `        <mxCell id="${id}" value="" style="${styleParts.join(';')};" edge="1" parent="1"${srcAttr}${tgtAttr}><mxGeometry relative="1" as="geometry"><mxPoint x="${srcPt[0]}" y="${srcPt[1]}" as="sourcePoint"/><mxPoint x="${tgtPt[0]}" y="${tgtPt[1]}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`
    );
  };

  // 1. Top Blueprint Title Banner
  addVertex(
    'hdr_title_box',
    20,
    6,
    1160,
    40,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.35;"><b style="font-size:12.5px;color:#174ea6;">[${bp.badge}] ${bp.title}</b><br/><span style="font-size:11px;color:#5f6368;">${bp.subtitle}</span></div>`,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=0;spacingTop=0;',
    true
  );

  // 2. Top External User / Tenant Box (with User Silhouette Icon)
  addVertex(
    'actor_top_user',
    465,
    52,
    250,
    86,
    `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font-family:'Google Sans',Roboto,Arial,sans-serif;text-align:center;"><img src="${USER_SILHOUETTE_DATA_URI}" width="36" height="28"/><b style="font-size:13px;color:#202124;">${bp.topUserTitle}</b><br/><span style="font-size:10.5px;color:#3c4043;">${bp.topUserSub}</span></div>`,
    'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=2;align=center;verticalAlign=middle;',
    true
  );

  // 3. Outer Google Cloud Frame (#1a73e8) + Official White Wordmark
  addVertex(
    'gcp_outer_frame',
    20,
    218,
    1160,
    1172,
    '',
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#1a73e8;strokeColor=#202124;strokeWidth=1.2;',
    true
  );
  addVertex(
    'gcp_wordmark',
    36,
    228,
    150,
    30,
    `<img src="${OFFICIAL_ASSETS.gcp_wordmark_white}" width="138" height="25"/>`,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;',
    true
  );

  const fitHtmlLabel = (text: string, maxW: number, fontSizePx = 12.5) => {
    const estW = text.length * (fontSizePx * 0.58);
    const scaleX = estW > maxW ? (maxW / estW).toFixed(3) : '1';
    const scaleCss =
      estW > maxW
        ? `display:inline-block;transform:scaleX(${scaleX});transform-origin:left center;`
        : '';
    return `${SVG_GUARD}<b style="font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:${fontSizePx}px;color:#202124;white-space:nowrap;${scaleCss}">${text}</b>`;
  };

  // 4. Nested White Boundary 1 (Shared hubs) & Boundary 2 (VPC)
  addVertex(
    'wrapper_shared_hubs',
    36,
    268,
    1128,
    1104,
    fitHtmlLabel(bp.outerWrapperLabel, 495, 12.5),
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=1.2;verticalAlign=top;align=left;spacingLeft=14;spacingTop=6;',
    true
  );
  addVertex(
    'wrapper_vpc',
    52,
    304,
    1096,
    1050,
    fitHtmlLabel(bp.innerWrapperLabel, 480, 12.5),
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=1.2;verticalAlign=top;align=left;spacingLeft=14;spacingTop=6;',
    true
  );

  const fitSpanText = (text: string, maxW: number, fontSizePx: number, bold = false) => {
    const factor = bold ? 0.58 : 0.54;
    const estW = text.length * (fontSizePx * factor);
    const adjFs = estW > maxW ? Math.max(9.5, Math.floor((maxW / (text.length * factor)) * 10) / 10) : fontSizePx;
    const weightCss = bold ? 'font-weight:700;' : '';
    return `<span style="font-size:${adjFs}px;color:#202124;white-space:nowrap;${weightCss}">${text}</span>`;
  };

  // 5. Four Semantic Hub & Spoke Zones (#aecbfa, #ceead6, #feefc3, #fad2cf)
  addVertex(
    'zone_routing_hub',
    68,
    338,
    664,
    330,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.22;">${fitSpanText(bp.routingHubTitle, 440, 14.5, true)}<br/>${fitSpanText(bp.routingHubSub, 390, 12.0, false)}</div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#aecbfa;strokeColor=#202124;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );
  addVertex(
    'zone_gov_hub',
    798,
    346,
    328,
    320,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.25;"><b style="font-size:14.5px;color:#202124;">${bp.govHubTitle}<br/>${bp.govHubTitle2}</b></div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ceead6;strokeColor=#202124;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  addVertex(
    'wrapper_left_pab',
    70,
    772,
    516,
    560,
    fitHtmlLabel(bp.leftBoundaryLabel, 344, 12),
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=1.2;verticalAlign=top;align=left;spacingLeft=12;spacingTop=6;',
    true
  );
  addVertex(
    'zone_left_tenant',
    86,
    808,
    484,
    508,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.25;">${fitSpanText(bp.leftZoneTitle, 336, 14.5, true)}<br/>${fitSpanText(bp.leftZoneSub, 336, 12.2, false)}</div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#feefc3;strokeColor=#202124;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  addVertex(
    'wrapper_right_pab',
    614,
    772,
    516,
    560,
    fitHtmlLabel(bp.rightBoundaryLabel, 344, 12),
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=1.2;verticalAlign=top;align=left;spacingLeft=12;spacingTop=6;',
    true
  );
  addVertex(
    'zone_right_tenant',
    630,
    808,
    484,
    508,
    `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;line-height:1.25;">${fitSpanText(bp.rightZoneTitle, 336, 14.5, true)}<br/>${fitSpanText(bp.rightZoneSub, 336, 12.2, false)}</div>`,
    'rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#fad2cf;strokeColor=#202124;strokeWidth=1;verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;',
    true
  );

  // 6. Helper to add Official Architecture Center Card with Resolved Distinct Service Icon (and optional L400 Deep Implementation Spec)
  const addArchCard = (id: string, x: number, y: number, w: number, h: number, cardObj: OfficialArchCardItem) => {
    const iconUri = resolveArchIconUri(cardObj.icon, cardObj.title, cardObj.sub);
    if (cardObj.l400Spec || cardObj.l400Badge) {
      const textMaxW = Math.max(124, w - 46);
      const calcFs = (txt: string, maxFs: number, minFs: number, charFactor = 0.55) => {
        const plainLen = Math.max(1, txt.replace(/&[a-zA-Z0-9#]+;/g, 'X').length);
        const raw = textMaxW / (plainLen * charFactor);
        return Math.max(minFs, Math.min(maxFs, Math.floor(raw * 10) / 10));
      };
      const badgeFs = cardObj.l400Badge ? calcFs(cardObj.l400Badge, 7.6, 6.2, 0.56) : 7.4;
      const titleFs = calcFs(cardObj.title, 10.4, 7.8, 0.56);
      const subFs = cardObj.sub ? calcFs(cardObj.sub, 8.5, 6.8, 0.52) : 8.2;
      const specFs = cardObj.l400Spec ? calcFs(cardObj.l400Spec, 7.4, 6.0, 0.58) : 7.2;

      const badgeHtml = cardObj.l400Badge
        ? `<div style="font-size:${badgeFs}px;font-weight:700;color:#174ea6;letter-spacing:0.15px;white-space:nowrap;">${cardObj.l400Badge}</div>`
        : '';
      const titleHtml = `<div style="font-size:${titleFs}px;font-weight:700;color:#202124;white-space:nowrap;">${cardObj.title}</div>`;
      const subHtml = cardObj.sub
        ? `<div style="font-size:${subFs}px;color:#3c4043;white-space:nowrap;">${cardObj.sub}</div>`
        : '';
      const specHtml = cardObj.l400Spec
        ? `<div style="font-size:${specFs}px;font-family:'Roboto Mono',monospace;color:#b31412;background:#f8f9fa;border:1px solid #dadce0;border-radius:3px;padding:1px 3px;margin-top:1px;white-space:nowrap;display:inline-block;">${cardObj.l400Spec}</div>`
        : '';
      const htmlVal = `<table style="width:100%;height:100%;border-collapse:collapse;font-family:'Google Sans',Roboto,Arial,sans-serif;"><tr><td style="width:34px;text-align:center;vertical-align:middle;padding-left:3px;"><img src="${iconUri}" width="26" height="26"/></td><td style="text-align:left;vertical-align:middle;padding-left:4px;padding-right:3px;line-height:1.15;">${badgeHtml}${titleHtml}${subHtml}${specHtml}</td></tr></table>`;
      return addVertex(
        id,
        x,
        y,
        w,
        h,
        htmlVal,
        'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=2;align=left;verticalAlign=middle;spacingLeft=1;spacingRight=2;'
      );
    }
    const titleHtml = cardObj.title2
      ? `<b style="font-size:12.5px;color:#202124;">${cardObj.title}<br/>${cardObj.title2}</b>`
      : `<b style="font-size:12.5px;color:#202124;">${cardObj.title}</b>`;
    const subHtml = cardObj.sub
      ? `<br/><span style="font-size:10.5px;color:#3c4043;">${cardObj.sub}</span>`
      : '';
    const htmlVal = `<table style="width:100%;height:100%;border-collapse:collapse;font-family:'Google Sans',Roboto,Arial,sans-serif;"><tr><td style="width:44px;text-align:center;vertical-align:middle;padding-left:4px;"><img src="${iconUri}" width="34" height="34"/></td><td style="text-align:left;vertical-align:middle;padding-left:6px;line-height:1.2;">${titleHtml}${subHtml}</td></tr></table>`;
    return addVertex(
      id,
      x,
      y,
      w,
      h,
      htmlVal,
      'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#202124;strokeWidth=2;align=left;verticalAlign=middle;spacingLeft=2;spacingRight=4;'
    );
  };

  // Routing Hub 5 Cards
  addArchCard('card_rc_topleft', 88, 398, 204, 66, rc.topLeft);
  addArchCard('card_rc_midleft', 88, 482, 204, 66, rc.midLeft);
  addArchCard('card_rc_botleft', 96, 580, 196, 66, rc.botLeft);
  addArchCard('card_rc_alb', 452, 432, 262, 76, rc.topRight);
  addArchCard('card_rc_cloudrun', 476, 580, 224, 66, rc.botRight);

  // Governance Hub 3 Cards
  addArchCard('card_gc_top', 824, 406, 276, 72, gc.top);
  addArchCard('card_gc_mid', 830, 492, 264, 68, gc.mid);
  addArchCard('card_gc_bot', 828, 574, 268, 68, gc.bot);

  // Left Tenant Spoke 5 Cards (with 52px central connector channel: 290..342 so orthogonal arrows never crowd card borders)
  addArchCard('card_lc_ma', 96, 874, 194, 72, lc.modelArmor);
  addArchCard('card_lc_llm', 96, 1110, 194, 72, lc.llm);
  addArchCard('card_lc_run', 342, 924, 214, 74, lc.runtime);
  addArchCard('card_lc_mcp', 342, 1068, 214, 74, lc.mcp);
  addArchCard('card_lc_db', 342, 1218, 214, 74, lc.datastore);

  // Right Tenant Spoke 5 Cards (with 52px central connector channel: 834..886 so orthogonal arrows never crowd card borders)
  addArchCard('card_sc_ma', 640, 874, 194, 72, sc.modelArmor);
  addArchCard('card_sc_llm', 640, 976, 194, 72, sc.llm);
  addArchCard('card_sc_run', 886, 924, 214, 74, sc.runtime);
  addArchCard('card_sc_mcp', 886, 1068, 214, 74, sc.mcp);
  addArchCard('card_sc_db', 886, 1218, 214, 74, sc.datastore);

  // 7. Royal-Blue Numbered Step Badges (#174ea6) & Callout Labels
  const badgeStyle =
    'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#174ea6;strokeColor=#174ea6;fontColor=#ffffff;fontStyle=1;fontSize=14;align=center;verticalAlign=middle;';
  const addStepBadge = (id: string, cx: number, cy: number, num: string) =>
    addVertex(id, cx - 17, cy - 17, 34, 34, `${SVG_GUARD}<b>${num}</b>`, badgeStyle);

  const addCalloutText = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    lines: string[],
    align = 'left',
    fillColor = 'none'
  ) => {
    const html = `${SVG_GUARD}<div style="font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:12.5px;color:#202124;line-height:1.25;">${lines.join('<br/>')}</div>`;
    return addVertex(
      id,
      x,
      y,
      w,
      h,
      html,
      `text;html=1;strokeColor=none;fillColor=${fillColor};align=${align};verticalAlign=middle;`
    );
  };

  addStepBadge('step_1_top', 566, 180, '1');
  addCalloutText('lbl_step1_top', 450, 166, 92, 28, [bp.step1LeftLabel], 'right', '#ffffff');
  addStepBadge('step_7_top', 612, 180, '7');
  addCalloutText('lbl_step7_top', 634, 166, 102, 28, [bp.step7RightLabel], 'left', '#ffffff');

  addCalloutText('lbl_rc_top', 300, 386, 114, 34, rc.edgeTopLeft, 'center', '#aecbfa');
  addCalloutText('lbl_rc_mid', 300, 524, 114, 34, rc.edgeMidLeft, 'center', '#aecbfa');
  addCalloutText('lbl_rc_bot', 306, 568, 156, 34, rc.edgeBotLeft, 'center', '#aecbfa');

  addStepBadge('step_2_mid', 566, 543, '2');
  addCalloutText('lbl_step2_mid', 450, 529, 92, 28, [rc.step2Left], 'right', '#aecbfa');
  addStepBadge('step_7_mid', 612, 543, '7');
  addCalloutText('lbl_step7_mid', 634, 529, 102, 28, [rc.step7Mid], 'left', '#aecbfa');

  addStepBadge('step_3_trunk', 404, 698, '3');
  addCalloutText('lbl_step3_trunk', 426, 678, 154, 36, bp.midStep3Label, 'left', '#ffffff');
  addStepBadge('step_7_trunk', 616, 698, '7');
  addCalloutText('lbl_step7_trunk', 638, 678, 170, 36, bp.midStep7Label, 'left', '#ffffff');
  addCalloutText('lbl_gov_trunk', 974, 672, 168, 48, bp.midGovLabel, 'left', '#ffffff');

  addStepBadge('step_4_left', 120, 976, '4');
  addCalloutText('lbl_step4_left', 144, 962, 158, 28, [lc.step4Label], 'left', '#feefc3');
  addStepBadge('step_6_left', 120, 1024, '6');
  addCalloutText('lbl_step6_left', 144, 1010, 158, 28, [lc.step6Label], 'left', '#feefc3');
  addStepBadge('step_5_left', 120, 1214, '5');
  addCalloutText('lbl_step5_left', 144, 1194, 158, 40, lc.step5Label, 'left', '#feefc3');

  addCalloutText('lbl_left_rag', 359, 1014, 180, 38, lc.ragLabel, 'center', '#feefc3');
  addCalloutText('lbl_left_tool', 359, 1160, 180, 38, lc.toolLabel, 'center', '#feefc3');

  addCalloutText('lbl_right_rag', 903, 1014, 180, 38, sc.ragLabel, 'center', '#fad2cf');
  addCalloutText('lbl_right_tool', 903, 1160, 180, 38, sc.toolLabel, 'center', '#fad2cf');

  // 8. Emit 23 Vertex-Bound Orthogonal Edges (placed between bgCells and fgCells so cards & badges sit on top)
  addPointEdge('e_user_to_alb', [566, 138], [566, 430], [], { endArrow: true, source: 'actor_top_user', target: 'card_rc_alb' });
  addPointEdge('e_alb_to_user', [612, 432], [612, 140], [], { endArrow: true, source: 'card_rc_alb', target: 'actor_top_user' });

  addPointEdge('e_alb_to_top_left', [452, 470], [292, 431], [[418, 470], [418, 431]], { startArrow: true, endArrow: true, source: 'card_rc_alb', target: 'card_rc_topleft' });
  addPointEdge('e_alb_to_mid_left', [452, 470], [292, 515], [[418, 470], [418, 515]], { startArrow: true, endArrow: true, source: 'card_rc_alb', target: 'card_rc_midleft' });

  addPointEdge('e_iap_to_cloudrun', [292, 613], [476, 613], [], { startArrow: true, endArrow: true, source: 'card_rc_botleft', target: 'card_rc_cloudrun' });

  addPointEdge('e_alb_to_crun', [566, 508], [566, 580], [], { endArrow: true, source: 'card_rc_alb', target: 'card_rc_cloudrun' });
  addPointEdge('e_crun_to_alb', [612, 580], [612, 508], [], { endArrow: true, source: 'card_rc_cloudrun', target: 'card_rc_alb' });

  addPointEdge('e_trunk_up_crun', [449, 924], [586, 646], [[449, 744], [586, 744]], { startArrow: false, endArrow: true, source: 'card_lc_run', target: 'card_rc_cloudrun' });
  addPointEdge('e_trunk_spokes', [449, 924], [993, 924], [[449, 744], [993, 744]], { startArrow: true, endArrow: true, source: 'card_lc_run', target: 'card_sc_run' });

  addPointEdge('e_gov_dashed_main', [328, 772], [962, 666], [[328, 730], [962, 730]], { dashed: true, startArrow: true, endArrow: true, source: 'wrapper_left_pab', target: 'zone_gov_hub' });
  addPointEdge('e_gov_dashed_right', [962, 666], [872, 772], [[962, 730], [872, 730]], { dashed: true, startArrow: false, endArrow: true, source: 'zone_gov_hub', target: 'wrapper_right_pab' });

  addPointEdge('e_left_ma_run', [290, 910], [342, 944], [[312, 910], [312, 944]], { startArrow: true, endArrow: true, source: 'card_lc_ma', target: 'card_lc_run' });
  addPointEdge('e_left_llm_run', [290, 1146], [342, 976], [[320, 1146], [320, 976]], { startArrow: true, endArrow: true, source: 'card_lc_llm', target: 'card_lc_run' });
  addPointEdge('e_left_mcp_run_bot', [449, 1068], [449, 1054], [], { startArrow: true, endArrow: false, source: 'card_lc_mcp', target: 'lbl_left_rag' });
  addPointEdge('e_left_mcp_run_top', [449, 1014], [449, 1000], [], { endArrow: true, source: 'lbl_left_rag', target: 'card_lc_run' });
  addPointEdge('e_left_db_mcp_bot', [449, 1218], [449, 1204], [], { startArrow: true, endArrow: false, source: 'card_lc_db', target: 'lbl_left_tool' });
  addPointEdge('e_left_db_mcp_top', [449, 1158], [449, 1144], [], { endArrow: true, source: 'lbl_left_tool', target: 'card_lc_mcp' });

  addPointEdge('e_right_ma_run', [834, 910], [886, 944], [[856, 910], [856, 944]], { startArrow: true, endArrow: true, source: 'card_sc_ma', target: 'card_sc_run' });
  addPointEdge('e_right_llm_run', [834, 1012], [886, 976], [[864, 1012], [864, 976]], { startArrow: true, endArrow: true, source: 'card_sc_llm', target: 'card_sc_run' });
  addPointEdge('e_right_mcp_run_bot', [993, 1068], [993, 1054], [], { startArrow: true, endArrow: false, source: 'card_sc_mcp', target: 'lbl_right_rag' });
  addPointEdge('e_right_mcp_run_top', [993, 1014], [993, 1000], [], { endArrow: true, source: 'lbl_right_rag', target: 'card_sc_run' });
  addPointEdge('e_right_db_mcp_bot', [993, 1218], [993, 1204], [], { startArrow: true, endArrow: false, source: 'card_sc_db', target: 'lbl_right_tool' });
  addPointEdge('e_right_db_mcp_top', [993, 1158], [993, 1144], [], { endArrow: true, source: 'lbl_right_tool', target: 'card_sc_mcp' });

  const cells = [...bgCells, ...edgeCells, ...fgCells];

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net" modified="2026-10-13T00:00:00.000Z" agent="PromptCanvas-Vision-Decompiler-v4.0" version="24.7.5" type="device">
  <diagram id="${bp.id}" name="${escXml(bp.title)}">
    <mxGraphModel dx="1200" dy="1410" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1200" pageHeight="1410" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export interface GeminiHubSpokeCardOverride {
  title: string;
  sub: string;
  icon?: string;
}

export interface GeminiHubSpoke78DynamicSpec {
  title?: string;
  subtitle?: string;
  topUserTitle?: string;
  topUserSub?: string;
  routingHubTitle?: string;
  routingHubSub?: string;
  routingCards?: {
    topLeft?: GeminiHubSpokeCardOverride;
    midLeft?: GeminiHubSpokeCardOverride;
    botLeft?: GeminiHubSpokeCardOverride;
    topRight?: GeminiHubSpokeCardOverride;
    botRight?: GeminiHubSpokeCardOverride;
  };
  govHubTitle?: string;
  govHubTitle2?: string;
  govCards?: {
    top?: GeminiHubSpokeCardOverride;
    mid?: GeminiHubSpokeCardOverride;
    bot?: GeminiHubSpokeCardOverride;
  };
  leftBoundaryLabel?: string;
  leftZoneTitle?: string;
  leftZoneSub?: string;
  leftCards?: {
    modelArmor?: GeminiHubSpokeCardOverride;
    llm?: GeminiHubSpokeCardOverride;
    runtime?: GeminiHubSpokeCardOverride;
    mcp?: GeminiHubSpokeCardOverride;
    datastore?: GeminiHubSpokeCardOverride;
  };
  rightBoundaryLabel?: string;
  rightZoneTitle?: string;
  rightZoneSub?: string;
  rightCards?: {
    modelArmor?: GeminiHubSpokeCardOverride;
    llm?: GeminiHubSpokeCardOverride;
    runtime?: GeminiHubSpokeCardOverride;
    mcp?: GeminiHubSpokeCardOverride;
    datastore?: GeminiHubSpokeCardOverride;
  };
}

function inferIconFromText(text: string, defaultIcon: string): string {
  const l = (text || '').toLowerCase();
  if (l.includes('bigquery') || l.includes('big query') || l.includes('biglake') || l.includes('edw') || l.includes('looker') || l.includes('dvt')) return 'bigquery_analytics';
  if (l.includes('vertex') || l.includes('gemini') || l.includes('mlops') || l.includes('model') || l.includes('h2o') || l.includes('mojo') || l.includes('agent')) return 'gemini_agent_platform';
  if (l.includes('spanner') || l.includes('alloydb') || l.includes('postgres') || l.includes('sql') || l.includes('database') || l.includes('feature store')) return 'datastore_alloydb_bq';
  if (l.includes('gke') || l.includes('kubernetes') || l.includes('autopilot')) return 'gke';
  if (l.includes('cloud run') || l.includes('microservice') || l.includes('router') || l.includes('hub')) return 'cloud_run';
  if (l.includes('load balanc') || l.includes('composer') || l.includes('airflow') || l.includes('cdn')) return 'load_balancer_cloud_armor';
  if (l.includes('security command') || l.includes('scc') || l.includes('dataplex') || l.includes('catalog') || l.includes('chronicle')) return 'security_command_center';
  if (l.includes('iam') || l.includes('kms') || l.includes('iap') || l.includes('apigee') || l.includes('oauth') || l.includes('datastream') || l.includes('transfer')) return 'iap_iam_shield';
  if (l.includes('model armor') || l.includes('dlp') || l.includes('translator') || l.includes('guard')) return 'model_armor';
  if (l.includes('armor') || l.includes('interconnect') || l.includes('waf') || l.includes('vpn')) return 'cloud_armor';
  return defaultIcon;
}

function applyGeminiHubSpokeOverrides(
  base: OfficialArchCenterBlueprintConfig,
  spec?: GeminiHubSpoke78DynamicSpec | null
): OfficialArchCenterBlueprintConfig {
  if (!spec) return base;
  const mergeCard = (orig: OfficialArchCardItem, ov?: GeminiHubSpokeCardOverride): OfficialArchCardItem => {
    if (!ov || !ov.title || ov.title.trim().length < 2) return orig;
    const cleanTitle = ov.title.trim().slice(0, 28);
    const cleanSub = (ov.sub || orig.sub).trim().slice(0, 42);
    return {
      ...orig,
      icon: ov.icon || inferIconFromText(`${cleanTitle} ${cleanSub}`, orig.icon),
      title: cleanTitle,
      title2: undefined,
      sub: cleanSub,
    };
  };

  return {
    ...base,
    title: spec.title?.trim() ? spec.title.trim().slice(0, 84) : base.title,
    subtitle: spec.subtitle?.trim() ? spec.subtitle.trim().slice(0, 110) : base.subtitle,
    topUserTitle: spec.topUserTitle?.trim() ? spec.topUserTitle.trim().slice(0, 28) : base.topUserTitle,
    topUserSub: spec.topUserSub?.trim() ? spec.topUserSub.trim().slice(0, 44) : base.topUserSub,
    routingHubTitle: spec.routingHubTitle?.trim() ? spec.routingHubTitle.trim().slice(0, 54) : base.routingHubTitle,
    routingHubSub: spec.routingHubSub?.trim() ? spec.routingHubSub.trim().slice(0, 78) : base.routingHubSub,
    routingCards: {
      ...base.routingCards,
      topLeft: mergeCard(base.routingCards.topLeft, spec.routingCards?.topLeft),
      midLeft: mergeCard(base.routingCards.midLeft, spec.routingCards?.midLeft),
      botLeft: mergeCard(base.routingCards.botLeft, spec.routingCards?.botLeft),
      topRight: mergeCard(base.routingCards.topRight, spec.routingCards?.topRight),
      botRight: mergeCard(base.routingCards.botRight, spec.routingCards?.botRight),
    },
    govHubTitle: spec.govHubTitle?.trim() ? spec.govHubTitle.trim().slice(0, 28) : base.govHubTitle,
    govHubTitle2: spec.govHubTitle2?.trim() ? spec.govHubTitle2.trim().slice(0, 28) : base.govHubTitle2,
    govCards: {
      top: mergeCard(base.govCards.top, spec.govCards?.top),
      mid: mergeCard(base.govCards.mid, spec.govCards?.mid),
      bot: mergeCard(base.govCards.bot, spec.govCards?.bot),
    },
    leftBoundaryLabel: spec.leftBoundaryLabel?.trim() ? spec.leftBoundaryLabel.trim().slice(0, 68) : base.leftBoundaryLabel,
    leftZoneTitle: spec.leftZoneTitle?.trim() ? spec.leftZoneTitle.trim().slice(0, 46) : base.leftZoneTitle,
    leftZoneSub: spec.leftZoneSub?.trim() ? spec.leftZoneSub.trim().slice(0, 64) : base.leftZoneSub,
    leftCards: {
      ...base.leftCards,
      modelArmor: mergeCard(base.leftCards.modelArmor, spec.leftCards?.modelArmor),
      llm: mergeCard(base.leftCards.llm, spec.leftCards?.llm),
      runtime: mergeCard(base.leftCards.runtime, spec.leftCards?.runtime),
      mcp: mergeCard(base.leftCards.mcp, spec.leftCards?.mcp),
      datastore: mergeCard(base.leftCards.datastore, spec.leftCards?.datastore),
    },
    rightBoundaryLabel: spec.rightBoundaryLabel?.trim() ? spec.rightBoundaryLabel.trim().slice(0, 68) : base.rightBoundaryLabel,
    rightZoneTitle: spec.rightZoneTitle?.trim() ? spec.rightZoneTitle.trim().slice(0, 46) : base.rightZoneTitle,
    rightZoneSub: spec.rightZoneSub?.trim() ? spec.rightZoneSub.trim().slice(0, 64) : base.rightZoneSub,
    rightCards: {
      ...base.rightCards,
      modelArmor: mergeCard(base.rightCards.modelArmor, spec.rightCards?.modelArmor),
      llm: mergeCard(base.rightCards.llm, spec.rightCards?.llm),
      runtime: mergeCard(base.rightCards.runtime, spec.rightCards?.runtime),
      mcp: mergeCard(base.rightCards.mcp, spec.rightCards?.mcp),
      datastore: mergeCard(base.rightCards.datastore, spec.rightCards?.datastore),
    },
  };
}

export function buildDynamicOfficialArchCenter78Config(
  promptText: string,
  geminiSpec?: GeminiHubSpoke78DynamicSpec | null
): OfficialArchCenterBlueprintConfig {
  const raw = String(promptText || '').trim();
  const lower = raw.toLowerCase();

  const hasTeradataOrEdw = /\b(teradata|edw|netezza|redshift|vertica|greenplum|data\s*warehouse|bteq|fastload)\b/i.test(lower);
  const hasBigQuery = /\b(big\s*query|bigquery|bq|biglake)\b/i.test(lower);
  const hasH2o = /\b(h2o|h20|driverless\s*ai|mojo|pojo|sparkling\s*water)\b/i.test(lower);
  const hasVertex = /\b(vertex|vertx|vertxai|vertexai|mlops|feature\s*store|automl|model\s*registry)\b/i.test(lower);

  if ((hasTeradataOrEdw && hasBigQuery) || hasH2o || (hasBigQuery && hasVertex && /\b(migrat|moderniz|teradata|h2o|h20)\b/i.test(lower))) {
    const sourceSystemLabel = hasTeradataOrEdw && hasH2o
      ? 'Teradata EDW & H2O.ai'
      : hasTeradataOrEdw
      ? 'Legacy Teradata EDW'
      : 'Legacy H2O.ai & Data Estate';
    const sourceSubLabel = hasTeradataOrEdw && hasH2o
      ? 'On-Prem BTEQ/FastLoad & H2O Driverless AI MOJO'
      : 'On-Premises EDW Tables & ML Scoring Models';

    const baseMigrationCfg: OfficialArchCenterBlueprintConfig = {
      id: 'arch-center-teradata-bq-h2o-vertexai-78',
      badge: 'GOOGLE CLOUD ARCHITECTURE CENTER • DATA & AI MIGRATION (#78)',
      title: hasTeradataOrEdw && hasH2o
        ? 'Teradata EDW to BigQuery & H2O.ai to Vertex AI Migration Architecture'
        : 'Enterprise Data Warehouse to BigQuery & MLOps to Vertex AI Architecture',
      subtitle: 'Official Google Cloud Hub-and-Spoke Reference Architecture • Dual-Spoke EDW & MLOps Modernization',
      topUserTitle: sourceSystemLabel,
      topUserSub: sourceSubLabel,
      step1LeftLabel: 'Extract & Sync',
      step7RightLabel: 'Cutover & Serve',
      outerWrapperLabel: 'Google Cloud Enterprise Landing Zone (VPC Service Controls Perimeter + Cloud KMS CMEK)',
      innerWrapperLabel: 'Shared Migration & MLOps VPC • Hybrid Connectivity & Cutover Control Plane',
      routingHubTitle: 'Hybrid Migration & Ingestion Hub (Hop 1 & Hop 2)',
      routingHubSub: 'Dedicated Interconnect, Batch SQL translation, CDC transfer & DAG orchestration',
      routingCards: {
        topLeft: { icon: 'cloud_armor', title: 'Cloud Interconnect', sub: '100Gbps Dedicated HA VPN & PSC' },
        midLeft: { icon: 'model_armor', title: 'Batch SQL Translator', sub: 'Teradata BTEQ / TPT → GoogleSQL' },
        botLeft: { icon: 'iap_iam_shield', title: 'Storage Transfer & CDC', sub: 'Datastream + GCS Transfer Agent' },
        topRight: { icon: 'load_balancer_cloud_armor', title: 'Cloud Composer 3', title2: '(Airflow Orchestrator)', sub: 'End-to-End EDW & MLOps Cutover DAGs' },
        botRight: { icon: 'cloud_run', title: 'Cloud Run Migration Hub', sub: 'Dual-Spoke Schema & Model Router' },
        edgeTopLeft: ['Dedicated', 'HA Interconnect'],
        edgeMidLeft: ['Translate', 'Teradata SQL'],
        edgeBotLeft: ['Bulk + CDC', 'transfer sync'],
        step2Left: 'Ingest',
        step7Mid: 'Verified',
      },
      govHubTitle: 'Unified Data & AI',
      govHubTitle2: 'Governance Hub',
      govCards: {
        top: { icon: 'security_command_center', title: 'Dataplex Universal', title2: 'Catalog & Lineage', sub: 'End-to-End EDW & Feature Governance' },
        mid: { icon: 'iap_iam_shield', title: 'Cloud KMS & VPC-SC', sub: 'CMEK HSM Keys & DLP Redaction' },
        bot: { icon: 'bigquery_analytics', title: 'Data Validation (DVT)', sub: 'Row-Hash Parity & Drift Audit Sink' },
      },
      midStep3Label: ['Route EDW tables &', 'H2O MOJO artifacts'],
      midStep7Label: ['Validated BigQuery &', 'Vertex AI endpoints'],
      midGovLabel: ['Dataplex lineage, DVT parity', '& Cloud Audit telemetry'],
      leftBoundaryLabel: 'Spoke 1: Teradata EDW to BigQuery Data Warehouse Modernization',
      leftZoneTitle: 'BigQuery Enterprise Data Warehouse Spoke',
      leftZoneSub: 'BigQuery Migration Service (BMS) • BigLake • BI Engine',
      leftCards: {
        modelArmor: { icon: 'bigquery_analytics', title: 'BQ Migration Service', sub: 'Automated Teradata Schema & DDL' },
        llm: { icon: 'gemini_agent_platform', title: 'Gemini in BigQuery', sub: 'AI-Assisted SQL & Stored Proc Conversion' },
        runtime: { icon: 'bigquery_analytics', title: 'BigQuery EDW Core', sub: 'Partitioned & Clustered GoogleSQL' },
        mcp: { icon: 'datastore_alloydb_bq', title: 'BigLake & Iceberg', sub: 'Open-Format GCS Staging & Federation' },
        datastore: { icon: 'bigquery_analytics', title: 'Looker & BI Engine', sub: 'Sub-Second Executive BI & SQL Analytics' },
        step4Label: 'Validate DDL & SQL',
        step6Label: 'Certify row parity',
        step5Label: ['Convert BTEQ', '& stored procs'],
        ragLabel: ['High-Throughput', 'Storage Write API'],
        toolLabel: ['Federated SQL', '& BI Acceleration'],
      },
      rightBoundaryLabel: 'Spoke 2: H2O.ai (Driverless AI / Sparkling Water) to Vertex AI Migration',
      rightZoneTitle: 'Vertex AI MLOps & Prediction Spoke',
      rightZoneSub: 'H2O MOJO/POJO Runtime • Feature Store • Vertex AI Pipelines',
      rightCards: {
        modelArmor: { icon: 'model_armor', title: 'H2O MOJO Importer', sub: 'C++ / Java Scorer Container Wrapper' },
        llm: { icon: 'gemini_agent_platform', title: 'Vertex AI Workbench', sub: 'Driverless AI → AutoML & Custom Train' },
        runtime: { icon: 'gemini_agent_platform', title: 'Vertex AI Pipelines', sub: 'Kubeflow MLOps & Model Registry' },
        mcp: { icon: 'mcp_servers', title: 'Vertex AI Endpoints', sub: 'Low-Latency Online & Batch Prediction' },
        datastore: { icon: 'datastore_alloydb_bq', title: 'Vertex Feature Store', sub: 'BigQuery-Backed Online/Offline Features' },
        ragLabel: ['Register & Deploy', 'MOJO / Custom Models'],
        toolLabel: ['Zero-Copy BQ', 'Feature Serving'],
      },
    };
    return applyGeminiHubSpokeOverrides(baseMigrationCfg, geminiSpec);
  }

  // Clean out purely stylistic / meta phrases so we extract genuine domain intent
  const cleanedPrompt = raw
    .replace(/\b(make\s+it\s+beautiful|as\s+google\s+gcp\s+standards?|neat\s+and\s+formatted|make\s+it\s+neat|formatted|clean\s+up|pretty|gorgeous|reformat|redesign)\b/gi, '')
    .replace(/^(?:please\s+)?(?:create|design|build|draw|architect|generate|show(?:\s+me)?)\s+(?:a\s+|an\s+|the\s+)?(?:technical\s+|logical\s+|enterprise\s+)?(?:architecture\s+diagram|diagram|architecture|system|topology|blueprint)\s*(?:for|of|showing)?\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  const effectiveTitle = cleanedPrompt.length >= 4
    ? cleanedPrompt.slice(0, 78)
    : 'Enterprise Google Cloud Hub-and-Spoke Reference Architecture';
  const titleFormatted = effectiveTitle.charAt(0).toUpperCase() + effectiveTitle.slice(1);

  // Extract distinct domain clauses from the user's prompt so even before Live Gemini responds,
  // the two spokes and cards reflect the user's specific domain and services
  const clauses = cleanedPrompt
    .split(/(?:,|;|\+|→|->|\band\b|\bwith\b|\bvia\b|\busing\b|\bto\b)/i)
    .map((s) => s.replace(/^(?:a|an|the)\s+/i, '').trim())
    .filter((s) => s.length >= 3);

  const clause0 = clauses[0] ? clauses[0].slice(0, 26) : '';
  const clause1 = clauses[1] ? clauses[1].slice(0, 26) : '';
  const clause2 = clauses[2] ? clauses[2].slice(0, 26) : '';
  const clause3 = clauses[3] ? clauses[3].slice(0, 26) : '';

  const hasSpanner = /\b(spanner)\b/i.test(lower);
  const hasAlloy = /\b(alloydb|postgres)\b/i.test(lower);
  const hasGke = /\b(gke|kubernetes|anthos)\b/i.test(lower);
  const hasPubSub = /\b(pub\/?sub|kafka|event|stream)\b/i.test(lower);
  const hasRedis = /\b(redis|memorystore|valkey|cache)\b/i.test(lower);

  const baseCustomCfg: OfficialArchCenterBlueprintConfig = {
    id: 'arch-center-custom-synthesized-78',
    badge: 'GOOGLE CLOUD ARCHITECTURE CENTER • OFFICIAL HUB & SPOKE (#78)',
    title: `${titleFormatted}`,
    subtitle: 'Official Google Cloud Architecture Center Reference Topology • Zero-Trust Hub & Dual Execution Spokes',
    topUserTitle: clause0 || 'Enterprise Clients & Workloads',
    topUserSub: 'Cloud Identity OIDC / BeyondCorp Zero-Trust',
    step1LeftLabel: 'Request',
    step7RightLabel: 'Response',
    outerWrapperLabel: 'Google Cloud Organization Perimeter (VPC Service Controls + Cloud KMS CMEK)',
    innerWrapperLabel: 'Shared Production VPC • 5-Hop Cryptographic Context & Service Mesh',
    routingHubTitle: 'Global Ingress & Policy Routing Hub (Hop 1 & Hop 2)',
    routingHubSub: 'Cloud Armor WAF, Model Armor screening, Apigee/IAM & global load balancing',
    routingCards: {
      topLeft: { icon: 'cloud_armor', title: 'Google Cloud Armor', sub: 'WAF, DDoS & Edge Rate Limiting' },
      midLeft: { icon: 'model_armor', title: 'Model Armor', sub: 'Prompt Injection & DLP Guardrails' },
      botLeft: { icon: 'iap_iam_shield', title: 'Apigee X & IAP', sub: 'OAuth 2.0 / OBO Token Exchange' },
      topRight: { icon: 'load_balancer_cloud_armor', title: 'Global Application', title2: 'Load Balancer', sub: 'Anycast TLS 1.3 & Cloud CDN' },
      botRight: {
        icon: hasGke ? 'gke' : 'cloud_run',
        title: hasGke ? 'GKE Autopilot Router' : 'Cloud Run Orchestrator',
        sub: hasPubSub ? 'Pub/Sub Event Mesh & Traffic Router' : 'High-Concurrency Service Coordinator',
      },
      edgeTopLeft: ['WAF & DDoS', 'policies'],
      edgeMidLeft: ['Sanitize', 'payload'],
      edgeBotLeft: ['Verify IAM', '& OAuth JWT'],
      step2Left: 'Dispatch',
      step7Mid: 'Response',
    },
    govHubTitle: 'Central Security &',
    govHubTitle2: 'Observability Hub',
    govCards: {
      top: { icon: 'security_command_center', title: 'Security Command', title2: 'Center Enterprise', sub: 'Continuous Threat & Drift Detection' },
      mid: { icon: 'iap_iam_shield', title: 'Cloud KMS & VPC-SC', sub: 'HSM CMEK Keys & Service Perimeters' },
      bot: { icon: 'bigquery_analytics', title: 'Cloud Logging & BQ', sub: 'OpenTelemetry Traces & FinOps Audit' },
    },
    midStep3Label: ['Route to Data & AI', 'execution spokes'],
    midStep7Label: ['Validated response &', 'telemetry emit'],
    midGovLabel: ['Security, OTel & FinOps', 'audit telemetry'],
    leftBoundaryLabel: clause1
      ? `Spoke 1: ${clause0 || 'Core'} & ${clause1} Execution Plane`
      : 'Spoke 1: Transactional Compute, Event Processing & Operational Data Plane',
    leftZoneTitle: clause1 ? `${clause1.charAt(0).toUpperCase() + clause1.slice(1)} Spoke` : 'Core Compute & Operational Data Spoke',
    leftZoneSub: hasSpanner
      ? 'GKE Autopilot • Cloud Spanner Multi-Region • Pub/Sub'
      : 'Cloud Run / GKE • AlloyDB PostgreSQL • Pub/Sub Event Stream',
    leftCards: {
      modelArmor: { icon: 'cloud_armor', title: 'Service Mesh & IAM', sub: 'mTLS & Workload Identity Federation' },
      llm: {
        icon: hasPubSub ? 'pubsub' : 'cloud_run',
        title: clause0 || (hasPubSub ? 'Cloud Pub/Sub & Dataflow' : 'Cloud Run Microservices'),
        sub: hasPubSub ? 'Exactly-Once Streaming & CDC' : 'Auto-Scaling Stateless API Tier',
      },
      runtime: {
        icon: hasGke ? 'gke' : 'cloud_run',
        title: clause1 || (hasGke ? 'GKE Autopilot Cluster' : 'Cloud Run Services'),
        sub: 'Regional HA Compute & Domain Logic',
      },
      mcp: {
        icon: hasRedis ? 'memorystore' : 'mcp_servers',
        title: hasRedis ? 'Memorystore for Redis' : 'Integration Connectors',
        sub: hasRedis ? 'Sub-Millisecond Read/Session Cache' : 'REST / gRPC & Eventarc Triggers',
      },
      datastore: {
        icon: hasSpanner ? 'spanner' : 'alloydb',
        title: hasSpanner ? 'Cloud Spanner' : hasAlloy ? 'AlloyDB for PostgreSQL' : 'Cloud Spanner & AlloyDB',
        sub: hasSpanner ? '99.999% Multi-Region TrueTime ACID' : 'Transactional HA + Vector Index',
      },
      step4Label: 'Authorize workload',
      step6Label: 'Commit & emit event',
      step5Label: ['Stream &', 'transform'],
      ragLabel: ['Low-Latency', 'State & Cache'],
      toolLabel: ['ACID Read/Write', 'Persistence'],
    },
    rightBoundaryLabel: clause2
      ? `Spoke 2: ${clause2}${clause3 ? ` & ${clause3}` : ''} Intelligence Plane`
      : 'Spoke 2: Enterprise Analytics, BigQuery Lakehouse & Vertex AI Platform',
    rightZoneTitle: clause2 ? `${clause2.charAt(0).toUpperCase() + clause2.slice(1)} Spoke` : 'BigQuery Lakehouse & Vertex AI Spoke',
    rightZoneSub: 'Vertex AI Agent Engine • Gemini Models • BigQuery & Dataplex',
    rightCards: {
      modelArmor: { icon: 'model_armor', title: 'Model Armor & DLP', sub: 'RAI Safety Filters & PII Redaction' },
      llm: {
        icon: 'gemini_agent_platform',
        title: clause2 || 'Gemini & Vertex AI',
        sub: 'Foundation Models & Custom Training',
      },
      runtime: {
        icon: 'gemini_agent_platform',
        title: clause3 || 'Vertex AI Platform',
        sub: 'Agent Engine, Pipelines & Endpoints',
      },
      mcp: { icon: 'mcp_servers', title: 'Vertex Vector Search', sub: 'Low-Latency ANN Embeddings & RAG' },
      datastore: { icon: 'bigquery_analytics', title: 'BigQuery Lakehouse', sub: 'BigLake Iceberg, BI Engine & ML' },
      ragLabel: ['Grounded Vector', '& Feature Lookup'],
      toolLabel: ['Zero-Copy BQ', 'Analytics & ML'],
    },
  };

  return applyGeminiHubSpokeOverrides(baseCustomCfg, geminiSpec);
}

export function synthesizeOfficialGcpArchCenter78FromPrompt(
  promptText: string,
  geminiSpec?: GeminiHubSpoke78DynamicSpec | null
): string {
  const cfg = buildDynamicOfficialArchCenter78Config(promptText, geminiSpec);
  return compileOfficialArchCenterDrawioXml(cfg);
}

export function generateTemplate78OfficialGcpArchCenterHubSpokeXml(
  domainFlavor?: string,
  _theme?: 'light' | 'dark'
): string {
  const match = OFFICIAL_ARCH_CENTER_BLUEPRINTS.find((b) => b.id === domainFlavor);
  if (match) {
    return compileOfficialArchCenterDrawioXml(match);
  }
  if (domainFlavor && domainFlavor.trim().length > 0) {
    return synthesizeOfficialGcpArchCenter78FromPrompt(domainFlavor);
  }
  return compileOfficialArchCenterDrawioXml(OFFICIAL_ARCH_CENTER_BLUEPRINTS[0]);
}

