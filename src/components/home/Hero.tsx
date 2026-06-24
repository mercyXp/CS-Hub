import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] px-6 py-10 shadow-[var(--shadow)] sm:px-10 sm:py-14">
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[var(--primary-soft)] opacity-60 blur-3xl" />
      <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-[var(--primary-soft)] opacity-40 blur-3xl" />

      <div className="relative">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--primary-soft)] px-4 py-1.5 text-sm font-medium text-[var(--primary)]">
          <Sparkles className="h-4 w-4" />
          Concept-based learning
        </div>

        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-[var(--text)] sm:text-4xl lg:text-5xl">
          Master Computer Science,{" "}
          <span className="text-[var(--primary)]">one concept at a time</span>
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          A clean, structured platform designed for students. Explore six core
          subjects, progress through levels, and dive deep into every concept
          with examples and practice questions.
        </p>
      </div>
    </section>
  );
}
