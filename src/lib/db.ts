import { DatabaseSync } from 'node:sqlite';
import { join, dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdirSync } from 'fs';
import { Pool } from 'pg';

// Define TypeScript interfaces for our models
export interface Diagram {
  id: string;
  name: string;
  created_at: string | Date;
  updated_at: string | Date;
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
      CREATE TABLE IF NOT EXISTS diagrams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
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
        FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE
      );
    `);
  } else {
    const db = getSqliteDb();
    db.exec(`
      CREATE TABLE IF NOT EXISTS diagrams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
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
        FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE
      );
    `);
  }
  tablesInitialized = true;
}

// Helper: List all diagrams (sorted by updated_at desc)
export async function listDiagrams(): Promise<Diagram[]> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM diagrams ORDER BY updated_at DESC');
    return res.rows as Diagram[];
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM diagrams ORDER BY updated_at DESC');
    return stmt.all() as unknown as Diagram[];
  }
}

// Helper: Get a single diagram by ID
export async function getDiagram(id: string): Promise<Diagram | null> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    const res = await pool.query('SELECT * FROM diagrams WHERE id = $1', [id]);
    return (res.rows[0] as Diagram) || null;
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('SELECT * FROM diagrams WHERE id = ?');
    const result = stmt.get(id);
    return (result as unknown as Diagram) || null;
  }
}

// Helper: Create a new diagram with an optional initial XML
export async function createDiagram(
  name: string,
  initialXml?: string,
  comment?: string,
  prompt?: string | null,
  aiReasoning?: string | null
): Promise<{ diagram: Diagram; version: DiagramVersion | null }> {
  await ensureTablesExist();
  const diagramId = uuidv4();
  const versionId = uuidv4();

  if (isPostgres()) {
    const pool = getPgPool();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('INSERT INTO diagrams (id, name) VALUES ($1, $2)', [diagramId, name]);

      let version: DiagramVersion | null = null;
      if (initialXml !== undefined) {
        await client.query(`
          INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          versionId,
          diagramId,
          1,
          initialXml,
          comment || 'Initial version',
          'AI',
          prompt || null,
          aiReasoning || null
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
      const insertDiagram = db.prepare('INSERT INTO diagrams (id, name) VALUES (?, ?)');
      insertDiagram.run(diagramId, name);

      let version: DiagramVersion | null = null;
      if (initialXml !== undefined) {
        const insertVersion = db.prepare(`
          INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        insertVersion.run(
          versionId,
          diagramId,
          1,
          initialXml,
          comment || 'Initial version',
          'AI',
          prompt || null,
          aiReasoning || null
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
  aiReasoning?: string | null
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
        INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        versionId,
        diagramId,
        nextVersionNumber,
        xmlContent,
        comment,
        createdBy,
        prompt || null,
        aiReasoning || null
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
        INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by, prompt, ai_reasoning)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insertVersion.run(
        versionId,
        diagramId,
        nextVersionNumber,
        xmlContent,
        comment,
        createdBy,
        prompt || null,
        aiReasoning || null
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

// Helper: Delete a diagram (cascades to versions)
export async function deleteDiagram(id: string): Promise<void> {
  await ensureTablesExist();
  if (isPostgres()) {
    const pool = getPgPool();
    await pool.query('DELETE FROM diagrams WHERE id = $1', [id]);
  } else {
    const db = getSqliteDb();
    const stmt = db.prepare('DELETE FROM diagrams WHERE id = ?');
    stmt.run(id);
  }
}
