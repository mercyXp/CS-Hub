import type { Concept, Example, Quiz } from "@/types";
import {
  buildMarkdownContent,
  defaultQuizzes,
  practiceToTasks,
} from "@/lib/content-builder";
import { getRichConcept } from "@/content";

function concept(
  id: string,
  title: string,
  summary: string,
  content: string,
  quizzes: Quiz[]
): Concept {
  return { id, slug: id, title, summary, content, quizzes };
}

export function conceptFromLegacy(
  trackSlug: string,
  levelId: string,
  id: string,
  title: string,
  summary: string,
  explanation: string,
  keyPoints: string[],
  warnings: string[],
  examples: Example[],
  practiceQuestions: { id: string; question: string; answer: string }[]
): Concept {
  const rich = getRichConcept(trackSlug, levelId, id);
  if (rich) {
    return concept(id, title, summary, rich.content, rich.quizzes);
  }

  return concept(
    id,
    title,
    summary,
    buildMarkdownContent(title, explanation, keyPoints, warnings, examples),
    practiceQuestions.length > 0
      ? [...defaultQuizzes(title).slice(0, 1), ...practiceToTasks(practiceQuestions)]
      : defaultQuizzes(title)
  );
}

const defaultPractice = (topic: string) => [
  {
    id: "q1",
    question: `What is the core idea behind ${topic}?`,
    answer: `The core idea involves understanding fundamental principles and applying them to solve problems systematically.`,
  },
  {
    id: "q2",
    question: `Give a real-world application of ${topic}.`,
    answer: `${topic} is used in real security operations, risk management, and protecting systems and data.`,
  },
  {
    id: "q3",
    question: `What common mistake do students make when learning ${topic}?`,
    answer: `Students often focus on tools without understanding the underlying security principles.`,
  },
];

const defaultExamples = (topic: string): Example[] => [
  {
    title: "Basic Example",
    content: `Consider a simple scenario involving ${topic}. Start with the smallest case and trace each step.`,
  },
  {
    title: "Applied Example",
    content: `In practice, ${topic} connects to larger security programs — policies, monitoring, and incident response.`,
  },
];

export function levelConcepts(
  trackSlug: string,
  trackName: string,
  levelId: string,
  levelNum: number,
  topics: string[]
): Concept[] {
  return topics.map((topic, i) => {
    const id = `l${levelNum}-c${i + 1}`;
    return conceptFromLegacy(
      trackSlug,
      levelId,
      id,
      topic,
      `Learn the fundamentals of ${topic} in ${trackName}.`,
      `${topic} is a key concept in the ${trackName} track. Understanding ${topic} builds on previous knowledge and prepares you for more advanced security topics.\n\nFocus on grasping definitions, recognizing real-world threats, and connecting ideas to defensive and offensive practices.`,
      [
        `${topic} is essential for a well-rounded security mindset`,
        `Practice identifying ${topic} in news stories and breach reports`,
        `Connect ${topic} to the CIA triad and defense-in-depth`,
        `Use labs and scenarios to reinforce understanding`,
      ],
      [
        `Never study ${topic} in isolation — security is interdisciplinary`,
        `Exam and interview questions on ${topic} often test applied reasoning`,
      ],
      defaultExamples(topic),
      defaultPractice(topic)
    );
  });
}
