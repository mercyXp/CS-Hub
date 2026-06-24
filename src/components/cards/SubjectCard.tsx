import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SubjectIcon } from "@/lib/icons";
import type { Subject } from "@/types";

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const conceptCount = subject.levels.reduce(
    (acc, level) => acc + level.concepts.length,
    0
  );

  return (
    <Link href={`/subjects/${subject.slug}`} className="group block">
      <Card hover className="h-full">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
            <SubjectIcon name={subject.icon} className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-[var(--text)] group-hover:text-[var(--primary)]">
              {subject.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">
              {subject.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--text-muted)]">
                {subject.levels.length} levels · {conceptCount} concepts
              </span>
              <ArrowRight className="h-4 w-4 text-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
