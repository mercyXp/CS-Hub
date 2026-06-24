"use client";

import { ClipboardCheck } from "lucide-react";
import type { Quiz } from "@/types";
import { McqQuizCard } from "@/components/quiz/McqQuizCard";
import { TaskQuizCard } from "@/components/quiz/TaskQuizCard";
import { TrueFalseQuizCard } from "@/components/quiz/TrueFalseQuizCard";

interface QuizSectionProps {
  quizzes: Quiz[];
  conceptId: string;
}

export function QuizSection({ quizzes, conceptId }: QuizSectionProps) {
  if (quizzes.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-[var(--primary)]" />
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Interactive Quizzes
        </h2>
      </div>
      <p className="text-sm text-[var(--text-muted)]">
        Test your understanding. Your progress is saved locally on this device.
      </p>
      <div className="space-y-4">
        {quizzes.map((quiz, i) => {
          switch (quiz.type) {
            case "mcq":
              return (
                <McqQuizCard
                  key={quiz.id}
                  quiz={quiz}
                  conceptId={conceptId}
                  index={i}
                />
              );
            case "task":
              return (
                <TaskQuizCard
                  key={quiz.id}
                  quiz={quiz}
                  conceptId={conceptId}
                  index={i}
                />
              );
            case "true-false":
              return (
                <TrueFalseQuizCard
                  key={quiz.id}
                  quiz={quiz}
                  conceptId={conceptId}
                  index={i}
                />
              );
          }
        })}
      </div>
    </section>
  );
}
