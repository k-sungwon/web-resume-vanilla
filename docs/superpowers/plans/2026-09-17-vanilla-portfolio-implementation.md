# Vanilla Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, document, and deploy the required responsive vanilla portfolio while connecting each milestone to the end-to-end web system and long-term Frontend Roadmap curriculum.

**Architecture:** A semantic `index.html` and one mobile-first stylesheet provide the static document and visual system. Five classic deferred scripts, each isolated in an IIFE, independently own navigation, theme, scroll, contact, or GitHub-project state and rendering.

**Tech Stack:** HTML5, CSS, browser JavaScript, GitHub REST API, `localStorage`, Intersection Observer, Chrome DevTools, Git, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-17-vanilla-portfolio-design.md`

## Global Constraints

* Use HTML, CSS, and JavaScript without React, Vue, jQuery, Bootstrap, Tailwind CSS, or other application libraries.
* Load every external JavaScript file with `defer`; use no inline scripts, inline event handlers, or inline styles.
* Use only `const` and `let`; use `addEventListener` for events.
* Use mobile-first styles with breakpoints at exactly 768px and 1024px.
* Use Flexbox for navigation and `repeat(auto-fit, minmax(...))` Grid for projects.
* Keep scripts independent: each file uses an IIFE, accesses only its own DOM, and exits safely if its root is missing.
* Treat browser code as public: store no secret or privileged credential.
* Keep the first release to required mission behavior; record optional features in the backlog.
* Finish each task with its Learning Checkpoint, status update, verification, and focused commit.
* Present Learning Checkpoints as guided explanations and continue without waiting for learner answers unless the learner asks for questions.

## File Map

* Create `index.html`: semantic document and stable DOM contract for all features.
* Create `css/style.css`: tokens, components, themes, responsive layout, motion/accessibility states.
* Create `js/navigation.js`: hamburger and anchor navigation.
* Create `js/theme.js`: theme state, rendering, and persistence.
* Create `js/scroll.js`: scrolled header, top button, and reveal observer.
* Create `js/contact.js`: form values, validation, error/success rendering.
* Create `js/projects.js`: GitHub request state and project-card rendering.
* Create `images/profile-placeholder.svg`: local replaceable profile image.
* Create `docs/learning/frontend-roadmap.md`: versioned long-term curriculum tracker.
* Modify `docs/learning/status.md`: current milestone and next work.
* Modify `docs/learning/checkpoints.md`: completed milestone learning evidence.
* Modify `docs/learning/backlog.md`: non-blocking discoveries only.
* Modify `README.md`: setup, behavior thresholds, technology, verification, deployment URL, screenshots.

---

### Task 1: Semantic document, asset connections, and curriculum tracker

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/navigation.js`
- Create: `js/theme.js`
- Create: `js/scroll.js`
- Create: `js/contact.js`
- Create: `js/projects.js`
- Create: `images/profile-placeholder.svg`
- Create: `docs/learning/frontend-roadmap.md`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/checkpoints.md`

**Interfaces:**
- Produces DOM roots: `.site-header`, `.nav-toggle`, `.nav-links`, `#hero`, `#about`, `#skills`, `#projects`, `#contact`, `#project-state`, `#contact-form`, `#scroll-top`, and `[data-reveal]`.
- Produces accessible state hooks: `aria-expanded`, `aria-controls`, `aria-live`, field `aria-describedby`, and error elements named `<field>-error`.

- [ ] **Step 1: Record the failing baseline**

Run `python3 -m http.server 4173`, open `http://localhost:4173`, and record: `FAIL — index.html is absent, so no semantic portfolio or linked assets load.` Stop the server after the check.

- [ ] **Step 2: Create the semantic document and stable DOM contract**

Use this exact outer structure, then fill every named section with the concrete sample copy listed below:

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="HTML, CSS, JavaScript로 만든 학습용 프론트엔드 포트폴리오">
  <title>Kim Developer | Frontend Portfolio</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/navigation.js" defer></script>
  <script src="js/theme.js" defer></script>
  <script src="js/scroll.js" defer></script>
  <script src="js/contact.js" defer></script>
  <script src="js/projects.js" defer></script>
