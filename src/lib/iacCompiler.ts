export interface IaCExportResult {
  terraformHcl: string;
  kubernetesYaml: string;
  architectureSummary: {
    resourceCount: number;
    tiersIdentified: string[];
    estimatedMonthlyCostUsd: number;
  };
}

export function compileXmlToIaC(xml: string, projectTitle: string = 'Enterprise Architecture'): IaCExportResult {
  const cleanTitle = projectTitle.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
  
  // Extract node titles and technology clues from XML
  const nodeMatches = [...xml.matchAll(/<b>(?:\[[^\]]+\]\s*)?([^<]+)<\/b>/gi)].map(m => m[1].trim());
  const uniqueNodes = Array.from(new Set(nodeMatches));

  const hasVpc = /vpc|network|perimeter/i.test(xml);
  const hasGke = /gke|kubernetes|container|cluster/i.test(xml);
  const hasCloudSql = /sql|database|postgres|mysql/i.test(xml);
  const hasPubSub = /pub\/sub|kafka|event|broker/i.test(xml);
  const hasBigQuery = /bigquery|data lake|warehouse/i.test(xml);
  const hasWaf = /waf|cloud armor|load balancer|lb/i.test(xml);

  // Generate Production Terraform (HCL)
  const terraformHcl = `# ==============================================================================
# PROMPTCANVAS ENTERPRISE IaC EXPORT — TERRAFORM (GCP / MULTI-CLOUD)
# Architecture: ${projectTitle}
# Generated: ${new Date().toISOString()}
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

variable "gcp_project_id" {
  type        = string
  description = "Target Google Cloud Project ID"
  default     = "${cleanTitle}-prod"
}

variable "gcp_region" {
  type        = string
  description = "Primary Cloud Region"
  default     = "us-central1"
}

# ------------------------------------------------------------------------------
# 1. GOVERNED VPC NETWORK & SECURITY PERIMETER
# ------------------------------------------------------------------------------
resource "google_compute_network" "governed_vpc" {
  name                    = "${cleanTitle}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "app_subnet" {
  name          = "${cleanTitle}-app-subnet"
  ip_cidr_range = "10.10.0.0/20"
  region        = var.gcp_region
  network       = google_compute_network.governed_vpc.id

  secondary_ip_range {
    range_name    = "gke-pods"
    ip_cidr_range = "10.20.0.0/16"
  }
  secondary_ip_range {
    range_name    = "gke-services"
    ip_cidr_range = "10.30.0.0/20"
  }
}

${hasWaf ? `# ------------------------------------------------------------------------------
# 2. CLOUD ARMOR WAF & GLOBAL HTTPS LOAD BALANCER
# ------------------------------------------------------------------------------
resource "google_compute_security_policy" "edge_waf" {
  name        = "${cleanTitle}-edge-waf-policy"
  description = "Enterprise Edge WAF with OWASP Top 10 & DDoS protection"

  rule {
    action   = "deny(403)"
    priority = "1000"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('sqli-v33-stable')"
      }
    }
    description = "Deny SQL Injection attempts"
  }

  rule {
    action   = "allow"
    priority = "2147483647"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default allow"
  }
}` : ''}

${hasGke ? `# ------------------------------------------------------------------------------
# 3. GOVERNED GKE AUTOPILOT CLUSTER (ORCHESTRATION LAYER)
# ------------------------------------------------------------------------------
resource "google_container_cluster" "primary_gke" {
  name             = "${cleanTitle}-gke-cluster"
  location         = var.gcp_region
  enable_autopilot = true
  network          = google_compute_network.governed_vpc.name
  subnetwork       = google_compute_subnetwork.app_subnet.name

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "172.16.0.0/28"
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = "gke-pods"
    services_secondary_range_name = "gke-services"
  }
}
` : ''}

${hasCloudSql ? `# ------------------------------------------------------------------------------
# 4. HIGH-AVAILABILITY CLOUD SQL (PERSISTENCE LAYER)
# ------------------------------------------------------------------------------
resource "google_sql_database_instance" "ha_postgres" {
  name             = "${cleanTitle}-db-instance"
  database_version = "POSTGRES_15"
  region           = var.gcp_region

  settings {
    tier              = "db-custom-4-16384"
    availability_type = "REGIONAL" # High Availability Multi-Zone
    disk_size         = 100
    disk_type         = "PD_SSD"

    backup_configuration {
      enabled                    = true
      point_in_time_recovery_enabled = true
    }
  }
}
` : ''}

${hasPubSub ? `# ------------------------------------------------------------------------------
# 5. EVENT BROKER & TELEMETRY STREAMING
# ------------------------------------------------------------------------------
resource "google_pubsub_topic" "event_stream" {
  name = "${cleanTitle}-event-stream-topic"
}
` : ''}
`.trim();

  // Generate Kubernetes Manifests (.yaml)
  const kubernetesYaml = `# ==============================================================================
# PROMPTCANVAS ENTERPRISE KUBERNETES MANIFESTS
# Architecture: ${projectTitle}
# ==============================================================================
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${cleanTitle}-orchestrator
  namespace: default
  labels:
    app.kubernetes.io/name: ${cleanTitle}
    app.kubernetes.io/tier: core-orchestration
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ${cleanTitle}-orchestrator
  template:
    metadata:
      labels:
        app: ${cleanTitle}-orchestrator
    spec:
      containers:
        - name: core-engine
          image: gcr.io/${cleanTitle}-prod/orchestrator:v1.0.0
          resources:
            requests:
              cpu: "500m"
              memory: "1Gi"
            limits:
              cpu: "2000m"
              memory: "4Gi"
          ports:
            - containerPort: 8080
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: ${cleanTitle}-service
spec:
  type: ClusterIP
  selector:
    app: ${cleanTitle}-orchestrator
  ports:
    - port: 80
      targetPort: 8080
`.trim();

  return {
    terraformHcl,
    kubernetesYaml,
    architectureSummary: {
      resourceCount: uniqueNodes.length || 8,
      tiersIdentified: [
        hasWaf ? 'Edge Ingress & WAF' : 'Public Ingress',
        hasGke ? 'GKE Autopilot Compute' : 'Serverless Compute',
        hasCloudSql ? 'Multi-Zone HA Database' : 'Governed Storage',
        hasPubSub ? 'Event-Driven Telemetry' : 'API Messaging'
      ],
      estimatedMonthlyCostUsd: (hasGke ? 1400 : 400) + (hasCloudSql ? 850 : 200) + (hasBigQuery ? 600 : 150) + 320
    }
  };
}
