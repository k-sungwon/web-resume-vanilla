Learning Checkpoints

This document records milestone-level learning summaries.

Each checkpoint should contain:

Milestone

What was completed.

What I Built

The actual features implemented.

Core Concepts

3–5 concepts that matter most.

Project Connection

Where those concepts appear in the actual code.

Browser / CS Connection

Relevant underlying mechanisms.

React Connection

How React abstracts or represents the same idea.

Guided Explanation

A concise explanation of the completed feature, its underlying mechanism, and its place in the wider web system. Checkpoints teach the concept directly and do not pause progress with quiz questions.

Remaining Gaps

Concepts that still need reinforcement.

⸻

## Milestone 0/1 — Structure and semantic HTML

### What I Built

* Connected `index.html`, one external stylesheet, and five deferred feature scripts.
* Created Header/Nav, Hero, About, Skills, Projects, Contact, and Footer landmarks.
* Connected labels and controls, meaningful image alternative text, anchor targets, and live-status regions.
* Created a dated Frontend Roadmap learning tracker.

### Core Concepts

* HTML describes document meaning and relationships.
* CSS and JavaScript are separate resources requested by the browser.
* `defer` lets scripts download while parsing and execute after the document is parsed.
* Labels, headings, landmarks, and ARIA state help expose meaning beyond visual layout.

### Project Connection

* `index.html` owns the content structure and DOM contract.
* `css/style.css` will own presentation.
* Files under `js/` will each own one interaction domain.

### Browser / CS Connection

The local server maps an HTTP request path to a file. The browser first receives HTML, discovers linked CSS, JavaScript, and image URLs, requests them separately, parses the HTML into a DOM, and waits for deferred scripts until parsing finishes.

### React Connection

React will later create and update DOM from component descriptions, but semantic HTML choices and accessible relationships remain necessary.

### Understanding Check

1. Why are CSS and JavaScript separate HTTP requests even though they are linked from HTML?
2. Why is `defer` useful for these scripts?
3. What information do `section`, heading hierarchy, `label`, and `alt` provide?

### Learner Response and Correction

* Separate requests: initially unknown. HTML contains resource URLs rather than embedding the linked file contents, so the browser requests each resource and can download/cache/manage it independently.
* `defer`: correctly identified that it prevents script loading from stopping HTML parsing. More precisely, download proceeds alongside parsing and execution waits until parsing completes while preserving document order.
* Semantics: correctly identified structure, readability, and browser understanding. Extended to the accessibility tree, screen readers, search engines, label/control association, and image text alternatives.

### Remaining Gaps

* CSSOM, layout, paint, and compositing will be connected during the styling milestone.
* Event, state, and DOM update flows begin with the interaction milestone.
* Reinforce the difference between an HTML reference URL and the separately fetched response body.

⸻

## Milestone 2 — CSS and responsive layout

### What I Built

* Defined reusable light/dark color, spacing, radius, shadow, width, and header tokens with CSS custom properties.
* Built the mobile-first base layout, accessible focus styles, buttons, skills, project state, form, footer, and reduced-motion rules.
* Used Flexbox for one-dimensional navigation and Grid for responsive project cards and the tablet About layout.
* Added required breakpoints at 768px and 1024px.
* Removed a 320px horizontal-overflow bug caused by a fixed `body` minimum width.

### Core Concepts

* The cascade and custom properties allow shared design decisions to flow through many selectors.
* Mobile-first CSS starts with the smallest layout and adds changes as space becomes available.
* Flexbox controls alignment primarily along one axis; Grid controls rows and columns together.
* Responsive rules change layout based on available viewport width rather than device names.

### Project Connection

* `:root` and `[data-theme='dark']` define the visual tokens used by all components.
* `.site-nav` and `.nav-links` use Flexbox.
* `.project-grid` uses `repeat(auto-fit, minmax(...))` so card count adapts without per-device columns.
* The 768px breakpoint exposes desktop navigation and the About grid; 1024px increases large-screen spacing.

### Browser / CS Connection

The browser downloads CSS separately, parses it into the CSSOM, combines applicable DOM and CSSOM information for rendering, calculates element geometry during layout, paints visual pixels, and composites layers for the final screen. A viewport change can invalidate style and layout calculations without changing the HTML.