</head>
<body>
  <header class="site-header">
    <nav class="site-nav" aria-label="주요 탐색">
      <a class="logo" href="#hero">KD</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu">
        <span class="sr-only">메뉴 열기</span><span aria-hidden="true">☰</span>
      </button>
      <ul class="nav-links" id="primary-menu">
        <li><a href="#about">About</a></li><li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li><li><a href="#contact">Contact</a></li>
      </ul>
      <button class="theme-toggle" type="button" aria-label="다크 모드로 전환">🌙</button>
    </nav>
  </header>
  <main>
    <section id="hero" class="hero" data-reveal><p>안녕하세요.</p><h1>배우며 만드는 프론트엔드 개발자 Kim입니다.</h1><p>웹의 구조부터 사용자 경험까지 직접 구현하고 이해합니다.</p><a class="button" href="#projects">프로젝트 보기</a><a class="button button-secondary" href="#contact">연락하기</a></section>
    <section id="about" data-reveal><h2>About</h2><img src="images/profile-placeholder.svg" alt="Kim Developer의 프로필 자리표시 이미지"><p>순수 HTML, CSS, JavaScript로 웹의 기본 동작을 학습하고 있습니다.</p></section>
    <section id="skills" data-reveal><h2>Skills</h2><ul class="skill-list"><li>HTML</li><li>CSS</li><li>JavaScript</li><li>Git</li></ul></section>
    <section id="projects" data-reveal><h2>Projects</h2><div id="project-state" aria-live="polite"><p>프로젝트를 불러올 준비 중입니다.</p></div></section>
    <section id="contact" data-reveal><h2>Contact</h2><form id="contact-form" novalidate><label for="name">이름</label><input id="name" name="name" required aria-describedby="name-error"><p id="name-error" class="field-error"></p><label for="email">이메일</label><input id="email" name="email" type="email" required aria-describedby="email-error"><p id="email-error" class="field-error"></p><label for="message">메시지</label><textarea id="message" name="message" required aria-describedby="message-error"></textarea><p id="message-error" class="field-error"></p><button type="submit">보내기</button><p class="form-status" aria-live="polite"></p></form></section>
  </main>
  <footer><p>© 2026 Kim Developer</p><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></footer>
  <button id="scroll-top" type="button" aria-label="페이지 맨 위로 이동">↑</button>
</body>
</html>
```

- [ ] **Step 3: Create the local replaceable profile asset**

Create an SVG with `viewBox="0 0 320 320"`, a neutral circular background, and the visible initials `KD`. Keep it decorative internally because `index.html` supplies the accessible alternative.

- [ ] **Step 4: Create connected empty assets without console 404s**

Add a comment describing responsibility to `css/style.css`. In each script, add an empty isolated initializer:

```js
(() => {
  'use strict';
})();
```

- [ ] **Step 5: Create the Frontend Roadmap tracker**

Create `docs/learning/frontend-roadmap.md` with source URL, snapshot date `2026-09-17`, the five states from the spec, and the hierarchy of every topic visible in the current interactive Frontend Roadmap. Preserve recommended/optional markers when the source provides them. The tracker must include at least the page's top-level HTML, CSS, JavaScript, accessibility, Git, responsive design, UX, SEO, REST APIs, testing/debugging, DevTools, frameworks, performance, and TypeScript categories, plus all visible child nodes. Mark HTML/CSS/JavaScript as `NOT STARTED — scheduled in this project`; assign every other row to this project or `NEXT PROJECT` without claiming completion.

- [ ] **Step 6: Verify the task**

Open the local site and verify all six sections, footer, local profile image, labels, and anchor destinations exist. In DevTools Network confirm HTML, CSS, five scripts, and SVG return 200. Run `rg -n "onclick=|style=|\bvar\b" index.html css js`; expected: no matches.

- [ ] **Step 7: Deliver Learning Checkpoint 0/1 and commit**

Record a concise guided explanation in `docs/learning/checkpoints.md`: what each file does, why HTTP serving differs from opening a file directly, where each asset request appears, and why semantic elements/labels matter. Update status, then commit with `feat: add semantic portfolio foundation`.

---

### Task 2: Mobile-first visual system and responsive layout

**Files:**
- Modify: `css/style.css`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/checkpoints.md`

**Interfaces:**
- Consumes the Task 1 classes and section IDs.
- Produces theme tokens under `:root` and `[data-theme="dark"]`, `.active`, `.scrolled`, `.visible`, project-grid, form, focus, and reduced-motion styles used by later scripts.

- [ ] **Step 1: Capture failing layout checks**

At widths 375, 768, and 1280, record failures: unstyled content, no collapsed mobile menu, no Grid project layout, and no visible focus system.

- [ ] **Step 2: Add tokens and mobile base rules**

Define at least `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-accent`, `--space-1` through `--space-6`, `--radius`, `--shadow`, and `--max-width`. Add dark overrides only under `[data-theme="dark"]`. Set `box-sizing`, readable line height, constrained section width, visible `:focus-visible`, `.sr-only`, buttons, cards, fields, and errors.

