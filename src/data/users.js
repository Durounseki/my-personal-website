import { apiClient } from "./api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const userQueryOptions = (userId) =>
  queryOptions({
    queryKey: ["users", "profile", userId],
    queryFn: async () => {
      const res = await apiClient(`/api/users/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return res.json();
    },
    enabled: !!userId,
  });

export const useUser = (userId) => {
  return useQuery(userQueryOptions(userId));
};
