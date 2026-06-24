import { createElement } from "react";
import {
  Atom,
  Container,
  Database,
  FileCode,
  GitBranch,
  Layers,
  Server,
  Shield,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const skillIconMap: Record<string, LucideIcon> = {
  Atom,
  FileCode,
  Layers,
  Terminal,
  Server,
  GitBranch,
  Database,
  Container,
  Shield,
};

interface SkillIconProps {
  name: string;
  className?: string;
}

export function SkillIcon({ name, className }: SkillIconProps) {
  return createElement(skillIconMap[name] ?? Atom, { className });
}
