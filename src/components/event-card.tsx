import { Link } from "@tanstack/react-router";
import { dateParts, formatNumber } from "../lib/format";
import type { EventSummary } from "../types/event";
import { Tag } from "./ui/tag";

// The title link stretches over the whole card (after:inset-0), so the card itself carries hover, press and focus
export function EventCard({ event }: { event: EventSummary }) {
  const { weekday, day, month, time } = dateParts(event.startsAt);

  return (
    <article
      className="relative flex border-2 border-ink bg-surface shadow-hard
                 motion-safe:transition-[transform,box-shadow] motion-safe:duration-100
                 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg
                 active:translate-x-1 active:translate-y-1 active:shadow-none
                 has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-cobalt"
    >
      <time
        dateTime={event.startsAt}
        className="flex w-21 flex-none flex-col items-center justify-center gap-0.5 border-r-2 border-dashed border-ink py-3.5"
      >
        <span className="font-mono text-label font-semibold uppercase">{weekday}</span>
        <span className="font-display text-4xl leading-none">{day}</span>
        <span className="font-mono text-label font-semibold uppercase">{month}</span>
        <span className="mt-1 font-mono text-label tabular-nums">{time}</span>
      </time>

      <div className="flex min-w-0 flex-1 flex-col gap-2 px-5 py-4">
        <Tag>{event.category}</Tag>
        <h2 className="line-clamp-2 text-card font-bold">
          <Link
            to="/events/$eventId"
            params={{ eventId: event.id }}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {event.title}
          </Link>
        </h2>
        <p className="mt-auto font-mono text-label uppercase">{formatNumber(event.capacity)} seats</p>
      </div>
    </article>
  );
}

// Decorative: the list around it carries aria-busy, so screen readers don't hear "Loading…" once per card.
// min-h-32 matches the height the real card gets from its date stub, so nothing jumps when data arrives.
export function EventCardSkeleton() {
  return (
    <div aria-hidden className="flex min-h-32 border-2 border-dashed border-ink bg-surface">
      <div className="w-21 flex-none border-r-2 border-dashed border-ink bg-[repeating-linear-gradient(45deg,var(--color-paper)_0_8px,var(--color-subtle)_8px_16px)]" />
      <div className="flex min-w-0 flex-1 flex-col gap-2 px-5 py-4">
        <div className="h-5 w-14 bg-subtle" />
        <div className="h-5 w-17/20 bg-subtle" />
        <p className="mt-auto font-mono text-label text-muted uppercase">Loading…</p>
      </div>
    </div>
  );
}
