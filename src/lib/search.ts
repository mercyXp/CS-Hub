import type { SearchResult } from "@/types";
import { subjects } from "@/data/subjects";

export function searchContent(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const subject of subjects) {
    if (
      subject.title.toLowerCase().includes(q) ||
      subject.description.toLowerCase().includes(q)
    ) {
      results.push({
        type: "subject",
        subjectId: subject.id,
        subjectTitle: subject.title,
        title: subject.title,
        summary: subject.description,
        href: `/subjects/${subject.slug}`,
      });
    }

    for (const level of subject.levels) {
      if (
        level.title.toLowerCase().includes(q) ||
        level.description.toLowerCase().includes(q)
      ) {
        results.push({
          type: "level",
          subjectId: subject.id,
          subjectTitle: subject.title,
          levelId: level.id,
          levelTitle: level.title,
          title: `${level.title} — ${subject.title}`,
          summary: level.description,
          href: `/subjects/${subject.slug}/levels/${level.id}`,
        });
      }

      for (const concept of level.concepts) {
        if (
          concept.title.toLowerCase().includes(q) ||
          concept.summary.toLowerCase().includes(q) ||
          concept.content.toLowerCase().includes(q)
        ) {
          results.push({
            type: "concept",
            subjectId: subject.id,
            subjectTitle: subject.title,
            levelId: level.id,
            levelTitle: level.title,
            conceptId: concept.id,
            title: concept.title,
            summary: concept.summary,
            href: `/subjects/${subject.slug}/levels/${level.id}/concepts/${concept.id}`,
          });
        }
      }
    }
  }

  return results.slice(0, 12);
}
