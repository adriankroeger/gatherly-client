import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppHeader } from "../components/app-header";
import { NotFound } from "../components/not-found";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <AppHeader />

      <main className="mx-auto flex max-w-300 flex-col gap-7 px-6 pt-10 pb-16">
        <Outlet />
      </main>

      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </div>
  );
}
