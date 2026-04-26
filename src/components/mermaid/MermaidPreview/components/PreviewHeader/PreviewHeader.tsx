import { Text } from "@/components/shared";
import styles from "./PreviewHeader.module.css";

export function PreviewHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <span className={styles.titleIcon} aria-hidden="true">
          ◎
        </span>
        <Text variant="heading" as="h2">
          Live Preview &amp; Export
        </Text>
      </div>
      <Text variant="caption" color="muted">
        Your diagram will appear here with export options
      </Text>
    </header>
  );
}
