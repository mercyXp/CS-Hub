import { createElement } from "react";
import {
  Calculator,
  Code2,
  Cpu,
  GitBranch,
  Monitor,
  Network,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  Code2,
  GitBranch,
  Monitor,
  Cpu,
  Network,
};

interface SubjectIconProps {
  name: string;
  className?: string;
}

export function SubjectIcon({ name, className }: SubjectIconProps) {
  return createElement(iconMap[name] ?? Code2, { className });
}
