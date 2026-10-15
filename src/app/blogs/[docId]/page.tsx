'use client';

import React, { Suspense, use } from 'react';
import { TechnicalBlogStudioContent } from '../page';

export default function CanonicalBlogDocumentPermalinkPage({
  params,
}: {
  params: Promise<{ docId: string }>;
}) {
  const resolvedParams = use(params);
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070B14] text-slate-500 text-sm">
          Loading Google Cloud Documentation Guide ({resolvedParams.docId})...
        </div>
      }
    >
      <TechnicalBlogStudioContent initialDocId={resolvedParams.docId} />
    </Suspense>
  );
}
