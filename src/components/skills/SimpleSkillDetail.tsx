import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/Card";
import { SkillIcon } from "@/lib/skill-icons";
import type { Skill } from "@/data/skills";

export default function SimpleSkillDetail({ skill }: { skill: Skill }) {
  return (
    <div className="page-enter space-y-8">
      <BackButton href="/skills" label="All Skills" />

      <header className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
          <SkillIcon name={skill.icon} className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)] sm:text-3xl">
            {skill.title}
          </h1>
          <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
            {skill.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-md bg-[var(--primary-soft)] px-3 py-1 text-sm font-medium text-[var(--primary)]">
              {skill.difficulty}
            </span>
            <span className="rounded-md border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-muted)]">
              {skill.duration}
            </span>
          </div>
        </div>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-[var(--text)]">
          Topics Covered
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {skill.topics.map((topic) => (
            <Card key={topic}>
              <p className="font-medium text-[var(--text)]">{topic}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Lessons and exercises coming soon.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-[var(--primary)]/20 bg-[var(--primary-soft)] px-5 py-4">
        <p className="text-sm text-[var(--text)]">
          Full lesson content for this skill track is on the way. In the
          meantime, explore our{" "}
          <Link href="/subjects" className="font-medium text-[var(--primary)]">
            core subjects
          </Link>{" "}
          or the{" "}
          <Link
            href="/skills/cybersecurity"
            className="font-medium text-[var(--primary)]"
          >
            Cybersecurity track
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
