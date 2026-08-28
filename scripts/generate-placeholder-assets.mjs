/**
 * Generates placeholder project art and a stand-in resume PDF.
 *
 * These are intentionally abstract, on-brand graphics — not fake screenshots.
 * Replace `public/projects/*.svg` with real captures and drop your real
 * `public/loewin-villanueva-resume.pdf` in, then delete this script.
 *
 *   node scripts/generate-placeholder-assets.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const projectsDir = join(root, "public", "projects");
mkdirSync(projectsDir, { recursive: true });

const ink = "#1c1917";
const paper = "#faf8f5";
const brand = "#c2603a";

const projects = [
  { slug: "courtflow", name: "CourtFlow", kicker: "Case management", shots: 3 },
  { slug: "veloride", name: "VeloRide", kicker: "Rental platform", shots: 3 },
  {
    slug: "rag-search-engine",
    name: "RAG Search Engine",
    kicker: "Semantic retrieval",
    shots: 2,
  },
];

const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Dark, poster-style cover with the project name set large. */
function cover({ name, kicker }) {
  const rows = Array.from({ length: 9 }, (_, i) => {
    const y = 110 + i * 88;
    return `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="${paper}" stroke-opacity="0.05" />`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${brand}" stop-opacity="0.55" />
      <stop offset="100%" stop-color="${brand}" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="${ink}" />
  ${rows}
  <circle cx="1320" cy="200" r="420" fill="url(#glow)" />
  <rect x="120" y="300" width="72" height="8" fill="${brand}" />
  <text x="120" y="272" fill="${brand}" font-family="ui-monospace, monospace" font-size="30" letter-spacing="7">${escape(
    kicker.toUpperCase(),
  )}</text>
  <text x="120" y="470" fill="${paper}" font-family="Georgia, serif" font-size="136" font-weight="600">${escape(
    name,
  )}</text>
  <text x="120" y="860" fill="${paper}" fill-opacity="0.5" font-family="ui-monospace, monospace" font-size="28" letter-spacing="4">LOEWIN JON VILLANUEVA</text>
</svg>
`;
}

/** Light abstract layout block, suggesting an interface without faking one. */
function shot({ name, index }) {
  const bars = Array.from({ length: 5 }, (_, i) => {
    const width = [420, 300, 380, 240, 340][(i + index) % 5];
    return `<rect x="80" y="${230 + i * 62}" width="${width}" height="18" rx="9" fill="${ink}" fill-opacity="0.12" />`;
  }).join("");

  const cards = Array.from({ length: 3 }, (_, i) => {
    const height = [150, 210, 120][(i + index) % 3];
    return `<rect x="${640 + i * 170}" y="${560 - height}" width="130" height="${height}" rx="12" fill="${brand}" fill-opacity="${
      0.25 + i * 0.25
    }" />`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750" role="img">
  <rect width="1200" height="750" fill="${paper}" />
  <rect x="0" y="0" width="1200" height="96" fill="${ink}" fill-opacity="0.04" />
  <circle cx="60" cy="48" r="12" fill="${brand}" />
  <text x="96" y="57" fill="${ink}" fill-opacity="0.65" font-family="ui-monospace, monospace" font-size="26" letter-spacing="3">${escape(
    name.toUpperCase(),
  )}</text>
  <rect x="80" y="150" width="260" height="30" rx="8" fill="${ink}" fill-opacity="0.55" />
  ${bars}
  ${cards}
  <text x="80" y="690" fill="${ink}" fill-opacity="0.35" font-family="ui-monospace, monospace" font-size="22" letter-spacing="3">PLACEHOLDER ${index + 1}</text>
</svg>
`;
}

let written = 0;
for (const project of projects) {
  writeFileSync(join(projectsDir, `${project.slug}-cover.svg`), cover(project));
  written += 1;
  for (let i = 0; i < project.shots; i += 1) {
    writeFileSync(
      join(projectsDir, `${project.slug}-shot-${i + 1}.svg`),
      shot({ name: project.name, index: i }),
    );
    written += 1;
  }
}

/** Minimal single-page PDF so the Resume links resolve during development. */
function buildResumePdf() {
  const lines = [
    ["Helvetica-Bold", 26, 720, "Loewin Jon Villanueva"],
    ["Helvetica", 12, 696, "OJT Applicant - Web Development & Software Engineering"],
    ["Helvetica", 11, 668, "loewinvillanueva07@gmail.com  |  Nueva Ecija, Philippines"],
    ["Helvetica", 11, 650, "github.com/Orphic20  |  linkedin.com/in/loewin-villanueva-a9a019312"],
    ["Helvetica-Bold", 13, 606, "Placeholder"],
    ["Helvetica", 11, 584, "Replace public/loewin-villanueva-resume.pdf with your real resume."],
  ];

  const content = lines
    .map(
      ([font, size, y, text]) =>
        `BT /${font === "Helvetica-Bold" ? "F2" : "F1"} ${size} Tf 72 ${y} Td (${text.replace(
          /([()\\])/g,
          "\\$1",
        )}) Tj ET`,
    )
    .join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const startxref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  return pdf;
}

writeFileSync(
  join(root, "public", "loewin-villanueva-resume.pdf"),
  buildResumePdf(),
  "latin1",
);

console.log(`Generated ${written} project graphics + placeholder resume PDF.`);
