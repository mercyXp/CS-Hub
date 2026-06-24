import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { subjects } from "@/data/subjects";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--background-elevated)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="font-semibold text-[var(--text)]">CS Hub</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              A concept-based computer science learning platform built for
              students. Learn at your own pace with structured levels and
              practice questions.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm text-[var(--text-muted)]">Theme</span>
              <ThemeToggle />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--text)]">Subjects</h4>
            <ul className="mt-3 space-y-2">
              {subjects.map((subject) => (
                <li key={subject.id}>
                  <Link
                    href={`/subjects/${subject.slug}`}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)]"
                  >
                    {subject.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--text)]">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)]"
                >
                  Subjects
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)]"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/#search"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)]"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} CS Hub — Computer Science Learning
          Platform
        </div>
      </div>
    </footer>
  );
}
