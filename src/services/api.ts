import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiErrorResponse } from '../types/api';

/**
 * Base URL for the Spring Boot backend REST endpoints, resolved from environment variables.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Central Axios HTTP client configured with defaults and interceptors.
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 90000,
});

/**
 * Request Interceptor: Automatically attaches JWT Bearer token if present in localStorage.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const userJson = localStorage.getItem('skill_analyzer_user');
      if (userJson) {
        const user = JSON.parse(userJson);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
      return config;
    } catch (err) {
      console.error('api.ts: Error attaching Authorization token to request', err);
      return config;
    }
  },
  (error) => {
    console.error('api.ts: Request interceptor failure', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Standardizes error extraction, friendly timeout messages, and token expiration.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    try {
      console.error('api.ts: API Error encountered:', error.response?.status, error.response?.data?.message || error.message);

      if (error.response?.status === 401) {
        // Clear expired credentials and notify user session invalidation
        localStorage.removeItem('skill_analyzer_user');
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
      }

      // Check for request timeout (ECONNABORTED or timeout text in error message)
      const isTimeout =
        error.code === 'ECONNABORTED' ||
        (typeof error.message === 'string' && error.message.toLowerCase().includes('timeout'));

      let errorMessage = error.response?.data?.message;
      let errorCode = error.response?.data?.errorCode || 'NETWORK_ERROR';

      if (isTimeout) {
        errorMessage = 'The server is taking longer than expected to respond. If the cloud backend was inactive, it may be waking up from sleep. Please try again in a few moments.';
        errorCode = 'TIMEOUT_ERROR';
      } else if (!errorMessage) {
        errorMessage = error.message || 'An unexpected network error occurred.';
      }

      const customError: ApiErrorResponse = error.response?.data
        ? { ...error.response.data, message: errorMessage }
        : {
            success: false,
            message: errorMessage,
            errorCode,
            timestamp: new Date().toISOString(),
          };

      return Promise.reject(customError);
    } catch (interceptorErr) {
      console.error('api.ts: Critical error in response interceptor', interceptorErr);
      return Promise.reject(error);
    }
  }
);

export default apiClient;
