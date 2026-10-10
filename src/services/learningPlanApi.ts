import apiClient from './api';
import { ApiResponse } from '../types/api';
import { LearningPlanResponse } from '../types/learningPlan';

/**
 * Service managing retrieval of personalized learning curricula.
 */
export const learningPlanApi = {
  /**
   * Retrieves active personalized learning plan items for a student.
   *
   * @param studentId student primary key
   * @returns ApiResponse with LearningPlanResponse
   */
  async getLearningPlan(studentId: number): Promise<ApiResponse<LearningPlanResponse>> {
    try {
      const response = await apiClient.get<ApiResponse<LearningPlanResponse>>(`/learning-plan/${studentId}`);
      return response.data;
    } catch (error) {
      console.error(`learningPlanApi.ts: Failed to get learning plan for student ${studentId}`, error);
      throw error;
    }
  },
};

export default learningPlanApi;
