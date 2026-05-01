"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon
            className="size-5"
            style={{ color: "var(--color-success)" }}
          />
        ),
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: (
          <OctagonXIcon
            className="size-5"
            style={{ color: "var(--color-error)" }}
          />
        ),
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-surface-100)",
          "--normal-text": "var(--color-text-near-white)",
          "--normal-border": "var(--color-border)",
          "--success-bg": "var(--color-surface-100)",
          "--success-text": "var(--color-success)",
          "--success-border": "var(--color-border)",
          "--error-bg": "var(--color-surface-100)",
          "--error-text": "var(--color-error)",
          "--error-border": "var(--color-border)",
          "--border-radius": "var(--radius-md-alt)",
          "--offset": "var(--sonner-bottom-offset, var(--spacing-24))",
          "--width": "280px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
        style: {
          textAlign: "center",
          fontSize: "0.9rem",
          paddingLeft: "1.25rem",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
