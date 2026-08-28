# Loewin Jon Villanueva — Portfolio

Personal portfolio and project case studies. Built with Next.js (App Router),
TypeScript, Tailwind CSS v4, and shadcn/ui components.

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
| `app/page.tsx`                | Single-scroll home page (hero, about, projects, skills, contact) |
| `app/projects/[slug]/page.tsx`| Statically generated project case study               |
| `data/projects.ts`            | Typed project entries — the single source of truth    |
| `data/skills.ts`              | Skill groups rendered as pills                        |
| `data/site.ts`                | Name, contact links, nav links, resume path           |
| `components/sections/`        | One component per home-page section                   |
| `components/ui/`              | shadcn/ui primitives (button, card, badge, separator) |
| `app/globals.css`             | Design tokens, font wiring, custom utilities          |

## Theming

Tailwind v4 is CSS-first, so there is no `tailwind.config.ts` — the theme lives
in `app/globals.css`. Every accented pixel resolves to one hue: change `--brand`
in `:root` (and its `.dark` counterpart) and the whole site re-themes.

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
before first paint to avoid a flash.

## Before publishing — replace the placeholders

1. **Resume** — overwrite `public/loewin-villanueva-resume.pdf` with the real
   PDF (the current file is a generated stand-in).
2. **Project art** — replace `public/projects/*.svg` with real screenshots and
   update `image` / `gallery` in `data/projects.ts`. Keep the alt text accurate.
3. **Repo and demo links** — each project currently points at the GitHub
   profile root. Set `repoUrl` to the individual repository and add `demoUrl`
   where a deployment exists (the "Live demo" button only renders when
   `demoUrl` is set).
4. **Timelines** — add `timeline` to each project to show it in the meta row.
5. **Certificates** — name the three Google Professional Certificates in
   `components/sections/about.tsx`.
6. **Site URL** — update `site.url` in `data/site.ts` so Open Graph metadata
   points at the real domain.

Once real assets are in place, `scripts/generate-placeholder-assets.mjs` can be
deleted.

## Deploying

Push to GitHub and import the repo on Vercel; no environment variables are
required. Every route is static.
