import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "../../components/event-card";
import type { EventSummary } from "../../components/event-card";

export const Route = createFileRoute("/events/")({
  component: EventsComponent,
});

// Mock until the list is fetched from the API (plan steps 4 and 6)
const mockEvent: EventSummary = {
  id: "evt-1",
  title: "Spring Boot Meetup: Virtual Threads in Practice",
  category: "Tech",
  startsAt: "2026-11-06T18:30:00+01:00",
  capacity: 1200,
};

function EventsComponent() {
  return (
    <>
      <h1 className="font-display text-hero uppercase">
        Upcoming <span className="bg-yellow px-2">events</span>
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
        <EventCard event={mockEvent} />
      </div>
    </>
  );
}
