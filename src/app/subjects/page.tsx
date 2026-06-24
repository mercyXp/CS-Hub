import { SubjectCard } from "@/components/cards/SubjectCard";
import { subjects } from "@/data/subjects";

export const metadata = {
  title: "Subjects — CS Hub",
  description:
    "Browse all computer science subjects — Mathematics, Programming, DSA, OS, Architecture, and Networking.",
};

export default function SubjectsPage() {
  return (
    <div className="page-enter space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-[var(--text)] sm:text-3xl">
          Subjects
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
          Six core areas of computer science. Each subject has 4 levels with
          concept-based lessons, examples, and practice questions.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
