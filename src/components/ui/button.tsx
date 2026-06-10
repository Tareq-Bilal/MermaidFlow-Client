import * as React from "react";

import { cn } from "@/lib/utils";

function Button({
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="button"
      type={type}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

export { Button };
