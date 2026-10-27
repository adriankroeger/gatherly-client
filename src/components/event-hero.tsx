import { dateParts } from "../lib/format";
import type { EventDetail } from "../types/event";
import { Tag } from "./ui/tag";

export function EventHero({ event }: { event: EventDetail }) {
  const { weekday, day, month, year, time } = dateParts(event.startsAt);

  return (
    // Stub sits on top on phones: a 132px column would leave the display title too little room
    <article className="flex flex-col border-2 border-ink bg-surface shadow-hard-lg sm:flex-row">
      <time
        dateTime={event.startsAt}
        className="flex flex-none items-baseline gap-3 border-b-2 border-dashed border-ink bg-yellow px-7 py-4
                   sm:w-33 sm:flex-col sm:items-center sm:justify-center sm:gap-1 sm:border-r-2 sm:border-b-0 sm:px-0 sm:py-6"
      >
        <span className="font-mono text-label font-semibold uppercase">{weekday}</span>
        <span className="font-display text-6xl leading-none">{day}</span>
        <span className="font-mono text-label font-semibold uppercase">
          {month} {year}
        </span>
        <span className="font-mono text-label tabular-nums sm:mt-1">{time}</span>
      </time>

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-7">
        <Tag>{event.category}</Tag>
        <h1 className="font-display text-title wrap-break-word uppercase">{event.title}</h1>
      </div>
    </article>
  );
}

// Same vocabulary as EventCardSkeleton: dashed border, hatched stub, subtle bars.
// Decorative: the wrapper around it carries aria-busy. Heights approximate the real hero so nothing jumps.
export function EventHeroSkeleton() {
  return (
    <div aria-hidden className="flex flex-col border-2 border-dashed border-ink bg-surface sm:min-h-44 sm:flex-row">
      <div
        className="h-23 flex-none border-b-2 border-dashed border-ink bg-[repeating-linear-gradient(45deg,var(--color-paper)_0_8px,var(--color-subtle)_8px_16px)]
                   sm:h-auto sm:w-33 sm:border-r-2 sm:border-b-0"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-7">
        <div className="h-5 w-14 bg-subtle" />
        <div className="h-9 w-17/20 bg-subtle" />
        <p className="mt-auto font-mono text-label text-muted uppercase">Loading…</p>
      </div>
    </div>
  );
}
