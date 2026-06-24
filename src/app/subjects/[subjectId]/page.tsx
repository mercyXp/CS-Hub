import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { LevelCard } from "@/components/cards/LevelCard";
import { getSubjectBySlug } from "@/data/subjects";
import { SubjectIcon } from "@/lib/icons";

interface SubjectPageProps {
  params: Promise<{ subjectId: string }>;
}

export async function generateStaticParams() {
  const { subjects } = await import("@/data/subjects");
  return subjects.map((s) => ({ subjectId: s.slug }));
}

export async function generateMetadata({ params }: SubjectPageProps) {
  const { subjectId } = await params;
  const subject = getSubjectBySlug(subjectId);
  if (!subject) return { title: "Subject Not Found" };
  return {
    title: `${subject.title} — CS Hub`,
    description: subject.description,
  };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subjectId } = await params;
  const subject = getSubjectBySlug(subjectId);

  if (!subject) notFound();

  return (
    <div className="page-enter space-y-8">
      <BackButton href="/" label="All Subjects" />

      <header className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
          <SubjectIcon name={subject.icon} className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)] sm:text-3xl">
            {subject.title}
          </h1>
          <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
            {subject.description}
          </p>
        </div>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-[var(--text)]">
          Levels
        </h2>
        <p className="mb-6 text-sm text-[var(--text-muted)]">
          Progress from Level 1 to Level 4. Each level builds on the previous
          one.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {subject.levels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              trackSlug={subject.slug}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
