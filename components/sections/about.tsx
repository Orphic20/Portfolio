import * as React from "react";
import {
  ArrowUpRight,
  Award,
  GraduationCap,
  ScrollText,
  Users,
} from "lucide-react";

import { Section } from "@/components/section";

interface Credential {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  /** Small muted line under `value`. */
  note?: string;
  /** Plain multi-entry list, for roles held concurrently. */
  lines?: string[];
  /** Rendered as a list of outbound verification links. */
  items?: { name: string; issuer: string; date: string; href: string }[];
}

const credentials: Credential[] = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "BS Information Technology, Central Luzon State University",
    note: "2023 – present",
  },
  {
    icon: Award,
    label: "Academic standing",
    value: "Presidential Lister",
  },
  {
    icon: Users,
    label: "Leadership",
    lines: [
      "Class President, AY 2024–2027",
      "Student Coach & Team Captain, Varsity Swimming Team",
      "Batch Leader, Builders of Information Technology Society (BITS)",
    ],
  },
  {
    icon: ScrollText,
    label: "Certifications",
    items: [
      {
        name: "Google IT Automation with Python",
        issuer: "Coursera",
        date: "Mar 2026",
        href: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/HLLQERW6FY7U",
      },
      {
        name: "Google IT Support",
        issuer: "Coursera",
        date: "Jan 2025",
        href: "https://www.coursera.org/account/accomplishments/specialization/4QVM1OMC365U",
      },
      {
        name: "Google AI Essentials",
        issuer: "Coursera",
        date: "Nov 2024",
        href: "https://www.credly.com/badges/a3b9c058-da53-4a5b-944a-df8ceb1d3cd3",
      },
    ],
  },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" heading="Hello — I'm Loewin">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-5 text-base leading-relaxed sm:text-lg">
          <p>
            I&apos;m a BS Information Technology student at Central Luzon State
            University, where I hold Presidential Lister standing and serve as
            Class President for the 2024–2027 term. Alongside coursework
            I&apos;ve earned three Google certificates covering IT support,
            Python automation, and AI.
          </p>
          <p className="text-muted-foreground">
            Most of what I know comes from building things end to end: designing
            the PostgreSQL schema, writing the FastAPI endpoints, then putting a
            Next.js and Tailwind interface on top and deploying it. I care about
            software that holds up in real use — indexed search that stays fast,
            booking logic that cannot double-book, and auth that is actually
            enforced.
          </p>
          <p className="text-muted-foreground">
            I&apos;m looking for an OJT placement in web development, backend, or
            software engineering where I can contribute to a production
            codebase and learn from a team that reviews code carefully.
          </p>
        </div>

        <dl className="divide-border grid divide-y self-start">
          {credentials.map((item) => (
            <div key={item.label} className="flex gap-4 py-5 first:pt-0">
              <span
                aria-hidden="true"
                className="bg-accent text-accent-foreground flex size-10 shrink-0 items-center justify-center rounded-lg"
              >
                <item.icon className="size-4.5" />
              </span>
              <div>
                <dt className="type-eyebrow text-muted-foreground mb-1.5">
                  {item.label}
                </dt>
                {item.value && (
                  <dd className="text-sm leading-relaxed font-medium">
                    {item.value}
                    {item.note && (
                      <span className="text-muted-foreground ml-1.5 font-mono text-[0.6875rem] font-normal tracking-wide">
                        {item.note}
                      </span>
                    )}
                  </dd>
                )}
                {item.lines && (
                  <dd>
                    <ul className="space-y-1.5">
                      {item.lines.map((line) => (
                        <li
                          key={line}
                          className="text-sm leading-relaxed font-medium"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </dd>
                )}
                {item.items && (
                  <dd>
                    <ul className="space-y-2">
                      {item.items.map((credential) => (
                        <li key={credential.href}>
                          <a
                            href={credential.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:text-primary inline-flex items-start gap-1.5 text-sm leading-relaxed font-medium transition-colors"
                          >
                            <span>
                              {credential.name}
                              <span className="text-muted-foreground ml-1.5 font-mono text-[0.6875rem] font-normal tracking-wide">
                                {credential.issuer} · {credential.date}
                              </span>
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="text-muted-foreground group-hover:text-primary mt-0.5 size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                            <span className="sr-only">
                              (verify on {credential.issuer}, opens in a new
                              tab)
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                )}
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
