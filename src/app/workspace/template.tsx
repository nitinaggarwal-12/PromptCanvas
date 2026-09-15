import type { ReactNode } from 'react';
import PreserveDiagramDeepLink from './PreserveDiagramDeepLink';

export default function WorkspaceTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <PreserveDiagramDeepLink />
      {children}
    </>
  );
}
