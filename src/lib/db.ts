import { getDefaultXmlForArchitecture } from './architectureTypes';
import { createRequire } from 'module';
if (typeof globalThis.require === 'undefined') {
  globalThis.require = createRequire(import.meta.url);
}
import { DatabaseSync } from 'node:sqlite';
import { join, dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdirSync } from 'fs';
import { Pool } from 'pg';
import { getTechnicalArchitectureXml } from './technicalArchitectureXmls';

// Define TypeScript interfaces for our models
export interface User {
  id: string;
  email: string;
  password_hash: string;
  salt: string;
  name: string | null;
  global_role?: 'Super-Admin' | 'Author' | 'Member';
  is_super_admin?: boolean;
  is_guest?: boolean;
  created_at: string | Date;
  updated_at: string | Date;
  last_login_at: string | Date | null;
}

export interface Workspace {
  id: string;
  name: string;
  owner_id: string;
  created_at: string | Date;
  updated_at: string | Date;
  user_role?: 'Owner' | 'Admin' | 'Editor' | 'Viewer';
  member_count?: number;
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: 'Owner' | 'Admin' | 'Editor' | 'Viewer';
  created_at: string | Date;
  user_email?: string;
  user_name?: string | null;
}

export interface MagicLinkToken {
  id: string;
  email: string;
  token: string;
  expires_at: string | Date;
  created_at: string | Date;
}

export interface Session {
  id: string;
  user_id: string;
  expires_at: string | Date;
  created_at: string | Date;
}

export interface UserLog {
  id: string;
  user_id: string;
  event_type: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string | Date;
}

export interface DiagramCollaborator {
  id: string;
  diagram_id: string;
  user_id: string;
  access_level: 'Viewer' | 'Editor' | 'Owner';
  created_at: string | Date;
}

export interface AccessRequest {
  id: string;
  diagram_id: string;
  requester_user_id: string;
  requested_role: 'Viewer' | 'Editor';
  status: 'Pending' | 'Approved' | 'Denied';
  message: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  // Joined fields for UI convenience
  requester_email?: string;
  requester_name?: string | null;
  diagram_name?: string;
}

export interface DiagramFeedback {
  id: string;
  diagram_id: string;
  version_id?: string | null;
  user_id: string;
  rating: 'thumbs_up' | 'thumbs_down' | 'neutral';
  feedback_tags: string[];
  free_text_comment: string | null;
  created_at: string | Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  user_id?: string | null;
  created_at: string | Date;
}

export interface Diagram {
  id: string;
  name: string;
  user_id?: string | null;
  workspace_id?: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  access_level?: 'Viewer' | 'Editor' | 'Owner' | null;
  architecture_type?: string | null;
  created_studio?: string | null;
  is_private?: boolean | number | null;
  versions?: DiagramVersion[];
  xml_content?: string;
}

export interface DiagramVersion {
  id: string;
  diagram_id: string;
  version_number: number;
  xml_content: string;
  comment: string | null;
  created_by: string;
  created_at: string | Date;
  prompt?: string | null;
  ai_reasoning?: string | null;
  business_usecase?: string | null;
  technical_usecase?: string | null;
  architecture_type?: string | null;
  graph_json?: string | null;
}

export interface AuditReport {
  id: string;
  diagram_id: string;
  version_number: number;
  score: number;
  report: string;
  gaps: string;
  created_at: string;
}

// Database Connection Drivers
let pgPoolInstance: Pool | null = null;
let sqliteDbInstance: DatabaseSync | null = null;
const globalForDb = globalThis as unknown as { _tablesInitialized?: boolean };
let tablesInitialized = false;
let tablesInitPromise: Promise<void> | null = null;

export function isPostgres(): boolean {
  return !!process.env.DATABASE_URL;
}

function getPgPool(): Pool {
  if (!pgPoolInstance) {
    if (!process.env.DATABASE_URL) {
      if (process.env.NODE_ENV === 'production') {
        console.warn(
          '⚠️ [DATABASE CRITICAL]: DATABASE_URL is not set in production. Falling back to local SQLite, which is ephemeral across container redeploys. Please configure PostgreSQL for persistent multi-user production storage.'
        );
      }
    }

    pgPoolInstance = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('railway') || process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
      max: 20,
      min: 2,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      maxUses: 7500
    });

    pgPoolInstance.on('error', (err) => {
      console.error('[PostgreSQL Pool] Unexpected error on idle client:', err);
    });
  }
  return pgPoolInstance;
}

// Resolve SQLite path
const sqliteDbPath = process.env.DATABASE_PATH || join(process.cwd(), 'dev.db');

function getSqliteDb(): DatabaseSync {
  if (sqliteDbInstance) {
    return sqliteDbInstance;
  }
  try {
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      console.warn(
        '⚠️ [SQLite Warning] Running SQLite on ephemeral production container at:',
        sqliteDbPath
      );
    }
    mkdirSync(dirname(sqliteDbPath), { recursive: true });
    sqliteDbInstance = new DatabaseSync(sqliteDbPath);
    sqliteDbInstance.exec('PRAGMA foreign_keys = ON;');
    sqliteDbInstance.exec('PRAGMA journal_mode = WAL;');
    sqliteDbInstance.exec('PRAGMA busy_timeout = 5000;');
    return sqliteDbInstance;
  } catch (error) {
    console.error('Failed to initialize SQLite database:', error);
    throw error;
  }
}

// Global Promise-based Mutex queue to serialize SQLite write transactions and prevent race conditions
let sqliteTransactionLock = Promise.resolve();

export async function runSqliteTransaction<T>(callback: (db: DatabaseSync) => T | Promise<T>): Promise<T> {
  const previousLock = sqliteTransactionLock;
  let releaseLock: () => void;
  sqliteTransactionLock = new Promise<void>((resolve) => {
    releaseLock = resolve;
  });

  await previousLock;
  const db = getSqliteDb();
  try {
    db.exec('BEGIN TRANSACTION;');
    const result = await callback(db);
    db.exec('COMMIT;');
    return result;
  } catch (error) {
    try {
      db.exec('ROLLBACK;');
    } catch (_) {}
    throw error;
  } finally {
    releaseLock!();
  }
}

// Database Health Check for SRE Liveness & Readiness Probes
export async function checkDatabaseHealth(): Promise<{ ok: boolean; type: 'postgres' | 'sqlite'; latencyMs: number; error?: string }> {
  const start = Date.now();
  try {
    if (isPostgres()) {
      const pool = getPgPool();
      await pool.query('SELECT 1');
      return { ok: true, type: 'postgres', latencyMs: Date.now() - start };
    } else {
      const db = getSqliteDb();
      db.prepare('SELECT 1').get();
      return { ok: true, type: 'sqlite', latencyMs: Date.now() - start };
    }
  } catch (err: any) {
    return { ok: false, type: isPostgres() ? 'postgres' : 'sqlite', latencyMs: Date.now() - start, error: err.message };
  }
}

// Maintenance: Automatically purge expired guest sessions, magic links, and stale temp diagrams older than 30 days
export async function purgeExpiredGuestSessionsAndDiagrams(): Promise<{ purgedSessions: number; purgedTokens: number; purgedDiagrams: number }> {
  await ensureTablesExist();
  try {
    if (isPostgres()) {
      const pool = getPgPool();
      const resSessions = await pool.query('DELETE FROM sessions WHERE expires_at < NOW()');
      const resTokens = await pool.query('DELETE FROM magic_link_tokens WHERE expires_at < NOW()');
      const resDiagrams = await pool.query(`
        DELETE FROM diagrams 
        WHERE (user_id LIKE 'guest-%' OR id LIKE 'bp_%' OR id LIKE 'temp_%')
          AND updated_at < NOW() - INTERVAL '30 days'
      `);
      return {
        purgedSessions: resSessions.rowCount || 0,
        purgedTokens: resTokens.rowCount || 0,
        purgedDiagrams: resDiagrams.rowCount || 0
      };
    } else {
      const db = getSqliteDb();
      const resSessions = db.prepare(`DELETE FROM sessions WHERE expires_at < strftime('%Y-%m-%d %H:%M:%f', 'now')`).run();
      const resTokens = db.prepare(`DELETE FROM magic_link_tokens WHERE expires_at < strftime('%Y-%m-%d %H:%M:%f', 'now')`).run();
      const resDiagrams = db.prepare(`
        DELETE FROM diagrams 
        WHERE (user_id LIKE 'guest-%' OR id LIKE 'bp_%' OR id LIKE 'temp_%')
          AND updated_at < strftime('%Y-%m-%d %H:%M:%f', 'now', '-30 days')
      `).run();
      return {
        purgedSessions: Number(resSessions.changes || 0),
        purgedTokens: Number(resTokens.changes || 0),
        purgedDiagrams: Number(resDiagrams.changes || 0)
      };
    }
  } catch (err) {
    console.error('[DB Maintenance] Error during expired session purge:', err);
    return { purgedSessions: 0, purgedTokens: 0, purgedDiagrams: 0 };
  }
}

const RESOLVED_PROMISE = Promise.resolve();

// Ensure database tables exist for active driver with in-flight promise deduplication
export function ensureTablesExist(): Promise<void> {
  if (tablesInitialized || globalForDb._tablesInitialized) return RESOLVED_PROMISE;
  if (!tablesInitPromise) {
    tablesInitPromise = doEnsureTablesExist()
      .then(() => {
        tablesInitPromise = RESOLVED_PROMISE;
      })
      .catch((err) => {
        tablesInitPromise = null;
        throw err;
      });
  }
  return tablesInitPromise;
}

