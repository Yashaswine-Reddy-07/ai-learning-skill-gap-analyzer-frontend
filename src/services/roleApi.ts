import apiClient from './api';
import { ApiResponse } from '../types/api';
import { CareerRole } from '../types/role';

/**
 * Service managing career roles and required skill benchmarks.
 */
export const roleApi = {
  /**
   * Retrieves all available career roles.
   *
   * @returns ApiResponse containing list of CareerRole items
   */
  async getAllRoles(): Promise<ApiResponse<CareerRole[]>> {
    try {
      const response = await apiClient.get<ApiResponse<CareerRole[]>>('/roles');
      return response.data;
    } catch (error) {
      console.error('roleApi.ts: Failed to fetch all roles', error);
      throw error;
    }
  },

  /**
   * Retrieves specific role details and its skill requirements by role ID.
   *
   * @param id role primary key
   * @returns ApiResponse with CareerRole
   */
  async getRoleById(id: number): Promise<ApiResponse<CareerRole>> {
    try {
      const response = await apiClient.get<ApiResponse<CareerRole>>(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`roleApi.ts: Failed to fetch role ${id}`, error);
      throw error;
    }
  },
};

export default roleApi;
