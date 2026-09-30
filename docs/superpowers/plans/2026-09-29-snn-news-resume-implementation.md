# SNN News Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic Vanilla portfolio presentation with an SNN-branded personal news site while preserving every required mission interaction, state flow, accessibility contract, and GitHub Pages deployment behavior.

**Architecture:** Keep the existing semantic HTML, one mobile-first stylesheet, and five isolated deferred IIFE scripts. Static interview copy lives in HTML; `projects.js` joins a small repository-name keyed editorial dataset with live GitHub API metadata before rendering project articles.

**Tech Stack:** HTML5, CSS, browser JavaScript, GitHub REST API, `localStorage`, Intersection Observer, Chrome DevTools, Git, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-29-snn-news-resume-design.md`

## Global Constraints

* Use only plain HTML, CSS, and JavaScript; do not add React, Vue, jQuery, Bootstrap, Tailwind CSS, an application library, or a build step.
* Keep external CSS and deferred JavaScript files; use no inline style, inline script, or inline event handler.
* Preserve one IIFE per JavaScript feature file, `const`/`let`, `addEventListener`, and safe early returns when a required DOM root is absent.
* Preserve the required `#hero`, `#about`, `#skills`, `#projects`, `#contact`, footer, form fields, project state root, and scroll-top control.
* Add the editorial `#learning`, `#missions`, and `#life` sections without adding a `Developing Story` strip, ticker, carousel, or automatic horizontal motion.
* Use mobile-first CSS with breakpoints at exactly `768px` and `1024px`; use Flexbox for navigation and `repeat(auto-fit, minmax(...))` Grid for project cards.
* Brand the site as `SNN — Sungwon News Network`; borrow news information hierarchy without copying CNN's logo, wording, articles, or images.
* Write Korean body copy as a polite, conversational interview rather than stiff résumé prose.
* Keep the project repository spelling exact, including `codyssey_misson1`.
* The contact form remains a simulated learning interaction and must not claim to transmit a message.
* Treat all GitHub API text as untrusted, accept only safe GitHub HTTPS links, and store no secret or API token in frontend code.
* Preserve the learner's untracked `AGENTS.md`, `CLAUDE.md`, and `docs/mission.md`; do not add them to implementation commits.
* Begin execution in an isolated `codex/snn-news-resume` worktree through `superpowers:using-git-worktrees`.
* Finish each task with a focused verification, concise guided learning note, status update, and commit.

## Review Focus

1. A 320px viewport and long Korean headlines must not create horizontal overflow or unreadable columns; Task 2 tests this at 320px, 768px, and 1024px.
2. Corrupt or unavailable `localStorage` must still allow the current-page theme toggle to work; Task 3 tests invalid stored values and blocked storage.
3. GitHub 403, network failure, empty results, and an API response missing one curated repository must produce explicit safe UI rather than a broken grid; Task 4 tests each path.
4. Repository names, descriptions, languages, and URLs containing hostile or malformed values must not inject markup or create a non-GitHub link; Task 4 tests escaped text and URL allow-listing.
5. A missing README screenshot must retain useful alternative text and must not collapse the project article layout; Task 4 tests a deliberately broken local image path before restoring it.

## File Map

* Modify `index.html`: SNN semantic article structure, interview copy, navigation, required form and state roots.
* Rewrite `css/style.css`: editorial tokens, Day/Night themes, article layouts, project media, responsive states, focus and motion rules.
* Modify `js/theme.js`: Day/Night Edition labels while preserving storage behavior.
* Modify `js/contact.js`: news-tip wording without changing validation semantics.
* Modify `js/projects.js`: `k-sungwon` API configuration, curated editorial data, API merge, safe article rendering.
* Preserve unless a verified regression requires a change: `js/navigation.js`, `js/scroll.js`.
* Preserve `images/profile-placeholder.svg` as the replaceable profile asset for this release.
* Create `images/projects/web-resume-vanilla-readme.png`.
* Create `images/projects/codyssey-mission3-readme.png`.
* Create `images/projects/codyssey-mission2-readme.png`.
* Create `images/projects/codyssey-misson1-readme.png`.
* Replace `images/screenshots/desktop.png`, `images/screenshots/mobile.png`, and `images/screenshots/dark.png` after final local verification.
* Modify `README.md`: SNN purpose, content map, feature behavior, image sources, verification, and deployment result.
* Modify `docs/learning/checkpoints.md`: Milestone 9 guided explanations and evidence.
* Modify `docs/learning/status.md`: active/completed work and next learning task.
* Modify `docs/learning/backlog.md` only when a relevant non-blocking concept appears during implementation.

