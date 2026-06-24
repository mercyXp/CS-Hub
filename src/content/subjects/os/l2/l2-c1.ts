import type { RichConceptContent } from "@/content/types";

const concept: RichConceptContent = {
  content: `## Process Management

**Process management** is one of the core responsibilities of an operating system. It creates, schedules, suspends, and terminates processes so that programs can share the CPU fairly and efficiently.

A **process** is a program in execution — it has its own memory space, file descriptors, and state. A **thread** is a lightweight unit of execution *within* a process; threads share the same memory but have separate stacks and registers.

### Why it matters

Without process management, multiple programs could corrupt each other's memory, starve for CPU time, or leave the system in an inconsistent state.

### Key states of a process

| State | Description |
|-------|-------------|
| New | Process is being created |
| Ready | Waiting to be assigned to a CPU |
| Running | Instructions are being executed |
| Waiting | Waiting for I/O or an event |
| Terminated | Process has finished |

### Scheduling intuition

When the OS picks the next process to run, it uses a **scheduling algorithm**. A simple metric for comparing algorithms is **turnaround time**:

$$
T_{turnaround} = T_{completion} - T_{arrival}
$$

For *n* processes with burst times $b_1, b_2, \\ldots, b_n$, the **average waiting time** under FCFS is:

$$
W_{avg} = \\frac{1}{n} \\sum_{i=1}^{n} (W_i)
$$

<KeyPoint>Processes are isolated; threads within a process share memory — choose threads for parallelism, processes for isolation.</KeyPoint>

<Warning>Exam questions often confuse concurrency (dealing with many things) with parallelism (doing many things at once). A single-core CPU can be concurrent but not parallel.</Warning>

### Example: context switch

When the OS switches from Process A to Process B:

1. Save A's CPU registers and program counter
2. Update A's state to Ready or Waiting
3. Load B's saved registers and program counter
4. Mark B as Running

\`\`\`text
Process A (Running) → save state → Process B (Running)
\`\`\`
`,
  quizzes: [
    {
      id: "pm-q1",
      type: "mcq",
      question: "What is the main difference between a process and a thread?",
      options: [
        "Processes share memory; threads are isolated",
        "Threads share a process's memory space; processes are isolated",
        "Processes are faster than threads in every case",
        "Threads can only run on multiple CPUs",
      ],
      correctAnswer: 1,
      hint: "Think about memory isolation vs sharing.",
      explanation:
        "Threads within the same process share memory (heap, globals), while each process has its own address space.",
    },
    {
      id: "pm-q2",
      type: "mcq",
      question:
        "Which process state means the process is waiting for an I/O operation to complete?",
      options: ["Ready", "Running", "Waiting", "New"],
      correctAnswer: 2,
      explanation:
        "A process in the Waiting (blocked) state cannot proceed until an external event — often I/O — completes.",
    },
    {
      id: "pm-q3",
      type: "task",
      question:
        "Explain in your own words what happens during a context switch.",
      sampleAnswer:
        "The OS saves the current process's CPU state (registers, PC), selects another ready process, loads its saved state, and resumes execution.",
      placeholder: "Describe the steps of a context switch…",
    },
    {
      id: "pm-q4",
      type: "true-false",
      question:
        "A single-core CPU can exhibit concurrency without true parallelism.",
      correctAnswer: true,
      explanation:
        "Concurrency is about structure (many tasks in progress); parallelism requires multiple execution units running simultaneously.",
    },
  ],
};

export default concept;
