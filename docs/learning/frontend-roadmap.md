# Frontend Roadmap Learning Tracker

Source: https://roadmap.sh/frontend
Snapshot date: 2026-09-17

The source roadmap changes over time. This file preserves the topics visible on the snapshot date and tracks learning evidence independently from project completion.

## Status definitions

| Status | Meaning |
| --- | --- |
| NOT STARTED | Not introduced yet |
| UNDERSTOOD | Can explain purpose, origin, and basic mechanism |
| PRACTICED | Completed a focused exercise |
| APPLIED | Used and verified in a real project |
| EXPLAINED | Can compare alternatives, trade-offs, and appropriate use cases |

## Current roadmap snapshot

| Area | Topics visible in the roadmap | Current status | Planned context |
| --- | --- | --- | --- |
| Internet | How the internet works; HTTP; domain names; hosting; DNS; browsers | PRACTICED | Local HTTP and cross-origin API request applied; DNS/TLS/hosting need production evidence |
| Core languages | HTML; CSS; JavaScript | APPLIED | Semantic document, responsive styles, and five interaction scripts verified in this portfolio |
| Version control | Version Control; Git | APPLIED | Feature branch and focused milestone commits used throughout the portfolio |
| VCS hosting | GitHub; GitLab | PRACTICED | GitHub REST API and remote configured; hosting workflow remains Task 8 |
| Package managers | npm; yarn; pnpm; Bun | NOT STARTED | Tooling project |
| Frameworks | React; Vue.js; Angular; Svelte; Solid JS; Astro; TanStack Start | NOT STARTED | React project and comparison study |
| CSS frameworks | Tailwind | NOT STARTED | Later comparison project |
| Linters and formatters | ESLint; Prettier; Biome | NOT STARTED | Tooling project |
| Module bundlers and compilers | Vite; Parcel; Rollup; esbuild; SWC; Rolldown | NOT STARTED | Tooling project |
| Testing | Vitest; Jest; Playwright; Cypress | NOT STARTED | Automated-testing project |
| Authentication | Auth strategies | NOT STARTED | Full-stack project |
| Web security | CORS; HTTPS; CSP; OWASP risks | UNDERSTOOD | CORS/trust boundary and safe remote rendering introduced; CSP/OWASP need focused work |
| Type checking | TypeScript | NOT STARTED | TypeScript project |
| Web Components | Custom Elements; HTML Templates; Shadow DOM | NOT STARTED | Component-model comparison |
| Routing and meta-frameworks | react-router; Next.js; Nuxt.js; SvelteKit | NOT STARTED | React/SSR projects |
| Server rendering | SSR; React; Vue.js; Angular; Svelte | NOT STARTED | SSR project |
| Static generation | SSG; VuePress; Nuxt.js; Astro; Eleventy; Next.js | NOT STARTED | Content-site project |
| Data APIs | GraphQL; Apollo; Relay Modern | NOT STARTED | API-client project |
| Progressive Web Apps | PWAs; Service Workers | NOT STARTED | Offline-capable project |
| Mobile applications | React Native; Flutter; Ionic | NOT STARTED | Later specialization |
| Desktop applications | Node.js; Electron; Tauri; Flutter | NOT STARTED | Later specialization |
| Deployment | GitHub Pages; Vercel; Cloudflare; Netlify; Railway; Render | APPLIED | `main` root deployed and verified over HTTPS; managed preview/platform comparison remains later |
| Performance | Performance; Lighthouse; Cache-Control; streamed responses | PRACTICED | Local Lighthouse 99; production caching and streamed responses remain later |
| Browser tooling | DevTools usage; Web APIs | APPLIED | Responsive DOM, storage, interaction, and Network outcomes verified in a real browser |
| Product quality | Accessibility; Design Systems; Design System | PRACTICED | Semantic landmarks, labels, ARIA state, focus, and reduced motion applied; design systems remain later |
| Backend connection | Backend; Fullstack | PRACTICED | Browser consumed GitHub's backend API; owned server and database remain a later full-stack project |
| AI-assisted development | AI vs traditional coding; how LLMs work; prompting; Claude Code; Copilot; Cursor; Antigravity; Gemini; OpenAI; Anthropic; refactoring; code reviews; docs generation; applications; implementing AI | NOT STARTED | Separate AI-assisted-development track |
| Agentic development | Prompt Engineering; AI Agents Roadmap; agents; MCP; skills | NOT STARTED | Later agent tooling track |
| Practice gates | Beginner projects; modern vanilla JS applications; intermediate projects; advanced frontend | NOT STARTED | Multi-project curriculum milestones |

## Evidence rule

A status changes only when a project file, verification result, exercise, or checkpoint is linked here. Seeing a topic on the roadmap is not learning evidence.

## Current project evidence

| Area | Evidence | Next gap |
| --- | --- | --- |
| Internet | `docs/learning/checkpoints.md` Milestones 0/1 and 5 | Verify DNS, TLS, hosting, caching, and production HTTP after deployment |
| Core languages | `index.html`, `css/style.css`, and `js/*.js` | Rebuild selected behavior with modules and later React |
| Version control | Branch `codex/vanilla-portfolio` and milestone commits | Pull request, merge, tag, and collaborative conflict workflow |
| VCS hosting | `js/projects.js` and configured GitHub remote | GitHub Pages and GitHub Actions production workflow |
| Web security | Escaped API text, HTTPS URL allow-list, `rel="noopener noreferrer"` | CSP, OWASP risks, authentication, authorization, and server-side validation |
| Browser tooling | Browser checks recorded in `docs/learning/checkpoints.md` | Lighthouse and automated cross-browser regression |
| Product quality | `index.html` relationships and accessibility state in all five scripts | Screen-reader testing and advanced WCAG audit |
| Backend connection | GitHub request-state flow in `js/projects.js` | Build and secure an owned API, database, and deployment environment |
| Performance | Local Lighthouse report: Performance 99, LCP 2.1s | Re-run on production and study caching, critical CSS, and streamed delivery |
| Deployment | Public Pages URL `https://k-sungwon.github.io/web-resume-vanilla/` | Compare GitHub Actions, preview deployments, Vercel, Cloudflare, Netlify, Railway, and Render |
