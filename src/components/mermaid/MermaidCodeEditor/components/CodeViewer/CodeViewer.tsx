import { useMemo, memo } from "react";
import { Text } from "@/components/shared";
import styles from "./CodeViewer.module.css";

interface CodeViewerProps {
  value: string;
}

export const CodeViewer = memo(function CodeViewer({ value }: CodeViewerProps) {
  const { lineCount, charCount } = useMemo(
    () => ({
      lineCount: value ? value.split("\n").length : 0,
      charCount: value.length,
    }),
    [value],
  );

  return (
    <div className={styles.currentCode}>
      <Text variant="caption" color="secondary" weight="medium" as="p">
        Current Code:
      </Text>
      <div className={styles.codeViewer}>
        <pre className={styles.codeContent}>{value}</pre>
        <div className={styles.statusBar} aria-label="Editor statistics">
          <span className={styles.statusItem}>Lines: {lineCount}</span>
          <span className={styles.statusItem}>Characters: {charCount}</span>
        </div>
      </div>
    </div>
  );
});
