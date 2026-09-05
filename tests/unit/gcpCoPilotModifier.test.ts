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
});
