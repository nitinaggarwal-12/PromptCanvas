import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getUserWorkspaces, createTeamWorkspace } from '@/lib/db';

// GET /api/workspaces - Fetch grouped workspaces (Personal vs Shared)
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const data = await getUserWorkspaces(user.id);
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error fetching user workspaces:', error);
    return NextResponse.json({ error: 'Failed to fetch workspaces.' }, { status: 500 });
  }
}

// POST /api/workspaces - Create a new team workspace
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Workspace name is required.' }, { status: 400 });
    }

    const workspace = await createTeamWorkspace(name, user.id);
    return NextResponse.json({
      success: true,
      workspace,
      message: 'Workspace created successfully!',
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating workspace:', error);
    const msg = error instanceof Error ? error.message : 'Failed to create workspace.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
