// Separate from button.tsx so links can wear the button look without breaking fast refresh
const base =
  "inline-flex items-center justify-center gap-2 border-2 border-ink font-mono font-semibold uppercase tracking-wider " +
  "motion-safe:transition-[transform,box-shadow] motion-safe:duration-100 " +
  "hover:-translate-x-0.5 hover:-translate-y-0.5 " +
  "active:translate-x-1 active:translate-y-1 active:shadow-none " +
  "aria-busy:translate-x-1 aria-busy:translate-y-1 aria-busy:shadow-none aria-busy:cursor-progress " +
  "disabled:translate-0 disabled:cursor-not-allowed disabled:border-dashed disabled:border-disabled " +
  "disabled:bg-subtle disabled:text-muted disabled:shadow-none";

const sizes = {
  sm: "h-9 px-3 text-micro shadow-hard-sm hover:shadow-hard",
  md: "h-12 px-5 text-label shadow-hard hover:shadow-hard-lg",
  lg: "h-14 px-6 font-display text-lg shadow-hard hover:shadow-hard-lg",
} as const;

const variants = {
  primary: "bg-cobalt text-white focus-visible:outline-yellow",
  secondary: "bg-surface text-ink hover:bg-yellow",
  danger: "bg-red text-ink",
  link: "h-auto border-0 bg-transparent px-0 shadow-none underline decoration-2 underline-offset-4 hover:translate-0 hover:bg-yellow hover:shadow-none",
} as const;

export type ButtonSize = keyof typeof sizes;
export type ButtonVariant = keyof typeof variants;

export function buttonStyles({ size = "md", variant = "secondary" }: { size?: ButtonSize; variant?: ButtonVariant } = {}) {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}
