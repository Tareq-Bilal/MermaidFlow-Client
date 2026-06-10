import type { DocumentResponse } from "@/types/api";
import { DocumentCard } from "./DocumentCard";
import styles from "../MyDocumentsPage.module.css";

interface DocumentListProps {
  documents: DocumentResponse[];
  updatingId: string | null;
  deletingId: string | null;
  onRename: (id: string, title: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function DocumentList({
  documents,
  updatingId,
  deletingId,
  onRename,
  onDelete,
}: DocumentListProps) {
  return (
    <div className={styles.list} aria-label="Saved documents">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          updating={updatingId === document.id}
          deleting={deletingId === document.id}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
