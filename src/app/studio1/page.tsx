'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function Studio1RedirectInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const target = query ? `/studio?${query}` : '/studio';
    router.replace(target);
  }, [router, searchParams]);

  return null;
}

export default function Studio1ObsoleteRedirectPage() {
  return (
    <Suspense fallback={null}>
      <Studio1RedirectInner />
    </Suspense>
  );
}
