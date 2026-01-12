import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "./api";

export const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: async () => {
    const res = await apiClient("/api/blog/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    const posts = await res.json();
    console.log(posts);

    return res.json();
  },
});

export const postQueryOptions = (postId) =>
  queryOptions({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const res = await apiClient(`/api/blog/posts/${postId}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
    enabled: !!postId,
  });
