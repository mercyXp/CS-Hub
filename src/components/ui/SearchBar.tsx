"use client";

import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchContent } from "@/lib/search";
import type { SearchResult } from "@/types";
import Link from "next/link";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onNavigate?: () => void;
}

export function SearchBar({
  placeholder = "Search subjects, levels, concepts...",
  className = "",
  onNavigate,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(
    () => (query.trim() ? searchContent(query) : []),
    [query]
  );

  const open = focused && query.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setQuery("");
      setFocused(false);
      onNavigate?.();
      router.push(href);
    },
    [router, onNavigate]
  );

  const typeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "subject":
        return "Subject";
      case "level":
        return "Level";
      case "concept":
        return "Concept";
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] py-3 pl-11 pr-10 text-base text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          aria-label="Search"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFocused(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-[var(--text-muted)] hover:text-[var(--text)]"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] shadow-[var(--shadow-lg)]">
          {results.map((result, i) => (
            <li key={`${result.href}-${i}`}>
              <button
                type="button"
                onClick={() => handleSelect(result.href)}
                className="flex w-full flex-col gap-0.5 px-4 py-3 text-left hover:bg-[var(--primary-soft)]"
              >
                <span className="flex items-center gap-2">
                  <span className="rounded-md bg-[var(--primary-soft)] px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
                    {typeLabel(result.type)}
                  </span>
                  <span className="font-medium text-[var(--text)]">
                    {result.title}
                  </span>
                </span>
                <span className="line-clamp-1 text-sm text-[var(--text-muted)]">
                  {result.summary}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-6 text-center text-sm text-[var(--text-muted)] shadow-[var(--shadow-lg)]">
          No results found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}

export function SearchBarLink() {
  return (
    <Link
      href="/#search"
      className="flex flex-col items-center gap-1 px-3 py-2 text-[var(--text-muted)] hover:text-[var(--primary)]"
    >
      <Search className="h-5 w-5" />
      <span className="text-xs font-medium">Search</span>
    </Link>
  );
}
