import * as React from "react";
import {
  ArrowUpRight,
  GraduationCap,
  ScrollText,
  Users,
} from "lucide-react";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";

interface Credential {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  /** Secondary line under `value`, such as a school name. */
  detail?: string;
  /** Small muted line under `value`. */
  note?: string;
  /** Short honor labels, shown as chips. */
  honors?: string[];
  /** Quiet date phrases under the honor chips. Kept on one line each. */
  honorNote?: string[];
  /** Titled roles with an organization and a period. */
  roles?: { title: string; org: string; period: string }[];
  /** Rendered as a list of outbound verification links. */
  items?: { name: string; issuer: string; date: string; href: string }[];
}

const credentials: Credential[] = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "BS Information Technology",
    detail: "Central Luzon State University",
    note: "2023 – present",
    honors: ["Presidential Award", "University Scholar", "SCUAA Gold & Bronze"],
    honorNote: ["AY 2023–2026", "SCUAA III swimming, 2023–2025"],
  },
  {
    icon: Users,
    label: "Leadership",
    roles: [
      {
        title: "Class President",
        org: "Central Luzon State University",
        period: "AY 2024–2027",
      },
      {
        title: "Batch Leader",
        org: "Builders of Information Technology Society",
        period: "2026",
      },
      {
        title: "Student Coach",
        org: "College of Engineering, CLSU",
        period: "2025–2026",
      },
      {
        title: "Team Captain",
        org: "Varsity Swimming Team",
        period: "2025–2026",
      },
    ],
  },
  {
    icon: ScrollText,
    label: "Certifications",
    items: [
      {
        name: "AWS Academy Graduate — Cloud Foundations",
        issuer: "AWS",
        date: "Oct 2026",
        href: "https://www.credly.com/badges/037ea526-60e9-4315-9301-4681516d0ff7/public_url",
      },
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
            University — University Scholar, and Class President for the
            2024–2027 term. Alongside coursework I&apos;ve earned Google
            certificates in IT support, Python automation, and AI, plus AWS
            Academy Cloud Foundations.
          </p>
          <p className="text-muted-foreground">
            Most of what I know comes from building things end to end: designing
            the PostgreSQL schema, writing the FastAPI endpoints, then putting a
            Vite + React (wouter) and Tailwind interface on top and deploying it. I care about
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
                  <dd>
                    <p className="text-sm leading-snug font-medium">
                      {item.value}
                    </p>
                    {item.detail && (
                      <p className="text-muted-foreground mt-0.5 text-sm leading-snug">
                        {item.detail}
                      </p>
                    )}
                    {item.note && (
                      <p className="text-muted-foreground mt-1 font-mono text-[0.6875rem] tracking-wide">
                        {item.note}
                      </p>
                    )}
                  </dd>
                )}
                {item.honors && (
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {item.honors.map((honor) => (
                        <li key={honor}>
                          <Badge variant="accent" size="sm">
                            {honor}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                    {item.honorNote && (
                      <p className="text-muted-foreground mt-2 font-mono text-[0.6875rem] tracking-wide">
                        {item.honorNote.map((part, index) => (
                          <span key={part}>
                            {index > 0 && " · "}
                            <span className="whitespace-nowrap">{part}</span>
                          </span>
                        ))}
                      </p>
                    )}
                  </dd>
                )}
                {item.roles && (
                  <dd>
                    <ul className="space-y-3">
                      {item.roles.map((role) => (
                        <li
                          key={role.title}
                          className="flex items-baseline justify-between gap-4"
                        >
                          <div className="min-w-0">
                            <p className="text-sm leading-snug font-medium">
                              {role.title}
                            </p>
                            <p className="text-muted-foreground mt-0.5 text-xs leading-snug">
                              {role.org}
                            </p>
                          </div>
                          <p className="text-muted-foreground shrink-0 font-mono text-[0.6875rem] tracking-wide">
                            {role.period}
                          </p>
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