---

### Task 1: SNN semantic article structure and interview content

**Files:**
- Modify: `index.html`
- Modify: `docs/learning/checkpoints.md`
- Modify: `docs/learning/status.md`

**Interfaces:**
- Produces required roots: `.site-header`, `.site-nav`, `.logo`, `.nav-toggle`, `.nav-links`, `.theme-toggle`, `#hero`, `#about`, `#learning`, `#missions`, `#skills`, `#projects`, `#project-state`, `#life`, `#contact`, `#contact-form`, `.form-status`, `#scroll-top`, and `[data-reveal]`.
- Preserves `#primary-menu`, `aria-expanded`, `aria-controls`, project/form `aria-live`, field `aria-describedby`, and `<field>-error` IDs for the existing scripts.
- Produces no ticker or `Developing Story` DOM.

- [ ] **Step 1: Record the failing personalization baseline**

Run:

```bash
rg -n "Kim Developer|KD|octocat|Developing Story|SNN" index.html js/projects.js
```

Expected before implementation: sample identity and `octocat` match; `SNN` does not match; `Developing Story` does not match.

- [ ] **Step 2: Replace metadata and the header contract**

Set the document language to Korean, title to `SNN | Sungwon News Network`, and description to a one-sentence personal-news summary. Build a black-newsroom-compatible header with the `SNN` logo link, accessible hamburger, links to `About`, `Learning`, `Missions`, `Projects`, `Life`, and `Contact`, plus the existing theme button. Keep the established classes and ARIA attributes so `navigation.js` and `theme.js` remain consumers of the same DOM interface.

- [ ] **Step 3: Build the front-page feature**

Create `#hero` as the leading section and `#about` as its semantic personal-story content. Use three document-order-safe articles: profile/development-start story, main interview headline, and Codyssey/future-interest story. The central headline is `완성보다 이해, 정답보다 근거`; use the existing profile SVG with an honest alternative describing it as a profile placeholder.

- [ ] **Step 4: Add Learning, Missions, and Skills articles**

Add:

* `#learning`: story-based learning and the rule that knowledge must be expressible in the learner's own words.
* `#missions`: three `<article>` elements covering Shell/Docker and the `touch` timestamp insight, the Python quiz and design-rationale feedback, and the Tiny NPU/Superpowers/AI-understanding reflection.
* `#skills`: `Skills Desk` entries for HTML, CSS, JavaScript, Git, Python, and Docker, each with one concrete usage sentence rather than a badge-only list.

- [ ] **Step 5: Add Projects, Life, Contact, and footer structures**

Keep `#project-state` initially populated with `프로젝트 취재를 준비하고 있습니다.` and `aria-live="polite"`. Add `#life` articles for running, 《광마회귀》, and headphone-led music listening. Reframe `#contact` as `Send a Tip`, but preserve the name/email/message IDs, labels, errors, `novalidate`, submit button, and status root. Brand the footer as SNN and link to `https://github.com/k-sungwon` with safe external-link attributes.

- [ ] **Step 6: Run structural checks**

Run:

```bash
rg -n "<header|<nav|<main|<section|<article|<footer" index.html
rg -n "id=\"(hero|about|learning|missions|skills|projects|life|contact)\"" index.html
rg -n "Developing Story|onclick=|oninput=|onsubmit=|style=" index.html
git diff --check
```

Expected: all semantic tags and eight section IDs match; the final search has no matches; diff check exits 0.

- [ ] **Step 7: Verify the accessible document in Chrome**

