import { Container, Text, Flex, Button } from "@/components/shared";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground} />
      <div className={styles.heroPattern} />

      <Container size="lg" className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <Text as="h1" variant="display" className={styles.heroTitle}>
            Visual diagrams.{" "}
            <span className={styles.heroTitleAccent}>Simplified.</span>
          </Text>

          <Text
            variant="bodyLarge"
            color="secondary"
            className={styles.heroSubtitle}
          >
            Create beautiful flowcharts, sequence diagrams, and more with
            Mermaid Flow. The powerful tool that makes technical documentation
            effortless.
          </Text>

          <Flex justify="center" gap="lg" className={styles.heroCtas}>
            <Button href="/download" variant="cta">
              Download Free
            </Button>
            <Button href="/docs" variant="secondary">
              View Documentation
            </Button>
          </Flex>
        </div>
      </Container>
    </section>
  );
}
