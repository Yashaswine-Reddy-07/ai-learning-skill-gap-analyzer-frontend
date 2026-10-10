import apiClient from './api';
import { ApiResponse } from '../types/api';
import { LearningPlanResponse } from '../types/learningPlan';

/**
 * Service managing LangChain4j personalized AI recommendation generation.
 */
export const aiApi = {
  /**
   * Triggers the backend AI recommendation pipeline to synthesize a personalized learning roadmap.
   *
   * @param studentId student primary key
   * @param roleId optional target role ID override
   * @returns ApiResponse containing generated LearningPlanResponse
   */
  async generateRecommendations(studentId: number, roleId?: number): Promise<ApiResponse<LearningPlanResponse>> {
    try {
      const response = await apiClient.post<ApiResponse<LearningPlanResponse>>('/ai/recommendations', {
        studentId,
        roleId,
      });
      return response.data;
    } catch (error) {
      console.error(`aiApi.ts: Failed to generate AI recommendations for student ${studentId}`, error);
      throw error;
    }
  },
};

export default aiApi;
