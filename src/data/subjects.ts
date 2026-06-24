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

function conceptFromLegacy(
  subjectSlug: string,
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
  const rich = getRichConcept(subjectSlug, levelId, id);
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
    answer: `${topic} is used in software engineering, system design, and academic problem-solving across the field of computer science.`,
  },
  {
    id: "q3",
    question: `What common mistake do students make when learning ${topic}?`,
    answer: `Students often memorize without understanding the underlying concepts. Focus on why something works, not just how.`,
  },
];

const defaultExamples = (topic: string): Example[] => [
  {
    title: "Basic Example",
    content: `Consider a simple scenario involving ${topic}. Start with the smallest case, trace through each step, and verify your understanding before moving to complex cases.`,
  },
  {
    title: "Applied Example",
    content: `In practice, ${topic} connects to larger systems. Engineers use these principles daily when building reliable, efficient software and hardware solutions.`,
  },
];

function levelConcepts(
  subjectSlug: string,
  subjectName: string,
  levelId: string,
  levelNum: number,
  topics: string[]
) {
  return topics.map((topic, i) => {
    const id = `l${levelNum}-c${i + 1}`;
    return conceptFromLegacy(
      subjectSlug,
      levelId,
      id,
      topic,
      `Learn the fundamentals of ${topic} in ${subjectName}.`,
      `${topic} is a key concept at Level ${levelNum} of ${subjectName}. Understanding ${topic} builds on previous knowledge and prepares you for more advanced topics.\n\nAt this stage, focus on grasping the definition, recognizing when to apply it, and practicing with small examples. Take your time with each section — mastery comes from repetition and reflection.`,
      [
        `${topic} forms a foundation for advanced ${subjectName} topics`,
        `Practice identifying ${topic} in different contexts`,
        `Connect ${topic} to concepts from previous levels`,
        `Use diagrams and examples to reinforce understanding`,
      ],
      [
        `Do not skip prerequisites before studying ${topic}`,
        `Exam questions on ${topic} often test application, not just definitions`,
      ],
      defaultExamples(topic),
      defaultPractice(topic)
    );
  });
}

