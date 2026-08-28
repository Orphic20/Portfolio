import { ArrowUpRight, Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { site } from "@/data/site";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "github.com/Orphic20",
    href: site.github,
    external: true,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "in/loewin-villanueva",
    href: site.linkedin,
    external: true,
  },
];

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      heading="Let's talk about an OJT placement"
      intro="I read every message and reply within a day. The fastest way to reach me is email."
    >
      <ul className="grid gap-4 sm:grid-cols-3">
        {channels.map((channel) => (
          <li key={channel.label}>
            <a
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group hover:border-primary/50 hover:bg-accent/40 flex h-full flex-col gap-3 rounded-xl border p-6 transition-colors"
            >
              <span className="flex items-center justify-between">
                <channel.icon
                  aria-hidden="true"
                  className="text-primary size-5"
                />
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-muted-foreground group-hover:text-primary size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
              <span className="type-eyebrow text-muted-foreground">
                {channel.label}
              </span>
              <span className="text-sm font-medium break-all">
                {channel.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
