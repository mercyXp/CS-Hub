import { SkillCard } from "@/components/cards/SkillCard";
import { skills } from "@/data/skills";

export const metadata = {
  title: "Skills — CS Hub",
  description:
    "Practical skill tracks to level up — React, TypeScript, Python, Git, and more.",
};

export default function SkillsPage() {
  return (
    <div className="page-enter space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-[var(--text)] sm:text-3xl">
          Skills
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
          Hands-on learning paths for the tools and technologies you&apos;ll use
          in real projects. Pick a skill and start building.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
