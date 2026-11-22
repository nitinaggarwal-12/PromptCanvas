import { describe, it, expect } from 'vitest';
import JSZip from 'jszip';
import {
  NODE_TYPE_VALUES,
  CLOUD_VALUES,
  normalizeRawLlmGraphPayload,
  validateGraphJson,
  stripLayoutFromGraph,
  type ArchitectureGraph,
} from '@/lib/graph/schema';
import { computeElkLayout } from '@/lib/layout/elk-layout';
import { renderGraphToDrawioXml } from '@/lib/render/drawio-xml';
import { validateDrawioXml } from '@/lib/validate/validator';
import { getGenConfigForModel } from '@/lib/geminiConfig';
import { checkConversationalOrNonMutationIntent } from '@/lib/geminiRouteGuard';
import {
  parseDrawioXmlSpatialState,
  applySpatialMutationPlan,
} from '@/lib/freeform/directDrawioSpatialMutator';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '@/lib/preflightAuditEngine';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';
import { exportDrawioToEditablePptx } from '@/lib/export/editablePptxCompiler';
import {
  extractPresentationIdFromInput,
  applyGoogleSlidesPresentationToDrawioXml,
} from '@/lib/server/googleWorkspaceBridge';
import { createDiagram, getLatestDiagramVersion, deleteDiagram } from '@/lib/db';

const DENSE_AWS_FRAUD_GRAPH: ArchitectureGraph = {
  title: 'Real-Time Credit Card Fraud Detection on AWS',
  cloud: 'aws',
  tiers: [
    { id: 't_ingest', label: '1. Edge & Ingestion', order: 1 },
    { id: 't_stream', label: '2. Real-Time Stream Processing', order: 2 },
    { id: 't_ml', label: '3. ML Inference & Feature Store', order: 3 },
    { id: 't_store', label: '4. Persistence & Alerting', order: 4 },
  ],
  nodes: [
    { id: 'apigw', label: 'Amazon API Gateway', subtitle: 'REST / TLS 1.3', tier: 't_ingest', type: 'gateway', product: 'api_gateway' },
    { id: 'waf', label: 'AWS WAF', subtitle: 'Bot & DDoS Filter', tier: 't_ingest', type: 'security', product: 'waf' },
    { id: 'kinesis', label: 'Amazon Kinesis', subtitle: 'Transaction Stream', tier: 't_stream', type: 'queue', product: 'kinesis' },
    { id: 'flink', label: 'Apache Flink', subtitle: 'Windowed Aggregator', tier: 't_stream', type: 'service', product: 'flink' },
    { id: 'sagemaker', label: 'Amazon SageMaker', subtitle: 'XGBoost Fraud Model', tier: 't_ml', type: 'ai', product: 'sagemaker' },
    { id: 'redis', label: 'ElastiCache Redis', subtitle: 'Velocity Features', tier: 't_ml', type: 'cache', product: 'redis' },
    { id: 'dynamodb', label: 'Amazon DynamoDB', subtitle: 'Decision Ledger', tier: 't_store', type: 'database', product: 'dynamodb' },
    { id: 'sns', label: 'Amazon SNS', subtitle: 'Fraud Alerts', tier: 't_store', type: 'queue', product: 'sns' },
    { id: 's3', label: 'Amazon S3 Lake', subtitle: 'Training Archive', tier: 't_store', type: 'storage', product: 's3' },
  ],
  edges: [
    { id: 'e1', source: 'waf', target: 'apigw', label: '1. Filter Traffic', style: 'solid' },
    { id: 'e2', source: 'apigw', target: 'kinesis', label: '2. Ingest Event', style: 'solid' },
    { id: 'e3', source: 'kinesis', target: 'flink', label: '3. Stream Records', style: 'solid' },
    { id: 'e4', source: 'flink', target: 'redis', label: '4. Fetch Velocity', style: 'solid' },
    { id: 'e5', source: 'flink', target: 'sagemaker', label: '5. Score Tx', style: 'solid' },
    { id: 'e6', source: 'sagemaker', target: 'dynamodb', label: '6. Persist Score', style: 'solid' },
    { id: 'e7', source: 'sagemaker', target: 'sns', label: '7. Trigger Alert', style: 'dashed' },
    { id: 'e8', source: 'kinesis', target: 's3', label: '8. Archive Raw (Skip-Tier)', style: 'dashed' },
    { id: 'e9', source: 'dynamodb', target: 'flink', label: '9. Feedback Loop', style: 'dashed' },
  ],
};

