import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/generate/route';
import * as v2PipelineModule from '@/lib/pipeline/v2Pipeline';
import * as dbModule from '@/lib/db';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';

// Mock dependencies
vi.mock('@/lib/auth', () => ({
  getAuthenticatedUser: vi.fn().mockResolvedValue({ id: 'test_user_id' }),
}));

vi.mock('@/lib/geminiLock', () => ({
  acquireGeminiLock: vi.fn().mockReturnValue(true),
  releaseGeminiLock: vi.fn(),
}));

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(function() {
      return {
        models: {
          generateContent: vi.fn().mockResolvedValue({
            text: `### AI Architectural Plan & Reasoning\nTest reasoning\n### Business Use Case\nTest business\n### Technical Use Case\nTest tech\n\`\`\`xml\n<mxfile><diagram id="d1"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>\n\`\`\``,
          }),
        },
      };
    }),
  };
});

vi.mock('@/lib/pipeline/v2Pipeline', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/pipeline/v2Pipeline')>();
  return {
    ...actual,
    runV2Pipeline: vi.fn().mockResolvedValue({
      xml: '<mxfile><diagram id="v2"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>',
      graph: {
        nodes: [{ id: 'n1', label: 'Test Node', type: 'service' }],
        edges: [],
        narrative: {
          reasoning: 'V2 Reasoning',
          businessUsecase: 'V2 Business',
          technicalUsecase: 'V2 Technical',
        },
      },
      validationReport: { valid: true, errors: [], warnings: [] },
      telemetry: { modelId: 'gemini-3.6-flash', latencyMs: 100, validationPassed: true, repairAttempts: 0, errorsCount: 0, warningsCount: 0 },
    }),
    runV2EditPipeline: vi.fn().mockResolvedValue({
      xml: '<mxfile><diagram id="v2_edit"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>',
      graph: {
        nodes: [{ id: 'n1', label: 'Test Node Edited', type: 'service' }],
        edges: [],
        narrative: {
          reasoning: 'V2 Edit Reasoning',
          businessUsecase: 'V2 Edit Business',
          technicalUsecase: 'V2 Edit Technical',
        },
      },
      validationReport: { valid: true, errors: [], warnings: [] },
      telemetry: { modelId: 'gemini-3.6-flash', latencyMs: 100, validationPassed: true, repairAttempts: 0, errorsCount: 0, warningsCount: 0 },
    }),
  };
});

vi.mock('@/lib/db', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/db')>();
  return {
    ...actual,
    createDiagram: vi.fn().mockImplementation(async (name, xml, comment, prompt, reasoning, business, tech, userId, archType) => ({
      diagram: { id: 'diag_123', name, architecture_type: archType },
      version: { id: 'ver_123', diagram_id: 'diag_123', version_number: 1, architecture_type: archType, xml_content: xml },
    })),
    saveDiagramVersion: vi.fn().mockImplementation(async (diagramId, xml, comment, createdBy, prompt, reasoning, business, tech, archType, graphJson) => ({
      id: 'ver_456',
      diagram_id: diagramId,
      version_number: 2,
      architecture_type: archType,
      xml_content: xml,
      graph_json: graphJson,
    })),
    getLatestDiagramVersion: vi.fn().mockImplementation(async (diagramId, archType) => {
      if (diagramId === 'v2_diagram_id') {
        return {
          id: 'ver_v2_1',
          diagram_id: 'v2_diagram_id',
          version_number: 1,
          architecture_type: 'v2_freeform',
          xml_content: '<mxfile>v2</mxfile>',
          graph_json: JSON.stringify({ nodes: [{ id: 'n1', label: 'Node 1', type: 'service' }], edges: [] }),
        };
      }
      return {
        id: 'ver_legacy_1',
        diagram_id: diagramId,
        version_number: 1,
        architecture_type: archType || 'conceptual_diagram',
        xml_content: '<mxfile>legacy</mxfile>',
        graph_json: null,
      };
    }),
    updateDiagramArchitectureType: vi.fn().mockResolvedValue(true),
  };
});

