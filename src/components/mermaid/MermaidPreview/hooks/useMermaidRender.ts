import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { getToken } from "@/lib/auth";
import { initMermaid } from "../lib/mermaidInit";
import { renderViaApi } from "../lib/mermaidApi";

const RENDER_DEBOUNCE_MS = 300;

export interface UseMermaidRenderResult {
  svg: string;
  error: string | null;
}

export function useMermaidRender(code: string): UseMermaidRenderResult {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const renderCountRef = useRef(0);

  useEffect(() => {
    initMermaid();
  }, []);

  useEffect(() => {
    if (!code.trim()) {
      setSvg("");
      setError(null);
      return;
    }

    const timerId = setTimeout(async () => {
      const currentRender = ++renderCountRef.current;

      if (getToken()) {
        try {
          const renderedSvg = await renderViaApi(code);
          if (currentRender === renderCountRef.current) {
            setSvg(renderedSvg);
            setError(null);
          }
        } catch {
          if (currentRender === renderCountRef.current) {
            setError("Failed to render diagram.");
            setSvg("");
          }
        }
      } else {
        const diagramId = `mermaid-${currentRender}-${Date.now()}`;
        try {
          // Parse first — prevents mermaid from injecting its error SVG into the DOM
          await mermaid.parse(code);
          const { svg: renderedSvg } = await mermaid.render(diagramId, code);
          if (currentRender === renderCountRef.current) {
            setSvg(renderedSvg);
            setError(null);
          }
        } catch {
          if (currentRender === renderCountRef.current) {
            setSvg("");
            setError("invalid");
          }
        }
      }
    }, RENDER_DEBOUNCE_MS);

    return () => clearTimeout(timerId);
  }, [code]);

  return { svg, error };
}
