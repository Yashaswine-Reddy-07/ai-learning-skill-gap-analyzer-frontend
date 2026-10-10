import apiClient from './api';
import { ApiResponse } from '../types/api';
import { AuthData, LoginCredentials, RegisterCredentials } from '../types/auth';

/**
 * Service handling student registration and authentication API calls.
 */
export const authApi = {
  /**
   * Registers a new student account.
   *
   * @param credentials student registration fields
   * @returns ApiResponse containing JWT token and student details
   */
  async register(credentials: RegisterCredentials): Promise<ApiResponse<AuthData>> {
    try {
      const response = await apiClient.post<ApiResponse<AuthData>>('/auth/register', credentials);
      return response.data;
    } catch (error) {
      console.error('authApi.ts: Registration call failed', error);
      throw error;
    }
  },

  /**
   * Authenticates an existing student.
   *
   * @param credentials email and password
   * @returns ApiResponse containing JWT token and student details
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthData>> {
    try {
      const response = await apiClient.post<ApiResponse<AuthData>>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('authApi.ts: Login call failed', error);
      throw error;
    }
  },
};

export default authApi;
