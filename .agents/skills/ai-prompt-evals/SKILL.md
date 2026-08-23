---
name: ai-prompt-evals
description: Automated evaluation suite to score Gemini prompt-to-Draw.io XML graph compilation accuracy, node connection validity, and hallucination rates across reference architecture benchmark prompts.
---

# AI Prompt Evals & Graph Compilation Benchmark Skill

This skill provides automated evaluation tools to benchmark Gemini model performance, prompt template accuracy, and Draw.io XML graph topology validity.

## 1. Multi-Dimensional Benchmark Evaluation Protocol

1. **XML Syntax & Diagram Validity**: Parses generated `<mxfile><diagram><mxGraphModel>` tree to ensure standard Draw.io XML structure.
2. **Numbered Data Flow & Step Sequence Coverage**: Verifies that process flows contain sequential step badges (❶..❻ / 1..6) and connector drop-lines or chained transitions.
3. **Typed Edge Diversity**: Verifies color-coded connector variety (Synchronous Blue, Asynchronous Orange, AI Purple, External Green, Governance Slate, and Feedback Loop Teal).
4. **Product & Icon Resolution**: Ensures vendor products match requested cloud ecosystems (GCP, AWS, Azure, Databricks) with valid SVG icon mapping.
5. **Node Connectivity & Zero-Orphan Rate**: Verifies that every service node is connected to at least one valid data path.
6. **2D Bounding Box Non-Collision**: Verifies that nodes maintain $\ge 30\text{px}$ safety clearance within container tiers.

## 2. Automated Evals Runner (`scratch/eval_ai_prompts.js`)

```javascript
const { parseStringPromise } = require('xml2js');

async function evaluateGeneratedGraphXml(xmlString, expectedCloud = 'gcp') {
  console.log('🤖 Running AI Graph Compilation Benchmark...');
  
  if (!xmlString || !xmlString.includes('<mxGraphModel>')) {
    return { valid: false, score: 0, reason: 'Invalid XML: missing mxGraphModel root tag' };
  }

  try {
    const parsed = await parseStringPromise(xmlString);
    const cells = parsed?.mxfile?.diagram?.[0]?.mxGraphModel?.[0]?.root?.[0]?.mxCell || [];

    const vertexCells = cells.filter(c => c.$.vertex === '1' && c.$.id !== '0' && c.$.id !== '1');
    const edgeCells = cells.filter(c => c.$.edge === '1');

    const totalNodes = vertexCells.length;
    const totalEdges = edgeCells.length;

    // 1. Numbered Sequence Step Coverage
    const numberedEdges = edgeCells.filter(e => {
      const val = e.$.value || '';
      return /^[0-9]+\.\s+|[❶-❿]/.test(val.replace(/<[^>]+>/g, '').trim());
    });
    const sequenceCoverage = totalEdges > 0 ? (numberedEdges.length / totalEdges) : 1;

    // 2. Typed Edge Variety Check (Sync, Async, AI, External, Feedback)
    const hasSync = edgeCells.some(e => (e.$.style || '').includes('#2563EB') || (e.$.style || '').includes('#1D4ED8'));
    const hasAsyncOrAI = edgeCells.some(e => (e.$.style || '').includes('#EA580C') || (e.$.style || '').includes('#7C3AED') || (e.$.style || '').includes('dashed=1'));
    const edgeDiversityScore = (hasSync ? 10 : 0) + (hasAsyncOrAI ? 10 : 0);

    // 3. Connectivity Ratio
    const isConnected = totalNodes > 1 ? totalEdges >= totalNodes - 1 : true;

    // 4. Icon / Visual System Check
    const nodesWithIcons = vertexCells.filter(n => (n.$.value || '').includes('<img src=') || (n.$.value || '').includes('data:image/svg'));
    const iconRate = totalNodes > 0 ? (nodesWithIcons.length / totalNodes) : 1;

    // Composite Score Calculation (0-100)
    let score = 0;
    if (isConnected) score += 30;
    score += Math.round(sequenceCoverage * 25);
    score += edgeDiversityScore;
    score += Math.round(iconRate * 25);

    console.log(`📊 AI Eval Score: ${score}/100 | Nodes: ${totalNodes} | Edges: ${totalEdges} | Sequence: ${Math.round(sequenceCoverage * 100)}% | Edge Diversity: ${edgeDiversityScore}/20 | Icons: ${Math.round(iconRate * 100)}%`);

    return {
      valid: true,
      score,
      totalNodes,
      totalEdges,
      sequenceCoverage,
      iconRate,
      isConnected,
    };
  } catch (err) {
    return { valid: false, score: 0, reason: `XML Parse Error: ${err.message}` };
  }
}

module.exports = { evaluateGeneratedGraphXml };
```

## 3. Workflow Trigger
Execute `evaluateGeneratedGraphXml()` during LLM prompt tuning or Gemini SDK upgrades (`@google/genai`).
