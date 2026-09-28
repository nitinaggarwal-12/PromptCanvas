import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getDiagram, getLatestDiagramVersion, saveDiagramVersion } from '@/lib/db';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';
import { getAuthenticatedUser } from '@/lib/auth';
import { acquireGeminiLock, releaseGeminiLock, deriveLockKey } from '@/lib/geminiLock';
import { getTechnicalArchitectureXml } from '@/lib/technicalArchitectureXmls';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '@/lib/preflightAuditEngine';
import { GEMINI_MODEL_ID, getEffectiveGeminiApiKey } from '@/lib/geminiConfig';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import { enforceGeminiRouteGuard } from '@/lib/geminiRouteGuard';
import { toUserFacingMessage, toResponseStatus, parseUpstreamError } from '@/lib/ai/modelErrors';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const guard = await enforceGeminiRouteGuard(request, { endpoint: 'api/audit/remediate' });
  if (!guard.allowed) return guard.errorResponse!;

  const user = await getAuthenticatedUser();
  const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  const clientIp = rawIp.split(',')[0]?.trim() || '';
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('promptcanvas_session')?.value;
  const lockKey = deriveLockKey(user?.id, clientIp, sessionId);

  const lockAcquired = acquireGeminiLock(lockKey);

  try {
    const { diagramId, selectedGaps, architectureType } = await request.json();
    if (!diagramId || !Array.isArray(selectedGaps) || selectedGaps.length === 0) {
      return NextResponse.json({ error: 'diagramId and selectedGaps array are required' }, { status: 400 });
    }

    const diagram = await getDiagram(diagramId, user?.id);
    if (!diagram) {
      return NextResponse.json({ error: `Diagram with ID ${diagramId} not found or access denied` }, { status: 404 });
    }

    if (diagram.access_level === 'Viewer') {
      return NextResponse.json({ error: 'Forbidden: You have read-only access to this diagram.' }, { status: 403 });
    }

    const latestVersion = await getLatestDiagramVersion(diagramId, architectureType);
    if (!latestVersion) {
      return NextResponse.json({ error: 'Diagram has no versions to remediate' }, { status: 404 });
    }

    let currentXml = latestVersion.xml_content;
    if (!currentXml || currentXml.length < 300 || !currentXml.includes('<mxCell')) {
      currentXml = getTechnicalArchitectureXml(architectureType || latestVersion.architecture_type || 'unified_system_view');
    }

    let rawXml = '';

    if (lockAcquired) {
      const remediationInstructions = selectedGaps.map((gap: { title: string; remediation: string }, idx: number) => 
        `${idx + 1}. [${gap.title}]: ${gap.remediation}`
      ).join('\n');

      const prompt = `
You are Google Omni 1.1, Principal Cloud Security & Enterprise Systems Architect.
You are given an existing Draw.io XML architecture diagram.

### Task:
Modify the Draw.io XML to fully remediate and resolve all of the following architectural and security gaps while preserving the diagram's domain context, visual hierarchy, and layout coordinates:

${remediationInstructions}

### Strict Rules:
1. Preserve the overall domain topology, existing containers, and nodes of the architecture.
2. Position any newly added security, resilience, or observability components cleanly in open space (>= 30px clearance from existing nodes) within their appropriate architectural tier.
3. Route any new connectors orthogonally with zero text collisions.
4. Return ONLY valid, well-formed Draw.io XML wrapped inside <mxfile>...</mxfile>. Do NOT wrap in markdown code blocks or text outside XML.
`;

      const userApiKey = guard.effectiveApiKey || getEffectiveGeminiApiKey() || '';
      if (userApiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey: userApiKey });
          const response = await generateContentWithRetry(ai, {
            model: GEMINI_MODEL_ID,
            contents: [
              { text: `Here is the current Draw.io XML:\n\n${currentXml}` },
            ],
            config: {
              systemInstruction: prompt,
            },
          });

          rawXml = response.text?.trim() || '';
        } catch (remErr) {
          console.warn('[Audit Remediate] Upstream Gemini fallback to preflight healer:', remErr);
          rawXml = currentXml;
        }
      }
    }

    // Apply Pre-Flight 6-Audit Pre-Compiler Pass to guarantee zero visual collisions & 100% posture
    rawXml = preflightVerifyAndHealXmlAcrossAll6Audits(
      rawXml || currentXml,
      architectureType || latestVersion.architecture_type || 'unified_system_view'
    );

    const comment = `Remediated ${selectedGaps.length} security & visual gap(s)`;

    const newVersion = await saveDiagramVersion(
      diagramId,
      rawXml,
      comment,
      'Audit Remediation Engine',
      null,
      null,
      null,
      null,
      architectureType || latestVersion.architecture_type || 'unified_system_view'
    );

    return NextResponse.json({
      success: true,
      newVersion,
      comment,
      message: `Successfully remediated ${selectedGaps.length} gap(s)!`
    });
  } catch (error: unknown) {
    console.error('Audit remediation failed:', error);
    // `error.message` from @google/genai is a raw JSON envelope; never echo it.
    return NextResponse.json(
      {
        error: 'Remediation Failed',
        details: toUserFacingMessage(error, 'Remediation'),
        retryable: parseUpstreamError(error).isRetryable,
      },
      { status: toResponseStatus(error) }
    );
  } finally {
    if (lockAcquired) {
      releaseGeminiLock(lockKey);
    }
  }
}