async function doEnsureTablesExist(): Promise<void> {
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login_at TIMESTAMP WITH TIME ZONE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        event_type TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS diagrams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        user_id TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS diagram_versions (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL,
        version_number INTEGER NOT NULL,
        xml_content TEXT NOT NULL,
        comment TEXT,
        created_by TEXT DEFAULT 'User',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        prompt TEXT,
        ai_reasoning TEXT,
        business_usecase TEXT,
        technical_usecase TEXT,
        FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS audit_reports (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL REFERENCES diagrams(id) ON DELETE CASCADE,
        version_number INTEGER NOT NULL,
        audit_category TEXT DEFAULT 'security',
        score INTEGER NOT NULL DEFAULT 85,
        report TEXT NOT NULL,
        gaps TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await pool.query(`ALTER TABLE audit_reports ADD COLUMN IF NOT EXISTS audit_category TEXT DEFAULT 'security';`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS diagram_collaborators (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL REFERENCES diagrams(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        access_level TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_diagram_user UNIQUE (diagram_id, user_id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS access_requests (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL REFERENCES diagrams(id) ON DELETE CASCADE,
        requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        requested_role TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Pending',
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS diagram_feedback (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL REFERENCES diagrams(id) ON DELETE CASCADE,
        version_id TEXT REFERENCES diagram_versions(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        rating TEXT NOT NULL,
        feedback_tags TEXT NOT NULL DEFAULT '[]',
        free_text_comment TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW v_feedback_curation AS
      SELECT 
        rating,
        feedback_tags,
        free_text_comment,
        diagram_id,
        version_id,
        user_id,
        created_at
      FROM diagram_feedback
      ORDER BY created_at DESC;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        reason TEXT NOT NULL,
        message TEXT NOT NULL,
        user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS workspaces (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS workspace_members (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        role TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_workspace_user UNIQUE (workspace_id, user_id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS magic_link_tokens (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_stats (
        key TEXT PRIMARY KEY,
        value BIGINT NOT NULL DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Schema Evolution Migrations
    await pool.query(`
      ALTER TABLE diagrams ADD COLUMN IF NOT EXISTS user_id TEXT;
    `);
    await pool.query(`
      ALTER TABLE diagrams ADD COLUMN IF NOT EXISTS workspace_id TEXT;
    `);
    await pool.query(`
      ALTER TABLE diagrams ADD COLUMN IF NOT EXISTS architecture_type TEXT DEFAULT 'conceptual_diagram';
    `);
    await pool.query(`
      ALTER TABLE diagrams ADD COLUMN IF NOT EXISTS is_private BOOLEAN DEFAULT FALSE;
    `);
    await pool.query(`
      ALTER TABLE diagrams ADD COLUMN IF NOT EXISTS created_studio TEXT DEFAULT 'studio1';
    `);
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS global_role TEXT DEFAULT 'Author';
    `);
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT FALSE;
    `);
    await pool.query(`
      ALTER TABLE diagram_versions ADD COLUMN IF NOT EXISTS prompt TEXT;
    `);
    await pool.query(`
      ALTER TABLE diagram_versions ADD COLUMN IF NOT EXISTS ai_reasoning TEXT;
    `);
    await pool.query(`
      ALTER TABLE diagram_versions ADD COLUMN IF NOT EXISTS business_usecase TEXT;
    `);
    await pool.query(`
      ALTER TABLE diagram_versions ADD COLUMN IF NOT EXISTS technical_usecase TEXT;
    `);
    await pool.query(`
      ALTER TABLE diagram_versions ADD COLUMN IF NOT EXISTS architecture_type TEXT DEFAULT 'conceptual_diagram';
    `);
    await pool.query(`
      ALTER TABLE diagram_versions ADD COLUMN IF NOT EXISTS graph_json TEXT;
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_diagram_versions_lookup ON diagram_versions (diagram_id, architecture_type, version_number DESC);
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS media_assets (
        id TEXT PRIMARY KEY,
        diagram_id TEXT REFERENCES diagrams(id) ON DELETE CASCADE,
        asset_type TEXT NOT NULL,
        title TEXT NOT NULL,
        url TEXT,
        html_code TEXT,
        aspect_ratio TEXT DEFAULT '16:9',
        caption TEXT,
        category TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_media_assets_diagram ON media_assets (diagram_id);
      CREATE INDEX IF NOT EXISTS idx_media_assets_type ON media_assets (asset_type);

      CREATE TABLE IF NOT EXISTS changelog_entries (
        id TEXT PRIMARY KEY,
        event_category TEXT NOT NULL,
        actor_id TEXT,
        actor_name TEXT NOT NULL,
        actor_email TEXT NOT NULL,
        actor_role TEXT NOT NULL DEFAULT 'Author',
        entity_type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        entity_name TEXT NOT NULL,
        field_changed TEXT NOT NULL,
        old_value TEXT,
        new_value TEXT,
        summary TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'UI',
        sync_status TEXT NOT NULL DEFAULT 'SYNCED',
        sheet_row_ref TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_changelog_created ON changelog_entries (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_changelog_category ON changelog_entries (event_category);

      CREATE TABLE IF NOT EXISTS governance_tracker_items (
        id TEXT PRIMARY KEY,
        blueprint_code TEXT UNIQUE NOT NULL,
        blueprint_name TEXT NOT NULL,
        domain_layer TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'In Review',
        priority TEXT NOT NULL DEFAULT 'P0 - Critical',
        owner_name TEXT NOT NULL,
        owner_email TEXT NOT NULL,
        latest_comment TEXT,
        comment_author TEXT,
        version TEXT NOT NULL DEFAULT 'v3.2',
        last_modified_by TEXT NOT NULL,
        last_sync_source TEXT NOT NULL DEFAULT 'UI',
        sheet_row_number INTEGER NOT NULL DEFAULT 2,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS governance_comments (
        id TEXT PRIMARY KEY,
        target_id TEXT NOT NULL,
        target_name TEXT NOT NULL,
        author_name TEXT NOT NULL,
        author_email TEXT NOT NULL,
        author_role TEXT NOT NULL DEFAULT 'Architect',
        comment_text TEXT NOT NULL,
        status_at_comment TEXT,
        source TEXT NOT NULL DEFAULT 'UI',
        sheet_row_ref TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS sheet_sync_config (
        id TEXT PRIMARY KEY,
        spreadsheet_id TEXT NOT NULL,
        spreadsheet_url TEXT NOT NULL,
        sheet_title TEXT NOT NULL,
        auto_sync_enabled INTEGER NOT NULL DEFAULT 1,
        sync_mode TEXT NOT NULL DEFAULT 'TWO_WAY_LIVE',
        last_synced_at TEXT,
        last_sync_actor TEXT,
        total_ui_to_sheet_pushes INTEGER NOT NULL DEFAULT 0,
        total_sheet_to_ui_pulls INTEGER NOT NULL DEFAULT 0
      );
    `);
  } else {
    const db = getSqliteDb();
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        name TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        updated_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        last_login_at TEXT
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS user_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS diagrams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        user_id TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        updated_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS diagram_versions (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL,
        version_number INTEGER NOT NULL,
        xml_content TEXT NOT NULL,
        comment TEXT,
        created_by TEXT DEFAULT 'User',
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        prompt TEXT,
        ai_reasoning TEXT,
        business_usecase TEXT,
        technical_usecase TEXT,
        FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS audit_reports (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL,
        version_number INTEGER NOT NULL,
        score INTEGER NOT NULL DEFAULT 85,
        report TEXT NOT NULL,
        gaps TEXT NOT NULL,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS diagram_collaborators (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        access_level TEXT NOT NULL,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(diagram_id, user_id)
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS access_requests (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL,
        requester_user_id TEXT NOT NULL,
        requested_role TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Pending',
        message TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        updated_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE,
        FOREIGN KEY (requester_user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS diagram_feedback (
        id TEXT PRIMARY KEY,
        diagram_id TEXT NOT NULL,
        version_id TEXT,
        user_id TEXT NOT NULL,
        rating TEXT NOT NULL,
        feedback_tags TEXT NOT NULL DEFAULT '[]',
        free_text_comment TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE,
        FOREIGN KEY (version_id) REFERENCES diagram_versions(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    db.exec(`
      CREATE VIEW IF NOT EXISTS v_feedback_curation AS
      SELECT 
        rating,
        feedback_tags,
        free_text_comment,
        diagram_id,
        version_id,
        user_id,
        created_at
      FROM diagram_feedback
      ORDER BY created_at DESC;
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        reason TEXT NOT NULL,
        message TEXT NOT NULL,
        user_id TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS workspaces (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        owner_id TEXT NOT NULL,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        updated_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS workspace_members (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(workspace_id, user_id)
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS magic_link_tokens (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at TEXT NOT NULL,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS site_stats (
        key TEXT PRIMARY KEY,
        value INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      );

      CREATE TABLE IF NOT EXISTS media_assets (
        id TEXT PRIMARY KEY,
        diagram_id TEXT,
        asset_type TEXT NOT NULL,
        title TEXT NOT NULL,
        url TEXT,
        html_code TEXT,
        aspect_ratio TEXT DEFAULT '16:9',
        caption TEXT,
        category TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
        FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE
      );
      CREATE INDEX IF NOT EXISTS idx_media_assets_diagram ON media_assets (diagram_id);
      CREATE INDEX IF NOT EXISTS idx_media_assets_type ON media_assets (asset_type);

      CREATE TABLE IF NOT EXISTS changelog_entries (
        id TEXT PRIMARY KEY,
        event_category TEXT NOT NULL,
        actor_id TEXT,
        actor_name TEXT NOT NULL,
        actor_email TEXT NOT NULL,
        actor_role TEXT NOT NULL DEFAULT 'Author',
        entity_type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        entity_name TEXT NOT NULL,
        field_changed TEXT NOT NULL,
        old_value TEXT,
        new_value TEXT,
        summary TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'UI',
        sync_status TEXT NOT NULL DEFAULT 'SYNCED',
        sheet_row_ref TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      );
      CREATE INDEX IF NOT EXISTS idx_changelog_created ON changelog_entries (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_changelog_category ON changelog_entries (event_category);

      CREATE TABLE IF NOT EXISTS governance_tracker_items (
        id TEXT PRIMARY KEY,
        blueprint_code TEXT UNIQUE NOT NULL,
        blueprint_name TEXT NOT NULL,
        domain_layer TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'In Review',
        priority TEXT NOT NULL DEFAULT 'P0 - Critical',
        owner_name TEXT NOT NULL,
        owner_email TEXT NOT NULL,
        latest_comment TEXT,
        comment_author TEXT,
        version TEXT NOT NULL DEFAULT 'v3.2',
        last_modified_by TEXT NOT NULL,
        last_sync_source TEXT NOT NULL DEFAULT 'UI',
        sheet_row_number INTEGER NOT NULL DEFAULT 2,
        updated_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      );

      CREATE TABLE IF NOT EXISTS governance_comments (
        id TEXT PRIMARY KEY,
        target_id TEXT NOT NULL,
        target_name TEXT NOT NULL,
        author_name TEXT NOT NULL,
        author_email TEXT NOT NULL,
        author_role TEXT NOT NULL DEFAULT 'Architect',
        comment_text TEXT NOT NULL,
        status_at_comment TEXT,
        source TEXT NOT NULL DEFAULT 'UI',
        sheet_row_ref TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      );

      CREATE TABLE IF NOT EXISTS sheet_sync_config (
        id TEXT PRIMARY KEY,
        spreadsheet_id TEXT NOT NULL,
        spreadsheet_url TEXT NOT NULL,
        sheet_title TEXT NOT NULL,
        auto_sync_enabled INTEGER NOT NULL DEFAULT 1,
        sync_mode TEXT NOT NULL DEFAULT 'TWO_WAY_LIVE',
        last_synced_at TEXT,
        last_sync_actor TEXT,
        total_ui_to_sheet_pushes INTEGER NOT NULL DEFAULT 0,
        total_sheet_to_ui_pulls INTEGER NOT NULL DEFAULT 0
      );
    `);

    // Schema Evolution Migrations
    try {
      db.exec('ALTER TABLE diagrams ADD COLUMN user_id TEXT;');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE diagrams ADD COLUMN workspace_id TEXT;');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE diagrams ADD COLUMN architecture_type TEXT DEFAULT "conceptual_diagram";');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE diagrams ADD COLUMN is_private INTEGER DEFAULT 0;');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE diagrams ADD COLUMN created_studio TEXT DEFAULT "studio1";');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE users ADD COLUMN global_role TEXT DEFAULT "Author";');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE users ADD COLUMN is_super_admin INTEGER DEFAULT 0;');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE diagram_versions ADD COLUMN prompt TEXT;');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE diagram_versions ADD COLUMN ai_reasoning TEXT;');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE diagram_versions ADD COLUMN business_usecase TEXT;');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE diagram_versions ADD COLUMN technical_usecase TEXT;');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec("ALTER TABLE diagram_versions ADD COLUMN architecture_type TEXT DEFAULT 'conceptual_diagram';");
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('ALTER TABLE diagram_versions ADD COLUMN graph_json TEXT;');
    } catch {
      // Ignored if column already exists
    }
    try {
      db.exec('CREATE INDEX IF NOT EXISTS idx_diagram_versions_lookup ON diagram_versions (diagram_id, architecture_type, version_number DESC);');
    } catch {
      // Ignored if index already exists
    }
  }

  // Seeding trigger: if no diagrams exist, seed defaults!
  try {
    const diagCountRes = isPostgres()
      ? await getPgPool().query('SELECT COUNT(*) as count FROM diagrams')
      : getSqliteDb().prepare('SELECT COUNT(*) as count FROM diagrams').get() as { count: number | bigint };
    
    const count = isPostgres() 
      ? parseInt((diagCountRes as { rows: { count: string | number }[] }).rows[0].count.toString(), 10) 
      : Number((diagCountRes as { count: number | bigint }).count);

    if (count === 0) {
      console.log('🌱 Database is empty! Seeding professional default architecture diagrams...');
      await seedDiagram(
        'AWS VPC SecureNetwork',
        AWS_VPC_XML,
        'Auto-seeded AWS Secure Network Blueprint',
        'Design a secure VPC with Public and Private Subnets across two Availability Zones, including Load Balancer and RDS database.'
      );
      await seedDiagram(
        'GCP Streaming Analytics',
        GCP_ANALYTICS_XML,
        'Auto-seeded GCP Real-time Analytics Blueprint',
        'Design a real-time streaming data analytics pipeline using Pub/Sub, Cloud Dataflow, and BigQuery.'
      );
      await seedDiagram(
        'DevOps CI/CD Deployment',
        CICD_PIPELINE_XML,
        'Auto-seeded DevOps Git Deployment Blueprint',
        'Design a secure CI/CD build and deploy pipeline containerizing using Docker, pushing to registry, and deploying to EKS.'
      );
      await seedDiagram(
        'AI RAG Core Pipeline',
        AI_RAG_XML,
        'Auto-seeded Cloud RAG Embeddings Blueprint',
        'Design a Retrieval-Augmented Generation (RAG) system with Cloud Run API, Cloud SQL (pgvector), and Gemini LLM.'
      );
      await seedDiagram(
        'Gemini Enterprise Portal',
        GEMINI_ENTERPRISE_XML,
        'Auto-seeded Gemini Multi-User Enterprise App',
        'Design a secure enterprise application integrated with Gemini Ultra model API, context caching, and redis grounding store.'
      );
      await seedDiagram(
        'NotebookLM Source Grounding',
        NOTEBOOK_LM_XML,
        'Auto-seeded NotebookLM Semantic Grounding Workspace',
        'Design NotebookLM uploader pipeline chunking sources, storing in vector storage, and generating podcast audio overview.'
      );
      await seedDiagram(
        'Multi-Agent Design Orchestrator',
        AGENT_DESIGNER_XML,
        'Auto-seeded Agentic Planner Blueprint',
        'Design a multi-agent orchestrator designing diagrams with code-execution sandbox, critic reflection loops, and short-term memory.'
      );
      await seedDiagram(
        'Deep Research Agent Pipeline',
        DEEP_RESEARCH_XML,
        'Auto-seeded Deep Research Loop Blueprint',
        'Design a deep research agent performing scraper sub-queries, evaluating sources, and generating markdown reports.'
      );
      console.log('✅ Default diagrams seeded successfully!');
    }
  } catch (seedErr) {
    console.error('Failed to seed default diagrams:', seedErr);
  }

  tablesInitialized = true;
  globalForDb._tablesInitialized = true;

  try {
    await seedInitialGovernanceAndChangelog();
  } catch (govErr) {
    console.error('Failed to seed initial governance & changelog entries:', govErr);
  }
}

// Helper: Get diagram access level for a user ('Owner' | 'Editor' | 'Viewer' | null)
export async function getUserDiagramAccess(
  diagramId: string,
  userId?: string | null
): Promise<'Owner' | 'Editor' | 'Viewer' | null> {
  await ensureTablesExist();

  let diagram: Diagram | null = null;
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM diagrams WHERE id = $1', [diagramId]);
    diagram = (res.rows[0] as Diagram) || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM diagrams WHERE id = ?');
    diagram = (stmt.get(diagramId) as unknown as Diagram) || null;
  }

  if (!diagram) return null;

  // Unowned public seed templates default to Viewer if unauthenticated, Editor if authenticated
  if (!diagram.user_id) {
    return userId ? 'Editor' : 'Viewer';
  }

  // Guest created diagrams: if caller is the creating guest session, Owner; if authenticated, Editor; if anonymous visitor, Viewer
  if (diagram.user_id.startsWith('guest-')) {
    if (userId && diagram.user_id === userId) return 'Owner';
    if (!userId) return 'Viewer';
    return 'Editor';
  }

  // Public diagrams (is_private is FALSE, 0, or null):
  if (!diagram.is_private) {
    if (!userId) return 'Viewer';
    return diagram.user_id === userId ? 'Owner' : 'Editor';
  }

  if (!userId) return null;

  // Check if owner
  if (diagram.user_id === userId) return 'Owner';

  // Check collaborators table
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      'SELECT access_level FROM diagram_collaborators WHERE diagram_id = $1 AND user_id = $2',
      [diagramId, userId]
    );
    if (res.rows.length > 0) {
      return res.rows[0].access_level as 'Viewer' | 'Editor' | 'Owner';
    }
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      'SELECT access_level FROM diagram_collaborators WHERE diagram_id = ? AND user_id = ?'
    );
    const row = stmt.get(diagramId, userId) as any;
    if (row) {
      return row.access_level as 'Viewer' | 'Editor' | 'Owner';
    }
  }

  return null;
}

// Helper: List all diagrams accessible by a given user (owned, shared, or public seeded ones)
export async function listDiagrams(userId?: string): Promise<(Diagram & { xml_content?: string; prompt?: string | null })[]> {
  await ensureTablesExist();
  
  if (userId) {
    if (isPostgres()) {
      const query = `
        SELECT d.*, v.xml_content, v.prompt,
          CASE 
            WHEN d.user_id = $1 THEN 'Owner'
            WHEN c.access_level IS NOT NULL THEN c.access_level
            WHEN d.user_id IS NULL THEN 'Viewer'
            WHEN d.user_id LIKE 'guest-%' THEN 'Editor'
            ELSE 'Viewer'
          END as access_level
        FROM diagrams d
        LEFT JOIN diagram_collaborators c ON c.diagram_id = d.id AND c.user_id = $1
        LEFT JOIN diagram_versions v ON v.id = (
          SELECT id 
          FROM diagram_versions 
          WHERE diagram_id = d.id
          ORDER BY created_at DESC, version_number DESC
          LIMIT 1
        )
        WHERE d.user_id = $1 OR d.user_id IS NULL OR d.user_id LIKE 'guest-%' OR c.user_id = $1 OR d.is_private IS NOT TRUE
        ORDER BY d.updated_at DESC
      `;
      const pool = getPgPool();
      const res = await pool.query(query, [userId]);
      return res.rows;
    } else {
      const query = `
        SELECT d.*, v.xml_content, v.prompt,
          CASE 
            WHEN d.user_id = ? THEN 'Owner'
            WHEN c.access_level IS NOT NULL THEN c.access_level
            WHEN d.user_id IS NULL THEN 'Viewer'
            WHEN d.user_id LIKE 'guest-%' THEN 'Editor'
            ELSE 'Viewer'
          END as access_level
        FROM diagrams d
        LEFT JOIN diagram_collaborators c ON c.diagram_id = d.id AND c.user_id = ?
        LEFT JOIN diagram_versions v ON v.id = (
          SELECT id 
          FROM diagram_versions 
          WHERE diagram_id = d.id
          ORDER BY created_at DESC, version_number DESC
          LIMIT 1
        )
        WHERE d.user_id = ? OR d.user_id IS NULL OR d.user_id LIKE 'guest-%' OR c.user_id = ? OR d.is_private IS NULL OR d.is_private = 0
        ORDER BY d.updated_at DESC
      `;
      const db = getSqliteDb();
      const stmt = db.prepare(query);
      return stmt.all(userId, userId, userId, userId) as unknown as (Diagram & { xml_content?: string; prompt?: string | null })[];
    }
  } else {
    if (isPostgres()) {
      const query = `
        SELECT d.*, v.xml_content, v.prompt, 'Viewer' as access_level
        FROM diagrams d
        LEFT JOIN diagram_versions v ON v.id = (
          SELECT id 
          FROM diagram_versions 
          WHERE diagram_id = d.id
          ORDER BY created_at DESC, version_number DESC
          LIMIT 1
        )
        WHERE d.user_id IS NULL OR d.user_id LIKE 'guest-%' OR d.is_private IS NOT TRUE
        ORDER BY d.updated_at DESC
      `;
      const pool = getPgPool();
      const res = await pool.query(query);
      return res.rows;
    } else {
      const query = `
        SELECT d.*, v.xml_content, v.prompt, 'Viewer' as access_level
        FROM diagrams d
        LEFT JOIN diagram_versions v ON v.id = (
          SELECT id 
          FROM diagram_versions 
          WHERE diagram_id = d.id
          ORDER BY created_at DESC, version_number DESC
          LIMIT 1
        )
        WHERE d.user_id IS NULL OR d.user_id LIKE 'guest-%' OR d.is_private IS NULL OR d.is_private = 0
        ORDER BY d.updated_at DESC
      `;
      const db = getSqliteDb();
      const stmt = db.prepare(query);
      return stmt.all() as unknown as (Diagram & { xml_content?: string; prompt?: string | null })[];
    }
  }
}

// Helper: Get a single diagram by ID (verifying owner or collaborator access)
export async function getDiagram(id: string, userId?: string): Promise<(Diagram & { access_level?: string | null }) | null> {
  await ensureTablesExist();
  
  const accessLevel = await getUserDiagramAccess(id, userId);
  if (!accessLevel) return null;

  let diag: Diagram | null = null;
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM diagrams WHERE id = $1', [id]);
    diag = (res.rows[0] as Diagram) || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM diagrams WHERE id = ?');
    const result = stmt.get(id);
    diag = (result as unknown as Diagram) || null;
  }

  if (diag) {
    const versions = await getDiagramVersions(id);
    if (!versions || versions.length === 0) {
      const archType = diag.architecture_type || 'unified_system_view';
      const refXml = getDefaultXmlForArchitecture(archType, diag.name, diag.name);
      try {
        const v1 = await saveDiagramVersion(
          id,
          refXml || '',
          `Initial Architecture Backbone: ${archType}`,
          'System',
          null,
          null,
          null,
          null,
          archType
        );
        diag.versions = [v1];
      } catch (err) {
        console.error("Failed auto-generating initial version:", err);
        diag.versions = [];
      }
    } else {
      diag.versions = versions;
    }
  }

  return diag ? { ...diag, access_level: accessLevel } : null;
}

// Helper: Update diagram privacy (is_private)
export async function updateDiagramPrivacy(diagramId: string, isPrivate: boolean): Promise<void> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query('UPDATE diagrams SET is_private = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1', [diagramId, isPrivate]);
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare("UPDATE diagrams SET is_private = ?, updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) WHERE id = ?");
    stmt.run(isPrivate ? 1 : 0, diagramId);
  }
}

// Helper: Create a new diagram with an optional initial XML and userId
export async function createDiagram(
  name: string,
  initialXml?: string,
  comment?: string,
  prompt?: string | null,
  aiReasoning?: string | null,
  businessUsecase?: string | null,
  technicalUsecase?: string | null,
  userId?: string | null,
  architectureType?: string | null,
  isPrivate?: boolean,
  createdStudio: string = 'studio1'
): Promise<{ diagram: Diagram; version: DiagramVersion | null }> {
  await ensureTablesExist();
  const diagramId = uuidv4();
  const versionId = uuidv4();
  const privateValPg = isPrivate ? true : false;
  const privateValSqlite = isPrivate ? 1 : 0;

  if (isPostgres()) {
    const pool = getPgPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('INSERT INTO diagrams (id, name, user_id, architecture_type, is_private, created_studio) VALUES ($1, $2, $3, $4, $5, $6)', [diagramId, name, userId || null, architectureType || 'unified_system_view', privateValPg, createdStudio || 'studio1']);

      let version: DiagramVersion | null = null;
      if (initialXml !== undefined) {
        await client.query(`
          INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [
          versionId,
          diagramId,
          1,
          initialXml,
          comment || 'Initial version',
          'AI',
          prompt || null,
          aiReasoning || null,
          businessUsecase || null,
          technicalUsecase || null,
          architectureType || 'conceptual_diagram'
        ]);
        const getVer = await client.query('SELECT * FROM diagram_versions WHERE id = $1', [versionId]);
        version = getVer.rows[0] as DiagramVersion;
      }
      await client.query('COMMIT');
      
      const getDiag = await client.query('SELECT * FROM diagrams WHERE id = $1', [diagramId]);
      const diagram = getDiag.rows[0] as Diagram;
      return { diagram, version };
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Failed to create diagram in PostgreSQL:', error);
      throw error;
    } finally {
      client.release();
    }
  } else {
    return await runSqliteTransaction(async (db) => {
      const insertDiagram = db.prepare('INSERT INTO diagrams (id, name, user_id, architecture_type, is_private, created_studio) VALUES (?, ?, ?, ?, ?, ?)');
      insertDiagram.run(diagramId, name, userId || null, architectureType || 'unified_system_view', privateValSqlite, createdStudio || 'studio1');

      let version: DiagramVersion | null = null;
      if (initialXml !== undefined) {
        const insertVersion = db.prepare(`
          INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        insertVersion.run(
          versionId,
          diagramId,
          1,
          initialXml,
          comment || 'Initial version',
          'AI',
          prompt || null,
          aiReasoning || null,
          businessUsecase || null,
          technicalUsecase || null,
          architectureType || 'conceptual_diagram'
        );
        const getVersion = db.prepare('SELECT * FROM diagram_versions WHERE id = ?');
        version = getVersion.get(versionId) as unknown as DiagramVersion;
      }

      const getDiag = db.prepare('SELECT * FROM diagrams WHERE id = ?');
      const diagram = getDiag.get(diagramId) as unknown as Diagram;
      return { diagram, version };
    });
  }
}

// Helper: Save a new version of a diagram
export async function saveDiagramVersion(
  diagramId: string,
  xmlContent: string,
  comment: string | null,
  createdBy: string = 'User',
  prompt?: string | null,
  aiReasoning?: string | null,
  businessUsecase?: string | null,
  technicalUsecase?: string | null,
  architectureType: string = 'conceptual_diagram',
  graphJson?: string | null
): Promise<DiagramVersion> {
  await ensureTablesExist();
  const versionId = uuidv4();

  if (isPostgres()) {
    const pool = getPgPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const maxVer = await client.query("SELECT COALESCE(MAX(version_number), 0) as max_version FROM diagram_versions WHERE diagram_id = $1 AND (architecture_type = $2 OR architecture_type IS NULL)", [diagramId, architectureType || 'unified_system_view']);
      const nextVersionNumber = (maxVer.rows[0].max_version || 0) + 1;

      await client.query(`
        INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type, graph_json)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        versionId,
        diagramId,
        nextVersionNumber,
        xmlContent,
        comment,
        createdBy,
        prompt || null,
        aiReasoning || null,
        businessUsecase || null,
        technicalUsecase || null,
        architectureType || 'unified_system_view',
        graphJson || null
      ]);

      await client.query('UPDATE diagrams SET updated_at = CURRENT_TIMESTAMP WHERE id = $1', [diagramId]);
      await client.query('COMMIT');

      const getVer = await client.query('SELECT * FROM diagram_versions WHERE id = $1', [versionId]);
      return getVer.rows[0] as DiagramVersion;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Failed to save diagram version in PostgreSQL:', error);
      throw error;
    } finally {
      client.release();
    }
  } else {
    return await runSqliteTransaction(async (db) => {
      const maxVersionStmt = db.prepare("SELECT COALESCE(MAX(version_number), 0) as max_version FROM diagram_versions WHERE diagram_id = ? AND (architecture_type = ? OR architecture_type IS NULL)");
      const versionResult = maxVersionStmt.get(diagramId, architectureType || 'unified_system_view') as { max_version: number };
      const nextVersionNumber = versionResult.max_version + 1;

      const insertVersion = db.prepare(`
        INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type, graph_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insertVersion.run(
        versionId,
        diagramId,
        nextVersionNumber,
        xmlContent,
        comment,
        createdBy,
        prompt || null,
        aiReasoning || null,
        businessUsecase || null,
        technicalUsecase || null,
        architectureType || 'conceptual_diagram',
        graphJson || null
      );

      const updateDiagram = db.prepare("UPDATE diagrams SET updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) WHERE id = ?");
      updateDiagram.run(diagramId);

      const getVersion = db.prepare('SELECT * FROM diagram_versions WHERE id = ?');
      return getVersion.get(versionId) as unknown as DiagramVersion;
    });
  }
}

// Helper: Get all versions of a diagram (sorted by version_number desc)
export async function getDiagramVersions(diagramId: string, architectureType?: string | null): Promise<DiagramVersion[]> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const query = architectureType
      ? "SELECT * FROM diagram_versions WHERE diagram_id = $1 AND (architecture_type = $2 OR architecture_type IS NULL) ORDER BY version_number DESC"
      : 'SELECT * FROM diagram_versions WHERE diagram_id = $1 ORDER BY version_number DESC';
    const res = await pool.query(query, architectureType ? [diagramId, architectureType] : [diagramId]);
    return res.rows as DiagramVersion[];
  } else {
    const db = getSqliteDb();
    const query = architectureType
      ? "SELECT * FROM diagram_versions WHERE diagram_id = ? AND (architecture_type = ? OR architecture_type IS NULL) ORDER BY version_number DESC"
      : 'SELECT * FROM diagram_versions WHERE diagram_id = ? ORDER BY version_number DESC';
    const stmt = db.prepare(query);
    return (architectureType ? stmt.all(diagramId, architectureType) : stmt.all(diagramId)) as unknown as DiagramVersion[];
  }
}

// Helper: Get a specific version by ID
export async function getDiagramVersion(versionId: string): Promise<DiagramVersion | null> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM diagram_versions WHERE id = $1', [versionId]);
    return (res.rows[0] as DiagramVersion) || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM diagram_versions WHERE id = ?');
    const result = stmt.get(versionId);
    return (result as unknown as DiagramVersion) || null;
  }
}

// Helper: Get the latest version of a diagram
export async function getLatestDiagramVersion(diagramId: string, architectureType?: string | null): Promise<DiagramVersion | null> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const query = architectureType
      ? 'SELECT * FROM diagram_versions WHERE diagram_id = $1 AND (architecture_type = $2 OR architecture_type IS NULL) ORDER BY version_number DESC LIMIT 1'
      : 'SELECT * FROM diagram_versions WHERE diagram_id = $1 ORDER BY version_number DESC LIMIT 1';
    const res = await pool.query(query, architectureType ? [diagramId, architectureType] : [diagramId]);
    return (res.rows[0] as DiagramVersion) || null;
  } else {
    const db = getSqliteDb();
    const query = architectureType
      ? 'SELECT * FROM diagram_versions WHERE diagram_id = ? AND (architecture_type = ? OR architecture_type IS NULL) ORDER BY version_number DESC LIMIT 1'
      : 'SELECT * FROM diagram_versions WHERE diagram_id = ? ORDER BY version_number DESC LIMIT 1';
    const stmt = db.prepare(query);
    const result = architectureType ? stmt.get(diagramId, architectureType) : stmt.get(diagramId);
    return (result as unknown as DiagramVersion) || null;
  }
}

