import { SupportedLanguage } from './i18n';

export interface TranslatedDiagramBundle {
  diagramId: string;
  versionId: string;
  language: SupportedLanguage;
  localizedXml: string;
}

// In-memory & DB-backed localization cache for zero-latency switching
const diagramTranslationCache: Record<string, string> = {};

const ENTERPRISE_LEXICON: Record<SupportedLanguage, Record<string, string>> = {
  en: {},
  hi: {
    "Enterprise Architecture Platform": "एंटरप्राइज़ आर्किटेक्चर प्लेटफॉर्म",
    "UNIFIED SYSTEM VIEW": "एकीकृत सिस्टम दृश्य",
    "PLAN & DATA FOUNDATION": "योजना एवं डेटा फ़ाउंडेशन",
    "Project Planning": "परियोजना योजना",
    "Data Vetting": "डेटा सत्यापन",
    "Ethical Sourcing": "नैतिक स्रोत",
    "Dimensional Data Model": "विमीय डेटा मॉडल",
    "DATA ENGINEERING & DFD": "डेटा इंजीनियरिंग एवं DFD",
    "FEATURE ENGINEERING FLOW": "फ़ीचर इंजीनियरिंग प्रवाह",
    "AI MODEL & PROMPT DEVELOPMENT LIFECYCLE": "AI मॉडल एवं प्रॉम्प्ट विकास जीवनचक्र",
    "COGNITIVE ARCHITECTURE & SECURE DEPLOYMENT": "संज्ञानात्मक आर्किटेक्चर एवं सुरक्षित परिनियोजन",
    "Primary Governed VPC Network": "प्राथमिक शासित वीपीसी नेटवर्क",
    "Private Application Subnet": "निजी एप्लिकेशन सबनेट",
    "Core Agent Orchestrator": "कोर एजेंट ऑर्केस्ट्रेटर",
    "Integrated System Prompt": "एकीकृत सिस्टम प्रॉम्प्ट",
    "Conversation Memory": "बातचीत मेमोरी",
    "Gemini LLM (Reasoner)": "जेमिनी एलएलएम (तर्क इंजन)",
    "Public Internet Traffic": "सार्वजनिक इंटरनेट ट्रैफिक",
    "Global HTTPS Load Balancer": "ग्लोबल एचटीटीपीएस लोड बैलेन्सर",
    "Cloud API Gateway": "क्लाउड एपीआई गेटवे",
    "Private Data/AI Subnet": "निजी डेटा/AI सबनेट",
    "Key Definitions": "मुख्य परिभाषाएं",
    "Managed Compute": "प्रबंधित कंप्यूट",
    "Control Flow Boundary": "नियंत्रण प्रवाह सीमा",
    "Data Boundaries": "डेटा सीमाएं",
    "WHY IT WORKS:": "यह कैसे काम करता है:"
  },
  es: {
    "UNIFIED SYSTEM VIEW": "VISTA DE SISEMA UNIFICADA",
    "PLAN & DATA FOUNDATION": "FUNDAMENTO DE PLANIFICACIÓN Y DATOS",
    "Project Planning": "Planificación de Proyecto",
    "Data Vetting": "Validación de Datos",
    "Dimensional Data Model": "Modelo de Datos Dimensional",
    "DATA ENGINEERING & DFD": "INGENIERÍA DE DATOS Y DFD",
    "FEATURE ENGINEERING FLOW": "FLUJO DE INGENIERÍA DE CARACTERÍSTICAS",
    "AI MODEL & PROMPT DEVELOPMENT LIFECYCLE": "CICLO DE VIDA DE DESARROLLO DE MODELOS IA",
    "Primary Governed VPC Network": "Red VPC Gobernada Principal",
    "Private Application Subnet": "Subred Privada de Aplicación",
    "Core Agent Orchestrator": "Orquestador Principal de Agentes",
    "Key Definitions": "Definiciones Clave",
    "Managed Compute": "Cómputo Administrado",
    "WHY IT WORKS:": "POR QUÉ FUNCIONA:"
  },
  ja: {
    "UNIFIED SYSTEM VIEW": "統合システム構成図",
    "PLAN & DATA FOUNDATION": "計画およびデータ基盤",
    "Project Planning": "プロジェクト計画",
    "Data Vetting": "データ検証",
    "Dimensional Data Model": "次元データモデル",
    "DATA ENGINEERING & DFD": "データエンジニアリングとDFD",
    "FEATURE ENGINEERING FLOW": "特徴量エンジニアリングフロー",
    "AI MODEL & PROMPT DEVELOPMENT LIFECYCLE": "AIモデルおよびプロンプト開発ライフサイクル",
    "Primary Governed VPC Network": "プライマリ制御VPCネットワーク",
    "Private Application Subnet": "プライベートアプリケーションサブネット",
    "Core Agent Orchestrator": "コアエージェントオーケストレーター",
    "Key Definitions": "主要な定義",
    "Managed Compute": "マネージドコンピュート",
    "WHY IT WORKS:": "推奨される理由:"
  },
  fr: {
    "UNIFIED SYSTEM VIEW": "VUE SYSTÈME UNIFIÉE",
    "PLAN & DATA FOUNDATION": "FONDATION DE PLANIFICATION ET DONNÉES",
    "Project Planning": "Planification de Projet",
    "Data Vetting": "Validation des Données",
    "Dimensional Data Model": "Modèle de Données Dimensionnel",
    "DATA ENGINEERING & DFD": "INGÉNIERIE DES DONNÉES & DFD",
    "FEATURE ENGINEERING FLOW": "FLUX D'INGÉNIERIE DES FONCTIONNALITÉS",
    "AI MODEL & PROMPT DEVELOPMENT LIFECYCLE": "CYCLE DE DÉVELOPPEMENT DE MODÈLES IA",
    "Primary Governed VPC Network": "Réseau VPC Gouverné Principal",
    "Private Application Subnet": "Sous-réseau d'Application Privé",
    "Core Agent Orchestrator": "Orchestrateur d'Agent Principal",
    "Key Definitions": "Définitions Clés",
    "Managed Compute": "Calcul Géré",
    "WHY IT WORKS:": "POURQUOI CELA FONCTIONNE:"
  },
  de: {
    "UNIFIED SYSTEM VIEW": "VEREINHEITLICHTE SYSTEMANSICHT",
    "PLAN & DATA FOUNDATION": "PLANUNG & DATENFUNDAMENT",
    "Project Planning": "Projektplanung",
    "Data Vetting": "Datenprüfung",
    "Dimensional Data Model": "Dimensionales Datenmodell",
    "DATA ENGINEERING & DFD": "DATENINGENIEURWESEN & DFD",
    "FEATURE ENGINEERING FLOW": "FEATURE-ENGINEERING-FLUSS",
    "AI MODEL & PROMPT DEVELOPMENT LIFECYCLE": "KI-MODELL- & PROMPT-ENTWICKLUNGSLEBENSZYKLUS",
    "Primary Governed VPC Network": "Primäres Verwaltetes VPC-Netzwerk",
    "Private Application Subnet": "Privates Anwendungs-Subnetz",
    "Core Agent Orchestrator": "Kern-Agenten-Orchester",
    "Key Definitions": "Wichtige Definitionen",
    "Managed Compute": "Verwaltete Rechenleistung",
    "WHY IT WORKS:": "WARUM ES FUNKTIONIERT:"
  },
  pt: {
    "UNIFIED SYSTEM VIEW": "VISÃO UNIFICADA DE SISTEMA",
    "PLAN & DATA FOUNDATION": "FUNDAÇÃO DE PLANEJAMENTO E DADOS",
    "Project Planning": "Planejamento de Projeto",
    "Data Vetting": "Validação de Dados",
    "Dimensional Data Model": "Modelo de Dados Dimensional",
    "DATA ENGINEERING & DFD": "ENGENHARIA DE DADOS E DFD",
    "FEATURE ENGINEERING FLOW": "FLUXO DE ENGENHARIA DE RECURSOS",
    "AI MODEL & PROMPT DEVELOPMENT LIFECYCLE": "CICLO DE VIDA DE DESENVOLVIMENTO DE IA",
    "Primary Governed VPC Network": "Rede VPC Governada Principal",
    "Private Application Subnet": "Sub-rede Privada de Aplicação",
    "Core Agent Orchestrator": "Orquestrador Principal de Agentes",
    "Key Definitions": "Definições Chave",
    "Managed Compute": "Computação Gerenciada",
    "WHY IT WORKS:": "POR QUE FUNCIONA:"
  },
  ar: {
    "UNIFIED SYSTEM VIEW": "عرض النظام الموحد",
    "PLAN & DATA FOUNDATION": "أساس التخطيط والبيانات",
    "Project Planning": "تخطيط المشروع",
    "Data Vetting": "تدقيق البيانات",
    "Dimensional Data Model": "نموذج البيانات البعدي",
    "DATA ENGINEERING & DFD": "هندسة البيانات ومخطط تدفق البيانات",
    "FEATURE ENGINEERING FLOW": "مسار هندسة الميزات",
    "AI MODEL & PROMPT DEVELOPMENT LIFECYCLE": "دورة حياة تطوير نماذج الذكاء الاصطناعي",
    "Primary Governed VPC Network": "شبكة VPC الحاكمة الأساسية",
    "Private Application Subnet": "الشبكة الفرعية التطبيقية الخاصة",
    "Core Agent Orchestrator": "منسق الوكيل الأساسي",
    "Key Definitions": "التعاريف الرئيسية",
    "Managed Compute": "الحوسبة المدارة",
    "WHY IT WORKS:": "لماذا يعمل هذا النظام:"
  },
  zh: {
    "UNIFIED SYSTEM VIEW": "统一系统架构视图",
    "PLAN & DATA FOUNDATION": "规划与数据基础设施",
    "Project Planning": "项目规划",
    "Data Vetting": "数据审核",
    "Dimensional Data Model": "多维数据模型",
    "DATA ENGINEERING & DFD": "数据工程与数据流图",
    "FEATURE ENGINEERING FLOW": "特征工程流程",
    "AI MODEL & PROMPT DEVELOPMENT LIFECYCLE": "AI模型与提示词开发生命周期",
    "Primary Governed VPC Network": "受控主VPC网络",
    "Private Application Subnet": "私有应用子网",
    "Core Agent Orchestrator": "核心智能体编排器",
    "Key Definitions": "核心定义",
    "Managed Compute": "托管计算",
    "WHY IT WORKS:": "核心架构优势:"
  },
  id: {
    "UNIFIED SYSTEM VIEW": "TAMPILAN SISTEM TERPADU",
    "PLAN & DATA FOUNDATION": "PONDASI PERENCANAAN & DATA",
    "Project Planning": "Perencanaan Proyek",
    "Data Vetting": "Verifikasi Data",
    "Dimensional Data Model": "Model Data Dimensional",
    "DATA ENGINEERING & DFD": "REKAYASA DATA & DFD",
    "FEATURE ENGINEERING FLOW": "ALUR REKAYASA FITUR",
    "AI MODEL & PROMPT DEVELOPMENT LIFECYCLE": "SIKLUS HIDUP PENGEMBANGAN MODEL AI",
    "Primary Governed VPC Network": "Jaringan VPC Terkelola Utama",
    "Private Application Subnet": "Subnet Aplikasi Privat",
    "Core Agent Orchestrator": "Orkestrator Agen Utama",
    "Key Definitions": "Definisi Kunci",
    "Managed Compute": "Komputasi Terkelola",
    "WHY IT WORKS:": "MENGAPA INI EFEKTIF:"
  }
};

export function translateDrawioXmlUniversal(xml: string, lang: SupportedLanguage, diagramId?: string, versionId?: string): string {
  if (!xml || lang === 'en') return xml;

  const cacheKey = `${diagramId || 'doc'}_${versionId || 'v1'}_${lang}_${xml.length}`;
  if (diagramTranslationCache[cacheKey]) {
    return diagramTranslationCache[cacheKey];
  }

  const lexicon = ENTERPRISE_LEXICON[lang] || {};
  let translatedXml = xml;

  for (const [englishTerm, localizedTerm] of Object.entries(lexicon)) {
    translatedXml = translatedXml.split(englishTerm).join(localizedTerm);
  }

  diagramTranslationCache[cacheKey] = translatedXml;
  return translatedXml;
}
