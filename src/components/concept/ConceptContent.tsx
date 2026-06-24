import { MdxContent } from "@/components/mdx/MdxContent";
import { QuizSection } from "@/components/quiz/QuizSection";
import type { Concept } from "@/types";

interface ConceptContentProps {
  concept: Concept;
}

export function ConceptContent({ concept }: ConceptContentProps) {
  return (
    <article className="space-y-10">
      <section>
        <MdxContent source={concept.content} />
      </section>

      <QuizSection quizzes={concept.quizzes} conceptId={concept.id} />
    </article>
  );
}
