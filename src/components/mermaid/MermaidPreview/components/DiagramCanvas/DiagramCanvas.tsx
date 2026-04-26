import { Text } from "@/components/shared";
import { InvalidState } from "../InvalidState/InvalidState";
import styles from "./DiagramCanvas.module.css";

interface DiagramCanvasProps {
  svg: string;
  invalid?: boolean;
}

export function DiagramCanvas({ svg, invalid }: DiagramCanvasProps) {
  if (svg) {
    return (
      <div className={styles.canvas}>
        {/* SVG is mermaid-generated — safe to render directly */}
        <div
          className={styles.svgWrapper}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    );
  }

  if (invalid) {
    return (
      <div className={`${styles.canvas} ${styles.canvasInvalid}`}>
        <InvalidState />
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      <div className={styles.emptyState}>
        <Text variant="caption" color="muted" align="center">
          Start typing to see your diagram
        </Text>
      </div>
    </div>
  );
}
