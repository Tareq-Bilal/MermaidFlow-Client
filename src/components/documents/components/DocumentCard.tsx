"use client";

import { useState } from "react";
import { CalendarDays, Lock, Pencil, Trash2, Unlock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DocumentResponse } from "@/types/api";
import styles from "../MyDocumentsPage.module.css";

interface DocumentCardProps {
  document: DocumentResponse;
  updating: boolean;
  deleting: boolean;
  onRename: (id: string, title: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function DocumentCard({
  document,
  updating,
  deleting,
  onRename,
  onDelete,
}: DocumentCardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(document.title);

  async function handleRename(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle || cleanTitle === document.title) {
      setEditing(false);
      setTitle(document.title);
      return;
    }

    await onRename(document.id, cleanTitle);
    setEditing(false);
  }

  async function handleDelete() {
    await onDelete(document.id);
  }

  return (
    <article className={styles.card}>
      <div className={styles.cardMain}>
        {editing ? (
          <form className={styles.renameForm} onSubmit={handleRename}>
            <Input
              className={styles.input}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              aria-label={`Rename ${document.title}`}
              disabled={updating}
              autoFocus
              required
            />
            <Button className={styles.secondaryButton} type="submit" disabled={updating}>
              {updating ? "Saving..." : "Save"}
            </Button>
            <Button
              className={styles.ghostButton}
              onClick={() => {
                setEditing(false);
                setTitle(document.title);
              }}
              disabled={updating}
            >
              Cancel
            </Button>
          </form>
        ) : (
          <h2 className={styles.cardTitle}>{document.title}</h2>
        )}

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <CalendarDays size={14} aria-hidden="true" />
            Updated {formatDate(document.updatedAt)}
          </span>
          <span className={styles.metaItem}>
            {document.isPublic ? (
              <Unlock size={14} aria-hidden="true" />
            ) : (
              <Lock size={14} aria-hidden="true" />
            )}
            {document.isPublic ? "Public" : "Private"}
          </span>
        </div>

        {document.tags.length > 0 && (
          <div className={styles.tags} aria-label="Document tags">
            {document.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          className={styles.iconButton}
          onClick={() => setEditing(true)}
          disabled={editing || deleting}
          aria-label={`Rename ${document.title}`}
          title="Rename"
        >
          <Pencil size={15} aria-hidden="true" />
        </Button>
        <Button
          className={styles.dangerButton}
          onClick={handleDelete}
          disabled={deleting || updating}
          aria-label={`Delete ${document.title}`}
          title="Delete"
        >
          <Trash2 size={15} aria-hidden="true" />
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </article>
  );
}