- [ ] **Step 3: Add required layout rules**

Use these contracts:

```css
.site-nav { display: flex; align-items: center; justify-content: space-between; }
.nav-links { display: none; }
.nav-links.active { display: flex; flex-direction: column; }
.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); gap: var(--space-4); }
@media (min-width: 768px) { .nav-toggle { display: none; } .nav-links { display: flex; flex-direction: row; } }
@media (min-width: 1024px) { .hero { min-height: 90vh; } }
```

Add hover transitions only for devices that support hover. Under `prefers-reduced-motion: reduce`, remove nonessential animation and force immediate scroll behavior.

- [ ] **Step 4: Verify responsive behavior**

Confirm no horizontal scrolling at 320px, mobile menu hidden by default below 768px, desktop menu visible at 768px and above, section content remains readable at 1024px+, and the empty project container already uses the future grid width safely.

- [ ] **Step 5: Deliver Learning Checkpoint 2 and commit**

Explain why navigation uses Flexbox, projects use Grid, mobile rules come first, and CSS becomes CSSOM/layout/paint. Record the explanation, update status, and commit with `feat: add responsive visual system`.

---

### Task 3: Navigation and scroll interactions

**Files:**
- Modify: `js/navigation.js`
- Modify: `js/scroll.js`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/checkpoints.md`

**Interfaces:**
- `navigation.js` owns `setMenuOpen(isOpen: boolean): void` and `closeMenu(): void` inside its IIFE.
- `scroll.js` uses `HEADER_SCROLL_THRESHOLD = 60`, `TOP_BUTTON_THRESHOLD = 300`, and observer threshold `0.2`.

- [ ] **Step 1: Verify current interactions fail**

At 375px, click the hamburger and confirm no menu opens. Scroll beyond 300px and confirm neither header nor top button changes. Click an anchor and observe no JavaScript-managed smooth navigation.

- [ ] **Step 2: Implement navigation state**

Inside the IIFE, query the toggle, menu, and internal anchors; return early when toggle/menu is absent. `setMenuOpen` must toggle `.active`, set `aria-expanded`, and update the screen-reader label. Anchor clicks call `preventDefault()`, `scrollIntoView({ behavior: 'smooth' })`, and `closeMenu()`.

- [ ] **Step 3: Implement scroll-derived UI**

Create `updateScrollUi()` that toggles `.scrolled` after 60px and `.visible` on `#scroll-top` after 300px. The top button calls `window.scrollTo({ top: 0, behavior: 'smooth' })`. Observe every `[data-reveal]` element with threshold `0.2`, add `.visible` on intersection, then unobserve it.

- [ ] **Step 4: Verify syntax and behavior**

Run `node --check js/navigation.js` and `node --check js/scroll.js`; expected: exit 0. Verify hamburger open/close, `aria-expanded`, link close, thresholds, top action, reveal behavior, keyboard activation, and reduced-motion styling.

- [ ] **Step 5: Run Learning Checkpoint 3 and commit**

Trace one click through `querySelector → addEventListener → state/class → DOM → paint`; explain why scroll values are derived rather than persisted. Update status and commit with `feat: add navigation and scroll interactions`.

---

### Task 4: Persistent theme state

**Files:**
- Modify: `js/theme.js`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/checkpoints.md`

**Interfaces:**
- Private constants/functions: `STORAGE_KEY = 'portfolio-theme'`, `getInitialTheme(): 'light'|'dark'`, `renderTheme(theme): void`, `setTheme(theme): void`.

- [ ] **Step 1: Verify the theme test fails**

Click `.theme-toggle`; expected failure before implementation: theme and label do not change and refresh cannot restore a selection.

- [ ] **Step 2: Implement state, rendering, and persistence**

Read only `light` or `dark` from storage; otherwise default to `light`. `renderTheme` sets `document.documentElement.dataset.theme`, icon text, and the label describing the next action. `setTheme` updates the private state, renders, and writes storage. The click listener toggles the state.

- [ ] **Step 3: Verify theme behavior**

Run `node --check js/theme.js`. Test light → dark → refresh → dark, then dark → light → refresh → light. In Application > Local Storage confirm only `portfolio-theme` is written. Confirm focus styling and text contrast remain visible.

- [ ] **Step 4: Run Learning Checkpoint 4A and commit**

Explain browser storage scope, why state is the source of the rendered theme, and why secrets cannot be stored safely in frontend code. Update status and commit with `feat: add persistent theme state`.

---

### Task 5: Contact form state and validation

**Files:**
- Modify: `js/contact.js`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/checkpoints.md`

