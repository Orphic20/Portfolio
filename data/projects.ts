export interface Project {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  repoUrl: string;
  role: string;
  timeline?: string;
  problem: string;
  /** What I personally did — shown in the "My role" column of the case study. */
  contribution?: string;
  outcome: string;
  /** Case-study gallery. Swap these for real screenshots when you have them. */
  gallery?: { src: string; alt: string }[];
}

// TODO(loewin): point `repoUrl` at each project's own repository, add
// `demoUrl` once deployed, and fill in `timeline` (e.g. "Jan – May 2026").
export const projects: Project[] = [
  {
    name: "CourtFlow",
    slug: "courtflow",
    description:
      "Full-stack legal case management platform automating intake, scheduling, and document workflows for a law office serving 200+ clients",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "FastAPI",
      "PostgreSQL",
      "Firebase",
    ],
    image: "/projects/courtflow-cover.svg",
    repoUrl: "https://github.com/Orphic20",
    role: "Full-stack developer — three-person capstone team",
    timeline: "Jan – Oct 2026",
    problem:
      "A civil and family law practice in Nueva Ecija was running 200 clients and 150 active cases on spreadsheets, a physical whiteboard, and a group chat. Court orders arrived as phone photos, staff estimated losing six hours a week searching for records across 50+ documents processed weekly, and one audio file buried in the workflow delayed a filing by a year.",
    contribution:
      "One of three developers on the capstone team, working across the Next.js front end and the FastAPI and PostgreSQL back end. We ran Agile Scrum in one-to-two week sprints with a representative from the firm as product owner, reviewing a working increment at the end of each one.",
    outcome:
      "Built and deployed end to end. PostgreSQL 16 behind FastAPI with GIN-indexed full-text search across case titles, client names, and document contents; a daily cron job that flags hearings falling within three days and writes delivery status back to the database so staff are never alerted twice; and version-controlled document storage on Firebase Storage, with version, status, and approver tracked relationally. Shipped through GitHub CI/CD to Vercel and Render.",
    gallery: [
      {
        src: "/projects/courtflow-shot-1.svg",
        alt: "CourtFlow dashboard showing active cases and upcoming court hearings",
      },
      {
        src: "/projects/courtflow-shot-2.svg",
        alt: "CourtFlow client directory listing registered clients and their case status",
      },
      {
        src: "/projects/courtflow-shot-3.svg",
        alt: "CourtFlow documents module showing the version history of a case file",
      },
    ],
  },
  {
    name: "VeloRide",
    slug: "veloride",
    description:
      "End-to-end bike rental platform automating reservations, maintenance, and payments for a 100+ bike fleet",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "FastAPI",
      "Supabase",
      "Cloudinary",
    ],
    image: "/projects/veloride-cover.svg",
    // Uncomment and paste the deployed URL to surface the "Live demo" button.
    // demoUrl: "https://veloride.example.com",
    repoUrl: "https://github.com/Orphic20",
    role: "Full-stack developer",
    timeline: "Jul – Sep 2026",
    problem:
      "A bike rental operation needed real-time inventory, dynamic pricing, and reliable booking without double-bookings",
    contribution:
      "Built the platform end to end: the Supabase-hosted PostgreSQL schema and its transactional booking logic, the FastAPI services behind it, and the Next.js interface on top. Also wired up Google OAuth, Supabase Auth (JWT) route protection, and the webhook interceptors that capture and compress GCash payment receipts.",
    outcome:
      "Relational PostgreSQL database via Supabase with transactional booking logic, Google OAuth, GCash payment webhook capture via Cloudinary, Supabase Auth (JWT), zero-cost deployment across Cloudflare and Render",
    gallery: [
      {
        src: "/projects/veloride-shot-1.svg",
        alt: "VeloRide fleet inventory grid showing bike availability by model",
      },
      {
        src: "/projects/veloride-shot-2.svg",
        alt: "VeloRide booking flow with date range picker and live price breakdown",
      },
      {
        src: "/projects/veloride-shot-3.svg",
        alt: "VeloRide maintenance log tracking servicing history per bike",
      },
    ],
  },
  {
    name: "RAG Search Engine",
    slug: "rag-search-engine",
    description:
      "Low-latency retrieval-augmented generation pipeline for semantic search over unstructured documents",
    tags: ["Python", "FastAPI", "PostgreSQL (pgvector)", "LangChain", "OpenAI"],
    image: "/projects/rag-search-engine-cover.svg",
    repoUrl: "https://github.com/Orphic20",
    role: "Developer",
    problem:
      "Needed context-grounded answers over unstructured documents without hallucination-prone raw LLM responses",
    contribution:
      "Building the retrieval pipeline: document parsing, chunking, and embedding through LangChain, with pgvector similarity search served behind a FastAPI endpoint. Currently tuning retrieval strategy and prompt structure to keep answers grounded in the source material.",
    outcome:
      "In development — automated parsing, chunking, and embedding via LangChain and OpenAI, with retrieval and prompt engineering tuned to reduce hallucinations",
    gallery: [
      {
        src: "/projects/rag-search-engine-shot-1.svg",
        alt: "Retrieval pipeline diagram from document parsing through chunking to embedding storage",
      },
      {
        src: "/projects/rag-search-engine-shot-2.svg",
        alt: "Semantic search results ranked by vector similarity score with source citations",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Next project in file order, wrapping around at the end. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
