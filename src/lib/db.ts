import { DatabaseSync } from 'node:sqlite';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Define TypeScript interfaces for our models
export interface Diagram {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface DiagramVersion {
  id: string;
  diagram_id: string;
  version_number: number;
  xml_content: string;
  comment: string | null;
  created_by: string;
  created_at: string;
}

// Resolve database path, allowing override via environment variable to prevent Fast Refresh triggers
const dbPath = process.env.DATABASE_PATH || join(process.cwd(), 'dev.db');
let db: DatabaseSync;

try {
  db = new DatabaseSync(dbPath);
  
  // Enable foreign key support
  db.exec('PRAGMA foreign_keys = ON;');
  
  // Initialize tables
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
      FOREIGN KEY (diagram_id) REFERENCES diagrams(id) ON DELETE CASCADE
    );
  `);
  
  console.log(`Database initialized successfully at ${dbPath}`);
} catch (error) {
  console.error('Failed to initialize SQLite database:', error);
  throw error;
}

// Helper: List all diagrams (sorted by updated_at desc)
export function listDiagrams(): Diagram[] {
  const stmt = db.prepare(`
    SELECT * FROM diagrams 
    ORDER BY updated_at DESC
  `);
  return stmt.all() as unknown as Diagram[];
}

// Helper: Get a single diagram by ID
export function getDiagram(id: string): Diagram | null {
  const stmt = db.prepare('SELECT * FROM diagrams WHERE id = ?');
  const result = stmt.get(id);
  return (result as unknown as Diagram) || null;
}

// Helper: Create a new diagram with an optional initial XML
export function createDiagram(name: string, initialXml?: string, comment?: string): { diagram: Diagram; version: DiagramVersion | null } {
  const diagramId = uuidv4();
  
  // Start transaction manually since node:sqlite doesn't have a built-in transaction helper yet
  db.exec('BEGIN TRANSACTION;');
  
  try {
    // Insert diagram
    const insertDiagram = db.prepare(`
      INSERT INTO diagrams (id, name)
      VALUES (?, ?)
    `);
    insertDiagram.run(diagramId, name);
    
    let version: DiagramVersion | null = null;
    
    // Insert initial version if XML is provided
    if (initialXml !== undefined) {
      const versionId = uuidv4();
      const insertVersion = db.prepare(`
        INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      insertVersion.run(
        versionId,
        diagramId,
        1,
        initialXml,
        comment || 'Initial version',
        'AI'
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
    console.error('Failed to create diagram:', error);
    throw error;
  }
}

// Helper: Save a new version of a diagram
export function saveDiagramVersion(
  diagramId: string,
  xmlContent: string,
  comment: string | null,
  createdBy: string = 'User'
): DiagramVersion {
  db.exec('BEGIN TRANSACTION;');
  
  try {
    // Get the current max version number
    const maxVersionStmt = db.prepare(`
      SELECT COALESCE(MAX(version_number), 0) as max_version 
      FROM diagram_versions 
      WHERE diagram_id = ?
    `);
    const versionResult = maxVersionStmt.get(diagramId) as { max_version: number };
    const nextVersionNumber = versionResult.max_version + 1;
    
    // Insert new version
    const versionId = uuidv4();
    const insertVersion = db.prepare(`
      INSERT INTO diagram_versions (id, diagram_id, version_number, xml_content, comment, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertVersion.run(
      versionId,
      diagramId,
      nextVersionNumber,
      xmlContent,
      comment,
      createdBy
    );
    
    // Update diagram's updated_at timestamp
    const updateDiagram = db.prepare(`
      UPDATE diagrams 
      SET updated_at = (strftime('%Y-%m-%d %H:%M:%f', 'now'))
      WHERE id = ?
    `);
    updateDiagram.run(diagramId);
    
    db.exec('COMMIT;');
    
    const getVersion = db.prepare('SELECT * FROM diagram_versions WHERE id = ?');
    return getVersion.get(versionId) as unknown as DiagramVersion;
  } catch (error) {
    db.exec('ROLLBACK;');
    console.error('Failed to save diagram version:', error);
    throw error;
  }
}

// Helper: Get all versions of a diagram (sorted by version_number desc)
export function getDiagramVersions(diagramId: string): DiagramVersion[] {
  const stmt = db.prepare(`
    SELECT * FROM diagram_versions 
    WHERE diagram_id = ? 
    ORDER BY version_number DESC
  `);
  return stmt.all(diagramId) as unknown as DiagramVersion[];
}

// Helper: Get a specific version by ID
export function getDiagramVersion(versionId: string): DiagramVersion | null {
  const stmt = db.prepare('SELECT * FROM diagram_versions WHERE id = ?');
  const result = stmt.get(versionId);
  return (result as unknown as DiagramVersion) || null;
}

// Helper: Get the latest version of a diagram
export function getLatestDiagramVersion(diagramId: string): DiagramVersion | null {
  const stmt = db.prepare(`
    SELECT * FROM diagram_versions 
    WHERE diagram_id = ? 
    ORDER BY version_number DESC 
    LIMIT 1
  `);
  const result = stmt.get(diagramId);
  return (result as unknown as DiagramVersion) || null;
}

// Helper: Delete a diagram (cascades to versions)
export function deleteDiagram(id: string): void {
  const stmt = db.prepare('DELETE FROM diagrams WHERE id = ?');
  stmt.run(id);
}
