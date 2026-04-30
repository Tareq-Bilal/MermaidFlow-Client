"use client";

import { Icon, Text, Card } from "@/components/shared";
import { EyeIcon, DownloadIcon, ClipboardIcon, CodeIcon } from "@/assets/icons";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import styles from "./FeatureCard.module.css";

export type FeatureCardColor = "blue" | "green" | "purple" | "orange";
export type FeatureCardIcon = "eye" | "download" | "clipboard" | "code";

const colorClassMap: Record<FeatureCardColor, string> = {
  blue: styles.iconBlue,
  green: styles.iconGreen,
  purple: styles.iconPurple,
  orange: styles.iconOrange,
};

const iconMap = {
  eye: EyeIcon,
  download: DownloadIcon,
  clipboard: ClipboardIcon,
  code: CodeIcon,
} as const;

export interface FeatureCardProps {
  icon: FeatureCardIcon;
  label: string;
  description: string;
  color: FeatureCardColor;
  delay?: string;
}

export function FeatureCard({
  icon,
  label,
  description,
  color,
  delay = "0s",
}: FeatureCardProps) {
  const { ref, visible } = useScrollReveal();
  const IconComponent = iconMap[icon];

  return (
    <div
      ref={ref}
      className={`${styles.cardWrapper} ${visible ? styles.cardVisible : ""}`}
      style={{ animationDelay: delay }}
    >
      <Card variant="feature" className={styles.card}>
        <span className={`${styles.iconWrap} ${colorClassMap[color]}`}>
          <Icon icon={IconComponent} size={56} />
        </span>
        <Text
          variant="body"
          color="primary"
          align="center"
          weight="medium"
          as="span"
          className={styles.label}
        >
          {label}
        </Text>
        <Text
          variant="caption"
          color="muted"
          align="center"
          as="span"
          className={styles.description}
        >
          {description}
        </Text>
      </Card>
    </div>
  );
}

export default FeatureCard;
