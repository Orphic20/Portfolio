import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getNextProject, getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [{ url: project.image, alt: project.name }],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const nextProject = getNextProject(project.slug);

  const meta = [
    { label: "Role", value: project.role },
    { label: "Stack", value: project.tags.join(" · ") },
    ...(project.timeline
      ? [{ label: "Timeline", value: project.timeline }]
      : []),
  ];

  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <article className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 rounded-md font-mono text-xs tracking-wide uppercase transition-colors"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            />
            Back to home
          </Link>

          <header className="mt-8">
            <h1 className="type-display text-4xl font-semibold sm:text-5xl">
              {project.name}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
              {project.description}
            </p>

            {(project.demoUrl || project.repoUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.demoUrl && (
                  <Button asChild>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink aria-hidden="true" />
                      Live demo
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button
                    asChild
                    variant={project.demoUrl ? "outline" : "default"}
                  >
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon aria-hidden="true" />
                      View code
                    </a>
                  </Button>
                )}
              </div>
            )}

            <Separator className="mt-10" />
            <dl className="grid gap-6 py-8 sm:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="type-eyebrow text-primary mb-2">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-relaxed">{item.value}</dd>
                </div>
              ))}
            </dl>
            <Separator />
          </header>

          <div className="bg-muted relative mt-12 aspect-16/9 overflow-hidden rounded-xl border">
            <Image
              src={project.image}
              alt={`${project.name} cover image — ${project.description}`}
              fill
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-12">
            <section aria-labelledby="problem-heading">
              <p className="type-eyebrow text-primary mb-4">01</p>
              <h2
                id="problem-heading"
                className="type-display text-2xl font-semibold"
              >
                The problem
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section aria-labelledby="role-heading">
              <p className="type-eyebrow text-primary mb-4">02</p>
              <h2
                id="role-heading"
                className="type-display text-2xl font-semibold"
              >
                My role
              </h2>
              {Array.isArray(project.contribution) ? (
                <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5 leading-relaxed">
                  {project.contribution.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {project.contribution ?? project.role}
                </p>
              )}
            </section>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <section aria-labelledby="gallery-heading" className="mt-20">
              <p className="type-eyebrow text-primary mb-4">03</p>
              <h2
                id="gallery-heading"
                className="type-display text-2xl font-semibold"
              >
                Screens
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {project.gallery.map((shot) => (
                  <li
                    key={shot.src}
                    className="bg-muted relative aspect-16/10 overflow-hidden rounded-lg border"
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section
            aria-labelledby="outcome-heading"
            className="border-primary/25 bg-accent/40 mt-20 rounded-xl border p-8 sm:p-10"
          >
            <p className="type-eyebrow text-primary mb-4">
              {project.gallery?.length ? "04" : "03"}
            </p>
            <h2
              id="outcome-heading"
              className="type-display text-2xl font-semibold"
            >
              Outcome
            </h2>
            <p className="mt-4 leading-relaxed">{project.outcome}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline" size="sm">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="Project navigation" className="mt-20">
            <Separator className="mb-8" />
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group hover:border-primary/50 flex items-center justify-between gap-6 rounded-xl border p-6 transition-colors sm:p-8"
            >
              <span>
                <span className="type-eyebrow text-muted-foreground mb-2 block">
                  Next project
                </span>
                <span className="type-display block text-xl font-semibold sm:text-2xl">
                  {nextProject.name}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="text-muted-foreground group-hover:text-primary size-5 shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </nav>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
