import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group hover:border-primary/50 focus-within:border-primary/50 relative w-full overflow-hidden transition-colors">
      <div className="bg-muted relative aspect-16/10 overflow-hidden border-b">
        <Image
          src={project.image}
          alt={`${project.name} — ${project.description}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="type-display text-xl">
            <Link href={`/projects/${project.slug}`}>
              {/* Stretched link keeps the whole card clickable with one tab stop. */}
              <span className="absolute inset-0" aria-hidden="true" />
              {project.name}
            </Link>
          </CardTitle>
          <ArrowUpRight
            aria-hidden="true"
            className="text-muted-foreground group-hover:text-primary mt-1 size-4 shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline" size="sm">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
