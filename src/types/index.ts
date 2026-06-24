export interface Example {
  title: string;
  content: string;
}

export interface McqQuiz {
  id: string;
  type: "mcq";
  question: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
  explanation?: string;
}

export interface TaskQuiz {
  id: string;
  type: "task";
  question: string;
  placeholder?: string;
  sampleAnswer?: string;
  hint?: string;
}

export interface TrueFalseQuiz {
  id: string;
  type: "true-false";
  question: string;
  correctAnswer: boolean;
  explanation?: string;
}

export type Quiz = McqQuiz | TaskQuiz | TrueFalseQuiz;

export interface Concept {
  id: string;
  slug: string;
  title: string;
  summary: string;
  /** MDX/Markdown body — explanations, theory, formulas */
  content: string;
  /** Interactive quizzes and tasks */
  quizzes: Quiz[];
}

export interface Level {
  id: string;
  number: number;
  title: string;
  description: string;
  concepts: Concept[];
}

export interface Subject {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  levels: Level[];
}

export interface SearchResult {
  type: "subject" | "level" | "concept" | "skill";
  subjectId: string;
  subjectTitle: string;
  levelId?: string;
  levelTitle?: string;
  conceptId?: string;
  title: string;
  summary: string;
  href: string;
}

export interface QuizAttempt {
  quizId: string;
  conceptId: string;
  correct: boolean;
  timestamp: number;
}

export interface ConceptProgress {
  conceptId: string;
  completed: boolean;
  quizScore: number;
  totalQuizzes: number;
  attempts: QuizAttempt[];
  lastVisited: number;
}

export interface LevelProgress {
  levelId: string;
  conceptsCompleted: number;
  totalConcepts: number;
  unlocked: boolean;
}

export interface SubjectProgress {
  subjectId: string;
  levels: Record<string, LevelProgress>;
  overallScore: number;
}
