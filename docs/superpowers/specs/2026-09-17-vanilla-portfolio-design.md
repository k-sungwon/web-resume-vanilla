# Vanilla Portfolio Design

## 1. Purpose

Build and deploy one responsive portfolio with plain HTML, CSS, and JavaScript while learning how browser UI, network delivery, hosting, APIs, and server-side responsibilities connect.

The first release prioritizes the mission's required behavior and the learning path from semantic markup to state-driven rendering. Bonus features remain outside the initial implementation.

## 2. Constraints

* Use HTML, CSS, and JavaScript without React, Vue, jQuery, Bootstrap, Tailwind CSS, or other application libraries.
* Use external CSS and JavaScript files. Load JavaScript with `defer`.
* Use `const` and `let`, `addEventListener`, and no inline event handlers or inline styles.
* Exercise required JavaScript fundamentals in real features: `querySelector`, `querySelectorAll`, `textContent`, carefully bounded `innerHTML`, `classList`, arrow functions, template literals, destructuring, `map`, and `forEach`.
* Handle the required `click`, `submit`, `scroll`, and `input` events, including `preventDefault` where native navigation/submission must be replaced.
* Support current Chrome and mobile, tablet, and desktop layouts.
* Deploy the finished static site with GitHub Pages.
* Use replaceable sample portfolio content for the first release. Personal content and the GitHub username may be substituted afterward as a learner-led code-reading exercise.

## 3. Scope

### Required for the first release

1. Semantic page sections: Header/Nav, Hero, About, Skills, Projects, Contact, and Footer.
2. Accessible navigation, headings, image alternatives, form labels, and keyboard-operable controls.
3. Mobile-first layout with breakpoints at 768px and 1024px.
4. Flexbox navigation, responsive Grid project cards, CSS custom properties, and light/dark theme variables.
5. Hamburger navigation, smooth section navigation, scrolled header, scroll-to-top control, and Intersection Observer reveal effects.
6. Dark-mode state persisted in `localStorage`.
7. Contact form validation for name, email, and message with field errors and a simulated success result.
8. GitHub repository loading with loading, success, empty, and error states plus retry behavior.
9. README, required screenshots, GitHub Pages deployment, responsive and accessibility verification.

### Deferred until after the first release

* Repository language filtering
* Hero typing effect
* Real submission through Formspree or EmailJS
* Automatic system-theme detection
* Conversion to ES Modules and comparison with the initial script structure

## 4. Architecture

The site is a static multi-script application. HTML owns meaning and content, CSS owns presentation and responsive/theme rules, and each JavaScript file owns one interaction domain.

```text
web_resume_vanilla/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── navigation.js
│   ├── theme.js
│   ├── scroll.js
│   ├── contact.js
│   └── projects.js
├── images/
│   └── profile-placeholder.svg
├── docs/
│   ├── mission.md
│   ├── learning/
│   └── superpowers/
│       ├── specs/
│       └── plans/
└── README.md
```

The scripts are ordinary deferred scripts rather than ES Modules. Each file is wrapped in its own function scope so top-level names cannot collide across classic scripts. They do not read or mutate one another's variables. Each script queries only its own DOM elements, registers its own listeners, holds only the state needed for that feature, and exits safely when its required root element is absent.

This design keeps the event-to-state-to-render flow visible without adding module loading and dependency-management concepts before they are needed. The function wrapper is introduced only as the minimum mechanism needed to keep classic script variables private.

## 5. Components and Responsibilities

### `index.html`

Defines the semantic document, replaceable sample content, navigation targets, accessible control attributes, project-state container, contact form, and script/style connections.

### `css/style.css`

Defines design tokens, base/mobile styles, component styles, dark-theme overrides, responsive breakpoints, interaction states, and reduced-motion behavior.

### `js/navigation.js`

Owns mobile menu state, hamburger accessibility attributes, menu closing after navigation, and smooth anchor navigation.

### `js/theme.js`

Owns the current theme, storage restoration, document theme attribute, accessible toggle label, and persistence.

### `js/scroll.js`

Owns header scroll styling, scroll-to-top visibility/action, and Intersection Observer reveal behavior.

### `js/contact.js`

