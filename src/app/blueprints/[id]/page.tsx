"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import { getBlueprintMetadataById } from "@/lib/blueprintKnowledgeMatrix";

interface BlueprintPageProps {
  params: Promise<{ id: string }>;
}

export default function BlueprintDeepLinkPage({ params }: BlueprintPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const rawId = resolvedParams.id;
  const meta = getBlueprintMetadataById(rawId);
  const targetId = meta ? meta.combinedId : rawId;

  useEffect(() => {
    if (targetId) {
      router.replace(`/workspace?tab=templates&blueprint=${encodeURIComponent(targetId)}`);
    } else {
      router.replace("/workspace?tab=templates");
    }
  }, [router, targetId]);

  return (
    <div className="min-h-screen bg-[#070A13] flex flex-col items-center justify-center text-white select-none p-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-extrabold text-white">
            {meta ? meta.diagramName : "Opening Architectural Blueprint"}
          </h2>
          <p className="text-xs text-slate-400">
            {meta
              ? `Loading ${meta.combinedId.split("_")[0]} into the interactive canvas studio...`
              : "Redirecting to blueprint studio..."}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-teal-400 font-mono mt-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading blueprint...</span>
        </div>
      </div>
    </div>
  );
}
