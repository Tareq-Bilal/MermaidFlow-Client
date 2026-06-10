"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "../MyDocumentsPage.module.css";

interface DocumentCreateFormProps {
  creating: boolean;
  onCreate: (input: { title: string }) => Promise<void>;
}

export function DocumentCreateForm({
  creating,
  onCreate,
}: DocumentCreateFormProps) {
  const [title, setTitle] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onCreate({ title });
    setTitle("");
  }

  return (
    <form className={styles.createForm} onSubmit={handleSubmit}>
      <Input
        className={styles.input}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="New document title"
        aria-label="New document title"
        disabled={creating}
        required
      />
      <Button
        className={styles.primaryButton}
        type="submit"
        disabled={creating || !title.trim()}
      >
        <Plus size={16} aria-hidden="true" />
        {creating ? "Creating..." : "New Document"}
      </Button>
    </form>
  );
}
