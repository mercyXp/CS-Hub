import type { RichConceptContent } from "@/content/types";

/**
 * Level 1 · Concept 1 — Number Systems & Binary
 * Preview: /subjects/mathematics/levels/l1/concepts/l1-c1
 */
const concept: RichConceptContent = {
  content: `## Number Systems & Binary

Computers store all data as **binary** — base-2 numbers using only digits 0 and 1. Understanding number systems is the foundation for everything else in computer science.

### Decimal to binary

To convert a decimal number to binary, repeatedly divide by 2 and read remainders **bottom to top**.

Example: $13_{10}$

$$
13 \\div 2 = 6 \\text{ r } 1 \\\\
6 \\div 2 = 3 \\text{ r } 0 \\\\
3 \\div 2 = 1 \\text{ r } 1 \\\\
1 \\div 2 = 0 \\text{ r } 1
$$

So $13_{10} = 1101_2$.

Verify:

$$
1101_2 = 1 \\cdot 2^3 + 1 \\cdot 2^2 + 0 \\cdot 2^1 + 1 \\cdot 2^0 = 8 + 4 + 0 + 1 = 13_{10}
$$

<KeyPoint>Each binary digit (bit) represents a power of 2, starting from $2^0$ on the right.</KeyPoint>

<Warning>Leading zeros change the bit-width but not the value — $00001101_2$ and $1101_2$ are the same number.</Warning>

### Hexadecimal

Hex (base-16) is a compact shorthand for binary. One hex digit = 4 bits (a nibble).

| Binary | Hex |
|--------|-----|
| 0000 | 0 |
| 1010 | A |
| 1111 | F |
`,
  quizzes: [
    {
      id: "bin-q1",
      type: "mcq",
      question: "What is 1010₂ in decimal?",
      options: ["8", "10", "12", "16"],
      correctAnswer: 1,
      explanation: "1010₂ = 8 + 2 = 10₁₀",
    },
    {
      id: "bin-q2",
      type: "mcq",
      question: "How many bits are in one hexadecimal digit?",
      options: ["2", "4", "8", "16"],
      correctAnswer: 1,
      explanation: "Each hex digit represents exactly 4 binary digits (a nibble).",
    },
    {
      id: "bin-q3",
      type: "task",
      question: "Convert 25₁₀ to binary. Show your work.",
      sampleAnswer: "25₁₀ = 11001₂ (16 + 8 + 0 + 0 + 1 = 25)",
      placeholder: "Write the binary result…",
    },
  ],
};

export default concept;
