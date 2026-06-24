import { levelConcepts } from "@/lib/build-concepts";

export const cybersecurityTrack = {
  slug: "cybersecurity",
  title: "Cybersecurity",
  description:
    "Learn to protect systems and data — from security fundamentals through offensive and defensive techniques to strategic security leadership.",
  icon: "Shield",
  levels: [
    {
      id: "l1",
      number: 1,
      title: "Introduction",
      description: "What cybersecurity is and why it matters",
      concepts: levelConcepts("cybersecurity", "Introduction", "l1", 1, [
        "What is Cybersecurity?",
        "The CIA Triad",
        "Threat Landscape Overview",
        "Security Roles & Careers",
      ]),
    },
    {
      id: "l2",
      number: 2,
      title: "Fundamentals",
      description: "Core building blocks every security professional needs",
      concepts: levelConcepts("cybersecurity", "Fundamentals", "l2", 2, [
        "Networking for Security",
        "Cryptography Basics",
        "Authentication & Access Control",
        "Security Policies & Standards",
      ]),
    },
    {
      id: "l3",
      number: 3,
      title: "Offensive Security",
      description: "Understanding attacks to build better defenses",
      concepts: levelConcepts(
        "cybersecurity",
        "Offensive Security",
        "l3",
        3,
        [
          "Reconnaissance & OSINT",
          "Vulnerability Assessment",
          "Penetration Testing",
          "Exploitation Fundamentals",
        ]
      ),
    },
    {
      id: "l4",
      number: 4,
      title: "Defensive Security",
      description: "Detect, respond, and harden systems",
      concepts: levelConcepts(
        "cybersecurity",
        "Defensive Security",
        "l4",
        4,
        [
          "Firewalls & Intrusion Detection",
          "Incident Response",
          "Malware Analysis",
          "System Hardening",
        ]
      ),
    },
    {
      id: "l5",
      number: 5,
      title: "Strategic Security",
      description: "Risk, compliance, and security at organizational scale",
      concepts: levelConcepts(
        "cybersecurity",
        "Strategic Security",
        "l5",
        5,
        [
          "Risk Assessment & Management",
          "Compliance & Regulations",
          "Security Governance",
          "Business Continuity Planning",
        ]
      ),
    },
    {
      id: "l6",
      number: 6,
      title: "Advancement",
      description: "Modern security architecture and career growth",
      concepts: levelConcepts("cybersecurity", "Advancement", "l6", 6, [
        "Cloud Security",
        "Zero Trust Architecture",
        "Threat Intelligence",
        "Security Leadership",
      ]),
    },
  ],
};
