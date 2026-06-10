"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { apiFetch, type ApiFetchOptions } from "@/lib/api";
import type { DocumentResponse } from "@/types/api";

interface CreateDocumentInput {
  title: string;
}

interface UpdateDocumentInput {
  title?: string;
  content?: string;
  isPublic?: boolean;
  tags?: string[];
}

interface UseDocumentsResult {
  documents: DocumentResponse[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  updatingId: string | null;
  deletingId: string | null;
  createDocument: (input: CreateDocumentInput) => Promise<void>;
  updateDocument: (id: string, input: UpdateDocumentInput) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  reloadDocuments: () => Promise<void>;
}

function isUnauthorized(error: unknown): boolean {
  return (error as { status?: number }).status === 401;
}

export function useDocuments(): UseDocumentsResult {
  const router = useRouter();
  const { getToken: getClerkToken, isLoaded, isSignedIn } = useAuth();
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleError = useCallback(
    (err: unknown, fallback: string) => {
      if (isUnauthorized(err) && !isSignedIn) {
        router.replace("/login");
        return;
      }
      setError(fallback);
    },
    [isSignedIn, router],
  );

  const withAuth = useCallback(
    async (options: RequestInit = {}): Promise<ApiFetchOptions> => ({
      ...options,
      authToken: isSignedIn ? await getClerkToken() : null,
    }),
    [getClerkToken, isSignedIn],
  );

  const reloadDocuments = useCallback(async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<DocumentResponse[]>(
        "/documents",
        await withAuth(),
      );
      setDocuments(data);
    } catch (err) {
      handleError(err, "Failed to load your documents.");
    } finally {
      setLoading(false);
    }
  }, [handleError, isLoaded, withAuth]);

  useEffect(() => {
    void reloadDocuments();
  }, [reloadDocuments]);

  const createDocument = useCallback(
    async ({ title }: CreateDocumentInput) => {
      const cleanTitle = title.trim();
      if (!cleanTitle) return;

      setCreating(true);
      setError(null);
      try {
        const document = await apiFetch<DocumentResponse>("/documents", {
          ...(await withAuth({
            method: "POST",
            body: JSON.stringify({
              title: cleanTitle,
              content: "",
              isPublic: false,
              tags: [],
            }),
          })),
        });
        setDocuments((current) => [document, ...current]);
      } catch (err) {
        handleError(err, "Failed to create document.");
      } finally {
        setCreating(false);
      }
    },
    [handleError, withAuth],
  );

  const updateDocument = useCallback(
    async (id: string, input: UpdateDocumentInput) => {
      setUpdatingId(id);
      setError(null);
      try {
        const updated = await apiFetch<DocumentResponse>(
          `/documents/${id}`,
          await withAuth({
            method: "PATCH",
            body: JSON.stringify(input),
          }),
        );
        setDocuments((current) =>
          current.map((document) => (document.id === id ? updated : document)),
        );
      } catch (err) {
        handleError(err, "Failed to update document.");
      } finally {
        setUpdatingId(null);
      }
    },
    [handleError, withAuth],
  );

  const deleteDocument = useCallback(
    async (id: string) => {
      setDeletingId(id);
      setError(null);
      try {
        await apiFetch(`/documents/${id}`, await withAuth({ method: "DELETE" }));
        setDocuments((current) =>
          current.filter((document) => document.id !== id),
        );
      } catch (err) {
        handleError(err, "Failed to delete document.");
      } finally {
        setDeletingId(null);
      }
    },
    [handleError, withAuth],
  );

  return {
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
  };
}
