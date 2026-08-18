import { describe, it, expect } from 'vitest';
import {
  getExactLegacyDataDependencyMapXml,
  getExactGcpLandingZoneVpcXml,
  getExactEnterpriseAgentRuntimeXml,
  getExactAiAgentApprovalWorkflowXml,
  getExactIncidentTriageSwimlaneXml,
  getExactEcommerceRetailXml,
  getExactHrTalentAiXml,
  getExactSmartFactoryIotXml,
  getExactC4ComponentLldXml,
  getExactBpmnWorkflowXml,
  getExactThreatModelingStrideXml,
  getExactDataLineageXml,
  getExactHealthcareFhirXml,
  getExactSupplyChainXml
} from '../../src/lib/newEnterpriseReferenceXmls';
import { getDefaultXmlForArchitecture, normalizeArchitectureId } from '../../src/lib/architectureTypes';

describe('New Enterprise Master Builders Integrity Test Suite', () => {
  const builders = [
    { id: 'legacy_data_dependency_map', getter: getExactLegacyDataDependencyMapXml, expectedKey: 'StratoZone' },
    { id: 'gcp_landing_zone_vpc', getter: getExactGcpLandingZoneVpcXml, expectedKey: 'Shared VPC' },
    { id: 'enterprise_agent_runtime', getter: getExactEnterpriseAgentRuntimeXml, expectedKey: 'Enterprise Agent Runtime Microservice' },
    { id: 'ai_agent_approval_workflow', getter: getExactAiAgentApprovalWorkflowXml, expectedKey: 'Binary Authorization' },
    { id: 'incident_triage_swimlane', getter: getExactIncidentTriageSwimlaneXml, expectedKey: 'Gemini Cloud Assist' },
    { id: 'ecommerce_retail', getter: getExactEcommerceRetailXml, expectedKey: 'Vertex AI Retail Search' },
    { id: 'hr_talent_ai', getter: getExactHrTalentAiXml, expectedKey: 'Document AI' },
    { id: 'smart_factory_iot', getter: getExactSmartFactoryIotXml, expectedKey: 'Manufacturing Data Engine' },
    { id: 'tech_supply_chain', getter: getExactSupplyChainXml, expectedKey: 'Manufacturing Data Engine' },
    { id: 'c4_component_lld', getter: getExactC4ComponentLldXml, expectedKey: 'C4 MODEL LEVEL 3' },
    { id: 'bpmn_process_workflow', getter: getExactBpmnWorkflowXml, expectedKey: 'BPMN 2.0' },
    { id: 'threat_modeling_stride', getter: getExactThreatModelingStrideXml, expectedKey: 'STRIDE' },
    { id: 'data_lineage_provenance', getter: getExactDataLineageXml, expectedKey: 'COLUMN-LEVEL DATA LINEAGE' },
    { id: 'healthcare_fhir_hl7', getter: getExactHealthcareFhirXml, expectedKey: 'Cloud Healthcare API' },
  ];

  builders.forEach(({ id, getter, expectedKey }) => {
    it(`should build valid widescreen XML for ${id}`, () => {
      const xml = getter();
      expect(xml).toBeDefined();
      expect(xml).toContain('<mxfile');
      expect(xml).toContain('</mxfile>');
      expect(xml).toContain('<mxGraphModel');
      expect(xml).toMatch(/pageWidth="(?:1360|1400|1600)"/);
      expect(xml).toMatch(/Gemini/);
      expect(xml).toContain(expectedKey);

      // Verify no unescaped ampersands in active XML tags/attributes (outside comments)
      const xmlWithoutComments = xml.replace(/<!--[\s\S]*?-->/g, '');
      const regex = /&(?!(amp|quot|lt|gt|nbsp|#\d+|#x[0-9a-fA-F]+);)/g;
      let m;
      const issues: string[] = [];
      while ((m = regex.exec(xmlWithoutComments)) !== null) {
        issues.push(xmlWithoutComments.substring(Math.max(0, m.index - 20), Math.min(xmlWithoutComments.length, m.index + 30)));
      }
      if (issues.length > 0) {
        console.log(`Issues in ${id}:`, issues);
      }
      expect(issues.length).toBe(0);
    });

    it(`should normalize and fetch default XML via getDefaultXmlForArchitecture('${id}')`, () => {
      const normalized = normalizeArchitectureId(id);
      expect(normalized).toBe(id);
      const defaultXml = getDefaultXmlForArchitecture(id);
      expect(defaultXml).toBeDefined();
      expect(defaultXml).toContain(expectedKey);
    });
  });
});