export const subjects = [
  {
    id: "mathematics",
    slug: "mathematics",
    title: "Mathematics",
    description:
      "Build the mathematical foundation essential for computer science — logic, discrete math, and proofs.",
    icon: "Calculator",
    levels: [
      {
        id: "l1",
        number: 1,
        title: "Foundations",
        description: "Numbers, sets, and basic logic",
        concepts: levelConcepts("mathematics", "Mathematics", "l1", 1, [
          "Number Systems & Binary",
          "Sets & Set Operations",
          "Propositional Logic",
          "Truth Tables",
        ]),
      },
      {
        id: "l2",
        number: 2,
        title: "Discrete Structures",
        description: "Relations, functions, and combinatorics",
        concepts: levelConcepts("mathematics", "Mathematics", "l2", 2, [
          "Relations & Equivalence",
          "Functions & Mappings",
          "Permutations & Combinations",
          "The Pigeonhole Principle",
        ]),
      },
      {
        id: "l3",
        number: 3,
        title: "Proof Techniques",
        description: "Mathematical reasoning and proofs",
        concepts: levelConcepts("mathematics", "Mathematics", "l3", 3, [
          "Direct Proof",
          "Proof by Contradiction",
          "Mathematical Induction",
          "Strong Induction",
        ]),
      },
      {
        id: "l4",
        number: 4,
        title: "Advanced Topics",
        description: "Graph theory and complexity basics",
        concepts: levelConcepts("mathematics", "Mathematics", "l4", 4, [
          "Graph Theory Basics",
          "Trees & Spanning Trees",
          "Big-O Notation",
          "Recurrence Relations",
        ]),
      },
    ],
  },
  {
    id: "programming",
    slug: "programming",
    title: "Programming Fundamentals",
    description:
      "Master the building blocks of programming — variables, control flow, functions, and OOP.",
    icon: "Code2",
    levels: [
      {
        id: "l1",
        number: 1,
        title: "Getting Started",
        description: "Syntax, variables, and data types",
        concepts: [
          conceptFromLegacy(
            "programming",
            "l1",
            "l1-c1",
            "Variables & Data Types",
            "Understand how programs store and manipulate data.",
            "Variables are named containers that hold data in memory. Every variable has a type that defines what kind of data it can store — integers, floating-point numbers, characters, booleans, and strings.\n\nChoosing the right data type matters for memory efficiency and correctness. A type mismatch can cause bugs that are hard to trace. Modern languages offer type inference, but understanding types remains essential.",
            [
              "Variables must be declared before use in statically typed languages",
              "Primitive types: int, float, char, bool",
              "Strings are sequences of characters",
              "Type coercion can cause unexpected behavior",
            ],
            [
              "Never assume a variable's type — always verify",
              "Integer overflow is a common exam trap",
            ],
            [
              {
                title: "Declaring Variables",
                content:
                  'int age = 21;\nfloat price = 9.99;\nchar grade = \'A\';\nbool isActive = true;\nstring name = "Alice";',
              },
              {
                title: "Type Conversion",
                content:
                  "int x = 5;\nfloat y = x; // implicit: 5.0\nint z = (int) 3.14; // explicit: 3",
              },
            ],
            defaultPractice("Variables & Data Types")
          ),
          ...levelConcepts("programming", "Programming", "l1", 1, [
            "Input & Output",
            "Operators & Expressions",
            "Comments & Code Style",
          ]).slice(1),
        ],
      },
      {
        id: "l2",
        number: 2,
        title: "Control Flow",
        description: "Conditionals, loops, and branching",
        concepts: levelConcepts("programming", "Programming", "l2", 2, [
          "If-Else Statements",
          "Switch & Match",
          "For Loops",
          "While & Do-While Loops",
        ]),
      },
      {
        id: "l3",
        number: 3,
        title: "Functions & Modularity",
        description: "Reusable code blocks and scope",
        concepts: levelConcepts("programming", "Programming", "l3", 3, [
          "Function Declaration",
          "Parameters & Return Values",
          "Scope & Lifetime",
          "Recursion Basics",
        ]),
      },
      {
        id: "l4",
        number: 4,
        title: "Object-Oriented Programming",
        description: "Classes, objects, and inheritance",
        concepts: levelConcepts("programming", "Programming", "l4", 4, [
          "Classes & Objects",
          "Encapsulation",
          "Inheritance",
          "Polymorphism",
        ]),
      },
    ],
  },
  {
    id: "dsa",
    slug: "dsa",
    title: "Data Structures & Algorithms",
    description:
      "Learn how to organize data and solve problems efficiently with classic structures and algorithms.",
    icon: "GitBranch",
    levels: [
      {
        id: "l1",
        number: 1,
        title: "Linear Structures",
        description: "Arrays, linked lists, stacks, and queues",
        concepts: [
          conceptFromLegacy(
            "dsa",
            "l1",
            "l1-c1",
            "Arrays & Dynamic Arrays",
            "The most fundamental data structure for storing sequences.",
            "An array stores elements in contiguous memory locations, enabling O(1) random access by index. Fixed-size arrays cannot grow; dynamic arrays (like Python lists or Java ArrayLists) resize automatically, though resizing has an amortized cost.\n\nArrays are the backbone of most algorithms. Understanding indexing, iteration, and memory layout is critical before moving to more complex structures.",
            [
              "Index-based access is O(1)",
              "Insertion/deletion in the middle is O(n)",
              "Dynamic arrays double capacity when full",
              "Cache locality makes arrays faster than linked lists for iteration",
            ],
            [
              "Array indices start at 0 in most languages — off-by-one errors are common",
              "Accessing out-of-bounds indices causes undefined behavior or exceptions",
            ],
            [
              {
                title: "Array Traversal",
                content:
                  "for (int i = 0; i < arr.length; i++) {\n  System.out.println(arr[i]);\n}",
              },
              {
                title: "Finding Maximum",
                content:
                  "int max = arr[0];\nfor (int val : arr) {\n  if (val > max) max = val;\n}",
              },
            ],
            defaultPractice("Arrays")
          ),
          ...levelConcepts("dsa", "DSA", "l1", 1, [
            "Linked Lists",
            "Stacks",
            "Queues",
          ]).slice(1),
        ],
      },
      {
        id: "l2",
        number: 2,
        title: "Trees & Hashing",
        description: "Hierarchical data and fast lookups",
        concepts: levelConcepts("dsa", "DSA", "l2", 2, [
          "Binary Trees",
          "Binary Search Trees",
          "Hash Tables",
          "Collision Resolution",
        ]),
      },
      {
        id: "l3",
        number: 3,
        title: "Sorting & Searching",
        description: "Classic algorithms and their complexity",
        concepts: levelConcepts("dsa", "DSA", "l3", 3, [
          "Bubble & Selection Sort",
          "Merge Sort",
          "Quick Sort",
          "Binary Search",
        ]),
      },
      {
        id: "l4",
        number: 4,
        title: "Advanced Algorithms",
        description: "Graphs, dynamic programming, and greedy methods",
        concepts: levelConcepts("dsa", "DSA", "l4", 4, [
          "Graph Traversal (BFS/DFS)",
          "Dijkstra's Algorithm",
          "Dynamic Programming",
          "Greedy Algorithms",
        ]),
      },
    ],
  },
  {
    id: "os",
    slug: "os",
    title: "Operating Systems",
    description:
      "Understand how operating systems manage processes, memory, files, and hardware resources.",
    icon: "Monitor",
    levels: [
      {
        id: "l1",
        number: 1,
        title: "OS Fundamentals",
        description: "What an OS does and how it is structured",
        concepts: levelConcepts("os", "Operating Systems", "l1", 1, [
          "Role of the Operating System",
          "Kernel vs User Space",
          "System Calls",
          "Boot Process",
        ]),
      },
      {
        id: "l2",
        number: 2,
        title: "Process Management",
        description: "Processes, threads, and scheduling",
        concepts: levelConcepts("os", "Operating Systems", "l2", 2, [
          "Processes vs Threads",
          "CPU Scheduling",
          "Synchronization",
          "Deadlocks",
        ]),
      },
      {
        id: "l3",
        number: 3,
        title: "Memory Management",
        description: "Virtual memory, paging, and segmentation",
        concepts: levelConcepts("os", "Operating Systems", "l3", 3, [
          "Virtual Memory",
          "Paging & Page Tables",
          "Segmentation",
          "Memory Allocation",
        ]),
      },
      {
        id: "l4",
        number: 4,
        title: "File Systems & I/O",
        description: "Storage, files, and device management",
        concepts: levelConcepts("os", "Operating Systems", "l4", 4, [
          "File System Structure",
          "Directory Implementation",
          "Disk Scheduling",
          "I/O Management",
        ]),
      },
    ],
  },
  {
    id: "architecture",
    slug: "architecture",
    title: "Computer Architecture & Organization",
    description:
      "Explore how computers work at the hardware level — CPUs, memory, and instruction execution.",
    icon: "Cpu",
    levels: [
      {
        id: "l1",
        number: 1,
        title: "Digital Logic",
        description: "Gates, circuits, and number representation",
        concepts: levelConcepts("architecture", "Computer Architecture", "l1", 1, [
          "Logic Gates",
          "Combinational Circuits",
          "Binary Arithmetic",
          "Two's Complement",
        ]),
      },
      {
        id: "l2",
        number: 2,
        title: "CPU Design",
        description: "Instruction sets and processor architecture",
        concepts: levelConcepts("architecture", "Computer Architecture", "l2", 2, [
          "Instruction Set Architecture",
          "Registers & ALU",
          "Instruction Cycle",
          "Pipelining",
        ]),
      },
      {
        id: "l3",
        number: 3,
        title: "Memory Hierarchy",
        description: "Caches, RAM, and storage",
        concepts: levelConcepts("architecture", "Computer Architecture", "l3", 3, [
          "Cache Memory",
          "Cache Mapping",
          "Virtual Memory Hardware",
          "Memory Bandwidth",
        ]),
      },
      {
        id: "l4",
        number: 4,
        title: "Advanced Architecture",
        description: "Parallelism and modern processor design",
        concepts: levelConcepts("architecture", "Computer Architecture", "l4", 4, [
          "Superscalar Processors",
          "Multicore Architecture",
          "GPU Architecture",
          "RISC vs CISC",
        ]),
      },
    ],
  },
  {
    id: "networking",
    slug: "networking",
    title: "Networking & Communication",
    description:
      "Learn how devices communicate — protocols, layers, and the internet.",
    icon: "Network",
    levels: [
      {
        id: "l1",
        number: 1,
        title: "Networking Basics",
        description: "Models, topologies, and physical layer",
        concepts: levelConcepts("networking", "Networking", "l1", 1, [
          "OSI Model Overview",
          "TCP/IP Model",
          "Network Topologies",
          "Transmission Media",
        ]),
      },
      {
        id: "l2",
        number: 2,
        title: "Data Link & Network",
        description: "Frames, IP addressing, and routing",
        concepts: levelConcepts("networking", "Networking", "l2", 2, [
          "MAC Addresses & ARP",
          "IPv4 Addressing",
          "Subnetting",
          "Routing Basics",
        ]),
      },
      {
        id: "l3",
        number: 3,
        title: "Transport & Application",
        description: "TCP, UDP, and common protocols",
        concepts: levelConcepts("networking", "Networking", "l3", 3, [
          "TCP vs UDP",
          "Three-Way Handshake",
          "HTTP & HTTPS",
          "DNS Resolution",
        ]),
      },
      {
        id: "l4",
        number: 4,
        title: "Network Security",
        description: "Encryption, firewalls, and secure communication",
        concepts: levelConcepts("networking", "Networking", "l4", 4, [
          "Symmetric Encryption",
          "Public Key Cryptography",
          "Firewalls & NAT",
          "TLS/SSL",
        ]),
      },
    ],
  },
];

export function getSubjectBySlug(slug: string) {
  return subjects.find((s) => s.slug === slug);
}

export function getLevel(subjectSlug: string, levelId: string) {
  const subject = getSubjectBySlug(subjectSlug);
  return subject?.levels.find((l) => l.id === levelId);
}

export function getConcept(
  subjectSlug: string,
  levelId: string,
  conceptId: string
) {
  const level = getLevel(subjectSlug, levelId);
  return level?.concepts.find((c) => c.id === conceptId);
}
