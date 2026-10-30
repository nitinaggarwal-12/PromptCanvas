import { describe, it, expect } from 'vitest';
import { executeGcpPromptModification } from '@/lib/gcpCoPilotModifier';
import { classifyChatIntent } from '@/lib/router/chatIntentClassifier';
import { ALL_GCP_DIALECT_A_ARCHITECTURES } from '@/lib/gcpDialectA';

describe('Architecture Co-Pilot Spatial Modifier (Hijacker-Free)', () => {
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

  it('genuinely deletes matching vertex and connected edges on removal intent', () => {
    const sampleXml = `<mxfile><diagram id="d1"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="db_spanner" value="Cloud Spanner" vertex="1" parent="1"><mxGeometry x="100" y="100" width="180" height="70" as="geometry"/></mxCell><mxCell id="api_gw" value="API Gateway" vertex="1" parent="1"><mxGeometry x="100" y="240" width="180" height="70" as="geometry"/></mxCell><mxCell id="e1" edge="1" parent="1" source="api_gw" target="db_spanner"><mxGeometry relative="1" as="geometry"/></mxCell></root></mxGraphModel></diagram></mxfile>`;
    const result = executeGcpPromptModification(sampleXml, 'Remove Cloud Spanner', 1, 'blank', false);
    expect(result.updatedXml).not.toContain('id="db_spanner"');
    expect(result.updatedXml).not.toContain('target="db_spanner"');
    expect(result.updatedXml).toContain('id="api_gw"');
  });

  it('preserves user-requested multi-cloud vendor names instead of silently rewriting AWS to GCP', () => {
    const s3Result = executeGcpPromptModification(baseXml, 'Add AWS S3 bucket for file uploads', 1, baseArch.id, false);
    expect(s3Result.updatedXml).toContain('AWS S3 bucket');
    expect(s3Result.updatedXml).not.toContain('STORAGE ADAPTER: GCS');
  });

  it('applies structured liveGeminiSpec faithfully and escapes HTML/XML injection characters', () => {
    const maliciousPrompt = 'Inject <script>alert("xss")</script> & "special"';
    const result = executeGcpPromptModification(baseXml, maliciousPrompt, 2, baseArch.id, false, 'Security Architect', {
      titleText: 'WAF <Guard> & Shield',
      badgeText: 'SECURITY',
      descText: 'Blocks <script> payloads',
      edgeLabel: 'Filtered HTTPS',
      accentColor: '#DC2626',
      fillColor: '#FEF2F2',
      targetKeywords: ['gateway'],
      canvasDiff: 'Added WAF Guard',
      specDiff: 'Updated security controls',
      isLiveGeminiModification: true,
      modelUsed: 'gemini-2.5-pro',
    });

    expect(result.updatedXml).not.toContain('<script>');
    expect(result.updatedXml).toContain('WAF &amp;lt;Guard&amp;gt;');
    expect(result.newVersion.versionTag).toBe('v1.2');
    expect(result.newVersion.author).toBe('Security Architect');
  });

  it('never hijacks aerospace or custom prompts into hardcoded Flight Director / multiverse templates', () => {
    const res = executeGcpPromptModification(
      baseXml,
      'Add satellite telemetry receiver gateway',
      1,
      baseArch.id,
      false
    );
    expect(res.updatedXml).toContain('satellite telemetry receiver gateway');
    expect(res.updatedXml).not.toContain('Flight Director Coordinator');
    expect(res.updatedXml).not.toContain('CLOSED-LOOP 100Hz CCSDS');
  });
});
