"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Section anchors only resolve on the home page, so prefix them elsewhere.
  const base = pathname === "/" ? "" : "/";

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="border-border/70 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <a
        href="#main"
        className="bg-primary text-primary-foreground focus-visible:ring-ring sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 lg:h-20">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-md"
          aria-label={`${site.name} — home`}
        >
          <span className="bg-primary text-primary-foreground font-mono text-sm font-bold flex size-9 items-center justify-center rounded-lg tracking-tight transition-transform group-hover:-rotate-6">
            {site.initials}
          </span>
          <span className="hidden text-sm leading-tight sm:block">
            <span className="block font-semibold">Loewin Villanueva</span>
            <span className="text-muted-foreground font-mono text-[0.6875rem] tracking-wide">
              BS IT · CLSU
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`${base}${link.href}`}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={site.resume} target="_blank" rel="noopener noreferrer">
              <FileText aria-hidden="true" />
              Resume
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-border/70 bg-background animate-in slide-in-from-top-2 border-t lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`${base}${link.href}`}
                  onClick={() => setOpen(false)}
                  className="hover:bg-secondary block rounded-md px-3 py-3 text-base font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full">
                <a href={site.resume} target="_blank" rel="noopener noreferrer">
                  <FileText aria-hidden="true" />
                  Download resume
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
