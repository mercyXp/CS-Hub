import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { ConceptCard } from "@/components/cards/ConceptCard";
import {
  getSkillTrack,
  getSkillLevel,
  getAllSkillTracks,
} from "@/data/skill-tracks";

interface SkillLevelPageProps {
  params: Promise<{ skillId: string; levelId: string }>;
}

export async function generateStaticParams() {
  return getAllSkillTracks().flatMap((track) =>
    track.levels.map((level) => ({
      skillId: track.slug,
      levelId: level.id,
    }))
  );
}

export async function generateMetadata({ params }: SkillLevelPageProps) {
  const { skillId, levelId } = await params;
  const track = getSkillTrack(skillId);
  const level = getSkillLevel(skillId, levelId);
  if (!track || !level) return { title: "Level Not Found" };
  return {
    title: `${level.title} — ${track.title} — CS Hub`,
    description: level.description,
  };
}

export default async function SkillLevelPage({ params }: SkillLevelPageProps) {
  const { skillId, levelId } = await params;
  const track = getSkillTrack(skillId);
  const level = getSkillLevel(skillId, levelId);

  if (!track || !level) notFound();

  return (
    <div className="page-enter space-y-8">
      <BackButton href={`/skills/${track.slug}`} label={track.title} />

      <header>
        <span className="inline-block rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
          Level {level.number}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-[var(--text)] sm:text-3xl">
          {level.title}
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
          {level.description}
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-[var(--text)]">
          Concepts
        </h2>
        <p className="mb-6 text-sm text-[var(--text-muted)]">
          Tap a concept to read the full explanation, examples, and interactive
          quizzes.
        </p>
        <div className="grid gap-3">
          {level.concepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              trackSlug={track.slug}
              levelId={level.id}
              track="skills"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
