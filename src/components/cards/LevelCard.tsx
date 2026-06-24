import Link from "next/link";
import { Layers } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { trackLevelPath, type TrackKind } from "@/lib/track-paths";
import type { Level } from "@/types";

interface LevelCardProps {
  level: Level;
  trackSlug: string;
  track?: TrackKind;
}

export function LevelCard({
  level,
  trackSlug,
  track = "subjects",
}: LevelCardProps) {
  return (
    <Link
      href={trackLevelPath(track, trackSlug, level.id)}
      className="group block"
    >
      <Card hover className="h-full">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
            <span className="text-lg font-bold">{level.number}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[var(--primary)]" />
              <span className="text-xs font-medium uppercase tracking-wide text-[var(--primary)]">
                Level {level.number}
              </span>
            </div>
            <h3 className="mt-1 text-lg font-semibold text-[var(--text)] group-hover:text-[var(--primary)]">
              {level.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {level.description}
            </p>
            <p className="mt-3 text-xs font-medium text-[var(--text-muted)]">
              {level.concepts.length} concepts
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
