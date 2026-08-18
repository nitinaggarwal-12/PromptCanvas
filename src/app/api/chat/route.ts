import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { GEMINI_MODEL_ID } from '@/lib/geminiConfig';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import { parseXmlNodesAndEdges } from '@/lib/graph/xmlNodesParser';

export interface ChatSuggestion {
  label: string;
  actionPrompt: string;
  type: 'add' | 'modify' | 'security' | 'cost' | 'observability';
}

export interface ChatResponseBody {
  answer: string;
  summary: string;
  suggestions: ChatSuggestion[];
  identifiedGaps: string[];
  latencyMs: number;
}

function generateDeterministicAdvisory(
  prompt: string,
  diagramName: string,
  architectureType: string,
  parsedNodes: Array<{ id: string; label: string; isEdge: boolean }>
): { answer: string; summary: string; suggestions: ChatSuggestion[]; identifiedGaps: string[] } {
  const nodeLabels = parsedNodes.filter(n => !n.isEdge).map(n => n.label.toLowerCase());
  const allLabelsCombined = nodeLabels.join(' ');

  const hasWaf = allLabelsCombined.includes('armor') || allLabelsCombined.includes('waf') || allLabelsCombined.includes('firewall');
  const hasCache = allLabelsCombined.includes('redis') || allLabelsCombined.includes('memorystore') || allLabelsCombined.includes('cache') || allLabelsCombined.includes('cdn');
  const hasTelemetry = allLabelsCombined.includes('logging') || allLabelsCombined.includes('monitoring') || allLabelsCombined.includes('trace') || allLabelsCombined.includes('telemetry') || allLabelsCombined.includes('prometheus');
  const hasSecrets = allLabelsCombined.includes('secret') || allLabelsCombined.includes('kms') || allLabelsCombined.includes('vault') || allLabelsCombined.includes('key');
  const hasDlq = allLabelsCombined.includes('dlq') || allLabelsCombined.includes('dead letter') || allLabelsCombined.includes('dead-letter');
  const hasDatabase = allLabelsCombined.includes('sql') || allLabelsCombined.includes('spanner') || allLabelsCombined.includes('bigtable') || allLabelsCombined.includes('postgres') || allLabelsCombined.includes('database');
  const hasMessaging = allLabelsCombined.includes('pub/sub') || allLabelsCombined.includes('pubsub') || allLabelsCombined.includes('kafka') || allLabelsCombined.includes('queue');

  const gaps: string[] = [];
  const suggestions: ChatSuggestion[] = [];

  if (!hasWaf) {
    gaps.push('Edge Security & DDoS Mitigation: Cloud Armor WAF is missing at the public ingress boundary.');
    suggestions.push({
      label: 'Add Cloud Armor WAF',
      actionPrompt: 'Add Google Cloud Armor WAF in front of the Load Balancer for DDoS protection and OWASP Top 10 mitigation',
      type: 'security'
    });
  }

  if (!hasCache && hasDatabase) {
    gaps.push('Caching & Latency Layer: No distributed in-memory cache (Cloud Memorystore / Redis) to shield downstream databases from high read throughput.');
    suggestions.push({
      label: 'Add Memorystore Redis Cache',
      actionPrompt: 'Add a Cloud Memorystore Redis cache cluster between application services and the primary database to reduce query latency and database load',
      type: 'add'
    });
  }

  if (!hasTelemetry) {
    gaps.push('Observability & Distributed Tracing: Cloud Monitoring, Logging, and Cloud Trace are absent for golden signals (Latency, Traffic, Errors, Saturation).');
    suggestions.push({
      label: 'Add Cloud Observability Suite',
      actionPrompt: 'Add Google Cloud Monitoring, Cloud Logging, and Cloud Trace for centralized telemetry and distributed tracing',
      type: 'observability'
    });
  }

  if (!hasSecrets) {
    gaps.push('Secrets & Key Management: Dedicated Secret Manager / Cloud KMS CMEK is missing for encrypted credential storage.');
    suggestions.push({
      label: 'Add Secret Manager & Cloud KMS',
      actionPrompt: 'Add Google Cloud Secret Manager and Cloud KMS for zero-trust secret rotation and Customer-Managed Encryption Keys (CMEK)',
      type: 'security'
    });
  }

  if (hasMessaging && !hasDlq) {
    gaps.push('Resilience & Poison Message Handling: Dead-Letter Queue (DLQ) is missing for asynchronous message ingestion pipelines.');
    suggestions.push({
      label: 'Add Pub/Sub Dead-Letter Queue',
      actionPrompt: 'Add a Dead-Letter Queue (DLQ) with Cloud Storage archival for failed or unparseable ingestion messages',
      type: 'modify'
    });
  }

  const cleanPrompt = prompt.toLowerCase();
  let answer = '';

  if (cleanPrompt.includes('missing') || cleanPrompt.includes('gap') || cleanPrompt.includes('review') || cleanPrompt.includes('audit')) {
    answer = `### 🏛️ Principal Architecture Advisory: Gap & Readiness Analysis

**Target System:** \`${diagramName || 'Enterprise Architecture'}\` (${architectureType || 'Cloud Solution'})  
**Active Components Detected:** ${parsedNodes.filter(n => !n.isEdge).length} services, ${parsedNodes.filter(n => n.isEdge).length} network connections.

---

#### 🔍 Identified Architectural Gaps & Recommendations

${gaps.map((gap, i) => `${i + 1}. **${gap.split(':')[0]}:**\n   ${gap.split(':')[1] || gap}`).join('\n\n')}

---

#### 🛡️ Well-Architected Framework Assessment
- **Security & Zero Trust:** ${hasWaf && hasSecrets ? '✅ Strong security posture.' : '⚠️ Needs WAF edge protection and centralized secret rotation.'}
- **Performance & Scalability:** ${hasCache ? '✅ In-memory caching active.' : '⚠️ Consider adding a low-latency cache tier (Redis/Memorystore).'}
- **Operational Excellence:** ${hasTelemetry ? '✅ Telemetry integrated.' : '⚠️ Implement full-stack observability with Cloud Trace & Monitoring.'}
- **Fault Tolerance & Reliability:** ${hasDlq || !hasMessaging ? '✅ Safe asynchronous handling.' : '⚠️ Ensure asynchronous pipelines have unprocessable message DLQ handling.'}

---

💡 *Click any of the suggested action chips below to instantly apply these recommendations to your canvas diagram!*`;
  } else {
    answer = `### 💬 Architecture Overview & Technical Advisory

**Target System:** \`${diagramName || 'Enterprise Architecture'}\` (${architectureType || 'Cloud Solution'})

#### 📊 Current Topology Breakdown
The architecture currently models **${parsedNodes.filter(n => !n.isEdge).length} functional components** interconnected across **${parsedNodes.filter(n => n.isEdge).length} data channels**:

${parsedNodes.filter(n => !n.isEdge).slice(0, 8).map(n => `- **${n.label}** (\`${n.id}\`)`).join('\n')}

#### 💡 Architectural Guidance
- Your prompt inquiry: *"${prompt}"*
- **Enterprise Best Practice:** Ensure end-to-end encryption in transit (mTLS / TLS 1.3), enforce principle of least privilege IAM roles, and configure automatic multi-zone failover across regional availability zones.

---
💡 *Review the recommended actions below to enrich your architecture canvas.*`;
  }

  return {
    answer,
    summary: gaps.length > 0 
      ? `Identified ${gaps.length} enterprise architecture improvement areas including ${gaps.slice(0, 2).map(g => g.split(':')[0]).join(', ')}.`
      : `Architecture reviewed. Evaluated ${parsedNodes.filter(n => !n.isEdge).length} components against cloud best practices.`,
    suggestions,
    identifiedGaps: gaps
  };
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await request.json();
    const {
      prompt,
      diagramName = 'Architecture Diagram',
      architectureType = 'Enterprise Cloud Architecture',
      xmlContent = '',
      businessUsecase = '',
      technicalUsecase = '',
      conversationHistory = []
    } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const parsedNodes = xmlContent ? parseXmlNodesAndEdges(xmlContent) : [];
    const componentsList = parsedNodes
      .filter(n => !n.isEdge)
      .map(n => `- ID: ${n.id} | Label: ${n.label}`)
      .join('\n');
    const connectionsList = parsedNodes
      .filter(n => n.isEdge)
      .map(n => `- From: ${n.source || 'Unknown'} -> To: ${n.target || 'Unknown'} (Label: ${n.label || 'Connection'})`)
      .join('\n');

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback deterministic response if no API key
    if (!apiKey) {
      console.warn('[API/Chat] No GEMINI_API_KEY detected, using deterministic architecture analysis.');
      const fallback = generateDeterministicAdvisory(prompt, diagramName, architectureType, parsedNodes);
      return NextResponse.json({
        ...fallback,
        latencyMs: Date.now() - startTime
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are a Principal Cloud Solutions Architect, Enterprise Systems Reviewer, and Google Cloud Fellow.
You are embedded directly inside an interactive architecture design studio called PromptCanvas.
The user is viewing their active architecture diagram and asking a conversational, advisory, or analytical question.

### CURRENT ARCHITECTURE CONTEXT:
- Diagram Name: ${diagramName}
- Architecture Paradigm: ${architectureType}
- Business Use Case: ${businessUsecase || 'Enterprise Cloud Application'}
- Technical Use Case: ${technicalUsecase || 'High Availability Scalable Cloud Pipeline'}

### ACTIVE DIAGRAM COMPONENTS (${parsedNodes.filter(n => !n.isEdge).length} nodes):
${componentsList || 'No components found in current canvas.'}

### ACTIVE NETWORK CONNECTIONS (${parsedNodes.filter(n => n.isEdge).length} edges):
${connectionsList || 'No connections found.'}

### INSTRUCTIONS:
1. Answer the user's question directly, comprehensively, and with technical rigor.
2. If the user asks "what missing in this architecture", "what are the gaps", or asks for a review/audit:
   - Perform a thorough evaluation across the 5 Pillars of Well-Architected Framework:
     * Security & Zero Trust (WAF, IAM, CMEK/KMS, Secrets, Private Service Connect)
     * Reliability & Resilience (DLQ, multi-zone/region failover, caching, circuit breakers)
     * Observability & Operations (Cloud Monitoring, Logging, Trace, SLO alerts)
     * Performance & Scalability (CDN, autoscaling, caching, connection pooling)
     * Cost & Governance (Tiered storage, lifecycle policies, committed use)
   - Specifically call out which services should be added or modified.
3. If the user asks an explanatory question (e.g. "how does data flow", "why Pub/Sub instead of Kafka"):
   - Walk through the exact components present in the diagram, explaining step-by-step how requests or data packets move.
4. Format your markdown answer beautifully with clear headers (###, ####), bullet points, bold key terms, and code/component badges (\`Cloud Run\`, \`Cloud Spanner\`).
5. Provide 2-5 actionable suggestions as short suggestion chips with ready-to-execute prompt strings.

### RESPONSE FORMAT:
Return JSON adhering strictly to:
{
  "answer": "Comprehensive markdown response with technical depth and clear formatting",
  "summary": "1-2 sentence executive summary of the advice",
  "suggestions": [
    {
      "label": "Short button label, e.g. 'Add Cloud Armor WAF'",
      "actionPrompt": "Precise imperative instruction to execute on the diagram, e.g. 'Add Google Cloud Armor WAF in front of the Global External Load Balancer'",
      "type": "add" | "modify" | "security" | "cost" | "observability"
    }
  ],
  "identifiedGaps": ["List of critical gaps identified, if any"]
}`;

    const contents = [
      {
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\nUSER QUESTION: "${prompt}"` }]
      }
    ];

    const response = await generateContentWithRetry(ai, {
      model: GEMINI_MODEL_ID,
      contents,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING },
            summary: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  actionPrompt: { type: Type.STRING },
                  type: { type: Type.STRING }
                },
                required: ['label', 'actionPrompt', 'type']
              }
            },
            identifiedGaps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['answer', 'summary', 'suggestions']
        }
      }
    });

    const rawText = response.text || '';
    if (!rawText.trim()) {
      const fallback = generateDeterministicAdvisory(prompt, diagramName, architectureType, parsedNodes);
      return NextResponse.json({
        ...fallback,
        latencyMs: Date.now() - startTime
      });
    }

    const cleanedText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json({
      answer: parsedData.answer || 'Analysis complete.',
      summary: parsedData.summary || 'Architecture advisory generated.',
      suggestions: parsedData.suggestions || [],
      identifiedGaps: parsedData.identifiedGaps || [],
      latencyMs: Date.now() - startTime
    });
  } catch (error: any) {
    console.error('[API/Chat] Error executing architecture advisory:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process architecture advisory request' },
      { status: 500 }
    );
  }
}