### React Connection

React may decide which elements and classes exist, but the browser still performs the same cascade, layout, paint, and compositing work. Component frameworks do not replace CSS fundamentals.

### Guided Explanation

Navigation arranges logo, links, and controls mainly along one horizontal axis, so Flexbox provides the clearest alignment model. Project cards must form both columns and rows while changing their count according to available width, so Grid's `auto-fit` and `minmax` model fits that responsibility.

The unwrapped CSS rules target the smallest screens first. At 768px, enough horizontal space exists to replace the hamburger layout with a visible row menu and to divide About into two columns. At 1024px, only spacing and large-screen proportions expand. This avoids building a desktop layout and then repeatedly undoing it for smaller screens.

The browser parses HTML into the DOM and CSS into the CSSOM. It combines the relevant structure and computed styles, calculates geometry during layout, paints visual details, and composites the result into the final screen. Changing viewport width can recalculate styles and layout without changing the HTML.

### Remaining Gaps

* Reinforce cascade specificity when interaction classes begin changing presentation.
* Connect layout/paint updates to JavaScript class changes in the next milestone.

⸻

## Milestone 3 — DOM and events

### What I Built

* Implemented mobile-menu open/close state with matching visual class, accessible label, and `aria-expanded` value.
* Connected internal links to smooth section navigation and automatic menu closing.
* Changed Header and scroll-top button classes at 60px and 300px scroll thresholds.
* Revealed sections with Intersection Observer threshold `0.2` and a no-observer fallback.
* Honored reduced-motion preference for programmatic scrolling.

### Core Concepts

* `querySelector` and `querySelectorAll` connect JavaScript to existing DOM nodes.
* `addEventListener` registers a function to run when the browser reports an event.
* State must be reflected in both visual classes and accessibility attributes.
* Scroll position can be derived from browser state instead of stored separately.

### Project Connection

* `js/navigation.js` owns menu state and internal-link click handling.
* `js/scroll.js` owns scroll-derived Header/top-button state and reveal observation.
* `.active`, `.scrolled`, `.visible`, and `.reveal-ready` connect JavaScript decisions to CSS presentation.

### Browser / CS Connection

The browser dispatches a click or scroll event to registered listeners. JavaScript changes attributes or class tokens on DOM objects. Those changes can alter matched CSS rules, causing style recalculation and, when geometry or pixels change, layout and paint work.

### React Connection

This project performs state-to-DOM synchronization manually. React later lets a component describe UI from state and handles the DOM update step, but the underlying browser events, DOM, CSS, layout, and paint still exist.

### Guided Explanation

The hamburger click first reads the current `aria-expanded` value, computes the next boolean state, then sends that one state to `setMenuOpen`. That render function updates the `.active` class, `aria-expanded`, and screen-reader label together, preventing visible and accessible state from drifting apart.

Scroll UI does not copy `scrollY` into a long-lived state object. Each scroll event derives whether thresholds have been crossed and toggles the corresponding classes. Intersection Observer replaces continuous manual position calculations for reveal effects by notifying the code only when an observed section crosses the configured visibility threshold.

This imperative style becomes harder to coordinate as UI grows because every state change must update every related DOM detail. Component frameworks such as React arose partly to make state-to-view synchronization declarative, at the cost of framework runtime, conventions, and build complexity.

### Remaining Gaps

* Theme state introduces persistence and an explicit render function in the next milestone.
* Larger applications need stronger rules for coordinating state shared by multiple components.

⸻

## Milestone 4A — Persistent theme state

### What I Built

* Initialized a `light` or `dark` theme from `localStorage` with a safe light fallback.
* Rendered the state through `data-theme`, the toggle icon, and the accessible next-action label.
* Persisted each toggle and verified both dark and light restoration after reload.
* Kept the current-page theme functional when browser storage is unavailable.

### Core Concepts

* State is the current value the UI should represent.
* A render function maps one state to every related DOM detail.
* Persistence lets a later page load reconstruct state.
* Browser storage is controlled by the user and cannot protect secrets.