**Interfaces:**
- Private functions: `getValues(): {name:string,email:string,message:string}`, `validate(values): {name:string,email:string,message:string}`, `renderErrors(errors): void`, `hasErrors(errors): boolean`.

- [ ] **Step 1: Verify invalid submissions currently fail UX requirements**

Submit an empty form and malformed email. Expected failure: there are no custom field messages and no controlled success/error state.

- [ ] **Step 2: Implement validation**

Trim values. Use `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` for basic email shape. Required errors are `이름을 입력해 주세요.`, `이메일을 입력해 주세요.`, and `메시지를 입력해 주세요.`; malformed email is `올바른 이메일 형식을 입력해 주세요.`. Render errors with `textContent`, `.invalid`, and `aria-invalid`.

- [ ] **Step 3: Implement input and submit flows**

On `input`, validate and rerender only the changed field. On `submit`, call `preventDefault`, validate all values, focus the first invalid field when needed, otherwise show `메시지가 성공적으로 확인되었습니다.` and reset the form/error state. Do not claim real delivery.

- [ ] **Step 4: Verify the validation matrix**

Run `node --check js/contact.js`. Test empty all, each empty field independently, malformed email, surrounding whitespace, valid Korean/English names, and valid submission. Confirm errors are adjacent, screen-reader relationships remain, and Enter/keyboard submission works.

- [ ] **Step 5: Run Learning Checkpoint 4B and commit**

Explain input → values/errors → render and why client validation improves UX but cannot replace server validation. Update status and commit with `feat: add contact form validation`.

---

### Task 6: GitHub API request-state rendering

**Files:**
- Modify: `js/projects.js`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/checkpoints.md`

**Interfaces:**
- Configuration: `GITHUB_USERNAME = 'octocat'`, `REPOSITORY_LIMIT = 6`.
- State: `{status:'idle'|'loading'|'success'|'empty'|'error', repositories:Array, errorMessage:string}`.
- Private functions: `escapeHtml(value): string`, `getSafeRepositoryUrl(value): string`, `renderProjects(): void`, `loadRepositories(): Promise<void>`.

- [ ] **Step 1: Verify the loading feature is absent**

Reload and inspect Network. Expected failure: no request to `api.github.com`, no state transition, and no repository card.

- [ ] **Step 2: Implement safe state rendering**

Use `textContent` for single messages. Use a template literal plus `map().join('')` for cards only after escaping `name`, `description`, and `language`. `getSafeRepositoryUrl` accepts only HTTPS URLs on `github.com` and otherwise returns the GitHub profile URL for `GITHUB_USERNAME`; escape the returned URL before inserting it. Each card is an `<article>` containing name, description fallback, language fallback, star count, and safe external repository link. Add `.project-grid` to `#project-state` only for success and remove it for loading, empty, and error. Error markup includes `.project-retry`.

- [ ] **Step 3: Implement the async request**

Set loading before `fetch('https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6')`. Throw a rate-limit-specific Korean message for 403 and a generic HTTP error for other non-OK responses. Parse JSON, destructure used properties, transition to empty or success, and catch into error. Register retry using event delegation on `#project-state` so rerendering does not lose the listener.

- [ ] **Step 4: Verify all request states**

Run `node --check js/projects.js`. Verify loading and success with `octocat`; use an invalid username for 404/error and retry; temporarily substitute `[]` for parsed data to verify empty, then revert; temporarily force a 403 response branch to verify the rate-limit message, then revert. Confirm the committed code contains neither forced state. Inspect Network headers/status/JSON and confirm no console error.

- [ ] **Step 5: Run Learning Checkpoint 5 and commit**

Trace URL/DNS/TCP/TLS/HTTP/API/JSON/DOM conceptually; identify browser frontend, GitHub backend, CORS boundary, and why API state needs four visible outcomes. Update the roadmap rows for REST API and DevTools based on evidence, update status, and commit with `feat: render github project states`.

---

