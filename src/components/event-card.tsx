import { Tag } from "./ui/tag";

// Replaced by the generated OpenAPI type once the events endpoint exists
export type EventSummary = {
  id: string;
  title: string;
  category: string;
  startsAt: string; // ISO 8601
  capacity: number;
};

// en-GB: English names to match the UI copy, but day-before-month and 24h time
const stubFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const seatFormat = new Intl.NumberFormat("de-DE");

function stubParts(iso: string) {
  const parts = Object.fromEntries(stubFormat.formatToParts(new Date(iso)).map((p) => [p.type, p.value]));
  return { weekday: parts.weekday, day: parts.day, month: parts.month, time: `${parts.hour}:${parts.minute}` };
}

export function EventCard({ event }: { event: EventSummary }) {
  const { weekday, day, month, time } = stubParts(event.startsAt);

  return (
    <article className="flex border-2 border-ink bg-surface shadow-hard">
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
        <h2 className="line-clamp-2 text-card font-bold">{event.title}</h2>
        <p className="mt-auto font-mono text-label uppercase">{seatFormat.format(event.capacity)} seats</p>
      </div>
    </article>
  );
}
