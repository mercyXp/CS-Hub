"use client";

import { useSyncExternalStore } from "react";
import {
  getProgressSnapshot,
  subscribeProgress,
} from "@/lib/progress";
import type { ConceptProgress } from "@/types";

interface ConceptProgressBadgeProps {
  conceptId: string;
  totalQuizzes: number;
}

const emptySnapshot: Record<string, ConceptProgress> = {};

function getServerSnapshot() {
  return emptySnapshot;
}

export function ConceptProgressBadge({
  conceptId,
  totalQuizzes,
}: ConceptProgressBadgeProps) {
  const store = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getServerSnapshot
  );

  const quizScore = store[conceptId]?.quizScore ?? 0;

  if (quizScore === 0) return null;

  const done = quizScore >= totalQuizzes && totalQuizzes > 0;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        done
          ? "bg-[var(--primary-soft)] text-[var(--primary)]"
          : "bg-[var(--background)] text-[var(--text-muted)]"
      }`}
    >
      {done ? "Completed" : `${quizScore}/${totalQuizzes} quizzes`}
    </span>
  );
}
