import apiClient from './api';
import { ApiResponse } from '../types/api';
import { LearningPlanItem, ProgressUpdateRequest } from '../types/learningPlan';

/**
 * Service managing learning activity progress updates.
 */
export const progressApi = {
  /**
   * Updates completion percentage and milestone status on a specific learning plan item.
   *
   * @param planId learning plan primary key
   * @param payload progress percentage and status
   * @returns ApiResponse with updated LearningPlanItem
   */
  async updateProgress(planId: number, payload: ProgressUpdateRequest): Promise<ApiResponse<LearningPlanItem>> {
    try {
      const response = await apiClient.put<ApiResponse<LearningPlanItem>>(`/progress/${planId}`, payload);
      return response.data;
    } catch (error) {
      console.error(`progressApi.ts: Failed to update progress for plan ${planId}`, error);
      throw error;
    }
  },
};

export default progressApi;
