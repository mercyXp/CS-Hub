import type { Quiz } from "@/types";

export interface RichConceptContent {
  content: string;
  quizzes: Quiz[];
}

/** Registry key: `{subjectSlug}-{levelId}-{conceptId}` */
export type ConceptContentKey = string;

export type SubjectConceptMap = Record<string, RichConceptContent>;
