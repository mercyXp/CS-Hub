import type { RichConceptContent } from "@/content/types";

/**
 * Template — copy this file to create a new concept.
 *
 * 1. Copy to: l{level}/{concept-id}.ts  (e.g. l1/l1-c2.ts)
 * 2. Fill in content (MDX markdown) and quizzes
 * 3. Import in ../index.ts and add to the export object
 *
 * Preview URL:
 * /subjects/mathematics/levels/l1/concepts/l1-c2
 */
const concept: RichConceptContent = {
  content: `## Concept Title

Write your explanation here. Supports **bold**, lists, tables, and math:

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

<KeyPoint>Highlight important ideas with KeyPoint.</KeyPoint>

<Warning>Flag exam traps with Warning.</Warning>

### Example

\`\`\`text
code or pseudocode here
\`\`\`
`,
  quizzes: [
    {
      id: "unique-quiz-id",
      type: "mcq",
      question: "Your question here?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      hint: "Optional hint",
      explanation: "Shown after answering",
    },
    {
      id: "unique-task-id",
      type: "task",
      question: "Open-ended question?",
      sampleAnswer: "Model answer for the student to compare",
      placeholder: "Type your answer…",
    },
    {
      id: "unique-tf-id",
      type: "true-false",
      question: "True or false statement?",
      correctAnswer: true,
      explanation: "Why this is true/false",
    },
  ],
};

export default concept;
