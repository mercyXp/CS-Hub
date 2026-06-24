"use client";

import { useState } from "react";
import { CheckCircle2, Eye, HelpCircle } from "lucide-react";
import type { TaskQuiz } from "@/types";
import { recordQuizAttempt } from "@/lib/progress";

interface TaskQuizCardProps {
  quiz: TaskQuiz;
  conceptId: string;
  index: number;
}

export function TaskQuizCard({ quiz, conceptId, index }: TaskQuizCardProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function handleSubmit() {
    if (!answer.trim()) return;
    setSubmitted(true);
    recordQuizAttempt(conceptId, quiz.id, true);
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] p-5 shadow-[var(--shadow)]">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
        Question {index + 1} · Task
      </p>
      <p className="mb-4 text-base font-medium text-[var(--text)]">
        {quiz.question}
      </p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={submitted}
        placeholder={quiz.placeholder ?? "Write your answer…"}
        rows={4}
        className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
      />

      {quiz.hint && !submitted && (
        <button
          type="button"
          onClick={() => setShowHint(!showHint)}
          className="mt-2 flex items-center gap-1.5 text-sm text-[var(--primary)]"
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
          disabled={!answer.trim()}
          className="mt-4 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-40"
        >
          Submit answer
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
            <CheckCircle2 className="h-5 w-5" />
            Answer recorded — compare with the sample below.
          </div>
          {quiz.sampleAnswer && (
            <>
              <button
                type="button"
                onClick={() => setShowSample(!showSample)}
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--primary)]"
              >
                <Eye className="h-4 w-4" />
                {showSample ? "Hide sample answer" : "Show sample answer"}
              </button>
              {showSample && (
                <p className="rounded-xl bg-[var(--primary-soft)] px-4 py-3 text-sm leading-relaxed text-[var(--text)]">
                  {quiz.sampleAnswer}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
