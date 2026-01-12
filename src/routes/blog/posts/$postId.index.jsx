import { createFileRoute } from "@tanstack/react-router";
import PostEditor from "../../../components/Blog/PostEditor/PostEditor";
import { postQueryOptions } from "../../../data/blog";

export const Route = createFileRoute("/blog/posts/$postId/")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(postQueryOptions(params.postId)),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <PostEditor mode="view" initialData={data} />;
}
