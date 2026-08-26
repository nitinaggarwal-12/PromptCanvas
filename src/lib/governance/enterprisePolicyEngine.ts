/**
 * PromptCanvas Enterprise Policy & Governance Engine
 * Encapsulates tier gating, rate-limiting quotas, multi-tenant RBAC, IDOR access controls,
 * telemetry event schema validation, idempotency retry logic, and GDPR privacy workflows.
 */

export type UserTier = 'free' | 'pro' | 'enterprise';

export type EnterpriseFeature =
  | 'canvas_basic'
  | 'canonical_all_50'
  | 'docgen_basic'
  | 'docgen_multi_blueprint_pack'
  | 'export_docx'
  | 'export_pptx_slides'
  | 'export_terraform_iac'
  | 'arb_gxp_compliance_matrix'
  | 'api_high_concurrency'
  | 'custom_domain_flavoring'
  | 'team_workspaces'
  | 'audit_remediation_auto_heal';

export interface TierConfig {
  name: string;
  maxDiagrams: number;
  maxSnapshotsPerDiagram: number;
  maxRequestsPerMinute: number;
  maxTokensPerRequest: number;
  allowedFeatures: EnterpriseFeature[];
}

export const USER_TIER_CONFIGS: Record<UserTier, TierConfig> = {
  free: {
    name: 'Free Explorer',
    maxDiagrams: 10,
    maxSnapshotsPerDiagram: 5,
    maxRequestsPerMinute: 20,
    maxTokensPerRequest: 4096,
    allowedFeatures: [
      'canvas_basic',
      'canonical_all_50',
      'docgen_basic',
      'export_docx',
      'custom_domain_flavoring',
    ],
  },
  pro: {
    name: 'Professional Architect',
    maxDiagrams: 100,
    maxSnapshotsPerDiagram: 50,
    maxRequestsPerMinute: 120,
    maxTokensPerRequest: 16384,
    allowedFeatures: [
      'canvas_basic',
      'canonical_all_50',
      'docgen_basic',
      'docgen_multi_blueprint_pack',
      'export_docx',
      'export_pptx_slides',
      'custom_domain_flavoring',
      'team_workspaces',
      'audit_remediation_auto_heal',
    ],
  },
  enterprise: {
    name: 'Enterprise Organization',
    maxDiagrams: 10000,
    maxSnapshotsPerDiagram: 500,
    maxRequestsPerMinute: 600,
    maxTokensPerRequest: 32768,
    allowedFeatures: [
      'canvas_basic',
      'canonical_all_50',
      'docgen_basic',
      'docgen_multi_blueprint_pack',
      'export_docx',
      'export_pptx_slides',
      'export_terraform_iac',
      'arb_gxp_compliance_matrix',
      'api_high_concurrency',
      'custom_domain_flavoring',
      'team_workspaces',
      'audit_remediation_auto_heal',
    ],
  },
};

/**
 * 1. Tier Entitlement & Feature Gate Checker
 */
export function checkFeatureEntitlement(tier: UserTier, feature: EnterpriseFeature): {
  allowed: boolean;
  requiredTier?: UserTier;
  reason?: string;
} {
  const config = USER_TIER_CONFIGS[tier] || USER_TIER_CONFIGS.free;
  const isAllowed = config.allowedFeatures.includes(feature);

  if (isAllowed) {
    return { allowed: true };
  }

  // Find minimum tier required
  const requiredTier: UserTier = USER_TIER_CONFIGS.pro.allowedFeatures.includes(feature)
    ? 'pro'
    : 'enterprise';

  return {
    allowed: false,
    requiredTier,
    reason: `Feature '${feature}' requires an active ${USER_TIER_CONFIGS[requiredTier].name} subscription. Current tier is ${config.name}.`,
  };
}

/**
 * 2. Rate Limiting & Quota Enforcement
 */
interface RateLimitBucket {
  count: number;
  windowStartMs: number;
}

const memoryRateLimitStore = new Map<string, RateLimitBucket>();

export function checkRateLimit(
  identifier: string,
  tier: UserTier = 'free',
  nowMs: number = Date.now()
): {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
} {
  const config = USER_TIER_CONFIGS[tier] || USER_TIER_CONFIGS.free;
  const windowSizeMs = 60 * 1000; // 1 minute window
  const limit = config.maxRequestsPerMinute;

  let bucket = memoryRateLimitStore.get(identifier);
  if (!bucket || nowMs - bucket.windowStartMs > windowSizeMs) {
    bucket = { count: 1, windowStartMs: nowMs };
    memoryRateLimitStore.set(identifier, bucket);
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetSeconds: Math.ceil(windowSizeMs / 1000),
    };
  }

  bucket.count++;
  const remaining = Math.max(0, limit - bucket.count);
  const resetSeconds = Math.ceil((bucket.windowStartMs + windowSizeMs - nowMs) / 1000);

  if (bucket.count > limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetSeconds,
    };
  }

  return {
    allowed: true,
    limit,
    remaining,
    resetSeconds,
  };
}

/**
 * 3. Multi-Tenant RBAC & IDOR Access Controller
 */
export type WorkspaceRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface AccessCheckContext {
  userId: string;
  isSuperAdmin?: boolean;
  resourceOwnerId?: string;
  workspaceMembers?: Array<{ userId: string; role: WorkspaceRole }>;
}