Reads form values, validates required fields and email format, renders field-level errors, prevents native submission, and renders a simulated success state.

### `js/projects.js`

Stores the replaceable GitHub username configuration, fetches repositories, maps API data to safe project-card markup, and renders loading, success, empty, or error state. Dynamic repository values are escaped before any template is assigned through `innerHTML`; ordinary text updates prefer `textContent`. An error state includes retry behavior. HTTP 403 is treated as an error and explains the likely request limit without exposing unnecessary implementation detail.

## 6. State and Data Flow

Every interactive feature follows:

```text
event or external response → state change → render function → DOM update
```

### Navigation

* State: `isMenuOpen`, `isHeaderScrolled`
* Hamburger click changes menu state and updates visible classes plus `aria-expanded`.
* Navigation click scrolls to a section and closes an open mobile menu.
* Scroll position changes the header presentation.

### Theme

* State: `theme`, either `light` or `dark`
* Initialization reads `localStorage`, selects the saved theme or the light default, and renders it through `data-theme`.
* Toggle changes state, renders it, and persists it.

### Projects

* State: `status` (`idle`, `loading`, `success`, `empty`, or `error`), `repositories`, and `errorMessage`
* Initial load and retry transition to loading before starting `fetch`.
* A non-empty response transitions to success; an empty array transitions to empty; thrown errors and non-success HTTP responses transition to error.
* Rendering is determined only by the current request state.

### Contact form

* State: `values`, `errors`, and `isSubmitted`
* Input events update the relevant value and validation message.
* Submit prevents navigation, validates all fields, and renders either errors or a simulated success message.

### Scroll-only UI

Scroll-to-top visibility and observed reveal entries are derived directly from browser values. They do not require shared application state.

## 7. Error and Edge-State Handling

* Missing feature roots cause that script to stop initialization without affecting other features.
* Network and parsing failures produce a visible Projects error state and retry action.
* Empty repository results have a distinct message instead of appearing broken.
* Invalid form fields are identified near their controls and exposed with accessible attributes.
* Motion-dependent effects respect reduced-motion preferences.
* External links use safe link attributes when opening a new browsing context.
* Client-side code contains no secret or privileged credential.

## 8. Implementation Sequence

1. Create the minimal folders/files and verify stylesheet/script loading through Live Server.
2. Build the complete semantic HTML skeleton with sample content.
3. Add design tokens and mobile base styles.
4. Add Flexbox/Grid responsive behavior and 768px/1024px breakpoints.
5. Implement navigation and scroll interactions.
6. Implement theme state and persistence.
7. Implement form state, validation, and rendering.
8. Implement GitHub API request states and rendering.
9. Run integrated responsive, accessibility, keyboard, network, and console verification.
10. Confirm sample content is easy to replace, complete README/screenshots, deploy to GitHub Pages, and verify the deployed site.

The API work follows basic DOM/event work so asynchronous state adds one new concept at a time.

## 9. Verification Strategy

The first release does not add a test framework. Verification uses explicit browser checklists so test tooling does not precede the core HTML/CSS/JavaScript learning goal.

* Check mobile, tablet, and desktop viewport layouts in current Chrome.
* Operate navigation, theme, scroll controls, and the form with keyboard input.
* Refresh and reopen the page to verify theme persistence.
* Exercise valid, empty, and malformed form values.
* Exercise successful repository loading, an invalid user/error, retry, and controlled empty/403 test responses without deliberately exhausting the public API limit.
* Check the browser console for errors and the Network panel for document, asset, and API requests.
* Repeat the critical checks against the GitHub Pages URL.

## 10. Learning Milestones

### Milestone 0 — Structure and connection

Connect the files, run the local HTTP server, and explain how the browser obtains HTML, CSS, and JavaScript.

### Milestone 1 — Semantic HTML

Complete the document structure and explain semantic choices, heading hierarchy, alternative text, and label/control relationships.

### Milestone 2 — CSS and responsive layout

Complete mobile-first styles and responsive layout. Explain the Flexbox/Grid selection and how CSS rules become visible layout.

### Milestone 3 — DOM and events

Complete navigation/scroll interactions and explain selection, listener registration, class changes, and screen updates.

### Milestone 4 — State and forms

