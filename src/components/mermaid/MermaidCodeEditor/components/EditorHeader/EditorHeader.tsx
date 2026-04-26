import { Text } from "@/components/shared";
import styles from "./EditorHeader.module.css";

export function EditorHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <span className={styles.titleIcon} aria-hidden="true">
          {"<>"}
        </span>
        <Text variant="heading" as="h2">
          Mermaid Code Editor
        </Text>
      </div>
      <Text variant="caption" color="muted">
        Choose a template or write your own Mermaid syntax
      </Text>
    </header>
  );
}
