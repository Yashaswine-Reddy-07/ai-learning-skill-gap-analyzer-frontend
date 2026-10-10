import apiClient from './api';
import { ApiResponse } from '../types/api';
import { StudentProfile } from '../types/student';

/**
 * Service managing student profile retrieval and career objective updates.
 */
export const studentApi = {
  /**
   * Fetches public profile details for a given student ID.
   *
   * @param id student primary key
   * @returns ApiResponse with StudentProfile
   */
  async getProfile(id: number): Promise<ApiResponse<StudentProfile>> {
    try {
      const response = await apiClient.get<ApiResponse<StudentProfile>>(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`studentApi.ts: Failed to get profile for student ${id}`, error);
      throw error;
    }
  },

  /**
   * Updates target career goal on student profile.
   *
   * @param id student primary key
   * @param careerGoal new target career goal string
   * @returns ApiResponse with updated StudentProfile
   */
  async updateCareerGoal(id: number, careerGoal: string): Promise<ApiResponse<StudentProfile>> {
    try {
      const response = await apiClient.put<ApiResponse<StudentProfile>>(`/students/${id}/goal`, { careerGoal });
      return response.data;
    } catch (error) {
      console.error(`studentApi.ts: Failed to update career goal for student ${id}`, error);
      throw error;
    }
  },
};

export default studentApi;
