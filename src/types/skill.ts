/**
 * Technical skill details.
 */
export interface Skill {
  skillId: number;
  skillName: string;
  category: string;
}

/**
 * Objective skill gap representation comparing benchmark to quiz score.
 */
export interface SkillGap {
  skillId: number;
  skill: string;
  skillName: string;
  requiredLevel: number;
  currentLevel: number;
  score: number;
  gap: number;
  weakTopics: string[];
  priority: number;
}
