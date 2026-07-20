import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { createAccessRequest, getAccessRequestsForOwner, getUserAccessRequests } from '@/lib/db';

// GET /api/access-requests - Fetch pending requests for owned diagrams & user's submitted requests
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const pendingForOwner = await getAccessRequestsForOwner(user.id);
    const userSubmitted = await getUserAccessRequests(user.id);

    return NextResponse.json({
      success: true,
      pendingForOwner,
      userSubmitted,
    });
  } catch (error) {
    console.error('Error fetching access requests:', error);
    return NextResponse.json({ error: 'Failed to fetch access requests.' }, { status: 500 });
  }
}

// POST /api/access-requests - Submit a new access request for a diagram
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in to request access.' }, { status: 401 });
    }

    const body = await request.json();
    const { diagramId, requestedRole, message } = body;

    if (!diagramId || typeof diagramId !== 'string') {
      return NextResponse.json({ error: 'Diagram ID is required.' }, { status: 400 });
    }

    const role = requestedRole === 'Editor' ? 'Editor' : 'Viewer';

    const accessRequest = await createAccessRequest(diagramId, user.id, role, message);

    return NextResponse.json({
      success: true,
      accessRequest,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating access request:', error);
    return NextResponse.json({ error: 'Failed to create access request.' }, { status: 500 });
  }
}
