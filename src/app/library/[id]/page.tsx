'use client';

import React, { use } from 'react';
import ArchitectureLibraryPage from '../page';

interface LibraryItemPageProps {
  params: Promise<{ id: string }>;
}

export default function SharedLibraryDiagramPage({ params }: LibraryItemPageProps) {
  const resolved = use(params);
  const decodedId = decodeURIComponent(resolved.id || '');
  return <ArchitectureLibraryPage initialDiagramId={decodedId} />;
}
