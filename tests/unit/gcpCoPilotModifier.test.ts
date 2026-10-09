import { describe, it, expect } from 'vitest';
import { executeGcpPromptModification } from '@/lib/gcpCoPilotModifier';
import { classifyChatIntent } from '@/lib/router/chatIntentClassifier';
import { ALL_GCP_DIALECT_A_ARCHITECTURES } from '@/lib/gcpDialectA';

describe('GCP Architecture Co-Pilot Modifier & Quality Gates', () => {
  const baseArch = ALL_GCP_DIALECT_A_ARCHITECTURES[0];
  const baseXml = baseArch.generateXml(true);

  it('classifies advisory and gap questions correctly without mutating diagram', () => {
    const question1 = classifyChatIntent('What is missing in this architecture?');
    expect(question1.intent).toBe('question');

    const question2 = classifyChatIntent('How does the data flow from ingestion to storage?');
    expect(question2.intent).toBe('question');

    const mutation = classifyChatIntent('Add Cloud Armor WAF and Spanner multi-region');
    expect(mutation.intent).toBe('mutation');
  });

  it('prevents prompt inversion on negative / removal intent (e.g. "remove spanner")', () => {
    const result = executeGcpPromptModification(
      baseXml,
      'Remove Cloud Spanner and decouple persistence',
      1,
      baseArch.id,
      true
    );

    expect(result.assistantMessage.actionSummary?.canvasDiff).toContain('Decoupled');
    expect(result.updatedXml).toContain('copilot_mod_decouple_');
    expect(result.updatedXml).not.toContain('Cloud Spanner Active-Active nam3 Leader');
  });

  it('handles replacement intent cleanly (e.g. "replace spanner with cloud sql postgres")', () => {
    const result = executeGcpPromptModification(
      baseXml,
      'Replace Spanner with Cloud SQL PostgreSQL HA cluster',
      1,
      baseArch.id,
      true
    );

    expect(result.assistantMessage.actionSummary?.canvasDiff).toContain('Cloud SQL PostgreSQL');
    expect(result.updatedXml).toContain('Cloud SQL Enterprise Plus (PostgreSQL 16)');
    expect(result.updatedXml).toContain('copilot_mod_cloudsql_');
  });

  it('translates cross-cloud vendor entities (AWS S3, DynamoDB, Lambda) to authentic GCP services', () => {
    // AWS S3 -> Google Cloud Storage
    const s3Result = executeGcpPromptModification(
      baseXml,
      'Add AWS S3 bucket for file uploads',
      1,
      baseArch.id,
      true
    );
    expect(s3Result.assistantMessage.actionSummary?.canvasDiff).toContain('Google Cloud Storage');
    expect(s3Result.updatedXml).toContain('STORAGE ADAPTER: GCS');

    // DynamoDB -> Cloud Spanner
    const dynamoResult = executeGcpPromptModification(
      baseXml,
      'Connect DynamoDB database',
      2,
      baseArch.id,
      true
    );
    expect(dynamoResult.assistantMessage.actionSummary?.canvasDiff).toContain('Cloud Spanner');
    expect(dynamoResult.updatedXml).toContain('DATABASE ADAPTER: SPANNER');

    // Lambda -> Cloud Run
    const lambdaResult = executeGcpPromptModification(
      baseXml,
      'Deploy serverless AWS Lambda workers',
      3,
      baseArch.id,
      true
    );
    expect(lambdaResult.assistantMessage.actionSummary?.canvasDiff).toContain('Cloud Run');
    expect(lambdaResult.updatedXml).toContain('COMPUTE ADAPTER: CLOUD RUN');
  });

  it('dynamically computes safe channel coordinates avoiding top banner collisions (y >= 640)', () => {
    const result = executeGcpPromptModification(
      baseXml,
      'Integrate Apache Kafka event ingestion pipeline',
      1,
      baseArch.id,
      true
    );

    // Coordinate must be in open bottom channel y >= 640
    expect(result.updatedXml).toMatch(/<mxGeometry[^>]*y="6[0-9]{2}"/);
    expect(result.updatedXml).toContain('edgeStyle=orthogonalEdgeStyle');
    expect(result.updatedXml).toContain('Synthesized Link');
  });

  it('escapes raw HTML/XML injection characters preventing XML syntax corruption', () => {
    const maliciousPrompt = 'Inject <script>alert("xss")</script> & "special" \'quotes\' > < symbols';
    const result = executeGcpPromptModification(
      baseXml,
      maliciousPrompt,
      1,
      baseArch.id,
      true
    );

    expect(result.updatedXml).not.toContain('<script>');
    expect(result.updatedXml).toContain('&lt;script&gt;');
    expect(result.updatedXml).toContain('&amp;');
    expect(result.newVersion.versionTag).toBe('v1.1');
  });

  it('connects suggested prompts to real existing vertex IDs and upgrades nodes in-place on Canonical Blueprint #00', async () => {
    const { generateUpgradedGcpGeBankingArchitectureXml } = await import('@/lib/canonical/upgradedGcpGeBankingAgentTemplate');
    const bp00Xml = generateUpgradedGcpGeBankingArchitectureXml({ theme: 'light' });

    const step1 = executeGcpPromptModification(
      bp00Xml,
      '+ Upgrade Cloud Spanner to Multi-Region Dual-Zone HA',
      1,
      'canonical_00',
      false
    );
    expect(step1.updatedXml).toContain('target="db_spanner"');
    expect(step1.updatedXml).toContain('Multi-Region nam3 HA');

    const step2 = executeGcpPromptModification(
      step1.updatedXml,
      '+ Insert Vertex AI Model Armor Prompt-Injection Firewall',
      2,
      'canonical_00',
      false
    );
    expect(step2.updatedXml).toContain('target="dlp_model_armor"');
    expect(step2.updatedXml).toContain('Vertex AI Model Armor Prompt-Injection Firewall');

    const step3 = executeGcpPromptModification(
      step2.updatedXml,
      '+ Attach BigQuery Cost Intelligence & Cloud Billing Anomaly Pipeline',
      3,
      'canonical_00',
      false
    );
    expect(step3.updatedXml).toContain('target="obs_container"');
    expect(step3.updatedXml).toContain('BigQuery Cost Intelligence &amp; Billing Anomaly AI');
    expect(step3.updatedXml).not.toContain('&amp; Clou"');
  });

  it('normalizes British spelling "add model armour" to Model Armor in-place upgrade instead of generic custom box', async () => {
    const { generateUpgradedGcpGeBankingArchitectureXml } = await import('@/lib/canonical/upgradedGcpGeBankingAgentTemplate');
    const bp00Xml = generateUpgradedGcpGeBankingArchitectureXml({ theme: 'light' });

    const res = executeGcpPromptModification(
      bp00Xml,
      'add model armour',
      1,
      'canonical_00',
      false
    );
    expect(res.updatedXml).toContain('target="dlp_model_armor"');
    expect(res.updatedXml).toContain('Vertex AI Model Armor Prompt-Injection Firewall');
    expect(res.updatedXml).not.toContain('Synthesized &amp; connected by Google Cloud Architecture Co-Pilot');
    expect(res.newVersion.author).toBe('CISO / Security Architect');
  });

  it('synthesizes full NASA Multi-Universe Satellite Launch Agentic Harness topology when prompted to build NASA satellite harness', async () => {
    const { generateUpgradedGcpGeBankingArchitectureXml } = await import('@/lib/canonical/upgradedGcpGeBankingAgentTemplate');
    const bp00Xml = generateUpgradedGcpGeBankingArchitectureXml({ theme: 'light' });

    const res = executeGcpPromptModification(
      bp00Xml,
      '1. Build an agentic harness for Nasa launching satellights in the different universes',
      1,
      'canonical_00',
      false
    );

    expect(res.updatedXml).toContain('Mission Harness Coordinator');
    expect(res.updatedXml).toContain('Orbital &amp; Trajectory');
    expect(res.updatedXml).toContain('Launch &amp; Payload');
    expect(res.updatedXml).toContain('Multiverse Relay');
    expect(res.updatedXml).toContain('Cross-Universe');
    expect(res.updatedXml).toContain('Quantum Relay');
    expect(res.updatedXml).toContain('copilot_mod_nasa_harness_box_');
    expect(res.updatedXml).not.toContain('Cheque book');
    expect(res.updatedXml).not.toContain('eKYC update');
    expect(res.newVersion.author).toBe('Mission Systems & Aerospace AI Lead');
  });
});


