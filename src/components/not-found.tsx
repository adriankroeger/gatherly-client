import { Link, useLocation } from "@tanstack/react-router";

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
      <Link
        to="/events"
        className="inline-flex h-12 items-center border-2 border-ink bg-surface px-5 font-mono text-label font-semibold
                   uppercase shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-yellow
                   hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none
                   motion-safe:transition-[transform,box-shadow] motion-safe:duration-100"
      >
        Browse events
      </Link>
    </section>
  );
}