### Project Connection

* `getInitialTheme` validates stored input and chooses the initial state.
* `setTheme` changes state, renders it, and persists it.
* `renderTheme` updates the root `data-theme`, icon, and accessible label together.
* CSS theme variables turn one root attribute change into a site-wide visual change.

### Browser / CS Connection

`localStorage` is synchronous key/value storage scoped to an origin. On reload, JavaScript runs again, reads the stored string, reconstructs state, and updates the DOM. The CSS cascade then resolves the dark or light custom properties and triggers new painting.

### React Connection

The explicit `theme` variable resembles component state, while `renderTheme` resembles the view produced from that state. React automates rerender scheduling, but persistence still requires an external browser API and validation when data is restored.

### Guided Explanation

The button does not directly toggle unrelated DOM details one by one. It chooses the next state and passes it through one render path, keeping the root attribute, icon, and label consistent. This is the smallest form of state-driven UI.

`localStorage` improves continuity but not trust. Any browser user or injected script can inspect or modify it, so it is suitable for preferences and drafts, not passwords, API secrets, or authoritative permissions.

### Remaining Gaps

* Form state will add multiple values and validation errors.
* Shared state, storage events across tabs, and system-theme detection remain later topics.

⸻

## Milestone 4B — Contact form state and validation

### What I Built

* Collected trimmed name, email, and message values into form state.
* Validated required values and basic email shape during input and submit events.
* Rendered adjacent errors, invalid classes, `aria-invalid`, first-error focus, and a success message.
* Prevented native submission and made successful submission explicitly simulated rather than claiming delivery.

### Core Concepts

* One input event changes one value/error pair; submit validates the complete state.
* Validation produces data, and rendering decides how that data appears in the DOM.
* `preventDefault` replaces a browser's native form navigation with application behavior.
* Client validation improves UX but cannot establish trust.

### Project Connection

* `getValues` reads and normalizes DOM values.
* `validateField` and `validate` create error state without deciding presentation.
* `renderFieldError` and `renderErrors` synchronize error state with text, class, and ARIA attributes.
* `hasErrors` controls the error or success branch.

### Browser / CS Connection

Input events fire as editable values change. Submit is a separate event whose default behavior would navigate and send form fields. Calling `preventDefault` keeps the page in place so JavaScript can validate and render feedback.

### React Connection

React forms often keep input and error values in component state and render messages from that state. The same data-flow idea is visible here without framework abstractions.

### Guided Explanation

Separating validation from rendering matters because a rule such as “email is malformed” is data, while red borders, error text, and focus are presentation decisions. Keeping those responsibilities distinct makes the rules easier to reuse and the UI easier to change.

The browser is controlled by the user, so client validation can be disabled or bypassed. A future real form service must repeat validation on its trusted server before storing data, sending email, or making permission-sensitive decisions.

### Remaining Gaps

* Real submission, server validation, spam protection, and CSRF defenses remain outside the first release.
* More complex forms may need debouncing, async validation, and richer error summaries.

⸻

## Milestone 5 — GitHub API and request states

### What I Built

* Requested six recently updated public repositories from the GitHub REST API.
* Rendered loading, success, empty, general-error, and rate-limit-specific states.
* Added a retry action that sends the request through the same state transition again.
* Escaped remote text and restricted repository links to HTTPS GitHub URLs before inserting them into the page.

### Core Concepts

* `fetch` starts an HTTP request and returns a promise for the response.
* `async`/`await` expresses asynchronous steps in readable sequence without blocking the browser's main thread while the network is pending.
* A completed network request is not necessarily an application success; `response.ok` and the HTTP status must also be checked.
* Request-driven UI needs explicit loading, success, empty, and error states.
* Data from an API is external input and must not be trusted merely because its source is familiar.

### Project Connection

* `loadRepositories` owns the request lifecycle and translates HTTP/JSON outcomes into UI state.
* `updateState` and `renderProjects` keep network decisions separate from DOM presentation.
* `renderProjectCards` uses `map`, destructuring, and template literals to transform repository objects into cards.
* `escapeHtml` and `getSafeRepositoryUrl` constrain remote content before it reaches `innerHTML` or a link destination.

