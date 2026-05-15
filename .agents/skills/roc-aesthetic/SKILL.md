---
name: roc-aesthetic
description: Project-scoped copy of the roc-aesthetic skill used to keep this Astro website in Taiwanese ROC-era「華國美學」style: dense, framed, announcement-heavy, table-first, sincere and usable.
version: "1.0.0"
---

# Project ROC Aesthetic Skill

This skill is scoped to this repository only. It summarizes the applied theme from `maylogger/roc-aesthetic` for future work on this site.

## Invariants

- Density over whitespace.
- Tables before cards.
- Administrative borders, gray separators, nested boxes, sidebars and announcement strips.
- ROC blue, saturated red, warning yellow, silver gradients, bright cyan links, occasional cheap gold.
- Fonts may mix MingLiU, PMingLiU, DFKai-SB, Microsoft JhengHei, Arial and Tahoma.
- Slight 0.1px–1px layout imperfections are acceptable when still usable.
- Copy should be sincere bureaucratic Traditional Chinese with terms such as「e化服務」、「最新公告資訊」、「便民措施」.
- Avoid modern SaaS polish, airy hero sections, pristine cards and uniform spacing systems.

## Project implementation notes

- Global style lives in `src/styles/global.css`.
- Site chrome is in `src/components/RocFrame.astro`, `Header.astro`, `Footer.astro`, and `ThemeToggle.astro`.
- When adding pages, pass a breadcrumb section with `<span slot="section">...</span>` and prefer `.roc-panel`, `.roc-panel-heading`, `.roc-data-table`, `.roc-home-notice`, and `.roc-button`.
- Keep accessibility and readability intact: the target is「糙但能用」, not broken UX.
