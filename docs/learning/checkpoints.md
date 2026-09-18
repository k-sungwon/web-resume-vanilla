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