Serve with `python3 -m http.server 4173`. Verify the heading outline, landmark names, six navigation destinations, profile alternative, three form label/control pairs, initial project live region, footer link, and the absence of a ticker. Confirm the document remains readable before relying on JavaScript.

- [ ] **Step 8: Record Milestone 9.1 and commit**

Explain how `section` groups a topic, `article` represents a self-contained story, the DOM order remains logical before visual Grid placement, and keeping old class/ID hooks is an interface decision. Update status and commit:

```bash
git add index.html docs/learning/checkpoints.md docs/learning/status.md
git commit -m "feat: add SNN editorial content structure"
```

---

### Task 2: Editorial visual system and responsive article layouts

**Files:**
- Modify: `css/style.css`
- Modify: `docs/learning/checkpoints.md`
- Modify: `docs/learning/status.md`

**Interfaces:**
- Consumes all classes and IDs created in Task 1 without changing document order.
- Produces `.active`, `.scrolled`, `.reveal-ready`, `.visible`, `.project-grid`, `.invalid`, and responsive rules required by the existing scripts.
- Produces Day Edition under `:root` and Night Edition under `[data-theme='dark']`.

- [ ] **Step 1: Capture the failing visual baseline**

Open the Task 1 page at 320px, 768px, and 1280px. Record that the old rounded blue portfolio styling does not create the approved black/red newsroom hierarchy or the required asymmetric front page.

- [ ] **Step 2: Replace the design tokens**

Use these fixed core values, plus spacing and type-scale tokens already present:

```css
:root {
  --color-bg: #f4f4f2;
  --color-surface: #ffffff;
  --color-text: #0b0b0b;
  --color-muted: #5b5b5b;
  --color-border: #c8c8c5;
  --color-header: #050505;
  --color-on-dark: #f7f7f7;
  --color-accent: #cc0000;
  --color-accent-strong: #9f0000;
  --color-error: #b42318;
  --max-width: 80rem;
}
```

Night Edition uses `#101010` background, `#1b1b1b` surfaces, `#f3f3f3` text, `#b8b8b8` muted text, `#474747` borders, and `#ff3b30` accent. Keep native/system fonts so the release adds no font request or availability dependency.

- [ ] **Step 3: Build the mobile newsroom base**

Style a sticky black header, red rectangular SNN wordmark, collapsed mobile category menu, strong headline scale, red section rule, flat article dividers, constrained reading measure, image crops, accessible focus outlines, form states, black footer, and scroll-top control. Avoid excessive pills, gradients, shadows, and rounded card styling; keep a restrained shadow only where the assignment requires it for interactive project cards.

- [ ] **Step 4: Add the required responsive layouts**

At `768px`, expose the category navigation and use two-column article groups where content permits. At `1024px`, use `grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr) minmax(0, 0.8fr)` for the lead layout and a multi-column mission grid. Keep project cards on:

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
}
```

Allow the first project article to span two columns only when at least `1024px` is available; do not use CSS `order` to change reading order.

- [ ] **Step 5: Preserve state and motion styling**

Ensure `.nav-links.active`, `.site-header.scrolled`, `#scroll-top.visible`, `.reveal-ready.visible`, field `.invalid`, error text, project loading/error controls, hover-capable pointer states, and `prefers-reduced-motion: reduce` all have visible behavior in both themes.

- [ ] **Step 6: Verify the first Review Focus item**

At 320px, test every long Korean headline and project-state message with `document.documentElement.scrollWidth === document.documentElement.clientWidth`. Repeat visual checks at 768px and 1024px; confirm one-, two-, and three-column transitions, readable document order, project `auto-fit/minmax`, and no clipped focus indicator.

- [ ] **Step 7: Run static checks and commit Milestone 9.2**

Run `git diff --check` and `rg -n "style=" index.html`; expected: no errors or matches. Record why Flexbox fits one-dimensional navigation, Grid fits two-dimensional article placement, and source order must remain meaningful. Commit:

```bash
git add css/style.css docs/learning/checkpoints.md docs/learning/status.md
git commit -m "feat: add responsive SNN newsroom design"
```

---

