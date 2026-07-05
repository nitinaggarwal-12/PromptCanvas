import { URL } from 'url';

const PORT = process.env.PORT || '3000';
const BASE_URL = `http://localhost:${PORT}`;

async function runApiTests() {
  console.log(`🚀 Starting HTTP API Route Verification Tests on ${BASE_URL}...\n`);

  // Helper for fetch
  async function apiRequest(path: string, options?: RequestInit) {
    const url = `${BASE_URL}${path}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} ${res.statusText} on ${path}: ${text}`);
    }
    
    return res.json();
  }

  try {
    // Test 1: Create Diagram
    console.log('Test 1: POST /api/diagrams (Create Diagram)...');
    const createRes = await apiRequest('/api/diagrams', {
      method: 'POST',
      body: JSON.stringify({
        name: 'API Test Diagram',
        xml: '<mxfile><diagram id="test">API Test</diagram></mxfile>',
        comment: 'Created via API test',
      }),
    });
    console.log('✅ Created:', createRes);
    const diagramId = createRes.diagram.id;
    const initialVersionId = createRes.version.id;
    console.log(`   Diagram ID: ${diagramId}`);
    console.log(`   Version ID: ${initialVersionId}`);
    console.log('--------------------------------------------------\n');

    // Test 2: List Diagrams
    console.log('Test 2: GET /api/diagrams (List Diagrams)...');
    const listRes = await apiRequest('/api/diagrams');
    console.log(`✅ Found ${listRes.length} diagram(s).`);
    console.log(listRes);
    if (!listRes.some((d: any) => d.id === diagramId)) {
      throw new Error('Created diagram not found in list!');
    }
    console.log('--------------------------------------------------\n');

    // Test 3: Get Diagram Details & Versions
    console.log(`Test 3: GET /api/diagrams/${diagramId} (Diagram Details)...`);
    const detailsRes = await apiRequest(`/api/diagrams/${diagramId}`);
    console.log('✅ Details:', detailsRes);
    if (detailsRes.versions.length !== 1) {
      throw new Error('Expected 1 version in history!');
    }
    console.log('--------------------------------------------------\n');

    // Test 4: Save New Version
    console.log(`Test 4: POST /api/diagrams/${diagramId}/versions (Save Version)...`);
    const saveRes = await apiRequest(`/api/diagrams/${diagramId}/versions`, {
      method: 'POST',
      body: JSON.stringify({
        xmlContent: '<mxfile><diagram id="test">API Test Updated</diagram></mxfile>',
        comment: 'API updated version',
        createdBy: 'User',
      }),
    });
    console.log('✅ Saved Version:', saveRes);
    const newVersionId = saveRes.id;
    console.log('--------------------------------------------------\n');

    // Test 5: Get Specific Version
    console.log(`Test 5: GET /api/diagrams/${diagramId}/versions/${newVersionId} (Get Specific Version)...`);
    const versionRes = await apiRequest(`/api/diagrams/${diagramId}/versions/${newVersionId}`);
    console.log('✅ Version Details:', versionRes);
    if (versionRes.version_number !== 2) {
      throw new Error('Expected version number to be 2!');
    }
    console.log('--------------------------------------------------\n');

    // Test 6: Delete Diagram
    console.log(`Test 6: DELETE /api/diagrams/${diagramId} (Delete)...`);
    const deleteRes = await apiRequest(`/api/diagrams/${diagramId}`, {
      method: 'DELETE',
    });
    console.log('✅ Deleted:', deleteRes);
    console.log('--------------------------------------------------\n');

    // Test 7: Verify Deleted
    console.log('Test 7: Verify diagram is deleted...');
    try {
      await apiRequest(`/api/diagrams/${diagramId}`);
      throw new Error('Expected 404 for deleted diagram, but it succeeded!');
    } catch (err: any) {
      if (err.message.includes('404')) {
        console.log('✅ Confirmed: Diagram is 404 Not Found.');
      } else {
        throw err;
      }
    }
    console.log('--------------------------------------------------\n');

    console.log('🎉 All API Route Verification Tests Passed Successfully! 🎉');
  } catch (error) {
    console.error('❌ API Verification Tests Failed:', error);
    process.exit(1);
  }
}

runApiTests();
