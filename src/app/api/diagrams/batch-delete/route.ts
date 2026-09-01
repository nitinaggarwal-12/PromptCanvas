import { NextResponse } from "next/server";
import { batchDeleteDiagrams } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";

// POST /api/diagrams/batch-delete - Delete multiple diagrams at once
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: ids must be a non-empty array of diagram IDs" },
        { status: 400 }
      );
    }

    const deletedCount = await batchDeleteDiagrams(ids, user?.id);

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deletedCount} diagram(s)`,
      deletedCount,
      deletedIds: ids
    });
  } catch (error) {
    console.error("Failed to batch delete diagrams:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