### Task 3: Reconnect and verify navigation, theme, scroll, and contact states

**Files:**
- Modify: `js/theme.js`
- Modify: `js/contact.js`
- Modify only if a verified selector regression exists: `js/navigation.js`
- Modify only if a verified selector regression exists: `js/scroll.js`
- Modify: `docs/learning/checkpoints.md`
- Modify: `docs/learning/status.md`

**Interfaces:**
- Consumes the preserved Task 1 DOM hooks.
- Preserves `STORAGE_KEY = 'portfolio-theme'`, theme values `'light'|'dark'`, and the existing event → state → render logic.
- Preserves contact field names `name`, `email`, and `message` and their existing validation messages.

- [ ] **Step 1: Run syntax and regression tests before changing scripts**

Run:

```bash
for file in js/*.js; do node --check "$file"; done
```

In Chrome, test mobile menu open/close and `aria-expanded`, all six smooth section links, 60px scrolled header, 300px top button, reveal observer, theme toggle/refresh, empty form, malformed email, and valid form. Record only the regressions caused by the new DOM; do not refactor passing behavior.

- [ ] **Step 2: Update Day/Night Edition theme labels**

Keep the storage key and values unchanged. Change the toggle's accessible next-action label to `Night Edition으로 전환` in light mode and `Day Edition으로 전환` in dark mode. Keep the sun/moon icon decorative.

- [ ] **Step 3: Update the simulated tip-form success copy**

Retain validation and reset behavior. Change only the success status to `제보 내용을 확인했습니다. 실제로 전송되지는 않습니다.` so the interface cannot be mistaken for a real backend submission.

- [ ] **Step 4: Fix only proven selector regressions**

If Step 1 found a mismatch, change the smallest selector or label lookup in `navigation.js` or `scroll.js`; preserve thresholds `60`, `300`, and `0.2`, reduced-motion behavior, event delegation, and safe missing-root handling.

- [ ] **Step 5: Test corrupt and blocked storage**

Set `portfolio-theme` to an unexpected string and reload; expected Day Edition. Temporarily block storage access in the browser test context; expected the current-page toggle still switches themes without an uncaught error. Restore normal storage and verify light/dark persistence across reload.

- [ ] **Step 6: Verify all four interaction domains**

Run syntax checks again. Verify keyboard operation, menu closure after navigation, header/top/reveal scroll behavior, both theme labels and persistence, adjacent form errors, first-invalid-field focus, and the explicit no-transmission success message. Confirm no console error.

- [ ] **Step 7: Record Milestone 9.3 and commit**

Explain that the redesign changed presentation while stable DOM interfaces allowed the same event → state → render logic to survive. Commit only files that actually changed:

```bash
git add js/theme.js js/contact.js docs/learning/checkpoints.md docs/learning/status.md
git commit -m "feat: adapt interactions to SNN presentation"
```

If Step 4 changed `navigation.js` or `scroll.js`, add only the changed file immediately before the commit. Otherwise leave both files untouched.

---

### Task 4: README-preview project articles and live GitHub metadata

**Files:**
- Create: `images/projects/web-resume-vanilla-readme.png`
- Create: `images/projects/codyssey-mission3-readme.png`
- Create: `images/projects/codyssey-mission2-readme.png`
- Create: `images/projects/codyssey-misson1-readme.png`
- Modify: `js/projects.js`
- Modify: `docs/learning/checkpoints.md`
- Modify: `docs/learning/status.md`

**Interfaces:**
- Configuration: `GITHUB_USERNAME = 'k-sungwon'` and `REPOSITORY_LIMIT = 100` so the client can locate curated repositories in one public request.
- Editorial item shape: `{ repoName, displayTitle, interviewSummary, imageSrc, imageAlt }`.
- Merged item shape: the editorial fields plus `{ description, language, starCount, repositoryUrl, updatedAt }` from the matching API repository.
- Private functions: `escapeHtml(value): string`, `getSafeRepositoryUrl(value): string`, `mergeEditorialProjects(repositories): Array`, `renderProjectArticles(): string`, `renderProjects(): void`, and `loadRepositories(): Promise<void>`.

