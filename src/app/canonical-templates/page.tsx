'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2 } from 'lucide-react';

export default function CanonicalTemplatesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/canonical');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#070A13] flex flex-col items-center justify-center text-white select-none p-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-extrabold text-white">Opening 50 Canonical Templates</h2>
          <p className="text-xs text-slate-400">Redirecting to the master visual catalog with live diagram previews...</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mt-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading catalog...</span>
        </div>
      </div>
    </div>
  );
}
