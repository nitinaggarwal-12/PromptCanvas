"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import { getBlueprintMetadataById } from "@/lib/blueprintKnowledgeMatrix";

function BlueprintsRedirectInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const bp = searchParams.get("blueprint") || searchParams.get("id") || searchParams.get("template") || searchParams.get("arch");
    if (bp) {
      const meta = getBlueprintMetadataById(bp);
      const targetId = meta ? meta.combinedId : bp;
      router.replace(`/workspace?tab=templates&blueprint=${encodeURIComponent(targetId)}`);
    } else {
      router.replace("/workspace?tab=templates");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#070A13] flex flex-col items-center justify-center text-white select-none p-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-extrabold text-white">Opening Architecture Blueprints</h2>
          <p className="text-xs text-slate-400">Redirecting to the master blueprint catalog with all 60 enterprise designs...</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-teal-400 font-mono mt-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading studio...</span>
        </div>
      </div>
    </div>
  );
}

export default function BlueprintsPage() {
  return (
    <Suspense fallback={null}>
      <BlueprintsRedirectInner />
    </Suspense>
  );
}
