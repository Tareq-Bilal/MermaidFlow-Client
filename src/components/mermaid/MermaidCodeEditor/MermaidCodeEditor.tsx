"use client";

import { useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useEditorTab } from "./hooks/useEditorTab";
import { EditorHeader } from "./components/EditorHeader/EditorHeader";
import { EditorTabBar } from "./components/EditorTabBar/EditorTabBar";
import { EditorTip } from "./components/EditorTip/EditorTip";
import { CodeViewer } from "./components/CodeViewer/CodeViewer";
import styles from "./MermaidCodeEditor.module.css";

interface MermaidCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MermaidCodeEditor({ value, onChange }: MermaidCodeEditorProps) {
  const { activeTab, setActiveTab } = useEditorTab();

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
    [onChange],
  );

  return (
    <div className={styles.panel}>
      <EditorHeader />
      <EditorTabBar activeTab={activeTab} onChange={setActiveTab} />
      <Textarea
        className={styles.editor}
        value={value}
        onChange={handleTextChange}
        spellCheck={false}
        aria-label="Mermaid diagram code input"
        placeholder="Enter your Mermaid diagram code here..."
        aria-multiline="true"
      />
      <EditorTip />
      <CodeViewer value={value} />
    </div>
  );
}

export default MermaidCodeEditor;
