import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getUserDiagramAccess, getAccessRequestStatus } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/diagrams/[id]/access - Check user access level and pending request state
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    const { id } = await params;

    const accessLevel = await getUserDiagramAccess(id, user?.id);
    let pendingRequest = null;

    if (user) {
      pendingRequest = await getAccessRequestStatus(id, user.id);
    }

    return NextResponse.json({
      success: true,
      accessLevel,
      pendingRequest,
    });
  } catch (error) {
    console.error('Error fetching diagram access state:', error);
    return NextResponse.json({ error: 'Failed to fetch access state.' }, { status: 500 });
  }
}
