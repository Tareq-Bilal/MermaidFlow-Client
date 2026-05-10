import { useCallback } from "react";
import { toast } from "sonner";

// ─── Utilities ───────────────────────────────────────────────────────────────

function getSvgDimensions(svgEl: Element): { width: number; height: number } {
  const rawW = svgEl.getAttribute("width") ?? "";
  const rawH = svgEl.getAttribute("height") ?? "";
  const isRelative = (v: string) => !v || v.includes("%");

  if (!isRelative(rawW) && !isRelative(rawH)) {
    return { width: parseFloat(rawW), height: parseFloat(rawH) };
  }

  const parts =
    svgEl
      .getAttribute("viewBox")
      ?.trim()
      .split(/[\s,]+/) ?? [];
  return {
    width: parseFloat(parts[2]) || 800,
    height: parseFloat(parts[3]) || 600,
  };
}

function svgToPngBlob(svg: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
    const svgEl = doc.documentElement;
    const { width, height } = getSvgDimensions(svgEl);

    svgEl.setAttribute("width", String(width));
    svgEl.setAttribute("height", String(height));

    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      new XMLSerializer().serializeToString(svgEl),
    )}`;

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Failed to create PNG blob")),
        "image/png",
      );
    };

    img.onerror = () => reject(new Error("Failed to render SVG"));
    img.src = dataUrl;
  });
}

function triggerDownload(url: string, filename: string): void {
  Object.assign(document.createElement("a"), {
    href: url,
    download: filename,
  }).click();
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseMermaidExportResult {
  handleExportSvg: () => Promise<void>;
  handleExportPng: () => Promise<void>;
  handleCopySvg: () => Promise<void>;
  handleCopyPng: () => Promise<void>;
}

export function useMermaidExport(svg: string): UseMermaidExportResult {
  const handleExportSvg = useCallback(async () => {
    try {
      const url = URL.createObjectURL(
        new Blob([svg], { type: "image/svg+xml" }),
      );
      triggerDownload(url, "diagram.svg");
      URL.revokeObjectURL(url);
      toast.success("SVG exported");
    } catch {
      toast.error("Failed to export SVG");
    }
  }, [svg]);

  const handleExportPng = useCallback(async () => {
    try {
      const blob = await svgToPngBlob(svg);
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "diagram.png");
      URL.revokeObjectURL(url);
      toast.success("PNG exported");
    } catch {
      toast.error("Failed to export PNG");
    }
  }, [svg]);

  const handleCopySvg = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(svg);
      toast.success("SVG copied to clipboard");
    } catch {
      toast.error("Failed to copy SVG");
    }
  }, [svg]);

  const handleCopyPng = useCallback(async () => {
    try {
      const blob = await svgToPngBlob(svg);
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.success("PNG copied to clipboard");
    } catch {
      toast.error("Failed to copy PNG");
    }
  }, [svg]);

  return { handleExportSvg, handleExportPng, handleCopySvg, handleCopyPng };
}
