'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminFeedbackInboxPage } from '@/components/UniversalFeedbackSystem';

export default function PromptCanvasAdminFeedbackPage() {
  const router = useRouter();
  return (
    <AdminFeedbackInboxPage
      appId="promptcanvas"
      appName="PromptCanvas"
      onBackToApp={() => router.push('/')}
    />
  );
}
