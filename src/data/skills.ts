export interface Skill {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
  /** Simple skills: topic tags. Track skills: level section names. */
  topics: string[];
  /** Full level → concept structure (like subjects) */
  hasTrack?: boolean;
}

export const skills: Skill[] = [
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Learn to protect systems and data — from fundamentals through offensive and defensive security to strategic leadership.",
    duration: "12 weeks",
    difficulty: "Intermediate",
    icon: "Shield",
    hasTrack: true,
    topics: [
      "Introduction",
      "Fundamentals",
      "Offensive Security",
      "Defensive Security",
      "Strategic Security",
      "Advancement",
    ],
  },
  {
    id: "react",
    slug: "react",
    title: "Learn React",
    description:
      "Build interactive UIs with components, hooks, state management, and modern React patterns.",
    duration: "6 weeks",
    difficulty: "Intermediate",
    icon: "Atom",
    topics: ["JSX", "Hooks", "State", "Context", "Routing"],
  },
  {
    id: "typescript",
    slug: "typescript",
    title: "Learn TypeScript",
    description:
      "Add static typing to JavaScript for safer, more maintainable code in any project.",
    duration: "4 weeks",
    difficulty: "Beginner",
    icon: "FileCode",
    topics: ["Types", "Interfaces", "Generics", "Utility Types"],
  },
  {
    id: "nextjs",
    slug: "nextjs",
    title: "Learn Next.js",
    description:
      "Create full-stack React apps with routing, SSR, API routes, and deployment.",
    duration: "5 weeks",
    difficulty: "Intermediate",
    icon: "Layers",
    topics: ["App Router", "SSR", "API Routes", "Deployment"],
  },
  {
    id: "python",
    slug: "python",
    title: "Learn Python",
    description:
      "Master Python fundamentals for scripting, automation, data work, and backend development.",
    duration: "6 weeks",
    difficulty: "Beginner",
    icon: "Terminal",
    topics: ["Syntax", "Functions", "OOP", "File I/O", "Modules"],
  },
  {
    id: "nodejs",
    slug: "nodejs",
    title: "Learn Node.js",
    description:
      "Build server-side applications with JavaScript, Express, and REST APIs.",
    duration: "5 weeks",
    difficulty: "Intermediate",
    icon: "Server",
    topics: ["Event Loop", "Express", "REST APIs", "Middleware"],
  },
  {
    id: "git",
    slug: "git",
    title: "Learn Git",
    description:
      "Version control essentials — commits, branches, merging, and collaboration workflows.",
    duration: "2 weeks",
    difficulty: "Beginner",
    icon: "GitBranch",
    topics: ["Commits", "Branches", "Merge", "Pull Requests"],
  },
  {
    id: "sql",
    slug: "sql",
    title: "Learn SQL",
    description:
      "Query and manage relational databases with SELECT, JOINs, aggregations, and schema design.",
    duration: "4 weeks",
    difficulty: "Beginner",
    icon: "Database",
    topics: ["SELECT", "JOINs", "Aggregations", "Indexes"],
  },
  {
    id: "docker",
    slug: "docker",
    title: "Learn Docker",
    description:
      "Containerize applications for consistent development and deployment environments.",
    duration: "3 weeks",
    difficulty: "Intermediate",
    icon: "Container",
    topics: ["Images", "Containers", "Dockerfile", "Compose"],
  },
];

export function getSkillBySlug(slug: string) {
  return skills.find((s) => s.slug === slug);
}
