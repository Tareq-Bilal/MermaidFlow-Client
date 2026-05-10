import mermaid from "mermaid";

let initializedTheme: string | null = null;

export function initMermaid(theme = "dark"): void {
  if (initializedTheme === theme) return;
  mermaid.initialize({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theme: theme as any,
    startOnLoad: false,
    darkMode: theme === "dark" || theme.toLowerCase().includes("dark"),
    fontFamily: "Inter, system-ui, sans-serif",
    flowchart: { curve: "basis" },
  });
  initializedTheme = theme;
}
