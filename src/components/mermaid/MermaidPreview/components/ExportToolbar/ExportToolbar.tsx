import { useMemo } from "react";
import { FileDown, Camera, Copy, ImageDown } from "lucide-react";
import styles from "./ExportToolbar.module.css";

interface ExportAction {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface ExportToolbarProps {
  disabled: boolean;
  onExportSvg: () => void;
  onExportPng: () => void;
  onCopySvg: () => void;
  onCopyPng: () => void;
}

export function ExportToolbar({
  disabled,
  onExportSvg,
  onExportPng,
  onCopySvg,
  onCopyPng,
}: ExportToolbarProps) {
  const actions = useMemo<ExportAction[]>(
    () => [
      {
        key: "export-svg",
        icon: <FileDown size={14} aria-hidden="true" />,
        label: "Export SVG",
        onClick: onExportSvg,
      },
      {
        key: "export-png",
        icon: <Camera size={14} aria-hidden="true" />,
        label: "Export PNG",
        onClick: onExportPng,
      },
      {
        key: "copy-svg",
        icon: <Copy size={14} aria-hidden="true" />,
        label: "Copy SVG",
        onClick: onCopySvg,
      },
      {
        key: "copy-png",
        icon: <ImageDown size={14} aria-hidden="true" />,
        label: "Copy PNG",
        onClick: onCopyPng,
      },
    ],
    [onExportSvg, onExportPng, onCopySvg, onCopyPng],
  );

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Export options">
      {actions.map(({ key, icon, label, onClick }) => (
        <button
          key={key}
          className={styles.btn}
          onClick={onClick}
          aria-label={label}
          title={label}
          disabled={disabled}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
