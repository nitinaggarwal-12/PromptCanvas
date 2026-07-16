const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('fs');

// Load environment variables manually
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    env[key] = value;
  }
});

const dbPath = env.DATABASE_PATH || path.join(__dirname, '../dev.db');
const geminiApiKey = env.GEMINI_API_KEY;

if (!geminiApiKey) {
  console.error('Error: GEMINI_API_KEY is not defined in .env');
  process.exit(1);
}

console.log(`Connecting to local SQLite database: ${dbPath}`);
const db = new DatabaseSync(dbPath);

const defaultNames = [
  'AWS VPC SecureNetwork',
  'GCP Streaming Analytics',
  'DevOps CI/CD Deployment',
  'AI RAG Core Pipeline',
  'Gemini Enterprise Portal',
  'NotebookLM Source Grounding',
  'Multi-Agent Design Orchestrator',
  'Deep Research Agent Pipeline'
];

db.exec('BEGIN TRANSACTION;');
try {
  const selectStmt = db.prepare(`SELECT id FROM diagrams WHERE name IN (${defaultNames.map(() => '?').join(',')})`);
  const diagramsToDelete = selectStmt.all(...defaultNames);
  const ids = diagramsToDelete.map(d => d.id);
  
  if (ids.length > 0) {
    console.log(`Deleting ${ids.length} default diagrams:`, ids);
    const deleteVersions = db.prepare(`DELETE FROM diagram_versions WHERE diagram_id IN (${ids.map(() => '?').join(',')})`);
    deleteVersions.run(...ids);
    
    const deleteDiags = db.prepare(`DELETE FROM diagrams WHERE id IN (${ids.map(() => '?').join(',')})`);
    deleteDiags.run(...ids);
  } else {
    console.log('No default diagrams found in local DB.');
  }
  db.exec('COMMIT;');
} catch (err) {
  db.exec('ROLLBACK;');
  console.error('Error deleting default diagrams:', err);
  process.exit(1);
}

// Now sync to production!
console.log('Triggering sync to production to remove the diagrams there...');
const diagrams = db.prepare('SELECT * FROM diagrams').all();
const rawVersions = db.prepare('SELECT * FROM diagram_versions').all();
const diagramIds = new Set(diagrams.map(d => d.id));
const versions = rawVersions.filter(v => diagramIds.has(v.diagram_id));

const payload = { diagrams, versions };
const productionUrl = 'https://promptcanvas-production-235c.up.railway.app/api/sync-db';

fetch(productionUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${geminiApiKey}`
  },
  body: JSON.stringify(payload)
})
  .then(async res => {
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}: ${typeof data === 'object' ? JSON.stringify(data) : data}`);
    }
    console.log('🎉 Sync successful! Default diagrams removed from production database.', data);
  })
  .catch(err => {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  });
