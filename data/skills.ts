export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "PHP", "C", "SQL"],
  },
  {
    label: "Frameworks & UI",
    items: ["Next.js", "React", "FastAPI", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "Databases & cloud",
    items: ["PostgreSQL", "MySQL", "Supabase", "Cloudinary", "Firebase"],
  },
  {
    label: "Tools & DevOps",
    items: [
      "Git",
      "GitHub",
      "Linux CLI",
      "Vercel",
      "Cloudflare",
      "Render",
      "Swagger UI",
      "CI/CD",
    ],
  },
  {
    label: "Core concepts",
    items: [
      "Agile / Scrum",
      "Networking fundamentals",
      "OS administration",
      "IT security basics",
      "Troubleshooting & debugging",
      "Automation",
    ],
  },
];