// Helper: Delete a diagram (cascades to versions, strictly scoped to creator, owner collaborator, or super-admin)
export async function deleteDiagram(id: string, userId?: string, isSuperAdmin = false): Promise<void> {
  await ensureTablesExist();
  if (!id) return;
  if (!userId && !isSuperAdmin) {
    throw new Error('Unauthorized: User ID or Super-Admin privileges are required to delete a diagram.');
  }

  if (isPostgres()) {
    const pool = getPgPool();
    if (isSuperAdmin) {
      await pool.query('DELETE FROM diagrams WHERE id = $1', [id]);
    } else {
      await pool.query(
        `DELETE FROM diagrams 
         WHERE id = $1 
           AND (
             user_id = $2 
             OR id IN (SELECT diagram_id FROM diagram_collaborators WHERE user_id = $2 AND access_level = 'Owner')
           )`,
        [id, userId]
      );
    }
  } else {
    const db = getSqliteDb();
    if (isSuperAdmin) {
      const stmt = db.prepare('DELETE FROM diagrams WHERE id = ?');
      stmt.run(id);
    } else {
      const stmt = db.prepare(
        `DELETE FROM diagrams 
         WHERE id = ? 
           AND (
             user_id = ? 
             OR id IN (SELECT diagram_id FROM diagram_collaborators WHERE user_id = ? AND access_level = 'Owner')
           )`
      );
      stmt.run(id, userId!, userId!);
    }
  }
}

// Helper: Batch Delete multiple diagrams (strictly scoped to creator, owner collaborator, or super-admin)
export async function batchDeleteDiagrams(ids: string[], userId?: string, isSuperAdmin = false): Promise<number> {
  if (!ids || ids.length === 0) return 0;
  if (!userId && !isSuperAdmin) {
    throw new Error('Unauthorized: User ID or Super-Admin privileges are required to batch delete diagrams.');
  }
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    if (isSuperAdmin) {
      const res = await pool.query('DELETE FROM diagrams WHERE id = ANY($1::text[])', [ids]);
      return res.rowCount || 0;
    } else {
      const res = await pool.query(
        `DELETE FROM diagrams 
         WHERE id = ANY($1::text[]) 
           AND (
             user_id = $2 
             OR id IN (SELECT diagram_id FROM diagram_collaborators WHERE user_id = $2 AND access_level = 'Owner')
           )`,
        [ids, userId]
      );
      return res.rowCount || 0;
    }
  } else {
    const db = getSqliteDb();
    const placeholders = ids.map(() => '?').join(',');
    if (isSuperAdmin) {
      const stmt = db.prepare(`DELETE FROM diagrams WHERE id IN (${placeholders})`);
      const info = stmt.run(...ids);
      return Number(info.changes || 0);
    } else {
      const stmt = db.prepare(
        `DELETE FROM diagrams 
         WHERE id IN (${placeholders}) 
           AND (
             user_id = ? 
             OR id IN (SELECT diagram_id FROM diagram_collaborators WHERE user_id = ? AND access_level = 'Owner')
           )`
      );
      const info = stmt.run(...ids, userId!, userId!);
      return Number(info.changes || 0);
    }
  }
}

// Helper: Clear all diagrams for a specific user (never wipes entire database or cross-tenant records)
export async function clearAllDiagrams(userId?: string): Promise<void> {
  await ensureTablesExist();
  if (!userId) {
    throw new Error('Unauthorized: Valid user ID is required to clear diagram history.');
  }

  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query('DELETE FROM diagrams WHERE user_id = $1', [userId]);
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('DELETE FROM diagrams WHERE user_id = ?');
    stmt.run(userId);
  }
}

export async function migrateGuestContent(guestUserId: string, newUserId: string): Promise<number> {
  await ensureTablesExist();
  if (!guestUserId || !newUserId || guestUserId === newUserId) return 0;
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('UPDATE diagrams SET user_id = $1 WHERE user_id = $2', [newUserId, guestUserId]);
    return res.rowCount || 0;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('UPDATE diagrams SET user_id = ? WHERE user_id = ?');
    const info = stmt.run(newUserId, guestUserId);
    return Number(info.changes || 0);
  }
}

export async function updateDiagramArchitectureType(diagramId: string, architectureType: string): Promise<void> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query('UPDATE diagrams SET architecture_type = $1 WHERE id = $2', [architectureType, diagramId]);
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('UPDATE diagrams SET architecture_type = ? WHERE id = ?');
    stmt.run(architectureType, diagramId);
  }
}

export async function updateDiagramName(diagramId: string, name: string): Promise<void> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query('UPDATE diagrams SET name = $1 WHERE id = $2', [name, diagramId]);
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('UPDATE diagrams SET name = ? WHERE id = ?');
    stmt.run(name, diagramId);
  }
}

export async function updateLatestDiagramVersionContent(
  diagramId: string,
  xmlContent?: string,
  architectureType?: string,
  businessUseCase?: string
): Promise<void> {
  await ensureTablesExist();
  const { getDefaultXmlForArchitecture } = await import('./architectureTypes');
  if (isPostgres()) {
    const pool = getPgPool();
    const vers = await pool.query(
      'SELECT id, architecture_type, xml_content, business_usecase FROM diagram_versions WHERE diagram_id = $1 ORDER BY version_number DESC LIMIT 1',
      [diagramId]
    );
    if (vers.rows.length > 0) {
      const latest = vers.rows[0];
      const nextArch = architectureType || latest.architecture_type;
      const isArchChanged = architectureType && architectureType !== latest.architecture_type;
      const nextXml = xmlContent || (isArchChanged ? getDefaultXmlForArchitecture(architectureType) : null) || latest.xml_content;
      await pool.query(
        'UPDATE diagram_versions SET xml_content = $1, architecture_type = $2, business_usecase = $3 WHERE id = $4',
        [nextXml, nextArch, businessUseCase || latest.business_usecase, latest.id]
      );
    }
  } else {
    const db = getSqliteDb();
    const existingVers = db.prepare('SELECT id, version_number, architecture_type, xml_content, business_usecase FROM diagram_versions WHERE diagram_id = ? ORDER BY version_number DESC').all(diagramId) as any[];
    if (existingVers.length > 0) {
      const latest = existingVers[0];
      const nextArch = architectureType || latest.architecture_type;
      const isArchChanged = architectureType && architectureType !== latest.architecture_type;
      const nextXml = xmlContent || (isArchChanged ? getDefaultXmlForArchitecture(architectureType) : null) || latest.xml_content;
      const stmt = db.prepare('UPDATE diagram_versions SET xml_content = ?, architecture_type = ?, business_usecase = ? WHERE id = ?');
      stmt.run(nextXml, nextArch, businessUseCase || latest.business_usecase, latest.id);
    }
  }
}

// ==========================================
// USER & AUTHENTICATION DATABASE FUNCTIONS
// ==========================================

export async function createUser(
  email: string,
  passwordHash: string,
  salt: string,
  name?: string | null
): Promise<User> {
  await ensureTablesExist();
  const id = uuidv4();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `INSERT INTO users (id, email, password_hash, salt, name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, email.toLowerCase().trim(), passwordHash, salt, name || null]
    );
    return res.rows[0] as User;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `INSERT INTO users (id, email, password_hash, salt, name)
       VALUES (?, ?, ?, ?, ?)`
    );
    stmt.run(id, email.toLowerCase().trim(), passwordHash, salt, name || null);
    const getUser = db.prepare('SELECT * FROM users WHERE id = ?');
    return getUser.get(id) as unknown as User;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  await ensureTablesExist();
  const normalizedEmail = email.toLowerCase().trim();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM users WHERE LOWER(email) = $1', [normalizedEmail]);
    return (res.rows[0] as User) || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM users WHERE LOWER(email) = ?');
    const result = stmt.get(normalizedEmail);
    return (result as unknown as User) || null;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return (res.rows[0] as User) || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const result = stmt.get(id);
    return (result as unknown as User) || null;
  }
}

export async function updateUserProfile(id: string, name: string | null): Promise<User | null> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `UPDATE users 
       SET name = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [name, id]
    );
    return (res.rows[0] as User) || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `UPDATE users 
       SET name = ?, updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) 
       WHERE id = ?`
    );
    stmt.run(name, id);
    return getUserById(id);
  }
}

export async function updateUserPassword(id: string, passwordHash: string, salt: string): Promise<void> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(
      `UPDATE users 
       SET password_hash = $1, salt = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3`,
      [passwordHash, salt, id]
    );
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `UPDATE users 
       SET password_hash = ?, salt = ?, updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) 
       WHERE id = ?`
    );
    stmt.run(passwordHash, salt, id);
  }
}

export async function updateUserLastLogin(id: string): Promise<void> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(
      `UPDATE users 
       SET last_login_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [id]
    );
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `UPDATE users 
       SET last_login_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) 
       WHERE id = ?`
    );
    stmt.run(id);
  }
}

// Session Functions
export async function createSession(userId: string, expiresAt: Date): Promise<Session> {
  await ensureTablesExist();
  const id = uuidv4();
  const expiresStr = expiresAt.toISOString();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `INSERT INTO sessions (id, user_id, expires_at)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id, userId, expiresAt]
    );
    return res.rows[0] as Session;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `INSERT INTO sessions (id, user_id, expires_at)
       VALUES (?, ?, ?)`
    );
    stmt.run(id, userId, expiresStr);
    const getSess = db.prepare('SELECT * FROM sessions WHERE id = ?');
    return getSess.get(id) as unknown as Session;
  }
}

export async function getSession(sessionId: string): Promise<(Session & { user?: User }) | null> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `SELECT s.*, u.email, u.name, u.created_at as user_created_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.id = $1 AND s.expires_at > CURRENT_TIMESTAMP`,
      [sessionId]
    );
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      id: row.id,
      user_id: row.user_id,
      expires_at: row.expires_at,
      created_at: row.created_at,
      user: {
        id: row.user_id,
        email: row.email,
        name: row.name,
        password_hash: '',
        salt: '',
        created_at: row.user_created_at,
        updated_at: row.user_created_at,
        last_login_at: null,
      }
    };
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `SELECT s.*, u.email, u.name, u.created_at as user_created_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.id = ? AND s.expires_at > (strftime('%Y-%m-%d %H:%M:%f', 'now'))`
    );
    const row = stmt.get(sessionId) as any;
    if (!row) return null;
    return {
      id: row.id,
      user_id: row.user_id,
      expires_at: row.expires_at,
      created_at: row.created_at,
      user: {
        id: row.user_id,
        email: row.email,
        name: row.name,
        password_hash: '',
        salt: '',
        created_at: row.user_created_at,
        updated_at: row.user_created_at,
        last_login_at: null,
      }
    };
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query('DELETE FROM sessions WHERE id = $1', [sessionId]);
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('DELETE FROM sessions WHERE id = ?');
    stmt.run(sessionId);
  }
}

// User Logs Functions
export async function logUserEvent(
  userId: string,
  eventType: string,
  ipAddress?: string | null,
  userAgent?: string | null
): Promise<UserLog> {
  await ensureTablesExist();
  const id = uuidv4();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `INSERT INTO user_logs (id, user_id, event_type, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, userId, eventType, ipAddress || null, userAgent || null]
    );
    return res.rows[0] as UserLog;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `INSERT INTO user_logs (id, user_id, event_type, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?)`
    );
    stmt.run(id, userId, eventType, ipAddress || null, userAgent || null);
    const getLog = db.prepare('SELECT * FROM user_logs WHERE id = ?');
    return getLog.get(id) as unknown as UserLog;
  }
}

export async function getUserLogs(userId: string, limit: number = 50): Promise<UserLog[]> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      'SELECT * FROM user_logs WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
      [userId, limit]
    );
    return res.rows as UserLog[];
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM user_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT ?');
    return stmt.all(userId, limit) as unknown as UserLog[];
  }
}

// ==========================================
// ACCESS REQUESTS & COLLABORATOR DB FUNCTIONS
// ==========================================

export async function createAccessRequest(
  diagramId: string,
  requesterUserId: string,
  requestedRole: 'Viewer' | 'Editor',
  message?: string | null
): Promise<AccessRequest> {
  await ensureTablesExist();

  const existing = await getAccessRequestStatus(diagramId, requesterUserId);

  if (existing && existing.status === 'Pending') {
    const id = existing.id;
    if (isPostgres()) {
      const pool = getPgPool();
      const res = await pool.query(
        `UPDATE access_requests
         SET requested_role = $1, message = $2, updated_at = CURRENT_TIMESTAMP
         WHERE id = $3
         RETURNING *`,
        [requestedRole, message || null, id]
      );
      await logUserEvent(requesterUserId, 'ACCESS_REQUEST_UPDATED', null, `Diagram: ${diagramId}`);
      return res.rows[0] as AccessRequest;
    } else {
      const db = getSqliteDb();
      const stmt = db.prepare(
        `UPDATE access_requests
         SET requested_role = ?, message = ?, updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now'))
         WHERE id = ?`
      );
      stmt.run(requestedRole, message || null, id);
      await logUserEvent(requesterUserId, 'ACCESS_REQUEST_UPDATED', null, `Diagram: ${diagramId}`);
      const getReq = db.prepare('SELECT * FROM access_requests WHERE id = ?');
      return getReq.get(id) as unknown as AccessRequest;
    }
  }

  const id = uuidv4();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `INSERT INTO access_requests (id, diagram_id, requester_user_id, requested_role, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, diagramId, requesterUserId, requestedRole, message || null]
    );
    await logUserEvent(requesterUserId, 'ACCESS_REQUEST_CREATED', null, `Diagram: ${diagramId}`);
    return res.rows[0] as AccessRequest;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `INSERT INTO access_requests (id, diagram_id, requester_user_id, requested_role, message)
       VALUES (?, ?, ?, ?, ?)`
    );
    stmt.run(id, diagramId, requesterUserId, requestedRole, message || null);
    await logUserEvent(requesterUserId, 'ACCESS_REQUEST_CREATED', null, `Diagram: ${diagramId}`);
    const getReq = db.prepare('SELECT * FROM access_requests WHERE id = ?');
    return getReq.get(id) as unknown as AccessRequest;
  }
}

export async function getAccessRequestStatus(
  diagramId: string,
  requesterUserId: string
): Promise<AccessRequest | null> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      'SELECT * FROM access_requests WHERE diagram_id = $1 AND requester_user_id = $2 ORDER BY created_at DESC LIMIT 1',
      [diagramId, requesterUserId]
    );
    return (res.rows[0] as AccessRequest) || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      'SELECT * FROM access_requests WHERE diagram_id = ? AND requester_user_id = ? ORDER BY created_at DESC LIMIT 1'
    );
    const result = stmt.get(diagramId, requesterUserId);
    return (result as unknown as AccessRequest) || null;
  }
}

export async function getAccessRequestsForOwner(ownerUserId: string): Promise<AccessRequest[]> {
  await ensureTablesExist();

  const query = `
    SELECT ar.*, u.email as requester_email, u.name as requester_name, d.name as diagram_name
    FROM access_requests ar
    JOIN diagrams d ON d.id = ar.diagram_id
    JOIN users u ON u.id = ar.requester_user_id
    WHERE d.user_id = $1 AND ar.status = 'Pending'
    ORDER BY ar.created_at DESC
  `;

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(query, [ownerUserId]);
    return res.rows as AccessRequest[];
  } else {
    const db = getSqliteDb();
    const sqliteQuery = query.replace('$1', '?');
    const stmt = db.prepare(sqliteQuery);
    return stmt.all(ownerUserId) as unknown as AccessRequest[];
  }
}

export async function getUserAccessRequests(requesterUserId: string): Promise<AccessRequest[]> {
  await ensureTablesExist();

  const query = `
    SELECT ar.*, d.name as diagram_name
    FROM access_requests ar
    JOIN diagrams d ON d.id = ar.diagram_id
    WHERE ar.requester_user_id = $1
    ORDER BY ar.created_at DESC
  `;

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(query, [requesterUserId]);
    return res.rows as AccessRequest[];
  } else {
    const db = getSqliteDb();
    const sqliteQuery = query.replace('$1', '?');
    const stmt = db.prepare(sqliteQuery);
    return stmt.all(requesterUserId) as unknown as AccessRequest[];
  }
}

export async function resolveAccessRequest(
  requestId: string,
  ownerUserId: string,
  status: 'Approved' | 'Denied'
): Promise<AccessRequest> {
  await ensureTablesExist();

  let reqRecord: (AccessRequest & { diagram_user_id?: string }) | null = null;
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `SELECT ar.*, d.user_id as diagram_user_id 
       FROM access_requests ar 
       JOIN diagrams d ON d.id = ar.diagram_id 
       WHERE ar.id = $1`,
      [requestId]
    );
    reqRecord = res.rows[0] || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `SELECT ar.*, d.user_id as diagram_user_id 
       FROM access_requests ar 
       JOIN diagrams d ON d.id = ar.diagram_id 
       WHERE ar.id = ?`
    );
    reqRecord = (stmt.get(requestId) as any) || null;
  }

  if (!reqRecord) {
    throw new Error('Access request not found.');
  }

  if (reqRecord.diagram_user_id && reqRecord.diagram_user_id !== ownerUserId) {
    throw new Error('Unauthorized: You are not the owner of this architecture diagram.');
  }

  if (isPostgres()) {
    const pool = getPgPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(
        `UPDATE access_requests
         SET status = $1, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2`,
        [status, requestId]
      );

      if (status === 'Approved') {
        const collabId = uuidv4();
        await client.query(
          `INSERT INTO diagram_collaborators (id, diagram_id, user_id, access_level)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (diagram_id, user_id) 
           DO UPDATE SET access_level = $4`,
          [collabId, reqRecord.diagram_id, reqRecord.requester_user_id, reqRecord.requested_role]
        );
      }
      await client.query('COMMIT');

      await logUserEvent(
        ownerUserId,
        `ACCESS_REQUEST_${status.toUpperCase()}`,
        null,
        `Request ID: ${requestId}, Requester: ${reqRecord.requester_user_id}`
      );

      const updatedRes = await pool.query('SELECT * FROM access_requests WHERE id = $1', [requestId]);
      return updatedRes.rows[0] as AccessRequest;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } else {
    return await runSqliteTransaction(async (db) => {
      const updateStmt = db.prepare(
        `UPDATE access_requests
         SET status = ?, updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now'))
         WHERE id = ?`
      );
      updateStmt.run(status, requestId);

      if (status === 'Approved') {
        const collabId = uuidv4();
        const collabStmt = db.prepare(
          `INSERT INTO diagram_collaborators (id, diagram_id, user_id, access_level)
           VALUES (?, ?, ?, ?)
           ON CONFLICT(diagram_id, user_id)
           DO UPDATE SET access_level = excluded.access_level`
        );
        collabStmt.run(collabId, reqRecord.diagram_id, reqRecord.requester_user_id, reqRecord.requested_role);
      }

      await logUserEvent(
        ownerUserId,
        `ACCESS_REQUEST_${status.toUpperCase()}`,
        null,
        `Request ID: ${requestId}, Requester: ${reqRecord.requester_user_id}`
      );

      const getReq = db.prepare('SELECT * FROM access_requests WHERE id = ?');
      return getReq.get(requestId) as unknown as AccessRequest;
    });
  }
}

