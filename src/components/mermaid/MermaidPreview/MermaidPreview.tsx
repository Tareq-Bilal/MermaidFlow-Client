"use client";

import { useMermaidRender } from "@/lib/hooks/useMermaidRender";
import { useMermaidExport } from "@/lib/hooks/useMermaidExport";
import { PreviewHeader } from "./components/PreviewHeader/PreviewHeader";
import { ExportToolbar } from "./components/ExportToolbar/ExportToolbar";
import { DiagramCanvas } from "./components/DiagramCanvas/DiagramCanvas";
import styles from "./MermaidPreview.module.css";

interface MermaidPreviewProps {
  code: string;
}

export function MermaidPreview({ code }: MermaidPreviewProps) {
  const { svg, error } = useMermaidRender(code);
  const { handleExportSvg, handleExportPng, handleCopySvg, handleCopyPng } =
    useMermaidExport(code, svg);

  return (
    <div className={styles.panel}>
      <PreviewHeader />
      <ExportToolbar
        disabled={!svg}
        onExportSvg={handleExportSvg}
        onExportPng={handleExportPng}
        onCopySvg={handleCopySvg}
        onCopyPng={handleCopyPng}
      />
      <DiagramCanvas svg={svg} invalid={Boolean(error)} />
    </div>
  );
}

export default MermaidPreview;
