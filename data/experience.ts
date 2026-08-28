export interface Role {
  title: string;
  organization: string;
  location: string;
  period: string;
  highlights: string[];
}

export const experience: Role[] = [
  {
    title: "Personal Fitness Trainer / Swimming & Kickboxing Instructor",
    organization: "Self-employed",
    location: "Nueva Ecija, Philippines",
    period: "Sep 2024 – Dec 2025",
    highlights: [
      "Coached and mentored 10+ clients through personalized training programs.",
      "Managed client scheduling, appointments, and curriculum planning.",
    ],
  },
  {
    title: "Project Manager / Digital Asset Manager",
    organization: "Limitless Guild — P2E Guild",
    location: "Nueva Ecija, Philippines · Hybrid",
    period: "Nov 2021 – Jul 2022",
    highlights: [
      "Recruited and managed a team of 20+ scholars, overseeing performance tracking, payroll, and resource allocation.",
      "Built and maintained operational tracking systems using spreadsheets and communication platforms.",
    ],
  },
];
