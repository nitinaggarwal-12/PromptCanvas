import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_ID } from '@/lib/geminiConfig';
import { getAllSavedMediaAssets, saveMediaAssetRecord } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const rawAssets = await getAllSavedMediaAssets(40);
    const assets = (rawAssets || [])
      .map(a => ({
        id: a.id,
        type: a.asset_type || (a as any).type || 'animation',
        title: a.title,
        url: a.url || null,
        htmlCode: a.html_code || (a as any).htmlCode || null,
        aspectRatio: a.aspect_ratio || (a as any).aspectRatio || '16:9',
        caption: a.caption || null,
        category: a.category || 'general',
        createdAt: a.created_at || (a as any).createdAt
      }));

    return NextResponse.json({ success: true, assets });
  } catch (error: any) {
    console.error('Failed to fetch media assets:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch media assets' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, type = 'interactive_html', category = 'general', previousAsset = null } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Missing prompt.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Content generation is not configured. Set GEMINI_API_KEY on the server.' }, { status: 503 });
    }
    const ai = new GoogleGenAI({ apiKey });

    // Determine category-specific specialization for high-craft generation
    const isEvolution = Boolean(previousAsset && previousAsset.htmlCode);
    const lowerPrompt = prompt.toLowerCase();

    let categoryContext = '';
    if (category === 'games' || lowerPrompt.includes('quiz') || lowerPrompt.includes('trivia')) {
      categoryContext = `FORMAT SPECIFICATION: GAMIFIED INTERACTIVE QUIZ & TRIVIA
- Build a complete, playable 4-5 question multiple-choice quiz.
- Include a sleek progress bar, question timer, score tracker, instant answer check with green/red feedback cards, explanations, and final victory score summary screen with celebration confetti.`;
    } else if (category === 'knowledge' || lowerPrompt.includes('mindmap') || lowerPrompt.includes('mind map') || lowerPrompt.includes('concept tree')) {
      categoryContext = `FORMAT SPECIFICATION: INTERACTIVE EXPANDABLE MIND MAP
- Render an interactive 2D Canvas or SVG radial mind map.
- Central core theme branching into color-coded child nodes.
- Support mouse drag/pan, zoom, and clicking nodes to expand/collapse child branches or show detail popups.`;
    } else if (category === 'decks' || lowerPrompt.includes('slide') || lowerPrompt.includes('presentation') || lowerPrompt.includes('carousel')) {
      categoryContext = `FORMAT SPECIFICATION: 16:9 INTERACTIVE SLIDE PRESENTATION DECK
- Build an executive 4-6 slide deck formatted in 16:9 aspect ratio.
- Include Previous/Next buttons, keyboard arrow navigation, slide indicator pills, animated card transitions, key metric badges, and expandable speaker notes drawer.`;
    } else if (category === 'audio' || lowerPrompt.includes('podcast') || lowerPrompt.includes('song') || lowerPrompt.includes('speech')) {
      categoryContext = `FORMAT SPECIFICATION: INTERACTIVE AUDIO EXPERIENCE & SYNTHESIS
- Build an interactive audio player with animated audio frequency equalizer/waveform bars using HTML5 Canvas.
- Include Play/Pause controls, timeline scrubber, host avatars with live dialogue transcript highlights, and Web Audio API synthesizer chimes.`;
    } else if (category === 'science' || lowerPrompt.includes('molecule') || lowerPrompt.includes('surface') || lowerPrompt.includes('circuit')) {
      categoryContext = `FORMAT SPECIFICATION: INTERACTIVE 3D SCIENCE & MATH SIMULATOR
- Build an interactive 3D rotatable mathematical or molecular model using HTML5 Canvas/WebGL.
- Include mouse drag rotation, zoom controls, parameter sliders (e.g. speed, friction, frequency), and live equation overlays.`;
    } else if (category === 'timelines' || lowerPrompt.includes('timeline') || lowerPrompt.includes('gantt') || lowerPrompt.includes('roadmap')) {
      categoryContext = `FORMAT SPECIFICATION: INTERACTIVE HORIZONTAL TIMELINE / GANTT ROADMAP
- Build a smooth horizontal scrolling interactive timeline with chronological epoch cards, status badges, and expandable milestone detail modals.`;
    } else if (category === 'uiux' || lowerPrompt.includes('wireframe') || lowerPrompt.includes('prototype') || lowerPrompt.includes('mockup')) {
      categoryContext = `FORMAT SPECIFICATION: CLICKABLE APP WIREFRAME / PROTOTYPE
- Build a responsive, interactive web or mobile application mockup with functional tab navigation, interactive toggles, working filter modals, and high-contrast dark UI design system.`;
    } else {
      categoryContext = `FORMAT SPECIFICATION: 60FPS PROCEDURAL CANVAS SIMULATION & SHADER
- Build a 60fps high-contrast responsive HTML5 Canvas 2D / WebGL particle physics animation with mouse-reactive gravity, particle trails, and interactive controls.`;
    }

    const systemInstruction = `You are Google DeepMind's Creative Multimodal Master Engineer & Interactive Experience Specialist.
Your mission is to generate an interactive, self-contained, high-fidelity HTML5 application for the user prompt.

${categoryContext}

MANDATORY TECHNICAL LAWS:
1. Output ONLY pure raw HTML starting with <!DOCTYPE html> and ending with </html>.
2. Embed all CSS inside <style> and all JavaScript inside <script>.
3. Design for modern dark-mode aesthetic (background: #050811, typography: Inter/system-ui, crisp borders: #1E293B, accents: #6366F1, #38BDF8, #10B981).
4. Make all buttons, clicks, sliders, and interactions fully functional and responsive within its iframe viewport.
5. NEVER output markdown fences (no \`\`\`html or \`\`\`). Output pure executable HTML.`;

    const userPrompt = isEvolution
      ? `Existing HTML5 Code:
${previousAsset.htmlCode}

Requested Modification / Evolution:
"${prompt}"

Apply the requested changes while keeping all interactive mechanics fully functional.`
      : `Create a complete, fully-functional, interactive ${category} application for: "${prompt}"`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_ID,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        temperature: 0.3
      }
    });

    let htmlCode = response.text || '';
    htmlCode = htmlCode.replace(/^\s*```html/i, '').replace(/```\s*$/i, '').trim();

    const title = (isEvolution ? `${previousAsset.title} (Updated)` : prompt.toUpperCase()).slice(0, 48);
    const assetRecord = await saveMediaAssetRecord({
      // Studio 3 content is independent from the legacy diagram table.
      diagram_id: null,
      // Gemini returns a self-contained HTML experience. Do not label it as an image/video without a real media URL.
      asset_type: type === 'quiz' || category === 'games' ? 'quiz' : type === 'mindmap' ? 'mindmap' : 'interactive_html',
      title,
      html_code: htmlCode,
      aspect_ratio: '16:9',
      caption: isEvolution ? `Evolved based on: "${prompt}"` : `Generated ${category} asset for "${prompt}"`,
      category
    });

    return NextResponse.json({
      success: true,
      asset: {
        id: assetRecord.id,
        type: assetRecord.asset_type,
        title: assetRecord.title,
        htmlCode: assetRecord.html_code,
        caption: assetRecord.caption,
        aspectRatio: assetRecord.aspect_ratio,
        category: assetRecord.category,
        createdAt: assetRecord.created_at
      }
    });
  } catch (error: any) {
    console.error('Media generation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate multimodal content' }, { status: 500 });
  }
}
