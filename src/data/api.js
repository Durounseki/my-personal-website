const apiUrl = import.meta.env.VITE_API_ROOT_URL;

export async function apiClient(endpoint, options = {}) {
  const url = `${apiUrl}${endpoint}`;
  const config = {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  };

  let response = await fetch(url, config);

  if (
    response.status === 401 &&
    !endpoint.includes("/login") &&
    !endpoint.includes("/refresh")
  ) {
    const refreshRes = await fetch(`${apiUrl}/api/users/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (refreshRes.ok) {
      response = await fetch(url, config);
    }
  }

  if (!response.ok) {
    const error = new Error("API_ERROR");
    error.response = response;
    throw error;
  }

  return response;
}
