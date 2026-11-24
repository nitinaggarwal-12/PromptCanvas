import { NextResponse } from 'next/server';
import {
  recommendBlueprintsWithNlp,
  type PreferredDepthFilter,
} from '@/lib/nlpBlueprintRecommender';

const ALLOWED_LEVELS = new Set<PreferredDepthFilter>(['All', 'L100', 'L200', 'L300', 'L400']);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
    const rawLevel = typeof body?.preferredLevel === 'string' ? body.preferredLevel.trim() : 'All';
    const preferredLevel: PreferredDepthFilter = ALLOWED_LEVELS.has(rawLevel as PreferredDepthFilter)
      ? (rawLevel as PreferredDepthFilter)
      : 'All';

    if (!prompt || prompt.length < 3) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a descriptive architecture prompt (at least 3 characters).' },
        { status: 400 }
      );
    }

    const result = await recommendBlueprintsWithNlp({
      prompt,
      preferredLevel,
    });

    return NextResponse.json(
      { ok: true, ...result },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('[/api/blueprints/recommend] Failed:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to evaluate prompt recommendations.',
      },
      { status: 500 }
    );
  }
}
