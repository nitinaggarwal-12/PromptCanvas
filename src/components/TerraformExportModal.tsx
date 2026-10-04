'use client';

import React from 'react';
import TerraformIaCModal from './TerraformIaCModal';

interface TerraformExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagramName?: string;
  diagramId?: string;
  xmlContent?: string;
  architectureType?: string;
}

/**
 * Unified compatibility wrapper forwarding to TerraformIaCModal
 * so all routes share a single authoritative Terraform HCL & K8s exporter.
 */
export function TerraformExportModal({
  isOpen,
  onClose,
  diagramName = 'Enterprise Cloud Architecture',
  diagramId,
  xmlContent,
  architectureType = 'enterprise',
}: TerraformExportModalProps) {
  return (
    <TerraformIaCModal
      isOpen={isOpen}
      onClose={onClose}
      projectTitle={diagramName}
      projectScope={architectureType}
      domain={architectureType}
      isLight={false}
      xmlContent={xmlContent}
      diagramId={diagramId}
    />
  );
}

export default TerraformExportModal;