export function verifyResourceAccess(
  action: 'read' | 'write' | 'delete' | 'admin',
  ctx: AccessCheckContext
): { authorized: boolean; reason?: string } {
  // Super-admins bypass all tenant isolation guards
  if (ctx.isSuperAdmin) {
    return { authorized: true };
  }

  // Direct Resource Owner has full access
  if (ctx.resourceOwnerId && ctx.resourceOwnerId === ctx.userId) {
    return { authorized: true };
  }

  // Check Workspace Membership
  if (ctx.workspaceMembers) {
    const member = ctx.workspaceMembers.find((m) => m.userId === ctx.userId);
    if (member) {
      if (action === 'read') return { authorized: true };
      if (action === 'write' && ['owner', 'admin', 'editor'].includes(member.role)) return { authorized: true };
      if (action === 'delete' && ['owner', 'admin'].includes(member.role)) return { authorized: true };
      if (action === 'admin' && ['owner', 'admin'].includes(member.role)) return { authorized: true };
    }
  }

  return {
    authorized: false,
    reason: `IDOR Protection: User '${ctx.userId}' is not authorized to execute '${action}' on this tenant resource.`,
  };
}

/**
 * 4. Telemetry Event Schema Validator
 */
export interface TelemetryEventPayload {
  eventType: string;
  userId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export function validateTelemetryEventSchema(payload: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Payload must be a non-null object'] };
  }

  if (!payload.eventType || typeof payload.eventType !== 'string' || payload.eventType.trim().length === 0) {
    errors.push('Field `eventType` is required and must be a non-empty string.');
  }

  if (!payload.timestamp || typeof payload.timestamp !== 'string') {
    errors.push('Field `timestamp` is required and must be an ISO string.');
  } else {
    const parsedDate = Date.parse(payload.timestamp);
    if (isNaN(parsedDate)) {
      errors.push('Field `timestamp` must be a valid parseable ISO-8601 date.');
    }
  }

  if (payload.userId && typeof payload.userId !== 'string') {
    errors.push('Field `userId` if present must be a string.');
  }

  if (payload.metadata && (typeof payload.metadata !== 'object' || Array.isArray(payload.metadata))) {
    errors.push('Field `metadata` if present must be a key-value record object.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 5. GDPR Data Export & Right-to-be-Forgotten Compliance Engine
 */
export interface UserDataExportBundle {
  exportDate: string;
  schemaVersion: string;
  user: {
    id: string;
    email: string;
    name?: string | null;
    createdAt: string;
  };
  diagrams: Array<{
    id: string;
    name: string;
    architectureType?: string | null;
    createdAt: string;
    versionCount: number;
  }>;
  auditLogsCount: number;
}

export function generateUserDataExportManifest(
  user: { id: string; email: string; name?: string | null; created_at: string },
  diagrams: Array<{ id: string; name: string; architecture_type?: string | null; created_at: string; versions?: any[] }>,
  auditLogsCount: number = 0
): UserDataExportBundle {
  return {
    exportDate: new Date().toISOString(),
    schemaVersion: '1.0.0-gdpr-compliant',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
    },
    diagrams: diagrams.map((d) => ({
      id: d.id,
      name: d.name,
      architectureType: d.architecture_type,
      createdAt: d.created_at,
      versionCount: d.versions?.length || 1,
    })),
    auditLogsCount,
  };
}

/**
 * 6. Idempotency Key Generator & Exponential Retry Backoff Calculator
 */
export function computeIdempotencyKey(userId: string, actionName: string, resourceId?: string): string {
  const normalized = `${userId}:${actionName}:${resourceId || 'singleton'}`;
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `idmp_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`;
}

export function calculateExponentialBackoff(
  attempt: number,
  baseDelayMs: number = 200,
  maxDelayMs: number = 5000,
  jitter: boolean = true
): number {
  const expDelay = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, attempt));
  if (!jitter) return expDelay;
  const randomFactor = 0.8 + Math.random() * 0.4; // 80% to 120% jitter
  return Math.floor(expDelay * randomFactor);
}

/**
 * 7. AI Token & Cost Budget Calculator
 */
export function estimatePromptTokens(text: string): number {
  if (!text) return 0;
  // Standard approximation: ~4 characters per token
  return Math.ceil(text.length / 4);
}

export function calculateSynthesisBudget(
  prompt: string,
  archetypeCount: number = 1,
  includeDiagrams: boolean = true
): {
  estimatedInputTokens: number;
  estimatedOutputTokens: number;
  withinTierLimit: boolean;
  suggestedTier: UserTier;
} {
  const promptTokens = estimatePromptTokens(prompt);
  const baseInputTokens = 1200 + promptTokens;
  const outputTokensPerDoc = 2500;
  const outputTokensPerDiagram = 1800;

  const estimatedOutputTokens =
    archetypeCount * outputTokensPerDoc + (includeDiagrams ? outputTokensPerDiagram * archetypeCount : 0);

  const totalTokens = baseInputTokens + estimatedOutputTokens;

  let suggestedTier: UserTier = 'free';
  if (totalTokens > USER_TIER_CONFIGS.free.maxTokensPerRequest) {
    suggestedTier = totalTokens > USER_TIER_CONFIGS.pro.maxTokensPerRequest ? 'enterprise' : 'pro';
  }

  return {
    estimatedInputTokens: baseInputTokens,
    estimatedOutputTokens,
    withinTierLimit: totalTokens <= USER_TIER_CONFIGS[suggestedTier].maxTokensPerRequest,
    suggestedTier,
  };
}
