"use client";

import { useState, useEffect, useCallback } from "react";
import { Container, Card } from "@/components/shared";
import { MermaidCodeEditor } from "../MermaidCodeEditor/MermaidCodeEditor";
import { MermaidPreview } from "../MermaidPreview/MermaidPreview";
import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { MermaidValidationResponse, DocumentResponse } from "@/types/api";
import { DEFAULT_MERMAID_CODE } from "@/config/mermaidDefaults";
import styles from "./MermaidEditorSection.module.css";

type SaveState = { message: string | null; saving: boolean };
const IDLE_SAVE: SaveState = { message: null, saving: false };

export function MermaidEditorSection() {
  const [code, setCode] = useState(DEFAULT_MERMAID_CODE);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>(IDLE_SAVE);

  // Debounced validation — only when authenticated
  useEffect(() => {
    if (!getToken() || !code.trim()) {
      setValidationError(null);
      return;
    }
    const id = setTimeout(async () => {
      try {
        const result = await apiFetch<MermaidValidationResponse>(
          "/mermaid/validate",
          { method: "POST", body: JSON.stringify({ code }) },
        );
        setValidationError(
          result.isValid ? null : (result.errorMessage ?? "Invalid syntax"),
        );
      } catch {
        // skip validation errors silently
      }
    }, 600);
    return () => clearTimeout(id);
  }, [code]);

  const handleSave = useCallback(async () => {
    if (!getToken()) return;
    setSaveState({ message: null, saving: true });
    try {
      await apiFetch<DocumentResponse>("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: `Diagram – ${new Date().toLocaleString()}`,
          content: code,
          isPublic: false,
          tags: [],
        }),
      });
      setSaveState({ message: "Saved to your documents.", saving: false });
    } catch {
      setSaveState({ message: "Failed to save.", saving: false });
    }
  }, [code]);

  const isAuthenticated = Boolean(getToken());

  return (
    <section className={styles.section} aria-label="Mermaid diagram editor">
      <Container size="full">
        {/* Status bar */}
        {(validationError || saveState.message || isAuthenticated) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
              minHeight: "1.5rem",
            }}
          >
            <span
              style={{
                color: "var(--color-error, #f87171)",
                fontSize: "0.8rem",
              }}
            >
              {validationError ?? ""}
            </span>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              {saveState.message && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted, #888)",
                  }}
                >
                  {saveState.message}
                </span>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleSave}
                  disabled={saveState.saving}
                  style={{
                    padding: "0.3rem 0.8rem",
                    fontSize: "0.8rem",
                    cursor: saveState.saving ? "default" : "pointer",
                  }}
                >
                  {saveState.saving ? "Saving…" : "Save Document"}
                </button>
              )}
            </div>
          </div>
        )}

        <div className={styles.grid}>
          <Card className={styles.panelCard}>
            <MermaidCodeEditor value={code} onChange={setCode} />
          </Card>
          <Card className={styles.panelCard}>
            <MermaidPreview code={code} />
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default MermaidEditorSection;
