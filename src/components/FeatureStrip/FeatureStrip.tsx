import { Container } from "@/components/shared";
import { FeatureCard } from "./FeatureCard/FeatureCard";
import styles from "./FeatureStrip.module.css";

export function FeatureStrip() {
  return (
    <section className={styles.featureStrip} aria-label="Features">
      <Container size="lg">
        <div className={styles.list}>
          <FeatureCard
            icon="eye"
            label="Live Preview"
            description="See your diagrams update instantly as you type code."
            color="blue"
            delay="0s"
          />
          <FeatureCard
            icon="download"
            label="Export SVG/PNG"
            description="Download high-quality images ready for docs or presentations."
            color="green"
            delay="0.15s"
          />
          <FeatureCard
            icon="clipboard"
            label="Copy to Clipboard"
            description="Grab diagram code or rendered output with a single click."
            color="purple"
            delay="0.3s"
          />
          <FeatureCard
            icon="code"
            label="Multiple Types"
            description="Flowcharts, sequence diagrams, Gantt charts, and more."
            color="orange"
            delay="0.45s"
          />
        </div>
      </Container>
    </section>
  );
}

export default FeatureStrip;
