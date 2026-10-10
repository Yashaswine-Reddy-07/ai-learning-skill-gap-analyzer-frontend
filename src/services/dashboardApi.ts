import apiClient from './api';
import { ApiResponse } from '../types/api';
import { DashboardData } from '../types/learningPlan';

/**
 * Service managing student dashboard analytics retrieval.
 */
export const dashboardApi = {
  /**
   * Retrieves aggregated dashboard telemetry for student profile.
   *
   * @param studentId student primary key
   * @returns ApiResponse with DashboardData
   */
  async getDashboard(studentId: number): Promise<ApiResponse<DashboardData>> {
    try {
      const response = await apiClient.get<ApiResponse<DashboardData>>(`/dashboard/${studentId}`);
      return response.data;
    } catch (error) {
      console.error(`dashboardApi.ts: Failed to get dashboard for student ${studentId}`, error);
      throw error;
    }
  },
};

export default dashboardApi;
