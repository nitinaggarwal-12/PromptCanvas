import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import {
  getChangelogEntries,
  getGovernanceTrackerItems,
  getGovernanceComments,
  getSuperAdminAllUsers,
  updateGovernanceItemStatus,
  addGovernanceComment,
  addOrUpdateUserWithChangelog,
  resetChangelogBaseline,
} from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const category = searchParams.get('category') || 'ALL';
    const source = searchParams.get('source') || 'ALL';
    const search = searchParams.get('search') || '';

    const [changelog, trackerItems, comments, rawUsers] = await Promise.all([
      getChangelogEntries({ category, source, search, limit: 250 }),
      getGovernanceTrackerItems(),
      getGovernanceComments(100),
      getSuperAdminAllUsers(),
    ]);
    const users = rawUsers.filter((u) => !u.email.endsWith('@promptcanvas.guest'));

    if (format === 'csv') {
      const headers = [
        'Timestamp',
        'Category',
        'Actor Name',
        'Actor Email',
        'Role',
        'Entity Type',
        'Target Entity',
        'Field Changed',
        'Before (Old Value)',
        'After (New Value)',
        'Origin Source',
        'Audit Summary',
      ];
      const escapeCsv = (val: unknown) => `"${String(val ?? '').replace(/"/g, '""')}"`;
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
          c.summary,
        ]
          .map(escapeCsv)
          .join(',')
      );
      const csvContent = [headers.map(escapeCsv).join(','), ...rows].join('\n');
      return new Response(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="PromptCanvas_Governance_Changelog.csv"',
        },
      });
    }

    const allLogs =
      category === 'ALL' && source === 'ALL' && !search
        ? changelog
        : await getChangelogEntries({ limit: 250 });

    const stats = {
      totalChanges: allLogs.length,
      userChanges: allLogs.filter(
        (e) => e.event_category === 'USER_ADDED' || e.event_category === 'USER_ROLE_CHANGED'
      ).length,
      commentChanges: allLogs.filter((e) => e.event_category === 'COMMENT_ADDED').length,
      statusChanges: allLogs.filter((e) => e.event_category === 'STATUS_CHANGED').length,
      uiOriginated: allLogs.filter((e) => e.source === 'UI').length,
    };

    return NextResponse.json({
      success: true,
      changelog,
      trackerItems,
      comments,
      users,
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

    const actorName = body.actorName || authUser?.name || 'Cloud Architecture Review Board';
    const actorEmail = body.actorEmail || authUser?.email || 'architecture-governance@cloud-review.internal';
    const actorRole = body.actorRole || authUser?.global_role || 'Super-Admin';

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
        source: 'UI',
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
        source: 'UI',
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
        source: 'UI',
      });
      return NextResponse.json({
        success: true,
        comment: res.comment,
        changelogEntry: res.changelog,
      });
    }

    return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
  } catch (error: unknown) {
    console.error('Error executing changelog mutation:', error);
    const msg = error instanceof Error ? error.message : 'Failed to execute changelog action.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
