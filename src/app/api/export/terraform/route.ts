import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { getLatestDiagramVersion } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { acquireGeminiLock, releaseGeminiLock, deriveLockKey } from '@/lib/geminiLock';
import { cookies } from 'next/headers';

import { GEMINI_MODEL_ID, getEffectiveGeminiApiKey } from '@/lib/geminiConfig';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import { enforceGeminiRouteGuard } from '@/lib/geminiRouteGuard';
import { toUserFacingMessage, toResponseStatus, parseUpstreamError } from '@/lib/ai/modelErrors';
import { generateTerraformBundle, TERRAFORM_PINS } from '@/lib/iac/terraformEngine';

const TERRAFORM_GCP_SYSTEM_PROMPT = `
You are an expert Principal Google Cloud Infrastructure Engineer and HashiCorp Terraform Specialist.
Analyze the provided Draw.io XML architecture diagram and convert all GCP components, subnets, databases, compute services, load balancers, and security configurations into valid, production-ready HashiCorp HCL Terraform code for Google Cloud Platform.

Respond strictly in JSON matching the requested schema:

1. \`mainTf\`: Complete HCL code for \`main.tf\` defining all resources (e.g. \`google_compute_network\`, \`google_compute_subnetwork\`, \`google_cloud_run_v2_service\`, \`google_sql_database_instance\`, \`google_storage_bucket\`, \`google_pubsub_topic\`, \`google_compute_security_policy\` for Cloud Armor WAF, \`google_kms_crypto_key\`). Use clear resource names and standard GCP Terraform syntax.
2. \`variablesTf\`: Complete HCL code for \`variables.tf\` declaring \`project_id\` (required), \`region\` (default: "us-central1"), \`zone\` (default: "us-central1-a"), and \`environment\` (default: "prod").
3. \`outputsTf\`: Complete HCL code for \`outputs.tf\` exporting resource endpoints, connection strings, bucket names, and service URLs.
4. \`providerTf\`: Complete HCL code for \`provider.tf\` specifying \`terraform { required_version = "${TERRAFORM_PINS.requiredVersion}" required_providers { google = { source = "hashicorp/google", version = "${TERRAFORM_PINS.google}" } } }\` and \`provider "google"\`.
5. \`readme\`: Concise markdown guide with deployment prerequisites (\`gcloud auth application-default login\`), \`terraform init\`, \`terraform plan\`, and \`terraform apply\`.

Ensure all generated HCL is valid, executable, and follows Google Cloud Provider best practices.
`;

export async function POST(request: Request) {
  const guard = await enforceGeminiRouteGuard(request, { endpoint: 'api/export/terraform' });
  if (!guard.allowed) return guard.errorResponse!;

  const user = await getAuthenticatedUser();
  const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  const clientIp = rawIp.split(',')[0]?.trim() || '';
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('promptcanvas_session')?.value;
  const lockKey = deriveLockKey(user?.id, clientIp, sessionId);

  if (!acquireGeminiLock(lockKey)) {
    return NextResponse.json(
      { error: 'An AI request is already in progress. Please wait for it to complete before initiating another.' },
      { status: 429 }
    );
  }

  try {
    const userApiKey = guard.effectiveApiKey || getEffectiveGeminiApiKey() || '';
    const { diagramId, xmlContent: customXml, architectureType } = await request.json();

    let xmlContent = customXml;
    if (!xmlContent && diagramId) {
      const latestVersion = await getLatestDiagramVersion(diagramId, architectureType);
      if (latestVersion) {
        xmlContent = latestVersion.xml_content;
      }
    }

    if (!xmlContent) {
      return NextResponse.json({ error: 'xmlContent or valid diagramId is required' }, { status: 400 });
    }

    let textOutput = '';
    if (userApiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: userApiKey });
        const response = await generateContentWithRetry(ai, {
          model: GEMINI_MODEL_ID,
          contents: [
            { text: `Here is the Draw.io XML of the GCP architecture to convert to Terraform HCL:\n\n\`\`\`xml\n${xmlContent}\n\`\`\`` },
          ],
          config: {
            systemInstruction: TERRAFORM_GCP_SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                mainTf: { type: Type.STRING },
                variablesTf: { type: Type.STRING },
                outputsTf: { type: Type.STRING },
                providerTf: { type: Type.STRING },
                readme: { type: Type.STRING },
              },
              required: ['mainTf', 'variablesTf', 'outputsTf', 'providerTf', 'readme'],
            },
          },
        });
        textOutput = response.text || '';
      } catch (tfErr) {
        console.warn('[Terraform Export] Upstream Gemini fallback to deterministic HCL:', tfErr);
      }
    }

    let terraformData: { mainTf?: string; variablesTf?: string; outputsTf?: string; providerTf?: string; readme?: string } = {};
    let groundingSource: 'gemini' | 'deterministic-canvas-xml' | 'deterministic-baseline' = 'gemini';

    try {
      if (!textOutput) throw new Error('Empty upstream Terraform response');
      terraformData = JSON.parse(textOutput);
    } catch (e) {
      // Deterministic fallback: ground the HCL on the actual canvas XML instead of
      // the previous fixed two-resource stub that ignored the diagram entirely.
      const bundle = generateTerraformBundle('promptcanvas-export', '', 'enterprise', 'gcp', xmlContent);
      groundingSource = bundle.groundingSource === 'canvas-xml' ? 'deterministic-canvas-xml' : 'deterministic-baseline';
      terraformData = {
        providerTf: bundle.providerTf,
        variablesTf: bundle.variablesTf,
        mainTf: bundle.mainTf,
        outputsTf: bundle.outputsTf,
        readme: `# Terraform Deployment Guide\n\nGenerated offline from the canvas (${bundle.mappedNodeCount}/${bundle.canvasNodeCount} nodes mapped${bundle.unmappedNodeLabels.length ? `; unmapped: ${bundle.unmappedNodeLabels.slice(0, 8).join(', ')}` : ''}).\n\n1. Install Terraform ${TERRAFORM_PINS.requiredVersion} & Google Cloud SDK.\n2. Run \`gcloud auth application-default login\`.\n3. Run \`terraform init\`.\n4. Run \`terraform validate\` and \`terraform plan -var="project_id=YOUR_GCP_PROJECT_ID"\`.\n5. Review the plan, then \`terraform apply\`.\n`
      };
    }

    return NextResponse.json({
      success: true,
      groundingSource,
      terraform: terraformData,
    });
  } catch (error: unknown) {
    console.error('Terraform export failed:', error);
    // `error.message` from @google/genai is a raw JSON envelope; never echo it.
    return NextResponse.json(
      {
        error: 'Terraform Export Failed',
        details: toUserFacingMessage(error, 'Terraform export'),
        retryable: parseUpstreamError(error).isRetryable,
      },
      { status: toResponseStatus(error) }
    );
  } finally {
    releaseGeminiLock(lockKey);
  }
}
