import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn("flex w-full outline-none disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

export { Input };
