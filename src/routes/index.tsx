import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HelloWorldComponent,
});

function HelloWorldComponent() {
  const status = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await fetch("/health");

      if (!res.ok) throw new Error("Failed to fetch status");
      return await res.json();
    },
  });

  const info = useQuery({
    queryKey: ["info"],
    queryFn: async () => {
      const res = await fetch('/api/info');

      if (!res.ok) throw new Error("Failed to fetch info");
      return await res.json();
    }
  })

  return (
    <>
      <div>Hello World</div>
      <div>{JSON.stringify(status?.data?.status)}</div>
      <div>{JSON.stringify(info?.data)}</div>
    </>
  );
}
