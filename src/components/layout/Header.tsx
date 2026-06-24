"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { NavLink } from "@/components/layout/NavLink";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-[var(--text)]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="hidden font-semibold sm:inline">CS Hub</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/subjects">Subjects</NavLink>
          <NavLink href="/skills">Skills</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNavigation key={pathname} />
        </div>
      </div>
    </header>
  );
}
