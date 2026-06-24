"use client";

import { useEffect } from "react";
import { markConceptVisited } from "@/lib/progress";

interface ConceptTrackerProps {
  conceptId: string;
  totalQuizzes: number;
}

export function ConceptTracker({
  conceptId,
  totalQuizzes,
}: ConceptTrackerProps) {
  useEffect(() => {
    markConceptVisited(conceptId, totalQuizzes);
  }, [conceptId, totalQuizzes]);

  return null;
}
