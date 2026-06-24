import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { LevelCard } from "@/components/cards/LevelCard";
import { getSkillBySlug } from "@/data/skills";
import { getSkillTrack } from "@/data/skill-tracks";
import { SkillIcon } from "@/lib/skill-icons";

interface SkillPageProps {
  params: Promise<{ skillId: string }>;
}

export async function generateStaticParams() {
  const { skills } = await import("@/data/skills");
  return skills.map((s) => ({ skillId: s.slug }));
}

export async function generateMetadata({ params }: SkillPageProps) {
  const { skillId } = await params;
  const skill = getSkillBySlug(skillId);
  if (!skill) return { title: "Skill Not Found" };
  return {
    title: `${skill.title} — CS Hub`,
    description: skill.description,
  };
}

export default async function SkillDetailPage({ params }: SkillPageProps) {
  const { skillId } = await params;
  const skill = getSkillBySlug(skillId);

  if (!skill) notFound();

  const track = skill.hasTrack ? getSkillTrack(skill.slug) : undefined;

  if (track) {
    return (
      <div className="page-enter space-y-8">
        <BackButton href="/skills" label="All Skills" />

        <header className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
            <SkillIcon name={track.icon} className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)] sm:text-3xl">
              {track.title}
            </h1>
            <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
              {track.description}
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
            Levels
          </h2>
          <p className="mb-6 text-sm text-[var(--text-muted)]">
            Progress through six stages — from introduction to advanced security
            practice. Each level builds on the previous one.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {track.levels.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                trackSlug={track.slug}
                track="skills"
              />
            ))}
          </div>
        </section>
      </div>
    );
  }

  const { default: SimpleSkillPage } = await import(
    "@/components/skills/SimpleSkillDetail"
  );
  return <SimpleSkillPage skill={skill} />;
}
