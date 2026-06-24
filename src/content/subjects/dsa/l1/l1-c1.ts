import type { RichConceptContent } from "@/content/types";

const concept: RichConceptContent = {
  content: `## Arrays & Dynamic Arrays

An **array** stores elements in **contiguous memory**, enabling $O(1)$ random access by index.

### Access time

$$
T_{access}(i) = O(1)
$$

### Insertion in the middle

Shifting elements after insertion costs:

$$
T_{insert}(n) = O(n)
$$

<KeyPoint>Cache locality makes arrays faster than linked lists for sequential iteration — elements sit next to each other in memory.</KeyPoint>

<Warning>Array indices start at 0 in most languages. Off-by-one errors are the #1 array bug in exams and production code.</Warning>

### Traversal

\`\`\`java
for (int i = 0; i < arr.length; i++) {
  System.out.println(arr[i]);
}
\`\`\`

### Finding the maximum

\`\`\`java
int max = arr[0];
for (int val : arr) {
  if (val > max) max = val;
}
\`\`\`

### Dynamic arrays

When a dynamic array is full, it typically **doubles capacity** — insertion is $O(1)$ *amortized*.
`,
  quizzes: [
    {
      id: "arr-q1",
      type: "mcq",
      question:
        "What is the time complexity of accessing arr[i] in a standard array?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswer: 2,
      explanation: "Index-based access is direct — constant time O(1).",
    },
    {
      id: "arr-q2",
      type: "mcq",
      question: "Why are arrays often faster than linked lists for iteration?",
      options: [
        "Arrays use less memory always",
        "Better cache locality from contiguous memory",
        "Arrays have O(1) insertion",
        "Linked lists cannot be traversed",
      ],
      correctAnswer: 1,
      hint: "Think about how the CPU cache works.",
    },
    {
      id: "arr-q3",
      type: "true-false",
      question: "Dynamic array insertion is always O(1) worst-case.",
      correctAnswer: false,
      explanation:
        "Resizing requires copying all elements — worst case is O(n), but amortized over many inserts it is O(1).",
    },
  ],
};

export default concept;
