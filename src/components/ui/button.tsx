import type { ComponentProps } from "react";
import { buttonStyles } from "./button-styles";
import type { ButtonSize, ButtonVariant } from "./button-styles";

type ButtonProps = ComponentProps<"button"> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  // Keeps the button mounted and sunk; the caller swaps the label to "Verb…"
  busy?: boolean;
};

export function Button({ size, variant, busy = false, type = "button", className = "", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      aria-busy={busy || undefined}
      className={`${buttonStyles({ size, variant })} ${className}`}
      {...props}
    />
  );
}
