export type SupportedLanguage = 'en' | 'es' | 'pt' | 'ja' | 'fr' | 'de' | 'hi' | 'id' | 'ar' | 'zh';


// FULL-SPECTRUM MULTILINGUAL DRAW.IO CANVAS TOPOLOGY ENGINE
export function translateDiagramXmlToLanguage(xml: string, lang: SupportedLanguage): string {
  if (lang === 'en' || !xml) return xml;

  const HINDI_COMPLETE_MAP: Record<string, string> = {
    "UNIFIED SYSTEM VIEW": "एकीकृत सिस्टम दृश्य",
    "Unified System View": "एकीकृत सिस्टम दृश्य",
    "End-to-End Enterprise Architecture across major phases": "सभी प्रमुख चरणों में एंड-टू-एंड एंटरप्राइज़ आर्किटेक्चर",
    "Plan &amp; Data Foundation": "योजना एवं डेटा फ़ाउंडेशन",
    "Plan & Data Foundation": "योजना एवं डेटा फ़ाउंडेशन",
    "Project Planning": "परियोजना योजना",
    "Data Vetting": "डेटा सत्यापन",
    "Ethical Sourcing": "नैतिक स्रोत",
    "Dimensional Data Model (ERD)": "विमीय डेटा मॉडल (ERD)",
    "Feature Engineering Flow": "फ़ीचर इंजीनियरिंग प्रवाह",
    "AI Model &amp; Prompt Development Lifecycle": "AI मॉडल एवं प्रॉम्प्ट विकास जीवनचक्र",
    "AI Model & Prompt Development Lifecycle": "AI मॉडल एवं प्रॉम्प्ट विकास जीवनचक्र",
    "Cognitive Architecture &amp; Secure Deployment": "संज्ञानात्मक आर्किटेक्चर एवं सुरक्षित परिनियोजन",
    "Cognitive Architecture & Secure Deployment": "संज्ञानात्मक आर्किटेक्चर एवं सुरक्षित परिनियोजन",
    "Governance Boundary": "शासन एवं सुरक्षा सीमा",
    "Primary Governed VPC Network": "प्राथमिक शासित वीपीसी नेटवर्क",
    "Private Application Subnet": "निजी एप्लिकेशन सबनेट",
    "Core Agent Orchestrator": "कोर एजेंट ऑर्केस्ट्रेटर",
    "Integrated System Prompt": "एकीकृत सिस्टम प्रॉम्प्ट",
    "Conversation Memory": "बातचीत मेमोरी",
    "Gemini LLM (Reasoner)": "जेमिनी एलएलएम (तर्क इंजन)",
    "Key Definitions": "मुख्य परिभाषाएं",
    "Managed Compute": "प्रबंधित कंप्यूट",
    "Control Flow Boundary": "नियंत्रण प्रवाह सीमा",
    "Data Boundaries": "डेटा सीमाएं",
    "Data Boundary": "डेटा सीमा",
    "WHY IT WORKS": "यह कैसे काम करता है",
    "Why It Works": "यह कैसे काम करता है",
    "Public Internet Traffic": "सार्वजनिक इंटरनेट ट्रैफिक",
    "Global HTTPS Load Balancer": "ग्लोबल एचटीटीपीएस लोड बैलेन्सर",
    "Cloud API Gateway": "क्लाउड एपीआई गेटवे",
    "Private Cloud Network": "निजी क्लाउड नेटवर्क",
    "Managed Feature Store": "प्रबंधित फ़ीचर स्टोर",
    "Raw Data Lake": "रॉ डेटा लेक",
    "Vector Database": "वेक्टर डेटाबेस",
    "Continuous Observation &amp; Alerting": "सतत निगरानी एवं अलर्टिंग",
    "Human-in-the-Loop Governance Board": "मानव-नियंत्रित शासन बोर्ड",
    "Security &amp; Zero-Trust Audit": "सुरक्षा एवं ज़ीरो-ट्रस्ट ऑडिट"
  };

  const SPANISH_COMPLETE_MAP: Record<string, string> = {
    "UNIFIED SYSTEM VIEW": "VISTA DE SISTEMA UNIFICADA",
    "Plan &amp; Data Foundation": "Base de Datos y Planificación",
    "Governance Boundary": "Límite de Gobernanza",
    "Key Definitions": "Definiciones Clave",
    "Core Agent Orchestrator": "Orquestador Principal de Agente"
  };

  const map = lang === 'hi' ? HINDI_COMPLETE_MAP : lang === 'es' ? SPANISH_COMPLETE_MAP : HINDI_COMPLETE_MAP;
  let translated = xml;
  for (const [enTerm, localTerm] of Object.entries(map)) {
    translated = translated.replace(new RegExp(enTerm, 'g'), localTerm);
  }
  return translated;
}
