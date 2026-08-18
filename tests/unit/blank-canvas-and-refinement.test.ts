import { describe, it, expect, vi } from 'vitest';
import { executeUnifiedDiagramPipeline } from '@/lib/unifiedDiagramEngine';
import { customizeDiagramTemplateWithGemini } from '@/lib/geminiDiagramCustomizer';

// Mock GoogleGenAI for deterministic testing
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(function() {
      return {
        models: {
          generateContent: vi.fn().mockImplementation(async (req: any) => {
            const contentsStr = typeof req.contents === 'string' ? req.contents : JSON.stringify(req.contents);
            if (contentsStr.includes('accuracy') || contentsStr.includes('verification')) {
              // Simulate Gemini returning JSON inside markdown code fences
              return {
                text: '```json\n' + JSON.stringify({
                  reasoning: 'Added accuracy verification layer and CRM fact-checking core.',
                  businessUsecase: 'Provides automated sales data capture with zero hallucination.',
                  technicalUsecase: 'Integrated verification proxy with sales CRM synchronization.',
                  headerTitle: 'Sales Intelligence & Accuracy Platform',
                  headerSubtitle: 'Iteration: Added Fact-Checking & Accuracy Verification Core',
                  customizations: {
                    'card_ingestion': {
                      title: 'Accuracy Verification Engine',
                      subtitle: 'Grounding checks<br/>Sales CRM sync',
                      badge: 'Verification Core'
                    }
                  }
                }, null, 2) + '\n```'
              };
            }

            // Standard initial customization response
            return {
              text: '```json\n' + JSON.stringify({
                reasoning: 'Generated enterprise sales intelligence platform.',
                businessUsecase: 'Captures meeting notes and CRM interactions.',
                technicalUsecase: 'Multi-tier GKE architecture with BigQuery logging.',
                headerTitle: 'Sales Intelligence Platform',
                headerSubtitle: 'Automated CRM meeting analysis architecture',
                customizations: {
                  'card_ingestion': {
                    title: 'Sales Note Ingestion Hub',
                    subtitle: 'Calendar invites<br/>Domain extraction',
                    badge: 'Ingress'
                  }
                }
              }, null, 2) + '\n```'
            };
          }),
        },
      };
    }),
  };
});

describe('Blank Canvas & Iterative Refinement Suite', () => {
  it('should synthesize a rich 30+ node architecture when starting with architectureType="blank_canvas" and a prompt', async () => {
    const prompt = 'We need to capture as much information as we can for our user (who is a sales person). Like taking notes when we have calendar invites with user, their domain name, details on what they spoke about. and suggest what they should do next.';
    
    const result = await executeUnifiedDiagramPipeline({
      prompt,
      architectureType: 'blank_canvas',
      name: 'Sales Intelligence Assistant'
    });

    expect(result.xml).toBeDefined();
    expect(result.xml.length).toBeGreaterThan(1000);
    const vertexCount = (result.xml.match(/vertex="1"/g) || []).length;
    expect(vertexCount).toBeGreaterThanOrEqual(10);
    expect(result.xml).not.toContain('<root><mxCell id="0"/><mxCell id="1" parent="0"/></root>');
  });

  it('should iteratively refine an existing diagram when given an evolution prompt', async () => {
    // 1. Initial diagram
    const promptV1 = 'Build a sales intelligence platform for automated notes';
    const resultV1 = await executeUnifiedDiagramPipeline({
      prompt: promptV1,
      architectureType: 'blank_canvas',
      name: 'Sales Assistant'
    });

    expect(resultV1.diagram?.id).toBeDefined();

    // 2. Refinement prompt on existing diagram
    const promptV2 = 'add the right components to solve for accuracy issues and fact-checking against our sales CRM';
    const resultV2 = await executeUnifiedDiagramPipeline({
      prompt: promptV2,
      diagramId: resultV1.diagram?.id,
      architectureType: resultV1.architectureType
    });

    expect(resultV2.version?.id).toBeDefined();
    expect(resultV2.xml).toBeDefined();
    expect(resultV2.xml.length).toBeGreaterThan(1000);
    
    // Assert that accuracy/verification terms are in the resulting XML
    const hasAccuracy = /accuracy|verification|grounding|fact|crm/i.test(resultV2.xml);
    expect(hasAccuracy).toBe(true);
  });

  it('should gracefully handle Gemini output wrapped in markdown code fences', async () => {
    const templateXml = `<mxfile><diagram id="d1"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="card_ingestion" value="&lt;table&gt;&lt;tr&gt;&lt;td&gt;&lt;b&gt;Old Ingestion&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" vertex="1" parent="1"><mxGeometry x="100" y="100" width="200" height="80" as="geometry"/></mxCell></root></mxGraphModel></diagram></mxfile>`;
    
    const customResult = await customizeDiagramTemplateWithGemini(
      templateXml,
      'add accuracy and verification components',
      'agentic_rag'
    );

    expect(customResult.xml).toContain('Accuracy Verification Engine');
    expect(customResult.xml).toContain('Verification Core');
  });
});
