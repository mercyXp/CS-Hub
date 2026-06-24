import type { RichConceptContent, SubjectConceptMap } from "@/content/types";
import mathematics from "@/content/subjects/mathematics";
import programming from "@/content/subjects/programming";
import dsa from "@/content/subjects/dsa";
import os from "@/content/subjects/os";
import cybersecurity from "@/content/skills/cybersecurity";

export type { RichConceptContent } from "@/content/types";

/** Subjects and structured skill tracks with rich MDX content. */
const trackContent: Record<string, SubjectConceptMap> = {
  mathematics,
  programming,
  dsa,
  os,
  cybersecurity,
};

function buildRegistry(): Record<string, RichConceptContent> {
  const registry: Record<string, RichConceptContent> = {};

  for (const [trackSlug, concepts] of Object.entries(trackContent)) {
    for (const [conceptKey, content] of Object.entries(concepts)) {
      registry[`${trackSlug}-${conceptKey}`] = content;
    }
  }

  return registry;
}

const richConcepts = buildRegistry();

export function getRichConcept(
  trackSlug: string,
  levelId: string,
  conceptId: string
): RichConceptContent | undefined {
  return richConcepts[`${trackSlug}-${levelId}-${conceptId}`];
}

export function listRichConceptKeys(trackSlug: string): string[] {
  const prefix = `${trackSlug}-`;
  return Object.keys(richConcepts)
    .filter((key) => key.startsWith(prefix))
    .map((key) => key.slice(prefix.length));
}
