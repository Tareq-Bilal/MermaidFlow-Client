import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { getToken } from "@/lib/auth";
import { initMermaid } from "@/components/mermaid/MermaidPreview/lib/mermaidInit";
import { renderViaApi } from "@/components/mermaid/MermaidPreview/lib/mermaidApi";

const RENDER_DEBOUNCE_MS = 300;

type RenderState = { svg: string; error: string | null };
const EMPTY: RenderState = { svg: "", error: null };

export interface UseMermaidRenderResult {
  svg: string;
  error: string | null;
}

export function useMermaidRender(
  code: string,
  theme = "dark",
): UseMermaidRenderResult {
  const [state, setState] = useState<RenderState>(EMPTY);
  const seq = useRef(0);

  useEffect(() => {
    initMermaid(theme);

    if (!code.trim()) {
      setState(EMPTY);
      return;
    }

    const id = setTimeout(async () => {
      const n = ++seq.current;

      if (getToken()) {
        try {
          const svg = await renderViaApi(code, theme);
          if (n === seq.current) setState({ svg, error: null });
        } catch {
          if (n === seq.current)
            setState({ svg: "", error: "Failed to render diagram." });
        }
      } else {
        try {
          await mermaid.parse(code); // prevents mermaid injecting error SVG into DOM
          const { svg } = await mermaid.render(`mermaid-${n}`, code);
          if (n === seq.current) setState({ svg, error: null });
        } catch {
          if (n === seq.current) setState({ svg: "", error: "invalid" });
        }
      }
    }, RENDER_DEBOUNCE_MS);

    return () => clearTimeout(id);
  }, [code, theme]);

  return state;
}
