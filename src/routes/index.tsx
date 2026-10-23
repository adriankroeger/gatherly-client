import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { data, status } = useQuery({
    queryKey: ["info"],
    queryFn: async () => {
      const res = await fetch("/api/info");

      if (res?.ok) {
        const data: { name: string; author: string; version: string } =
          await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch info");
      }
    },
    staleTime: 60*1000
  });

  if (status === "error") {
    return <span>Encountered an error while loading info</span>;
  } else if (status === "pending") {
    return <span>Loading info...</span>;
  }

  return (
    <div className="flex-col">
      {Object.entries(data).map(([desc, val]) => {
        const capitalized = desc.charAt(0).toUpperCase() + desc.slice(1).toLowerCase();
        return (
          <div>
            <span className="font-bold">{capitalized}: </span>
            <span className="italic">{val}</span>
          </div>
        );
      })}
    </div>
  );
}
