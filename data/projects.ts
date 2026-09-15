export interface Project {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  /** Omit for private work — the "View code" button is skipped entirely. */
  repoUrl?: string;
  role: string;
  timeline?: string;
  /** Heading for the 01 column. Defaults to "The problem". */
  problemTitle?: string;
  problem: string;
  /** Heading for the 02 column. Defaults to "My role". */
  contributionTitle?: string;
  /** What I personally did — shown in the 02 column of the case study. */
  contribution?: string | string[];
  /** Heading for the gallery. Defaults to "Screens". */
  galleryTitle?: string;
  /** Heading for the outcome block. Defaults to "Outcome". */
  outcomeTitle?: string;
  outcome: string | string[];
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
      "Vite",
      "React",
      "wouter",
      "Tailwind CSS",
      "shadcn/ui",
      "FastAPI",
      "PostgreSQL",
      "Firebase",
    ],
    image: "/projects/courtflow-cover.png",
    // No repoUrl or demoUrl: the deployment holds real client case data, so
    // neither the source nor the running system is public.
    role: "Full-stack developer — three-person capstone team",
    timeline: "Jan – Oct 2026",
    problem:
      "A civil and family law practice in Nueva Ecija was running 200 clients and 150 active cases on spreadsheets, a physical whiteboard, and a group chat. Court orders arrived as phone photos, staff estimated losing six hours a week searching for records across 50+ documents processed weekly, and one audio file buried in the workflow delayed a filing by a year.",
    contribution:
      "One of three developers on the capstone team, working across the Vite + React (wouter) front end and the FastAPI and PostgreSQL back end. We ran Agile Scrum in one-to-two week sprints with a representative from the firm as product owner, reviewing a working increment at the end of each one.",
    outcome:
      "Built and deployed end to end. PostgreSQL 16 behind FastAPI with GIN-indexed full-text search across case titles, client names, and document contents; a daily cron job that flags hearings falling within three days and writes delivery status back to the database so staff are never alerted twice; and version-controlled document storage on Firebase Storage, with version, status, and approver tracked relationally. Shipped through GitHub CI/CD to Vercel and Render.",
    gallery: [
      {
        src: "/projects/courtflow-clients.png",
        alt: "CourtFlow client directory listing companies, case types, and last contact",
      },
      {
        src: "/projects/courtflow-calendar.png",
        alt: "CourtFlow hearing calendar with today’s agenda and hearings on the selected date",
      },
      {
        src: "/projects/courtflow-documents.png",
        alt: "CourtFlow documents list with version history for a case file",
      },
      {
        src: "/projects/courtflow-client-overview.png",
        alt: "CourtFlow client overview showing cases, hearings, and recent documents for one company",
      },
      {
        src: "/projects/courtflow-client-cases.png",
        alt: "CourtFlow client cases view with matter status from intake through hearing",
      },
    ],
  },
  {
    name: "Muñoz Bike Rental",
    slug: "veloride",
    description:
      "Catalogue, date-based availability, and multi-bike checkout for a 100+ bike shop (GCash receipt or cash at pickup).",
    tags: [
      "React",
      "Vite",
      "wouter",
      "FastAPI",
      "Supabase",
      "Cloudinary",
    ],
    image: "/projects/veloride-cover.svg",
    // TODO(loewin): placeholder — swap for the real deployed URL before shipping.
    demoUrl: "https://veloride.example.com",
    repoUrl: "https://github.com/Orphic20/Bike_Rental",
    role: "Full-stack",
    timeline: "Aug – Sep 2026",
    problem:
      "A bike rental shop with a 100+ bike fleet needed a catalogue customers could book from — one or more bikes, today or a future pickup date, daily or weekly rates — and a way to pay by GCash (receipt upload) or cash at pickup. An online reservation could not be treated as if the bike was already out.",
    contribution: [
      "Modeled one booking (payment) with many rentals (one per bike). Bikes stay available until staff release; then the rental is active and the bike is rented.",
      "Checkout uses each bike’s daily or weekly rate. GCash receipts go to Cloudinary for staff review (not a payment webhook). Google OAuth and JWT-protected API.",
    ],
    outcome:
      "One booking (payment) has many rentals (one per bike). Bikes stay available until staff release; then the rental is active and the bike is rented. Checkout uses each bike’s daily or weekly rate. GCash receipts go to Cloudinary for staff review (not a payment webhook). Google OAuth and JWT-protected API.",
    gallery: [
      {
        src: "/projects/veloride-shot-1.svg",
        alt: "Muñoz Bike Rental catalogue listing bikes with availability by pickup date",
      },
      {
        src: "/projects/veloride-shot-2.svg",
        alt: "Muñoz Bike Rental checkout for one or more bikes, daily or weekly rate, and GCash or cash payment",
      },
    ],
  },
  {
    name: "Resume & Candidate RAG Engine",
    slug: "rag-search-engine",
    description:
      "In development — retrieval-augmented generation pipeline combining pgvector semantic search with relational metadata filtering and async processing",
    tags: [
      "Python",
      "FastAPI",
      "PostgreSQL (pgvector)",
      "Redis",
      "SQLAlchemy 2.0",
      "Pydantic v2",
      "OpenAI API",
    ],
    image: "/projects/rag-search-engine-cover.svg",
    repoUrl: "https://github.com/Orphic20",
    role: "Backend Software Engineer",
    problem:
      "Traditional keyword search misses qualified candidates who describe skills using different phrasing — for example, missing a React candidate when searching for “Frontend Developer.” Standard LLMs hallucinate skills, and pure vector search cannot enforce hard constraints like “must have 3+ years of experience.”",
    contributionTitle: "Key engineering highlights",
    contribution: [
      "Layout-aware ingestion: replaced raw text splitters with layout-aware parsing (PyMuPDF4LLM) so multi-column resume formatting is preserved before chunking.",
      "Hybrid search and metadata extraction: automated structured metadata extraction (years of experience, core skills) on upload, so a single query can combine Postgres SQL filters with pgvector cosine similarity.",
      "Non-blocking task queue: an asynchronous background worker (Redis + ARQ) runs file parsing and OpenAI embedding calls off the request, returning 202 Accepted immediately.",
      "Production architecture: SQLAlchemy ORM models stay decoupled from public Pydantic v2 API schemas so internal structures — including raw 1,536-dimensional float arrays — never leak over the network.",
    ],
    outcomeTitle: "Planned outcome",
    outcome: [
      "This will be an asynchronous, end-to-end RAG service that streams sub-second semantic search queries back to the client.",
      "Document processing will handle batch PDF uploads without blocking API responsiveness or hitting OpenAI rate limits.",
    ],
  },
  {
    name: "Autonomous Agent & Local Knowledge Graph",
    slug: "knowledge-graph",
    description:
      "Semantic note synthesis, vector retrieval, and automated link discovery for a 1,000+ file research vault.",
    tags: [
      "Hermes Agent",
      "LanceDB",
      "Python",
      "CLI",
      "Obsidian",
      "Markdown",
    ],
    image: "/projects/knowledge-graph-cover.png",
    role: "AI Engineering & Systems",
    timeline: "Sep – Oct 2026",
    problem:
      "A personal research vault grew past 1,000+ Markdown files, creating a massive information silo. Standard keyword search failed to surface conceptual connections across non-adjacent technical topics, while manual cross-referencing and tagging generated unsustainable maintenance overhead.",
    contributionTitle: "Systems Engineering & Role",
    contribution: [
      "Agentic Traversal: Deployed and self-hosted Nous Research’s Hermes Agent locally to parse and evaluate raw research files across large vault directories.",
      "Vector Indexing: Integrated LanceDB to manage local vector embeddings, enabling context-aware semantic search that goes beyond exact string matching.",
      "Automated Synthesis Workflows: Engineered background execution prompts to crawl vault directories, uncover implicit relationships across separate notes, and output structured synthesis files with automated [[wikilinks]].",
    ],
    galleryTitle: "System Interface",
    outcomeTitle: "Key Outcomes",
    outcome: [
      "Transformed a passive 1,000+ note collection into a dynamic, self-indexing knowledge engine.",
      "Eliminated manual tagging overhead by automating link discovery and multi-file summary generation.",
      "Established a proven, local vector indexing architecture directly applicable to production Retrieval-Augmented Generation (RAG) pipelines.",
    ],
    gallery: [
      {
        src: "/projects/knowledge-graph-shot-cli.svg",
        alt: "Placeholder for a terminal screenshot of Hermes Agent indexing the research vault from the CLI",
      },
      {
        src: "/projects/knowledge-graph-cover.png",
        alt: "Obsidian graph view of the research vault, with notes clustered by linked concepts",
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
