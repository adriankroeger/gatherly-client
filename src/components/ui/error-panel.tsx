import type { ReactNode } from "react";
import { Button } from "./button";

type ErrorPanelProps = {
  title: string;
  children: ReactNode; // one sentence: the cause, with the relevant data
  onRetry: () => void;
  retrying?: boolean;
};

export function ErrorPanel({ title, children, onRetry, retrying = false }: ErrorPanelProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-2.5 border-2 border-ink bg-surface p-6 text-center shadow-hard-red"
    >
      <strong className="font-display text-2xl uppercase">{title}</strong>
      <p className="text-sm">{children}</p>
      <Button size="sm" variant="primary" busy={retrying} onClick={onRetry}>
        {retrying ? "Retrying…" : "Retry"}
      </Button>
    </div>
  );
}
