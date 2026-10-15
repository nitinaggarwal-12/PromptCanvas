
CREATE OR REPLACE TABLE `nitina-ggarwal-sandbox-647724.cymbal_agentic_finops_otel.tenant_telemetry_spans` (
  span_id STRING,
  recorded_at TIMESTAMP,
  tenant_id STRING,
  tenant_tier STRING,
  isolation_pattern STRING,
  workstream STRING,
  root_agent STRING,
  model_name STRING,
  input_tokens INT64,
  cached_read_tokens INT64,
  thinking_tokens INT64,
  output_tokens INT64,
  cache_hit_ratio FLOAT64,
  net_cogs_reduction_pct FLOAT64,
  net_cost_usd FLOAT64,
  kms_key_uri STRING,
  pii_redacted BOOL
);

INSERT INTO `nitina-ggarwal-sandbox-647724.cymbal_agentic_finops_otel.tenant_telemetry_spans` VALUES
  ('sp-fv-001', CURRENT_TIMESTAMP(), 'finvault', 'ENTERPRISE_SOVEREIGN', 'Pattern B: Sovereign Silo', 'WS3.1', 'finvault_wealth_coordinator', 'gemini-3.1-pro-preview', 185000, 166500, 8192, 2400, 0.90, 84.7, 0.0412, 'projects/nitina-ggarwal-sandbox-647724/locations/us-west1/keyRings/cymbal-multi-tenant-kr/cryptoKeys/finvault-silo-cmek', true),
  ('sp-fv-002', CURRENT_TIMESTAMP(), 'finvault', 'ENTERPRISE_HYBRID', 'Pattern C: Hybrid PSC', 'WS4.1', 'finvault_wealth_coordinator', 'gemini-3.1-pro-preview', 185000, 166500, 8192, 2150, 0.90, 84.7, 0.0398, 'projects/nitina-ggarwal-sandbox-647724/locations/us-west1/keyRings/cymbal-multi-tenant-kr/cryptoKeys/finvault-silo-cmek', true),
  ('sp-rs-001', CURRENT_TIMESTAMP(), 'retailstream', 'COMMERCIAL_STANDARD', 'Pattern A: Pooled Shared Runtime', 'WS2.1', 'retailstream_ops_coordinator', 'gemini-3.8-flash', 185000, 166500, 4096, 1800, 0.90, 84.7, 0.0089, 'projects/nitina-ggarwal-sandbox-647724/locations/us-west1/keyRings/cymbal-multi-tenant-kr/cryptoKeys/retailstream-silo-cmek', true),
  ('sp-rs-002', CURRENT_TIMESTAMP(), 'retailstream', 'COMMERCIAL_STANDARD', 'Pattern A: Pooled Shared Runtime', 'WS2.1', 'retailstream_ops_coordinator', 'gemini-3.8-flash', 185000, 166500, 4096, 1650, 0.90, 84.7, 0.0084, 'projects/nitina-ggarwal-sandbox-647724/locations/us-west1/keyRings/cymbal-multi-tenant-kr/cryptoKeys/retailstream-silo-cmek', true);

CREATE OR REPLACE TABLE `nitina-ggarwal-sandbox-647724.cymbal_agentic_finops_otel.security_breach_audit_log` (
  sim_id STRING,
  executed_at TIMESTAMP,
  attack_vector STRING,
  source_tenant STRING,
  target_tenant STRING,
  enforcing_hop STRING,
  http_status INT64,
  decision_code STRING,
  leaked_rows INT64,
  verdict STRING
);

