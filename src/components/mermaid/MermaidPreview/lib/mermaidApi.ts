import { BASE_URL } from "@/lib/api";
import { getToken } from "@/lib/auth";

function buildAuthHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function renderViaApi(code: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/mermaid/render`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(),
    },
    body: JSON.stringify({ code, theme: "dark" }),
  });
  if (!res.ok) throw new Error("Render failed");
  return res.text();
}

export async function exportViaApi(
  code: string,
  format: "svg" | "png",
): Promise<void> {
  const res = await fetch(`${BASE_URL}/mermaid/export`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(),
    },
    body: JSON.stringify({ code, theme: "dark", format }),
  });
  if (!res.ok) throw new Error("Export failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `diagram.${format}`;
  a.click();
  URL.revokeObjectURL(url);
}
