import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/users/reset-password")({
  component: () => <Outlet />,
});
