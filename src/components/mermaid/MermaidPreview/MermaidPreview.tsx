"use client";

import { useState } from "react";
import { useMermaidRender } from "@/lib/hooks/useMermaidRender";
import { useMermaidExport } from "@/lib/hooks/useMermaidExport";
import { useThemes } from "@/lib/hooks/useThemes";
import { PreviewHeader } from "./components/PreviewHeader/PreviewHeader";
import { ExportToolbar } from "./components/ExportToolbar/ExportToolbar";
import { DiagramCanvas } from "./components/DiagramCanvas/DiagramCanvas";
import styles from "./MermaidPreview.module.css";

interface MermaidPreviewProps {
  code: string;
}

export function MermaidPreview({ code }: MermaidPreviewProps) {
  const { themes, loading: themesLoading } = useThemes();
  const [selectedTheme, setSelectedTheme] = useState("dark");

  const { svg, error } = useMermaidRender(code, selectedTheme);
  const { handleExportSvg, handleExportPng, handleCopySvg, handleCopyPng } =
    useMermaidExport(svg);

  return (
    <div className={styles.panel}>
      <PreviewHeader />
      <ExportToolbar
        disabled={!svg}
        onExportSvg={handleExportSvg}
        onExportPng={handleExportPng}
        onCopySvg={handleCopySvg}
        onCopyPng={handleCopyPng}
        themes={themes}
        selectedTheme={selectedTheme}
        onThemeChange={setSelectedTheme}
        themesLoading={themesLoading}
      />
      <DiagramCanvas svg={svg} invalid={Boolean(error)} />
    </div>
  );
}

export default MermaidPreview;
