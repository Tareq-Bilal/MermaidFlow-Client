import { useState } from "react";

export type EditorTab = "ai" | "custom";

export interface UseEditorTabResult {
  activeTab: EditorTab;
  setActiveTab: (tab: EditorTab) => void;
}

export function useEditorTab(
  initial: EditorTab = "custom",
): UseEditorTabResult {
  const [activeTab, setActiveTab] = useState<EditorTab>(initial);
  return { activeTab, setActiveTab };
}