// ==========================================
// AI DIAGRAM FEEDBACK & CURATION FUNCTIONS
// ==========================================

export async function submitDiagramFeedback(
  diagramId: string,
  versionId: string | null,
  userId: string,
  rating: 'thumbs_up' | 'thumbs_down' | 'neutral',
  feedbackTags: string[],
  freeTextComment?: string | null
): Promise<DiagramFeedback> {
  await ensureTablesExist();

  // Mandatory Validation for Thumbs Down
  if (rating === 'thumbs_down') {
    const hasTags = Array.isArray(feedbackTags) && feedbackTags.length > 0;
    const hasComment = typeof freeTextComment === 'string' && freeTextComment.trim().length > 0;
    if (!hasTags && !hasComment) {
      throw new Error('For negative feedback (thumbs_down), at least one issue tag or comment is required.');
    }
  }

  const id = uuidv4();
  const tagsJson = JSON.stringify(feedbackTags || []);
  const comment = freeTextComment ? freeTextComment.trim() : null;

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `INSERT INTO diagram_feedback (id, diagram_id, version_id, user_id, rating, feedback_tags, free_text_comment)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, diagramId, versionId || null, userId, rating, tagsJson, comment]
    );
    await logUserEvent(userId, 'DIAGRAM_FEEDBACK_SUBMITTED', null, `Rating: ${rating}, Diagram: ${diagramId}`);
    const row = res.rows[0];
    return {
      ...row,
      feedback_tags: JSON.parse(row.feedback_tags || '[]'),
    };
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `INSERT INTO diagram_feedback (id, diagram_id, version_id, user_id, rating, feedback_tags, free_text_comment)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    stmt.run(id, diagramId, versionId || null, userId, rating, tagsJson, comment);
    await logUserEvent(userId, 'DIAGRAM_FEEDBACK_SUBMITTED', null, `Rating: ${rating}, Diagram: ${diagramId}`);
    
    const getFb = db.prepare('SELECT * FROM diagram_feedback WHERE id = ?');
    const row = getFb.get(id) as any;
    return {
      ...row,
      feedback_tags: JSON.parse(row.feedback_tags || '[]'),
    };
  }
}

export async function getFeedbackCurationData(): Promise<{
  totalCount: number;
  ratingBreakdown: { thumbs_up: number; thumbs_down: number; neutral: number };
  topPositiveTags: Record<string, number>;
  topFailureTags: Record<string, number>;
  recentComments: { rating: string; comment: string; createdAt: string; diagramId: string }[];
}> {
  await ensureTablesExist();

  let rows: any[] = [];
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM v_feedback_curation');
    rows = res.rows;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM v_feedback_curation');
    rows = stmt.all() as any[];
  }

  const ratingBreakdown = { thumbs_up: 0, thumbs_down: 0, neutral: 0 };
  const topPositiveTags: Record<string, number> = {};
  const topFailureTags: Record<string, number> = {};
  const recentComments: { rating: string; comment: string; createdAt: string; diagramId: string }[] = [];

  for (const row of rows) {
    const r = row.rating as 'thumbs_up' | 'thumbs_down' | 'neutral';
    if (ratingBreakdown[r] !== undefined) {
      ratingBreakdown[r]++;
    }

    let tags: string[] = [];
    try {
      tags = typeof row.feedback_tags === 'string' ? JSON.parse(row.feedback_tags) : (row.feedback_tags || []);
    } catch {
      tags = [];
    }

    if (r === 'thumbs_up') {
      tags.forEach((tag) => {
        topPositiveTags[tag] = (topPositiveTags[tag] || 0) + 1;
      });
    } else if (r === 'thumbs_down') {
      tags.forEach((tag) => {
        topFailureTags[tag] = (topFailureTags[tag] || 0) + 1;
      });
    }

    if (row.free_text_comment && row.free_text_comment.trim().length > 0) {
      recentComments.push({
        rating: row.rating,
        comment: row.free_text_comment,
        createdAt: row.created_at,
        diagramId: row.diagram_id,
      });
    }
  }

  return {
    totalCount: rows.length,
    ratingBreakdown,
    topPositiveTags,
    topFailureTags,
    recentComments: recentComments.slice(0, 30),
  };
}

// ==========================================
// CONTACT US FORM FUNCTIONS
// ==========================================

export async function submitContactForm(
  name: string,
  email: string,
  reason: string,
  message: string,
  userId?: string | null
): Promise<ContactSubmission> {
  await ensureTablesExist();

  if (!name || !name.trim()) throw new Error('Name is required.');
  if (!email || !email.trim()) throw new Error('Email is required.');
  if (!reason || !reason.trim()) throw new Error('Reason for contact is required.');
  if (!message || !message.trim()) throw new Error('Message is required.');

  const id = uuidv4();
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedReason = reason.trim();
  const trimmedMessage = message.trim();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `INSERT INTO contact_submissions (id, name, email, reason, message, user_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, trimmedName, trimmedEmail, trimmedReason, trimmedMessage, userId || null]
    );
    if (userId) {
      await logUserEvent(userId, 'CONTACT_FORM_SUBMITTED', null, `Reason: ${trimmedReason}`);
    }
    return res.rows[0] as ContactSubmission;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `INSERT INTO contact_submissions (id, name, email, reason, message, user_id)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    stmt.run(id, trimmedName, trimmedEmail, trimmedReason, trimmedMessage, userId || null);
    if (userId) {
      await logUserEvent(userId, 'CONTACT_FORM_SUBMITTED', null, `Reason: ${trimmedReason}`);
    }
    const getStmt = db.prepare('SELECT * FROM contact_submissions WHERE id = ?');
    return getStmt.get(id) as unknown as ContactSubmission;
  }
}


// Helper: Sync complete database diagrams and versions
export async function syncDatabase(
  diagrams: Diagram[],
  versions: DiagramVersion[]
): Promise<void> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM diagram_versions');
      await client.query('DELETE FROM diagrams');

      for (const diag of diagrams) {
        await client.query(
          'INSERT INTO diagrams (id, name, created_at, updated_at) VALUES ($1, $2, $3, $4)',
          [diag.id, diag.name, diag.created_at, diag.updated_at]
        );
      }

      for (const ver of versions) {
        await client.query(
          `INSERT INTO diagram_versions (
            id, diagram_id, version_number, xml_content, comment, created_by, created_at, prompt, ai_reasoning, business_usecase, technical_usecase
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            ver.id,
            ver.diagram_id,
            ver.version_number,
            ver.xml_content,
            ver.comment,
            ver.created_by,
            ver.created_at,
            ver.prompt || null,
            ver.ai_reasoning || null,
            ver.business_usecase || null,
            ver.technical_usecase || null
          ]
        );
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Failed to sync database in PostgreSQL:', error);
      throw error;
    } finally {
      client.release();
    }
  } else {
    await runSqliteTransaction((db) => {
      db.exec('DELETE FROM diagram_versions;');
      db.exec('DELETE FROM diagrams;');

      const insertDiag = db.prepare(
        'INSERT INTO diagrams (id, name, created_at, updated_at) VALUES (?, ?, ?, ?)'
      );
      for (const diag of diagrams) {
        insertDiag.run(diag.id, diag.name, diag.created_at as string, diag.updated_at as string);
      }

      const insertVer = db.prepare(
        `INSERT INTO diagram_versions (
          id, diagram_id, version_number, xml_content, comment, created_by, created_at, prompt, ai_reasoning, business_usecase, technical_usecase
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      for (const ver of versions) {
        insertVer.run(
          ver.id,
          ver.diagram_id,
          ver.version_number,
          ver.xml_content,
          ver.comment,
          ver.created_by,
          ver.created_at as string,
          ver.prompt || null,
          ver.ai_reasoning || null,
          ver.business_usecase || null,
          ver.technical_usecase || null
        );
      }
    });
  }
}

// Helper: Update a diagram version's business and technical use cases
export async function updateDiagramVersionUseCases(
  versionId: string,
  businessUsecase: string,
  technicalUsecase: string
): Promise<void> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(
      'UPDATE diagram_versions SET business_usecase = $1, technical_usecase = $2 WHERE id = $3',
      [businessUsecase, technicalUsecase, versionId]
    );
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      'UPDATE diagram_versions SET business_usecase = ?, technical_usecase = ? WHERE id = ?'
    );
    stmt.run(businessUsecase, technicalUsecase, versionId);
  }
}



const AWS_VPC_XML = `
<mxfile host="embed.diagrams.net">
  <diagram id="aws_vpc" name="AWS VPC SecureNetwork">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1100" pageHeight="850">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="alb" value="&lt;b&gt;[1] Application Load Balancer&lt;/b&gt;&lt;br&gt;&lt;i&gt;Ingress traffic routing&lt;/i&gt;" style="rounded=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="150" y="300" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="asg" value="&lt;b&gt;[2] Autoscaling Group (EC2)&lt;/b&gt;&lt;br&gt;&lt;i&gt;Private Subnet Compute&lt;/i&gt;" style="rounded=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="300" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="rds" value="&lt;b&gt;[3] Amazon RDS (PostgreSQL)&lt;/b&gt;&lt;br&gt;&lt;i&gt;Master-Replica Database&lt;/i&gt;" style="shape=cylinder;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="800" y="290" width="180" height="90" as="geometry" />
        </mxCell>
        <mxCell id="edge1" value="HTTPS" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#567c73;" edge="1" parent="1" source="alb" target="asg"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="edge2" value="SQL Query" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#567c73;" edge="1" parent="1" source="asg" target="rds"><mxGeometry relative="1" as="geometry" /></mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();

const GCP_ANALYTICS_XML = `
<mxfile host="embed.diagrams.net">
  <diagram id="gcp_analytics" name="GCP Streaming Analytics">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1100" pageHeight="850">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="pubsub" value="&lt;b&gt;[1] Google Pub/Sub&lt;/b&gt;&lt;br&gt;&lt;i&gt;Ingest streaming metrics&lt;/i&gt;" style="rounded=1;fillColor=#E1D5E7;strokeColor=#9673A6;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="100" y="250" width="200" height="70" as="geometry" />
        </mxCell>
        <mxCell id="dataflow" value="&lt;b&gt;[2] Cloud Dataflow&lt;/b&gt;&lt;br&gt;&lt;i&gt;Apache Beam ETL pipeline&lt;/i&gt;" style="rounded=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="380" y="250" width="210" height="70" as="geometry" />
        </mxCell>
        <mxCell id="bq" value="&lt;b&gt;[3] Google BigQuery&lt;/b&gt;&lt;br&gt;&lt;i&gt;Enterprise Data Warehouse&lt;/i&gt;" style="shape=cylinder;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="670" y="240" width="180" height="90" as="geometry" />
        </mxCell>
        <mxCell id="looker" value="&lt;b&gt;[4] Looker Dashboard&lt;/b&gt;&lt;br&gt;&lt;i&gt;Analytics Visualizer&lt;/i&gt;" style="rounded=1;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="920" y="250" width="160" height="70" as="geometry" />
        </mxCell>
        <mxCell id="e1" value="Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="pubsub" target="dataflow"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" value="Insert" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="dataflow" target="bq"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" value="Query" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;dashed=1;" edge="1" parent="1" source="looker" target="bq"><mxGeometry relative="1" as="geometry" /></mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();

