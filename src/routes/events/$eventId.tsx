import { Link, createFileRoute } from "@tanstack/react-router";
import { EventHero, EventHeroSkeleton } from "../../components/event-hero";
import { ErrorPanel } from "../../components/ui/error-panel";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchEventById from "../../queries/fetchEventById";
import type { EventDetail } from "../../types/event";

function eventQueryOptions(eventId: string) {
  return queryOptions({
    queryKey: ["events", eventId],
    queryFn: () => fetchEventById(eventId),
  });
}

export const Route = createFileRoute("/events/$eventId")({
  component: EventDetailComponent,
  /* loader: ({ params: { eventId }, context: { queryClient } }) => queryClient.query({...eventQueryOptions(eventId)}) */
});

const crumbLink = "underline decoration-2 underline-offset-4 hover:bg-yellow";

function EventDetailComponent() {
  const { eventId } = Route.useParams();
  const queryClient = useQueryClient();

  const { data: event, isSuccess, isPending, isError, error, refetch, isFetching } = useQuery({
    ...eventQueryOptions(eventId),
    initialData: queryClient.getQueryData<EventDetail[]>(["events"])?.find(({ id }) => id === eventId),
    retry: 1,
    staleTime: 2*60*1000,
  });

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 font-mono text-label font-semibold uppercase">
          <li>
            <Link to="/events" className={crumbLink}>
              Events
            </Link>
          </li>
          {isSuccess && (
            <>
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
            </>
          )}
        </ol>
      </nav>

      {isPending && (
        <div aria-busy className="flex flex-col gap-7">
          <EventHeroSkeleton />
          <section aria-hidden className="flex flex-col gap-3">
            <h2 className="font-display text-section uppercase">About</h2>
            <div className="h-4 max-w-prose bg-subtle" />
            <div className="h-4 max-w-prose bg-subtle" />
            <div className="h-4 w-3/5 max-w-prose bg-subtle" />
          </section>
        </div>
      )}

      {isError && (
        <ErrorPanel title="Couldn't load event" onRetry={refetch} retrying={isFetching}>
          {error.message}
        </ErrorPanel>
      )}

      {isSuccess && (
        <>
          <EventHero event={event} />

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-section uppercase">About</h2>
            <p className="max-w-prose whitespace-pre-line">{event.description}</p>
          </section>
        </>
      )}
    </>
  );
}
