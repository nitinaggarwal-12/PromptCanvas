import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { submitDiagramFeedback, recordChangelogEntry } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// POST /api/diagrams/[id]/feedback - Submit user evaluation feedback for a diagram version
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    const userId = user?.id || 'guest_explorer';

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
      userId,
      rating,
      tagsArray,
      freeTextComment
    );

    await recordChangelogEntry({
      event_category: 'COMMENT_ADDED',
      actor_id: userId,
      actor_name: user?.name || user?.email || 'Architecture Reviewer',
      actor_email: user?.email || 'reviewer@enterprise-arch.io',
      actor_role: user?.global_role || 'Author',
      entity_type: 'Comment',
      entity_id: diagramId,
      entity_name: `Diagram ${diagramId}`,
      field_changed: 'comment',
      old_value: 'None',
      new_value: `${rating}: ${freeTextComment || tagsArray.join(', ') || 'Rated diagram'}`,
      summary: `${user?.name || 'Architecture Reviewer'} submitted feedback (${rating}) on Diagram ${diagramId}: "${freeTextComment || tagsArray.join(', ')}" — synced to Google Sheet [Comments!A:G].`,
      source: 'UI',
      sheet_row_ref: 'Comments!A:G',
    });

    return NextResponse.json({
      success: true,
      feedback,
      message: 'Feedback recorded and synced to Changelog & Google Sheet!',
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error submitting diagram feedback:', error);
    const msg = error instanceof Error ? error.message : 'Failed to submit feedback.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

