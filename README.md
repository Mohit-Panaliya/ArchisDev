# ArchisDev — website

Multipage marketing site for ArchisDev, built from scratch with React, Vite, GSAP and a
Three.js hero. Dark, typographic, motion-led, and fully responsive.

## Stack

- Vite 8 + React 19 + TypeScript (strict)
- React Router 7 (client-side routes)
- GSAP 3 + ScrollTrigger (scroll reveals, pinned horizontal process, parallax)
- Lenis smooth scrolling, wired into the GSAP ticker
- React Three Fiber + Three.js (lazy-loaded hero scene)
- Plain CSS with custom properties (no UI framework)

## Getting started

```bash
npm install
npm run dev
```

| Script              | What it does                             |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the Vite dev server                |
| `npm run build`     | Typecheck, then build to `dist/`         |
| `npm run preview`   | Serve the production build locally       |
| `npm run typecheck` | TypeScript only, no build                |

## Editing content

Most copy and pricing lives in `src/data/`:

| File                    | Contents                                                                 |
| ----------------------- | ------------------------------------------------------------------------ |
| `src/data/site.ts`      | Brand, email, location, nav, founders, stats, process steps, FAQs helpers |
| `src/data/services.ts`  | All six services: prices, deliverables, timelines, FAQs, home FAQs        |
| `src/data/work.ts`      | Representative work cards (category, layout, tags, visuals)              |
| `src/data/about.ts`     | Story, principles, toolbox                                               |

Page-level copy sits in the matching file under `src/pages/`. Shared design tokens
(colours, type, spacing, radii) are at the top of `src/styles/base.css`.

## Contact form

The form validates in the browser, then:

- If `VITE_CONTACT_ENDPOINT` is set, it `POST`s the form as JSON to that URL.
- If it is not set, it falls back to a prefilled `mailto:` to `site.email` and tells
  the visitor to press send. No backend is required for launch.

To wire a real endpoint (Formspree, Getform, a serverless function, etc.), copy
`.env.example` to `.env` and set:

```bash
VITE_CONTACT_ENDPOINT=https://your-endpoint.example.com/contact
```

The endpoint must accept a JSON body with `name`, `email`, `company`, `service`,
`budget` and `message`, and return a 2xx on success.

## Deployment

`npm run build` outputs a static site to `dist/`. Because routing is client-side,
the host must rewrite unknown paths to `index.html`:

- **GitHub Pages (current)** — live at
  <https://mohit-panaliya.github.io/ArchisDev/>. Every push to `main` runs
  `.github/workflows/deploy.yml`, which builds the site, copies `index.html` to
  `404.html` for deep links, and deploys the artifact. The build is served from
  `/ArchisDev/`, so `vite.config.ts` sets that base and the router reads it from
  `import.meta.env.BASE_URL`.
- **Netlify** — add `public/_redirects` containing `/* /index.html 200`
  (then rebuild), or set the same rule in the UI.
- **Vercel** — Next.js-style rewrite:
  `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
  in `vercel.json`.
- **Apache / Hostinger** — add an `.htaccess` with
  `RewriteEngine On` + `RewriteCond %{REQUEST_FILENAME} !-f` +
  `RewriteRule . /index.html [L]`.

### Moving to archisdev.com

The repository deploys as a project page, which needs the `/ArchisDev/` base path.
If the site moves to a root domain later: set `base` back to `/` in
`vite.config.ts`, update `site.url` in `src/data/site.ts` and the canonical/OG/JSON-LD
URLs in `index.html`, then redeploy.

## Before going live

- The placeholder domain/email (`archisdev.com` / `hello@archisdev.com`) is still
  used for contact email. Update `src/data/site.ts` and `index.html` once the real
  mailbox exists.
- Update `site.url` and the canonical/OG/JSON-LD URLs whenever the domain changes.
- The work section is labelled "representative builds and capability demos" — keep
  that wording unless the projects and permissions are real.
- The 3D hero is lazy-loaded and skipped when WebGL is unavailable; all animation
  respects `prefers-reduced-motion`.
