import axios from "axios";
import backendConnection from "./backendApi";
import {
  getAccessToken,
  clearAccessToken,
} from "@/features/auth/utils/tokenStore";
import { refreshTokens } from "@/features/auth/api/auth.api";

/**
 * Pre-configured Axios instance for all API calls.
 *
 * - `withCredentials: true` ensures the browser sends/receives httpOnly cookies
 *   (refresh token) with every request to the backend.
 * - Request interceptor attaches the in-memory access token as Bearer header.
 * - Response interceptor handles 401s by attempting a silent token refresh.
 */
const api = axios.create({
  baseURL: backendConnection(),
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ── Request Interceptor ─────────────────────────────────────────────────
// Attach access token to every outgoing request (except refresh itself).
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response Interceptor ────────────────────────────────────────────────
// On 401, try to silently refresh the access token and retry the original request.
// Uses a queue so multiple concurrent 401s don't trigger multiple refreshes.
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh for 401s that haven't already been retried
    // and that are NOT the refresh endpoint itself (avoid infinite loop).
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/v2/auth/refresh")
    ) {
      if (isRefreshing) {
        // Another refresh is in progress — queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const result = await refreshTokens();

        if (result) {
          processQueue(null, result.accessToken);
          originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
          return api(originalRequest);
        } else {
          processQueue(error, null);
          clearAccessToken();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAccessToken();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
