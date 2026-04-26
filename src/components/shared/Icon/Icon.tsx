import { ComponentType, SVGProps } from "react";
import styles from "./Icon.module.css";

export interface IconProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: number | string;
  className?: string;
}

export function Icon({
  icon: IconComponent,
  size = 48,
  className = "",
}: IconProps) {
  return (
    <span
      className={`${styles.icon} ${className}`}
      style={{ width: size, height: size }}
    >
      <IconComponent />
    </span>
  );
}

export default Icon;
