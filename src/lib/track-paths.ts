export type TrackKind = "subjects" | "skills";

export function trackLevelPath(
  track: TrackKind,
  slug: string,
  levelId: string
) {
  return `/${track}/${slug}/levels/${levelId}`;
}

export function trackConceptPath(
  track: TrackKind,
  slug: string,
  levelId: string,
  conceptId: string
) {
  return `/${track}/${slug}/levels/${levelId}/concepts/${conceptId}`;
}
