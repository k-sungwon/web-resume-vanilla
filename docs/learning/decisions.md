Engineering Decisions

Record decisions that meaningfully affect project structure or behavior.

⸻

Decision Template

Decision

What did we decide?

Context

What problem required the decision?

Alternatives

What other approaches were considered?

Why

Why was this approach chosen?

Trade-offs

What did we gain and what did we give up?

⸻

## 2026-09-17 — Feature-separated deferred scripts

### Decision

Use one ordinary deferred JavaScript file per feature, with a private function scope per file, instead of one large script or ES Modules for the first release.

### Context

The mission requires several independent interactions and prioritizes learning the event → state → render flow with plain JavaScript.

### Alternatives

* Put every feature in one `app.js` file.
* Use native ES Modules with `import` and `export`.

### Why

Feature files keep responsibilities visible and independently understandable without introducing module dependency concepts before the required DOM, event, state, and asynchronous fundamentals. A function wrapper prevents classic scripts from creating colliding global names.

### Trade-offs

The design gains simple feature boundaries and avoids build tooling. It gives up explicit module exports/imports and compile-time dependency structure. ES Modules remain a post-release comparison topic.

⸻

## 2026-09-17 — Dual-track implementation and web-systems learning

### Decision

Keep portfolio delivery as the primary track and attach an end-to-end Web System Learning checkpoint to each milestone.

### Context

The learner needs to understand not only browser code but also how source, deployment, DNS, transport, HTTP, hosting, APIs, backend responsibilities, and browser rendering form one system.

### Alternatives

* Finish the portfolio first and study the entire systems model afterward.
* Pause implementation to study full frontend, backend, and network roadmaps in depth.

### Why

Repeatedly connecting concrete project work to the full request path builds a durable mental model without turning prerequisite theory into a blocker.

### Trade-offs

Milestone reviews become slightly longer, but implementation remains focused. Deep network engineering, distributed systems, and framework internals are deferred.

⸻

## 2026-09-17 — Web evolution is studied as a multi-domain atlas

### Decision

Cover the evolution of the whole web system rather than treating React, build tools, GitHub Actions, and Vercel as the complete history.

### Context

The learner wants to understand why components and technologies across frontend, backend, networking, security, data, deployment, and operations appeared and how they interact.

### Alternatives

* Teach a short linear history centered on frontend frameworks.
* List modern technologies by category without their causes and trade-offs.

### Why

A multi-domain atlas preserves the relationships between layers. The repeated need → solution → limitation → newer approach → trade-off frame explains both technological change and why simpler or older approaches remain valid.

### Trade-offs

The total map is much larger than this portfolio. Only branches anchored to the current milestone are studied immediately; the rest remain explicit follow-up topics instead of blocking implementation.

⸻

## 2026-09-17 — Use the complete Frontend Roadmap as a long-term curriculum

### Decision

Track every topic in the current Frontend Roadmap over multiple projects while keeping portfolio completion and roadmap completion as separate goals.

### Context

The learner wants complete coverage rather than a hand-picked subset, but many roadmap topics need different project contexts and cannot be learned deeply through one static portfolio.

### Alternatives

* Cover only topics encountered in the current project.
* Attempt to add every roadmap technology to this portfolio.

### Why

Separate curriculum tracking provides full visibility without creating an over-engineered portfolio. Topics can be assigned to projects that contain a real problem for them to solve.

### Trade-offs

Reaching the final curriculum goal requires follow-up projects and periodic roadmap reviews. In return, progress reflects understanding and application rather than superficial checklist completion.

⸻

## 2026-09-18 — Learning checkpoints use guided explanations

### Decision

Deliver milestone learning as concise explanations and continue implementation without requiring the learner to answer checkpoint questions.

### Context

The learner wants to study while completing the project, but quiz-style pauses interrupt the development flow.

### Alternatives

* Require short learner answers before every milestone commit.
* Remove learning checkpoints entirely.

### Why

Guided explanations preserve the connection between implementation and fundamentals while keeping development moving. Questions remain available when the learner explicitly requests them.

### Trade-offs

The workflow loses mandatory retrieval practice, but gains continuity and lower interruption. Learning records preserve the explanations for later review.

⸻

## 2026-09-29 — Personalize the portfolio as SNN, an editorial news site

### Decision

Redesign the completed portfolio as `SNN — Sungwon News Network`, using CNN-inspired information hierarchy without copying CNN branding or content.

### Context

The generic portfolio layout met the functional mission but did not sufficiently express the learner's personality, project reflections, or preferred way of telling a story.

### Alternatives

* Keep the existing clean portfolio and only replace the sample text.
* Use an aged broadsheet newspaper with paper textures and traditional typography.
* Use a modern news network layout with a black header, red accents, strong headlines, and asymmetric article grids.

### Why

The modern news format supports long interview-style content, clear prioritization, and project reporting while remaining compatible with the required responsive sections and interactions. A distinct SNN identity avoids brand confusion.

### Trade-offs

The design gains personality and a strong editorial structure but requires more careful hierarchy and responsive layout work than a conventional card portfolio. Decorative aged-paper effects are intentionally omitted.

⸻

## 2026-09-29 — Combine GitHub API metadata with local README captures

### Decision

Use the GitHub API for live repository metadata and a repository-name keyed local map for interview copy, display order, and README screenshot assets.

### Context

Project articles need to show real repository information while also including a visually stable excerpt of each README and the learner's own reflection.

### Alternatives

* Render only the GitHub API fields.
* Fetch and render README Markdown at runtime.
* Store all project information locally without the GitHub API.

### Why

The hybrid design keeps the required asynchronous API learning flow and allows each project to have deliberate editorial content. Local screenshots avoid adding a Markdown parser or unsafe HTML rendering to a Vanilla assignment.

### Trade-offs

Live metadata stays current, but README images and interview copy must be updated manually when a repository changes.
