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
