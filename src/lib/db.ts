import { getDefaultXmlForArchitecture } from './architectureTypes';
import { createRequire } from 'module';
if (typeof globalThis.require === 'undefined') {
  globalThis.require = createRequire(import.meta.url);
}
import { DatabaseSync } from 'node:sqlite';
import { join, dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdirSync } from 'fs';
import type { Pool } from 'pg';
import { getTechnicalArchitectureXml } from './technicalArchitectureXmls';
import {
  saveDiagramBundleToGcs,
  loadDiagramBundleFromGcs,
  deleteDiagramBundleFromGcs,
  saveSessionBundleToGcs,
  loadSessionBundleFromGcs,
  deleteSessionBundleFromGcs,
  listDiagramIdsFromGcs,
  getGcsStateBucket,
} from './gcsDiagramStore';

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

interface ContactSubmission {
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

    const { Pool: PgPool } = eval('require')('pg') as { Pool: typeof Pool };
    pgPoolInstance = new PgPool({
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

async function runSqliteTransaction<T>(callback: (db: DatabaseSync) => T | Promise<T>): Promise<T> {
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

  // Purge legacy 3-to-5 vertex stub rows, empty 0-vertex test fixtures, NOVACURA remnants, and duplicate test spam
  try {
    const legacyPurgeNames = [
      'Sales Assistant',
      'Sales Intelligence Assistant',
      'Shared Team Diagram',
      'Guest Architecture Draft',
      'Diagram User B',
      'AWS VPC SecureNetwork',
      'GCP Streaming Analytics',
      'DevOps CI/CD Deployment',
      'AI RAG Core Pipeline',
      'Gemini Enterprise Portal',
      'NotebookLM Source Grounding',
      'Multi-Agent Design Orchestrator',
      'Deep Research Agent Pipeline',
    ];
    if (isPostgres()) {
      const pool = getPgPool();
      await pool.query(
        `DELETE FROM diagram_versions WHERE diagram_id IN (
          SELECT id FROM diagrams WHERE name = ANY($1::text[])
          OR name ILIKE 'Add % more components%'
          OR name ILIKE 'Add ElastiCache%'
          OR name ILIKE 'AWS Cloud AI%'
          OR name ILIKE 'Item %WBS%'
          OR name ILIKE '%OmniCommerce%'
          OR name ILIKE '%VOLTGRID%'
          OR name ILIKE '%NEXUSFIN%'
          OR name ILIKE 'Custom Diagram #%'
          OR name ILIKE 'Unified Cloud Architecture #%'
          OR name ILIKE '%NOVACURA%'
          OR name ILIKE 'CLINICAL AI - %'
          OR name ILIKE '%Oracle%@Google%'
          OR name ILIKE '%Exadata%'
          OR name ILIKE '%E-Business Suite%'
          OR name ILIKE 'VIS-9745%'
          OR name ILIKE 'VIS-AGENTIC-01%'
          OR name ILIKE '%Tailored for: add the right components%'
        )`,
        [legacyPurgeNames]
      );
      await pool.query(
        `DELETE FROM diagrams WHERE name = ANY($1::text[])
          OR name ILIKE 'Add % more components%'
          OR name ILIKE 'Add ElastiCache%'
          OR name ILIKE 'AWS Cloud AI%'
          OR name ILIKE 'Item %WBS%'
          OR name ILIKE '%OmniCommerce%'
          OR name ILIKE '%VOLTGRID%'
          OR name ILIKE '%NEXUSFIN%'
          OR name ILIKE 'Custom Diagram #%'
          OR name ILIKE 'Unified Cloud Architecture #%'
          OR name ILIKE '%NOVACURA%'
          OR name ILIKE 'CLINICAL AI - %'
          OR name ILIKE 'VIS-9745%'
          OR name ILIKE 'VIS-AGENTIC-01%'
          OR name ILIKE '%Tailored for: add the right components%'`,
        [legacyPurgeNames]
      );
      await pool.query(
        `DELETE FROM diagram_versions WHERE TRIM(COALESCE(xml_content, '')) IN ('', '<mxfile></mxfile>') OR (xml_content LIKE '%copilot_mod_custom_box_0%' AND xml_content NOT LIKE '%copilot_mod_custom_box_5%') OR xml_content LIKE '%oracle-at-google-ebs-exadata-2026%' OR xml_content ILIKE '%NOVACURA%' OR xml_content ILIKE '%OmniCommerce%' OR xml_content ILIKE '%VOLTGRID%' OR xml_content ILIKE '%NEXUSFIN%'`
      );
      await pool.query(`DELETE FROM diagrams WHERE id NOT IN (SELECT DISTINCT diagram_id FROM diagram_versions)`);
    } else {
      const db = getSqliteDb();
      const placeholders = legacyPurgeNames.map(() => '?').join(', ');
      const likeClause = `
        OR UPPER(name) LIKE 'ADD % MORE COMPONENTS%'
        OR UPPER(name) LIKE 'ADD ELASTICACHE%'
        OR UPPER(name) LIKE 'AWS CLOUD AI%'
        OR UPPER(name) LIKE 'ITEM %WBS%'
        OR UPPER(name) LIKE '%OMNICOMMERCE%'
        OR UPPER(name) LIKE '%VOLTGRID%'
        OR UPPER(name) LIKE '%NEXUSFIN%'
        OR UPPER(name) LIKE 'CUSTOM DIAGRAM #%'
        OR UPPER(name) LIKE 'UNIFIED CLOUD ARCHITECTURE #%'
        OR UPPER(name) LIKE '%NOVACURA%'
        OR UPPER(name) LIKE 'CLINICAL AI - %'
        OR UPPER(name) LIKE 'VIS-9745%'
        OR UPPER(name) LIKE 'VIS-AGENTIC-01%'
        OR UPPER(name) LIKE '%TAILORED FOR: ADD THE RIGHT COMPONENTS%'
      `;
      db.prepare(`DELETE FROM diagram_versions WHERE diagram_id IN (SELECT id FROM diagrams WHERE name IN (${placeholders}) ${likeClause})`).run(...legacyPurgeNames);
      db.prepare(`DELETE FROM diagrams WHERE name IN (${placeholders}) ${likeClause}`).run(...legacyPurgeNames);
      // Also purge any 0-vertex empty <mxfile></mxfile> test artifacts, 1-to-5 box stubs, fake company XML remnants, or legacy flat 4-tier / Proposal-3 Oracle XML
      db.prepare(
        `DELETE FROM diagram_versions WHERE TRIM(COALESCE(xml_content, '')) IN ('', '<mxfile></mxfile>') OR (xml_content LIKE '%copilot_mod_custom_box_0%' AND xml_content NOT LIKE '%copilot_mod_custom_box_5%') OR xml_content LIKE '%oracle-at-google-ebs-exadata-2026%' OR xml_content LIKE '%oracle_ebs_exadata_closed_loop_harness%' OR UPPER(xml_content) LIKE '%NOVACURA%' OR UPPER(xml_content) LIKE '%OMNICOMMERCE%' OR UPPER(xml_content) LIKE '%VOLTGRID%' OR UPPER(xml_content) LIKE '%NEXUSFIN%'`
      ).run();
      db.prepare(`DELETE FROM diagrams WHERE id NOT IN (SELECT DISTINCT diagram_id FROM diagram_versions)`).run();
    }
  } catch {
    // Non-fatal cleanup
  }

  try {
    if (!isPostgres()) {
      const db = getSqliteDb();
      db.prepare(`DELETE FROM diagram_versions WHERE diagram_id IN (SELECT id FROM diagrams WHERE name LIKE '%NASA Closed-Loop Mission Control%' OR description LIKE '%Canonical v1.0.1%')`).run();
      db.prepare(`DELETE FROM diagrams WHERE name LIKE '%NASA Closed-Loop Mission Control%' OR description LIKE '%Canonical v1.0.1%'`).run();
    }
  } catch {}

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

let lastGcsListHydrateAt = 0;

async function hydrateAllDiagramsFromGcsIntoSqlite(): Promise<void> {
  if (isPostgres() || !getGcsStateBucket()) return;
  const now = Date.now();
  if (now - lastGcsListHydrateAt < 15_000) return;
  lastGcsListHydrateAt = now;
  try {
    const gcsIds = await listDiagramIdsFromGcs(200);
    if (gcsIds.length === 0) return;
    const db = getSqliteDb();
    const missingIds = gcsIds.filter(
      (id) => !db.prepare('SELECT id FROM diagrams WHERE id = ?').get(id)
    );
    // Bounded concurrency of 6 to avoid spiking cold-start latency
    for (let i = 0; i < missingIds.length; i += 6) {
      const batch = missingIds.slice(i, i + 6);
      await Promise.all(batch.map((id) => hydrateDiagramFromGcsIntoSqlite(id)));
    }
  } catch (err) {
    console.warn('[DB] Best-effort GCS library hydration skipped:', err);
  }
}

// Helper: List all diagrams accessible by a given user (owned, shared, or public seeded ones)
export async function listDiagrams(userId?: string): Promise<(Diagram & { xml_content?: string; prompt?: string | null; version_count?: number; max_version?: number })[]> {
  await ensureTablesExist();
  if (!isPostgres()) {
    await hydrateAllDiagramsFromGcsIntoSqlite();
  }
  
  if (userId) {
    if (isPostgres()) {
      const query = `
        SELECT d.*, v.xml_content, v.prompt,
          (SELECT COUNT(*)::int FROM diagram_versions dv WHERE dv.diagram_id = d.id) as version_count,
          (SELECT COALESCE(MAX(version_number), 1)::int FROM diagram_versions dv WHERE dv.diagram_id = d.id) as max_version,
          CASE 
            WHEN d.user_id = $1 THEN 'Owner'
            WHEN c.access_level IS NOT NULL THEN c.access_level
            ELSE 'Editor'
          END as access_level
        FROM diagrams d
        LEFT JOIN diagram_collaborators c ON c.diagram_id = d.id AND c.user_id = $1
        LEFT JOIN diagram_versions v ON v.id = (
          SELECT id 
          FROM diagram_versions 
          WHERE diagram_id = d.id
          ORDER BY version_number DESC, created_at DESC
          LIMIT 1
        )
        WHERE d.user_id = $1 OR c.user_id = $1 OR (d.user_id IS NOT NULL AND COALESCE(d.is_private, false) = false)
        ORDER BY d.updated_at DESC
      `;
      const pool = getPgPool();
      const res = await pool.query(query, [userId]);
      return res.rows;
    } else {
      const query = `
        SELECT d.*, v.xml_content, v.prompt,
          (SELECT COUNT(*) FROM diagram_versions dv WHERE dv.diagram_id = d.id) as version_count,
          (SELECT COALESCE(MAX(version_number), 1) FROM diagram_versions dv WHERE dv.diagram_id = d.id) as max_version,
          CASE 
            WHEN d.user_id = ? THEN 'Owner'
            WHEN c.access_level IS NOT NULL THEN c.access_level
            ELSE 'Editor'
          END as access_level
        FROM diagrams d
        LEFT JOIN diagram_collaborators c ON c.diagram_id = d.id AND c.user_id = ?
        LEFT JOIN diagram_versions v ON v.id = (
          SELECT id 
          FROM diagram_versions 
          WHERE diagram_id = d.id
          ORDER BY version_number DESC, created_at DESC
          LIMIT 1
        )
        WHERE d.user_id = ? OR c.user_id = ? OR (d.user_id IS NOT NULL AND COALESCE(d.is_private, 0) = 0)
        ORDER BY d.updated_at DESC
      `;
      const db = getSqliteDb();
      const stmt = db.prepare(query);
      return stmt.all(userId, userId, userId, userId) as unknown as (Diagram & { xml_content?: string; prompt?: string | null; version_count?: number; max_version?: number })[];
    }
  } else {
    if (isPostgres()) {
      const query = `
        SELECT d.*, v.xml_content, v.prompt,
          (SELECT COUNT(*)::int FROM diagram_versions dv WHERE dv.diagram_id = d.id) as version_count,
          (SELECT COALESCE(MAX(version_number), 1)::int FROM diagram_versions dv WHERE dv.diagram_id = d.id) as max_version,
          'Viewer' as access_level
        FROM diagrams d
        LEFT JOIN diagram_versions v ON v.id = (
          SELECT id
          FROM diagram_versions
          WHERE diagram_id = d.id
          ORDER BY version_number DESC, created_at DESC
          LIMIT 1
        )
        WHERE d.user_id IS NOT NULL AND COALESCE(d.is_private, false) = false
        ORDER BY d.updated_at DESC
      `;
      const res = await getPgPool().query(query);
      return res.rows;
    }
    const query = `
      SELECT d.*, v.xml_content, v.prompt,
        (SELECT COUNT(*) FROM diagram_versions dv WHERE dv.diagram_id = d.id) as version_count,
        (SELECT COALESCE(MAX(version_number), 1) FROM diagram_versions dv WHERE dv.diagram_id = d.id) as max_version,
        'Viewer' as access_level
      FROM diagrams d
      LEFT JOIN diagram_versions v ON v.id = (
        SELECT id
        FROM diagram_versions
        WHERE diagram_id = d.id
        ORDER BY version_number DESC, created_at DESC
        LIMIT 1
      )
      WHERE d.user_id IS NOT NULL AND COALESCE(d.is_private, 0) = 0
      ORDER BY d.updated_at DESC
    `;
    const db = getSqliteDb();
    return db.prepare(query).all() as unknown as (Diagram & { xml_content?: string; prompt?: string | null; version_count?: number; max_version?: number })[];
  }
}

async function hydrateDiagramFromGcsIntoSqlite(id: string): Promise<boolean> {
  if (isPostgres() || !getGcsStateBucket() || !id) return false;
  const db = getSqliteDb();
  const existing = db.prepare('SELECT id FROM diagrams WHERE id = ?').get(id);
  if (existing) return true;
  const bundle = await loadDiagramBundleFromGcs(id);
  if (!bundle?.diagram?.id) return false;
  try {
    await runSqliteTransaction(async (tx) => {
      const d = bundle.diagram;
      tx.prepare(
        'INSERT OR IGNORE INTO diagrams (id, name, user_id, architecture_type, is_private, created_studio, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP), COALESCE(?, CURRENT_TIMESTAMP))'
      ).run(
        d.id,
        d.name || 'Saved Architecture',
        d.user_id || null,
        d.architecture_type || 'v2_freeform',
        d.is_private ? 1 : 0,
        d.created_studio || 'prompt_to_diagram',
        d.created_at ? String(d.created_at) : null,
        d.updated_at ? String(d.updated_at) : null
      );
      const insertVer = tx.prepare(`
        INSERT OR IGNORE INTO diagram_versions
          (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type, graph_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))
      `);
      for (const v of bundle.versions || []) {
        insertVer.run(
          v.id || uuidv4(),
          d.id,
          v.version_number || 1,
          v.xml_content || '',
          v.comment || null,
          v.created_by || 'AI',
          v.prompt || null,
          v.ai_reasoning || null,
          v.business_usecase || null,
          v.technical_usecase || null,
          v.architecture_type || d.architecture_type || 'v2_freeform',
          v.graph_json || null,
          v.created_at ? String(v.created_at) : null
        );
      }
    });
    return true;
  } catch (err) {
    console.warn(`[DB] Failed hydrating GCS diagram ${id} into SQLite:`, err);
    return false;
  }
}

async function mirrorDiagramFromSqliteToGcs(diagramId: string): Promise<void> {
  if (isPostgres() || !getGcsStateBucket() || !diagramId) return;
  try {
    const db = getSqliteDb();
    const diag = db.prepare('SELECT * FROM diagrams WHERE id = ?').get(diagramId) as unknown as Diagram | undefined;
    if (!diag) return;
    const versions = db
      .prepare('SELECT * FROM diagram_versions WHERE diagram_id = ? ORDER BY version_number DESC')
      .all(diagramId) as unknown as DiagramVersion[];
    await saveDiagramBundleToGcs({ diagram: diag, versions });
  } catch (err) {
    console.warn(`[DB] Best-effort GCS mirror skipped for ${diagramId}:`, err);
  }
}

// Helper: Get a single diagram by ID (verifying owner or collaborator access)
export async function getDiagram(id: string, userId?: string): Promise<(Diagram & { access_level?: string | null }) | null> {
  await ensureTablesExist();
  if (!isPostgres()) {
    await hydrateDiagramFromGcsIntoSqlite(id);
  }
  
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
    await mirrorDiagramFromSqliteToGcs(diagramId);
  }
}

export interface BackfillVersionInput {
  version_number?: number;
  xml: string;
  comment?: string | null;
  prompt?: string | null;
  created_by?: string | null;
  created_at?: string | null;
}

// Helper: Create a new diagram with an optional initial XML, userId, canonical graph_json, and full version history backfill
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
  createdStudio: string = 'dashboard',
  graphJson?: string | null,
  explicitId?: string | null,
  versionsHistory?: BackfillVersionInput[] | null
): Promise<{ diagram: Diagram; version: DiagramVersion | null }> {
  await ensureTablesExist();
  const cleanedExplicitId =
    explicitId && /^[a-zA-Z0-9._-]{4,128}$/.test(explicitId.trim())
      ? explicitId.trim()
      : null;

  const validBackfill = Array.isArray(versionsHistory)
    ? versionsHistory
        .filter((v) => v && typeof v.xml === 'string' && v.xml.trim().length > 0)
        .map((v, idx) => ({
          version_number: Number.isFinite(Number(v.version_number)) && Number(v.version_number) > 0 ? Number(v.version_number) : idx + 1,
          xml: v.xml,
          comment: v.comment || `Snapshot v${idx + 1}`,
          prompt: v.prompt || prompt || null,
          created_by: v.created_by || 'User',
          created_at: v.created_at || null,
        }))
        .sort((a, b) => a.version_number - b.version_number)
    : [];

  if (cleanedExplicitId) {
    if (!isPostgres()) {
      await hydrateDiagramFromGcsIntoSqlite(cleanedExplicitId);
    }
    let idAlreadyExists = false;
    if (isPostgres()) {
      const existsRes = await getPgPool().query('SELECT 1 FROM diagrams WHERE id = $1 LIMIT 1', [cleanedExplicitId]);
      idAlreadyExists = (existsRes.rowCount || 0) > 0;
    } else {
      idAlreadyExists = Boolean(getSqliteDb().prepare('SELECT 1 FROM diagrams WHERE id = ?').get(cleanedExplicitId));
    }

    if (idAlreadyExists) {
      const existingDiag = await getDiagram(cleanedExplicitId, userId || undefined);
      if (!existingDiag || existingDiag.access_level === 'Viewer') {
        throw new Error('Forbidden: Only the owner or an authorized editor can overwrite an existing diagram ID.');
      }
      if (name && name.trim() && name.trim() !== existingDiag.name && existingDiag.access_level === 'Owner') {
        await updateDiagramName(cleanedExplicitId, name.trim());
      }
      if (
        existingDiag.access_level === 'Owner' &&
        validBackfill.length > (existingDiag.versions?.length || 0) &&
        !isPostgres()
      ) {
        await runSqliteTransaction(async (db) => {
          db.prepare('DELETE FROM diagram_versions WHERE diagram_id = ?').run(cleanedExplicitId);
          const insVer = db.prepare(`
            INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type, graph_json, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, strftime('%Y-%m-%d %H:%M:%f', 'now')))
          `);
          validBackfill.forEach((bv, idx) => {
            insVer.run(
              uuidv4(),
              cleanedExplicitId,
              idx + 1,
              bv.xml,
              bv.comment,
              bv.created_by,
              bv.prompt,
              aiReasoning || null,
              businessUsecase || null,
              technicalUsecase || null,
              architectureType || existingDiag.architecture_type || 'conceptual_diagram',
              graphJson ?? null,
              bv.created_at
            );
          });
          db.prepare("UPDATE diagrams SET updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) WHERE id = ?").run(cleanedExplicitId);
        });
        await mirrorDiagramFromSqliteToGcs(cleanedExplicitId);
        const refreshedMulti = (await getDiagram(cleanedExplicitId, userId || undefined)) || existingDiag;
        return { diagram: refreshedMulti, version: refreshedMulti.versions?.[0] || null };
      }
      const ver =
        initialXml !== undefined
          ? await saveDiagramVersion(
              cleanedExplicitId,
              initialXml,
              comment || 'Saved updated snapshot',
              'User',
              prompt,
              aiReasoning,
              businessUsecase,
              technicalUsecase,
              architectureType || existingDiag.architecture_type || 'unified_system_view',
              graphJson
            )
          : existingDiag.versions?.[0] || null;
      const refreshed = (await getDiagram(cleanedExplicitId, userId || undefined)) || existingDiag;
      return { diagram: refreshed, version: ver };
    }
  }

  const diagramId = cleanedExplicitId || uuidv4();
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
      if (validBackfill.length > 0) {
        let lastInsertedId = versionId;
        for (let i = 0; i < validBackfill.length; i++) {
          const bv = validBackfill[i];
          const vid = i === validBackfill.length - 1 ? versionId : uuidv4();
          lastInsertedId = vid;
          await client.query(`
            INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type, graph_json)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          `, [
            vid,
            diagramId,
            i + 1,
            bv.xml,
            bv.comment,
            bv.created_by,
            bv.prompt,
            aiReasoning || null,
            businessUsecase || null,
            technicalUsecase || null,
            architectureType || 'conceptual_diagram',
            graphJson ?? null,
          ]);
        }
        const getVer = await client.query('SELECT * FROM diagram_versions WHERE id = $1', [lastInsertedId]);
        version = getVer.rows[0] as DiagramVersion;
      } else if (initialXml !== undefined) {
        await client.query(`
          INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type, graph_json)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
          architectureType || 'conceptual_diagram',
          graphJson ?? null
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
      const insertDiagram = db.prepare('INSERT OR REPLACE INTO diagrams (id, name, user_id, architecture_type, is_private, created_studio) VALUES (?, ?, ?, ?, ?, ?)');
      insertDiagram.run(diagramId, name, userId || null, architectureType || 'unified_system_view', privateValSqlite, createdStudio || 'studio1');

      let version: DiagramVersion | null = null;
      if (validBackfill.length > 0) {
        db.prepare('DELETE FROM diagram_versions WHERE diagram_id = ?').run(diagramId);
        const insertVersion = db.prepare(`
          INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type, graph_json, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, strftime('%Y-%m-%d %H:%M:%f', 'now')))
        `);
        let lastId = versionId;
        for (let i = 0; i < validBackfill.length; i++) {
          const bv = validBackfill[i];
          const vid = i === validBackfill.length - 1 ? versionId : uuidv4();
          lastId = vid;
          insertVersion.run(
            vid,
            diagramId,
            i + 1,
            bv.xml,
            bv.comment,
            bv.created_by,
            bv.prompt,
            aiReasoning || null,
            businessUsecase || null,
            technicalUsecase || null,
            architectureType || 'conceptual_diagram',
            graphJson ?? null,
            bv.created_at
          );
        }
        const getVersion = db.prepare('SELECT * FROM diagram_versions WHERE id = ?');
        version = getVersion.get(lastId) as unknown as DiagramVersion;
      } else if (initialXml !== undefined) {
        const insertVersion = db.prepare(`
          INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase, architecture_type, graph_json)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          architectureType || 'conceptual_diagram',
          graphJson ?? null
        );
        const getVersion = db.prepare('SELECT * FROM diagram_versions WHERE id = ?');
        version = getVersion.get(versionId) as unknown as DiagramVersion;
      }

      const getDiag = db.prepare('SELECT * FROM diagrams WHERE id = ?');
      const diagram = getDiag.get(diagramId) as unknown as Diagram;
      return { diagram, version };
    }).then(async (created) => {
      await mirrorDiagramFromSqliteToGcs(created.diagram.id);
      return created;
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
      
      const maxVer = await client.query("SELECT COALESCE(MAX(version_number), 0) as max_version FROM diagram_versions WHERE diagram_id = $1", [diagramId]);
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
      const latestExisting = db
        .prepare('SELECT * FROM diagram_versions WHERE diagram_id = ? ORDER BY version_number DESC LIMIT 1')
        .get(diagramId) as unknown as DiagramVersion | undefined;
      if (
        latestExisting &&
        typeof latestExisting.xml_content === 'string' &&
        latestExisting.xml_content.trim() === String(xmlContent || '').trim()
      ) {
        if (comment && comment.trim()) {
          db.prepare('UPDATE diagram_versions SET comment = ? WHERE id = ?').run(comment.trim(), latestExisting.id);
        }
        db.prepare("UPDATE diagrams SET updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) WHERE id = ?").run(diagramId);
        return db.prepare('SELECT * FROM diagram_versions WHERE id = ?').get(latestExisting.id) as unknown as DiagramVersion;
      }

      const maxVersionStmt = db.prepare("SELECT COALESCE(MAX(version_number), 0) as max_version FROM diagram_versions WHERE diagram_id = ?");
      const versionResult = maxVersionStmt.get(diagramId) as { max_version: number };
      const nextVersionNumber = versionResult.max_version + 1;

      db.prepare('INSERT OR IGNORE INTO diagrams (id, name, architecture_type, is_private, created_studio) VALUES (?, ?, ?, 0, ?)').run(
        diagramId,
        comment || 'Diagram',
        architectureType || 'unified_system_view',
        'studio1'
      );

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
    }).then(async (savedVer) => {
      await mirrorDiagramFromSqliteToGcs(diagramId);
      return savedVer;
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
    await hydrateDiagramFromGcsIntoSqlite(diagramId);
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
    await hydrateDiagramFromGcsIntoSqlite(id);
    const db = getSqliteDb();
    const existingRow = db.prepare('SELECT id, user_id FROM diagrams WHERE id = ?').get(id) as { id: string; user_id: string | null } | undefined;
    if (!existingRow) {
      return;
    }
    if (isSuperAdmin) {
      db.prepare('DELETE FROM diagrams WHERE id = ?').run(id);
      await deleteDiagramBundleFromGcs(id);
    } else {
      const stmt = db.prepare(
        `DELETE FROM diagrams 
         WHERE id = ? 
           AND (
             user_id = ? 
             OR user_id IS NULL
             OR id IN (SELECT diagram_id FROM diagram_collaborators WHERE user_id = ? AND access_level = 'Owner')
           )`
      );
      const info = stmt.run(id, userId!, userId!);
      if (Number(info.changes || 0) === 0) {
        throw new Error('Forbidden: Only the diagram owner or Super-Admin can delete this diagram.');
      }
      await deleteDiagramBundleFromGcs(id);
    }
  }
}

