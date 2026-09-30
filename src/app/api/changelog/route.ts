import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import {
  getChangelogEntries,
  getGovernanceTrackerItems,
  getGovernanceComments,
  getSuperAdminAllUsers,
  getSheetSyncConfig,
  updateSheetSyncConfig,
  updateGovernanceItemStatus,
  addGovernanceComment,
  addOrUpdateUserWithChangelog,
  resetChangelogBaseline,
} from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'ALL';
    const source = searchParams.get('source') || 'ALL';
    const search = searchParams.get('search') || '';

    const [changelog, trackerItems, comments, rawUsers, syncConfig] = await Promise.all([
      getChangelogEntries({ category, source, search, limit: 250 }),
      getGovernanceTrackerItems(),
      getGovernanceComments(100),
      getSuperAdminAllUsers(),
      getSheetSyncConfig(),
    ]);
    const users = rawUsers.filter((u) => !u.email.endsWith('@promptcanvas.guest'));

    const allLogs = category === 'ALL' && source === 'ALL' && !search
      ? changelog
      : await getChangelogEntries({ limit: 250 });

    const stats = {
      totalChanges: allLogs.length,
      userChanges: allLogs.filter((e) => e.event_category === 'USER_ADDED' || e.event_category === 'USER_ROLE_CHANGED').length,
      commentChanges: allLogs.filter((e) => e.event_category === 'COMMENT_ADDED').length,
      statusChanges: allLogs.filter((e) => e.event_category === 'STATUS_CHANGED').length,
      uiOriginated: allLogs.filter((e) => e.source === 'UI').length,
      sheetOriginated: allLogs.filter((e) => e.source === 'GOOGLE_SHEET').length,
    };

    return NextResponse.json({
      success: true,
      changelog,
      trackerItems,
      comments,
      users,
      syncConfig,
      stats,
    });
  } catch (error: unknown) {
    console.error('Error loading unified changelog:', error);
    const msg = error instanceof Error ? error.message : 'Failed to load changelog.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authUser = await getAuthenticatedUser();
    const body = await request.json();
    const { action } = body;

    if (action === 'RESET_BASELINE') {
      await resetChangelogBaseline();
      return NextResponse.json({ success: true });
    }

    const actorName = body.actorName || authUser?.name || 'Nitin Aggarwal';
    const actorEmail = body.actorEmail || authUser?.email || 'nitin.aggarwal@enterprise-arch.io';
    const actorRole = body.actorRole || authUser?.global_role || 'Super-Admin';
    const source: 'UI' | 'GOOGLE_SHEET' = body.source === 'GOOGLE_SHEET' ? 'GOOGLE_SHEET' : 'UI';

    if (action === 'ADD_USER' || action === 'CHANGE_USER_ROLE') {
      const { name, email, role } = body;
      if (!email || !name) {
        return NextResponse.json({ error: 'User name and email are required.' }, { status: 400 });
      }
      const validRole = ['Super-Admin', 'Author', 'Member'].includes(role) ? role : 'Author';
      const res = await addOrUpdateUserWithChangelog({
        name,
        email,
        role: validRole,
        actorName,
        actorEmail,
        actorRole,
        source,
      });
      return NextResponse.json({
        success: true,
        user: res.user,
        changelogEntry: res.changelog,
      });
    }

    if (action === 'CHANGE_STATUS') {
      const { blueprintCode, newStatus, comment } = body;
      if (!blueprintCode || !newStatus) {
        return NextResponse.json({ error: 'blueprintCode and newStatus are required.' }, { status: 400 });
      }
      const res = await updateGovernanceItemStatus({
        blueprintCode,
        newStatus,
        actorName,
        actorEmail,
        actorRole,
        source,
        comment,
      });
      return NextResponse.json({
        success: true,
        item: res.item,
        changelogEntry: res.changelog,
      });
    }

    if (action === 'ADD_COMMENT') {
      const { targetId, targetName, commentText } = body;
      if (!targetId || !commentText || !commentText.trim()) {
        return NextResponse.json({ error: 'targetId and commentText are required.' }, { status: 400 });
      }
      const res = await addGovernanceComment({
        targetId,
        targetName,
        authorName: actorName,
        authorEmail: actorEmail,
        authorRole: actorRole,
        commentText: commentText.trim(),
        source,
      });
      return NextResponse.json({
        success: true,
        comment: res.comment,
        changelogEntry: res.changelog,
      });
    }

    if (action === 'UPDATE_SHEET_CONFIG') {
      const updated = await updateSheetSyncConfig({
        spreadsheet_id: body.spreadsheet_id,
        spreadsheet_url: body.spreadsheet_url,
        sheet_title: body.sheet_title,
        auto_sync_enabled: body.auto_sync_enabled,
      });
      return NextResponse.json({
        success: true,
        syncConfig: updated,
      });
    }

    return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
  } catch (error: unknown) {
    console.error('Error executing changelog mutation:', error);
    const msg = error instanceof Error ? error.message : 'Failed to execute changelog action.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
