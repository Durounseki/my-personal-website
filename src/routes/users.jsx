import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authQueryOptions } from "../data/auth";

export const Route = createFileRoute("/users")({
  beforeLoad: async ({ context: { queryClient }, location }) => {
    try {
      const user = await queryClient.ensureQueryData(authQueryOptions);

      const isAuthenticated = !!user?.id;
      const { pathname } = location;

      const guestOnlyPages = ["/users/login", "/users/signup"];

      if (
        isAuthenticated &&
        guestOnlyPages.some((p) => pathname.startsWith(p))
      ) {
        throw redirect({ to: "/users/profile" });
      }

      if (!isAuthenticated && pathname === "/users/profile") {
        throw redirect({ to: "/users/login" });
      }
    } catch (err) {
      if (location.pathname === "/users/profile") {
        throw redirect({ to: "/users/login" });
      }
    }
  },
  component: () => <Outlet />,
});
