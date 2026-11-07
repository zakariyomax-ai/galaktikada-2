export type QuestionType = 'choice' | 'single_word';

export type QuestionCategory = 
  | 'Asar syujeti' 
  | 'Qahramonlar' 
  | 'Kosmik sirlar' 
  | 'Muallif va asar tarixi';

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options: string[];
  correctOptionIndex: number;
  singleWordAnswer: string;
  acceptableAnswers: string[];
  category: QuestionCategory;
  explanation: string;
  hint?: string;
}

export type QuizMode = 'choice' | 'single_word' | 'mixed';

export interface QuizSettings {
  questionCount: number; // 20 to 50
  mode: QuizMode;
  category: 'all' | QuestionCategory;
  timeLimitMinutes: number; // 0 for unlimited, or e.g. 20, 30, 45
}

export interface UserAnswer {
  questionId: number;
  selectedOptionIndex?: number;
  writtenAnswer?: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  scorePercentage: number;
  timeSpentTotalSeconds: number;
  date: string;
  userAnswers: UserAnswer[];
  rankTitle: string;
  rankBadge: string;
  mode: QuizMode;
}
