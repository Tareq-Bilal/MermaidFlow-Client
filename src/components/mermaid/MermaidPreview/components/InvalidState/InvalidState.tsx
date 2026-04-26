import { Text } from "@/components/shared";
import styles from "./InvalidState.module.css";

export function InvalidState() {
  return (
    <div className={styles.container}>
      <Text variant="caption" color="accent" align="center" weight="medium">
        Invalid Mermaid code
      </Text>
      <Text variant="small" color="muted" align="center">
        Check your syntax and try again
      </Text>
    </div>
  );
}