- [ ] **Step 1: Record the failing project baseline**

Reload with Network open. Expected before implementation: request targets `octocat`, cards have no interview copy or README media, and the four selected `k-sungwon` repositories are not rendered as curated articles.

- [ ] **Step 2: Create local README preview assets**

Capture the visible top portion of each public repository README at a consistent `1200 × 675` crop. Do not include browser chrome, private information, or unrelated page UI. Save the four exact PNG paths in the Files list. Confirm each image opens locally and remains legible when cropped with `object-fit: cover`.

- [ ] **Step 3: Define the editorial dataset in display order**

Create `PROJECT_EDITORIAL` in this order:

1. `web-resume-vanilla` — featured article about rebuilding the web fundamentals and deploying them.
2. `codyssey_mission3` — understanding versus completion in the Tiny NPU project.
3. `codyssey_mission2` — Python class decomposition and the need for design rationale.
4. `codyssey_misson1` — Shell/Docker practice and the `touch` timestamp insight.

Each entry supplies an interview-style summary, exact local image path, and descriptive Korean `imageAlt`.

- [ ] **Step 4: Implement the local/API merge**

Set the GitHub user to `k-sungwon`. Implement `mergeEditorialProjects` as editorial-order `map` plus `filter(Boolean)`: find an exact API `name` match for each editorial item, omit a missing match, and normalize the API fields into the merged shape. Unknown API repositories remain outside this curated section.

- [ ] **Step 5: Render safe project articles**

Each success item renders an `<article class="project-card">` with README image, display title, interview summary, escaped description fallback, escaped language fallback, numeric star count, formatted update information, and a safe GitHub link. The first item receives a featured class. Preserve loading, success, empty, generic error, 403-specific error, retry event delegation, and `.project-grid` only for success.

- [ ] **Step 6: Test API and merge failure classes**

Run `node --check js/projects.js`. In controlled browser runs verify:

* real `k-sungwon` response → four curated articles in editorial order;
* one curated repository removed from a copied response → remaining articles render without an empty hole;
* `[]` → empty state;
* network rejection and 404 → generic error plus retry;
* 403 → rate-limit-specific message plus retry.

Restore the real fetch path after each controlled test.

- [ ] **Step 7: Test hostile data and broken media**

Inject a copied repository object whose text contains `<img onerror=alert(1)>` and whose URL uses `javascript:`; expected literal escaped text and fallback `https://github.com/k-sungwon` link. Temporarily break one local image path; expected its Korean `alt` remains available and the article keeps its dimensions. Restore the real data and path before committing.

- [ ] **Step 8: Record Milestone 9.4 and commit**

Explain why personal copy/images are local and stable while GitHub metadata is remote and changeable, and trace load/retry → state → merge → render. Commit:

```bash
git add images/projects js/projects.js docs/learning/checkpoints.md docs/learning/status.md
git commit -m "feat: add curated GitHub project reporting"
```

---

### Task 5: Integrated accessibility, responsive, and release-candidate verification

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify as verified defects require: `js/*.js`
- Replace: `images/screenshots/desktop.png`
- Replace: `images/screenshots/mobile.png`
- Replace: `images/screenshots/dark.png`
- Modify: `README.md`
- Modify: `docs/learning/checkpoints.md`
- Modify: `docs/learning/status.md`
- Modify only if needed: `docs/learning/backlog.md`

**Interfaces:**
- Consumes the complete local release candidate from Tasks 1–4.
- Produces updated public documentation, evidence screenshots, and a verified branch ready for integration.

- [ ] **Step 1: Run the complete static verification**

Run:

```bash
for file in js/*.js; do node --check "$file"; done
git diff --check
rg -n "onclick=|oninput=|onsubmit=|style=" index.html js css
rg -n "\bvar\b" index.html js
rg -n "Developing Story|octocat|Kim Developer|>KD<" index.html js css
```

Expected: all syntax and diff checks pass; every `rg` command has no matches.

- [ ] **Step 2: Run the responsive and visual matrix**

