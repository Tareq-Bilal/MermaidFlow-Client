import { Text } from "@/components/shared";
import styles from "./DiagramCanvas.module.css";

interface DiagramCanvasProps {
  svg: string;
  error: string | null;
}

export function DiagramCanvas({ svg, error }: DiagramCanvasProps) {
  if (error) {
    return (
      <div className={styles.canvas}>
        <div className={styles.errorState}>
          <Text variant="caption" color="muted" align="center">
            Diagram error
          </Text>
          <Text variant="small" color="muted" align="center">
            {error}
          </Text>
        </div>
      </div>
    );
  }

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
