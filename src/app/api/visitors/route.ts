import { NextResponse } from 'next/server';
import { getVisitorCount, incrementVisitorCount, resetVisitorCount, isUserSuperAdmin } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Surrogate-Control': 'no-store',
};

export async function GET() {
  try {
    const count = await getVisitorCount();
    return NextResponse.json(
      { count, success: true },
      {
        status: 200,
        headers: noCacheHeaders,
      }
    );
  } catch (error: unknown) {
    console.error('Failed to get visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve visitor count', count: null, success: false },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

export async function POST() {
  try {
    const count = await incrementVisitorCount(1);
    return NextResponse.json(
      { count, success: true },
      {
        status: 200,
        headers: noCacheHeaders,
      }
    );
  } catch (error: unknown) {
    console.error('Failed to increment visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to increment visitor count', count: null, success: false },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !isUserSuperAdmin(user)) {
      return NextResponse.json(
        { error: 'Forbidden: Super-admin privileges required to reset visitor counter.' },
        { status: 403, headers: noCacheHeaders }
      );
    }
    const body = await req.json().catch(() => ({}));
    const targetValue = typeof body.value === 'number' ? body.value : 0;
    const count = await resetVisitorCount(targetValue);
    return NextResponse.json(
      { count, success: true, message: `Visitor count reset to ${count}` },
      {
        status: 200,
        headers: noCacheHeaders,
      }
    );
  } catch (error: unknown) {
    console.error('Failed to reset visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to reset visitor count' },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
