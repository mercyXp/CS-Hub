import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getSkillTrack } from "@/data/skill-tracks";
import { SkillIcon } from "@/lib/skill-icons";
import type { Skill } from "@/data/skills";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const track = skill.hasTrack ? getSkillTrack(skill.slug) : undefined;
  const conceptCount = track
    ? track.levels.reduce((acc, l) => acc + l.concepts.length, 0)
    : skill.topics.length;

  const metaLabel = track
    ? `${track.levels.length} levels · ${conceptCount} concepts`
    : `${skill.topics.length} topics`;

  return (
    <Link href={`/skills/${skill.slug}`} className="group block">
      <Card hover className="h-full">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
            <SkillIcon name={skill.icon} className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-[var(--text)] group-hover:text-[var(--primary)]">
              {skill.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">
              {skill.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[var(--primary-soft)] px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
                {skill.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Clock className="h-3 w-3" />
                {skill.duration}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--text-muted)]">
                {metaLabel}
              </span>
              <ArrowRight className="h-4 w-4 text-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
