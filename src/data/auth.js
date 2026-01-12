import { useState, useCallback } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { apiClient } from "./api";

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

  const [alert, setAlert] = useState({ message: "", type: "" });
  const showAlert = (message, type) => setAlert({ message, type });
  const clearAlert = useCallback(() => setAlert({ message: "", type: "" }), []);

  const { data: user, isLoading } = useQuery(authQueryOptions);

  /**
   * REPLICATED ERROR LOGIC:
   * Maps response status to your specific message types
   */
  const handleMutationError = async (error, fallback) => {
    const res = error.response;
    if (!res) {
      showAlert("An unexpected network error occurred.", "fail");
      return;
    }

    const data = await res.json().catch(() => ({}));
    const msg = data.message || fallback;

    if (res.status === 404) {
      // Replicates your bot/lost error logic
      showAlert(msg, "fail");
    } else if (res.status >= 400 && res.status < 500) {
      // Replicates your warning logic
      showAlert(msg, "warning");
    } else {
      showAlert(
        msg || "An unexpected error occurred. Please try again.",
        "fail"
      );
    }
  };

  // --- MUTATIONS ---

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

  // --- BLOG MUTATIONS ---

  const savePost = useMutation({
    mutationFn: ({ postId, data }) =>
      apiClient(`/api/blog/posts/${postId}`, {
        method: "POST",
        body: JSON.stringify({ data }),
      }),
    onSuccess: (res, variables) => {
      showAlert("Post saved.", "success");
      if (variables.willClose) {
        navigate({ to: "/blog" });
      }
    },
    onError: (err) => handleMutationError(err, "An unexpected error occurred."),
  });

  const publishPost = useMutation({
    mutationFn: ({ postId, token, published }) =>
      apiClient(`/api/blog/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({ _csrf: token, published }),
      }),
    onSuccess: (_, variables) => {
      showAlert(
        variables.published ? "Post published." : "Post ready to edit",
        "success"
      );
      navigate({ to: "/blog" });
    },
    onError: (err) => handleMutationError(err, "An unexpected error occurred."),
  });

  const deletePost = useMutation({
    mutationFn: ({ postId, token }) =>
      apiClient(`/api/blog/posts/${postId}`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": token },
      }),
    onSuccess: () => showAlert("Post deleted.", "success"),
    onError: (err) => handleMutationError(err, "An unexpected error occurred."),
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
    savePost: savePost.mutate,
    publishPost: publishPost.mutate,
    deletePost: deletePost.mutate,
  };
};
