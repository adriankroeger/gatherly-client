import { Link, useLocation } from "@tanstack/react-router";
import { buttonStyles } from "./ui/button-styles";

export function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="mx-auto flex w-full max-w-110 flex-col items-center gap-4 border-2 border-ink bg-surface p-6 text-center shadow-hard">
      <p className="font-mono text-label font-semibold uppercase">Error 404</p>
      <h1 className="font-display text-title uppercase">
        No such <span className="bg-yellow px-2">page</span>
      </h1>
      <p>
        Nothing is listed under{" "}
        {/* no uppercase: paths are case-sensitive and must stay readable as typed */}
        <code className="border-2 border-ink px-1.5 font-mono text-label break-all">{pathname}</code>.
      </p>
      <Link to="/events" className={buttonStyles()}>
        Browse events
      </Link>
    </section>
  );
}
