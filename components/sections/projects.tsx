import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      heading="Projects I have shipped and shipping"
      intro="Full-stack builds where I owned the database schema, the API, and the interface. Each one opens into a short case study."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug} className="flex">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
