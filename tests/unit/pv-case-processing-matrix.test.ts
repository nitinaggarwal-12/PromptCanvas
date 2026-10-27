import { describe, it, expect } from 'vitest';
import {
  PV_USE_CASE_OVERVIEW,
  PV_MASTER_DIAGRAM_MATRIX,
  PV_DOCUMENTS,
  compilePvRowDrawioXml,
  getPvDocById,
  getPvRowById,
  getPvRowsForDoc,
  exportPvDocToMarkdown,
} from '@/lib/pvCaseProcessing';

const EXPECTED_39_ROWS = [
  [1, 'BRD / PRD', 'Context Diagram', 'Business', 'PM / BA', 'All'],
  [1, 'BRD / PRD', 'As-is / To-be Process (BPMN)', 'Business', 'PM / BA', 'All'],
  [1, 'BRD / PRD', 'User Journey', 'User', 'PM / BA', 'All'],
  [1, 'BRD / PRD', 'Use Case Diagram', 'User', 'PM / BA', 'All'],
  [1, 'BRD / PRD', 'Wireframes', 'User', 'UX Designer', 'All (if UI)'],
  [2, 'SAD', 'Context Diagram', 'Very high', 'Solution Architect', 'All'],
  [2, 'SAD', 'Conceptual Architecture', 'High', 'Solution Architect', 'All'],
  [2, 'SAD', 'Logical Architecture', 'Mid', 'Solution Architect', 'All'],
  [2, 'SAD', 'Technical Architecture', 'Physical', 'Solution Architect', 'All'],
  [2, 'SAD', 'Deployment Diagram (summary)', 'Physical', 'Solution Architect', 'All'],
  [2, 'SAD', 'Agent Architecture', 'Logical → Technical', 'Solution Architect', 'AI'],
  [2, 'SAD', 'Guardrails / HITL Approval Flow', 'Mid', 'Solution Architect', 'AI'],
  [3, 'ADRs', 'Option Comparison Sketch', 'Narrow', 'Architect', 'All'],
  [4, 'HLD', 'Component Diagram (C4 L3)', 'Mid', 'Tech Lead', 'All'],
  [4, 'HLD', 'Key Sequence Diagrams', 'Mid', 'Tech Lead', 'All'],
  [4, 'HLD', 'Conceptual ERD', 'High', 'Tech Lead', 'All'],
  [4, 'HLD', 'Logical ERD', 'Mid', 'Tech Lead', 'All'],
  [4, 'HLD', 'Data Flow Diagram', 'Mid', 'Tech Lead', 'All'],
  [4, 'HLD', 'A2A / MCP Interaction Sequence', 'Mid', 'Tech Lead', 'AI'],
  [5, 'LLD', 'Detailed Sequence Diagrams', 'Low', 'Developer', 'All'],
  [5, 'LLD', 'Class Diagram', 'Low', 'Developer', 'All'],
  [5, 'LLD', 'State Diagram', 'Low', 'Developer', 'All'],
  [5, 'LLD', 'Physical ERD', 'Low', 'Developer', 'All'],
  [6, 'API Spec', 'Sequence per Key API Call', 'Contract', 'Tech Lead', 'All'],
  [6, 'API Spec', 'Agent Tool-Call Sequence', 'Contract', 'Tech Lead', 'AI'],
  [7, 'Threat Model', 'DFD with Trust Boundaries', 'Mid', 'Security Architect', 'All'],
  [7, 'Threat Model', 'Agent Attack Surface (prompt injection, tool misuse)', 'Mid', 'Security Architect', 'AI'],
  [8, 'Test & Eval Plan', 'Test Pyramid / Environment Flow (optional)', 'Process', 'QA Lead', 'All'],
  [8, 'Test & Eval Plan', 'Eval Pipeline Flow (optional)', 'Process', 'QA Lead', 'AI'],
  [9, 'Deployment & Ops Doc', 'Deployment Diagram', 'Physical', 'DevOps / SRE', 'All'],
  [9, 'Deployment & Ops Doc', 'Network Topology', 'Physical', 'DevOps / SRE', 'All'],
  [9, 'Deployment & Ops Doc', 'CI/CD Pipeline', 'Physical', 'DevOps / SRE', 'All'],
  [9, 'Deployment & Ops Doc', 'HA / DR Diagram', 'Physical', 'DevOps / SRE', 'All'],
  [9, 'Deployment & Ops Doc', 'Monitoring / Alert Flow', 'Ops', 'DevOps / SRE', 'All'],
  [9, 'Deployment & Ops Doc', 'Cutover / Rollback Flow', 'Ops', 'DevOps / SRE', 'All'],
  [9, 'Deployment & Ops Doc', 'LLM Tracing / Observability Flow', 'Ops', 'DevOps / SRE', 'AI'],
  [10, 'Compliance & Validation Pack', 'PHI / PII Data Flow', 'Data-handling', 'Compliance Lead', 'Regulated'],
  [10, 'Compliance & Validation Pack', 'System Boundary Diagram', 'Exact', 'Validation Lead', 'Regulated'],
  [10, 'Compliance & Validation Pack', 'Deployment Diagram (as-built)', 'Exact', 'Validation Lead', 'Regulated'],
] as const;

