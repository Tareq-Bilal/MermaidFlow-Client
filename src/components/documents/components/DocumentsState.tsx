import { Button } from "@/components/ui/button";
import styles from "../MyDocumentsPage.module.css";

interface DocumentsStateProps {
  title: string;
  description: string;
  tone?: "default" | "error";
  actionLabel?: string;
  onAction?: () => void;
}

export function DocumentsState({
  title,
  description,
  tone = "default",
  actionLabel,
  onAction,
}: DocumentsStateProps) {
  return (
    <div className={`${styles.state} ${tone === "error" ? styles.stateError : ""}`}>
      <h2 className={styles.stateTitle}>{title}</h2>
      <p className={styles.stateDescription}>{description}</p>
      {actionLabel && onAction && (
        <Button className={styles.secondaryButton} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
