import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { apiClient } from "./api";
import useAlert from "../components/AlertContext/useAlert";

export const authQueryOptions = queryOptions({
  queryKey: ["currentUser"],
  queryFn: async () => {
    const res = await apiClient("/api/users/checkAuth");
    return await res.json();
  },
  staleTime: 1000 * 60 * 5,
  retry: false,
});

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { alert, showAlert, clearAlert } = useAlert();

  const { data: user, isLoading } = useQuery(authQueryOptions);

  const handleMutationError = async (error, fallback) => {
    const res = error.response;
    if (!res) {
      showAlert("An unexpected network error occurred.", "fail");
      return;
    }

    const data = await res.json().catch(() => ({}));
    const msg = data.message || fallback;

    if (res.status === 404) {
      showAlert(msg, "fail");
    } else if (res.status >= 400 && res.status < 500) {
      showAlert(msg, "warning");
    } else {
      showAlert(
        msg || "An unexpected error occurred. Please try again.",
        "fail"
      );
    }
  };

  const login = useMutation({
    mutationFn: (credentials) =>
      apiClient("/api/users/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    onSuccess: () => {
      showAlert("Login successful!", "success");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate({ to: "/users/profile" });
    },
    onError: (err) => handleMutationError(err, "Invalid email or password."),
  });

  const signup = useMutation({
    mutationFn: (credentials) =>
      apiClient("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    onSuccess: () => {
      showAlert("Account created!", "success");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate({ to: "/users/profile" });
    },
    onError: (err) => handleMutationError(err, "Email already in use."),
  });

  const logout = useMutation({
    mutationFn: () => apiClient("/api/users/logout", { method: "POST" }),
    onSuccess: () => {
      queryClient.clear();
      showAlert("Logout successful!", "success");
      navigate({ to: "/users/login" });
    },
    onError: (err) => handleMutationError(err, "Logout failed"),
  });

  const updateUser = useMutation({
    mutationFn: ({ userId, data }) =>
      apiClient(`/api/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      showAlert("Account updated", "success");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (err) => handleMutationError(err, "Invalid email or password."),
  });

  const deleteAccount = useMutation({
    mutationFn: ({ userId, data }) =>
      apiClient(`/api/users/${userId}`, {
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.clear();
      showAlert("Account deleted.", "success");
      navigate({ to: "/users/login" });
    },
    onError: (err) => handleMutationError(err, "An unexpected error occurred."),
  });

  const requestResetPassword = useMutation({
    mutationFn: (data) =>
      apiClient(`/api/users/reset-password`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () =>
      showAlert(
        "You will receive an email with a link to reset your password.",
        "success"
      ),
    onError: (err) => handleMutationError(err, "Error submitting request."),
  });

  const resetPassword = useMutation({
    mutationFn: ({ tokenId, data }) =>
      apiClient(`/api/users/reset-password/${tokenId}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      showAlert("Password reset successful!", "success");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate({ to: "/users/profile" });
    },
    onError: (err) => handleMutationError(err, "An unexpected error occurred."),
  });

  const savePost = useMutation({
    mutationFn: async ({ postId, data }) => {
      const url = postId ? `/api/blog/posts/${postId}` : `/api/blog/posts`;
      const res = await apiClient(url, {
        method: "POST",
        body: JSON.stringify({ data }),
      });
      if (!res.ok) showAlert("Failed to save post", "error");

      return res.json();
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      if (data.postId) {
        await queryClient.invalidateQueries({
          queryKey: ["posts", data.postId],
        });
      }
      showAlert("Post saved.", "success");
      if (variables.willClose) {
        localStorage.clear();
        navigate({ to: "/blog" });
      }
    },
    onError: (err) => handleMutationError(err, "An unexpected error occurred."),
  });

  const publishPost = useMutation({
    mutationFn: ({ postId, token, published, isAdmin }) =>
      apiClient(`/api/blog/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({ _csrf: token, published }),
      }),
    onMutate: async ({ postId, published, isAdmin }) => {
      const queryKey = ["posts", "list", { admin: !!isAdmin }];
      await queryClient.cancelQueries({ queryKey });

      const previousPosts = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) => {
        if (!old) return [];
        return old.map((post) =>
          post.id === postId ? { ...post, published: published } : post
        );
      });
      return { previousPosts };
    },
    onError: (err, variables, context) => {
      const queryKey = ["posts", "list", { admin: !!variables.isAdmin }];
      if (context?.previousPosts) {
        queryClient.setQueryData(queryKey, context.previousPosts);
      }
      handleMutationError(err, "An unexpected error occurred.");
    },
    onSettled: async (_, __, variables) => {
      const queryKey = ["posts", "list", { admin: !!variables.isAdmin }];
      await queryClient.invalidateQueries({ queryKey });
      await queryClient.invalidateQueries({
        queryKey: ["posts", variables.postId],
      });
      showAlert(
        variables.published ? "Post published." : "Post ready to edit",
        "success"
      );
    },
  });

  const deletePost = useMutation({
    mutationFn: ({ postId, token, isAdmin }) =>
      apiClient(`/api/blog/posts/${postId}`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": token },
      }),
    onMutate: async ({ postId, isAdmin }) => {
      const queryKey = ["posts", "list", { admin: !!isAdmin }];

      await queryClient.cancelQueries({ queryKey });

      const previousPosts = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) =>
        old?.filter((post) => post.id !== postId)
      );
      return { previousPosts };
    },
    onError: (err, variables, context) => {
      const queryKey = ["posts", "list", { admin: variables.isAdmin }];
      if (context?.previousPosts) {
        queryClient.setQueryData(queryKey, context.previousPosts);
      }
      handleMutationError(err, "An unexpected error occurred.");
    },
    onSettled: (_, __, variables) => {
      const queryKey = ["posts", "list", { admin: !!variables.isAdmin }];
      queryClient.invalidateQueries({ queryKey });
      showAlert("Post deleted.", "success");
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    userId: user?.id,
    isAdmin: user?.isAdmin,
    csrfToken: user?.csrfToken,
    isLoading,
    alert,
    clearAlert,
    signup: signup.mutate,
    login: login.mutate,
    logout: logout.mutate,
    updateUser: updateUser.mutate,
    deleteAccount: deleteAccount.mutate,
    requestResetPassword: requestResetPassword.mutate,
    resetPassword: resetPassword.mutate,
    savePost: savePost,
    publishPost: publishPost,
    deletePost: deletePost,
  };
};