describe('PV Case Processing 10-Document & 39-Diagram Matrix Pack', () => {
  it('defines the 8-Agent PV use case overview and 6-layer GCP stack', () => {
    expect(PV_USE_CASE_OVERVIEW.agents).toHaveLength(8);
    expect(PV_USE_CASE_OVERVIEW.gcpStack).toHaveLength(6);
    expect(PV_USE_CASE_OVERVIEW.complexityDrivers).toHaveLength(6);
  });

  it('matches all 39 rows of the Document & Diagram Matrix verbatim', () => {
    expect(PV_MASTER_DIAGRAM_MATRIX).toHaveLength(39);
    EXPECTED_39_ROWS.forEach(([docNum, document, diagram, level, owner, projectType], idx) => {
      const row = PV_MASTER_DIAGRAM_MATRIX[idx];
      expect(row.rowId).toBe(idx + 1);
      expect(row.docNum).toBe(docNum);
      expect(row.document).toBe(document);
      expect(row.diagram).toBe(diagram);
      expect(row.level).toBe(level);
      expect(row.owner).toBe(owner);
      expect(row.projectType).toBe(projectType);
    });
  });

  it('links all 10 associated documents (Doc 1 to Doc 10) to all 39 diagram rows with zero orphans', () => {
    expect(PV_DOCUMENTS).toHaveLength(10);
    const allEmbeddedRowIds: number[] = [];

    PV_DOCUMENTS.forEach((doc, idx) => {
      expect(doc.docNum).toBe(idx + 1);
      expect(doc.docId).toBe(`doc-${String(idx + 1).padStart(2, '0')}`);
      const docRows = getPvRowsForDoc(doc.docId);
      expect(docRows.map((r) => r.rowId)).toEqual(doc.diagramRowIds);

      const sectionRowIds = doc.sections.flatMap((s) => s.diagramRowIds || []);
      expect(sectionRowIds.sort((a, b) => a - b)).toEqual(
        [...doc.diagramRowIds].sort((a, b) => a - b)
      );
      allEmbeddedRowIds.push(...sectionRowIds);

      const md = exportPvDocToMarkdown(doc);
      expect(md).toContain(doc.title);
      expect(md.length).toBeGreaterThan(800);
    });

    expect(allEmbeddedRowIds.sort((a, b) => a - b)).toEqual(
      Array.from({ length: 39 }, (_, i) => i + 1)
    );
  });

  it('compiles all 39 diagrams into valid Brand Light Draw.io XML with semicolon-safe SVG icons', () => {
    for (let rId = 1; rId <= 39; rId++) {
      const row = getPvRowById(rId);
      const doc = getPvDocById(row.docId);
      expect(doc.docNum).toBe(row.docNum);

      const xml = compilePvRowDrawioXml(row);
      expect(xml).toContain('<mxGraphModel');
      expect(xml).toContain('background="#FFFFFF"');
      expect(xml).toContain(row.diagram.replace(/&/g, '&amp;'));
      // Verify 12 official GCP icon cells with semicolon-safe data URIs
      const iconMatches = xml.match(/shape=image;[^"]*image=data:image\/svg\+xml,[^";]+/g) || [];
      expect(iconMatches).toHaveLength(12);
    }
  });
});
