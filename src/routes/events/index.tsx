import { createFileRoute } from "@tanstack/react-router";
import { EventCard, EventCardSkeleton } from "../../components/event-card";
import { ErrorPanel } from "../../components/ui/error-panel";
import { useQuery } from "@tanstack/react-query";
import fetchEvents from "../../queries/fetchEvents";

export const Route = createFileRoute("/events/")({
  component: EventsComponent,
});

function EventsComponent() {
  const { data, isSuccess, isPending, isError, error, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    retry: 1,
    staleTime: 2*60*1000,
  });

  return (
    <>
      <h1 className="font-display text-hero uppercase">
        Upcoming <span className="bg-yellow px-2">events</span>
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
        {isSuccess && data.map((event) => <EventCard key={event.id} event={event} />)}
        {isPending && [...Array(6).keys()].map(key => <EventCardSkeleton key={key} />)}
        {isError && (
          <ErrorPanel title="Couldn't load events" onRetry={refetch}>
            {error.message}
          </ErrorPanel>
        )}
      </div>
    </>
  );
}
