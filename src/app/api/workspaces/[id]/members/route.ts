import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { inviteWorkspaceMember } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// POST /api/workspaces/[id]/members - Invite or update workspace collaborator
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id: workspaceId } = await params;
    const body = await request.json();
    const { email, role } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    if (!role || !['Editor', 'Viewer'].includes(role)) {
      return NextResponse.json({ error: 'Role must be Editor or Viewer.' }, { status: 400 });
    }

    const member = await inviteWorkspaceMember(
      workspaceId,
      email,
      role as 'Editor' | 'Viewer',
      user.id
    );

    return NextResponse.json({
      success: true,
      member,
      message: `Successfully added ${email} as ${role}!`,
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error inviting workspace member:', error);
    const msg = error instanceof Error ? error.message : 'Failed to invite workspace member.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
