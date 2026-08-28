import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      heading="What I build with"
      intro="The stack I reach for day to day, grouped by where it sits in a project."
    >
      <dl className="divide-border divide-y">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="grid gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[12rem_1fr] sm:gap-8"
          >
            <dt className="type-eyebrow text-muted-foreground pt-1.5">
              {group.label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge variant="secondary">{item}</Badge>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
