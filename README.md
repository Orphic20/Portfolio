# Loewin Jon Villanueva — Portfolio

Personal portfolio and project case studies, built with Next.js (App Router),
TypeScript, Tailwind CSS v4, and shadcn/ui.

Every route is statically generated. There is no database, no API layer, and no
environment variables — the site's content lives in typed modules under `data/`,
which the pages read at build time.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
```

## Structure

| Path                          | Purpose                                              |
| ----------------------------- | ---------------------------------------------------- |
| `app/page.tsx`                | Single-scroll home page (hero, about, projects, experience, skills, contact) |
| `app/projects/[slug]/page.tsx`| Statically generated project case study               |
| `data/projects.ts`            | Typed project entries — the single source of truth    |
| `data/experience.ts`          | Work history shown in the Experience timeline         |
| `data/skills.ts`              | Skill groups rendered as pills                        |
| `data/site.ts`                | Name, contact links, nav links, resume path           |
| `components/sections/`        | One component per home-page section                   |
| `components/ui/`              | shadcn/ui primitives (button, card, badge, separator) |
| `components/icons.tsx`        | GitHub and LinkedIn marks — `lucide-react` dropped brand icons |
| `app/globals.css`             | Design tokens, font wiring, custom utilities          |

Adding a project means adding one object to `data/projects.ts`. The card on the
home page, the `/projects/[slug]` route, and its entry in `generateStaticParams`
all follow from it.

## Theming

Tailwind v4 is CSS-first, so there is no `tailwind.config.ts` — the theme lives
in `app/globals.css`. Every accented pixel resolves to one hue: change `--brand`
in `:root` and its `.dark` counterpart, and the whole site re-themes.

```css
:root {
  --brand: oklch(0.58 0.16 42); /* copper / ember */
}
```

Fonts are Fraunces (display), Manrope (body), and JetBrains Mono (meta labels),
loaded via `next/font/google` in `app/layout.tsx`. Two custom utilities,
`type-display` and `type-eyebrow`, wrap the display and label type styles.

Light and dark themes are both defined. The toggle in the header stores the
choice in `localStorage`, and an inline script in `app/layout.tsx` applies it
before first paint to avoid a flash of the wrong theme.

## Case study links

Each case study derives its buttons from the data, so the layout follows
whatever is set:

- `demoUrl` present → solid "Live demo" button, and "View code" drops to outline.
- `repoUrl` absent → no "View code" button.
- Neither set → the button row is skipped entirely.

**CourtFlow deliberately has neither, and this is not an oversight.** That
deployment holds real case documents and client records for a law practice, so
neither the source nor the running system is public, and the client is described
on the site without being named.

If an interactive demo is added later, it must be a separate instance with its
own database and storage bucket seeded with fabricated records — never the
production one — with the hearing-reminder cron's outbound sending disabled so
it cannot mail invented addresses.

## Deploying

Import the repository on Vercel. No environment variables or build configuration
are required, and pushes to `master` redeploy automatically.
