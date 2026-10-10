import apiClient from './api';
import { ApiResponse } from '../types/api';
import { QuizSession, QuizSubmissionPayload } from '../types/quiz';
import { QuizResult } from '../types/result';

/**
 * Service managing quiz loading, answer submission, and assessment result retrieval.
 */
export const quizApi = {
  /**
   * Generates a balanced role-based quiz covering all required skills.
   *
   * @param roleId role primary key
   * @returns ApiResponse containing QuizSession with questions
   */
  async getQuiz(roleId: number): Promise<ApiResponse<QuizSession>> {
    try {
      const response = await apiClient.get<ApiResponse<QuizSession>>(`/roles/${roleId}/quiz`);
      return response.data;
    } catch (error) {
      console.error(`quizApi.ts: Failed to generate quiz for role ${roleId}`, error);
      throw error;
    }
  },

  /**
   * Submits selected answers for authoritative backend scoring and gap calculation.
   *
   * @param payload student answers and attempt identifiers
   * @returns ApiResponse containing evaluated QuizResult
   */
  async submitQuiz(payload: QuizSubmissionPayload): Promise<ApiResponse<QuizResult>> {
    try {
      const response = await apiClient.post<ApiResponse<QuizResult>>('/quiz/submit', payload);
      return response.data;
    } catch (error) {
      console.error('quizApi.ts: Quiz submission call failed', error);
      throw error;
    }
  },

  /**
   * Retrieves previous quiz attempt evaluation result by attempt ID.
   *
   * @param attemptId attempt primary key
   * @returns ApiResponse containing QuizResult
   */
  async getResult(attemptId: number): Promise<ApiResponse<QuizResult>> {
    try {
      const response = await apiClient.get<ApiResponse<QuizResult>>(`/quiz/results/${attemptId}`);
      return response.data;
    } catch (error) {
      console.error(`quizApi.ts: Failed to get result for attempt ${attemptId}`, error);
      throw error;
    }
  },
};

export default quizApi;
