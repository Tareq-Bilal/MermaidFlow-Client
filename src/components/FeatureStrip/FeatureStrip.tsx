import { Container, Icon } from "@/components/shared";
import { EyeIcon, DownloadIcon, ClipboardIcon, CodeIcon } from "./icons";
import styles from "./FeatureStrip.module.css";

const features = [
  {
    id: "live-preview",
    label: "Live Preview",
    colorClass: styles.iconBlue,
    Icon: EyeIcon,
  },
  {
    id: "export",
    label: "Export SVG/PNG",
    colorClass: styles.iconGreen,
    Icon: DownloadIcon,
  },
  {
    id: "clipboard",
    label: "Copy to Clipboard",
    colorClass: styles.iconPurple,
    Icon: ClipboardIcon,
  },
  {
    id: "types",
    label: "Multiple Types",
    colorClass: styles.iconOrange,
    Icon: CodeIcon,
  },
];

export function FeatureStrip() {
  return (
    <section className={styles.featureStrip} aria-label="Features">
      <Container size="lg">
        <ul className={styles.list}>
          {features.map(({ id, label, Icon: IconComponent, colorClass }) => (
            <li key={id} className={styles.item}>
              <span className={`${styles.iconWrap} ${colorClass}`}>
                <Icon icon={IconComponent} />
              </span>
              <span className={styles.label}>{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default FeatureStrip;
