import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => (
    <div>Page not found!</div>
  )
});

function RootComponent() {
  return (
    <div className="h-dvh">
      <div className="bg-slate-200 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/status">Status</Link>
      </div>
      <div className="bg-slate-100 h-full p-2">
        <Outlet />
      </div>
      
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </div>
  );
}