Complete theme persistence and form validation. Explain event → state → render and why browser-visible code cannot hold secrets.

### Milestone 5 — Asynchronous API

Complete GitHub loading states. Explain `fetch`, promises/`async` functions, HTTP status, JSON, CORS, and the frontend/backend boundary.

### Milestone 6 — Delivery and production verification

Deploy the site and explain the complete path from commit and hosting through URL, DNS, HTTPS, HTTP, browser rendering, API request, and DOM update.

The final checkpoint compares direct DOM/state management with the problems later addressed by React and compares the unbuilt vanilla source with ecosystems that require build tools.

## 11. Web System Learning Track

This track runs alongside implementation. It is not permission to expand the application into a backend project.

### End-to-end model

```text
source code
→ optional build
→ version-control revision
→ deployment process
→ static host/CDN
→ URL and DNS resolution
→ IP routing and TCP connection
→ TLS and HTTPS
→ HTTP request/response
→ browser parsing and rendering
→ JavaScript events and state
→ API request
→ remote server logic/data access
→ JSON response
→ DOM update
```

### Required boundaries

* Frontend: code delivered to and executed by the browser, including the `fetch` call and UI rendering.
* Backend: trusted remote logic that receives requests, enforces permissions/business rules, accesses persistent data, and returns responses. GitHub API is the backend used by this project.
* Infrastructure/network: GitHub Pages, CDN behavior, DNS, IP routing, TCP, TLS certificates, and HTTP transport connect the two sides.

Execution location and trust boundary, not programming language, determine whether a responsibility belongs in the frontend or backend.

### Web Evolution Atlas

The history portion is not limited to React, build tools, GitHub Actions, or Vercel. Those are examples within a broader map spanning the complete web system. The atlas covers the following development lines as they become relevant to the project:

| Area | Evolution line to understand |
| --- | --- |
| Documents and rendering | static documents → CGI/server-generated pages → server templates → AJAX-enhanced pages → SPAs → SSR/SSG and hydration → islands, streaming, and server-component approaches |
| Browser programming | inline/global scripts → DOM APIs → cross-browser libraries such as jQuery → standardized browser APIs → component/state-driven UI frameworks |
| JavaScript organization | copied scripts → package registries/managers → CommonJS/AMD → ES Modules → bundlers, tree shaking, and code splitting |
| Source languages | browser-native JavaScript → transpiled newer syntax → TypeScript and other compile-to-JavaScript tools |
| CSS layout and organization | tables/positioning → floats → Flexbox/Grid → naming methodologies and preprocessors → CSS Modules/CSS-in-JS/utility approaches |
| Browser capabilities | proprietary plugins and browser-specific APIs → standardized HTML5 platform APIs → progressive enhancement, PWAs, service workers, and WebAssembly |
| Client/server communication | HTML forms and full navigation → XMLHttpRequest/AJAX → `fetch` and REST conventions → GraphQL/RPC → WebSocket, server-sent events, and streaming where required |
| Backend structure | simple scripts → monolithic applications → layered/modular monoliths → services and microservices → functions/serverless and edge execution |
| Data storage | files → relational databases and transactions → replication/indexing → caches/search systems → NoSQL and event/stream systems for different data and scale needs |
| Identity and security | plaintext HTTP/basic credentials → TLS/HTTPS → secure cookies and server sessions → token standards, OAuth/OIDC, MFA, and zero-trust-oriented controls |
| Browser security | unrestricted assumptions → same-origin policy → CORS → CSP, secure cookie attributes, sandboxing, and modern isolation policies |
| Hosting and traffic | one origin server → reverse proxies and caches → CDNs → load balancers and autoscaling → API gateways and edge platforms |
| Deployment | manual file copy/FTP → scripted releases → build servers and CI/CD → infrastructure as code → containers/orchestration → managed and serverless platforms |
| Operations | manual inspection → structured/centralized logs → metrics and alerting → distributed tracing and unified observability |
| Performance | unoptimized files → compression/minification → caching and image formats → lazy loading, code splitting, preload priorities, and Core Web Vitals-driven work |
| Testing and quality | manual browser checks → unit/integration tests → browser E2E and contract tests → visual, accessibility, performance, and production checks |
| Collaboration | local copies → centralized version control → distributed Git workflows → pull requests, automated checks, preview environments, and protected releases |
| Architecture and delivery ownership | separate frontend/backend servers → full-stack frameworks and backend-for-frontend patterns → platform engineering and managed developer platforms |

