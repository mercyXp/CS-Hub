import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { SubjectCard } from "@/components/cards/SubjectCard";
import { SkillCard } from "@/components/cards/SkillCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { subjects } from "@/data/subjects";
import { skills } from "@/data/skills";

export default function HomePage() {
  return (
    <div className="page-enter space-y-10">
      <Hero />

      <section id="search" className="scroll-mt-24">
        <h2 className="mb-4 text-xl font-semibold text-[var(--text)]">
          Search
        </h2>
        <SearchBar />
      </section>

      <section id="subjects" className="scroll-mt-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              Explore Subjects
            </h2>
            <p className="mt-1 text-[var(--text-muted)]">
              Six core areas of computer science, each with 4 levels and
              concept-based lessons.
            </p>
          </div>
          <Link
            href="/subjects"
            className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
          >
            View all subjects →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      <section id="skills" className="scroll-mt-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              Explore Skills
            </h2>
            <p className="mt-1 text-[var(--text-muted)]">
              Practical tracks for the tools and technologies you&apos;ll use in
              real projects.
            </p>
          </div>
          <Link
            href="/skills"
            className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
          >
            View all skills →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.slice(0, 6).map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  );
}
