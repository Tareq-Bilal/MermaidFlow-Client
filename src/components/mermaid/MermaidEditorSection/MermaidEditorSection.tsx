"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Container, Card } from "@/components/shared";
import { MermaidCodeEditor } from "../MermaidCodeEditor/MermaidCodeEditor";
import { MermaidPreview } from "../MermaidPreview/MermaidPreview";
import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { MermaidValidationResponse, DocumentResponse } from "@/types/api";
import { DEFAULT_MERMAID_CODE } from "@/config/mermaidDefaults";
import styles from "./MermaidEditorSection.module.css";

export function MermaidEditorSection() {
  const [code, setCode] = useState(DEFAULT_MERMAID_CODE);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced validation — only when authenticated
  useEffect(() => {
    if (!getToken() || !code.trim()) {
      setValidationError(null);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
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
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [code]);

  const handleSave = useCallback(async () => {
    if (!getToken()) return;
    setSaving(true);
    setSaveStatus(null);
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
      setSaveStatus("Saved to your documents.");
    } catch {
      setSaveStatus("Failed to save.");
    } finally {
      setSaving(false);
    }
  }, [code]);

  const isAuthenticated = Boolean(getToken());

  return (
    <section className={styles.section} aria-label="Mermaid diagram editor">
      <Container size="lg">
        {/* Status bar */}
        {(validationError || saveStatus || isAuthenticated) && (
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
              {saveStatus && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted, #888)",
                  }}
                >
                  {saveStatus}
                </span>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: "0.3rem 0.8rem",
                    fontSize: "0.8rem",
                    cursor: saving ? "default" : "pointer",
                  }}
                >
                  {saving ? "Saving…" : "Save Document"}
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
