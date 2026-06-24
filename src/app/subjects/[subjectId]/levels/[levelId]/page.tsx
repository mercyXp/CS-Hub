import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { ConceptCard } from "@/components/cards/ConceptCard";
import { getLevel, getSubjectBySlug } from "@/data/subjects";

interface LevelPageProps {
  params: Promise<{ subjectId: string; levelId: string }>;
}

export async function generateStaticParams() {
  const { subjects } = await import("@/data/subjects");
  return subjects.flatMap((subject) =>
    subject.levels.map((level) => ({
      subjectId: subject.slug,
      levelId: level.id,
    }))
  );
}

export async function generateMetadata({ params }: LevelPageProps) {
  const { subjectId, levelId } = await params;
  const subject = getSubjectBySlug(subjectId);
  const level = getLevel(subjectId, levelId);
  if (!subject || !level) return { title: "Level Not Found" };
  return {
    title: `${level.title} — ${subject.title} — CS Hub`,
    description: level.description,
  };
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { subjectId, levelId } = await params;
  const subject = getSubjectBySlug(subjectId);
  const level = getLevel(subjectId, levelId);

  if (!subject || !level) notFound();

  return (
    <div className="page-enter space-y-8">
      <BackButton
        href={`/subjects/${subject.slug}`}
        label={subject.title}
      />

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
          Tap a concept to read the full explanation, examples, and practice
          questions.
        </p>
        <div className="grid gap-3">
          {level.concepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              trackSlug={subject.slug}
              levelId={level.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