### Browser / CS Connection

The page JavaScript runs in the browser, resolves `api.github.com`, establishes an HTTPS connection, sends an HTTP request, and receives headers plus a JSON response body. GitHub's server owns the repository data and response status; this portfolio only requests, validates, and presents that response. CORS response headers determine whether browser JavaScript from the portfolio's origin may read the cross-origin response.

### React Connection

React would change how these states are stored and rendered, but it would not remove the network lifecycle. A React component would still need loading, success, empty, and error branches, usually through state hooks or a data-fetching library.

### Guided Explanation

`fetch` rejects for failures such as an unavailable network, but a server can successfully return an HTTP response whose status is `404`, `403`, or `500`. That is why the code checks the response status before parsing and rendering. A `403` receives a more useful rate-limit message, while other unsuccessful responses use a general failure message.

The request flow is a small state machine: `idle → loading → success | empty | error`. Retry does not create a second special workflow; it calls `loadRepositories` again, which first returns the UI to `loading`. Keeping one entry point prevents the first request and later retries from behaving differently.

The browser/API boundary is also a trust boundary. Repository descriptions are escaped before `innerHTML`, and link destinations are accepted only when they use HTTPS on `github.com`. Frontend checks protect presentation, while authentication, authorization, secret storage, and authoritative validation would belong on a trusted server.

### Remaining Gaps

* Request cancellation, timeout policy, pagination, caching, and authenticated rate limits belong to later API work.
* DNS, TLS, HTTP versions, proxies, CDNs, and browser networking will be revisited in the end-to-end web-system track.

⸻

## Milestone 6 — Integrated release QA

### What I Built

* Wrote the operational README with local execution, replacement points, thresholds, verification, and deployment placeholders.
* Connected completed project evidence to honest Frontend Roadmap statuses and recorded the next gap for each area.
* Rechecked syntax, whitespace, keyboard order, color contrast, responsive layouts, request states, external-link safety, and required semantics.
* Ran a local Lighthouse mobile audit: Performance 99, Accessibility 100, and SEO 100.

### Core Concepts

* Verification needs multiple layers because valid syntax does not prove correct behavior, accessibility, or network outcomes.
* Responsive QA checks the same document under different constraints instead of creating separate mobile and desktop sites.
* Accessibility combines semantic structure, keyboard operation, visible focus, state communication, contrast, and motion preferences.
* Performance measurements depend partly on the hosting server, cache policy, connection, and device—not only source size.

### Project Connection

* `node --check` covers JavaScript parsing while browser checks cover real DOM and event behavior.
* The accessibility tree confirmed landmarks, headings, labels, link names, and control names.
* The CSS color pairs all exceeded WCAG AA normal-text contrast, and Lighthouse reported no automated accessibility failure.
* `README.md` records the facts required to run, customize, verify, and later deploy the site.

### Browser / CS Connection

The browser converts the same HTML, CSS, and JavaScript into different layouts according to viewport and user preferences. Lighthouse observes the resulting network waterfall, rendering timeline, DOM, and accessibility information. Its performance result includes server behavior, which is why a Python development server result must not be treated as the final production measurement.

### React Connection

Framework projects need the same release layers. React can organize UI code, but it does not automatically guarantee semantic markup, keyboard access, responsive CSS, safe network states, caching, or fast rendering.

### Guided Explanation

The release audit moves outward from code to user experience: syntax verifies that files parse; DOM inspection verifies structure; interaction tests verify event/state/render flows; responsive and keyboard checks verify alternate use conditions; Network and Lighthouse checks verify resource delivery and browser-level quality signals.

The local score was 99/100/100. The remaining Lighthouse opportunities were cache lifetime, document latency, the dependency tree, and render-blocking CSS. The first two are primarily properties of the temporary local server, while the stylesheet is intentionally render-blocking so the page does not flash unstyled content. Those trade-offs should be reassessed using the production Pages URL instead of adding premature build tooling.

### Remaining Gaps

* Real screen-reader testing and broader browser/device coverage remain future quality work.
* Production caching, HTTPS, repository subpath behavior, and public availability require the deployment milestone.