// Helper: Batch Delete multiple diagrams (strictly scoped to creator, owner collaborator, unowned legacy, or super-admin)
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
    await Promise.all(ids.map((id) => hydrateDiagramFromGcsIntoSqlite(id)));
    const db = getSqliteDb();
    const placeholders = ids.map(() => '?').join(',');
    let authorizedIds: string[] = [];
    if (isSuperAdmin) {
      const rows = db.prepare(`SELECT id FROM diagrams WHERE id IN (${placeholders})`).all(...ids) as Array<{ id: string }>;
      authorizedIds = rows.map((r) => r.id);
    } else {
      const rows = db
        .prepare(
          `SELECT id FROM diagrams 
           WHERE id IN (${placeholders}) 
             AND (
               user_id = ? 
               OR user_id IS NULL
               OR id IN (SELECT diagram_id FROM diagram_collaborators WHERE user_id = ? AND access_level = 'Owner')
             )`
        )
        .all(...ids, userId!, userId!) as Array<{ id: string }>;
      authorizedIds = rows.map((r) => r.id);
    }
    if (authorizedIds.length === 0) return 0;
    const authPlaceholders = authorizedIds.map(() => '?').join(',');
    const info = db.prepare(`DELETE FROM diagrams WHERE id IN (${authPlaceholders})`).run(...authorizedIds);
    await Promise.all(authorizedIds.map((id) => deleteDiagramBundleFromGcs(id)));
    return Number(info.changes || 0);
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
    await hydrateAllDiagramsFromGcsIntoSqlite();
    const db = getSqliteDb();
    const ownedRows = db.prepare('SELECT id FROM diagrams WHERE user_id = ?').all(userId) as Array<{ id: string }>;
    db.prepare('DELETE FROM diagrams WHERE user_id = ?').run(userId);
    await Promise.all(ownedRows.map((r) => deleteDiagramBundleFromGcs(r.id)));
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
    await pool.query('UPDATE diagrams SET architecture_type = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [architectureType, diagramId]);
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare("UPDATE diagrams SET architecture_type = ?, updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) WHERE id = ?");
    stmt.run(architectureType, diagramId);
    await mirrorDiagramFromSqliteToGcs(diagramId);
  }
}

