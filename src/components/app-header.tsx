import { Logo } from "./logo";
import { NavLink } from "./ui/nav-link";

export function AppHeader() {
  return (
    <header className="border-b-2 border-ink bg-surface">
      <div className="mx-auto flex max-w-300 flex-wrap items-center gap-6 px-6 py-3">
        <Logo />
        <nav aria-label="Main" className="flex flex-1 flex-wrap gap-1">
          <NavLink to="/events">Events</NavLink>
        </nav>
      </div>
    </header>
  );
}
