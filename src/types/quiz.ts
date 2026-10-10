/**
 * Objective question delivered from backend.
 * NOTE: Never contains correctOption to guarantee assessment integrity.
 */
export interface QuizQuestion {
  questionId: number;
  skillId: number;
  skillName: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  topic: string;
}

/**
 * Quiz package bundle for a career role.
 */
export interface QuizSession {
  roleId: number;
  roleName: string;
  totalQuestions: number;
  questions: QuizQuestion[];
}

/**
 * Single answer chosen by student.
 */
export interface QuizAnswer {
  questionId: number;
  selectedOption: 'A' | 'B' | 'C' | 'D';
}

/**
 * Quiz answer submission request body.
 */
export interface QuizSubmissionPayload {
  studentId: number;
  roleId: number;
  answers: QuizAnswer[];
}
