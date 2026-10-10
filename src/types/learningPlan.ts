import { StudentProfile } from './student';
import { SkillGap } from './skill';

/**
 * Single actionable item or milestone in personalized curriculum.
 */
export interface LearningPlanItem {
  planId: number;
  studentId: number;
  skill: string;
  topic: string;
  activity: string;
  priority: number;
  progress: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  createdDate?: string;
}

/**
 * Top-level personalized learning plan bundle.
 */
export interface LearningPlanResponse {
  studentId: number;
  roleName: string;
  summary: string;
  retakeRecommendation: string;
  items: LearningPlanItem[];
}

/**
 * Payload for updating progress on a learning item.
 */
export interface ProgressUpdateRequest {
  progress: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

/**
 * Aggregated telemetry data for the main dashboard.
 */
export interface DashboardData {
  student: StudentProfile;
  targetRole: string;
  targetRoleId: number;
  latestQuizScore: number;
  overallLevel: number;
  skillGaps: SkillGap[];
  recommendedNext: string[];
  learningProgress: LearningPlanItem[];
  completedActivitiesCount: number;
  totalActivitiesCount: number;
  overallProgressPercentage: number;
}
