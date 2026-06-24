import { cybersecurityTrack } from "./cybersecurity";
import type { Level } from "@/types";

export interface SkillTrack {
  slug: string;
  title: string;
  description: string;
  icon: string;
  levels: Level[];
}

const skillTracks: Record<string, SkillTrack> = {
  cybersecurity: cybersecurityTrack,
};

export function getSkillTrack(slug: string): SkillTrack | undefined {
  return skillTracks[slug];
}

export function getSkillLevel(trackSlug: string, levelId: string) {
  return getSkillTrack(trackSlug)?.levels.find((l) => l.id === levelId);
}

export function getSkillConcept(
  trackSlug: string,
  levelId: string,
  conceptId: string
) {
  return getSkillLevel(trackSlug, levelId)?.concepts.find(
    (c) => c.id === conceptId
  );
}

export function getAllSkillTracks(): SkillTrack[] {
  return Object.values(skillTracks);
}
