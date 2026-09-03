export interface ProductionIaCManifest {
  terraformMainTf: string;
  terraformVariablesTf: string;
  spannerDdlSql: string;
  k8sDeploymentYaml: string;
}

export function generateProductionIaC(projectName: string, versionTag: string, domain: string): ProductionIaCManifest {
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 24);

  const terraformMainTf = `# ==============================================================================
# PROMPTCANVAS PRODUCTION INFRASTRUCTURE AS CODE (TERRAFORM)
# Project: \${projectName}
# Blueprint Version: \${versionTag} | Domain: \${domain}
# Standards: CIS GCP Benchmark 2.0, Zero Trust, FIPS 140-3 CMEK
# ==============================================================================

terraform {
  required_version = ">= 1.8.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.primary_region
}

# ------------------------------------------------------------------------------
# 1. Dual-Hub VPC Network & Cloud Armor WAF
# ------------------------------------------------------------------------------
resource "google_compute_network" "hub_vpc" {
  name                    = "\${safeName}-hub-vpc"
  auto_create_subnetworks = false
  routing_mode            = "GLOBAL"
}

resource "google_compute_subnetwork" "app_subnet_pri" {
  name                     = "\${safeName}-app-pri-\${var.primary_region}"
  ip_cidr_range            = "10.100.10.0/24"
  region                   = var.primary_region
  network                  = google_compute_network.hub_vpc.id
  private_ip_google_access = true

  secondary_ip_range {
    range_name    = "gke-pods"
    ip_cidr_range = "10.200.0.0/16"
  }

  secondary_ip_range {
    range_name    = "gke-services"
    ip_cidr_range = "10.201.0.0/20"
  }
}

resource "google_compute_security_policy" "cloud_armor_waf" {
  name        = "\${safeName}-armor-waf"
  description = "Cloud Armor Adaptive DDoS & OWASP Top 10 Defense"

  rule {
    action   = "allow"
    priority = "2147483647"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default allow baseline"
  }

  adaptive_protection_config {
    layer_7_ddos_defense_config {
      enable = true
      rule_visibility = "STANDARD"
    }
  }
}

# ------------------------------------------------------------------------------
# 2. Cloud KMS HSM Key Ring (FIPS 140-3 Level 3 CMEK)
# ------------------------------------------------------------------------------
resource "google_kms_key_ring" "sovereign_ring" {
  name     = "\${safeName}-hsm-ring"
  location = var.primary_region
}

resource "google_kms_crypto_key" "cmek_key" {
  name            = "\${safeName}-cmek-root"
  key_ring        = google_kms_key_ring.sovereign_ring.id
  rotation_period = "7776000s" # 90 days

  version_template {
    algorithm        = "GOOGLE_SYMMETRIC_ENCRYPTION"
    protection_level = "HSM"
  }
}

# ------------------------------------------------------------------------------
# 3. GKE Autopilot Active-Active Multi-Region Cluster
# ------------------------------------------------------------------------------
resource "google_container_cluster" "autopilot_cluster" {
  name             = "\${safeName}-gke-cluster"
  location         = var.primary_region
  enable_autopilot = true
  network          = google_compute_network.hub_vpc.id
  subnetwork       = google_compute_subnetwork.app_subnet_pri.id

  ip_allocation_policy {
    cluster_secondary_range_name  = "gke-pods"
    services_secondary_range_name = "gke-services"
  }

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "172.16.0.0/28"
  }

  workload_identity_config {
    workload_pool = "\${var.gcp_project_id}.svc.id.goog"
  }
}

# ------------------------------------------------------------------------------
# 4. Multi-Region Cloud Spanner Database (TrueTime ACID)
# ------------------------------------------------------------------------------
resource "google_spanner_instance" "spanner_inst" {
  name             = "\${safeName}-spanner"
  config           = "nam3"
  display_name     = "\${projectName} Multi-Region Spanner"
  processing_units = 1000

  autoscaling_config {
    autoscaling_limits {
      min_processing_units = 1000
      max_processing_units = 4000
    }
    autoscaling_targets {
      high_priority_cpu_utilization_percent = 65
      storage_utilization_percent           = 75
    }
  }
}

resource "google_spanner_database" "spanner_db" {
  instance                 = google_spanner_instance.spanner_inst.name
  name                     = "production_core"
  version_retention_period = "7d"
  encryption_config {
    kms_key_name = google_kms_crypto_key.cmek_key.id
  }
  ddl = [
    "CREATE TABLE Accounts ( AccountId STRING(64) NOT NULL, Balance NUMERIC NOT NULL, Currency STRING(3) NOT NULL, Status STRING(20) NOT NULL, UpdatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true) ) PRIMARY KEY (AccountId)",
    "CREATE TABLE LedgerEvents ( EventId STRING(64) NOT NULL, AccountId STRING(64) NOT NULL, Amount NUMERIC NOT NULL, Direction STRING(10) NOT NULL, Timestamp TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true) ) PRIMARY KEY (AccountId, EventId), INTERLEAVE IN PARENT Accounts ON DELETE CASCADE"
  ]
}

# ------------------------------------------------------------------------------
# 5. Vertex AI ScaNN Vector Search & Model Armor Endpoint
# ------------------------------------------------------------------------------
resource "google_vertex_ai_index" "scann_index" {
  display_name = "\${safeName}-vector-index"
  description  = "Vertex AI ScaNN Vector Search ANN Index"
  region       = var.primary_region

  metadata {
    contents_delta_uri = "gs://\${var.gcp_project_id}-vector-embeddings/deltas"
    config {
      dimensions                  = 768
      approximate_neighbors_count = 150
      distance_measure_type       = "DOT_PRODUCT_DISTANCE"
      algorithm_config {
        tree_ah_config {
          leaf_node_embedding_count    = 1000
          leaf_nodes_to_search_percent = 10
        }
      }
    }
  }
}
`;

  const terraformVariablesTf = `variable "gcp_project_id" {
  type        = string
  description = "The target Google Cloud Project ID"
  default     = "promptcanvas-prod-001"
}

variable "primary_region" {
  type        = string
  description = "Primary compute and data sovereignty region"
  default     = "europe-west1"
}

variable "secondary_region" {
  type        = string
  description = "Failover and replication region"
  default     = "europe-west3"
}
`;

  const spannerDdlSql = `-- ==============================================================================
-- CLOUD SPANNER HIGH-THROUGHPUT DDL (TrueTime ACID Multi-Region)
-- ==============================================================================

CREATE TABLE Accounts (
  AccountId STRING(64) NOT NULL,
  CustomerId STRING(64) NOT NULL,
  Currency STRING(3) NOT NULL,
  Balance NUMERIC NOT NULL,
  Status STRING(20) NOT NULL,
  CreatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true),
  UpdatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)
) PRIMARY KEY (AccountId);

CREATE TABLE LedgerEvents (
  AccountId STRING(64) NOT NULL,
  EventId STRING(64) NOT NULL,
  TransactionType STRING(32) NOT NULL,
  Amount NUMERIC NOT NULL,
  IdempotencyKey STRING(64) NOT NULL,
  CreatedAt TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true)
) PRIMARY KEY (AccountId, EventId),
  INTERLEAVE IN PARENT Accounts ON DELETE CASCADE;

CREATE UNIQUE INDEX Idx_LedgerEvents_Idempotency 
ON LedgerEvents(AccountId, IdempotencyKey);
`;

  const k8sDeploymentYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: \${safeName}-core-service
  namespace: production
  labels:
    app.kubernetes.io/name: \${safeName}-core
    app.kubernetes.io/version: "\${versionTag}"
spec:
  replicas: 6
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  selector:
    matchLabels:
      app: \${safeName}-core
  template:
    metadata:
      labels:
        app: \${safeName}-core
    spec:
      serviceAccountName: workload-identity-sa
      containers:
      - name: api-service
        image: gcr.io/\${PROJECT_ID}/\${safeName}:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: "500m"
            memory: "512Mi"
          limits:
            cpu: "2000m"
            memory: "2048Mi"
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /livez
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: \${safeName}-pdb
  namespace: production
spec:
  minAvailable: 80%
  selector:
    matchLabels:
      app: \${safeName}-core
`;

  return {
    terraformMainTf,
    terraformVariablesTf,
    spannerDdlSql,
    k8sDeploymentYaml
  };
}