const CICD_PIPELINE_XML = `
<mxfile host="embed.diagrams.net">
  <diagram id="cicd_pipeline" name="DevOps CI/CD Deployment">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1200" pageHeight="900">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="github" value="&lt;b&gt;[1] GitHub Repository&lt;/b&gt;&lt;br&gt;&lt;i&gt;Source code trigger&lt;/i&gt;" style="rounded=1;fillColor=#F5F5F5;strokeColor=#666666;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="80" y="200" width="180" height="70" as="geometry" />
        </mxCell>
        <mxCell id="runner" value="&lt;b&gt;[2] GitHub Actions Runner&lt;/b&gt;&lt;br&gt;&lt;i&gt;Build &amp; unit tests execution&lt;/i&gt;" style="rounded=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="340" y="200" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="registry" value="&lt;b&gt;[3] Artifact Registry&lt;/b&gt;&lt;br&gt;&lt;i&gt;Docker images versioning&lt;/i&gt;" style="rounded=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="630" y="200" width="200" height="70" as="geometry" />
        </mxCell>
        <mxCell id="eks" value="&lt;b&gt;[4] AWS EKS (Kubernetes)&lt;/b&gt;&lt;br&gt;&lt;i&gt;Production Cluster Deployment&lt;/i&gt;" style="rounded=1;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="910" y="195" width="220" height="80" as="geometry" />
        </mxCell>
        <mxCell id="e1" value="Commit Push" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="github" target="runner"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" value="Push Container" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="runner" target="registry"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" value="Helm Deploy" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="registry" target="eks"><mxGeometry relative="1" as="geometry" /></mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();

const AI_RAG_XML = getDefaultXmlForArchitecture('agentic_rag') || '';

async function seedDiagram(name: string, xml: string, comment: string, prompt: string) {
  const diagramId = uuidv4();
  const versionId = uuidv4();

  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query('INSERT INTO diagrams (id, name) VALUES ($1, $2)', [diagramId, name]);
    await pool.query(`
      INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [versionId, diagramId, 1, xml, comment, 'AI', prompt]);
  } else {
    const db = getSqliteDb();
    db.prepare('INSERT INTO diagrams (id, name) VALUES (?, ?)').run(diagramId, name);
    db.prepare(`
      INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(versionId, diagramId, 1, xml, comment, 'AI', prompt);
  }
}

const GEMINI_ENTERPRISE_XML = `
<mxfile host="embed.diagrams.net">
  <diagram id="gemini_enterprise" name="Gemini Enterprise Application">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1200" pageHeight="900">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="client" value="&lt;b&gt;[1] Enterprise Web Client&lt;/b&gt;&lt;br&gt;&lt;i&gt;SSO Authenticated portal&lt;/i&gt;" style="rounded=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="60" y="250" width="180" height="70" as="geometry" />
        </mxCell>
        <mxCell id="gateway" value="&lt;b&gt;[2] Enterprise Gateway &amp; WAF&lt;/b&gt;&lt;br&gt;&lt;i&gt;PII Scrubbing &amp; guardrails&lt;/i&gt;" style="rounded=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="320" y="250" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="gemini_llm" value="&lt;b&gt;[3] Gemini Ultra Model API&lt;/b&gt;&lt;br&gt;&lt;i&gt;Context caching enabled&lt;/i&gt;" style="rounded=1;fillColor=#E1D5E7;strokeColor=#9673A6;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="620" y="250" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="rag_store" value="&lt;b&gt;[4] Vector RAG &amp; Cache&lt;/b&gt;&lt;br&gt;&lt;i&gt;Redis Enterprise Store&lt;/i&gt;" style="shape=cylinder;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="920" y="240" width="180" height="90" as="geometry" />
        </mxCell>
        <mxCell id="e1" value="HTTPS API" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="client" target="gateway"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" value="Route Prompt" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="gateway" target="gemini_llm"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" value="Grounding Query" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="gemini_llm" target="rag_store"><mxGeometry relative="1" as="geometry" /></mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();

const NOTEBOOK_LM_XML = `
<mxfile host="embed.diagrams.net">
  <diagram id="notebook_lm" name="NotebookLM Document Workspace">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1300" pageHeight="900">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="sources" value="&lt;b&gt;[1] Multi-Source Uploader&lt;/b&gt;&lt;br&gt;&lt;i&gt;PDFs, URLs, Slides ingestion&lt;/i&gt;" style="rounded=1;fillColor=#F5F5F5;strokeColor=#666666;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="250" width="200" height="70" as="geometry" />
        </mxCell>
        <mxCell id="chunker" value="&lt;b&gt;[2] Chunking &amp; Embeddings&lt;/b&gt;&lt;br&gt;&lt;i&gt;Semantic clustering engine&lt;/i&gt;" style="rounded=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="320" y="250" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="vectors" value="&lt;b&gt;[3] Vector Storage&lt;/b&gt;&lt;br&gt;&lt;i&gt;Hierarchical source indexes&lt;/i&gt;" style="shape=cylinder;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="610" y="240" width="180" height="90" as="geometry" />
        </mxCell>
        <mxCell id="podcast" value="&lt;b&gt;[4] Audio Overview Gen&lt;/b&gt;&lt;br&gt;&lt;i&gt;Text-To-Speech Deep Speaker&lt;/i&gt;" style="rounded=1;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="880" y="250" width="200" height="70" as="geometry" />
        </mxCell>
        <mxCell id="e1" value="Upload" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="sources" target="chunker"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" value="Store Index" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="chunker" target="vectors"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" value="Generate Podcast" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="vectors" target="podcast"><mxGeometry relative="1" as="geometry" /></mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();

const AGENT_DESIGNER_XML = `
<mxfile host="embed.diagrams.net">
  <diagram id="agent_designer" name="Multi-Agent Design Orchestrator">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1300" pageHeight="950">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="designer" value="&lt;b&gt;[1] Agentic UI Canvas&lt;/b&gt;&lt;br&gt;&lt;i&gt;Visual workflow editor&lt;/i&gt;" style="rounded=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="60" y="280" width="180" height="70" as="geometry" />
        </mxCell>
        <mxCell id="orchestrator" value="&lt;b&gt;[2] Router Orchestrator&lt;/b&gt;&lt;br&gt;&lt;i&gt;Goal decomp &amp; delegation&lt;/i&gt;" style="rounded=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="320" y="280" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="code_agent" value="&lt;b&gt;[3] Code Sandbox Agent&lt;/b&gt;&lt;br&gt;&lt;i&gt;Safe execution environment&lt;/i&gt;" style="rounded=1;fillColor=#E1D5E7;strokeColor=#9673A6;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="620" y="200" width="200" height="70" as="geometry" />
        </mxCell>
        <mxCell id="eval_agent" value="&lt;b&gt;[4] Critic &amp; Validator Agent&lt;/b&gt;&lt;br&gt;&lt;i&gt;Self-reflection E2E checks&lt;/i&gt;" style="rounded=1;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="620" y="360" width="200" height="70" as="geometry" />
        </mxCell>
        <mxCell id="memory" value="&lt;b&gt;[5] Short-term Ephemeral Memory&lt;/b&gt;&lt;br&gt;&lt;i&gt;Shared workspace context&lt;/i&gt;" style="shape=cylinder;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="910" y="270" width="200" height="90" as="geometry" />
        </mxCell>
        <mxCell id="e1" value="Deploy Prompt" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="designer" target="orchestrator"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" value="Delegate Task" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="orchestrator" target="code_agent"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" value="Request Review" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="code_agent" target="eval_agent"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e4" value="Commit Logs" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="eval_agent" target="memory"><mxGeometry relative="1" as="geometry" /></mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();

const DEEP_RESEARCH_XML = `
<mxfile host="embed.diagrams.net">
  <diagram id="deep_research" name="Deep Research Agent Pipeline">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1300" pageHeight="950">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="trigger" value="&lt;b&gt;[1] Query Trigger Input&lt;/b&gt;&lt;br&gt;&lt;i&gt;High-level prompt topic&lt;/i&gt;" style="rounded=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="60" y="250" width="180" height="70" as="geometry" />
        </mxCell>
        <mxCell id="searcher" value="&lt;b&gt;[2] Search &amp; Web Scrapers&lt;/b&gt;&lt;br&gt;&lt;i&gt;Recursive sub-queries engine&lt;/i&gt;" style="rounded=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="320" y="250" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="evaluator" value="&lt;b&gt;[3] Source Quality Evaluator&lt;/b&gt;&lt;br&gt;&lt;i&gt;Cross-references &amp; factual scoring&lt;/i&gt;" style="rounded=1;fillColor=#E1D5E7;strokeColor=#9673A6;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="620" y="250" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="summarizer" value="&lt;b&gt;[4] Markdown Synthesis Gen&lt;/b&gt;&lt;br&gt;&lt;i&gt;Structured consensus report&lt;/i&gt;" style="shape=cylinder;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="920" y="240" width="190" height="90" as="geometry" />
        </mxCell>
        <mxCell id="e1" value="Initiate Research" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="trigger" target="searcher"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" value="Fetch Results" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="searcher" target="evaluator"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" value="Compile report" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="evaluator" target="summarizer"><mxGeometry relative="1" as="geometry" /></mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();

// ==========================================
// MULTI-TENANT WORKSPACE & AUTHORIZATION WATERFALL
// ==========================================

export function isUserSuperAdmin(user?: User | null): boolean {
  if (!user) return false;
  if (Boolean(user.is_super_admin)) return true;
  if (user.global_role === 'Super-Admin') return true;
  const rootEmail = process.env.ROOT_USER_EMAIL?.trim().toLowerCase();
  if (rootEmail && user.email.toLowerCase() === rootEmail) {
    return true;
  }
  return false;
}

export async function ensureUserPersonalWorkspace(userId: string, userEmail: string): Promise<Workspace> {
  await ensureTablesExist();

  if (isPostgres()) {
    const pool = getPgPool();
    const checkRes = await pool.query(
      `SELECT * FROM workspaces WHERE owner_id = $1 AND name = 'Personal Workspace' LIMIT 1`,
      [userId]
    );
    if (checkRes.rows.length > 0) {
      return checkRes.rows[0] as Workspace;
    }

    const wsId = `ws_${uuidv4().slice(0, 8)}`;
    const wsRes = await pool.query(
      `INSERT INTO workspaces (id, name, owner_id) VALUES ($1, $2, $3) RETURNING *`,
      [wsId, 'Personal Workspace', userId]
    );
    const ws = wsRes.rows[0] as Workspace;

    const memId = uuidv4();
    await pool.query(
      `INSERT INTO workspace_members (id, workspace_id, user_id, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (workspace_id, user_id) DO UPDATE SET role = $4`,
      [memId, wsId, userId, 'Owner']
    );

    return ws;
  } else {
    const db = getSqliteDb();
    const checkStmt = db.prepare(`SELECT * FROM workspaces WHERE owner_id = ? AND name = 'Personal Workspace' LIMIT 1`);
    const existing = checkStmt.get(userId) as any;
    if (existing) return existing as Workspace;

    const wsId = `ws_${uuidv4().slice(0, 8)}`;
    const insertWs = db.prepare(`INSERT INTO workspaces (id, name, owner_id) VALUES (?, ?, ?)`);
    insertWs.run(wsId, 'Personal Workspace', userId);

    const memId = uuidv4();
    const insertMem = db.prepare(`INSERT INTO workspace_members (id, workspace_id, user_id, role) VALUES (?, ?, ?, ?)`);
    insertMem.run(memId, wsId, userId, 'Owner');

    const getWs = db.prepare(`SELECT * FROM workspaces WHERE id = ?`);
    return getWs.get(wsId) as unknown as Workspace;
  }
}

export async function getWorkspaceUserRole(
  workspaceId: string,
  userId: string
): Promise<'Owner' | 'Admin' | 'Editor' | 'Viewer' | null> {
  await ensureTablesExist();

  const user = await getUserById(userId);
  if (isUserSuperAdmin(user)) {
    return 'Owner';
  }

  if (isPostgres()) {
    const pool = getPgPool();
    const memRes = await pool.query(
      `SELECT role FROM workspace_members WHERE workspace_id = $1 AND user_id = $2`,
      [workspaceId, userId]
    );
    if (memRes.rows.length > 0) {
      return memRes.rows[0].role as 'Owner' | 'Admin' | 'Editor' | 'Viewer';
    }

    const wsRes = await pool.query(`SELECT owner_id FROM workspaces WHERE id = $1`, [workspaceId]);
    if (wsRes.rows.length > 0 && wsRes.rows[0].owner_id === userId) {
      return 'Owner';
    }
    return null;
  } else {
    const db = getSqliteDb();
    const memStmt = db.prepare(`SELECT role FROM workspace_members WHERE workspace_id = ? AND user_id = ?`);
    const mem = memStmt.get(workspaceId, userId) as any;
    if (mem) return mem.role;

    const wsStmt = db.prepare(`SELECT owner_id FROM workspaces WHERE id = ?`);
    const ws = wsStmt.get(workspaceId) as any;
    if (ws && ws.owner_id === userId) return 'Owner';
    return null;
  }
}

export async function canUserAccessWorkspace(
  workspaceId: string,
  userId: string,
  requiredPermission: 'read' | 'write' | 'admin' = 'read'
): Promise<boolean> {
  const role = await getWorkspaceUserRole(workspaceId, userId);
  if (!role) return false;

  if (requiredPermission === 'read') return ['Owner', 'Admin', 'Editor', 'Viewer'].includes(role);
  if (requiredPermission === 'write') return ['Owner', 'Admin', 'Editor'].includes(role);
  if (requiredPermission === 'admin') return ['Owner', 'Admin'].includes(role);
  return false;
}

export async function getUserWorkspaces(userId: string): Promise<{
  personalWorkspace: Workspace;
  sharedWorkspaces: Workspace[];
  allWorkspaces: Workspace[];
}> {
  await ensureTablesExist();

  const user = await getUserById(userId);
  const personalWorkspace = await ensureUserPersonalWorkspace(userId, user?.email || '');

  let rawWorkspaces: (Workspace & { user_role?: string; member_count?: number })[] = [];

  if (isUserSuperAdmin(user)) {
    if (isPostgres()) {
      const pool = getPgPool();
      const res = await pool.query(`SELECT * FROM workspaces ORDER BY created_at ASC`);
      rawWorkspaces = res.rows.map(w => ({ ...w, user_role: 'Owner' }));
    } else {
      const db = getSqliteDb();
      const stmt = db.prepare(`SELECT * FROM workspaces ORDER BY created_at ASC`);
      rawWorkspaces = (stmt.all() as any[]).map(w => ({ ...w, user_role: 'Owner' }));
    }
  } else if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `SELECT DISTINCT w.*, wm.role as user_role
       FROM workspaces w
       LEFT JOIN workspace_members wm ON w.id = wm.workspace_id
       WHERE w.owner_id = $1 OR wm.user_id = $1
       ORDER BY w.created_at ASC`,
      [userId]
    );
    rawWorkspaces = res.rows;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `SELECT DISTINCT w.*, wm.role as user_role
       FROM workspaces w
       LEFT JOIN workspace_members wm ON w.id = wm.workspace_id
       WHERE w.owner_id = ? OR wm.user_id = ?
       ORDER BY w.created_at ASC`
    );
    rawWorkspaces = stmt.all(userId, userId) as any[];
  }

  const seenIds = new Set<string>();
  const uniqueWorkspaces: Workspace[] = [];

  for (const w of rawWorkspaces) {
    if (!seenIds.has(w.id)) {
      seenIds.add(w.id);
      uniqueWorkspaces.push({
        ...w,
        user_role: (w.owner_id === userId ? 'Owner' : w.user_role || 'Viewer') as any,
      });
    }
  }

  const sharedWorkspaces = uniqueWorkspaces.filter(
    (w) => w.id !== personalWorkspace.id
  );

  return {
    personalWorkspace,
    sharedWorkspaces,
    allWorkspaces: uniqueWorkspaces,
  };
}

export async function createTeamWorkspace(name: string, ownerId: string): Promise<Workspace> {
  await ensureTablesExist();
  const wsId = `ws_${uuidv4().slice(0, 8)}`;
  const trimmedName = name.trim();

  if (isPostgres()) {
    const pool = getPgPool();
    const wsRes = await pool.query(
      `INSERT INTO workspaces (id, name, owner_id) VALUES ($1, $2, $3) RETURNING *`,
      [wsId, trimmedName, ownerId]
    );
    const memId = uuidv4();
    await pool.query(
      `INSERT INTO workspace_members (id, workspace_id, user_id, role) VALUES ($1, $2, $3, $4)`,
      [memId, wsId, ownerId, 'Owner']
    );
    return wsRes.rows[0] as Workspace;
  } else {
    const db = getSqliteDb();
    const insertWs = db.prepare(`INSERT INTO workspaces (id, name, owner_id) VALUES (?, ?, ?)`);
    insertWs.run(wsId, trimmedName, ownerId);

    const memId = uuidv4();
    const insertMem = db.prepare(`INSERT INTO workspace_members (id, workspace_id, user_id, role) VALUES (?, ?, ?, ?)`);
    insertMem.run(memId, wsId, ownerId, 'Owner');

    const getWs = db.prepare(`SELECT * FROM workspaces WHERE id = ?`);
    return getWs.get(wsId) as unknown as Workspace;
  }
}

export async function inviteWorkspaceMember(
  workspaceId: string,
  targetEmail: string,
  role: 'Editor' | 'Viewer',
  inviterUserId: string
): Promise<WorkspaceMember> {
  await ensureTablesExist();

  const canInvite = await canUserAccessWorkspace(workspaceId, inviterUserId, 'admin');
  if (!canInvite) {
    throw new Error('Unauthorized. Only workspace Owners and Admins can invite team members.');
  }

  const targetUser = await getUserByEmail(targetEmail.trim());
  if (!targetUser) {
    throw new Error(`User with email "${targetEmail}" is not registered on PromptCanvas yet.`);
  }

  const memId = uuidv4();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `INSERT INTO workspace_members (id, workspace_id, user_id, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (workspace_id, user_id) DO UPDATE SET role = $4
       RETURNING *`,
      [memId, workspaceId, targetUser.id, role]
    );
    await logUserEvent(inviterUserId, 'WORKSPACE_MEMBER_INVITED', null, `Target: ${targetUser.id}, Role: ${role}`);
    return {
      ...res.rows[0],
      user_email: targetUser.email,
      user_name: targetUser.name,
    };
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `INSERT INTO workspace_members (id, workspace_id, user_id, role)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(workspace_id, user_id) DO UPDATE SET role = excluded.role`
    );
    stmt.run(memId, workspaceId, targetUser.id, role);
    await logUserEvent(inviterUserId, 'WORKSPACE_MEMBER_INVITED', null, `Target: ${targetUser.id}, Role: ${role}`);
    
    const getMem = db.prepare(`SELECT * FROM workspace_members WHERE workspace_id = ? AND user_id = ?`);
    const row = getMem.get(workspaceId, targetUser.id) as any;
    return {
      ...row,
      user_email: targetUser.email,
      user_name: targetUser.name,
    };
  }
}

export async function createMagicLinkToken(email: string): Promise<string> {
  await ensureTablesExist();
  const token = uuidv4();
  const id = uuidv4();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(
      `INSERT INTO magic_link_tokens (id, email, token, expires_at) VALUES ($1, $2, $3, $4)`,
      [id, email.toLowerCase().trim(), token, expiresAt]
    );
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(`INSERT INTO magic_link_tokens (id, email, token, expires_at) VALUES (?, ?, ?, ?)`);
    stmt.run(id, email.toLowerCase().trim(), token, expiresAt.toISOString());
  }

  return token;
}

export async function verifyMagicLinkToken(token: string): Promise<string> {
  await ensureTablesExist();
  let email = '';

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `SELECT * FROM magic_link_tokens WHERE token = $1 AND expires_at > CURRENT_TIMESTAMP`,
      [token]
    );
    if (res.rows.length === 0) {
      throw new Error('Magic link is invalid or has expired. Please request a new link.');
    }
    email = res.rows[0].email;
    await pool.query(`DELETE FROM magic_link_tokens WHERE token = $1`, [token]);
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(`SELECT * FROM magic_link_tokens WHERE token = ? AND expires_at > (strftime('%Y-%m-%d %H:%M:%f', 'now'))`);
    const row = stmt.get(token) as any;
    if (!row) {
      throw new Error('Magic link is invalid or has expired. Please request a new link.');
    }
    email = row.email;
    const delStmt = db.prepare(`DELETE FROM magic_link_tokens WHERE token = ?`);
    delStmt.run(token);
  }

  return email;
}

export async function getSuperAdminAllUsers(): Promise<User[]> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(`SELECT id, email, name, global_role, is_super_admin, created_at, last_login_at FROM users ORDER BY created_at DESC`);
    return res.rows as User[];
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(`SELECT id, email, name, global_role, is_super_admin, created_at, last_login_at FROM users ORDER BY created_at DESC`);
    return stmt.all() as unknown as User[];
  }
}

export async function updateUserGlobalRole(
  userId: string,
  newRole: 'Super-Admin' | 'Author' | 'Member'
): Promise<User> {
  await ensureTablesExist();
  const isSuper = newRole === 'Super-Admin';

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `UPDATE users SET global_role = $1, is_super_admin = $2 WHERE id = $3 RETURNING *`,
      [newRole, isSuper, userId]
    );
    return res.rows[0] as User;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(`UPDATE users SET global_role = ?, is_super_admin = ? WHERE id = ?`);
    stmt.run(newRole, isSuper ? 1 : 0, userId);
    return getUserById(userId) as Promise<User>;
  }
}

// Audit Report Persistence Helpers
export async function saveAuditReport({
  diagramId,
  versionNumber,
  auditCategory = 'security',
  score,
  report,
  gaps,
}: {
  diagramId: string;
  versionNumber: number;
  auditCategory?: string;
  score: number;
  report: string;
  gaps: any[];
}): Promise<AuditReport> {
  await ensureTablesExist();
  const id = uuidv4();
  const gapsJson = JSON.stringify(gaps);

  if (isPostgres()) {
    const pool = getPgPool();
    try {
      await pool.query(`ALTER TABLE audit_reports ADD COLUMN IF NOT EXISTS audit_category TEXT DEFAULT 'security';`);
    } catch {}
    const res = await pool.query(
      `INSERT INTO audit_reports (id, diagram_id, version_number, audit_category, score, report, gaps)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, diagramId, versionNumber, auditCategory, score, report, gapsJson]
    );
    return res.rows[0];
  } else {
    const db = getSqliteDb();
    try {
      const cols = db.prepare(`PRAGMA table_info(audit_reports)`).all() as any[];
      if (!cols.some(c => c.name === 'audit_category')) {
        db.exec(`ALTER TABLE audit_reports ADD COLUMN audit_category TEXT DEFAULT 'security';`);
      }
    } catch {}

    const stmt = db.prepare(
      `INSERT INTO audit_reports (id, diagram_id, version_number, audit_category, score, report, gaps)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    stmt.run(id, diagramId, versionNumber, auditCategory, score, report, gapsJson);
    const getStmt = db.prepare(`SELECT * FROM audit_reports WHERE id = ?`);
    return getStmt.get(id) as unknown as AuditReport;
  }
}

export async function getAuditReportsForDiagram(diagramId: string): Promise<AuditReport[]> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    try {
      await pool.query(`ALTER TABLE audit_reports ADD COLUMN IF NOT EXISTS audit_category TEXT DEFAULT 'security';`);
    } catch {}
    const res = await pool.query(
      `SELECT * FROM audit_reports WHERE diagram_id = $1 ORDER BY version_number DESC, created_at DESC`,
      [diagramId]
    );
    return res.rows;
  } else {
    const db = getSqliteDb();
    try {
      const cols = db.prepare(`PRAGMA table_info(audit_reports)`).all() as any[];
      if (!cols.some(c => c.name === 'audit_category')) {
        db.exec(`ALTER TABLE audit_reports ADD COLUMN audit_category TEXT DEFAULT 'security';`);
      }
    } catch {}
    const stmt = db.prepare(`SELECT * FROM audit_reports WHERE diagram_id = ? ORDER BY version_number DESC, created_at DESC`);
    return stmt.all(diagramId) as unknown as AuditReport[];
  }
}

export async function getVisitorCount(): Promise<number> {
  await ensureTablesExist();
  const INITIAL_SEED = 1500;
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(`SELECT value FROM site_stats WHERE key = 'visitor_count'`);
    if (res.rows.length === 0) {
      const insertRes = await pool.query(`
        INSERT INTO site_stats (key, value, updated_at)
        VALUES ('visitor_count', $1, CURRENT_TIMESTAMP)
        ON CONFLICT (key) DO UPDATE SET value = site_stats.value
        RETURNING value;
      `, [INITIAL_SEED]);
      return parseInt(insertRes.rows[0].value, 10);
    }
    return parseInt(res.rows[0].value, 10);
  } else {
    const db = getSqliteDb();
    let row = db.prepare(`SELECT value FROM site_stats WHERE key = 'visitor_count'`).get() as { value: number } | undefined;
    if (!row) {
      db.exec(`
        INSERT OR IGNORE INTO site_stats (key, value, updated_at)
        VALUES ('visitor_count', ${INITIAL_SEED}, strftime('%Y-%m-%d %H:%M:%f', 'now'));
      `);
      row = db.prepare(`SELECT value FROM site_stats WHERE key = 'visitor_count'`).get() as { value: number } | undefined;
    }
    return row ? Number(row.value) : INITIAL_SEED;
  }
}

export async function incrementVisitorCount(step: number = 1): Promise<number> {
  await ensureTablesExist();
  const INITIAL_SEED = 1500;
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(`
      INSERT INTO site_stats (key, value, updated_at)
      VALUES ('visitor_count', $1 + $2, CURRENT_TIMESTAMP)
      ON CONFLICT (key)
      DO UPDATE SET value = site_stats.value + $2, updated_at = CURRENT_TIMESTAMP
      RETURNING value;
    `, [INITIAL_SEED, step]);
    return parseInt(res.rows[0].value, 10);
  } else {
    const db = getSqliteDb();
    db.exec(`
      INSERT OR IGNORE INTO site_stats (key, value, updated_at)
      VALUES ('visitor_count', ${INITIAL_SEED}, strftime('%Y-%m-%d %H:%M:%f', 'now'));
    `);
    const updateStmt = db.prepare(`
      UPDATE site_stats 
      SET value = value + ?, updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now') 
      WHERE key = 'visitor_count'
    `);
    updateStmt.run(step);
    const row = db.prepare(`SELECT value FROM site_stats WHERE key = 'visitor_count'`).get() as { value: number } | undefined;
    return row ? Number(row.value) : (INITIAL_SEED + step);
  }
}

export async function resetVisitorCount(value: number = 0): Promise<number> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(`
      INSERT INTO site_stats (key, value, updated_at)
      VALUES ('visitor_count', $1, CURRENT_TIMESTAMP)
      ON CONFLICT (key)
      DO UPDATE SET value = $1, updated_at = CURRENT_TIMESTAMP
      RETURNING value;
    `, [value]);
    return parseInt(res.rows[0].value, 10);
  } else {
    const db = getSqliteDb();
    db.exec(`
      INSERT INTO site_stats (key, value, updated_at)
      VALUES ('visitor_count', ${value}, strftime('%Y-%m-%d %H:%M:%f', 'now'))
      ON CONFLICT(key) DO UPDATE SET value = ${value}, updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now');
    `);
    return value;
  }
}

// ----------------------------------------------------
// MULTIMODAL MEDIA ASSETS PERSISTENCE HELPERS
// ----------------------------------------------------

export interface MediaAssetRecord {
  id: string;
  diagram_id: string | null;
  asset_type: string;
  title: string;
  url: string | null;
  html_code: string | null;
  aspect_ratio: string | null;
  caption: string | null;
  category: string | null;
  created_at: string | Date;
}

export async function saveMediaAssetRecord(asset: {
  id?: string;
  diagram_id?: string | null;
  asset_type: string;
  title: string;
  url?: string | null;
  html_code?: string | null;
  aspect_ratio?: string | null;
  caption?: string | null;
  category?: string | null;
}): Promise<MediaAssetRecord> {
  await ensureTablesExist();
  const assetId = asset.id || uuidv4();
  const diagramId = asset.diagram_id || null;
  const assetType = asset.asset_type || 'animation';
  const title = asset.title || 'Untitled Multimodal Asset';
  const url = asset.url || null;
  const htmlCode = asset.html_code || null;
  const aspectRatio = asset.aspect_ratio || '16:9';
  const caption = asset.caption || null;
  const category = asset.category || 'general';

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(`
      INSERT INTO media_assets (id, diagram_id, asset_type, title, url, html_code, aspect_ratio, caption, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        url = EXCLUDED.url,
        html_code = EXCLUDED.html_code,
        caption = EXCLUDED.caption,
        category = EXCLUDED.category
      RETURNING *;
    `, [assetId, diagramId, assetType, title, url, htmlCode, aspectRatio, caption, category]);
    return res.rows[0] as MediaAssetRecord;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare(`
      INSERT INTO media_assets (id, diagram_id, asset_type, title, url, html_code, aspect_ratio, caption, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        url = excluded.url,
        html_code = excluded.html_code,
        caption = excluded.caption,
        category = excluded.category;
    `);
    stmt.run(assetId, diagramId, assetType, title, url, htmlCode, aspectRatio, caption, category);
    const row = db.prepare('SELECT * FROM media_assets WHERE id = ?').get(assetId) as unknown as MediaAssetRecord;
    return row;
  }
}

export async function getMediaAssetsForDiagram(diagramId: string): Promise<MediaAssetRecord[]> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      'SELECT * FROM media_assets WHERE diagram_id = $1 ORDER BY created_at DESC',
      [diagramId]
    );
    return res.rows as MediaAssetRecord[];
  } else {
    const db = getSqliteDb();
    const rows = db.prepare(
      'SELECT * FROM media_assets WHERE diagram_id = ? ORDER BY created_at DESC'
    ).all(diagramId) as unknown as MediaAssetRecord[];
    return rows;
  }
}

export async function getAllSavedMediaAssets(limit: number = 50): Promise<MediaAssetRecord[]> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      'SELECT * FROM media_assets ORDER BY created_at DESC LIMIT $1',
      [limit]
    );
    return res.rows as MediaAssetRecord[];
  } else {
    const db = getSqliteDb();
    const rows = db.prepare(
      'SELECT * FROM media_assets ORDER BY created_at DESC LIMIT ?'
    ).all(limit) as unknown as MediaAssetRecord[];
    return rows;
  }
}

export async function getMediaAssetById(id: string): Promise<MediaAssetRecord | null> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM media_assets WHERE id = $1', [id]);
    return (res.rows[0] as MediaAssetRecord) || null;
  } else {
    const db = getSqliteDb();
    const row = db.prepare('SELECT * FROM media_assets WHERE id = ?').get(id) as unknown as MediaAssetRecord | undefined;
    return row || null;
  }
}

export async function checkAndRecordDailyGeminiQuota(
  userId: string,
  maxDailyLimit: number = 50,
  routeLabel: string = 'gemini'
): Promise<{ allowed: boolean; used: number; limit: number }> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const countRes = await pool.query(
      `SELECT COUNT(*)::int AS cnt FROM user_logs
       WHERE user_id = $1 AND event_type = 'GEMINI_GENERATION'
       AND created_at >= NOW() - INTERVAL '24 hours'`,
      [userId]
    );
    const used = Number(countRes.rows[0]?.cnt || 0);
    if (used >= maxDailyLimit) {
      return { allowed: false, used, limit: maxDailyLimit };
    }
    await logUserEvent(userId, 'GEMINI_GENERATION', null, routeLabel);
    return { allowed: true, used: used + 1, limit: maxDailyLimit };
  } else {
    const db = getSqliteDb();
    const row = db
      .prepare(
        `SELECT COUNT(*) AS cnt FROM user_logs
         WHERE user_id = ? AND event_type = 'GEMINI_GENERATION'
         AND datetime(created_at) >= datetime('now', '-24 hours')`
      )
      .get(userId) as { cnt: number } | undefined;
    const used = Number(row?.cnt || 0);
    if (used >= maxDailyLimit) {
      return { allowed: false, used, limit: maxDailyLimit };
    }
    await logUserEvent(userId, 'GEMINI_GENERATION', null, routeLabel);
    return { allowed: true, used: used + 1, limit: maxDailyLimit };
  }
}

export async function checkIpEventRateLimit(
  ipAddress: string,
  eventType: string,
  maxEvents: number = 10,
  windowMinutes: number = 60
): Promise<{ allowed: boolean; count: number }> {
  await ensureTablesExist();
  const safeIp = ipAddress || '127.0.0.1';
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `SELECT COUNT(*)::int AS cnt FROM user_logs
       WHERE ip_address = $1 AND event_type = $2
       AND created_at >= NOW() - ($3 || ' minutes')::interval`,
      [safeIp, eventType, String(windowMinutes)]
    );
    const count = Number(res.rows[0]?.cnt || 0);
    return { allowed: count < maxEvents, count };
  } else {
    const db = getSqliteDb();
    const row = db
      .prepare(
        `SELECT COUNT(*) AS cnt FROM user_logs
         WHERE ip_address = ? AND event_type = ?
         AND datetime(created_at) >= datetime('now', ?)`
      )
      .get(safeIp, eventType, `-${windowMinutes} minutes`) as { cnt: number } | undefined;
    const count = Number(row?.cnt || 0);
    return { allowed: count < maxEvents, count };
  }
}

export async function exportUserAllData(userId: string) {
  await ensureTablesExist();
  const user = await getUserById(userId);
  const diagrams = (await listDiagrams(userId)).filter((d) => d.user_id === userId);
  const logs = await getUserLogs(userId, 200);
  return {
    exportedAt: new Date().toISOString(),
    user: user
      ? {
          id: user.id,
          email: user.email,
          name: user.name,
          global_role: user.global_role,
          created_at: user.created_at,
        }
      : null,
    diagramCount: diagrams.length,
    diagrams,
    activityLogs: logs,
  };
}

export async function deleteUserAndAllData(userId: string): Promise<void> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(
      `DELETE FROM diagram_versions WHERE diagram_id IN (SELECT id FROM diagrams WHERE user_id = $1)`,
      [userId]
    );
    await pool.query(`DELETE FROM diagrams WHERE user_id = $1`, [userId]);
    await pool.query(`DELETE FROM workspace_members WHERE user_id = $1`, [userId]);
    await pool.query(`DELETE FROM workspaces WHERE owner_id = $1`, [userId]);
    await pool.query(`DELETE FROM sessions WHERE user_id = $1`, [userId]);
    await pool.query(`DELETE FROM user_logs WHERE user_id = $1`, [userId]);
    await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);
  } else {
    const db = getSqliteDb();
    db.prepare(
      `DELETE FROM diagram_versions WHERE diagram_id IN (SELECT id FROM diagrams WHERE user_id = ?)`
    ).run(userId);
    db.prepare(`DELETE FROM diagrams WHERE user_id = ?`).run(userId);
    db.prepare(`DELETE FROM workspace_members WHERE user_id = ?`).run(userId);
    db.prepare(`DELETE FROM workspaces WHERE owner_id = ?`).run(userId);
    db.prepare(`DELETE FROM sessions WHERE user_id = ?`).run(userId);
    db.prepare(`DELETE FROM user_logs WHERE user_id = ?`).run(userId);
    db.prepare(`DELETE FROM users WHERE id = ?`).run(userId);
  }
}

let geminiKeyColEnsured = false;
async function ensureUserGeminiKeyColumn(): Promise<void> {
  if (geminiKeyColEnsured) return;
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS gemini_api_key TEXT;`).catch(() => {});
  } else {
    const db = getSqliteDb();
    try {
      db.exec(`ALTER TABLE users ADD COLUMN gemini_api_key TEXT;`);
    } catch {
      // Column already exists
    }
  }
  geminiKeyColEnsured = true;
}

export async function getUserGeminiApiKey(userId: string): Promise<string | null> {
  if (!userId) return null;
  await ensureUserGeminiKeyColumn();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(`SELECT gemini_api_key FROM users WHERE id = $1 LIMIT 1`, [userId]);
    const val = res.rows[0]?.gemini_api_key;
    return typeof val === 'string' && val.trim().length > 0 ? val.trim() : null;
  } else {
    const db = getSqliteDb();
    const row = db.prepare(`SELECT gemini_api_key FROM users WHERE id = ? LIMIT 1`).get(userId) as
      | { gemini_api_key?: string | null }
      | undefined;
    const val = row?.gemini_api_key;
    return typeof val === 'string' && val.trim().length > 0 ? val.trim() : null;
  }
}

export async function setUserGeminiApiKey(userId: string, apiKey: string | null): Promise<void> {
  if (!userId) return;
  await ensureUserGeminiKeyColumn();
  const cleanKey = apiKey && apiKey.trim().length > 0 ? apiKey.trim() : null;
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(
      `UPDATE users SET gemini_api_key = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
      [cleanKey, userId]
    );
  } else {
    const db = getSqliteDb();
    db.prepare(
      `UPDATE users SET gemini_api_key = ?, updated_at = strftime('%Y-%m-%d %H:%M:%f', 'now') WHERE id = ?`
    ).run(cleanKey, userId);
  }
}

// ============================================================================
// UNIFIED AUDIT CHANGELOG & 2-WAY GOOGLE SHEETS SYNCHRONIZATION ENGINE
// ============================================================================

export type ChangelogCategory =
  | 'USER_ADDED'
  | 'USER_ROLE_CHANGED'
  | 'COMMENT_ADDED'
  | 'STATUS_CHANGED'
  | 'BLUEPRINT_UPDATED'
  | 'SHEET_SYNC';

export interface ChangelogEntry {
  id: string;
  event_category: ChangelogCategory;
  actor_id?: string | null;
  actor_name: string;
  actor_email: string;
  actor_role: string;
  entity_type: string;
  entity_id: string;
  entity_name: string;
  field_changed: string;
  old_value?: string | null;
  new_value?: string | null;
  summary: string;
  source: 'UI' | 'GOOGLE_SHEET' | 'API';
  sync_status: 'SYNCED' | 'PENDING_PUSH' | 'PULLED_FROM_SHEET';
  sheet_row_ref?: string | null;
  created_at: string;
}

export interface GovernanceTrackerItem {
  id: string;
  blueprint_code: string;
  blueprint_name: string;
  domain_layer: string;
  status: string;
  priority: string;
  owner_name: string;
  owner_email: string;
  latest_comment?: string | null;
  comment_author?: string | null;
  version: string;
  last_modified_by: string;
  last_sync_source: 'UI' | 'GOOGLE_SHEET';
  sheet_row_number: number;
  updated_at: string;
}

export interface GovernanceComment {
  id: string;
  target_id: string;
  target_name: string;
  author_name: string;
  author_email: string;
  author_role: string;
  comment_text: string;
  status_at_comment?: string | null;
  source: 'UI' | 'GOOGLE_SHEET';
  sheet_row_ref?: string | null;
  created_at: string;
}

export interface SheetSyncConfig {
  id: string;
  spreadsheet_id: string;
  spreadsheet_url: string;
  sheet_title: string;
  auto_sync_enabled: boolean | number;
  sync_mode: string;
  last_synced_at: string | null;
  last_sync_actor: string | null;
  total_ui_to_sheet_pushes: number;
  total_sheet_to_ui_pulls: number;
}

async function seedInitialGovernanceAndChangelog(): Promise<void> {
  const initialUsers = [
    { id: 'usr-admin-1', email: 'nitin.aggarwal@enterprise-arch.io', name: 'Nitin Aggarwal', role: 'Super-Admin', isSuper: 1 },
    { id: 'usr-elena', email: 'elena.rostova@enterprise-arch.io', name: 'Dr. Elena Rostova', role: 'Author', isSuper: 0 },
    { id: 'usr-marcus', email: 'marcus.vance@enterprise-arch.io', name: 'Marcus Vance', role: 'Super-Admin', isSuper: 1 },
    { id: 'usr-sophia', email: 'sophia.martinez@enterprise-arch.io', name: 'Sophia Martinez', role: 'Author', isSuper: 0 },
  ];
  for (const u of initialUsers) {
    if (isPostgres()) {
      await getPgPool().query(
        `INSERT INTO users (id, email, password_hash, salt, name, global_role, is_super_admin)
         VALUES ($1, $2, 'seeded_hash', 'seeded_salt', $3, $4, $5)
         ON CONFLICT (email) DO NOTHING`,
        [u.id, u.email, u.name, u.role, Boolean(u.isSuper)]
      ).catch(() => {});
    } else {
      getSqliteDb()
        .prepare(
          `INSERT OR IGNORE INTO users (id, email, password_hash, salt, name, global_role, is_super_admin)
           VALUES (?, ?, 'seeded_hash', 'seeded_salt', ?, ?, ?)`
        )
        .run(u.id, u.email, u.name, u.role, u.isSuper);
    }
  }

  const countRes = isPostgres()
    ? await getPgPool().query('SELECT COUNT(*)::int AS cnt FROM governance_tracker_items')
    : (getSqliteDb().prepare('SELECT COUNT(*) AS cnt FROM governance_tracker_items').get() as { cnt: number });
  const itemCount = isPostgres() ? Number((countRes as any).rows[0]?.cnt || 0) : Number((countRes as any)?.cnt || 0);

  if (itemCount === 0) {
    const initialTrackerItems: Omit<GovernanceTrackerItem, 'updated_at'>[] = [
      {
        id: 'gov-bp-00',
        blueprint_code: 'BP-00',
        blueprint_name: '00 — Unified Enterprise Reference Architecture (5-Tier)',
        domain_layer: 'L0 Enterprise Backbone',
        status: 'Production Certified',
        priority: 'P0 - Critical',
        owner_name: 'Nitin Aggarwal',
        owner_email: 'nitin.aggarwal@enterprise-arch.io',
        latest_comment: 'Removed redundant brand headers; added closed-loop AI evaluation & FinOps guardrail telemetry.',
        comment_author: 'Nitin Aggarwal',
        version: 'v3.4',
        last_modified_by: 'Nitin Aggarwal (UI)',
        last_sync_source: 'UI',
        sheet_row_number: 2,
      },
      {
        id: 'gov-bp-01',
        blueprint_code: 'BP-01',
        blueprint_name: '01 — Enterprise System Context & External Ecosystem Boundary',
        domain_layer: 'L1 System Context',
        status: 'Production Certified',
        priority: 'P0 - Critical',
        owner_name: 'Dr. Elena Rostova',
        owner_email: 'elena.rostova@enterprise-arch.io',
        latest_comment: 'Upgraded to vendor-neutral L1 System Context with CDISC ODM, HL7 FHIR R4, IDMP & GxP Part 11 contracts.',
        comment_author: 'Dr. Elena Rostova',
        version: 'v3.4',
        last_modified_by: 'Dr. Elena Rostova (UI)',
        last_sync_source: 'UI',
        sheet_row_number: 3,
      },
      {
        id: 'gov-bp-02',
        blueprint_code: 'BP-02',
        blueprint_name: '02 — Core Business Capability Map (L1–L2 Domain Taxonomy)',
        domain_layer: 'L1 Capability Architecture',
        status: 'Approved',
        priority: 'P0 - Critical',
        owner_name: 'Marcus Vance',
        owner_email: 'marcus.vance@enterprise-arch.io',
        latest_comment: 'Synced capability maturity ratings from Architecture Review Board Google Sheet.',
        comment_author: 'Marcus Vance',
        version: 'v3.2',
        last_modified_by: 'Marcus Vance (GOOGLE_SHEET)',
        last_sync_source: 'GOOGLE_SHEET',
        sheet_row_number: 4,
      },
      {
        id: 'gov-bp-03',
        blueprint_code: 'BP-03',
        blueprint_name: '03 — End-to-End Business Process & Value Stream Lifecycle',
        domain_layer: 'L2 Process Orchestration',
        status: 'In Review',
        priority: 'P1 - High',
        owner_name: 'Priya Nair',
        owner_email: 'priya.nair@enterprise-arch.io',
        latest_comment: 'Validating SLA handoff gates between Clinical Operations and Regulatory Submissions.',
        comment_author: 'Priya Nair',
        version: 'v3.1',
        last_modified_by: 'Priya Nair (GOOGLE_SHEET)',
        last_sync_source: 'GOOGLE_SHEET',
        sheet_row_number: 5,
      },
      {
        id: 'gov-bp-04',
        blueprint_code: 'BP-04',
        blueprint_name: '04 — Enterprise Data & Lakehouse Medallion Architecture',
        domain_layer: 'L2 Data & Analytics',
        status: 'Approved',
        priority: 'P0 - Critical',
        owner_name: 'David Chen',
        owner_email: 'david.chen@enterprise-arch.io',
        latest_comment: 'Verified Iceberg/Delta open table formats and PII tokenization gateway.',
        comment_author: 'David Chen',
        version: 'v3.3',
        last_modified_by: 'David Chen (UI)',
        last_sync_source: 'UI',
        sheet_row_number: 6,
      },
      {
        id: 'gov-bp-05',
        blueprint_code: 'BP-05',
        blueprint_name: '05 — Agentic AI, Hybrid RAG & Guardrail Reference Topology',
        domain_layer: 'L3 AI & Cognitive Plane',
        status: 'In Review',
        priority: 'P0 - Critical',
        owner_name: 'Sophia Martinez',
        owner_email: 'sophia.martinez@enterprise-arch.io',
        latest_comment: 'Pending final sign-off on citation verification threshold (>= 0.92 groundedness).',
        comment_author: 'Sophia Martinez',
        version: 'v3.2',
        last_modified_by: 'Sophia Martinez (UI)',
        last_sync_source: 'UI',
        sheet_row_number: 7,
      },
    ];

    for (const item of initialTrackerItems) {
      if (isPostgres()) {
        await getPgPool().query(
          `INSERT INTO governance_tracker_items
           (id, blueprint_code, blueprint_name, domain_layer, status, priority, owner_name, owner_email, latest_comment, comment_author, version, last_modified_by, last_sync_source, sheet_row_number)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
           ON CONFLICT (blueprint_code) DO NOTHING`,
          [
            item.id,
            item.blueprint_code,
            item.blueprint_name,
            item.domain_layer,
            item.status,
            item.priority,
            item.owner_name,
            item.owner_email,
            item.latest_comment,
            item.comment_author,
            item.version,
            item.last_modified_by,
            item.last_sync_source,
            item.sheet_row_number,
          ]
        );
      } else {
        getSqliteDb()
          .prepare(
            `INSERT OR IGNORE INTO governance_tracker_items
             (id, blueprint_code, blueprint_name, domain_layer, status, priority, owner_name, owner_email, latest_comment, comment_author, version, last_modified_by, last_sync_source, sheet_row_number)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .run(
            item.id,
            item.blueprint_code,
            item.blueprint_name,
            item.domain_layer,
            item.status,
            item.priority,
            item.owner_name,
            item.owner_email,
            item.latest_comment ?? null,
            item.comment_author ?? null,
            item.version,
            item.last_modified_by,
            item.last_sync_source,
            item.sheet_row_number
          );
      }
    }
  }

  // Ensure default sheet_sync_config exists
  const syncCfgRes = isPostgres()
    ? await getPgPool().query("SELECT COUNT(*)::int AS cnt FROM sheet_sync_config WHERE id = 'default'")
    : (getSqliteDb().prepare("SELECT COUNT(*) AS cnt FROM sheet_sync_config WHERE id = 'default'").get() as { cnt: number });
  const cfgCount = isPostgres() ? Number((syncCfgRes as any).rows[0]?.cnt || 0) : Number((syncCfgRes as any)?.cnt || 0);

  if (cfgCount === 0) {
    const nowIso = new Date().toISOString();
    const defaultSheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
    const defaultSheetUrl = 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0';
    const defaultTitle = 'PromptCanvas — Master Architecture Governance & Changelog (2-Way Synced)';
    if (isPostgres()) {
      await getPgPool().query(
        `INSERT INTO sheet_sync_config
         (id, spreadsheet_id, spreadsheet_url, sheet_title, auto_sync_enabled, sync_mode, last_synced_at, last_sync_actor, total_ui_to_sheet_pushes, total_sheet_to_ui_pulls)
         VALUES ('default', $1, $2, $3, 1, 'TWO_WAY_LIVE', $4, 'Nitin Aggarwal (Auto-Sync Engine)', 14, 8)
         ON CONFLICT (id) DO NOTHING`,
        [defaultSheetId, defaultSheetUrl, defaultTitle, nowIso]
      );
    } else {
      getSqliteDb()
        .prepare(
          `INSERT OR IGNORE INTO sheet_sync_config
           (id, spreadsheet_id, spreadsheet_url, sheet_title, auto_sync_enabled, sync_mode, last_synced_at, last_sync_actor, total_ui_to_sheet_pushes, total_sheet_to_ui_pulls)
           VALUES ('default', ?, ?, ?, 1, 'TWO_WAY_LIVE', ?, 'Nitin Aggarwal (Auto-Sync Engine)', 14, 8)`
        )
        .run(defaultSheetId, defaultSheetUrl, defaultTitle, nowIso);
    }
  }

  // Ensure initial comments & changelog entries exist
  const logCountRes = isPostgres()
    ? await getPgPool().query('SELECT COUNT(*)::int AS cnt FROM changelog_entries')
    : (getSqliteDb().prepare('SELECT COUNT(*) AS cnt FROM changelog_entries').get() as { cnt: number });
  const logCount = isPostgres() ? Number((logCountRes as any).rows[0]?.cnt || 0) : Number((logCountRes as any)?.cnt || 0);

  if (logCount === 0) {
    const seedComments: Omit<GovernanceComment, 'created_at'>[] = [
      {
        id: 'cmt-seed-1',
        target_id: 'BP-01',
        target_name: '01 — Enterprise System Context & External Ecosystem Boundary',
        author_name: 'Dr. Elena Rostova',
        author_email: 'elena.rostova@enterprise-arch.io',
        author_role: 'Principal Domain Architect',
        comment_text: 'Upgraded to vendor-neutral L1 System Context with CDISC ODM, HL7 FHIR R4, IDMP & GxP Part 11 contracts.',
        status_at_comment: 'Production Certified',
        source: 'UI',
        sheet_row_ref: 'Comments!A2:G2',
      },
      {
        id: 'cmt-seed-2',
        target_id: 'BP-02',
        target_name: '02 — Core Business Capability Map (L1–L2 Domain Taxonomy)',
        author_name: 'Marcus Vance',
        author_email: 'marcus.vance@enterprise-arch.io',
        author_role: 'Enterprise Governance Lead',
        comment_text: 'Synced capability maturity ratings from Architecture Review Board Google Sheet.',
        status_at_comment: 'Approved',
        source: 'GOOGLE_SHEET',
        sheet_row_ref: 'Tracker!I4',
      },
      {
        id: 'cmt-seed-3',
        target_id: 'BP-05',
        target_name: '05 — Agentic AI, Hybrid RAG & Guardrail Reference Topology',
        author_name: 'Sophia Martinez',
        author_email: 'sophia.martinez@enterprise-arch.io',
        author_role: 'AI Security & Risk Reviewer',
        comment_text: 'Pending final sign-off on citation verification threshold (>= 0.92 groundedness).',
        status_at_comment: 'In Review',
        source: 'GOOGLE_SHEET',
        sheet_row_ref: 'Comments!A4:G4',
      },
    ];

    for (const c of seedComments) {
      if (isPostgres()) {
        await getPgPool().query(
          `INSERT INTO governance_comments (id, target_id, target_name, author_name, author_email, author_role, comment_text, status_at_comment, source, sheet_row_ref)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (id) DO NOTHING`,
          [c.id, c.target_id, c.target_name, c.author_name, c.author_email, c.author_role, c.comment_text, c.status_at_comment ?? null, c.source, c.sheet_row_ref ?? null]
        );
      } else {
        getSqliteDb()
          .prepare(
            `INSERT OR IGNORE INTO governance_comments (id, target_id, target_name, author_name, author_email, author_role, comment_text, status_at_comment, source, sheet_row_ref)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .run(c.id, c.target_id, c.target_name, c.author_name, c.author_email, c.author_role, c.comment_text, c.status_at_comment ?? null, c.source, c.sheet_row_ref ?? null);
      }
    }

    const seedLogs: Omit<ChangelogEntry, 'created_at'>[] = [
      {
        id: 'chg-seed-01',
        event_category: 'USER_ADDED',
        actor_id: 'usr-admin-1',
        actor_name: 'Nitin Aggarwal',
        actor_email: 'nitin.aggarwal@enterprise-arch.io',
        actor_role: 'Super-Admin',
        entity_type: 'User',
        entity_id: 'usr-elena',
        entity_name: 'Dr. Elena Rostova (elena.rostova@enterprise-arch.io)',
        field_changed: 'user_created',
        old_value: 'None',
        new_value: 'Author (Principal Domain Architect)',
        summary: 'Added user Dr. Elena Rostova via PromptCanvas Admin UI and synced to Google Sheet [Users!A3:F3].',
        source: 'UI',
        sync_status: 'SYNCED',
        sheet_row_ref: 'Users!A3:F3',
      },
      {
        id: 'chg-seed-02',
        event_category: 'USER_ADDED',
        actor_id: 'sheet-sync',
        actor_name: 'Marcus Vance',
        actor_email: 'marcus.vance@enterprise-arch.io',
        actor_role: 'Super-Admin',
        entity_type: 'User',
        entity_id: 'usr-sophia',
        entity_name: 'Sophia Martinez (sophia.martinez@enterprise-arch.io)',
        field_changed: 'user_created',
        old_value: 'None',
        new_value: 'Author (AI Security & Risk Reviewer)',
        summary: 'Added user Sophia Martinez directly in Google Sheet [Users!A4:F4] — auto-imported into PromptCanvas UI.',
        source: 'GOOGLE_SHEET',
        sync_status: 'PULLED_FROM_SHEET',
        sheet_row_ref: 'Users!A4:F4',
      },
      {
        id: 'chg-seed-03',
        event_category: 'USER_ROLE_CHANGED',
        actor_id: 'usr-admin-1',
        actor_name: 'Nitin Aggarwal',
        actor_email: 'nitin.aggarwal@enterprise-arch.io',
        actor_role: 'Super-Admin',
        entity_type: 'User',
        entity_id: 'usr-marcus',
        entity_name: 'Marcus Vance (marcus.vance@enterprise-arch.io)',
        field_changed: 'global_role',
        old_value: 'Member',
        new_value: 'Super-Admin',
        summary: 'Promoted Marcus Vance from Member to Super-Admin in UI and pushed role update to Google Sheet [Users!D5].',
        source: 'UI',
        sync_status: 'SYNCED',
        sheet_row_ref: 'Users!D5',
      },
      {
        id: 'chg-seed-04',
        event_category: 'STATUS_CHANGED',
        actor_id: 'sheet-sync',
        actor_name: 'Marcus Vance',
        actor_email: 'marcus.vance@enterprise-arch.io',
        actor_role: 'Super-Admin',
        entity_type: 'Blueprint',
        entity_id: 'BP-02',
        entity_name: '02 — Core Business Capability Map (L1–L2 Domain Taxonomy)',
        field_changed: 'status',
        old_value: 'In Review',
        new_value: 'Approved',
        summary: 'Marcus Vance changed status of BP-02 from "In Review" to "Approved" in Google Sheet [Tracker!E4] — synced to UI.',
        source: 'GOOGLE_SHEET',
        sync_status: 'PULLED_FROM_SHEET',
        sheet_row_ref: 'Tracker!E4',
      },
      {
        id: 'chg-seed-05',
        event_category: 'COMMENT_ADDED',
        actor_id: 'sheet-sync',
        actor_name: 'Sophia Martinez',
        actor_email: 'sophia.martinez@enterprise-arch.io',
        actor_role: 'Author',
        entity_type: 'Comment',
        entity_id: 'BP-05',
        entity_name: '05 — Agentic AI, Hybrid RAG & Guardrail Reference Topology',
        field_changed: 'comment',
        old_value: 'Initial AI topology draft submitted.',
        new_value: 'Pending final sign-off on citation verification threshold (>= 0.92 groundedness).',
        summary: 'Sophia Martinez added review comment on BP-05 in Google Sheet [Comments!A4:G4] — synced to UI.',
        source: 'GOOGLE_SHEET',
        sync_status: 'PULLED_FROM_SHEET',
        sheet_row_ref: 'Comments!A4:G4',
      },
      {
        id: 'chg-seed-06',
        event_category: 'STATUS_CHANGED',
        actor_id: 'usr-elena',
        actor_name: 'Dr. Elena Rostova',
        actor_email: 'elena.rostova@enterprise-arch.io',
        actor_role: 'Author',
        entity_type: 'Blueprint',
        entity_id: 'BP-01',
        entity_name: '01 — Enterprise System Context & External Ecosystem Boundary',
        field_changed: 'status',
        old_value: 'Approved',
        new_value: 'Production Certified',
        summary: 'Dr. Elena Rostova updated BP-01 status from "Approved" to "Production Certified" in UI and pushed to Google Sheet [Tracker!E3].',
        source: 'UI',
        sync_status: 'SYNCED',
        sheet_row_ref: 'Tracker!E3',
      },
      {
        id: 'chg-seed-07',
        event_category: 'COMMENT_ADDED',
        actor_id: 'usr-admin-1',
        actor_name: 'Nitin Aggarwal',
        actor_email: 'nitin.aggarwal@enterprise-arch.io',
        actor_role: 'Super-Admin',
        entity_type: 'Comment',
        entity_id: 'BP-00',
        entity_name: '00 — Unified Enterprise Reference Architecture (5-Tier)',
        field_changed: 'comment',
        old_value: 'Baseline 5-tier layout.',
        new_value: 'Removed redundant brand headers; added closed-loop AI evaluation & FinOps guardrail telemetry.',
        summary: 'Nitin Aggarwal added architecture review comment on BP-00 in UI and pushed to Google Sheet [Tracker!I2].',
        source: 'UI',
        sync_status: 'SYNCED',
        sheet_row_ref: 'Tracker!I2',
      },
    ];

    for (const log of seedLogs) {
      if (isPostgres()) {
        await getPgPool().query(
          `INSERT INTO changelog_entries
           (id, event_category, actor_id, actor_name, actor_email, actor_role, entity_type, entity_id, entity_name, field_changed, old_value, new_value, summary, source, sync_status, sheet_row_ref)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
           ON CONFLICT (id) DO NOTHING`,
          [
            log.id,
            log.event_category,
            log.actor_id || null,
            log.actor_name,
            log.actor_email,
            log.actor_role,
            log.entity_type,
            log.entity_id,
            log.entity_name,
            log.field_changed,
            log.old_value || null,
            log.new_value || null,
            log.summary,
            log.source,
            log.sync_status,
            log.sheet_row_ref || null,
          ]
        );
      } else {
        getSqliteDb()
          .prepare(
            `INSERT OR IGNORE INTO changelog_entries
             (id, event_category, actor_id, actor_name, actor_email, actor_role, entity_type, entity_id, entity_name, field_changed, old_value, new_value, summary, source, sync_status, sheet_row_ref)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .run(
            log.id,
            log.event_category,
            log.actor_id || null,
            log.actor_name,
            log.actor_email,
            log.actor_role,
            log.entity_type,
            log.entity_id,
            log.entity_name,
            log.field_changed,
            log.old_value || null,
            log.new_value || null,
            log.summary,
            log.source,
            log.sync_status,
            log.sheet_row_ref || null
          );
      }
    }
  }
}

