import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    // exact: "/" is a prefix of every path, so fuzzy matching would mark the logo as the current page everywhere
    <Link to="/" activeOptions={{ exact: true }} className="flex h-11 items-center gap-2.5">
      <span aria-hidden className="size-6 -rotate-8 border-2 border-ink bg-yellow" />
      <span className="font-display text-xl uppercase">Gatherly</span>
    </Link>
  );
}
