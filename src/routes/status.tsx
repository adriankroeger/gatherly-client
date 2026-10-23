import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/status")({
  component: RouteComponent,
  errorComponent: RouteComponent,
});

function RouteComponent() {
  const { data, status } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await fetch("/health");

      if (res?.ok) {
        const data: { components: unknown, groups: string[], status: string } = await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch status")
      }
    },
  });

  if (status === "error") {
    return <span>Encountered an error while loading status</span>;
  } else if (status === "pending") {
    return <span>Loading status...</span>;
  }

  return (
    <div>
      <span>All systems are </span>
      <span className="font-bold">{data.status}</span>
    </div>
  );
}
