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

Understanding Check

2–4 explanation questions.

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
