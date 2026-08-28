import { Section } from "@/components/section";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      heading="Before the codebases, the teams"
      intro="Work outside software that taught me to run schedules, budgets, and people — the parts of shipping that aren't code."
    >
      <ol className="divide-border divide-y">
        {experience.map((role) => (
          <li
            key={`${role.organization}-${role.period}`}
            className="grid gap-4 py-8 first:pt-0 last:pb-0 sm:grid-cols-[12rem_1fr] sm:gap-8"
          >
            <p className="text-muted-foreground pt-1 font-mono text-xs tracking-wide">
              {role.period}
            </p>

            <div>
              <h3 className="type-display text-lg font-semibold sm:text-xl">
                {role.title}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {role.organization} · {role.location}
              </p>

              <ul className="mt-4 space-y-2">
                {role.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-muted-foreground flex gap-3 text-sm leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-primary/60 mt-2 size-1 shrink-0 rounded-full"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
