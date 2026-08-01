import { NextResponse } from 'next/server';
import { validateDrawioXml } from '@/lib/validate/validator';

export async function POST(request: Request) {
  try {
    const { xml } = await request.json();
    if (!xml || typeof xml !== 'string') {
      return NextResponse.json(
        { valid: false, errors: [{ code: 'XML_INVALID', cells: [], detail: 'Request body must contain "xml" string' }], warnings: [] },
        { status: 400 }
      );
    }

    const report = validateDrawioXml(xml);
    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json(
      { valid: false, errors: [{ code: 'XML_INVALID', cells: [], detail: err?.message || String(err) }], warnings: [] },
      { status: 500 }
    );
  }
}
