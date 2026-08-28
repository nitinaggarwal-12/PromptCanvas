import { NextRequest, NextResponse } from 'next/server';
import { parseStudio3IntentWithLLM } from '@/lib/studio3/intentParser';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, previousContext, userApiKey } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid prompt string.' },
        { status: 400 }
      );
    }

    const intent = await parseStudio3IntentWithLLM({
      prompt,
      previousContext,
      userApiKey
    });

    return NextResponse.json({
      success: true,
      intent
    });
  } catch (error: any) {
    console.error('Studio 3 Intent API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to parse intent for Studio 3.' },
      { status: 500 }
    );
  }
}