At 320px, 768px, and 1024px+ verify no horizontal overflow, correct lead/article column transitions, readable Korean line breaks, image crops, project auto-fit Grid, mobile/desktop navigation, and black/red SNN hierarchy in Day and Night Editions. Check hover only on a hover-capable device and reduced motion with the operating-system preference enabled.

- [ ] **Step 3: Run the interaction and accessibility matrix**

Use keyboard-only navigation to verify focus order, hamburger, section links, theme, project retry, form, and scroll-top. Confirm one `h1`, logical heading levels, all landmark labels, every meaningful image `alt`, form `for`/`id`, live-region announcements, 60px/300px/0.2 thresholds, and no console error.

- [ ] **Step 4: Run performance and quality checks**

Run local Lighthouse for Performance, Accessibility, Best Practices, and SEO. Treat an Accessibility score below 100, broken resource request, layout shift caused by missing image dimensions, or console error as a release blocker. Record other non-blocking findings in `docs/learning/backlog.md`.

- [ ] **Step 5: Capture final screenshots**

Replace the three README screenshots with the verified SNN desktop Day Edition, mobile Day Edition, and desktop Night Edition. Use consistent browser chrome exclusion and ensure each image shows enough content to identify the SNN design.

- [ ] **Step 6: Rewrite the README for SNN**

Document the personal-news purpose, section map, Vanilla architecture, GitHub API/local-image merge, four request states, Day/Night persistence, form non-transmission behavior, local run command, thresholds, verification commands, public URL, and the new screenshots. Remove the sample-content replacement instructions and old Lighthouse claim; add only newly measured evidence.

- [ ] **Step 7: Record Milestone 9.5 and commit the release candidate**

Update learning status to `SNN release candidate verified` and record the source → Git → Pages → DNS/TLS/HTTP → browser rendering review. Commit:

```bash
git add index.html css js images/screenshots README.md docs/learning
git commit -m "docs: verify SNN news resume release"
```

---

### Task 6: Integration and GitHub Pages production verification

**Files:**
- Modify after production evidence: `README.md`
- Modify: `docs/learning/status.md`
- Modify: `docs/learning/checkpoints.md`

**Interfaces:**
- Consumes a reviewed release-candidate branch and the existing GitHub Pages deployment from `main`.
- Produces a public SNN site at `https://k-sungwon.github.io/web-resume-vanilla/` and final learning evidence.

- [ ] **Step 1: Request code review and resolve verified findings**

Use `superpowers:requesting-code-review`, fix only confirmed defects through the appropriate debugging/TDD workflow, and rerun Task 5 checks after any change.

- [ ] **Step 2: Present branch integration choices**

Use `superpowers:finishing-a-development-branch`. Do not push, create a pull request, merge, or redeploy until the user selects the integration option.

- [ ] **Step 3: Verify GitHub Pages after approved integration**

After the selected integration places the redesign on `main`, open `https://k-sungwon.github.io/web-resume-vanilla/` in a fresh browser context. Verify the SNN title/header, no `Developing Story`, repository-relative CSS/JS/images, the real GitHub API response, menu, theme persistence, form validation, project retry, responsive layout, HTTPS, and no console error.

- [ ] **Step 4: Finalize production evidence**

If production behavior or measured scores differ from README claims, update README with observed values. Mark Milestone 9 complete in learning status, record the deployment checkpoint, run `git diff --check`, and make a final focused documentation commit if evidence changed.

## Plan Self-Review Result

* Spec coverage: purpose, scope, content structure, visual design, classic-script architecture, local/API merge, four request states, errors, responsive verification, learning milestones, and deployment each map to a task.
* Step scan: each step produces one document, style, behavior, data, test, or commit result; no product implementation body is prewritten.
* Interface consistency: Task 1 preserves the selectors consumed by Tasks 2–4; `PROJECT_EDITORIAL` and merged item fields are named once and reused by Task 4.
* Review Focus: all five listed failure classes have explicit checks in Tasks 2–4.
* Proportion: the plan specifies decisions and observable checks while leaving routine HTML, CSS, and function bodies to the implementer.
