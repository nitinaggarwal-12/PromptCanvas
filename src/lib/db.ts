import { DatabaseSync } from 'node:sqlite';
import { join, dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdirSync } from 'fs';
import { Pool } from 'pg';

// Define TypeScript interfaces for our models
export interface User {
  id: string;
  email: string;
  password_hash: string;
  salt: string;
  name: string | null;
  global_role?: 'Super-Admin' | 'Author' | 'Member';
  is_super_admin?: boolean;
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
let tablesInitialized = false;

export function isPostgres(): boolean {
  return !!process.env.DATABASE_URL;
}

function getPgPool(): Pool {
  if (!pgPoolInstance) {
    pgPoolInstance = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('railway') || process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false
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
    mkdirSync(dirname(sqliteDbPath), { recursive: true });
    sqliteDbInstance = new DatabaseSync(sqliteDbPath);
    sqliteDbInstance.exec('PRAGMA foreign_keys = ON;');
    return sqliteDbInstance;
  } catch (error) {
    console.error('Failed to initialize SQLite database:', error);
    throw error;
  }
}

// Ensure database tables exist for active driver
export async function ensureTablesExist(): Promise<void> {
  if (tablesInitialized) return;

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
        score INTEGER NOT NULL DEFAULT 85,
        report TEXT NOT NULL,
        gaps TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

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

    // Schema Evolution Migrations
    await pool.query(`
      ALTER TABLE diagrams ADD COLUMN IF NOT EXISTS user_id TEXT;
    `);
    await pool.query(`
      ALTER TABLE diagrams ADD COLUMN IF NOT EXISTS workspace_id TEXT;
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

  // Unowned public seed templates default to Viewer
  if (!diagram.user_id) return 'Viewer';

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
    const query = `
      SELECT d.*, v.xml_content, v.prompt,
        CASE 
          WHEN d.user_id = $1 THEN 'Owner'
          WHEN c.access_level IS NOT NULL THEN c.access_level
          WHEN d.user_id IS NULL THEN 'Viewer'
          ELSE NULL
        END as access_level
      FROM diagrams d
      LEFT JOIN diagram_collaborators c ON c.diagram_id = d.id AND c.user_id = $1
      LEFT JOIN diagram_versions v ON v.diagram_id = d.id 
      AND v.version_number = (
        SELECT MAX(version_number) 
        FROM diagram_versions 
        WHERE diagram_id = d.id
      )
      WHERE d.user_id = $1 OR d.user_id IS NULL OR c.user_id = $1
      ORDER BY d.updated_at DESC
    `;
    if (isPostgres()) {
      const pool = getPgPool();
      const res = await pool.query(query, [userId]);
      return res.rows;
    } else {
      const db = getSqliteDb();
      const sqliteQuery = query.replaceAll('$1', '?');
      const stmt = db.prepare(sqliteQuery);
      return stmt.all(userId, userId, userId) as unknown as (Diagram & { xml_content?: string; prompt?: string | null })[];
    }
  } else {
    const query = `
      SELECT d.*, v.xml_content, v.prompt, 'Viewer' as access_level
      FROM diagrams d
      LEFT JOIN diagram_versions v ON v.diagram_id = d.id 
      AND v.version_number = (
        SELECT MAX(version_number) 
        FROM diagram_versions 
        WHERE diagram_id = d.id
      )
      WHERE d.user_id IS NULL
      ORDER BY d.updated_at DESC
    `;
    if (isPostgres()) {
      const pool = getPgPool();
      const res = await pool.query(query);
      return res.rows;
    } else {
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

  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM diagrams WHERE id = $1', [id]);
    const diag = (res.rows[0] as Diagram) || null;
    return diag ? { ...diag, access_level: accessLevel } : null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM diagrams WHERE id = ?');
    const result = stmt.get(id);
    const diag = (result as unknown as Diagram) || null;
    return diag ? { ...diag, access_level: accessLevel } : null;
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
  userId?: string | null
): Promise<{ diagram: Diagram; version: DiagramVersion | null }> {
  await ensureTablesExist();
  const diagramId = uuidv4();
  const versionId = uuidv4();

  if (isPostgres()) {
    const pool = getPgPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('INSERT INTO diagrams (id, name, user_id) VALUES ($1, $2, $3)', [diagramId, name, userId || null]);

      let version: DiagramVersion | null = null;
      if (initialXml !== undefined) {
        await client.query(`
          INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
          technicalUsecase || null
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
    const db = getSqliteDb();
    db.exec('BEGIN TRANSACTION;');
    try {
      const insertDiagram = db.prepare('INSERT INTO diagrams (id, name, user_id) VALUES (?, ?, ?)');
      insertDiagram.run(diagramId, name, userId || null);

      let version: DiagramVersion | null = null;
      if (initialXml !== undefined) {
        const insertVersion = db.prepare(`
          INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          technicalUsecase || null
        );
        const getVersion = db.prepare('SELECT * FROM diagram_versions WHERE id = ?');
        version = getVersion.get(versionId) as unknown as DiagramVersion;
      }
      db.exec('COMMIT;');

      const getDiag = db.prepare('SELECT * FROM diagrams WHERE id = ?');
      const diagram = getDiag.get(diagramId) as unknown as Diagram;
      return { diagram, version };
    } catch (error) {
      db.exec('ROLLBACK;');
      console.error('Failed to create diagram in SQLite:', error);
      throw error;
    }
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
  technicalUsecase?: string | null
): Promise<DiagramVersion> {
  await ensureTablesExist();
  const versionId = uuidv4();

  if (isPostgres()) {
    const pool = getPgPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const maxVer = await client.query('SELECT COALESCE(MAX(version_number), 0) as max_version FROM diagram_versions WHERE diagram_id = $1', [diagramId]);
      const nextVersionNumber = (maxVer.rows[0].max_version || 0) + 1;

      await client.query(`
        INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
        technicalUsecase || null
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
    const db = getSqliteDb();
    db.exec('BEGIN TRANSACTION;');
    try {
      const maxVersionStmt = db.prepare('SELECT COALESCE(MAX(version_number), 0) as max_version FROM diagram_versions WHERE diagram_id = ?');
      const versionResult = maxVersionStmt.get(diagramId) as { max_version: number };
      const nextVersionNumber = versionResult.max_version + 1;

      const insertVersion = db.prepare(`
        INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning, business_usecase, technical_usecase)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        technicalUsecase || null
      );

      const updateDiagram = db.prepare("UPDATE diagrams SET updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now')) WHERE id = ?");
      updateDiagram.run(diagramId);

      db.exec('COMMIT;');
      const getVersion = db.prepare('SELECT * FROM diagram_versions WHERE id = ?');
      return getVersion.get(versionId) as unknown as DiagramVersion;
    } catch (error) {
      db.exec('ROLLBACK;');
      console.error('Failed to save diagram version in SQLite:', error);
      throw error;
    }
  }
}

// Helper: Get all versions of a diagram (sorted by version_number desc)
export async function getDiagramVersions(diagramId: string): Promise<DiagramVersion[]> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM diagram_versions WHERE diagram_id = $1 ORDER BY version_number DESC', [diagramId]);
    return res.rows as DiagramVersion[];
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM diagram_versions WHERE diagram_id = ? ORDER BY version_number DESC');
    return stmt.all(diagramId) as unknown as DiagramVersion[];
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
export async function getLatestDiagramVersion(diagramId: string): Promise<DiagramVersion | null> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM diagram_versions WHERE diagram_id = $1 ORDER BY version_number DESC LIMIT 1', [diagramId]);
    return (res.rows[0] as DiagramVersion) || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM diagram_versions WHERE diagram_id = ? ORDER BY version_number DESC LIMIT 1');
    const result = stmt.get(diagramId);
    return (result as unknown as DiagramVersion) || null;
  }
}

// Helper: Delete a diagram (cascades to versions, scoped to user)
export async function deleteDiagram(id: string, userId?: string): Promise<void> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    if (userId) {
      await pool.query('DELETE FROM diagrams WHERE id = $1 AND (user_id = $2 OR user_id IS NULL)', [id, userId]);
    } else {
      await pool.query('DELETE FROM diagrams WHERE id = $1', [id]);
    }
  } else {
    const db = getSqliteDb();
    if (userId) {
      const stmt = db.prepare('DELETE FROM diagrams WHERE id = ? AND (user_id = ? OR user_id IS NULL)');
      stmt.run(id, userId);
    } else {
      const stmt = db.prepare('DELETE FROM diagrams WHERE id = ?');
      stmt.run(id);
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

  if (reqRecord.diagram_user_id !== ownerUserId) {
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
    const db = getSqliteDb();
    db.exec('BEGIN TRANSACTION;');
    try {
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
      db.exec('COMMIT;');

      await logUserEvent(
        ownerUserId,
        `ACCESS_REQUEST_${status.toUpperCase()}`,
        null,
        `Request ID: ${requestId}, Requester: ${reqRecord.requester_user_id}`
      );

      const getReq = db.prepare('SELECT * FROM access_requests WHERE id = ?');
      return getReq.get(requestId) as unknown as AccessRequest;
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
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
    const db = getSqliteDb();
    db.exec('BEGIN TRANSACTION;');
    try {
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

      db.exec('COMMIT;');
    } catch (error) {
      db.exec('ROLLBACK;');
      console.error('Failed to sync database in SQLite:', error);
      throw error;
    }
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

const AI_RAG_XML = `
<mxfile host="embed.diagrams.net">
  <diagram id="ai_rag" name="AI RAG Core Pipeline">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1200" pageHeight="900">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="ingress" value="&lt;b&gt;[1] API Gateway&lt;/b&gt;&lt;br&gt;&lt;i&gt;Access tokens verification&lt;/i&gt;" style="rounded=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="80" y="300" width="180" height="70" as="geometry" />
        </mxCell>
        <mxCell id="embed" value="&lt;b&gt;[2] Cloud Run Embeddings&lt;/b&gt;&lt;br&gt;&lt;i&gt;Vector encoding engine&lt;/i&gt;" style="rounded=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="340" y="300" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="pgvector" value="&lt;b&gt;[3] Cloud SQL (pgvector)&lt;/b&gt;&lt;br&gt;&lt;i&gt;Vector database storage&lt;/i&gt;" style="shape=cylinder;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="640" y="290" width="180" height="90" as="geometry" />
        </mxCell>
        <mxCell id="gemini" value="&lt;b&gt;[4] Vertex AI Gemini LLM&lt;/b&gt;&lt;br&gt;&lt;i&gt;Augmented inference engine&lt;/i&gt;" style="rounded=1;fillColor=#E1D5E7;strokeColor=#9673A6;strokeWidth=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="300" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="e1" value="POST Query" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="ingress" target="embed"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2" value="Cosine Similarity" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="embed" target="pgvector"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3" value="Prompt Context" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;" edge="1" parent="1" source="pgvector" target="gemini"><mxGeometry relative="1" as="geometry" /></mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();

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
  if (user.is_super_admin) return true;
  if (user.global_role === 'Super-Admin') return true;
  const rootEmail = process.env.ROOT_USER_EMAIL || 'nitinaggarwal12@gmail.com';
  const userEmailLower = user.email.toLowerCase();
  if (
    userEmailLower === 'vibeandcode.ai@gmail.com' ||
    userEmailLower === 'nitinaggarwal12@gmail.com' ||
    (rootEmail && userEmailLower === rootEmail.trim().toLowerCase())
  ) {
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
