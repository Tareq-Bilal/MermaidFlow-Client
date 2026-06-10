"use client";

import { FileText } from "lucide-react";

import { Container } from "@/components/shared";
import { useDocuments } from "./hooks/useDocuments";
import { DocumentCreateForm } from "./components/DocumentCreateForm";
import { DocumentList } from "./components/DocumentList";
import { DocumentsState } from "./components/DocumentsState";
import styles from "./MyDocumentsPage.module.css";

export function MyDocumentsPage() {
  const {
    documents,
    loading,
    error,
    creating,
    updatingId,
    deletingId,
    createDocument,
    updateDocument,
    deleteDocument,
    reloadDocuments,
  } = useDocuments();

  const hasDocuments = documents.length > 0;

  return (
    <section className={styles.page} aria-labelledby="documents-title">
      <Container size="lg" className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.iconWrap} aria-hidden="true">
              <FileText size={22} />
            </span>
            <div>
              <p className={styles.eyebrow}>Workspace</p>
              <h1 id="documents-title" className={styles.title}>
                My Documents
              </h1>
            </div>
          </div>
          <p className={styles.description}>
            Review, create, rename, and remove saved Mermaid documents.
          </p>
        </header>

        <DocumentCreateForm onCreate={createDocument} creating={creating} />

        {error && (
          <DocumentsState
            tone="error"
            title="Something went wrong"
            description={error}
            actionLabel="Try again"
            onAction={reloadDocuments}
          />
        )}

        {loading ? (
          <DocumentsState
            title="Loading documents"
            description="Fetching your saved diagrams..."
          />
        ) : hasDocuments ? (
          <DocumentList
            documents={documents}
            updatingId={updatingId}
            deletingId={deletingId}
            onRename={(id, title) => updateDocument(id, { title })}
            onDelete={deleteDocument}
          />
        ) : !error ? (
          <DocumentsState
            title="No documents yet"
            description="Create your first saved diagram from this page or the editor."
          />
        ) : null}
      </Container>
    </section>
  );
}

export default MyDocumentsPage;
