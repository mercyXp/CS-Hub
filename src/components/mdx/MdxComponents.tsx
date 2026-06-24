import type { ReactNode } from "react";

export function Warning({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 flex gap-3 rounded-xl border border-[var(--accent-red)]/30 bg-[var(--accent-red-soft)] px-4 py-3 not-prose">
      <span className="text-sm font-semibold text-[var(--accent-red)]">
        Warning
      </span>
      <p className="text-sm leading-relaxed text-[var(--text)]">{children}</p>
    </div>
  );
}

export function KeyPoint({ children }: { children: ReactNode }) {
  return (
    <div className="my-2 flex gap-3 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary-soft)] px-4 py-3 not-prose">
      <p className="text-sm leading-relaxed text-[var(--text)]">{children}</p>
    </div>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return (
    <p className="my-2 rounded-lg bg-[var(--primary-soft)] px-3 py-2 text-sm text-[var(--primary)] not-prose">
      <strong>Hint:</strong> {children}
    </p>
  );
}

export const mdxComponents = {
  Warning,
  KeyPoint,
  Hint,
};