INSERT INTO `nitina-ggarwal-sandbox-647724.cymbal_agentic_finops_otel.security_breach_audit_log` VALUES
  ('SIM-01', CURRENT_TIMESTAMP(), 'Header Spoofing (X-Tenant-ID: finvault)', 'retailstream', 'finvault', 'Hop 1: Cloud Armor + OBO/DPoP', 403, 'TENANT_HEADER_SPOOF_BLOCKED', 0, 'PASS'),
  ('SIM-02', CURRENT_TIMESTAMP(), 'Prompt-Injected Cross-Tenant Vector RAG', 'retailstream', 'finvault', 'Hop 5: Vector Search 2.0 Namespace Pre-Filter', 200, 'CROSS_TENANT_RAG_PREFILTERED', 0, 'PASS'),
  ('SIM-03', CURRENT_TIMESTAMP(), 'Session Hijacking (Foreign session_id)', 'retailstream', 'finvault', 'Hop 3: VertexAiSessionService Composite Key', 403, 'SESSION_TENANT_MISMATCH', 0, 'PASS'),
  ('SIM-04', CURRENT_TIMESTAMP(), 'Unauthorized Privileged Tool Invocation', 'retailstream', 'finvault', 'Hop 2: ADK before_agent_callback Pruning', 403, 'TOOL_NOT_ENTITLED_FOR_TENANT', 0, 'PASS'),
  ('SIM-05', CURRENT_TIMESTAMP(), 'Cross-Tenant Prefix Cache Read', 'retailstream', 'finvault', 'Hop 3: ContextCacheConfig Prefix Guard', 403, 'CROSS_TENANT_CACHE_ACCESS_DENIED', 0, 'PASS'),
  ('SIM-06', CURRENT_TIMESTAMP(), 'Connection-Pool SET SESSION State Bleed', 'retailstream', 'finvault', 'Hop 5: AlloyDB FORCE RLS + SET LOCAL', 400, 'SESSION_GUC_FORBIDDEN', 0, 'PASS'),
  ('SIM-07', CURRENT_TIMESTAMP(), '3LO OAuth Token Cross-Tenant Replay', 'retailstream', 'finvault', 'Hop 5: IAM Principal Access Boundary + DPoP', 401, '3LO_TOKEN_TENANT_MISMATCH', 0, 'PASS'),
  ('SIM-08', CURRENT_TIMESTAMP(), 'Indirect RAG Prompt Injection Poisoning', 'external_attacker', 'finvault', 'Hop 4: Vertex AI Model Armor + Cloud SDP', 422, 'INDIRECT_PROMPT_INJECTION_QUARANTINED', 0, 'PASS'),
  ('SIM-09', CURRENT_TIMESTAMP(), 'CMEK Key Revocation Kill-Switch Drill', 'medcore', 'medcore', 'Hop 3/5: Cloud KMS CMEK Health Guard', 423, 'TENANT_CMEK_KEY_REVOKED', 0, 'PASS'),
  ('SIM-10', CURRENT_TIMESTAMP(), 'Noisy-Neighbor 500-Req Token Flood', 'retailstream', 'finvault', 'Hop 2: Memorystore Valkey v8.0 Lua Limiter', 429, 'TENANT_TPM_QUOTA_EXCEEDED', 0, 'PASS');

CREATE OR REPLACE TABLE `nitina-ggarwal-sandbox-647724.cymbal_agentic_finops_otel.tenant_promotion_migrations` (
  migration_id STRING,
  tenant_id STRING,
  source_pattern STRING,
  target_pattern STRING,
  phase_1_status STRING,
  phase_2_status STRING,
  phase_3_status STRING,
  dms_replication_lag_ms INT64,
  valkey_cutover_pause_ms INT64,
  migrated_rows INT64,
  dropped_sessions INT64,
  sha256_checksum_verified BOOL,
  completed_at TIMESTAMP
);

INSERT INTO `nitina-ggarwal-sandbox-647724.cymbal_agentic_finops_otel.tenant_promotion_migrations` VALUES
  ('mig-finvault-a-to-c', 'finvault', 'Pattern A (Pooled)', 'Pattern C (Hybrid PSC)', 'SHADOW_SYNC_COMPLETE', 'ATOMIC_CUTOVER_COMPLETE', 'DRAIN_AND_VERIFY_COMPLETE', 18, 142, 48290, 0, true, CURRENT_TIMESTAMP()),
  ('mig-finvault-c-to-b', 'finvault', 'Pattern C (Hybrid PSC)', 'Pattern B (Sovereign Silo)', 'SHADOW_SYNC_COMPLETE', 'ATOMIC_CUTOVER_COMPLETE', 'DRAIN_AND_VERIFY_COMPLETE', 14, 118, 48290, 0, true, CURRENT_TIMESTAMP());
