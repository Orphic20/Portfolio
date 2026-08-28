import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Download, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Single-hue ambient wash behind the headline. */}
      <div
        aria-hidden="true"
        className="from-brand/12 pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[32rem] bg-gradient-to-b via-transparent to-transparent blur-2xl"
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-8 sm:pt-24 sm:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="type-eyebrow text-primary mb-6 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="bg-primary inline-block size-1.5 animate-pulse rounded-full"
              />
              Open to OJT / internship
            </p>

            <h1
              id="hero-heading"
              className="type-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl"
            >
              {site.name}
            </h1>

            <p className="text-foreground/90 mt-6 text-lg font-medium sm:text-xl">
              {site.role}
            </p>

            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
              {site.summary}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="#projects">
                  View projects
                  <ArrowDownRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={site.resume} target="_blank" rel="noopener noreferrer">
                  <Download aria-hidden="true" />
                  Download resume
                </a>
              </Button>
            </div>
          </div>

          <div className="order-first lg:order-last lg:justify-self-end">
            <div className="relative w-fit">
              {/* Accent halo so the portrait's white studio backdrop sits on
                  the page deliberately rather than floating. */}
              <div
                aria-hidden="true"
                className="bg-brand/15 absolute -inset-3 rounded-full blur-xl"
              />
              <Image
                src={site.portrait}
                alt={site.name}
                width={800}
                height={800}
                priority
                sizes="(min-width: 1024px) 15rem, 10rem"
                className="ring-border relative size-32 rounded-full object-cover ring-1 sm:size-40 lg:size-60"
              />
            </div>
          </div>
        </div>

        <dl className="text-muted-foreground mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs tracking-wide">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin aria-hidden="true" className="size-3.5" />
            <dd>{site.location}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-foreground/60">Program</dt>
            <dd>BS Information Technology, CLSU</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-foreground/60">Standing</dt>
            <dd>Presidential Lister</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
