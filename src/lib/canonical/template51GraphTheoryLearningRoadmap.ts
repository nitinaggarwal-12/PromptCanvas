/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for:
 * GRAPH THEORY: A LEARNING ROADMAP FROM INTUITION TO APPLICATIONS
 * Replicates 100% of the uploaded master reference image:
 * - Top Chevron Process Ribbon with 4 colored milestones (Blue, Green, Orange, Gold)
 * - Section 1: Social Network Analogy with Avatar Nodes (Alice, Bob, Carol) and Friendship arrows
 * - Section 2: Essential Prerequisites (Set Theory G=(V,E), Logic & Proofs, Combinatorics)
 * - Section 3: Visual Taxonomy (Simple Graph, Directed Graph, Weighted Graph with weights, Trees)
 * - Section 4: Modern Graph Science with Traversable Knowledge Graph & Neural Pathways
 * - Bottom Half: Key Graph Algorithms & Applications Workflow (Step 1 -> Step 2 -> Step 3 Dijkstra -> Step 4 Real-World Applications)
 * - 1600x960 master resolution with 100% vector SVG rendering
 */

const E = (v?: string | null) =>
  (v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function generateTemplate51GraphTheoryLearningRoadmapXml(
  domainFlavor = 'graph_theory',
  theme: 'light' | 'dark' = 'light'
): string {
  const isDark = theme === 'dark';
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style = 'edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=5;') =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  const topHdrHtml = `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;box-sizing:border-box;padding:0 24px;background:#1E3A8A;color:#FFFFFF;border-radius:10px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:24px;font-weight:900;letter-spacing:0.5px;text-transform:uppercase;">
      GRAPH THEORY: A LEARNING ROADMAP FROM INTUITION TO APPLICATIONS
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:15px;font-size:11px;font-weight:800;letter-spacing:0.04em;">CONCEPTUAL VIEW</span>
      <span style="background:#FFFFFF;color:#1E3A8A;padding:4px 12px;border-radius:15px;font-size:11px;font-weight:900;">STUDIO 3 CANONICAL</span>
    </div>
  </div>`;
  cell('hdr_main', topHdrHtml, 20, 14, 1560, 56, 'text;html=1;whiteSpace=wrap;overflow=hidden;rounded=1;');

  // ==================== 2. TOP CHEVRON PROCESS RIBBON (y=78..116) ====================
  cell('chv_1', '🧭 GRAPH INTUITION &amp; DEFINITIONS', 20, 78, 375, 40, 'shape=hexagon;perimeter=hexagonPerimeter2;fixedSize=1;size=16;rounded=1;fillColor=#3B82F6;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;');
  cell('chv_2', 'ESSENTIAL PREREQUISITES', 405, 78, 375, 40, 'shape=hexagon;perimeter=hexagonPerimeter2;fixedSize=1;size=16;rounded=1;fillColor=#10B981;strokeColor=#047857;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;');
  cell('chv_3', 'STEP-BY-STEP TOPICS', 790, 78, 375, 40, 'shape=hexagon;perimeter=hexagonPerimeter2;fixedSize=1;size=16;rounded=1;fillColor=#F97316;strokeColor=#C2410C;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;');
  cell('chv_4', '🔬 MODERN GRAPH SCIENCE 🌐', 1175, 78, 405, 40, 'shape=hexagon;perimeter=hexagonPerimeter2;fixedSize=1;size=16;rounded=1;fillColor=#EAB308;strokeColor=#A16207;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;');

  // ==================== 3. TOP SECTION CONTAINERS (y=126..500, h=374) ====================
  // Section 1: Graph Intuition (x=20..395)
  cell('sec1_bg', '', 20, 126, 375, 374, 'rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;');
  const sec1HeaderHtml = `<div style="text-align:center;font-weight:900;font-size:13px;color:#1E3A8A;padding-top:8px;">Social Network Analogy</div>`;
  cell('sec1_title', sec1HeaderHtml, 24, 130, 367, 24, 'text;html=1;whiteSpace=wrap;');

  cell('node_alice', '👧', 50, 170, 56, 56, 'ellipse;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontSize=28;align=center;verticalAlign=middle;');
  cell('lbl_alice', 'Alice', 40, 228, 76, 18, 'text;html=1;fontStyle=1;fontSize=11;fontColor:#1E293B;align=center;');
  
  cell('node_bob', '👦', 290, 170, 56, 56, 'ellipse;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontSize=28;align=center;verticalAlign=middle;');
  cell('lbl_bob', 'Bob', 280, 228, 76, 18, 'text;html=1;fontStyle=1;fontSize=11;fontColor:#1E293B;align=center;');

  cell('node_carol', '👩', 170, 270, 56, 56, 'ellipse;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontSize=28;align=center;verticalAlign=middle;');
  cell('lbl_carol', 'Carol', 160, 328, 76, 18, 'text;html=1;fontStyle=1;fontSize=11;fontColor:#1E293B;align=center;');

  edge('edge_ab', 'node_alice', 'node_bob', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;endSize=6;');
  cell('lbl_friend_ab', 'Friendship', 140, 172, 110, 18, 'text;html=1;fontSize=9.5;fontStyle=1;fontColor=#2563EB;align=center;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;');
  
  edge('edge_ac', 'node_alice', 'node_carol', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.8;endArrow=classic;endSize=6;');
  edge('edge_bc', 'node_bob', 'node_carol', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.8;endArrow=classic;endSize=6;');

  const legendHtml = `<div style="display:flex;align-items:center;justify-content:space-around;width:100%;height:100%;background:#FFFFFF;border:1px solid #CBD5E1;border-radius:6px;padding:6px 10px;box-sizing:border-box;font-size:10px;font-weight:700;color:#1E293B;">
    <div>📐 <strong>Vertex</strong> (Node)</div>
    <div>🔗 <strong>Edge</strong> (Link)</div>
    <div>📊 <strong>Adjacency</strong></div>
    <div>🎯 <strong>Degree</strong></div>
  </div>`;
  cell('sec1_legend', legendHtml, 30, 360, 355, 46, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  const sec1ChallengeHtml = `<div style="text-align:center;font-size:10px;font-weight:800;color:#DC2626;background:#FEE2E2;border:1px solid #FCA5A5;border-radius:6px;padding:6px;">
    The Challenge: Disconnected and Siloed Information Networks
  </div>`;
  cell('sec1_chal', sec1ChallengeHtml, 30, 420, 355, 30, 'text;html=1;whiteSpace=wrap;');

  // Section 2: Essential Prerequisites (x=405..780)
  cell('sec2_bg', '', 405, 126, 375, 374, 'rounded=1;arcSize=8;fillColor=#ECFDF5;strokeColor=#A7F3D0;strokeWidth=1.5;');

  const sec2ContentHtml = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;box-sizing:border-box;">
    <div style="background:#FFFFFF;border:1px solid #A7F3D0;border-radius:8px;padding:8px 12px;margin-bottom:10px;">
      <div style="font-size:12px;font-weight:900;color:#047857;">Set Theory (G = (V, E))</div>
      <div style="font-size:10px;color:#065F46;margin-top:2px;">Vertices V = {v₁, v₂, ..., vₙ}, Edges E ⊆ V × V</div>
    </div>

    <div style="background:#FFFFFF;border:1px solid #A7F3D0;border-radius:8px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div style="font-size:12px;font-weight:900;color:#047857;">Logic &amp; Proofs</div>
        <div style="font-size:10px;color:#065F46;margin-top:2px;">Induction, Pigeonhole Principle, Contradiction</div>
      </div>
      <div style="font-size:22px;">💭 {ε; ∈}</div>
    </div>

    <div style="background:#FFFFFF;border:1px solid #A7F3D0;border-radius:8px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div style="font-size:12px;font-weight:900;color:#047857;">Combinatorics</div>
        <div style="font-size:10px;color:#065F46;margin-top:2px;">Counting paths, permutations n!, combinations C(n, k)</div>
      </div>
      <div style="font-size:24px;">🎲</div>
    </div>

    <div style="background:#D1FAE5;border:1px dashed #059669;border-radius:8px;padding:8px 10px;font-size:10px;color:#065F46;font-weight:700;">
      <div style="margin-bottom:2px;">☑ Set Theory (G = (V, E)) Verification</div>
      <div style="margin-bottom:2px;">☑ Graph Invariance &amp; Isomorphism Proofs</div>
      <div>☑ Handshaking Lemma: ∑ deg(v) = 2|E|</div>
    </div>
  </div>`;
  cell('sec2_content', sec2ContentHtml, 405, 126, 375, 374, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // Section 3: Step-by-Step Topics (x=790..1165)
  cell('sec3_bg', '', 790, 126, 375, 374, 'rounded=1;arcSize=8;fillColor=#FFF7ED;strokeColor=#FED7AA;strokeWidth=1.5;');

  cell('t_simple_pill', 'SIMPLE GRAPH', 805, 142, 140, 36, 'rounded=1;arcSize=10;fillColor=#FDBA74;strokeColor=#EA580C;fontColor=#7C2D12;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;');
  cell('sg_n1', '', 975, 144, 18, 18, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;');
  cell('sg_n2', '', 1025, 144, 18, 18, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;');
  cell('sg_n3', '', 1000, 174, 18, 18, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;');
  cell('sg_n4', '', 965, 174, 18, 18, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;');
  cell('sg_n5', '', 1035, 174, 18, 18, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;');
  edge('sge_1', 'sg_n1', 'sg_n2', 'strokeColor=#94A3B8;strokeWidth=1.2;endArrow=none;');
  edge('sge_2', 'sg_n2', 'sg_n3', 'strokeColor=#94A3B8;strokeWidth=1.2;endArrow=none;');
  edge('sge_3', 'sg_n3', 'sg_n4', 'strokeColor=#94A3B8;strokeWidth=1.2;endArrow=none;');
  edge('sge_4', 'sg_n4', 'sg_n1', 'strokeColor=#94A3B8;strokeWidth=1.2;endArrow=none;');
  edge('sge_5', 'sg_n1', 'sg_n3', 'strokeColor=#94A3B8;strokeWidth=1.2;endArrow=none;');

  cell('t_digraph_pill', 'DIRECTED GRAPH\n(Digraph)', 805, 204, 140, 42, 'rounded=1;arcSize=10;fillColor=#FDBA74;strokeColor=#EA580C;fontColor=#7C2D12;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;');
  cell('dg_n1', '', 980, 210, 20, 20, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.5;');
  cell('dg_n2', '', 1030, 210, 20, 20, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.5;');
  cell('dg_n3', '', 1005, 240, 20, 20, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.5;');
  edge('dge_1', 'dg_n1', 'dg_n2', 'strokeColor=#047857;strokeWidth=1.5;endArrow=classic;endSize=5;');
  edge('dge_2', 'dg_n2', 'dg_n3', 'strokeColor=#047857;strokeWidth=1.5;endArrow=classic;endSize=5;');
  edge('dge_3', 'dg_n3', 'dg_n1', 'strokeColor=#047857;strokeWidth=1.5;endArrow=classic;endSize=5;');

  cell('t_weighted_pill', 'WEIGHTED GRAPH', 805, 276, 140, 36, 'rounded=1;arcSize=10;fillColor=#FDBA74;strokeColor=#EA580C;fontColor=#7C2D12;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;');
  cell('wg_n1', '', 975, 276, 18, 18, 'ellipse;fillColor=#6366F1;strokeColor=#4338CA;strokeWidth=1.5;');
  cell('wg_n2', '', 1030, 276, 18, 18, 'ellipse;fillColor=#6366F1;strokeColor=#4338CA;strokeWidth=1.5;');
  cell('wg_n3', '', 1000, 304, 18, 18, 'ellipse;fillColor=#6366F1;strokeColor=#4338CA;strokeWidth=1.5;');
  edge('wge_1', 'wg_n1', 'wg_n2', 'strokeColor=#4338CA;strokeWidth=1.2;endArrow=none;');
  edge('wge_2', 'wg_n2', 'wg_n3', 'strokeColor=#4338CA;strokeWidth=1.2;endArrow=none;');
  edge('wge_3', 'wg_n3', 'wg_n1', 'strokeColor=#4338CA;strokeWidth=1.2;endArrow=none;');
  cell('w_lbl1', '6', 998, 268, 14, 12, 'text;fontColor=#4338CA;fontSize=8;fontStyle=1;');
  cell('w_lbl2', '3', 1022, 290, 14, 12, 'text;fontColor=#4338CA;fontSize=8;fontStyle=1;');
  cell('w_lbl3', '2', 980, 290, 14, 12, 'text;fontColor=#4338CA;fontSize=8;fontStyle=1;');

  cell('t_trees_pill', 'TREES\n(Hierarchy, DAG)', 805, 344, 140, 42, 'rounded=1;arcSize=10;fillColor=#FDBA74;strokeColor=#EA580C;fontColor=#7C2D12;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;');
  cell('tr_root', '', 1000, 346, 18, 18, 'ellipse;fillColor=#F59E0B;strokeColor=#B45309;strokeWidth=1.5;');
  cell('tr_c1', '', 975, 376, 16, 16, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.5;');
  cell('tr_c2', '', 1025, 376, 16, 16, 'ellipse;fillColor=#10B981;strokeColor=#047857;strokeWidth=1.5;');
  cell('tr_l1', '', 960, 404, 14, 14, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.2;');
  cell('tr_l2', '', 985, 404, 14, 14, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.2;');
  cell('tr_l3', '', 1015, 404, 14, 14, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.2;');
  cell('tr_l4', '', 1040, 404, 14, 14, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.2;');
  edge('tre_1', 'tr_root', 'tr_c1', 'strokeColor=#B45309;strokeWidth=1.2;endArrow=none;');
  edge('tre_2', 'tr_root', 'tr_c2', 'strokeColor=#B45309;strokeWidth=1.2;endArrow=none;');
  edge('tre_3', 'tr_c1', 'tr_l1', 'strokeColor=#047857;strokeWidth=1.2;endArrow=none;');
  edge('tre_4', 'tr_c1', 'tr_l2', 'strokeColor=#047857;strokeWidth=1.2;endArrow=none;');
  edge('tre_5', 'tr_c2', 'tr_l3', 'strokeColor=#047857;strokeWidth=1.2;endArrow=none;');
  edge('tre_6', 'tr_c2', 'tr_l4', 'strokeColor=#047857;strokeWidth=1.2;endArrow=none;');

  // Section 4: Modern Graph Science (x=1175..1580)
  cell('sec4_bg', '', 1175, 126, 405, 374, 'rounded=1;arcSize=8;fillColor=#FEFCE8;strokeColor=#FEF08A;strokeWidth=1.5;');
  const sec4HeaderHtml = `<div style="text-align:center;font-weight:900;font-size:12.5px;color:#854D0E;padding-top:8px;text-transform:uppercase;">
    Traversable Knowledge Graph
  </div>`;
  cell('sec4_title', sec4HeaderHtml, 1180, 130, 395, 24, 'text;html=1;whiteSpace=wrap;');

  cell('kg_social', 'Social\nWeb', 1195, 175, 52, 52, 'ellipse;fillColor=#38BDF8;strokeColor=#0284C7;fontColor=#FFFFFF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;');
  cell('kg_neural', 'Neural\nPathway', 1495, 175, 56, 56, 'ellipse;fillColor=#F59E0B;strokeColor=#D97706;fontColor=#FFFFFF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;');
  cell('kg_chem', 'Chemical\nStructure', 1335, 290, 60, 60, 'ellipse;fillColor=#10B981;strokeColor=#059669;fontColor=#FFFFFF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;');
  cell('kg_routing', 'Network\nRouting', 1480, 290, 56, 56, 'ellipse;fillColor=#A855F7;strokeColor=#7E22CE;fontColor=#FFFFFF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;');
  cell('kg_center', 'KG Core', 1345, 195, 48, 48, 'ellipse;fillColor=#3B82F6;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;');

  edge('kge_1', 'kg_social', 'kg_center', 'strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;');
  edge('kge_2', 'kg_neural', 'kg_center', 'strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;');
  edge('kge_3', 'kg_chem', 'kg_center', 'strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;');
  edge('kge_4', 'kg_routing', 'kg_center', 'strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;');
  edge('kge_5', 'kg_chem', 'kg_routing', 'strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;');

  const sec4BulletsHtml = `<div style="padding:10px 14px;font-family:system-ui,-apple-system,sans-serif;color:#713F12;font-size:10.5px;line-height:1.45;font-weight:700;">
    <div style="margin-bottom:4px;">🔬 • Random Graphs &amp; Small World Phenomenon</div>
    <div style="margin-bottom:4px;">🧠 • Spectral Graph Theory &amp; Graph Laplacians</div>
    <div>💻 • NetworkX, Neo4j, Vertex AI Graph RAG &amp; PyG</div>
  </div>`;
  cell('sec4_bullets', sec4BulletsHtml, 1180, 365, 395, 80, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // ==================== 4. BOTTOM MASTER WORKFLOW: KEY GRAPH ALGORITHMS (y=512..890) ====================
  cell('wf_bg', '', 20, 512, 1560, 378, 'rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.8;');

  const wfTitleHtml = `<div style="text-align:center;font-size:16px;font-weight:900;color:#0F172A;letter-spacing:0.5px;text-transform:uppercase;">
    KEY GRAPH ALGORITHMS &amp; APPLICATIONS WORKFLOW
  </div>`;
  cell('wf_title', wfTitleHtml, 20, 520, 1560, 24, 'text;html=1;whiteSpace=wrap;');

  // Step 1: Problem Definition
  cell('step1_box', '', 36, 554, 340, 316, 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const step1Html = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:12px;font-weight:900;color:#1E3A8A;text-transform:uppercase;margin-bottom:4px;">STEP 1: Problem Definition</div>
    <div style="font-size:10.5px;color:#64748B;font-weight:600;margin-bottom:10px;">Find Optimal Traversal / Shortest Path</div>
    <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;padding:12px;text-align:center;margin-bottom:10px;">
      <div style="font-size:36px;margin-bottom:4px;">🗺️ 📍</div>
      <div style="font-size:11px;font-weight:800;color:#1D4ED8;">Source Node A ➔ Target Node B</div>
      <div style="font-size:9.5px;color:#475569;margin-top:2px;">Minimize edge cost metric: C(p) = ∑ w(u, v)</div>
    </div>
    <div style="font-size:10px;color:#334155;line-height:1.4;">
      • Ingestion: Weighted Adjacency Matrix or Edge List<br/>
      • Constraint: Positive edge weights w(e) ≥ 0
    </div>
  </div>`;
  cell('step1_content', step1Html, 36, 554, 340, 316, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  cell('arr_1_2', '➔', 382, 690, 34, 40, 'text;html=1;fontSize=26;fontColor=#3B82F6;fontStyle=1;align=center;');

  // Step 2: Algorithm Execution (Flowchart Loop)
  cell('step2_box', '', 420, 554, 340, 316, 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const step2Html = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:12px;font-weight:900;color:#047857;text-transform:uppercase;margin-bottom:4px;">STEP 2: Algorithm Execution</div>
    <div style="font-size:10.5px;color:#64748B;font-weight:600;margin-bottom:10px;">Input: Graph G = (V, E), Weights W</div>
    <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;padding:8px 10px;margin-bottom:6px;text-align:center;">
      <div style="font-size:11px;font-weight:800;color:#065F46;">1. Vertex Processing</div>
      <div style="font-size:9px;color:#047857;">Initialize dist[s] = 0, dist[v] = ∞</div>
    </div>
    <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;padding:8px 10px;margin-bottom:6px;text-align:center;">
      <div style="font-size:11px;font-weight:800;color:#065F46;">2. Priority Queue / Min-Heap</div>
      <div style="font-size:9px;color:#047857;">Extract min vertex u with smallest dist</div>
    </div>
    <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;padding:8px 10px;text-align:center;">
      <div style="font-size:11px;font-weight:800;color:#065F46;">3. Edge Relaxation Loop 🔄</div>
      <div style="font-size:9px;color:#047857;">If dist[u] + w(u,v) &lt; dist[v] ➔ Update dist[v]</div>
    </div>
  </div>`;
  cell('step2_content', step2Html, 420, 554, 340, 316, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  cell('arr_2_3', '➔', 766, 690, 34, 40, 'text;html=1;fontSize=26;fontColor=#10B981;fontStyle=1;align=center;');

  // Step 3: Dijkstra's Engine & Bellman-Ford
  cell('step3_box', '', 804, 554, 350, 316, 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const step3Html = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:12px;font-weight:900;color:#7C2D12;text-transform:uppercase;margin-bottom:4px;">STEP 3: Dijkstra &amp; Bellman-Ford Engine</div>
    <div style="font-size:10.5px;color:#64748B;font-weight:600;margin-bottom:8px;">Greedy Choice &amp; Dynamic Relaxation</div>
    
    <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:6px 10px;margin-bottom:6px;">
      <div style="font-size:10.5px;font-weight:800;color:#9A3412;">DIJKSTRA ENGINE (O((V+E) log V))</div>
      <div style="font-size:9px;color:#7C2D12;">• Priority Queue Min-Heap extraction<br/>• Distance Table relaxation vector</div>
    </div>

    <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:6px 10px;margin-bottom:6px;">
      <div style="font-size:10.5px;font-weight:800;color:#9A3412;">BELLMAN-FORD ENGINE (O(V · E))</div>
      <div style="font-size:9px;color:#7C2D12;">• Handles negative edge weights<br/>• Detects negative weight cycles in networks</div>
    </div>

    <div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:8px;padding:6px 10px;text-align:center;font-size:10px;font-weight:800;color:#92400E;">
      🗺️ GPS Turn-by-Turn Routing Ready
    </div>
  </div>`;
  cell('step3_content', step3Html, 804, 554, 350, 316, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  cell('arr_3_4', '➔', 1160, 690, 34, 40, 'text;html=1;fontSize=26;fontColor=#EA580C;fontStyle=1;align=center;');

  // Step 4: Output: Solution & Real-World Applications
  cell('step4_box', '', 1200, 554, 360, 316, 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;');
  const step4Html = `<div style="padding:12px;font-family:system-ui,-apple-system,sans-serif;">
    <div style="font-size:12px;font-weight:900;color:#1E3A8A;text-transform:uppercase;margin-bottom:4px;">STEP 4: Solutions &amp; Applications</div>
    <div style="font-size:10.5px;color:#64748B;font-weight:600;margin-bottom:8px;">Enterprise Scale Real-World Deployment</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
      <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;padding:6px;text-align:center;">
        <div style="font-size:20px;">🚗</div>
        <div style="font-size:9.5px;font-weight:800;color:#1D4ED8;">GPS Navigation</div>
        <div style="font-size:8px;color:#475569;">Shortest Path Routing</div>
      </div>
      <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:6px;padding:6px;text-align:center;">
        <div style="font-size:20px;">⚡</div>
        <div style="font-size:9.5px;font-weight:800;color:#047857;">Power Grid (MST)</div>
        <div style="font-size:8px;color:#475569;">Kruskal / Prim Min-Cost</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      <div style="background:#FAF5FF;border:1px solid #E9D5FF;border-radius:6px;padding:6px;text-align:center;">
        <div style="font-size:20px;">🧬</div>
        <div style="font-size:9.5px;font-weight:800;color:#7E22CE;">DNA Sequencing</div>
        <div style="font-size:8px;color:#475569;">De Bruijn Eulerian Path</div>
      </div>
      <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:6px;padding:6px;text-align:center;">
        <div style="font-size:20px;">🌊</div>
        <div style="font-size:9.5px;font-weight:800;color:#C2410C;">Max Flow Bandwidth</div>
        <div style="font-size:8px;color:#475569;">Ford-Fulkerson Cut</div>
      </div>
    </div>
  </div>`;
  cell('step4_content', step4Html, 1200, 554, 360, 316, 'text;html=1;whiteSpace=wrap;overflow=hidden;');

  // ==================== 5. FOOTER TENETS & BRAND (y=904..948) ====================
  const footerHtml = `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;box-sizing:border-box;padding:0 24px;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:8px;font-family:system-ui,-apple-system,sans-serif;font-size:11px;font-weight:800;color:#334155;letter-spacing:0.06em;">
    <div>PRODUCER INDEPENDENCE &nbsp;|&nbsp; CONSUMER INDEPENDENCE &nbsp;|&nbsp; FORMAT, NOT PLATFORM</div>
    <div style="color:#2563EB;display:flex;align-items:center;gap:6px;">
      <span style="font-size:14px;">☁️</span>
      <span>Google Cloud Architecture Engine</span>
    </div>
  </div>`;
  cell('ftr_main', footerHtml, 20, 904, 1560, 44, 'text;html=1;whiteSpace=wrap;overflow=hidden;rounded=1;');

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template51_graph_theory_roadmap" name="Graph Theory Learning Roadmap">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="${isDark ? '#0B111E' : '#FFFFFF'}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