describe('PromptCanvas Permanent Remediation Invariants', () => {
  describe('1. Canonical Schema, Normalizer & Thinking Config', () => {
    it('exports service in NODE_TYPE_VALUES and accepts 0-based tiers + alias node types via normalizeRawLlmGraphPayload', () => {
      expect(NODE_TYPE_VALUES).toContain('service');
      expect(CLOUD_VALUES).toContain('aws');

      const rawFromGemini = {
        title: 'AWS Event Pipeline',
        cloud: 'Amazon Web Services',
        tiers: [
          { id: 't0', label: 'Ingress', order: 0 },
          { id: 't1', label: 'Processing', order: 1 },
        ],
        nodes: [
          { id: 'n1', label: 'Lambda Worker', tier: 't0', type: 'lambda' },
          { id: 'n2', label: 'Kafka Broker', tier: 't1', type: 'kafka' },
          { id: 'n3', label: 'Core Service', tier: 't1', type: 'service' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'Emit' },
          { id: 'e2', source: 'n2', target: 'n3', label: 'Consume' },
        ],
      };

      const normalized = normalizeRawLlmGraphPayload(rawFromGemini);
      const result = validateGraphJson(normalized);
      expect(result.valid).toBe(true);
      expect(result.graph?.cloud).toBe('aws');
      expect(result.graph?.tiers[0].order).toBe(1);
      expect(result.graph?.tiers[1].order).toBe(2);
      expect(result.graph?.nodes.find((n) => n.id === 'n3')?.type).toBe('service');
    });

    it('strips layout coordinates and bendPoints in stripLayoutFromGraph for compact edit prompts', async () => {
      const laidOut = await computeElkLayout(DENSE_AWS_FRAUD_GRAPH);
      expect(laidOut.nodes[0].x).toBeTypeOf('number');
      expect(laidOut.edges.some((e) => (e.bendPoints?.length ?? 0) > 0)).toBe(true);

      const stripped = stripLayoutFromGraph(laidOut);
      expect(stripped.nodes[0].x).toBeUndefined();
      expect(stripped.nodes[0].y).toBeUndefined();
      expect(stripped.tiers[0].width).toBeUndefined();
      expect(stripped.edges.every((e) => e.bendPoints === undefined)).toBe(true);
    });

    it('emits numeric thinkingBudget (never thinkingLevel) for gemini-2.5-* models', () => {
      const genCfg = getGenConfigForModel('generate', 'gemini-2.5-flash');
      const editCfg = getGenConfigForModel('edit', 'gemini-2.5-pro');
      expect(genCfg.thinkingConfig).toBeDefined();
      expect((genCfg.thinkingConfig as any).thinkingLevel).toBeUndefined();
      expect(typeof (genCfg.thinkingConfig as any).thinkingBudget).toBe('number');
      expect((editCfg.thinkingConfig as any).thinkingLevel).toBeUndefined();
      expect(typeof (editCfg.thinkingConfig as any).thinkingBudget).toBe('number');
    });
  });

  describe('2. Conversational Guard Accuracy', () => {
    it('allows architecture prompts starting with "Help me design/build/architect..."', () => {
      expect(checkConversationalOrNonMutationIntent('Help me design a zero-trust GKE platform with Cloud Armor').isNonMutation).toBe(false);
      expect(checkConversationalOrNonMutationIntent('Help me build a Redis cluster with sentinel failover').isNonMutation).toBe(false);
      expect(checkConversationalOrNonMutationIntent('Can you help me architect an AWS fraud detection system?').isNonMutation).toBe(false);
    });

    it('blocks bare greetings and identity questions without duplicating model names', () => {
      const hi = checkConversationalOrNonMutationIntent('hi');
      expect(hi.isNonMutation).toBe(true);
      const help = checkConversationalOrNonMutationIntent('help');
      expect(help.isNonMutation).toBe(true);
      const who = checkConversationalOrNonMutationIntent('who are you?');
      expect(who.isNonMutation).toBe(true);
      expect(who.replyMessage || '').not.toContain('Gemini 2.5 Pro, Gemini 2.5 Pro');
    });
  });

  describe('3. Mathematical Layout, Orthogonal Bypass Bus Router & Clean XML Renderer', () => {
    it('produces 0 validation errors, uniform tier widths, distinct SVG icons, cylinder headroom, explicit orthogonal edges, and zero onerror= XSS sinks', async () => {
      const laidOut = await computeElkLayout(DENSE_AWS_FRAUD_GRAPH);
      const tierWidths = laidOut.tiers.map((t) => t.width ?? 0);
      expect(Math.max(...tierWidths) - Math.min(...tierWidths)).toBe(0);

      const dbNode = laidOut.nodes.find((n) => n.id === 'dynamodb');
      expect(dbNode).toBeDefined();
      expect(dbNode!.height ?? 0).toBeGreaterThanOrEqual(96);

      const xml = renderGraphToDrawioXml(laidOut);
      const report = validateDrawioXml(xml);
      expect(report.valid).toBe(true);
      expect(report.errors).toHaveLength(0);
      expect(xml).not.toMatch(/onerror\s*=/i);
      expect(xml).toContain('id="v2_canvas_title"');
      expect(xml).toContain('edgeStyle=none;rounded=1;');

      const iconMatches = [...xml.matchAll(/data:image\/svg\+xml[^"']+/g)].map((m) => m[0]);
      const uniqueIcons = new Set(iconMatches);
      expect(uniqueIcons.size).toBeGreaterThanOrEqual(4);
    });
  });

  describe('4. Database graph_json Persistence on Create', () => {
    it('persists graphJson on version 1 inside createDiagram and retrieves it via getLatestDiagramVersion', async () => {
      const laidOut = await computeElkLayout(DENSE_AWS_FRAUD_GRAPH);
      const xml = renderGraphToDrawioXml(laidOut);
      const serializedGraph = JSON.stringify(laidOut);

      const created = await createDiagram(
        'Invariant Test AWS Fraud',
        xml,
        'Unit test persistence check',
        'Build AWS fraud pipeline',
        'reasoning',
        'business',
        'tech',
        'unit_test_user',
        'v2_custom',
        false,
        undefined,
        serializedGraph
      );

      try {
        expect(created.version?.graph_json).toBe(serializedGraph);
        const latest = await getLatestDiagramVersion(created.diagram.id);
        expect(latest?.graph_json).toBe(serializedGraph);
      } finally {
        await deleteDiagram(created.diagram.id, 'unit_test_user', true);
      }
    });
  });

  describe('5. Spatial Mutator movePlacement + Live Audit Metrics', () => {
    it('applies movePlacement=right_of relative to moveAnchorId and maintains zero overlaps', async () => {
      const laidOut = await computeElkLayout(DENSE_AWS_FRAUD_GRAPH);
      const xml = renderGraphToDrawioXml(laidOut);
      const state = parseDrawioXmlSpatialState(xml);
      const origSns = state.cells.find((c) => c.id === 'sns')!;
      const anchorDb = state.cells.find((c) => c.id === 'dynamodb')!;

      const mutated = applySpatialMutationPlan(
        state,
        {
          summaryOfChanges: 'Move SNS to the right of DynamoDB',
          modifyCells: [
            {
              id: 'sns',
              movePlacement: 'right_of',
              moveAnchorId: 'dynamodb',
            },
          ],
        },
        'unit-test',
        'Move SNS right of DynamoDB'
      );

      const afterState = parseDrawioXmlSpatialState(mutated.xml);
      const movedSns = afterState.cells.find((c) => c.id === 'sns')!;
      expect(movedSns.absX).toBeGreaterThan(anchorDb.absX + anchorDb.w - 5);
      expect(movedSns.absX !== origSns.absX || movedSns.absY !== origSns.absY).toBe(true);
      expect(mutated.stats.siblingOverlaps).toBe(0);
      expect(mutated.stats.childContainmentViolations).toBe(0);
    });
  });

  describe('6. Preflight & Healer Preservation of Draw.io & Slides-Synced XML', () => {
    it('does not delete custom header cells or strip orthogonal waypoints from user-edited Draw.io or Slides-synced XML', () => {
      const manualXml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net" agent="PromptCanvas-UserDrawio" data-user-drawio="true" data-prompt-to-diagram="true" data-slides-synced="true">
  <diagram id="d1" name="Custom User Diagram">
    <mxGraphModel dx="1420" dy="1200" grid="1" gridSize="10" pageWidth="1600" pageHeight="1300">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="header_title" value="My Custom Title" style="text;html=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="20" width="420" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="n_a" value="Service A" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="80" y="120" width="220" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="n_b" value="Service B" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="80" y="1020" width="220" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="e_1" value="Long Route" style="edgeStyle=none;rounded=1;html=1;" edge="1" parent="1" source="n_a" target="n_b">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="460" y="160"/>
              <mxPoint x="460" y="1150"/>
            </Array>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

      const preflightXml = preflightVerifyAndHealXmlAcrossAll6Audits(manualXml);
      expect(preflightXml).toContain('id="header_title"');
      expect(preflightXml).toContain('y="1150"');

      const healed = validateAndHealDrawioXml(manualXml);
      expect(healed.xml).toContain('id="header_title"');
      expect(healed.xml).toContain('y="1150"');
    });
  });

  describe('7. Editable PPTX Zero Vendor Leak + Google Slides Bidirectional Round-Trip Sync', () => {
    it('exports AWS diagram to PPTX with zero GCP/NASA brand leaks and embeds PROMPTCANVAS_SLIDES_SYNC_V1 manifest', async () => {
      const laidOut = await computeElkLayout(DENSE_AWS_FRAUD_GRAPH);
      const xml = renderGraphToDrawioXml(laidOut);

      const base64 = (await exportDrawioToEditablePptx(
        xml,
        'Real-Time Credit Card Fraud Detection on AWS',
        'CUSTOM-AWS-FRAUD',
        { returnBase64: true }
      )) as string;

      expect(typeof base64).toBe('string');
      expect(base64.length).toBeGreaterThan(1000);

      const zip = await JSZip.loadAsync(base64, { base64: true });
      const slideTextChunks: string[] = [];
      let manifestRaw = '';

      for (const fileName of Object.keys(zip.files)) {
        if (/^ppt\/slides\/slide\d+\.xml$/.test(fileName)) {
          slideTextChunks.push(await zip.file(fileName)!.async('string'));
        }
        if (/^ppt\/notesSlides\/notesSlide\d+\.xml$/.test(fileName)) {
          const notesXml = await zip.file(fileName)!.async('string');
          const plain = notesXml.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
          if (plain.includes('PROMPTCANVAS_SLIDES_SYNC_V1:')) {
            manifestRaw = plain;
          }
        }
      }

      const allSlideXml = slideTextChunks.join('\n');
      const forbiddenLeaks = [
        'Cloud Architecture Center',
        'Google Cloud',
        'Parallel Simulation',
        'Closed-Loop Telemetry',
        'AlloyDB',
        'Model Armor',
      ];
      for (const leak of forbiddenLeaks) {
        expect(allSlideXml).not.toContain(leak);
      }

      expect(manifestRaw).toContain('PROMPTCANVAS_SLIDES_SYNC_V1:');

      // Round-trip test: simulate user editing Slide 2 in Google Slides (1 rename, 1 move, 1 new shape)
      const EMU_PER_IN = 914400;
      const jsonMatch = manifestRaw.match(/PROMPTCANVAS_SLIDES_SYNC_V1:(\{[\s\S]*\})/);
      expect(jsonMatch).not.toBeNull();
      const manifest = JSON.parse(jsonMatch![1]);
      expect(manifest.cells.length).toBeGreaterThanOrEqual(8);

      const makeSlideShape = (
        objectId: string,
        xIn: number,
        yIn: number,
        wIn: number,
        hIn: number,
        text: string
      ) => ({
        objectId,
        size: {
          width: { magnitude: Math.round(wIn * EMU_PER_IN), unit: 'EMU' },
          height: { magnitude: Math.round(hIn * EMU_PER_IN), unit: 'EMU' },
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: Math.round(xIn * EMU_PER_IN),
          translateY: Math.round(yIn * EMU_PER_IN),
          unit: 'EMU',
        },
        shape: {
          shapeType: 'ROUND_RECTANGLE',
          text: {
            textElements: [{ textRun: { content: `${text}\n` } }],
          },
        },
      });

      const targetRenameCell = manifest.cells.find((c: any) => c.id === 'sagemaker')!;
      const targetMoveCell = manifest.cells.find((c: any) => c.id === 'sns')!;

      const mockSlidesPresentation = {
        presentationId: 'pres_roundtrip_001',
        title: 'AWS Fraud Edited Deck',
        slides: [
          { objectId: 'slide_cover', pageElements: [] },
          {
            objectId: 'slide_diagram',
            slideProperties: {
              notesPage: {
                pageElements: [
                  {
                    shape: {
                      text: {
                        textElements: [{ textRun: { content: `PROMPTCANVAS_SLIDES_SYNC_V1:${jsonMatch![1]}` } }],
                      },
                    },
                  },
                ],
              },
            },
            pageElements: [
              // Rename SageMaker -> Amazon Bedrock Guardrails
              makeSlideShape(
                'el_renamed',
                targetRenameCell.sx,
                targetRenameCell.sy,
                targetRenameCell.sw,
                targetRenameCell.sh,
                'Amazon Bedrock Fraud Scorer\nClaude + XGBoost Ensemble'
              ),
              // Move SNS 1.4 inches to the right
              makeSlideShape(
                'el_moved',
                targetMoveCell.sx + 1.4,
                targetMoveCell.sy,
                targetMoveCell.sw,
                targetMoveCell.sh,
                targetMoveCell.label
              ),
              // Add brand-new shape drawn in Google Slides
              makeSlideShape('el_brand_new_dlq', 9.2, 5.2, 1.8, 0.7, 'Amazon SQS DLQ\nDead Letter Queue'),
            ],
          },
        ],
      };

      expect(extractPresentationIdFromInput('https://docs.google.com/presentation/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit#slide=id.p2')).toBe(
        '1AbCdEfGhIjKlMnOpQrStUvWxYz'
      );

      const syncResult = await applyGoogleSlidesPresentationToDrawioXml(
        xml,
        mockSlidesPresentation,
        'pres_roundtrip_001'
      );
      expect(syncResult.matchedSlideObjectId).toBe('slide_diagram');
      expect(syncResult.renamedCells).toHaveLength(1);
      expect(syncResult.renamedCells[0].to).toBe('Amazon Bedrock Fraud Scorer');
      expect(syncResult.movedCells).toHaveLength(1);
      expect(syncResult.movedCells[0].id).toBe('sns');
      expect(syncResult.addedCells).toHaveLength(1);
      expect(syncResult.addedCells[0].label).toBe('Amazon SQS DLQ');
      expect(syncResult.totalChanges).toBe(3);
      expect(syncResult.xml).toContain('data-slides-synced="true"');
      expect(syncResult.xml).toContain('Amazon Bedrock Fraud Scorer');
      expect(syncResult.xml).toContain('Amazon SQS DLQ');
    });
  });
});
