import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getFeedbackCurationData } from '@/lib/db';

// GET /api/feedback/curation - Aggregated feedback analytics for prompt engineering team
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const curationData = await getFeedbackCurationData();

    return NextResponse.json({
      success: true,
      data: curationData,
    });
  } catch (error) {
    console.error('Error fetching feedback curation data:', error);
    return NextResponse.json({ error: 'Failed to fetch curation analytics.' }, { status: 500 });
  }
}
