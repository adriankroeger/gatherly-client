import type { ReactNode } from "react";

const fills = {
  plain: "bg-surface",
  attention: "bg-yellow",
  danger: "bg-red",
} as const;

export function Tag({ fill = "plain", children }: { fill?: keyof typeof fills; children: ReactNode }) {
  return (
    <span className={`self-start border-2 border-ink px-2 font-mono text-micro font-semibold uppercase ${fills[fill]}`}>
      {children}
    </span>
  );
}
