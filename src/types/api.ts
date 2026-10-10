/**
 * Standard API envelope received from Spring Boot backend.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * Standard error response envelope.
 */
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errorCode: string;
  details?: string[];
  timestamp: string;
}
