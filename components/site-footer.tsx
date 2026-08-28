import { Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";

const socials = [
  { icon: Mail, label: "Email Loewin", href: `mailto:${site.email}` },
  { icon: GitHubIcon, label: "GitHub profile", href: site.github },
  { icon: LinkedInIcon, label: "LinkedIn profile", href: site.linkedin },
];

export function SiteFooter() {
  return (
    <footer className="border-border/70 mt-auto border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-muted-foreground space-y-1 font-mono text-xs tracking-wide">
          <p className="text-foreground text-sm font-semibold tracking-normal">
            {site.name}
          </p>
          <p>
            {site.location} · Available for OJT placement
          </p>
        </div>

        <ul className="flex items-center gap-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                {...(social.href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="text-muted-foreground hover:text-primary hover:border-primary/50 flex size-10 items-center justify-center rounded-lg border transition-colors"
              >
                <social.icon aria-hidden="true" className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
