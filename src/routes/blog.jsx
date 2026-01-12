import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authQueryOptions } from "../data/auth";

export const Route = createFileRoute("/blog")({
  beforeLoad: async ({ context: { queryClient }, location }) => {
    const user = await queryClient
      .ensureQueryData(authQueryOptions)
      .catch(() => null);

    const isAuthenticated = !!user;
    const isAdmin = !!user?.isAdmin;

    if (
      location.pathname === "/blog/posts/create" &&
      (!isAuthenticated || !isAdmin)
    ) {
      throw redirect({ to: "/blog" });
    }

    return {
      isAuthenticated,
      isAdmin,
      csrfToken: user?.csrfToken,
    };
  },
  component: () => <Outlet />,
});
