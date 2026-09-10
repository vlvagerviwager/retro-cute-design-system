# retro-cute-design-system

Pastel retro atomic design system ported from the aesthetic job board, rebuilt as typed Lit Web Components on named design tokens. Docs are a static two-page site (landing + component docs) deployed to GitHub Pages.

Live site: https://vlvagerviwager.github.io/retro-cute-design-system/

## How to run locally

1. Install dependencies:
```bash
bun install
```
2. Start the dev server:

```bash
bun run dev
```
3. Open the URL shown in the terminal, usually [http://localhost:5193](http://localhost:5193). The landing page is at `/`, the component docs at `/components/`
4. Build for production:

```bash
bun run build && bun run preview
```

Requires Bun 1.0 or newer. Works in any modern browser with native Web Components support.

## Components

Six elements in `src/components/`: `rc-header-card` (organism) is the hero panel (“vlvagerviwager's jobs board”); `rc-card` (molecule) is the job listing window with titlebar; `rc-dropdown` (atom) wraps the filter selects as native label + select in the light DOM; `rc-button` (atom) covers retro buttons and “view role” links; `rc-pill` (atom) covers tags and meta pills; `rc-heading` / `rc-text` / `rc-link` (atoms) cover typography.

## Design rules

* Every color, space, radius, shadow, and type size comes from `src/tokens.css` (rendering) / `src/tokens.ts` (logic and docs). `bun run lint:tokens` fails raw hex or `px`/`rem` literals anywhere else.
* All components support light and dark mode via `data-theme` on `<html>` (stored choice, then OS preference, then light fallback).
* WCAG 2.2 AA: native elements under every component, 4.5:1 text contrast (`bun run check:contrast` verifies every pair), 3px focus rings, skip link and landmarks, decorative chrome hidden with `aria-hidden`, reduced-motion and forced-colors support.

## Deploy

Push to `main`: `.github/workflows/deploy.yml` installs with Bun, runs the token lint, contrast check, typecheck, tests, and build, then publishes `dist/` to GitHub Pages. One-time setup: repo Settings → Pages → Source: GitHub Actions.

## Useful scripts

* `bun run dev`: start the dev server
* `bun run build`: build the static site into `dist/`
* `bun run preview`: preview the production build
* `bun test`: run the token invariant tests
* `bun run typecheck`: run `tsc --noEmit`
* `bun run lint:tokens`: fail on raw hex / pixel literals outside the token sources
* `bun run check:contrast`: verify WCAG AA contrast ratios for every theme pair

## Tech stack

* TypeScript
* Vite
* Lit Web Components with no other runtime dependencies
* Tailwind CSS v4 for docs-site layout
* Bun for runtime, scripts, and tests

## Attribution

Licensed under PolyForm Noncommercial 1.0.0, see `LICENSE`. No third-party assets. Components, tokens, and docs are original work ported from the author's own aesthetic job board; type stacks use system fonts only (Cooper Black with Avenir Next fallbacks).