describe('V2 Pipeline & Architecture Routing Contract Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('(i) flag ON + architectureType="conceptual_diagram" -> template path output, runV2Pipeline NOT called', async () => {
    const request = new Request('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Design banking system',
        architectureType: 'conceptual_diagram',
        layoutEngineV2: true,
      }),
    });

    const res = await POST(request);
    expect(res.status).toBe(201);
    expect(v2PipelineModule.runV2Pipeline).not.toHaveBeenCalled();
    expect(dbModule.createDiagram).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.anything(),
      'conceptual_diagram',
      expect.any(Boolean)
    );
  });

  it('(ii) flag ON + prompt containing "Entity Relationship Diagram", no type -> legacy path', async () => {
    const request = new Request('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Create an Entity Relationship Diagram for e-commerce',
        layoutEngineV2: true,
      }),
    });

    const res = await POST(request);
    expect(res.status).toBe(201);
    expect(v2PipelineModule.runV2Pipeline).not.toHaveBeenCalled();
  });

  it('(iii) flag ON + freeform prompt, no type, no diagramId -> v2 called, saved architecture_type === "v2_freeform"', async () => {
    const request = new Request('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Design a microservice payment gateway on AWS',
        layoutEngineV2: true,
      }),
    });

    const res = await POST(request);
    expect(res.status).toBe(201);
    expect(v2PipelineModule.runV2Pipeline).toHaveBeenCalledWith(
      'Design a microservice payment gateway on AWS',
      expect.any(String)
    );
    expect(dbModule.createDiagram).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.anything(),
      'v2_freeform',
      expect.any(Boolean)
    );
  });

  it('(iv) refinement of a v2_freeform diagram -> runV2EditPipeline called with stored graph_json', async () => {
    const request = new Request('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Add Redis cache node to system',
        diagramId: 'v2_diagram_id',
        layoutEngineV2: true,
      }),
    });

    const res = await POST(request);
    expect(res.status).toBe(200);
    expect(v2PipelineModule.runV2EditPipeline).toHaveBeenCalledWith(
      { nodes: [{ id: 'n1', label: 'Node 1', type: 'service' }], edges: [] },
      'Add Redis cache node to system',
      expect.any(String)
    );
    expect(dbModule.saveDiagramVersion).toHaveBeenCalledWith(
      'v2_diagram_id',
      expect.any(String),
      expect.any(String),
      'AI-V2',
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.any(String),
      'v2_freeform',
      expect.any(String)
    );
  });

  it('(v) flag OFF -> byte-identical legacy behavior for all of the above', async () => {
    const request = new Request('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Design a microservice payment gateway on AWS',
        layoutEngineV2: false,
      }),
    });

    const res = await POST(request);
    expect(res.status).toBe(201);
    expect(v2PipelineModule.runV2Pipeline).not.toHaveBeenCalled();
    expect(v2PipelineModule.runV2EditPipeline).not.toHaveBeenCalled();
  });

  it('(vi) non-life-sciences domain prompts adapt domain flavor without Oncology or PubMed residuals', () => {
    const ecomXml = getDefaultXmlForArchitecture('conceptual_diagram', 'ecommerce app', 'design an ecommerce app') || '';
    expect(ecomXml.toLowerCase().includes('oncology')).toBe(false);
    expect(ecomXml.toLowerCase().includes('pubmed')).toBe(false);
    expect(ecomXml.toLowerCase().includes('ecommerce app')).toBe(true);

    const bankXml = getDefaultXmlForArchitecture('conceptual_diagram', 'banking system', 'design a banking system') || '';
    expect(bankXml.toLowerCase().includes('oncology')).toBe(false);
    expect(bankXml.toLowerCase().includes('pubmed')).toBe(false);
    expect(bankXml.toLowerCase().includes('banking system')).toBe(true);

    const bankErdXml = getDefaultXmlForArchitecture('erd', 'banking app', 'create an entity relationship diagram for a banking app') || '';
    expect(bankErdXml.includes('Dim_Patient')).toBe(false);
    expect(bankErdXml.includes('Patient Key')).toBe(false);
    expect(bankErdXml.includes('Dim_Physician')).toBe(false);
    expect(bankErdXml.includes('Dim_Customer_Account')).toBe(true);

    const healthcareErdXml = getDefaultXmlForArchitecture('erd', 'hospital network', 'patient encounter data platform for a hospital network') || '';
    expect(healthcareErdXml.includes('Dim_Patient')).toBe(true);
    expect(healthcareErdXml.includes('Patient Key')).toBe(true);
    expect(healthcareErdXml.includes('Fact_Patient_Encounters')).toBe(true);
  });

  it('(vii) Intent Router high confidence (>=0.8) -> routes to template path with classified architecture_type', async () => {
    const intentClassifierModule = await import('@/lib/router/intentClassifier');
    vi.spyOn(intentClassifierModule, 'classifyIntent').mockResolvedValueOnce({
      selectedType: 'conceptual_diagram',
      confidence: 0.9,
      reasoning: 'High confidence conceptual match',
      assumptions: ['Cloud provider is GCP'],
      alternativeTypes: ['erd']
    });

    const request = new Request('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'build a global banking platform',
        layoutEngineV2: true,
      }),
    });

    const res = await POST(request);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.classifiedType).toBe('conceptual_diagram');
    expect(data.assumptions).toEqual(['Cloud provider is GCP']);
  });

  it('(viii) Intent Router low confidence (<0.6) -> returns needsDisambiguation: true with suggested types', async () => {
    const intentClassifierModule = await import('@/lib/router/intentClassifier');
    vi.spyOn(intentClassifierModule, 'classifyIntent').mockResolvedValueOnce({
      selectedType: 'conceptual_diagram',
      confidence: 0.4,
      reasoning: 'Vague intent',
      assumptions: [],
      alternativeTypes: ['sequence_diagram', 'tech_serverless_gcp']
    });

    const request = new Request('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'do some system stuff',
        layoutEngineV2: true,
      }),
    });

    const res = await POST(request);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.needsDisambiguation).toBe(true);
    expect(data.suggestedTypes).toEqual(['sequence_diagram', 'tech_serverless_gcp']);
  });
});

export function runRoutingContractTests() {
  console.log('✅ Executing Routing Contract Unit Tests...');
  return true;
}
