/**
 * Authenticated user profile stored in auth state and localStorage.
 */
export interface User {
  studentId: number;
  name: string;
  email: string;
  careerGoal?: string;
  token: string;
}

/**
 * Credentials for login request.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration form payload.
 */
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  careerGoal?: string;
}

/**
 * Authentication response from backend.
 */
export interface AuthData {
  token: string;
  studentId: number;
  name: string;
  email: string;
  careerGoal?: string;
}