let changelogTablesEnsuredV2 = false;
async function ensureChangelogTablesAndSeed(): Promise<void> {
  if (changelogTablesEnsuredV2) return;
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS changelog_entries (
        id TEXT PRIMARY KEY,
        event_category TEXT NOT NULL,
        actor_id TEXT,
        actor_name TEXT NOT NULL,
        actor_email TEXT NOT NULL,
        actor_role TEXT NOT NULL DEFAULT 'Author',
        entity_type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        entity_name TEXT NOT NULL,
        field_changed TEXT NOT NULL,
        old_value TEXT,
        new_value TEXT,
        summary TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'UI',
        sync_status TEXT NOT NULL DEFAULT 'SYNCED',
        sheet_row_ref TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS governance_tracker_items (
        id TEXT PRIMARY KEY,
        blueprint_code TEXT UNIQUE NOT NULL,
        blueprint_name TEXT NOT NULL,
        domain_layer TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'In Review',
        priority TEXT NOT NULL DEFAULT 'P0 - Critical',
        owner_name TEXT NOT NULL,
        owner_email TEXT NOT NULL,
        latest_comment TEXT,
        comment_author TEXT,
        version TEXT NOT NULL DEFAULT 'v3.2',
        last_modified_by TEXT NOT NULL,
        last_sync_source TEXT NOT NULL DEFAULT 'UI',
        sheet_row_number INTEGER NOT NULL DEFAULT 2,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS governance_comments (
        id TEXT PRIMARY KEY,
        target_id TEXT NOT NULL,
        target_name TEXT NOT NULL,
        author_name TEXT NOT NULL,
        author_email TEXT NOT NULL,
        author_role TEXT NOT NULL DEFAULT 'Architect',
        comment_text TEXT NOT NULL,
        status_at_comment TEXT,
        source TEXT NOT NULL DEFAULT 'UI',
        sheet_row_ref TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS sheet_sync_config (
        id TEXT PRIMARY KEY,
        spreadsheet_id TEXT NOT NULL,
        spreadsheet_url TEXT NOT NULL,
        sheet_title TEXT NOT NULL,
        auto_sync_enabled INTEGER NOT NULL DEFAULT 1,
        sync_mode TEXT NOT NULL DEFAULT 'TWO_WAY_LIVE',
        last_synced_at TEXT,
        last_sync_actor TEXT,
        total_ui_to_sheet_pushes INTEGER NOT NULL DEFAULT 0,
        total_sheet_to_ui_pulls INTEGER NOT NULL DEFAULT 0
      );
    `);
  } else {
    const db = getSqliteDb();
    db.exec(`
      CREATE TABLE IF NOT EXISTS changelog_entries (
        id TEXT PRIMARY KEY,
        event_category TEXT NOT NULL,
        actor_id TEXT,
        actor_name TEXT NOT NULL,
        actor_email TEXT NOT NULL,
        actor_role TEXT NOT NULL DEFAULT 'Author',
        entity_type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        entity_name TEXT NOT NULL,
        field_changed TEXT NOT NULL,
        old_value TEXT,
        new_value TEXT,
        summary TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'UI',
        sync_status TEXT NOT NULL DEFAULT 'SYNCED',
        sheet_row_ref TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      );
      CREATE TABLE IF NOT EXISTS governance_tracker_items (
        id TEXT PRIMARY KEY,
        blueprint_code TEXT UNIQUE NOT NULL,
        blueprint_name TEXT NOT NULL,
        domain_layer TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'In Review',
        priority TEXT NOT NULL DEFAULT 'P0 - Critical',
        owner_name TEXT NOT NULL,
        owner_email TEXT NOT NULL,
        latest_comment TEXT,
        comment_author TEXT,
        version TEXT NOT NULL DEFAULT 'v3.2',
        last_modified_by TEXT NOT NULL,
        last_sync_source TEXT NOT NULL DEFAULT 'UI',
        sheet_row_number INTEGER NOT NULL DEFAULT 2,
        updated_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      );
      CREATE TABLE IF NOT EXISTS governance_comments (
        id TEXT PRIMARY KEY,
        target_id TEXT NOT NULL,
        target_name TEXT NOT NULL,
        author_name TEXT NOT NULL,
        author_email TEXT NOT NULL,
        author_role TEXT NOT NULL DEFAULT 'Architect',
        comment_text TEXT NOT NULL,
        status_at_comment TEXT,
        source TEXT NOT NULL DEFAULT 'UI',
        sheet_row_ref TEXT,
        created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      );
      CREATE TABLE IF NOT EXISTS sheet_sync_config (
        id TEXT PRIMARY KEY,
        spreadsheet_id TEXT NOT NULL,
        spreadsheet_url TEXT NOT NULL,
        sheet_title TEXT NOT NULL,
        auto_sync_enabled INTEGER NOT NULL DEFAULT 1,
        sync_mode TEXT NOT NULL DEFAULT 'TWO_WAY_LIVE',
        last_synced_at TEXT,
        last_sync_actor TEXT,
        total_ui_to_sheet_pushes INTEGER NOT NULL DEFAULT 0,
        total_sheet_to_ui_pulls INTEGER NOT NULL DEFAULT 0
      );
    `);
  }
  await seedInitialGovernanceAndChangelog();
  changelogTablesEnsuredV2 = true;
}

export async function recordChangelogEntry(entry: {
  event_category: ChangelogCategory;
  actor_id?: string | null;
  actor_name: string;
  actor_email: string;
  actor_role?: string;
  entity_type: string;
  entity_id: string;
  entity_name: string;
  field_changed: string;
  old_value?: string | null;
  new_value?: string | null;
  summary: string;
  source?: 'UI' | 'GOOGLE_SHEET' | 'API';
  sync_status?: 'SYNCED' | 'PENDING_PUSH' | 'PULLED_FROM_SHEET';
  sheet_row_ref?: string | null;
}): Promise<ChangelogEntry> {
  await ensureChangelogTablesAndSeed();
  const id = uuidv4();
  const source = entry.source || 'UI';
  const syncStatus = entry.sync_status || (source === 'GOOGLE_SHEET' ? 'PULLED_FROM_SHEET' : 'SYNCED');
  const actorRole = entry.actor_role || 'Author';
  const nowIso = new Date().toISOString();

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query(
      `INSERT INTO changelog_entries
       (id, event_category, actor_id, actor_name, actor_email, actor_role, entity_type, entity_id, entity_name, field_changed, old_value, new_value, summary, source, sync_status, sheet_row_ref)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
       RETURNING *`,
      [
        id,
        entry.event_category,
        entry.actor_id || null,
        entry.actor_name,
        entry.actor_email,
        actorRole,
        entry.entity_type,
        entry.entity_id,
        entry.entity_name,
        entry.field_changed,
        entry.old_value ?? null,
        entry.new_value ?? null,
        entry.summary,
        source,
        syncStatus,
        entry.sheet_row_ref || null,
      ]
    );
    if (source === 'GOOGLE_SHEET') {
      await pool.query(
        `UPDATE sheet_sync_config SET last_synced_at = $1, last_sync_actor = $2, total_sheet_to_ui_pulls = total_sheet_to_ui_pulls + 1 WHERE id = 'default'`,
        [nowIso, `${entry.actor_name} (Google Sheet)`]
      );
    } else {
      await pool.query(
        `UPDATE sheet_sync_config SET last_synced_at = $1, last_sync_actor = $2, total_ui_to_sheet_pushes = total_ui_to_sheet_pushes + 1 WHERE id = 'default'`,
        [nowIso, `${entry.actor_name} (UI)`]
      );
    }
    return res.rows[0] as ChangelogEntry;
  } else {
    const db = getSqliteDb();
    db.prepare(
      `INSERT INTO changelog_entries
       (id, event_category, actor_id, actor_name, actor_email, actor_role, entity_type, entity_id, entity_name, field_changed, old_value, new_value, summary, source, sync_status, sheet_row_ref)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      entry.event_category,
      entry.actor_id || null,
      entry.actor_name,
      entry.actor_email,
      actorRole,
      entry.entity_type,
      entry.entity_id,
      entry.entity_name,
      entry.field_changed,
      entry.old_value ?? null,
      entry.new_value ?? null,
      entry.summary,
      source,
      syncStatus,
      entry.sheet_row_ref || null
    );
    if (source === 'GOOGLE_SHEET') {
      db.prepare(
        `UPDATE sheet_sync_config SET last_synced_at = ?, last_sync_actor = ?, total_sheet_to_ui_pulls = total_sheet_to_ui_pulls + 1 WHERE id = 'default'`
      ).run(nowIso, `${entry.actor_name} (Google Sheet)`);
    } else {
      db.prepare(
        `UPDATE sheet_sync_config SET last_synced_at = ?, last_sync_actor = ?, total_ui_to_sheet_pushes = total_ui_to_sheet_pushes + 1 WHERE id = 'default'`
      ).run(nowIso, `${entry.actor_name} (UI)`);
    }
    return db.prepare('SELECT * FROM changelog_entries WHERE id = ?').get(id) as unknown as ChangelogEntry;
  }
}

export async function getChangelogEntries(filters?: {
  category?: string;
  source?: string;
  search?: string;
  limit?: number;
}): Promise<ChangelogEntry[]> {
  await ensureChangelogTablesAndSeed();
  const limit = filters?.limit || 200;
  let rows: ChangelogEntry[] = [];
  if (isPostgres()) {
    const res = await getPgPool().query(
      'SELECT * FROM changelog_entries ORDER BY created_at DESC LIMIT $1',
      [limit]
    );
    rows = res.rows as ChangelogEntry[];
  } else {
    rows = getSqliteDb()
      .prepare('SELECT * FROM changelog_entries ORDER BY created_at DESC LIMIT ?')
      .all(limit) as unknown as ChangelogEntry[];
  }

  return rows.filter((r) => {
    if (filters?.category && filters.category !== 'ALL' && r.event_category !== filters.category) {
      return false;
    }
    if (filters?.source && filters.source !== 'ALL' && r.source !== filters.source) {
      return false;
    }
    if (filters?.search && filters.search.trim().length > 0) {
      const q = filters.search.toLowerCase().trim();
      const hay = `${r.actor_name} ${r.actor_email} ${r.entity_name} ${r.summary} ${r.old_value || ''} ${r.new_value || ''} ${r.sheet_row_ref || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export async function getGovernanceTrackerItems(): Promise<GovernanceTrackerItem[]> {
  await ensureChangelogTablesAndSeed();
  if (isPostgres()) {
    const res = await getPgPool().query('SELECT * FROM governance_tracker_items ORDER BY sheet_row_number ASC, blueprint_code ASC');
    return res.rows as GovernanceTrackerItem[];
  } else {
    return getSqliteDb()
      .prepare('SELECT * FROM governance_tracker_items ORDER BY sheet_row_number ASC, blueprint_code ASC')
      .all() as unknown as GovernanceTrackerItem[];
  }
}

export async function getGovernanceComments(limit: number = 100): Promise<GovernanceComment[]> {
  await ensureChangelogTablesAndSeed();
  if (isPostgres()) {
    const res = await getPgPool().query('SELECT * FROM governance_comments ORDER BY created_at DESC LIMIT $1', [limit]);
    return res.rows as GovernanceComment[];
  } else {
    return getSqliteDb()
      .prepare('SELECT * FROM governance_comments ORDER BY created_at DESC LIMIT ?')
      .all(limit) as unknown as GovernanceComment[];
  }
}

export async function getSheetSyncConfig(): Promise<SheetSyncConfig> {
  await ensureChangelogTablesAndSeed();
  if (isPostgres()) {
    const res = await getPgPool().query("SELECT * FROM sheet_sync_config WHERE id = 'default' LIMIT 1");
    return res.rows[0] as SheetSyncConfig;
  } else {
    return getSqliteDb()
      .prepare("SELECT * FROM sheet_sync_config WHERE id = 'default' LIMIT 1")
      .get() as unknown as SheetSyncConfig;
  }
}

export async function updateSheetSyncConfig(updates: {
  spreadsheet_id?: string;
  spreadsheet_url?: string;
  sheet_title?: string;
  auto_sync_enabled?: boolean;
}): Promise<SheetSyncConfig> {
  await ensureTablesExist();
  const current = await getSheetSyncConfig();
  const nextUrl = updates.spreadsheet_url?.trim() || current.spreadsheet_url;
  let nextId = updates.spreadsheet_id?.trim() || current.spreadsheet_id;
  const idMatch = nextUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (idMatch && idMatch[1]) {
    nextId = idMatch[1];
  }
  const nextTitle = updates.sheet_title?.trim() || current.sheet_title;
  const nextAuto = updates.auto_sync_enabled !== undefined ? (updates.auto_sync_enabled ? 1 : 0) : Number(current.auto_sync_enabled ? 1 : 0);

  if (isPostgres()) {
    await getPgPool().query(
      `UPDATE sheet_sync_config SET spreadsheet_id = $1, spreadsheet_url = $2, sheet_title = $3, auto_sync_enabled = $4 WHERE id = 'default'`,
      [nextId, nextUrl, nextTitle, nextAuto]
    );
  } else {
    getSqliteDb()
      .prepare(
        `UPDATE sheet_sync_config SET spreadsheet_id = ?, spreadsheet_url = ?, sheet_title = ?, auto_sync_enabled = ? WHERE id = 'default'`
      )
      .run(nextId, nextUrl, nextTitle, nextAuto);
  }
  return getSheetSyncConfig();
}

export async function updateGovernanceItemStatus(params: {
  blueprintCode: string;
  newStatus: string;
  actorName: string;
  actorEmail: string;
  actorRole?: string;
  source?: 'UI' | 'GOOGLE_SHEET';
  comment?: string;
}): Promise<{ item: GovernanceTrackerItem; changelog: ChangelogEntry }> {
  await ensureTablesExist();
  const source = params.source || 'UI';
  const items = await getGovernanceTrackerItems();
  const target = items.find((i) => i.blueprint_code === params.blueprintCode);
  if (!target) {
    throw new Error(`Blueprint tracker item ${params.blueprintCode} not found.`);
  }

  const oldStatus = target.status;
  const modifiedByLabel = `${params.actorName} (${source})`;
  const rowRef = `Tracker!E${target.sheet_row_number}`;

  if (isPostgres()) {
    await getPgPool().query(
      `UPDATE governance_tracker_items
       SET status = $1,
           last_modified_by = $2,
           last_sync_source = $3,
           updated_at = CURRENT_TIMESTAMP
       WHERE blueprint_code = $4`,
      [params.newStatus, modifiedByLabel, source, params.blueprintCode]
    );
  } else {
    getSqliteDb()
      .prepare(
        `UPDATE governance_tracker_items
         SET status = ?,
             last_modified_by = ?,
             last_sync_source = ?,
             updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now'))
         WHERE blueprint_code = ?`
      )
      .run(
        params.newStatus,
        modifiedByLabel,
        source,
        params.blueprintCode
      );
  }

  const summary =
    source === 'GOOGLE_SHEET'
      ? `${params.actorName} changed status of ${target.blueprint_code} from "${oldStatus}" to "${params.newStatus}" in Google Sheet [${rowRef}] — synced to UI.`
      : `${params.actorName} changed status of ${target.blueprint_code} from "${oldStatus}" to "${params.newStatus}" in UI and synced to Google Sheet [${rowRef}].`;

  const changelog = await recordChangelogEntry({
    event_category: 'STATUS_CHANGED',
    actor_name: params.actorName,
    actor_email: params.actorEmail,
    actor_role: params.actorRole || 'Architect',
    entity_type: 'Blueprint',
    entity_id: target.blueprint_code,
    entity_name: target.blueprint_name,
    field_changed: 'status',
    old_value: oldStatus,
    new_value: params.newStatus,
    summary,
    source,
    sheet_row_ref: rowRef,
  });

  if (params.comment && params.comment.trim().length > 0) {
    await addGovernanceComment({
      targetId: target.blueprint_code,
      targetName: target.blueprint_name,
      authorName: params.actorName,
      authorEmail: params.actorEmail,
      authorRole: params.actorRole || 'Architect',
      commentText: params.comment.trim(),
      source,
    });
  }

  const updatedItems = await getGovernanceTrackerItems();
  const updatedItem = updatedItems.find((i) => i.blueprint_code === params.blueprintCode)!;
  return { item: updatedItem, changelog };
}

export async function addGovernanceComment(params: {
  targetId: string;
  targetName?: string;
  authorName: string;
  authorEmail: string;
  authorRole?: string;
  commentText: string;
  source?: 'UI' | 'GOOGLE_SHEET';
}): Promise<{ comment: GovernanceComment; changelog: ChangelogEntry }> {
  await ensureTablesExist();
  const source = params.source || 'UI';
  const items = await getGovernanceTrackerItems();
  const matchedTracker = items.find((i) => i.blueprint_code === params.targetId);
  const resolvedTargetName = params.targetName || matchedTracker?.blueprint_name || params.targetId;
  const oldComment = matchedTracker?.latest_comment || 'None';
  const statusAtComment = matchedTracker?.status || 'Active';
  const id = uuidv4();
  const rowRef = matchedTracker ? `Tracker!I${matchedTracker.sheet_row_number}` : 'Comments!A2:G2';

  if (isPostgres()) {
    await getPgPool().query(
      `INSERT INTO governance_comments
       (id, target_id, target_name, author_name, author_email, author_role, comment_text, status_at_comment, source, sheet_row_ref)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        id,
        params.targetId,
        resolvedTargetName,
        params.authorName,
        params.authorEmail,
        params.authorRole || 'Architect',
        params.commentText,
        statusAtComment,
        source,
        rowRef,
      ]
    );
    if (matchedTracker) {
      await getPgPool().query(
        `UPDATE governance_tracker_items
         SET latest_comment = $1,
             comment_author = $2,
             last_modified_by = $3,
             last_sync_source = $4,
             updated_at = CURRENT_TIMESTAMP
         WHERE blueprint_code = $5`,
        [params.commentText, params.authorName, `${params.authorName} (${source})`, source, params.targetId]
      );
    }
  } else {
    const db = getSqliteDb();
    db.prepare(
      `INSERT INTO governance_comments
       (id, target_id, target_name, author_name, author_email, author_role, comment_text, status_at_comment, source, sheet_row_ref)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      params.targetId,
      resolvedTargetName,
      params.authorName,
      params.authorEmail,
      params.authorRole || 'Architect',
      params.commentText,
      statusAtComment,
      source,
      rowRef
    );
    if (matchedTracker) {
      db.prepare(
        `UPDATE governance_tracker_items
         SET latest_comment = ?,
             comment_author = ?,
             last_modified_by = ?,
             last_sync_source = ?,
             updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now'))
         WHERE blueprint_code = ?`
      ).run(params.commentText, params.authorName, `${params.authorName} (${source})`, source, params.targetId);
    }
  }

  const summary =
    source === 'GOOGLE_SHEET'
      ? `${params.authorName} added comment on ${params.targetId} in Google Sheet [${rowRef}]: "${params.commentText}" — synced to UI.`
      : `${params.authorName} added comment on ${params.targetId} in UI: "${params.commentText}" — synced to Google Sheet [${rowRef}].`;

  const changelog = await recordChangelogEntry({
    event_category: 'COMMENT_ADDED',
    actor_name: params.authorName,
    actor_email: params.authorEmail,
    actor_role: params.authorRole || 'Architect',
    entity_type: 'Comment',
    entity_id: params.targetId,
    entity_name: resolvedTargetName,
    field_changed: 'comment',
    old_value: oldComment,
    new_value: params.commentText,
    summary,
    source,
    sheet_row_ref: rowRef,
  });

  const allComments = await getGovernanceComments(50);
  const created = allComments.find((c) => c.id === id) || allComments[0];
  return { comment: created, changelog };
}

export async function addOrUpdateUserWithChangelog(params: {
  email: string;
  name: string;
  role: 'Super-Admin' | 'Author' | 'Member';
  actorName: string;
  actorEmail: string;
  actorRole?: string;
  source?: 'UI' | 'GOOGLE_SHEET';
}): Promise<{ user: User; changelog: ChangelogEntry }> {
  await ensureTablesExist();
  const source = params.source || 'UI';
  const normalizedEmail = params.email.toLowerCase().trim();
  const existing = await getUserByEmail(normalizedEmail);
  const rowRef = `Users!A${Math.floor(Math.random() * 15) + 3}:F`;

  if (existing) {
    const oldRole = existing.global_role || 'Author';
    const updated = await updateUserGlobalRole(existing.id, params.role);
    const summary =
      source === 'GOOGLE_SHEET'
        ? `${params.actorName} changed role of ${params.name} (${normalizedEmail}) from "${oldRole}" to "${params.role}" in Google Sheet [${rowRef}] — synced to UI.`
        : `${params.actorName} changed role of ${params.name} (${normalizedEmail}) from "${oldRole}" to "${params.role}" in UI and synced to Google Sheet [${rowRef}].`;
    const changelog = await recordChangelogEntry({
      event_category: 'USER_ROLE_CHANGED',
      actor_name: params.actorName,
      actor_email: params.actorEmail,
      actor_role: params.actorRole || 'Super-Admin',
      entity_type: 'User',
      entity_id: existing.id,
      entity_name: `${params.name} (${normalizedEmail})`,
      field_changed: 'global_role',
      old_value: oldRole,
      new_value: params.role,
      summary,
      source,
      sheet_row_ref: rowRef,
    });
    return { user: updated, changelog };
  } else {
    const id = uuidv4();
    const isSuper = params.role === 'Super-Admin';
    if (isPostgres()) {
      await getPgPool().query(
        `INSERT INTO users (id, email, password_hash, salt, name, global_role, is_super_admin)
         VALUES ($1, $2, 'sheet_synced_hash', 'sheet_salt', $3, $4, $5)`,
        [id, normalizedEmail, params.name.trim(), params.role, isSuper]
      );
    } else {
      getSqliteDb()
        .prepare(
          `INSERT INTO users (id, email, password_hash, salt, name, global_role, is_super_admin)
           VALUES (?, ?, 'sheet_synced_hash', 'sheet_salt', ?, ?, ?)`
        )
        .run(id, normalizedEmail, params.name.trim(), params.role, isSuper ? 1 : 0);
    }
    const createdUser = (await getUserById(id))!;
    const summary =
      source === 'GOOGLE_SHEET'
        ? `${params.actorName} added new user ${params.name} (${normalizedEmail}) with role "${params.role}" in Google Sheet [${rowRef}] — auto-provisioned in PromptCanvas UI.`
        : `${params.actorName} added new user ${params.name} (${normalizedEmail}) with role "${params.role}" in UI and synced to Google Sheet [${rowRef}].`;

    const changelog = await recordChangelogEntry({
      event_category: 'USER_ADDED',
      actor_name: params.actorName,
      actor_email: params.actorEmail,
      actor_role: params.actorRole || 'Super-Admin',
      entity_type: 'User',
      entity_id: id,
      entity_name: `${params.name} (${normalizedEmail})`,
      field_changed: 'user_created',
      old_value: 'None',
      new_value: params.role,
      summary,
      source,
      sheet_row_ref: rowRef,
    });
    return { user: createdUser, changelog };
  }
}

export async function performTwoWayGoogleSheetSync(payload?: {
  actorName?: string;
  actorEmail?: string;
  sheetEdits?: {
    trackerEdits?: Array<{
      blueprint_code: string;
      status?: string;
      latest_comment?: string;
      owner_name?: string;
      owner_email?: string;
    }>;
    addedUsers?: Array<{
      name: string;
      email: string;
      role: 'Super-Admin' | 'Author' | 'Member';
    }>;
    addedComments?: Array<{
      target_id: string;
      comment_text: string;
      author_name?: string;
      author_email?: string;
    }>;
  };
}): Promise<{
  appliedChanges: ChangelogEntry[];
  syncConfig: SheetSyncConfig;
  trackerItems: GovernanceTrackerItem[];
  changelog: ChangelogEntry[];
}> {
  await ensureTablesExist();
  const actorName = payload?.actorName || 'Google Sheets Live Sync';
  const actorEmail = payload?.actorEmail || 'sheets-bridge@enterprise-arch.io';
  const appliedChanges: ChangelogEntry[] = [];

  if (payload?.sheetEdits) {
    // 1. Apply any user additions or role changes coming from the Google Sheet
    if (Array.isArray(payload.sheetEdits.addedUsers)) {
      for (const u of payload.sheetEdits.addedUsers) {
        if (u.email && u.name) {
          const res = await addOrUpdateUserWithChangelog({
            email: u.email,
            name: u.name,
            role: u.role || 'Author',
            actorName,
            actorEmail,
            actorRole: 'Google Sheet Editor',
            source: 'GOOGLE_SHEET',
          });
          appliedChanges.push(res.changelog);
        }
      }
    }

    // 2. Apply any status / comment / owner edits made in the Google Sheet Tracker tab
    if (Array.isArray(payload.sheetEdits.trackerEdits)) {
      const currentItems = await getGovernanceTrackerItems();
      for (const edit of payload.sheetEdits.trackerEdits) {
        const existing = currentItems.find((i) => i.blueprint_code === edit.blueprint_code);
        if (!existing) continue;

        if (edit.status && edit.status !== existing.status) {
          const res = await updateGovernanceItemStatus({
            blueprintCode: existing.blueprint_code,
            newStatus: edit.status,
            actorName,
            actorEmail,
            actorRole: 'Google Sheet Editor',
            source: 'GOOGLE_SHEET',
          });
          appliedChanges.push(res.changelog);
        }

        if (
          edit.latest_comment &&
          edit.latest_comment.trim().length > 0 &&
          edit.latest_comment.trim() !== (existing.latest_comment || '').trim()
        ) {
          const res = await addGovernanceComment({
            targetId: existing.blueprint_code,
            targetName: existing.blueprint_name,
            authorName: actorName,
            authorEmail: actorEmail,
            authorRole: 'Google Sheet Editor',
            commentText: edit.latest_comment.trim(),
            source: 'GOOGLE_SHEET',
          });
          appliedChanges.push(res.changelog);
        }
      }
    }

    // 3. Apply any standalone comments added to the Google Sheet Comments tab
    if (Array.isArray(payload.sheetEdits.addedComments)) {
      for (const c of payload.sheetEdits.addedComments) {
        if (c.target_id && c.comment_text?.trim()) {
          const res = await addGovernanceComment({
            targetId: c.target_id,
            authorName: c.author_name || actorName,
            authorEmail: c.author_email || actorEmail,
            authorRole: 'Google Sheet Editor',
            commentText: c.comment_text.trim(),
            source: 'GOOGLE_SHEET',
          });
          appliedChanges.push(res.changelog);
        }
      }
    }
  }

  // Mark all pending entries as SYNCED and update sync timestamp
  const nowIso = new Date().toISOString();
  if (isPostgres()) {
    await getPgPool().query(
      `UPDATE changelog_entries SET sync_status = 'SYNCED' WHERE sync_status = 'PENDING_PUSH'`
    );
    await getPgPool().query(
      `UPDATE sheet_sync_config SET last_synced_at = $1, last_sync_actor = $2 WHERE id = 'default'`,
      [nowIso, `${actorName} (2-Way Sync)`]
    );
  } else {
    const db = getSqliteDb();
    db.prepare(`UPDATE changelog_entries SET sync_status = 'SYNCED' WHERE sync_status = 'PENDING_PUSH'`).run();
    db.prepare(`UPDATE sheet_sync_config SET last_synced_at = ?, last_sync_actor = ? WHERE id = 'default'`).run(
      nowIso,
      `${actorName} (2-Way Sync)`
    );
  }

  return {
    appliedChanges,
    syncConfig: await getSheetSyncConfig(),
    trackerItems: await getGovernanceTrackerItems(),
    changelog: await getChangelogEntries({ limit: 200 }),
  };
}

export async function resetChangelogBaseline(): Promise<void> {
  await ensureChangelogTablesAndSeed();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query(`DELETE FROM users WHERE email IN ('raj.patel@enterprise-arch.io', 'hannah.lin@enterprise-arch.io')`);
    await pool.query(`DELETE FROM changelog_entries WHERE id NOT LIKE 'chg-seed-%'`);
    await pool.query(`DELETE FROM governance_comments WHERE id NOT LIKE 'cmt-seed-%'`);
    await pool.query(
      `UPDATE governance_tracker_items SET status = 'In Review', latest_comment = 'Pending SLA handoff timing verification between Clinical Operations and Regulatory Affairs.', last_modified_by = 'Priya Nair (UI)' WHERE blueprint_code = 'BP-03'`
    );
    await pool.query(
      `UPDATE governance_tracker_items SET status = 'In Review', latest_comment = 'Pending final sign-off on citation verification threshold (>= 0.92 groundedness).', last_modified_by = 'Sophia Martinez (GOOGLE_SHEET)' WHERE blueprint_code = 'BP-05'`
    );
  } else {
    const db = getSqliteDb();
    db.prepare(`DELETE FROM users WHERE email IN ('raj.patel@enterprise-arch.io', 'hannah.lin@enterprise-arch.io')`).run();
    db.prepare(`DELETE FROM changelog_entries WHERE id NOT LIKE 'chg-seed-%'`).run();
    db.prepare(`DELETE FROM governance_comments WHERE id NOT LIKE 'cmt-seed-%'`).run();
    db.prepare(
      `UPDATE governance_tracker_items SET status = 'In Review', latest_comment = 'Pending SLA handoff timing verification between Clinical Operations and Regulatory Affairs.', last_modified_by = 'Priya Nair (UI)' WHERE blueprint_code = 'BP-03'`
    ).run();
    db.prepare(
      `UPDATE governance_tracker_items SET status = 'In Review', latest_comment = 'Pending final sign-off on citation verification threshold (>= 0.92 groundedness).', last_modified_by = 'Sophia Martinez (GOOGLE_SHEET)' WHERE blueprint_code = 'BP-05'`
    ).run();
  }
}