### Task 7: Integrated accessibility, SEO, performance, and documentation QA

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `README.md`
- Modify: `docs/learning/frontend-roadmap.md`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/checkpoints.md`

**Interfaces:**
- Consumes the complete local site.
- Produces the documented release candidate; no new feature state.

- [ ] **Step 1: Run and record a failing release audit**

Audit at 320, 768, 1024, and 1440 widths; keyboard-only navigation; light/dark; reduced motion; slow network; offline request; console; Network; and Lighthouse accessibility/performance/SEO. Record each defect before changing code.

- [ ] **Step 2: Fix only verified release defects**

Correct heading order, landmark labels, focus visibility, color contrast, tap sizes, overflow, image dimensions, layout shifts, broken links, and missing metadata discovered in Step 1. Do not add optional mission features.

- [ ] **Step 3: Write README with exact operational facts**

Document purpose, feature list, HTML/CSS/JS stack, folder structure, Live Server instructions, `GITHUB_USERNAME` replacement path, header threshold 60px, top-button threshold 300px, observer threshold 0.2, GitHub unauthenticated limit warning, local verification steps, screenshot locations, and a deployment URL field that is populated only after Task 8.

- [ ] **Step 4: Update curriculum evidence**

In `frontend-roadmap.md`, change statuses only where the implementation and checkpoint prove them. Each changed row links to the relevant project file/checkpoint and records the next gap; do not mark the overall roadmap complete.

- [ ] **Step 5: Re-run the release audit and commit**

Expected: no console errors, no broken local requests, keyboard access to all controls, readable responsive layouts, persistent theme, all project states demonstrable, and form matrix passing. Commit with `docs: complete portfolio release checklist`.

---

### Task 8: GitHub Pages deployment and production verification

**Files:**
- Modify: `README.md`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/checkpoints.md`

**Interfaces:**
- Consumes the verified repository on `main`.
- Produces a public HTTPS GitHub Pages URL and production evidence.

- [ ] **Step 1: Verify repository and release preconditions**

Run `git status --short`, inspect the remote with `git remote -v`, and ensure the release commit contains no temporary forced API states, secrets, or unrelated files. Do not publish if these checks fail.

- [ ] **Step 2: Publish through GitHub Pages**

Push the approved commits, configure Pages to deploy the repository root from `main`, and wait for the Pages deployment to succeed. Record the exact public HTTPS URL.

- [ ] **Step 3: Verify production independently**

Open the public URL in a fresh browsing context. Repeat navigation, theme persistence, form validation, GitHub loading/error retry, responsive widths, keyboard access, console, and Network checks. Confirm relative CSS/JS/image paths work under the repository subpath and HTTPS has no mixed content.

- [ ] **Step 4: Complete documentation and commit**

Add the public URL and desktop/mobile/dark screenshots to README. Record how DNS, TLS, HTTP, GitHub Pages hosting, browser parsing, and GitHub API form the production path. Commit with `docs: record github pages deployment`.

---

### Task 9: Final learning synthesis and next-project handoff

**Files:**
- Modify: `docs/learning/checkpoints.md`
- Modify: `docs/learning/frontend-roadmap.md`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/backlog.md`

**Interfaces:**
- Consumes all implementation and verification evidence.
- Produces the final project checkpoint and an ordered follow-up curriculum; no product-code changes.

- [ ] **Step 1: Complete the system walkthrough**

Document the full chain from source file and Git commit through Pages deployment, URL/DNS, connection/TLS, HTTP, browser DOM/CSSOM/rendering, user event/state/render, GitHub API request, remote backend response, and updated pixels.

- [ ] **Step 2: Complete three concrete state traces**

Use theme, GitHub projects, and contact validation. For each, identify event/input, previous state, transition, render function, DOM mutation, visible result, and failure state.

- [ ] **Step 3: Complete encountered evolution comparisons**

For direct DOM vs React, classic scripts vs ES Modules/build tools, manual checks vs automated tests, and branch-based Pages deployment vs CI/CD/managed previews, record earlier need, limitation, newer approach, gain, cost, and when the simpler approach remains appropriate.

- [ ] **Step 4: Reconcile the Frontend Roadmap tracker**

Confirm every current roadmap topic appears once in the local tracker. Preserve honest statuses and group remaining topics into the smallest follow-up projects: tooling/TypeScript, React application, automated testing, SSR/performance, and advanced accessibility/security.

- [ ] **Step 5: Finish the project status and commit**

Mark the portfolio milestone complete only if local and production evidence exists. Set the next task to the first follow-up curriculum project and commit with `docs: complete vanilla portfolio learning checkpoint`.

---

## Final Verification Gate

Before declaring completion, invoke `superpowers:verification-before-completion` and verify:

1. Every required mission item maps to a passing check above.
2. `node --check` succeeds for all five scripts.
3. `rg -n "onclick=|style=|\bvar\b" index.html css js` returns no violations.
4. Local and production browser checks pass with no console or asset-load errors.
5. GitHub API loading, success, empty, error, and retry states have evidence.
6. README contains the real deployment URL and screenshots.
7. Learning status, checkpoints, decisions, backlog, and Frontend Roadmap tracker agree with the implementation.
