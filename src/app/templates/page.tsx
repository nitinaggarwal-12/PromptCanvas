"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";

export default function TemplatesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/workspace?tab=templates");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#070A13] flex flex-col items-center justify-center text-white select-none p-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-extrabold text-white">Opening Architectural Blueprint Library</h2>
          <p className="text-xs text-slate-400">Redirecting to the unified interactive studio with all 50 enterprise blueprints...</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-teal-400 font-mono mt-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading canvas studio...</span>
        </div>
      </div>
    </div>
  );
}
