import type { ConceptProgress, QuizAttempt } from "@/types";

const STORAGE_KEY = "cshub-progress";

type ProgressStore = Record<string, ConceptProgress>;

const listeners = new Set<() => void>();

let snapshot: ProgressStore =
  typeof window !== "undefined" ? readStoreFromDisk() : {};

function readStoreFromDisk(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressStore) : {};
  } catch {
    return {};
  }
}

function readStore(): ProgressStore {
  if (typeof window === "undefined") return {};
  return readStoreFromDisk();
}

function writeStore(store: ProgressStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function refreshSnapshot() {
  snapshot = readStoreFromDisk();
  listeners.forEach((listener) => listener());
}

export function subscribeProgress(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getProgressSnapshot(): ProgressStore {
  return snapshot;
}

export function recordQuizAttempt(
  conceptId: string,
  quizId: string,
  correct: boolean
) {
  const store = readStore();
  const existing = store[conceptId] ?? {
    conceptId,
    completed: false,
    quizScore: 0,
    totalQuizzes: 0,
    attempts: [],
    lastVisited: Date.now(),
  };

  const attempt: QuizAttempt = {
    quizId,
    conceptId,
    correct,
    timestamp: Date.now(),
  };

  existing.attempts = [...existing.attempts, attempt];
  existing.lastVisited = Date.now();

  const uniqueCorrect = new Set(
    existing.attempts.filter((a) => a.correct).map((a) => a.quizId)
  );
  existing.quizScore = uniqueCorrect.size;

  store[conceptId] = existing;
  writeStore(store);
  refreshSnapshot();
}

export function markConceptVisited(conceptId: string, totalQuizzes: number) {
  const store = readStore();
  const existing = store[conceptId] ?? {
    conceptId,
    completed: false,
    quizScore: 0,
    totalQuizzes,
    attempts: [],
    lastVisited: Date.now(),
  };

  existing.totalQuizzes = totalQuizzes;
  existing.lastVisited = Date.now();
  existing.completed = existing.quizScore >= totalQuizzes && totalQuizzes > 0;

  store[conceptId] = existing;
  writeStore(store);
  refreshSnapshot();
}

export function getConceptProgress(conceptId: string): ConceptProgress | null {
  return snapshot[conceptId] ?? null;
}

export function getAllProgress(): ProgressStore {
  return snapshot;
}

/** Level 1 is always unlocked; level N unlocks when all concepts in level N-1 are completed. */
export function isLevelUnlocked(
  _subjectSlug: string,
  levelNumber: number,
  getPrevLevelConceptIds: () => string[]
): boolean {
  if (levelNumber <= 1) return true;
  const prevIds = getPrevLevelConceptIds();
  if (prevIds.length === 0) return true;
  return prevIds.every((id) => snapshot[id]?.completed);
}

export function getSubjectScore(subjectConceptIds: string[]): {
  completed: number;
  total: number;
  percent: number;
} {
  const completed = subjectConceptIds.filter(
    (id) => snapshot[id]?.completed
  ).length;
  const total = subjectConceptIds.length;
  return {
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}
