"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";

interface MobileMenuPanelProps {
  onClose: () => void;
}

const menuLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/skills", label: "Skills", icon: Sparkles },
];

export function MobileMenuPanel({ onClose }: MobileMenuPanelProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="border-b border-[var(--border)] p-4">
        <SearchBar onNavigate={onClose} />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {menuLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 font-medium ${
                isActive
                  ? "bg-[var(--primary-soft)] text-[var(--primary)]"
                  : "text-[var(--text)] hover:bg-[var(--primary-soft)]"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
