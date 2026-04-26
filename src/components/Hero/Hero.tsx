import { Container, Text, Flex, Button } from "@/components/shared";
import { StarsBackground } from "@/components/ui/stars/stars";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <StarsBackground className={styles.heroStars} />
      <div className={styles.heroPattern} />

      <Container size="lg" className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <Text as="h1" variant="display" className={styles.heroTitle}>
            Design Stunning Mermaid Diagrams Directly from Text
          </Text>

          <Text
            variant="bodyLarge"
            color="secondary"
            className={styles.heroSubtitle}
          >
            Turn your ideas into clear visual diagrams with easy-to-use Mermaid
            syntax. Ideal for documentation, architecture design, and workflow
            mapping.
          </Text>
        </div>
      </Container>
    </section>
  );
}
