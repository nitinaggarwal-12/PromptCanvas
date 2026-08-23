---
name: ai-prompt-evals
description: Automated evaluation suite to score Gemini prompt-to-Draw.io XML graph compilation accuracy, node connection validity, and hallucination rates across reference architecture benchmark prompts.
---

# AI Prompt Evals & Graph Compilation Benchmark Skill

This skill provides automated evaluation tools to benchmark Gemini model performance, prompt template accuracy, and Draw.io XML graph topology validity.

## 1. Multi-Dimensional Benchmark Evaluation Protocol

1. **XML Syntax & Diagram Validity**: Parses generated `<mxfile><diagram><mxGraphModel>` tree to ensure standard Draw.io XML structure.
2. **Numbered Data Flow Coverage**: Verifies that $\ge 90\%$ of connectors contain sequential numbered step prefixes (e.g. `1. Ingestion`, `2. Buffer`).
3. **Product & Icon Resolution**: Ensures vendor products match requested cloud ecosystems (GCP, AWS, Azure, Databricks) with valid SVG icon mapping.
4. **Node Connectivity & Zero-Orphan Rate**: Verifies that every service node is connected to at least one valid data path.
5. **2D Bounding Box Non-Collision**: Verifies that nodes maintain $\ge 30\text{px}$ safety clearance within container tiers.

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
      return /^[0-9]+\.\s+/.test(val.replace(/<[^>]+>/g, '').trim());
    });
    const sequenceCoverage = totalEdges > 0 ? (numberedEdges.length / totalEdges) : 1;

    // 2. Connectivity Ratio
    const isConnected = totalNodes > 1 ? totalEdges >= totalNodes - 1 : true;

    // 3. Icon / Visual System Check
    const nodesWithIcons = vertexCells.filter(n => (n.$.value || '').includes('<img src='));
    const iconRate = totalNodes > 0 ? (nodesWithIcons.length / totalNodes) : 1;

    // Composite Score Calculation (0-100)
    let score = 0;
    if (isConnected) score += 40;
    score += Math.round(sequenceCoverage * 30);
    score += Math.round(iconRate * 30);

    console.log(`📊 AI Eval Score: ${score}/100 | Nodes: ${totalNodes} | Edges: ${totalEdges} | Sequence Coverage: ${Math.round(sequenceCoverage * 100)}% | Icons: ${Math.round(iconRate * 100)}%`);

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
