import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { submitDiagramFeedback } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// POST /api/diagrams/[id]/feedback - Submit user evaluation feedback for a diagram version
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in to submit feedback.' }, { status: 401 });
    }

    const { id: diagramId } = await params;
    const body = await request.json();
    const { versionId, rating, feedbackTags, freeTextComment } = body;

    if (!rating || !['thumbs_up', 'thumbs_down', 'neutral'].includes(rating)) {
      return NextResponse.json(
        { error: 'Invalid rating. Allowed values: thumbs_up, thumbs_down, neutral.' },
        { status: 400 }
      );
    }

    const tagsArray = Array.isArray(feedbackTags) ? feedbackTags : [];

    const feedback = await submitDiagramFeedback(
      diagramId,
      versionId || null,
      user.id,
      rating,
      tagsArray,
      freeTextComment
    );

    return NextResponse.json({
      success: true,
      feedback,
      message: 'Feedback recorded successfully!',
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error submitting diagram feedback:', error);
    const msg = error instanceof Error ? error.message : 'Failed to submit feedback.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
