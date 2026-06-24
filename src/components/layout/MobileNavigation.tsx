"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileMenuPanel } from "@/components/layout/MobileMenuPanel";

export function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] text-[var(--text)] md:hidden"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
        <nav
          className={`absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-[var(--background-elevated)] shadow-[var(--shadow-lg)] transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
            <span className="font-semibold text-[var(--text)]">Menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--primary-soft)]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <MobileMenuPanel onClose={() => setMenuOpen(false)} />
        </nav>
      </div>
    </>
  );
}
