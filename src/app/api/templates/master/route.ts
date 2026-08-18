import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAuthenticatedUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Authentication is required to publish master blueprints.' }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, category, description, badge, xml } = body;

    if (!id || !name || !xml) {
      return NextResponse.json({ error: 'Missing required fields: id, name, and xml are required.' }, { status: 400 });
    }

    const cleanId = id.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_');
    const xmlDir = path.join(process.cwd(), 'templates', 'master_blueprints', 'xml');
    if (!fs.existsSync(xmlDir)) {
      fs.mkdirSync(xmlDir, { recursive: true });
    }

    // Save XML file
    const xmlFilePath = path.join(xmlDir, `${cleanId}.drawio.xml`);
    fs.writeFileSync(xmlFilePath, xml, 'utf8');

    // Update all_master_templates.json
    const jsonPath = path.join(process.cwd(), 'templates', 'master_blueprints', 'all_master_templates.json');
    let templates: any[] = [];
    if (fs.existsSync(jsonPath)) {
      try {
        templates = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      } catch (e) {
        templates = [];
      }
    }

    const existingIndex = templates.findIndex((t: any) => t.id === cleanId);
    const templateRecord = {
      id: cleanId,
      name: name.trim(),
      category: category || 'Custom Master Architecture',
      badge: badge || 'Master Blueprint (Custom)',
      description: description || `Custom master template published directly from workspace for ${name}.`,
      xml
    };

    if (existingIndex >= 0) {
      templates[existingIndex] = templateRecord;
    } else {
      templates.push(templateRecord);
    }

    fs.writeFileSync(jsonPath, JSON.stringify(templates, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      message: `Master Template "${name}" saved and registered successfully!`,
      template: templateRecord
    });
  } catch (error: any) {
    console.error('Error saving master template:', error);
    return NextResponse.json({ error: error.message || 'Internal server error saving master template' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'templates', 'master_blueprints', 'all_master_templates.json');
    if (fs.existsSync(jsonPath)) {
      const templates = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      return NextResponse.json({ templates });
    }
    return NextResponse.json({ templates: [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
