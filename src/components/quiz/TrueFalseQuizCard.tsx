"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { TrueFalseQuiz } from "@/types";
import { recordQuizAttempt } from "@/lib/progress";

interface TrueFalseQuizCardProps {
  quiz: TrueFalseQuiz;
  conceptId: string;
  index: number;
}

export function TrueFalseQuizCard({
  quiz,
  conceptId,
  index,
}: TrueFalseQuizCardProps) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === quiz.correctAnswer;

  function handleSubmit(value: boolean) {
    setSelected(value);
    setSubmitted(true);
    recordQuizAttempt(conceptId, quiz.id, value === quiz.correctAnswer);
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] p-5 shadow-[var(--shadow)]">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
        Question {index + 1} · True or False
      </p>
      <p className="mb-4 text-base font-medium text-[var(--text)]">
        {quiz.question}
      </p>

      <div className="flex flex-wrap gap-3">
        {[true, false].map((value) => {
          const label = value ? "True" : "False";
          let style =
            "border-[var(--border)] hover:border-[var(--primary)]";

          if (submitted) {
            if (value === quiz.correctAnswer) {
              style = "border-[var(--primary)] bg-[var(--primary-soft)]";
            } else if (value === selected) {
              style = "border-[var(--accent-red)] bg-[var(--accent-red-soft)]";
            }
          }

          return (
            <button
              key={label}
              type="button"
              disabled={submitted}
              onClick={() => handleSubmit(value)}
              className={`min-w-[100px] rounded-xl border px-6 py-3 text-sm font-medium text-[var(--text)] ${style}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="mt-4 space-y-2">
          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              isCorrect ? "text-[var(--primary)]" : "text-[var(--accent-red)]"
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5" /> Correct!
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5" /> Incorrect.
              </>
            )}
          </div>
          {quiz.explanation && (
            <p className="text-sm text-[var(--text-muted)]">
              {quiz.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
