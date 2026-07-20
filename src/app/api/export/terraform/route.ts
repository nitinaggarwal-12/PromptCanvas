import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { getLatestDiagramVersion } from '@/lib/db';

const ai = new GoogleGenAI({});

const TERRAFORM_GCP_SYSTEM_PROMPT = `
You are an expert Principal Google Cloud Infrastructure Engineer and HashiCorp Terraform Specialist.
Analyze the provided Draw.io XML architecture diagram and convert all GCP components, subnets, databases, compute services, load balancers, and security configurations into valid, production-ready HashiCorp HCL Terraform code for Google Cloud Platform.

Respond strictly in JSON matching the requested schema:

1. \`mainTf\`: Complete HCL code for \`main.tf\` defining all resources (e.g. \`google_compute_network\`, \`google_compute_subnetwork\`, \`google_cloud_run_v2_service\`, \`google_sql_database_instance\`, \`google_storage_bucket\`, \`google_pubsub_topic\`, \`google_compute_security_policy\` for Cloud Armor WAF, \`google_kms_crypto_key\`). Use clear resource names and standard GCP Terraform syntax.
2. \`variablesTf\`: Complete HCL code for \`variables.tf\` declaring \`project_id\` (required), \`region\` (default: "us-central1"), \`zone\` (default: "us-central1-a"), and \`environment\` (default: "prod").
3. \`outputsTf\`: Complete HCL code for \`outputs.tf\` exporting resource endpoints, connection strings, bucket names, and service URLs.
4. \`providerTf\`: Complete HCL code for \`provider.tf\` specifying \`terraform { required_providers { google = { source = "hashicorp/google", version = "~> 5.0" } } }\` and \`provider "google"\`.
5. \`readme\`: Concise markdown guide with deployment prerequisites (\`gcloud auth application-default login\`), \`terraform init\`, \`terraform plan\`, and \`terraform apply\`.

Ensure all generated HCL is valid, executable, and follows Google Cloud Provider best practices.
`;

export async function POST(request: Request) {
  try {
    const { diagramId, xmlContent: customXml } = await request.json();

    let xmlContent = customXml;
    if (!xmlContent && diagramId) {
      const latestVersion = await getLatestDiagramVersion(diagramId);
      if (latestVersion) {
        xmlContent = latestVersion.xml_content;
      }
    }

    if (!xmlContent) {
      return NextResponse.json({ error: 'xmlContent or valid diagramId is required' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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

    const textOutput = response.text || '{}';
    let terraformData: { mainTf?: string; variablesTf?: string; outputsTf?: string; providerTf?: string; readme?: string } = {};

    try {
      terraformData = JSON.parse(textOutput);
    } catch (e) {
      console.error('Failed to parse Terraform JSON output:', e);
      terraformData = {
        providerTf: `terraform {\n  required_version = ">= 1.5.0"\n  required_providers {\n    google = {\n      source  = "hashicorp/google"\n      version = "~> 5.0"\n    }\n  }\n}\n\nprovider "google" {\n  project = var.project_id\n  region  = var.region\n  zone    = var.zone\n}\n`,
        variablesTf: `variable "project_id" {\n  description = "GCP Project ID"\n  type        = string\n}\n\nvariable "region" {\n  description = "GCP Region"\n  type        = string\n  default     = "us-central1"\n}\n\nvariable "zone" {\n  description = "GCP Zone"\n  type        = string\n  default     = "us-central1-a"\n}\n`,
        mainTf: `# Main GCP Architecture Terraform Config\nresource "google_compute_network" "vpc_network" {\n  name                    = "custom-vpc-network"\n  auto_create_subnetworks = false\n}\n\nresource "google_compute_subnetwork" "subnet" {\n  name          = "custom-subnet"\n  ip_cidr_range = "10.0.1.0/24"\n  region        = var.region\n  network       = google_compute_network.vpc_network.id\n}\n`,
        outputsTf: `output "vpc_id" {\n  value       = google_compute_network.vpc_network.id\n  description = "The ID of the VPC network"\n}\n`,
        readme: `# GCP Terraform Deployment Guide\n\n1. Install Terraform & Google Cloud SDK.\n2. Run \`gcloud auth application-default login\`.\n3. Run \`terraform init\`.\n4. Run \`terraform apply -var="project_id=YOUR_GCP_PROJECT_ID"\`.\n`
      };
    }

    return NextResponse.json({
      success: true,
      terraform: terraformData,
    });
  } catch (error: unknown) {
    console.error('Terraform export failed:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Terraform Export Failed', details: errorMessage },
      { status: 500 }
    );
  }
}
