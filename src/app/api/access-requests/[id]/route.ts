import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { resolveAccessRequest } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// PUT /api/access-requests/[id] - Approve or Deny access request
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (status !== 'Approved' && status !== 'Denied') {
      return NextResponse.json({ error: 'Status must be either "Approved" or "Denied".' }, { status: 400 });
    }

    const resolved = await resolveAccessRequest(id, user.id, status);

    return NextResponse.json({
      success: true,
      accessRequest: resolved,
    });
  } catch (error: unknown) {
    console.error('Error resolving access request:', error);
    const msg = error instanceof Error ? error.message : 'Failed to resolve access request.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
