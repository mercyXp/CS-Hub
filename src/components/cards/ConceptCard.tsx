import Link from "next/link";
import { ConceptProgressBadge } from "@/components/progress/ConceptProgressBadge";
import { BookOpen, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { trackConceptPath, type TrackKind } from "@/lib/track-paths";
import type { Concept } from "@/types";

interface ConceptCardProps {
  concept: Concept;
  trackSlug: string;
  levelId: string;
  track?: TrackKind;
}

export function ConceptCard({
  concept,
  trackSlug,
  levelId,
  track = "subjects",
}: ConceptCardProps) {
  return (
    <Link
      href={trackConceptPath(track, trackSlug, levelId, concept.id)}
      className="group block"
    >
      <Card hover className="h-full">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-[var(--primary)]">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)]">
                {concept.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">
                {concept.summary}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <ConceptProgressBadge
                  conceptId={concept.id}
                  totalQuizzes={concept.quizzes.length}
                />
              </div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--primary)]" />
        </div>
      </Card>
    </Link>
  );
}
