import { describe, expect, it } from 'vitest';
import { XMLParser } from 'fast-xml-parser';
import { getApprovedSecureDeploymentTopologyXml } from '../../src/lib/approvedBlueprint16Safe';

describe('Blueprint 16 approved secure deployment topology', () => {
  const xml = getApprovedSecureDeploymentTopologyXml();

  it('emits parseable 1536x1024 editable mxGraph XML', () => {
    expect(() => new XMLParser({ ignoreAttributes: false }).parse(xml)).not.toThrow();
    expect(xml).toContain('pageWidth="1536"');
    expect(xml).toContain('pageHeight="1024"');
    expect(xml).toContain('secure_deployment_topology_approved');
  });

  it('preserves the approved major topology zones and services', () => {
    for (const value of [
      'Users &amp; Clients', 'Edge &amp; Network Security', 'Google Cloud - VPC (Custom Mode)',
      'GKE Autopilot (Private) - Application Tier', 'Data &amp; Integration Tier (Private Services Access)',
      'Control &amp; Supply Chain Security', 'Observability &amp; Operations', 'Security &amp; Compliance',
      'Cross-Cutting Controls', 'Cloud SQL', 'Cloud Storage', 'Memorystore', 'Artifact Registry',
      'Binary Authorization', 'Cloud KMS', 'Cloud Monitoring', 'Cloud Logging', 'Security Command Center',
      'Chronicle / SIEM', 'Identity Aware Proxy', 'Cloud Armor', 'Cloud Load Balancing',
    ]) expect(xml).toContain(value);
  });

  it('preserves all twelve end-to-end request-flow statements', () => {
    const flow = [
      'User sends HTTPS request', 'Global Load Balancer routes traffic', 'Cloud Armor WAF inspects &amp; filters',
      'Request goes to GKE Autopilot (private)', 'Application accesses data tier via private IP',
      'Metrics &amp; logs sent to Cloud Monitoring/Logging', 'Findings to SCC / Chronicle for threat detection',
      'Data encrypted with CMEK (at rest)', 'Outbound access via Private Google Access',
      'Binary Authorization enforces trusted images', 'Images stored &amp; versioned in Artifact Registry',
      'Secure admin access via IAP / VPN (no public IPs)',
    ];
    flow.forEach((value) => expect(xml).toContain(value));
    for (let n = 1; n <= 12; n += 1) expect(xml).toContain(`id="rf_n${n}"`);
  });

  it('locks private, zero-trust, supply-chain, resilience and compliance semantics', () => {
    for (const value of [
      'NetworkPolicies', 'Pod Security Standards', 'Workload Identity', 'GKE Sandbox', 'Private IP (PSA)',
      'CMEK encryption', 'Point-in-time recovery', 'Private Google Access', 'Zero Public IPs',
      'Least Privilege IAM', 'Policy as Code', 'Vulnerability Mgmt', 'Audit &amp; Forensics',
      'Multi-region DR', 'HIPAA / SOC 2 / ISO 27001', 'Backups &amp; DR tested',
    ]) expect(xml).toContain(value);
  });

  it('uses self-contained icons with no external CDN dependency', () => {
    expect(xml).toContain('data:image/svg+xml,');
    expect(xml).not.toContain('cdn.jsdelivr.net');
    expect(xml).not.toContain('simpleicons.org');
    expect(xml).not.toContain('undefined');
  });
});
