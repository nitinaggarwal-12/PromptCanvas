import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getUserLogs } from '@/lib/db';

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const logs = await getUserLogs(user.id, 50);

    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error('User logs error:', error);
    return NextResponse.json({ error: 'Failed to retrieve user logs.' }, { status: 500 });
  }
}
