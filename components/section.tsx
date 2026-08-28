import * as React from "react";

import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  eyebrow?: string;
  heading?: string;
  intro?: string;
};

export function Section({
  id,
  eyebrow,
  heading,
  intro,
  className,
  children,
  ...props
}: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24 py-16 sm:py-24", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {(eyebrow || heading || intro) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && (
              <p className="type-eyebrow text-primary mb-4">{eyebrow}</p>
            )}
            {heading && (
              <h2
                id={headingId}
                className="type-display text-3xl font-semibold sm:text-4xl"
              >
                {heading}
              </h2>
            )}
            {intro && (
              <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
