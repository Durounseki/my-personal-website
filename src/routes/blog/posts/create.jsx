import { createFileRoute } from "@tanstack/react-router";
import PostEditor from "../../../components/Blog/PostEditor/PostEditor";

export const Route = createFileRoute("/blog/posts/create")({
  component: () => <PostEditor mode="create" />,
});
