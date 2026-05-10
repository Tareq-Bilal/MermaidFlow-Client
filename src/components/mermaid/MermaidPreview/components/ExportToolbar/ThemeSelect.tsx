import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "./ThemeSelect.module.css";

interface ThemeSelectProps {
  themes: string[];
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  loading?: boolean;
}

export function ThemeSelect({
  themes,
  selectedTheme,
  onThemeChange,
  loading = false,
}: ThemeSelectProps) {
  return (
    <Select
      value={selectedTheme}
      onValueChange={onThemeChange}
      disabled={loading}
    >
      <SelectTrigger
        size="sm"
        className={styles.trigger}
        aria-label="Select diagram theme"
      >
        <SelectValue placeholder={loading ? "Loading…" : "Theme"} />
      </SelectTrigger>
      <SelectContent className={styles.content}>
        {themes.map((theme) => (
          <SelectItem key={theme} value={theme} className={styles.item}>
            {theme}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
