import { NextResponse } from 'next/server';
import {
  performTwoWayGoogleSheetSync,
  getGovernanceTrackerItems,
  getGovernanceComments,
  getSuperAdminAllUsers,
  getChangelogEntries,
  getSheetSyncConfig,
} from '@/lib/db';

// GET /api/changelog/sheet-sync - Returns the 4-tab Google Sheet workbook state, CSV export, and Apps Script 2-Way Webhook code
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    const [trackerItems, comments, rawUsers, changelog, syncConfig] = await Promise.all([
      getGovernanceTrackerItems(),
      getGovernanceComments(100),
      getSuperAdminAllUsers(),
      getChangelogEntries({ limit: 250 }),
      getSheetSyncConfig(),
    ]);
    const users = rawUsers.filter((u) => !u.email.endsWith('@promptcanvas.guest'));

    if (format === 'csv') {
      const headers = [
        'Timestamp',
        'Category',
        'Who Changed (Actor)',
        'Actor Email',
        'Role',
        'Entity Type',
        'Target Entity',
        'Field Changed',
        'Before (Old Value)',
        'After (New Value)',
        'Origin Source',
        'Sheet Cell Ref',
        'Audit Summary',
      ];
      const escapeCsv = (val: unknown) => {
        const s = String(val ?? '').replace(/"/g, '""');
        return `"${s}"`;
      };
      const rows = changelog.map((c) =>
        [
          c.created_at,
          c.event_category,
          c.actor_name,
          c.actor_email,
          c.actor_role,
          c.entity_type,
          c.entity_name,
          c.field_changed,
          c.old_value || '',
          c.new_value || '',
          c.source,
          c.sheet_row_ref || '',
          c.summary,
        ]
          .map(escapeCsv)
          .join(',')
      );
      const csvContent = [headers.map(escapeCsv).join(','), ...rows].join('\n');
      return new Response(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="PromptCanvas_2Way_Changelog_Sheet.csv"',
        },
      });
    }

    const appsScriptCode = `/**
 * PromptCanvas <-> Google Sheets 2-Way Live Sync Connector
 * Paste into Extensions > Apps Script in your Google Sheet.
 * Automatically pushes cell edits (Users, Comments, Status changes) to PromptCanvas
 * and pulls UI changes into the 4 tabs: Tracker, Users, Comments, Changelog.
 */
const PROMPTCANVAS_API_URL = "https://promptcanvas-887605034827.us-central1.run.app/api/changelog/sheet-sync";

function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  const row = e.range.getRow();
  if (row <= 1) return; // Skip header row

  const editorEmail = Session.getActiveUser().getEmail() || "sheet-editor@enterprise-arch.io";
  const editorName = editorEmail.split("@")[0].replace(/\\./g, " ");
  const rowValues = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];

  let payload = {
    actorName: editorName,
    actorEmail: editorEmail,
    sheetEdits: {}
  };

  if (sheetName === "Tracker") {
    payload.sheetEdits.trackerEdits = [{
      blueprint_code: String(rowValues[0] || "").trim(),
      status: String(rowValues[3] || "").trim(),
      owner_name: String(rowValues[5] || "").trim(),
      owner_email: String(rowValues[6] || "").trim(),
      latest_comment: String(rowValues[7] || "").trim()
    }];
  } else if (sheetName === "Users") {
    payload.sheetEdits.addedUsers = [{
      name: String(rowValues[0] || "").trim(),
      email: String(rowValues[1] || "").trim(),
      role: String(rowValues[2] || "Author").trim()
    }];
  } else if (sheetName === "Comments") {
    payload.sheetEdits.addedComments = [{
      target_id: String(rowValues[0] || "").trim(),
      comment_text: String(rowValues[2] || "").trim(),
      author_name: String(rowValues[3] || editorName).trim(),
      author_email: String(rowValues[4] || editorEmail).trim()
    }];
  }

  UrlFetchApp.fetch(PROMPTCANVAS_API_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}`;

    return NextResponse.json({
      success: true,
      syncConfig,
      workbook: {
        trackerTab: trackerItems,
        usersTab: users,
        commentsTab: comments,
        changelogTab: changelog,
      },
      appsScriptCode,
    });
  } catch (error: unknown) {
    console.error('Error in GET /api/changelog/sheet-sync:', error);
    const msg = error instanceof Error ? error.message : 'Failed to fetch Google Sheet sync state.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/changelog/sheet-sync - Executes 2-way Google Sheet diff & reconciliation
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const result = await performTwoWayGoogleSheetSync({
      actorName: body.actorName,
      actorEmail: body.actorEmail,
      sheetEdits: body.sheetEdits,
    });

    return NextResponse.json({
      success: true,
      appliedCount: result.appliedChanges.length,
      appliedChanges: result.appliedChanges,
      syncConfig: result.syncConfig,
      trackerItems: result.trackerItems,
      changelog: result.changelog,
      message:
        result.appliedChanges.length > 0
          ? `2-Way Sync complete: ${result.appliedChanges.length} change(s) pulled from Google Sheet & logged in Changelog!`
          : '2-Way Sync verified: PromptCanvas UI and Google Sheet are 100% in sync.',
    });
  } catch (error: unknown) {
    console.error('Error in POST /api/changelog/sheet-sync:', error);
    const msg = error instanceof Error ? error.message : 'Failed to execute 2-way Google Sheet sync.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
