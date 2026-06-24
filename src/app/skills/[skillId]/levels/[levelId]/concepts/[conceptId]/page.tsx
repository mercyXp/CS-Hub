import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { ConceptContent } from "@/components/concept/ConceptContent";
import { ConceptTracker } from "@/components/progress/ConceptTracker";
import {
  getSkillTrack,
  getSkillLevel,
  getSkillConcept,
  getAllSkillTracks,
} from "@/data/skill-tracks";

interface SkillConceptPageProps {
  params: Promise<{
    skillId: string;
    levelId: string;
    conceptId: string;
  }>;
}

export async function generateStaticParams() {
  return getAllSkillTracks().flatMap((track) =>
    track.levels.flatMap((level) =>
      level.concepts.map((concept) => ({
        skillId: track.slug,
        levelId: level.id,
        conceptId: concept.id,
      }))
    )
  );
}

export async function generateMetadata({ params }: SkillConceptPageProps) {
  const { skillId, levelId, conceptId } = await params;
  const concept = getSkillConcept(skillId, levelId, conceptId);
  if (!concept) return { title: "Concept Not Found" };
  return {
    title: `${concept.title} — CS Hub`,
    description: concept.summary,
  };
}

export default async function SkillConceptPage({ params }: SkillConceptPageProps) {
  const { skillId, levelId, conceptId } = await params;
  const track = getSkillTrack(skillId);
  const level = getSkillLevel(skillId, levelId);
  const concept = getSkillConcept(skillId, levelId, conceptId);

  if (!track || !level || !concept) notFound();

  return (
    <div className="page-enter space-y-8">
      <BackButton
        href={`/skills/${track.slug}/levels/${level.id}`}
        label={`${level.title} — ${track.title}`}
      />

      <header className="border-b border-[var(--border)] pb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
          <span>{track.title}</span>
          <span aria-hidden>·</span>
          <span>Level {level.number}</span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--text)] sm:text-3xl lg:text-4xl">
          {concept.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base text-[var(--text-muted)]">
          {concept.summary}
        </p>
      </header>

      <ConceptTracker
        conceptId={concept.id}
        totalQuizzes={concept.quizzes.length}
      />

      <ConceptContent concept={concept} />
    </div>
  );
}
