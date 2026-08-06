import { SupportedLanguage } from './i18n';

export function getLocalizedWorkspaceStrings(lang: SupportedLanguage) {
  if (lang === 'hi') {
    return {
      canvasLabel: 'कैनवास:',
      diagramLabel: 'आरेख:',
      versionText: 'संस्करण 21 (नवीनतम)',
      resetBtn: 'रिसेट',
      activeWorkspaceHeader: 'सक्रिय वर्कस्पेस एवं डिज़ाइन',
      updatedAgo: '11 घंटे पहले अपडेट किया गया • आरेख संस्करण v28',
      architectSuite: 'आर्किटेक्ट सूट एवं AI',
      estCost: 'अनुमानित $14,670/माह',
      exportStudio: 'एक्सपोर्ट स्टूडियो',
      composeDoc: 'दस्तावेज़ लिखें',
      secAuditBtn: 'सुरक्षा ऑडिट',
      suggestedRefinements: 'सुझाए गए सुधार',
      promptPlaceholder: 'उदा., PK/FK संबंधों के साथ Dim_Customer_Account तालिका जोड़ें...',
      sug1: 'Dim_Customer_Account और Dim_Merchant तालिकाओं को जोड़ें',
      sug2: 'Fact_Account_Transactions को 1:N कार्डिनलिटी से जोड़ें',
      sug3: 'PCI-DSS और KYC अनुपालन नियम लागू करें',
      sug4: 'कार्ड नेटवर्क शुल्क टियर विशेषताएँ जोड़ें',
      refineHint: 'भेजने के लिए Enter दबाएं। Gemini 3.6 Pro आपके आरेख को अद्यतन करेगा।',
      diagramTitle10: '10. एकीकृत सिस्टम दृश्य'
    };
  }
  return {
    canvasLabel: 'CANVAS:',
    diagramLabel: 'DIAGRAM:',
    versionText: 'Version 21 (Latest)',
    resetBtn: 'Reset',
    activeWorkspaceHeader: 'ACTIVE WORKSPACE & DESIGN',
    updatedAgo: 'Updated 11h ago Diagram Version v28',
    architectSuite: 'ARCHITECT SUITE & AI',
    estCost: 'Est. $14,670/mo',
    exportStudio: 'Export Studio',
    composeDoc: 'Compose Doc',
    secAuditBtn: 'Security Audit',
    suggestedRefinements: 'SUGGESTED NEXT REFINEMENTS',
    promptPlaceholder: 'e.g., Add Dim_Customer_Account table with PK/FK relationships...',
    sug1: 'Add Dim_Customer_Account & Dim_Merchant tables',
    sug2: 'Connect Fact_Account_Transactions with 1:N cardinality',
    sug3: 'Enforce PCI-DSS & KYC Compliance Rules',
    sug4: 'Add Card Network Fee Tier Attributes',
    refineHint: 'Press Enter to send. Gemini 3.6 Pro will refine your active diagram.',
    diagramTitle10: '10. Unified System View'
  };
}

export function localizeDrawioXmlDeep(xml: string, lang: SupportedLanguage): string {
  if (lang !== 'hi' || !xml) return xml;

  const replacements: Array<[string, string]> = [
    ["Enterprise Architecture Platform - 10. 10. UNIFIED SYSTEM VIEW (End-to-End without Compromise).", "एंटरप्राइज़ आर्किटेक्चर प्लेटफॉर्म - 10. एकीकृत सिस्टम दृश्य (एंड-टू-एंड)"],
    ["PLAN &amp; DATA FOUNDATION (Vetting &amp; ERD Integration)", "योजना एवं डेटा फ़ाउंडेशन (सत्यापन एवं ERD इंटीग्रेशन)"],
    ["PLAN & DATA FOUNDATION (Vetting & ERD Integration)", "योजना एवं डेटा फ़ाउंडेशन (सत्यापन एवं ERD इंटीग्रेशन)"],
    ["Project Planning", "परियोजना योजना"],
    ["Data Vetting", "डेटा सत्यापन"],
    ["Ethical Sourcing", "नैतिक स्रोत"],
    ["Dimensional Data Model (ERD)", "विमीय डेटा मॉडल (ERD)"],
    ["Track 2a: DATA ENGINEERING &amp; DFD", "ट्रैक 2a: डेटा इंजीनियरिंग एवं DFD"],
    ["Track 2a: DATA ENGINEERING & DFD", "ट्रैक 2a: डेटा इंजीनियरिंग एवं DFD"],
    ["Track 2b: FEATURE ENGINEERING FLOW", "ट्रैक 2b: फ़ीचर इंजीनियरिंग प्रवाह"],
    ["Track 2c: AI MODEL &amp; PROMPT DEVELOPMENT LIFECYCLE", "ट्रैक 2c: AI मॉडल एवं प्रॉम्प्ट विकास जीवनचक्र"],
    ["Track 2c: AI MODEL & PROMPT DEVELOPMENT LIFECYCLE", "ट्रैक 2c: AI मॉडल एवं प्रॉम्प्ट विकास जीवनचक्र"],
    ["Governance Boundary incorporating the full unified audits from Image 15", "पूर्ण एकीकृत ऑडिट को शामिल करने वाली शासन एवं सुरक्षा सीमा"],
    ["COGNITIVE ARCHITECTURE &amp; SECURE DEPLOYMENT", "संज्ञानात्मक आर्किटेक्चर एवं सुरक्षित परिनियोजन"],
    ["COGNITIVE ARCHITECTURE & SECURE DEPLOYMENT", "संज्ञानात्मक आर्किटेक्चर एवं सुरक्षित परिनियोजन"],
    ["Primary Governed VPC Network (Secure Managed Environment)", "प्राथमिक शासित वीपीसी नेटवर्क (सुरक्षित प्रबन्धित वातावरण)"],
    ["Private Application Subnet (Isolated)", "निजी एप्लिकेशन सबनेट (पृथक)"],
    ["Core Agent Orchestrator (GKE Pod)", "कोर एजेंट ऑर्केस्ट्रेटर (GKE पॉड)"],
    ["Integrated System Prompt", "एकीकृत सिस्टम प्रॉम्प्ट"],
    ["Conversation Memory", "बातचीत मेमोरी"],
    ["Gemini LLM (Reasoner)", "जेमिनी एलएलएम (तर्क इंजन)"],
    ["Public Internet Traffic", "सार्वजनिक इंटरनेट ट्रैफिक"],
    ["Global HTTPS Load Balancer (WAF)", "ग्लोबल एचटीटीपीएस लोड बैलेन्सर (WAF)"],
    ["Cloud API Gateway", "क्लाउड एपीआई गेटवे"],
    ["Private Data/AI Subnet (Isolated)", "निजी डेटा/AI सबनेट (पृथक)"],
    ["Key Definitions", "मुख्य परिभाषाएं"],
    ["Managed Compute", "प्रबंधित कंप्यूट"],
    ["Control Flow Boundary", "नियंत्रण प्रवाह सीमा"],
    ["Data Boundaries", "डेटा सीमाएं"],
    ["Why It Works:", "यह क्यों प्रभावी है:"],
    ["WHY IT WORKS:", "यह कैसे काम करता है:"]
  ];

  let out = xml;
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}