export async function updateDiagramName(diagramId: string, name: string): Promise<void> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query('UPDATE diagrams SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [name, diagramId]);
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare("UPDATE diagrams SET name = ?, updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) WHERE id = ?");
    stmt.run(name, diagramId);
    await mirrorDiagramFromSqliteToGcs(diagramId);
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
      await mirrorDiagramFromSqliteToGcs(diagramId);
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
    const created = getSess.get(id) as unknown as Session;
    const uRow = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
    if (uRow) {
      await saveSessionBundleToGcs(id, {
        session: {
          user_id: userId,
          expires_at: expiresStr,
          created_at: String(created?.created_at || new Date().toISOString()),
        },
        user: {
          id: uRow.id,
          email: uRow.email,
          name: uRow.name || null,
          global_role: uRow.global_role,
          is_super_admin: Boolean(uRow.is_super_admin),
          created_at: String(uRow.created_at || new Date().toISOString()),
        },
      });
    }
    return created;
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
    let row = stmt.get(sessionId) as any;
    if (!row) {
      const gcsSess = await loadSessionBundleFromGcs(sessionId);
      if (gcsSess?.user?.id && gcsSess?.session?.expires_at) {
        try {
          db.prepare(
            `INSERT OR IGNORE INTO users (id, email, password_hash, salt, name, global_role, is_super_admin, created_at)
             VALUES (?, ?, 'gcs_hydrated_hash', 'gcs_hydrated_salt', ?, ?, ?, COALESCE(?, strftime('%Y-%m-%d %H:%M:%f', 'now')))`
          ).run(
            gcsSess.user.id,
            gcsSess.user.email,
            gcsSess.user.name,
            gcsSess.user.global_role || 'Author',
            gcsSess.user.is_super_admin ? 1 : 0,
            gcsSess.user.created_at
          );
          db.prepare(
            `INSERT OR IGNORE INTO sessions (id, user_id, expires_at, created_at)
             VALUES (?, ?, ?, COALESCE(?, strftime('%Y-%m-%d %H:%M:%f', 'now')))`
          ).run(sessionId, gcsSess.user.id, gcsSess.session.expires_at, gcsSess.session.created_at);
          row = stmt.get(sessionId) as any;
        } catch {}
      }
    }
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
    await deleteSessionBundleFromGcs(sessionId);
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

type ChangelogCategory =
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
    { id: 'usr-admin-1', email: 'nitinagga@google.com', name: 'Nitin Aggarwal', role: 'Super-Admin', isSuper: 1 },
    { id: 'usr-elena', email: 'arch-review-board@google.com', name: 'Principal Domain Architecture Team', role: 'Author', isSuper: 0 },
    { id: 'usr-marcus', email: 'cloud-governance-board@google.com', name: 'Cloud Architecture Review Board', role: 'Super-Admin', isSuper: 1 },
    { id: 'usr-sophia', email: 'ai-security-board@google.com', name: 'AI Security & Risk Review Board', role: 'Author', isSuper: 0 },
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

  // Migrate any legacy @enterprise-arch.io or personal mock names in existing SQLite/Postgres rows
  if (!isPostgres()) {
    const db = getSqliteDb();
    db.prepare(`UPDATE users SET email = 'nitinagga@google.com', name = 'Nitin Aggarwal' WHERE id = 'usr-admin-1' OR email = 'nitin.aggarwal@enterprise-arch.io'`).run();
    db.prepare(`UPDATE users SET email = 'arch-review-board@google.com', name = 'Principal Domain Architecture Team' WHERE id = 'usr-elena' OR email = 'elena.rostova@enterprise-arch.io'`).run();
    db.prepare(`UPDATE users SET email = 'cloud-governance-board@google.com', name = 'Cloud Architecture Review Board' WHERE id = 'usr-marcus' OR email = 'marcus.vance@enterprise-arch.io'`).run();
    db.prepare(`UPDATE users SET email = 'ai-security-board@google.com', name = 'AI Security & Risk Review Board' WHERE id = 'usr-sophia' OR email = 'sophia.martinez@enterprise-arch.io'`).run();

    db.prepare(`UPDATE governance_tracker_items SET owner_email = 'nitinagga@google.com', owner_name = 'Nitin Aggarwal', comment_author = 'Nitin Aggarwal', last_modified_by = 'Nitin Aggarwal (UI)' WHERE blueprint_code = 'BP-00'`).run();
    db.prepare(`UPDATE governance_tracker_items SET owner_email = 'arch-review-board@google.com', owner_name = 'Principal Domain Architecture Team', comment_author = 'Principal Domain Architecture Team', last_modified_by = 'Principal Domain Architecture Team (UI)' WHERE blueprint_code = 'BP-01'`).run();
    db.prepare(`UPDATE governance_tracker_items SET owner_email = 'cloud-governance-board@google.com', owner_name = 'Cloud Architecture Review Board', comment_author = 'Cloud Architecture Review Board', last_modified_by = 'Cloud Architecture Review Board (GOOGLE_SHEET)' WHERE blueprint_code = 'BP-02'`).run();
    db.prepare(`UPDATE governance_tracker_items SET owner_email = 'clinical-ops-arch@google.com', owner_name = 'Clinical Operations Architecture Team', comment_author = 'Clinical Operations Architecture Team', last_modified_by = 'Clinical Operations Architecture Team (GOOGLE_SHEET)' WHERE blueprint_code = 'BP-03'`).run();
    db.prepare(`UPDATE governance_tracker_items SET owner_email = 'data-lakehouse-arch@google.com', owner_name = 'Enterprise Data & Lakehouse Team', comment_author = 'Enterprise Data & Lakehouse Team', last_modified_by = 'Enterprise Data & Lakehouse Team (UI)' WHERE blueprint_code = 'BP-04'`).run();
    db.prepare(`UPDATE governance_tracker_items SET owner_email = 'ai-security-board@google.com', owner_name = 'AI Security & Risk Review Board', comment_author = 'AI Security & Risk Review Board', last_modified_by = 'AI Security & Risk Review Board (UI)' WHERE blueprint_code = 'BP-05'`).run();

    db.prepare(`UPDATE governance_comments SET author_name = 'Principal Domain Architecture Team', author_email = 'arch-review-board@google.com' WHERE id = 'cmt-seed-1' OR author_email = 'elena.rostova@enterprise-arch.io'`).run();
    db.prepare(`UPDATE governance_comments SET author_name = 'Cloud Architecture Review Board', author_email = 'cloud-governance-board@google.com' WHERE id = 'cmt-seed-2' OR author_email = 'marcus.vance@enterprise-arch.io'`).run();
    db.prepare(`UPDATE governance_comments SET author_name = 'AI Security & Risk Review Board', author_email = 'ai-security-board@google.com' WHERE id = 'cmt-seed-3' OR author_email = 'sophia.martinez@enterprise-arch.io'`).run();

    db.prepare(`UPDATE changelog_entries SET actor_email = 'nitinagga@google.com' WHERE actor_email = 'nitin.aggarwal@enterprise-arch.io'`).run();
    db.prepare(`UPDATE changelog_entries SET actor_name = 'Cloud Architecture Review Board', actor_email = 'cloud-governance-board@google.com' WHERE actor_email = 'marcus.vance@enterprise-arch.io'`).run();
    db.prepare(`UPDATE changelog_entries SET actor_name = 'Principal Domain Architecture Team', actor_email = 'arch-review-board@google.com' WHERE actor_email = 'elena.rostova@enterprise-arch.io'`).run();
    db.prepare(`UPDATE changelog_entries SET actor_name = 'AI Security & Risk Review Board', actor_email = 'ai-security-board@google.com' WHERE actor_email = 'sophia.martinez@enterprise-arch.io'`).run();
    db.prepare(`UPDATE changelog_entries SET entity_name = 'Principal Domain Architecture Team (arch-review-board@google.com)', summary = 'Added Principal Domain Architecture Team via PromptCanvas Admin UI and synced to Google Sheet [Users!A3:F3].' WHERE id = 'chg-seed-01'`).run();
    db.prepare(`UPDATE changelog_entries SET entity_name = 'AI Security & Risk Review Board (ai-security-board@google.com)', summary = 'Added AI Security & Risk Review Board directly in Google Sheet [Users!A4:F4] — auto-imported into PromptCanvas UI.' WHERE id = 'chg-seed-02'`).run();
    db.prepare(`UPDATE changelog_entries SET entity_name = 'Cloud Architecture Review Board (cloud-governance-board@google.com)', summary = 'Promoted Cloud Architecture Review Board from Member to Super-Admin in UI and pushed role update to Google Sheet [Users!D5].' WHERE id = 'chg-seed-03'`).run();
    db.prepare(`UPDATE changelog_entries SET summary = 'Cloud Architecture Review Board changed status of BP-02 from "In Review" to "Approved" in Google Sheet [Tracker!E4] — synced to UI.' WHERE id = 'chg-seed-04'`).run();
    db.prepare(`UPDATE changelog_entries SET summary = 'AI Security & Risk Review Board added review comment on BP-05 in Google Sheet [Comments!A4:G4] — synced to UI.' WHERE id = 'chg-seed-05'`).run();
    db.prepare(`UPDATE changelog_entries SET summary = 'Principal Domain Architecture Team updated BP-01 status from "Approved" to "Production Certified" in UI and pushed to Google Sheet [Tracker!E3].' WHERE id = 'chg-seed-06'`).run();
    db.prepare(`UPDATE changelog_entries SET summary = REPLACE(REPLACE(REPLACE(REPLACE(summary, 'Marcus Vance', 'Cloud Architecture Review Board'), 'Dr. Elena Rostova', 'Principal Domain Architecture Team'), 'Sophia Martinez', 'AI Security & Risk Review Board'), 'Priya Nair', 'Clinical Operations Architecture Team')`).run();
    db.prepare(`UPDATE sheet_sync_config SET last_sync_actor = REPLACE(last_sync_actor, 'Marcus Vance', 'Cloud Architecture Review Board')`).run();
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
        owner_email: 'nitinagga@google.com',
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
        owner_name: 'Principal Domain Architecture Team',
        owner_email: 'arch-review-board@google.com',
        latest_comment: 'Upgraded to vendor-neutral L1 System Context with CDISC ODM, HL7 FHIR R4, IDMP & GxP Part 11 contracts.',
        comment_author: 'Principal Domain Architecture Team',
        version: 'v3.4',
        last_modified_by: 'Principal Domain Architecture Team (UI)',
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
        owner_name: 'Cloud Architecture Review Board',
        owner_email: 'cloud-governance-board@google.com',
        latest_comment: 'Synced capability maturity ratings from Architecture Review Board Google Sheet.',
        comment_author: 'Cloud Architecture Review Board',
        version: 'v3.2',
        last_modified_by: 'Cloud Architecture Review Board (GOOGLE_SHEET)',
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
        owner_name: 'Clinical Operations Architecture Team',
        owner_email: 'clinical-ops-arch@google.com',
        latest_comment: 'Validating SLA handoff gates between Clinical Operations and Regulatory Submissions.',
        comment_author: 'Clinical Operations Architecture Team',
        version: 'v3.1',
        last_modified_by: 'Clinical Operations Architecture Team (GOOGLE_SHEET)',
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
        owner_name: 'Enterprise Data & Lakehouse Team',
        owner_email: 'data-lakehouse-arch@google.com',
        latest_comment: 'Verified Iceberg/Delta open table formats and PII tokenization gateway.',
        comment_author: 'Enterprise Data & Lakehouse Team',
        version: 'v3.3',
        last_modified_by: 'Enterprise Data & Lakehouse Team (UI)',
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
        owner_name: 'AI Security & Risk Review Board',
        owner_email: 'ai-security-board@google.com',
        latest_comment: 'Pending final sign-off on citation verification threshold (>= 0.92 groundedness).',
        comment_author: 'AI Security & Risk Review Board',
        version: 'v3.2',
        last_modified_by: 'AI Security & Risk Review Board (UI)',
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
    const defaultSheetId = '';
    const defaultSheetUrl = '';
    const defaultTitle = 'PromptCanvas — Governance Changelog Ledger';
    if (isPostgres()) {
      await getPgPool().query(
        `INSERT INTO sheet_sync_config
         (id, spreadsheet_id, spreadsheet_url, sheet_title, auto_sync_enabled, sync_mode, last_synced_at, last_sync_actor, total_ui_to_sheet_pushes, total_sheet_to_ui_pulls)
         VALUES ('default', $1, $2, $3, 0, 'CSV_AND_WEBHOOK', $4, 'Local Governance Ledger', 0, 0)
         ON CONFLICT (id) DO NOTHING`,
        [defaultSheetId, defaultSheetUrl, defaultTitle, nowIso]
      );
    } else {
      getSqliteDb()
        .prepare(
          `INSERT OR IGNORE INTO sheet_sync_config
           (id, spreadsheet_id, spreadsheet_url, sheet_title, auto_sync_enabled, sync_mode, last_synced_at, last_sync_actor, total_ui_to_sheet_pushes, total_sheet_to_ui_pulls)
           VALUES ('default', ?, ?, ?, 0, 'CSV_AND_WEBHOOK', ?, 'Local Governance Ledger', 0, 0)`
        )
        .run(defaultSheetId, defaultSheetUrl, defaultTitle, nowIso);
    }
  } else {
    // Purge legacy hardcoded Google quickstart sample sheet ID (`1BxiMVs...`) & fake counters if present
    if (isPostgres()) {
      await getPgPool().query(
        `UPDATE sheet_sync_config
         SET spreadsheet_id = '', spreadsheet_url = '', sync_mode = 'CSV_AND_WEBHOOK', total_ui_to_sheet_pushes = 0, total_sheet_to_ui_pulls = 0
         WHERE spreadsheet_id = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'`
      );
    } else {
      getSqliteDb()
        .prepare(
          `UPDATE sheet_sync_config
           SET spreadsheet_id = '', spreadsheet_url = '', sync_mode = 'CSV_AND_WEBHOOK', total_ui_to_sheet_pushes = 0, total_sheet_to_ui_pulls = 0
           WHERE spreadsheet_id = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'`
        )
        .run();
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
        author_name: 'Principal Domain Architecture Team',
        author_email: 'arch-review-board@google.com',
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
        author_name: 'Cloud Architecture Review Board',
        author_email: 'cloud-governance-board@google.com',
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
        author_name: 'AI Security & Risk Review Board',
        author_email: 'ai-security-board@google.com',
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
        actor_email: 'nitinagga@google.com',
        actor_role: 'Super-Admin',
        entity_type: 'User',
        entity_id: 'usr-elena',
        entity_name: 'Principal Domain Architecture Team (arch-review-board@google.com)',
        field_changed: 'user_created',
        old_value: 'None',
        new_value: 'Author (Principal Domain Architect)',
        summary: 'Added Principal Domain Architecture Team via PromptCanvas Admin UI and synced to Google Sheet [Users!A3:F3].',
        source: 'UI',
        sync_status: 'SYNCED',
        sheet_row_ref: 'Users!A3:F3',
      },
      {
        id: 'chg-seed-02',
        event_category: 'USER_ADDED',
        actor_id: 'sheet-sync',
        actor_name: 'Cloud Architecture Review Board',
        actor_email: 'cloud-governance-board@google.com',
        actor_role: 'Super-Admin',
        entity_type: 'User',
        entity_id: 'usr-sophia',
        entity_name: 'AI Security & Risk Review Board (ai-security-board@google.com)',
        field_changed: 'user_created',
        old_value: 'None',
        new_value: 'Author (AI Security & Risk Reviewer)',
        summary: 'Added AI Security & Risk Review Board directly in Google Sheet [Users!A4:F4] — auto-imported into PromptCanvas UI.',
        source: 'GOOGLE_SHEET',
        sync_status: 'PULLED_FROM_SHEET',
        sheet_row_ref: 'Users!A4:F4',
      },
      {
        id: 'chg-seed-03',
        event_category: 'USER_ROLE_CHANGED',
        actor_id: 'usr-admin-1',
        actor_name: 'Nitin Aggarwal',
        actor_email: 'nitinagga@google.com',
        actor_role: 'Super-Admin',
        entity_type: 'User',
        entity_id: 'usr-marcus',
        entity_name: 'Cloud Architecture Review Board (cloud-governance-board@google.com)',
        field_changed: 'global_role',
        old_value: 'Member',
        new_value: 'Super-Admin',
        summary: 'Promoted Cloud Architecture Review Board from Member to Super-Admin in UI and pushed role update to Google Sheet [Users!D5].',
        source: 'UI',
        sync_status: 'SYNCED',
        sheet_row_ref: 'Users!D5',
      },
      {
        id: 'chg-seed-04',
        event_category: 'STATUS_CHANGED',
        actor_id: 'sheet-sync',
        actor_name: 'Cloud Architecture Review Board',
        actor_email: 'cloud-governance-board@google.com',
        actor_role: 'Super-Admin',
        entity_type: 'Blueprint',
        entity_id: 'BP-02',
        entity_name: '02 — Core Business Capability Map (L1–L2 Domain Taxonomy)',
        field_changed: 'status',
        old_value: 'In Review',
        new_value: 'Approved',
        summary: 'Cloud Architecture Review Board changed status of BP-02 from "In Review" to "Approved" in Google Sheet [Tracker!E4] — synced to UI.',
        source: 'GOOGLE_SHEET',
        sync_status: 'PULLED_FROM_SHEET',
        sheet_row_ref: 'Tracker!E4',
      },
      {
        id: 'chg-seed-05',
        event_category: 'COMMENT_ADDED',
        actor_id: 'sheet-sync',
        actor_name: 'AI Security & Risk Review Board',
        actor_email: 'ai-security-board@google.com',
        actor_role: 'Author',
        entity_type: 'Comment',
        entity_id: 'BP-05',
        entity_name: '05 — Agentic AI, Hybrid RAG & Guardrail Reference Topology',
        field_changed: 'comment',
        old_value: 'Initial AI topology draft submitted.',
        new_value: 'Pending final sign-off on citation verification threshold (>= 0.92 groundedness).',
        summary: 'AI Security & Risk Review Board added review comment on BP-05 in Google Sheet [Comments!A4:G4] — synced to UI.',
        source: 'GOOGLE_SHEET',
        sync_status: 'PULLED_FROM_SHEET',
        sheet_row_ref: 'Comments!A4:G4',
      },
      {
        id: 'chg-seed-06',
        event_category: 'STATUS_CHANGED',
        actor_id: 'usr-elena',
        actor_name: 'Principal Domain Architecture Team',
        actor_email: 'arch-review-board@google.com',
        actor_role: 'Author',
        entity_type: 'Blueprint',
        entity_id: 'BP-01',
        entity_name: '01 — Enterprise System Context & External Ecosystem Boundary',
        field_changed: 'status',
        old_value: 'Approved',
        new_value: 'Production Certified',
        summary: 'Principal Domain Architecture Team updated BP-01 status from "Approved" to "Production Certified" in UI and pushed to Google Sheet [Tracker!E3].',
        source: 'UI',
        sync_status: 'SYNCED',
        sheet_row_ref: 'Tracker!E3',
      },
      {
        id: 'chg-seed-07',
        event_category: 'COMMENT_ADDED',
        actor_id: 'usr-admin-1',
        actor_name: 'Nitin Aggarwal',
        actor_email: 'nitinagga@google.com',
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
  const rowRef = `DB:users:${normalizedEmail}`;

  if (existing) {
    const oldRole = existing.global_role || 'Author';
    const updated = await updateUserGlobalRole(existing.id, params.role);
    const summary =
      source === 'GOOGLE_SHEET'
        ? `${params.actorName} changed role of ${params.name} (${normalizedEmail}) from "${oldRole}" to "${params.role}" via Governance Sync.`
        : `${params.actorName} changed role of ${params.name} (${normalizedEmail}) from "${oldRole}" to "${params.role}" in Governance UI.`;
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
        ? `${params.actorName} added new user ${params.name} (${normalizedEmail}) with role "${params.role}" via Governance Sync.`
        : `${params.actorName} added new user ${params.name} (${normalizedEmail}) with role "${params.role}" in Governance UI.`;

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
  const actorEmail = payload?.actorEmail || 'architecture-governance@cloud-review.internal';
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

