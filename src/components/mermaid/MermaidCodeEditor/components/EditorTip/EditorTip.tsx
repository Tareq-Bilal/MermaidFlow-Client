import styles from "./EditorTip.module.css";

export function EditorTip() {
  return (
    <p className={styles.tip}>
      <span className={styles.tipBulb} aria-hidden="true">
        💡
      </span>
      <span className={styles.tipText}>
        Tip: Visit{" "}
        <a
          href="https://mermaid.js.org/intro/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.tipLink}
        >
          Mermaid documentation
        </a>{" "}
        for syntax reference
      </span>
    </p>
  );
}
