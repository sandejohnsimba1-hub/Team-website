# Code Crafters: Lab 2 Website

**Live site:** https://sandejohnsimba1-hub.github.io/Team-website/

## Team

| Name | Registration no. | GitHub username |
|------|------------------|-----------------|
| John Madimwa | COM/3468/26 | sandejohnsimba1-hub |

## Who drove each part

- Part 0, 2, 4: John Madimwa
- Part 1, 3: John Madimwa

## Personalisation

- **Our colours:** Light theme `--color-primary: #0b5ed7`, `--color-primary-dark: #084298`; Dark theme `--color-primary: #38bdf8`, `--color-primary-dark: #7dd3fc` (verified > 4.5:1 contrast).
- **Projects we added:** Added `Git & GitHub Pages workflow` (new `git` category) and `Interactive grade tracker` (`js` category).
- **Extension challenge(s) completed:**
  - **E2:** Follow system theme (`prefers-color-scheme: dark`) when `localStorage` has no saved preference.
  - **E3:** Live project search input combined with category filtering.
  - **E4:** Auto-save and restore contact message draft in `localStorage`.
  - **E6:** Real profile photo in `images/john.jpg` with explicit `width`, `height`, and descriptive `alt` text.

## Reflection

1. **The menu toggle is a `<button>`, not a clickable `<div>`. Name two things you would lose with a `<div>`, and who would be affected.**
With a `<div>`, you lose built-in keyboard focusability (`Tab` navigation) and native activation via `Enter` and `Space` keys, as well as the semantic `button` role announced to assistive technology. Keyboard-only users and screen-reader users would be unable to reach or operate the mobile menu.

2. **What would break if you removed `defer` from the `<script>` tag in `<head>`? Explain why, in terms of how the browser parses HTML.**
The browser parses HTML top to bottom and stops to execute a `<script>` immediately if `defer` is missing. Because `<head>` runs before `<body>` is parsed, `document.querySelector()` calls would return `null` for elements like `#year`, `.nav-toggle`, and `#project-list`, breaking event listeners and dynamic rendering.

3. **`renderProjects` uses `textContent` rather than `innerHTML`. What could go wrong with `innerHTML` if project titles were typed in by visitors?**
If a visitor entered malicious HTML or a `<script>` tag into a title, `innerHTML` would parse and execute it as live markup rather than displaying it safely as text. This creates a Cross-Site Scripting (XSS) vulnerability that could steal session data or alter the page for other users.

4. **Your form checks its input with JavaScript. Why will the server still need to validate the same data once the form is connected to one?**
Client-side JavaScript runs in the user's browser and can easily be bypassed by disabling JavaScript, editing the DOM in DevTools, or sending direct HTTP requests with tools like `curl`. The server must validate all incoming data again to protect the database and backend from malformed or malicious payloads.

5. **Your theme choice follows you from Home to Contact, but not from a double-clicked file to Live Server. Explain this using the idea of an origin.**
Browsers isolate `localStorage` by origin, which is defined by the combination of protocol, host, and port. All pages served from `http://127.0.0.1:5500` (or `https://sandejohnsimba1-hub.github.io`) share the same origin and storage, whereas `file://` URLs use a separate local file origin that does not share `localStorage` with the HTTP server.

6. **Name something duplicated across your HTML pages. What problem does that duplication cause, and how might it be avoided?**
The `<header>` navigation bar and `<footer>` are duplicated across `index.html`, `projects.html`, and `contact.html`. Duplicating them means any change—such as adding a link or updating the title—must be repeated in every file, risking inconsistency if one file is missed; this can be avoided using reusable components in a frontend framework or server-side includes/templating.