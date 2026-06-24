import type { RichConceptContent } from "@/content/types";

const concept: RichConceptContent = {
  content: `## Variables & Data Types

Variables are **named containers** that hold data in memory. Every variable has a **type** that defines what kind of value it can store.

### Primitive types

| Type | Example | Description |
|------|---------|-------------|
| \`int\` | \`42\` | Whole numbers |
| \`float\` | \`3.14\` | Decimal numbers |
| \`bool\` | \`true\` | True or false |
| \`char\` | \`'A'\` | Single character |

### Memory model (simplified)

If an integer variable \`x\` stores the value 5:

$$
x \\in \\mathbb{Z}, \\quad \\text{sizeof}(x) = 4 \\text{ bytes (typical)}
$$

<KeyPoint>Choosing the right type prevents bugs and saves memory — use \`int\` for counts, \`float\` for measurements, \`bool\` for flags.</KeyPoint>

<Warning>Integer overflow is a common exam trap. Adding 1 to \`INT_MAX\` wraps around — always consider value ranges.</Warning>

### Declaring variables

\`\`\`c
int age = 21;
float price = 9.99;
bool isActive = true;
char grade = 'A';
\`\`\`

### Type conversion

\`\`\`c
int x = 5;
float y = x;        // implicit: 5.0
int z = (int) 3.14; // explicit: 3
\`\`\`
`,
  quizzes: [
    {
      id: "var-q1",
      type: "mcq",
      question: "Which type is best for storing a true/false flag?",
      options: ["int", "float", "bool", "char"],
      correctAnswer: 2,
      explanation: "bool is designed specifically for boolean true/false values.",
    },
    {
      id: "var-q2",
      type: "true-false",
      question: "Implicit type conversion from int to float is generally safe.",
      correctAnswer: true,
      explanation:
        "Converting an integer to float preserves the numeric value (e.g. 5 → 5.0).",
    },
    {
      id: "var-q3",
      type: "task",
      question: "What happens when you assign 3.14 to an int variable?",
      sampleAnswer:
        "The decimal part is truncated — the int stores 3, not 4 (truncation toward zero).",
    },
  ],
};

export default concept;
