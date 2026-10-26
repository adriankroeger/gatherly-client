import { Link, createFileRoute } from "@tanstack/react-router";
import { EventHero } from "../../components/event-hero";
import type { EventDetail } from "../../types/event";

export const Route = createFileRoute("/events/$eventId")({
  component: EventDetailComponent,
});

// Mock until the detail is fetched from the API
const mockEvent: Omit<EventDetail, "id"> = {
  title: "Spring Boot Meetup: Virtual Threads in Practice",
  category: "Tech",
  startsAt: "2026-11-06T18:30:00+01:00",
  description:
    "Virtual threads landed in Java 21 and Spring Boot switched them on with a single property. " +
    "This evening looks at what actually changes: blocking calls, connection pools, pinning, and how to measure it.\n\n" +
    "Two talks of 30 minutes each, followed by questions and drinks.",
  capacity: 40,
};

const crumbLink = "underline decoration-2 underline-offset-4 hover:bg-yellow";

function EventDetailComponent() {
  const { eventId } = Route.useParams();
  const event: EventDetail = { ...mockEvent, id: eventId };

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 font-mono text-label font-semibold uppercase">
          <li>
            <Link to="/events" className={crumbLink}>
              Events
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            {/* Points to the unfiltered list until category filtering exists */}
            <Link to="/events" className={crumbLink}>
              {event.category}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="truncate text-muted">
            {event.title}
          </li>
        </ol>
      </nav>

      <EventHero event={event} />

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-section uppercase">About</h2>
        <p className="max-w-prose whitespace-pre-line">{event.description}</p>
      </section>
    </>
  );
}
