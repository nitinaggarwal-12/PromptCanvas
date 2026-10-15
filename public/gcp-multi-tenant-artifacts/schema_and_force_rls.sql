-- Multi-Tenant Agentic AI Pattern A: AlloyDB ENABLE + FORCE ROW LEVEL SECURITY DDL
CREATE TABLE IF NOT EXISTS tenant_domain_entities (
    entity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL,
    entity_type VARCHAR(32) NOT NULL,
    title VARCHAR(256) NOT NULL,
    payload_json JSONB NOT NULL,
    embedding vector(768) NOT NULL,
    kms_row_signature TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

ALTER TABLE tenant_domain_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_domain_entities FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_strict_isolation_policy ON tenant_domain_entities
    AS RESTRICTIVE
    FOR ALL
    USING (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), ''), '__DENY_ALL__'))
    WITH CHECK (tenant_id = COALESCE(NULLIF(current_setting('app.current_tenant_id', true), ''), '__DENY_ALL__'));
