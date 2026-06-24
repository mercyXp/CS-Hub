"use client";

import { useState } from "react";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import type { McqQuiz } from "@/types";
import { recordQuizAttempt } from "@/lib/progress";

interface McqQuizCardProps {
  quiz: McqQuiz;
  conceptId: string;
  index: number;
}

export function McqQuizCard({ quiz, conceptId, index }: McqQuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selected === quiz.correctAnswer;

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    recordQuizAttempt(conceptId, quiz.id, selected === quiz.correctAnswer);
  }

  function handleRetry() {
    setSelected(null);
    setSubmitted(false);
    setShowHint(false);
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] p-5 shadow-[var(--shadow)]">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
        Question {index + 1} · Multiple Choice
      </p>
      <p className="mb-4 text-base font-medium text-[var(--text)]">
        {quiz.question}
      </p>

      <div className="space-y-2">
        {quiz.options.map((option, i) => {
          let style =
            "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-soft)]/40";

          if (submitted) {
            if (i === quiz.correctAnswer) {
              style =
                "border-[var(--primary)] bg-[var(--primary-soft)]";
            } else if (i === selected) {
              style =
                "border-[var(--accent-red)] bg-[var(--accent-red-soft)]";
            }
          } else if (selected === i) {
            style = "border-[var(--primary)] bg-[var(--primary-soft)]";
          }

          return (
            <button
              key={i}
              type="button"
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${style}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[var(--text)]">{option}</span>
            </button>
          );
        })}
      </div>

      {quiz.hint && !submitted && (
        <button
          type="button"
          onClick={() => setShowHint(!showHint)}
          className="mt-3 flex items-center gap-1.5 text-sm text-[var(--primary)]"
        >
          <HelpCircle className="h-4 w-4" />
          {showHint ? "Hide hint" : "Show hint"}
        </button>
      )}
      {showHint && quiz.hint && (
        <p className="mt-2 rounded-lg bg-[var(--primary-soft)] px-3 py-2 text-sm text-[var(--text)]">
          {quiz.hint}
        </p>
      )}

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-4 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-40"
        >
          Check answer
        </button>
      ) : (
        <div className="mt-4 space-y-3">
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
                <XCircle className="h-5 w-5" /> Not quite — review the
                explanation.
              </>
            )}
          </div>
          {quiz.explanation && (
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {quiz.explanation}
            </p>
          )}
          <button
            type="button"
            onClick={handleRetry}
            className="text-sm font-medium text-[var(--primary)]"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
