import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { ConceptTracker } from "@/components/progress/ConceptTracker";
import { ConceptContent } from "@/components/concept/ConceptContent";
import { getConcept, getLevel, getSubjectBySlug } from "@/data/subjects";

interface ConceptPageProps {
  params: Promise<{
    subjectId: string;
    levelId: string;
    conceptId: string;
  }>;
}

export async function generateStaticParams() {
  const { subjects } = await import("@/data/subjects");
  return subjects.flatMap((subject) =>
    subject.levels.flatMap((level) =>
      level.concepts.map((concept) => ({
        subjectId: subject.slug,
        levelId: level.id,
        conceptId: concept.id,
      }))
    )
  );
}

export async function generateMetadata({ params }: ConceptPageProps) {
  const { subjectId, levelId, conceptId } = await params;
  const concept = getConcept(subjectId, levelId, conceptId);
  if (!concept) return { title: "Concept Not Found" };
  return {
    title: `${concept.title} — CS Hub`,
    description: concept.summary,
  };
}

export default async function ConceptPage({ params }: ConceptPageProps) {
  const { subjectId, levelId, conceptId } = await params;
  const subject = getSubjectBySlug(subjectId);
  const level = getLevel(subjectId, levelId);
  const concept = getConcept(subjectId, levelId, conceptId);

  if (!subject || !level || !concept) notFound();

  return (
    <div className="page-enter space-y-8">
      <BackButton
        href={`/subjects/${subject.slug}/levels/${level.id}`}
        label={`${level.title} — ${subject.title}`}
      />

      <header className="border-b border-[var(--border)] pb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
          <span>{subject.title}</span>
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
