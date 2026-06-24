import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href: string;
  label?: string;
}

export function BackButton({ href, label = "Back" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--background-elevated)] hover:text-[var(--primary)]"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
