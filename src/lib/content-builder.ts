import type { Example, Quiz } from "@/types";

/** Build default MDX markdown from structured fields (for bulk concepts). */
export function buildMarkdownContent(
  title: string,
  explanation: string,
  keyPoints: string[],
  warnings: string[],
  examples: Example[]
): string {
  const sections: string[] = [`## ${title}`, "", explanation];

  if (keyPoints.length > 0) {
    sections.push("", "### Key Points", "");
    keyPoints.forEach((point) => sections.push(`- ${point}`));
  }

  if (warnings.length > 0) {
    sections.push("", "### Important Warnings", "");
    warnings.forEach((w) => sections.push(`<Warning>${w}</Warning>`));
  }

  if (examples.length > 0) {
    sections.push("", "### Examples", "");
    examples.forEach((ex) => {
      sections.push(`#### ${ex.title}`, "", "```", ex.content, "```", "");
    });
  }

  return sections.join("\n");
}

/** Convert legacy practice Q&A into interactive task quizzes. */
export function practiceToTasks(
  questions: { id: string; question: string; answer: string }[]
): Quiz[] {
  return questions.map((q) => ({
    id: q.id,
    type: "task" as const,
    question: q.question,
    sampleAnswer: q.answer,
    placeholder: "Type your answer here…",
  }));
}

const defaultMcq = (topic: string, id: string): Quiz => ({
  id,
  type: "mcq",
  question: `Which statement best describes ${topic}?`,
  options: [
    `It is a core concept that builds on prior knowledge in the subject.`,
    `It is unrelated to other topics in computer science.`,
    `It only applies to hardware, never software.`,
    `It has no practical applications.`,
  ],
  correctAnswer: 0,
  hint: "Think about how this topic connects to the broader subject.",
  explanation: `${topic} is foundational and connects to many other areas of computer science.`,
});

export function defaultQuizzes(topic: string): Quiz[] {
  return [
    defaultMcq(topic, "q1"),
    {
      id: "q2",
      type: "task",
      question: `Give a real-world application of ${topic}.`,
      sampleAnswer: `${topic} is used in software engineering, system design, and academic problem-solving.`,
      placeholder: "Describe a practical use case…",
    },
    {
      id: "q3",
      type: "true-false",
      question: `Understanding ${topic} is only about memorizing definitions.`,
      correctAnswer: false,
      explanation:
        "Concept mastery requires understanding why something works, not just memorizing definitions.",
    },
  ];
}
