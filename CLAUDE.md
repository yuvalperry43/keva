# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**כלכלה בקבע** (Finance for Career Soldiers) — a static Hebrew-language financial guide website for Israeli career military personnel. No build system, no dependencies, no framework.

## Running Locally

```bash
python -m http.server
# or
npx http-server
```

Then open `http://localhost:8000` in a browser.

## Architecture

**Pure static site:** vanilla HTML5 + CSS3 + minimal JS. All pages share a single `style.css`.

**Layout pattern (every page):**
- Fixed left sidebar (240px) for navigation
- Main content area on the right
- Mobile breakpoints at 900px and 768px — sidebar hides, hamburger menu appears
- RTL (`dir="rtl"`, `lang="he"`) throughout

**CSS design tokens** are defined as CSS custom properties in `style.css`:
- Colors: `--bg`, `--surface`, `--border`, `--text`, `--muted`, `--accent`, `--accent-light`
- Layout: `--sidebar-width` (240px)

**Navigation pattern:** Each page has a sidebar with the full site nav (active page gets `class="active"`) and bottom prev/next links.

**JS:** Only one interaction — mobile sidebar toggle: `document.body.classList.toggle('sidebar-open')`

## Writing Style

- Never use em dashes (—) in content. Use a regular hyphen (-) or restructure the sentence instead.

## Content Pages

All pages live in the root directory. Pages marked with 🚧 "בבנייה" are incomplete stubs. When adding new pages, follow the same HTML structure as existing complete pages (e.g., `heshbon-bank.html`, `shuk-haon.html`) and update the sidebar nav in **all** other pages.
