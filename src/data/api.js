const apiUrl = import.meta.env.VITE_API_ROOT_URL;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

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
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => apiClient(endpoint, options))
        .catch((err) => Promise.reject(err));
    }
    isRefreshing = true;
    try {
      const refreshRes = await fetch(`${apiUrl}/api/users/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (refreshRes.ok) {
        isRefreshing = false;
        processQueue(null);
        return apiClient(endpoint, options);
      } else {
        isRefreshing = false;
        processQueue(new Error("REFRESH_FAILED"));
      }
    } catch (err) {
      isRefreshing = false;
      processQueue(err);
      throw err;
    }
  }

  if (!response.ok) {
    const error = new Error("API_ERROR");
    error.response = response;
    throw error;
  }

  return response;
}
