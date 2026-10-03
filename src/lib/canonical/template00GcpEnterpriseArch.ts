/**
 * Canonical Blueprint 00: GCP Enterprise Architecture (Default 2026 GCP & Gemini Enterprise Native Technical Architecture)
 * Supports Technical, Logical, Conceptual, and Process perspectives.
 */

import { generateUpgradedGcpGeBankingArchitectureXml } from "./upgradedGcpGeBankingAgentTemplate";
import { generateLogicalGcpAgentArchitectureXml } from "./templateLogicalGcpAgentArchitecture";
import { generateConceptualGcpAgentArchitectureXml } from "./templateConceptualGcpAgentArch";
import { generateProcessGcpAgentWorkflowXml } from "./templateProcessGcpAgentWorkflow";
import {
  generateWhiteboardGcpAgentArchXml,
  convertXmlToWhiteboardMode,
} from "./templateWhiteboardGcpAgentArch";
import {
  generatePaperGcpAgentArchXml,
  convertXmlToPaperMode,
} from "./templatePaperGcpAgentArch";

export function generateTemplate00GcpEnterpriseArchXml(
  domainFlavor?: string,
  theme: "light" | "dark" = "light",
  perspective: "Logical" | "Technical" | "Process" | "Conceptual" | "Whiteboard" | "Paper" = "Technical"
): string {
  if (perspective === "Logical") {
    return generateLogicalGcpAgentArchitectureXml({
      domain: domainFlavor || "GCP ENTERPRISE",
      theme,
      projectTitle: "Google Cloud Multi-Agent Logical Architecture",
    });
  }
  if (perspective === "Conceptual") {
    return generateConceptualGcpAgentArchitectureXml({
      domain: domainFlavor || "GCP ENTERPRISE",
      theme,
      projectTitle: "Enterprise Multi-Agent Conceptual Architecture",
    });
  }
  if (perspective === "Process") {
    return generateProcessGcpAgentWorkflowXml({
      domain: domainFlavor || "GCP ENTERPRISE",
      theme,
      projectTitle: "Multi-Agent Request Processing & Banking Workflow",
    });
  }
  if (perspective === "Whiteboard") {
    return generateWhiteboardGcpAgentArchXml({
      domain: domainFlavor || "GCP ENTERPRISE",
      theme,
      projectTitle: "Multi-Agent Intelligence Core — Whiteboard Architecture",
    });
  }
  if (perspective === "Paper") {
    return generatePaperGcpAgentArchXml({
      domain: domainFlavor || "GCP ENTERPRISE",
      theme,
      projectTitle: "Multi-Agent Orchestration — Spiral Graph-Paper Sketch",
    });
  }
  return generateUpgradedGcpGeBankingArchitectureXml({
    projectTitle: "00 — GCP Native Technical Architecture (Gemini Enterprise, ADK, A2A & MCP)",
    projectName: "Google Cloud & Gemini Enterprise",
    useCaseName: domainFlavor || "Multi-Agent Native Technical Reference Architecture",
    domain: domainFlavor || "GCP ENTERPRISE",
    theme,
  });
}

export function generateTemplate00LogicalXml(
  domainFlavor?: string,
  theme: "light" | "dark" = "light"
): string {
  return generateLogicalGcpAgentArchitectureXml({
    domain: domainFlavor || "GCP ENTERPRISE",
    theme,
    projectTitle: "Google Cloud Multi-Agent Logical Architecture",
  });
}

export function generateTemplate00ConceptualXml(
  domainFlavor?: string,
  theme: "light" | "dark" = "light"
): string {
  return generateConceptualGcpAgentArchitectureXml({
    domain: domainFlavor || "GCP ENTERPRISE",
    theme,
    projectTitle: "Enterprise Multi-Agent Conceptual Architecture",
  });
}

export function generateTemplate00ProcessXml(
  domainFlavor?: string,
  theme: "light" | "dark" = "light"
): string {
  return generateProcessGcpAgentWorkflowXml({
    domain: domainFlavor || "GCP ENTERPRISE",
    theme,
    projectTitle: "Multi-Agent Request Processing & Banking Workflow",
  });
}

export {
  generateLogicalGcpAgentArchitectureXml,
  generateConceptualGcpAgentArchitectureXml,
  generateProcessGcpAgentWorkflowXml,
  generateWhiteboardGcpAgentArchXml,
  convertXmlToWhiteboardMode,
  generatePaperGcpAgentArchXml,
  convertXmlToPaperMode,
};

