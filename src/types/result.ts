/**
 * Granular skill evaluation result returned from backend.
 */
export interface SkillResult {
  skillId: number;
  skill: string;
  skillName: string;
  score: number;
  level: number;
  requiredLevel: number;
  gap: number;
  wrongTopics: string[];
  priority: number;
}

/**
 * Complete evaluation report of a completed quiz attempt.
 */
export interface QuizResult {
  attemptId: number;
  roleId: number;
  roleName: string;
  overallScore: number;
  overallLevel: number;
  attemptDate: string;
  skills: SkillResult[];
}
