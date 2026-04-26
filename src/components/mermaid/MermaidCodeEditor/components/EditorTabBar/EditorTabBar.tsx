import { memo } from "react";
import type { EditorTab } from "../../hooks/useEditorTab";
import styles from "./EditorTabBar.module.css";

interface EditorTabBarProps {
  activeTab: EditorTab;
  onChange: (tab: EditorTab) => void;
}

export const EditorTabBar = memo(function EditorTabBar({
  activeTab,
  onChange,
}: EditorTabBarProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Editor mode">
      <button
        role="tab"
        aria-selected={activeTab === "ai"}
        className={`${styles.tab} ${activeTab === "ai" ? styles.tabActive : ""}`}
        onClick={() => onChange("ai")}
      >
        <span className={styles.tabStar} aria-hidden="true">
          ✦
        </span>
        AI Diagram
      </button>
      <button
        role="tab"
        aria-selected={activeTab === "custom"}
        className={`${styles.tab} ${activeTab === "custom" ? styles.tabActive : ""}`}
        onClick={() => onChange("custom")}
      >
        Custom Code
      </button>
    </div>
  );
});
