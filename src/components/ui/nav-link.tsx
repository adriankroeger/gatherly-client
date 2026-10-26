import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

// Link sets aria-current="page" itself when its route is active, so the current state is styled from that attribute
export function NavLink({ to, children }: { to: LinkProps["to"]; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex h-11 items-center px-3.5 font-mono text-label font-semibold uppercase
                 hover:bg-yellow aria-[current=page]:bg-ink aria-[current=page]:text-white"
    >
      {children}
    </Link>
  );
}