These lines are not universal replacements or a single ladder where newer always means better. Each topic uses the same comparison frame:

```text
original need
→ earlier solution
→ constraint or failure that appeared
→ newer approach
→ benefit gained
→ complexity or trade-off introduced
→ situations where the earlier approach is still the better choice
```

The portfolio supplies concrete anchors for the atlas. Its plain scripts anchor the script/module/build-tool line, GitHub API anchors client/server communication and browser security, and GitHub Pages anchors static hosting, DNS, TLS, CDN, and deployment. Topics without a concrete project anchor stay in the backlog until a later project needs them.

### Repeated checkpoint teaching frame

At each milestone, the Learning Manager explains rather than quizzes:

1. Where the code just written executes.
2. Which layers it crosses before it becomes visible or usable.
3. What failure occurs if a component is absent.
4. Which later tool, standard, framework, or infrastructure approach addresses the problem at greater scale.
5. What cost or new complexity that later approach introduces.
6. When the older or simpler approach is still the better choice.

The explanation does not block the next implementation step. Understanding questions are asked only when the learner explicitly requests them.

### Depth control

* NOW: details required to implement the current milestone.
* CHECKPOINT: how the completed feature fits into the end-to-end web path.
* LATER: unencountered branches of the Web Evolution Atlas, deeper browser internals, distributed infrastructure, framework design, and server operations that do not unblock this release.

### Frontend Roadmap long-term coverage

The complete roadmap at `https://roadmap.sh/frontend` is the long-term frontend curriculum, not the implementation scope of this single portfolio. Every roadmap topic should eventually reach at least conceptual and historical understanding; core topics should also be practiced and applied in an appropriate project.

Roadmap progress is tracked separately from feature completion using these states:

| State | Meaning |
| --- | --- |
| NOT STARTED | The topic has not been introduced. |
| UNDERSTOOD | The learner can explain its purpose, origin, and basic mechanism. |
| PRACTICED | The learner completed a focused exercise. |
| APPLIED | The learner used and verified it in a real project. |
| EXPLAINED | The learner can compare alternatives, trade-offs, and appropriate use cases without prompts. |

The roadmap is periodically updated, so the learning records preserve the topic list/version reviewed at a checkpoint instead of assuming the external page is permanently fixed.

This project directly applies internet/web basics, HTML, CSS, JavaScript, DOM/events, responsive design, accessibility, Git/GitHub, REST API consumption, browser developer tools, introductory security/performance/SEO, and static deployment. Package management, ES Modules, build tools, TypeScript, React, automated testing, advanced performance/security, SSR/SSG, CI/CD, and larger frontend architecture require later exercises or projects.

Roadmap completion does not mean shallow checkbox completion. A topic is assigned to the smallest project that provides a genuine reason to use it, and the learner records why it was chosen, what problem it solved, and what cost it introduced.

## 12. Documentation Rules During Implementation

* Update `docs/learning/status.md` at the end of each work session.
* Record milestone checkpoints in `docs/learning/checkpoints.md`.
* Track the external Frontend Roadmap curriculum separately from the portfolio feature checklist.
* Put important but non-blocking discoveries in `docs/learning/backlog.md`.
* Record architectural decisions in `docs/learning/decisions.md`.
* Keep explanations concise during implementation and return to the end-to-end web model at meaningful milestones.
* Deliver checkpoints as concise guided explanations, not mandatory learner quizzes.
* Do not invent the currently missing `docs/learning/manager.md`; incorporate it if the project later provides the authoritative file.

## 13. Project Completion Criteria

The portfolio project is complete when the required site behavior works locally and on GitHub Pages with clearly replaceable sample content, the documented checks pass, and the learner can explain the end-to-end request path, at least three event → state → render flows in this codebase, and the need/limitation/trade-off chain for the evolution branches encountered during the project. Replacing samples with personal content is the first learner-led post-completion exercise. Completion of this portfolio advances, but does not by itself complete, the full Frontend Roadmap curriculum.
