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
  problem: string;
  /** Heading for the 02 column. Defaults to "My role". */
  contributionTitle?: string;
  /** What I personally did — shown in the 02 column of the case study. */
  contribution?: string | string[];
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
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "FastAPI",
      "PostgreSQL",
      "Firebase",
    ],
    image: "/projects/courtflow-cover.svg",
    // No repoUrl or demoUrl: the deployment holds real client case data, so
    // neither the source nor the running system is public.
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
      "Booking and staff-release system for a 100+ bike rental shop — catalogue, date-based availability, multi-bike checkout, and GCash or cash at pickup",
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
    // TODO(loewin): placeholder — swap for the real deployed URL before shipping.
    demoUrl: "https://veloride.example.com",
    repoUrl: "https://github.com/Orphic20/Bike_Rental",
    role: "Full-stack developer",
    timeline: "Jul – Sep 2026",
    problem:
      "A bike rental shop with a 100+ bike fleet needed a catalogue customers could book from — one or more bikes, today or a future pickup date, daily or weekly rates — and a way to pay by GCash (receipt upload) or cash at pickup. Staff still had to match a government ID to the account, confirm payment, and release the bike. An online reservation could not be treated as if the bike was already out.",
    contribution: [
      "Designed the Postgres schema around one booking (checkout and payment) with many rentals (one per bike), including payment states and rental status: reserved until staff release, then active with the bike marked rented.",
      "Built the FastAPI services for checkout that sums each bike’s fixed daily or weekly rate, date-based availability, and extension or swap requests.",
      "Built the Next.js customer and staff UI: browse and book; ID check, payment confirmation, release, and return (available or maintenance).",
      "Wired Google OAuth, Supabase Auth, and JWT protection on API routes.",
      "Stored GCash receipt images on Cloudinary for staff to verify.",
    ],
    outcome:
      "The shop runs the full loop on a live fleet: customer reserves and pays, staff match ID and confirm payment, then release the bike; on return, staff mark it available or send it to maintenance. A reserved bike stays available in the catalogue until release — it may simply be unavailable for that pickup date. A Postgres overlap constraint applies to active (released) rentals. Hosted on Cloudflare and Render.",
    gallery: [
      {
        src: "/projects/veloride-shot-1.svg",
        alt: "VeloRide catalogue listing bikes with availability by pickup date",
      },
      {
        src: "/projects/veloride-shot-2.svg",
        alt: "VeloRide checkout for one or more bikes, daily or weekly rate, and GCash or cash payment",
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Next project in file order, wrapping around at the end. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
