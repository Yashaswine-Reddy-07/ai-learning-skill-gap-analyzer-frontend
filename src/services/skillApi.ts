import apiClient from './api';
import { ApiResponse } from '../types/api';
import { SkillGap } from '../types/skill';

/**
 * Service managing skill gap analysis metrics.
 */
export const skillApi = {
  /**
   * Retrieves prioritized skill gaps comparing student performance to target career benchmarks.
   *
   * @param studentId student primary key
   * @returns ApiResponse containing prioritized SkillGap array
   */
  async getSkillGaps(studentId: number): Promise<ApiResponse<SkillGap[]>> {
    try {
      const response = await apiClient.get<ApiResponse<SkillGap[]>>(`/skills/gaps/${studentId}`);
      return response.data;
    } catch (error) {
      console.error(`skillApi.ts: Failed to get skill gaps for student ${studentId}`, error);
      throw error;
    }
  },
};

export default skillApi;
