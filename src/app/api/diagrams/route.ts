import { NextResponse } from 'next/server';
import { listDiagrams, createDiagram } from '@/lib/db';

// GET /api/diagrams - List all diagrams
export async function GET() {
  try {
    const diagrams = listDiagrams();
    return NextResponse.json(diagrams);
  } catch (error) {
    console.error('Failed to list diagrams:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST /api/diagrams - Create a new diagram
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, xml, comment } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "name" is required and must be a string' },
        { status: 400 }
      );
    }

    const { diagram, version } = createDiagram(name, xml, comment);

    return NextResponse.json({ diagram, version }, { status: 201 });
  } catch (error) {
    console.error('Failed to create diagram:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
