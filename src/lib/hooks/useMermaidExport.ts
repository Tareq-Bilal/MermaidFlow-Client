import { useCallback } from "react";
import { getToken } from "@/lib/auth";
import { exportViaApi } from "@/components/mermaid/MermaidPreview/lib/mermaidApi";

function svgToCanvas(svg: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 600;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG as image"));
    };

    img.src = url;
  });
}

function triggerDownload(url: string, filename: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

export interface UseMermaidExportResult {
  handleExportSvg: () => Promise<void>;
  handleExportPng: () => Promise<void>;
  handleCopySvg: () => Promise<void>;
  handleCopyPng: () => Promise<void>;
}

export function useMermaidExport(
  code: string,
  svg: string,
): UseMermaidExportResult {
  const handleExportSvg = useCallback(async () => {
    if (getToken()) {
      await exportViaApi(code, "svg");
      return;
    }
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "diagram.svg");
    URL.revokeObjectURL(url);
  }, [code, svg]);

  const handleCopySvg = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(svg);
    } catch {
      // Clipboard API may be unavailable in some contexts
    }
  }, [svg]);

  const handleExportPng = useCallback(async () => {
    if (getToken()) {
      await exportViaApi(code, "png");
      return;
    }
    const canvas = await svgToCanvas(svg);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "diagram.png");
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [code, svg]);

  const handleCopyPng = useCallback(async () => {
    try {
      const canvas = await svgToCanvas(svg);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
      }, "image/png");
    } catch {
      // Clipboard API may be unavailable in some contexts
    }
  }, [svg]);

  return { handleExportSvg, handleExportPng, handleCopySvg, handleCopyPng };
}
