import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_ID } from '@/lib/geminiConfig';

export async function POST(req: NextRequest) {
  try {
    const { prompt, type = 'animation' } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Missing prompt.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });

    // Handle Gladiator specific photorealistic image mapping if requested
    if (prompt.toLowerCase().includes('gladiator') || prompt.toLowerCase().includes('colosseum')) {
      return NextResponse.json({
        success: true,
        asset: {
          id: 'media_gladiator_arena',
          type: 'image',
          title: 'Colosseum Gladiator Duel',
          url: '/gladiators_rome_arena.jpg',
          caption: 'Photorealistic Roman Colosseum arena duel with Secutor vs Retiarius in dramatic sunlight and dust.',
          aspectRatio: '16:9',
          createdAt: new Date().toISOString()
        }
      });
    }

    // Otherwise, generate a rich standalone HTML5 Canvas / WebGL / CSS procedural interactive animation!
    const systemInstruction = `You are Google DeepMind's Creative Multimodal Graphics & Procedural Animation Specialist.
Your task is to generate a complete, standalone, self-contained HTML5 file containing rich CSS, JavaScript, HTML5 Canvas 2D/WebGL, and interactive physics for the given visual prompt.

MANDATORY RULES:
1. Output ONLY the raw HTML code starting with <!DOCTYPE html> and ending with </html>.
2. Include all necessary CSS (embedded inside <style>) and JavaScript (embedded inside <script>).
3. The animation must be modern, responsive, 60fps smooth (requestAnimationFrame), high-contrast, dark-themed (#050811), and visually stunning.
4. Include interactive mouse controls (hover particles, click ripples, drag orbit).
5. Never use markdown code blocks or backticks. Output pure executable HTML code.`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_ID,
      contents: [{ role: 'user', parts: [{ text: `Create an interactive, cinematic, 60fps HTML5 Canvas animation / simulation for: ${prompt}` }] }],
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        temperature: 0.3
      }
    });

    let htmlCode = response.text || '';
    htmlCode = htmlCode.replace(/^\s*```html/i, '').replace(/```\s*$/i, '').trim();

    return NextResponse.json({
      success: true,
      asset: {
        id: `media_${Date.now()}`,
        type: type === 'image' ? 'image' : 'animation',
        title: prompt.toUpperCase().slice(0, 45),
        htmlCode,
        caption: `Interactive 60fps procedural simulation generated for ${prompt}`,
        aspectRatio: '16:9',
        createdAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Media generation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate media' }, { status: 500 });
  }
}
