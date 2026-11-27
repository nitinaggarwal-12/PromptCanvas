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

const AWS_FRAUD_DRAWIO_XML = `<mxfile host="app.diagrams.net"><diagram id="aws_fraud_1" name="Real-Time Credit Card Fraud Detection on AWS"><mxGraphModel dx="1600" dy="900" pageWidth="1600" pageHeight="900"><root><mxCell id="0"/><mxCell id="1" parent="0"/>
  <mxCell id="waf" value="&lt;b&gt;AWS WAF&lt;/b&gt;&lt;br/&gt;Bot &amp; DDoS Filter" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="60" y="120" width="210" height="84" as="geometry"/></mxCell>
  <mxCell id="apigw" value="&lt;b&gt;Amazon API Gateway&lt;/b&gt;&lt;br/&gt;REST / TLS 1.3" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="330" y="120" width="210" height="84" as="geometry"/></mxCell>
  <mxCell id="kinesis" value="&lt;b&gt;Amazon Kinesis&lt;/b&gt;&lt;br/&gt;Transaction Stream" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="600" y="120" width="210" height="84" as="geometry"/></mxCell>
  <mxCell id="flink" value="&lt;b&gt;Apache Flink&lt;/b&gt;&lt;br/&gt;Windowed Aggregator" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="870" y="120" width="210" height="84" as="geometry"/></mxCell>
  <mxCell id="redis" value="&lt;b&gt;ElastiCache Redis&lt;/b&gt;&lt;br/&gt;Velocity Features" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="60" y="300" width="210" height="84" as="geometry"/></mxCell>
  <mxCell id="sagemaker" value="&lt;b&gt;Amazon SageMaker&lt;/b&gt;&lt;br/&gt;XGBoost Fraud Model" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="330" y="300" width="210" height="84" as="geometry"/></mxCell>
  <mxCell id="dynamodb" value="&lt;b&gt;Amazon DynamoDB&lt;/b&gt;&lt;br/&gt;Decision Ledger" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="600" y="300" width="210" height="84" as="geometry"/></mxCell>
  <mxCell id="sns" value="&lt;b&gt;Amazon SNS&lt;/b&gt;&lt;br/&gt;Fraud Alerts" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="60" y="480" width="210" height="84" as="geometry"/></mxCell>
  <mxCell id="s3" value="&lt;b&gt;Amazon S3 Lake&lt;/b&gt;&lt;br/&gt;Training Archive" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="1140" y="300" width="210" height="84" as="geometry"/></mxCell>
  <mxCell id="e1" value="1. Filter" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="waf" target="apigw"><mxGeometry relative="1" as="geometry"/></mxCell>
  <mxCell id="e2" value="2. Ingest" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="apigw" target="kinesis"><mxGeometry relative="1" as="geometry"/></mxCell>
  <mxCell id="e3" value="3. Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="kinesis" target="flink"><mxGeometry relative="1" as="geometry"/></mxCell>
  <mxCell id="e4" value="4. Score" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="flink" target="sagemaker"><mxGeometry relative="1" as="geometry"/></mxCell>
  <mxCell id="e5" value="5. Persist" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="sagemaker" target="dynamodb"><mxGeometry relative="1" as="geometry"/></mxCell>
  <mxCell id="e6" value="6. Alert" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="sagemaker" target="sns"><mxGeometry relative="1" as="geometry"/></mxCell>
</root></mxGraphModel></diagram></mxfile>`;

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

    it('strips layout coordinates and bendPoints in stripLayoutFromGraph for compact edit prompts', () => {
      const positioned: ArchitectureGraph = {
        title: 'Positioned Graph',
        cloud: 'aws',
        tiers: [{ id: 't1', label: 'Edge', order: 1, x: 20, y: 40, width: 1200, height: 180 }],
        nodes: [{ id: 'n1', label: 'WAF', tier: 't1', type: 'security', x: 60, y: 80, width: 200, height: 80 }],
        edges: [{ id: 'e1', source: 'n1', target: 'n1', style: 'solid', bendPoints: [{ x: 100, y: 120 }] }],
      };

      const stripped = stripLayoutFromGraph(positioned);
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
      expect(checkConversationalOrNonMutationIntent('hi').isNonMutation).toBe(true);
      expect(checkConversationalOrNonMutationIntent('help').isNonMutation).toBe(true);
      const who = checkConversationalOrNonMutationIntent('who are you?');
      expect(who.isNonMutation).toBe(true);
      expect(who.replyMessage || '').not.toContain('Gemini 2.5 Pro, Gemini 2.5 Pro');
    });
  });

  describe('3. Database graph_json Persistence on Create', () => {
    it('persists graphJson on version 1 inside createDiagram and retrieves it via getLatestDiagramVersion', async () => {
      const serializedGraph = JSON.stringify({ title: 'AWS Fraud', nodes: ['waf', 'apigw'] });

      const created = await createDiagram(
        'Invariant Test AWS Fraud',
        AWS_FRAUD_DRAWIO_XML,
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

  describe('4. Spatial Mutator movePlacement + Live Audit Metrics', () => {
    it('applies movePlacement=right_of relative to moveAnchorId and maintains zero overlaps', () => {
      const state = parseDrawioXmlSpatialState(AWS_FRAUD_DRAWIO_XML);
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

  describe('5. Preflight & Healer Preservation of Draw.io & Slides-Synced XML', () => {
    it('does not delete custom header cells or strip orthogonal waypoints from user-edited Draw.io or Slides-synced XML', () => {
      const manualXml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net" agent="PromptCanvas-UserDrawio" data-user-drawio="true" data-prompt-to-diagram="true" data-slides-synced="true"><diagram id="d1" name="Custom User Diagram"><mxGraphModel dx="1420" dy="1200" grid="1" gridSize="10" pageWidth="1600" pageHeight="1300"><root>
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
</root></mxGraphModel></diagram></mxfile>`;

      const preflightXml = preflightVerifyAndHealXmlAcrossAll6Audits(manualXml);
      expect(preflightXml).toContain('id="header_title"');
      expect(preflightXml).toContain('y="1150"');

      const healed = validateAndHealDrawioXml(manualXml);
      expect(healed.xml).toContain('id="header_title"');
      expect(healed.xml).toContain('y="1150"');
    });
  });

  describe('6. Editable PPTX Zero Vendor Leak + Google Slides Bidirectional Round-Trip Sync', () => {
    it('exports AWS diagram to PPTX with zero GCP/NASA brand leaks and embeds PROMPTCANVAS_SLIDES_SYNC_V1 manifest', async () => {
      const base64 = (await exportDrawioToEditablePptx(
        AWS_FRAUD_DRAWIO_XML,
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
              makeSlideShape(
                'el_renamed',
                targetRenameCell.sx,
                targetRenameCell.sy,
                targetRenameCell.sw,
                targetRenameCell.sh,
                'Amazon Bedrock Fraud Scorer\nXGBoost Ensemble'
              ),
              makeSlideShape(
                'el_moved',
                targetMoveCell.sx + 1.4,
                targetMoveCell.sy,
                targetMoveCell.sw,
                targetMoveCell.sh,
                targetMoveCell.label
              ),
              makeSlideShape('el_brand_new_dlq', 9.2, 5.2, 1.8, 0.7, 'Amazon SQS DLQ\nDead Letter Queue'),
            ],
          },
        ],
      };

      expect(
        extractPresentationIdFromInput('https://docs.google.com/presentation/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit#slide=id.p2')
      ).toBe('1AbCdEfGhIjKlMnOpQrStUvWxYz');

      const syncResult = await applyGoogleSlidesPresentationToDrawioXml(
        AWS_FRAUD_DRAWIO_XML,
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
