import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "./api";

export const postsQueryOptions = (isAdmin) =>
  queryOptions({
    queryKey: ["posts", "list", { admin: isAdmin }],
    queryFn: async () => {
      const url = isAdmin
        ? "/api/blog/posts"
        : "/api/blog/posts?published=true";

      const res = await apiClient(url);
      if (!res.ok) throw new Error("Failed to fetch posts");
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

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["blog", "categories"],
    queryFn: async () => {
      const res = await apiClient(`/api/blog/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });
