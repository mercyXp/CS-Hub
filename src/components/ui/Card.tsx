import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] p-5 shadow-[var(--shadow)] ${
        hover
          ? "transition-transform hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
