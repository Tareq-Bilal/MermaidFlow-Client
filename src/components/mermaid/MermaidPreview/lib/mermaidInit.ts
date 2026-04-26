import mermaid from "mermaid";

let mermaidReady = false;

export function initMermaid(): void {
  if (mermaidReady) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    darkMode: true,
    fontFamily: "Inter, system-ui, sans-serif",
    flowchart: { curve: "basis" },
  });
  mermaidReady = true;
}
