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

// Helper: List all diagrams (sorted by updated_at desc)
export async function listDiagrams(): Promise<(Diagram & { xml_content?: string; prompt?: string | null })[]> {
  await ensureTablesExist();
  const query = `
    SELECT d.*, v.xml_content, v.prompt
    FROM diagrams d
    LEFT JOIN diagram_versions v ON v.diagram_id = d.id 
    AND v.version_number = (
      SELECT MAX(version_number) 
      FROM diagram_versions 
      WHERE diagram_id = d.id
    )
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
        <mxCell id="edge1" value="HTTPS" style="edge=1;source=alb;target=asg;strokeWidth=2;strokeColor=#567c73;" edge="1" parent="1" />
        <mxCell id="edge2" value="SQL Query" style="edge=1;source=asg;target=rds;strokeWidth=2;strokeColor=#567c73;" edge="1" parent="1" />
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
        <mxCell id="e1" value="Stream" style="edge=1;source=pubsub;target=dataflow;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e2" value="Insert" style="edge=1;source=dataflow;target=bq;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e3" value="Query" style="edge=1;source=looker;target=bq;strokeWidth=2;style=dashed;" edge="1" parent="1" />
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
        <mxCell id="e1" value="Commit Push" style="edge=1;source=github;target=runner;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e2" value="Push Container" style="edge=1;source=runner;target=registry;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e3" value="Helm Deploy" style="edge=1;source=registry;target=eks;strokeWidth=2;" edge="1" parent="1" />
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
        <mxCell id="e1" value="POST Query" style="edge=1;source=ingress;target=embed;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e2" value="Cosine Similarity" style="edge=1;source=embed;target=pgvector;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e3" value="Prompt Context" style="edge=1;source=pgvector;target=gemini;strokeWidth=2;" edge="1" parent="1" />
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
        <mxCell id="e1" value="HTTPS API" style="edge=1;source=client;target=gateway;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e2" value="Route Prompt" style="edge=1;source=gateway;target=gemini_llm;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e3" value="Grounding Query" style="edge=1;source=gemini_llm;target=rag_store;strokeWidth=2;" edge="1" parent="1" />
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
        <mxCell id="e1" value="Upload" style="edge=1;source=sources;target=chunker;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e2" value="Store Index" style="edge=1;source=chunker;target=vectors;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e3" value="Generate Podcast" style="edge=1;source=vectors;target=podcast;strokeWidth=2;" edge="1" parent="1" />
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
        <mxCell id="e1" value="Deploy Prompt" style="edge=1;source=designer;target=orchestrator;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e2" value="Delegate Task" style="edge=1;source=orchestrator;target=code_agent;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e3" value="Request Review" style="edge=1;source=code_agent;target=eval_agent;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e4" value="Commit Logs" style="edge=1;source=eval_agent;target=memory;strokeWidth=2;" edge="1" parent="1" />
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
        <mxCell id="e1" value="Initiate Research" style="edge=1;source=trigger;target=searcher;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e2" value="Fetch Results" style="edge=1;source=searcher;target=evaluator;strokeWidth=2;" edge="1" parent="1" />
        <mxCell id="e3" value="Compile report" style="edge=1;source=evaluator;target=summarizer;strokeWidth=2;" edge="1" parent="1" />
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();
