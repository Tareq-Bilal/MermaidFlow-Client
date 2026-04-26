"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { BASE_URL } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { DocumentResponse } from "@/types/api";

export default function DocumentsPage() {
  const router = useRouter();
  const [docs, setDocs] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const data = await apiFetch<DocumentResponse[]>("/documents");
      setDocs(data);
    } catch (err: unknown) {
      const apiErr = err as { status?: number };
      if (apiErr.status === 401) {
        router.replace("/login");
      } else {
        setError("Failed to load documents.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      const doc = await apiFetch<DocumentResponse>("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: newTitle.trim(),
          content: "",
          isPublic: false,
          tags: [],
        }),
      });
      setDocs((prev) => [doc, ...prev]);
      setNewTitle("");
    } catch {
      setError("Failed to create document.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await apiFetch(`/documents/${id}`, { method: "DELETE" });
      setDocs((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError("Failed to delete document.");
    }
  }

  async function handleExport(id: string, format: "html" | "png" | "svg") {
    const token = getToken();
    const res = await fetch(
      `${BASE_URL}/documents/${id}/export?format=${format}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagram.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) return <p>Loading documents…</p>;

  return (
    <div>
      <h1>My Documents</h1>

      <form
        onSubmit={handleCreate}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}
      >
        <input
          type="text"
          placeholder="New document title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <button type="submit" disabled={creating}>
          {creating ? "Creating…" : "New Document"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {docs.length === 0 ? (
        <p>No documents yet. Create one above.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {docs.map((doc) => (
            <li
              key={doc.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 0",
                borderBottom: "1px solid var(--color-border, #2a2a2a)",
              }}
            >
              <div>
                <strong>{doc.title}</strong>
                <br />
                <small>
                  {new Date(doc.updatedAt).toLocaleDateString()} ·{" "}
                  {doc.isPublic ? "Public" : "Private"}
                </small>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleExport(doc.id, "svg")}>SVG</button>
                <button onClick={() => handleExport(doc.id, "png")}>PNG</button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
