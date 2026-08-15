import { NextResponse } from 'next/server';
import { getVisitorCount, incrementVisitorCount } from '@/lib/db';

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
      { error: 'Failed to retrieve visitor count', count: 1284 },
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
      { error: 'Failed to increment visitor count', count: 1284 },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
