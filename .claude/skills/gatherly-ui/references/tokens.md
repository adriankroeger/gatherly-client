# Tokens (Tailwind v4)

The design system lives in CSS. Tailwind v4 turns every `--color-*`, `--font-*`, `--shadow-*`, `--text-*`
variable in `@theme` into utilities (`bg-cobalt`, `font-display`, `shadow-hard`, `text-title`).

## 1. Fonts — `index.html` `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
/>
```

## 2. Theme — `src/styles.css`

```css
@import "tailwindcss";

@theme {
  /* Remove Tailwind's palette and radii: only Box Office tokens exist. */
  --color-*: initial;
  --radius-*: initial;

  --color-white: #ffffff;
  --color-transparent: transparent;
  --color-current: currentColor;

  /* Neutrals */
  --color-paper: #f4f4f0;      /* page background */
  --color-surface: #ffffff;    /* cards, inputs, panels */
  --color-ink: #111111;        /* text, borders, shadows */
  --color-muted: #4a4a4a;      /* secondary text (8.9:1 on white) */
  --color-subtle: #e8e8e3;     /* skeleton bars, disabled fill, sold-out stub */
  --color-disabled: #6b6b6b;   /* disabled dashed border */

  /* Meaning */
  --color-cobalt: #2f5bff;        /* action, current, focus (white text 5.2:1) */
  --color-cobalt-strong: #1b3fd1; /* link hover */
  --color-yellow: #ffd60a;        /* attention, pending, highlight */
  --color-yellow-soft: #fff8cc;   /* selected table row */
  --color-red: #ff5a4e;           /* danger, failed, last seats (ink text) */
  --color-red-soft: #fff1f0;      /* invalid input fill */
  --color-green: #3ddc84;         /* confirmed, success, live */
  --color-gray: #d4d4d4;          /* expired */
  --color-periwinkle: #9db4ff;    /* waitlist, current user, info */

  /* Type */
  --font-display: "Archivo Black", "Arial Black", sans-serif;
  --font-sans: "IBM Plex Sans", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;

  --text-hero: 4rem;              /* 64 — page h1 on list pages */
  --text-hero--line-height: 0.95;
  --text-title: 2.5rem;           /* 40 — detail page h1 */
  --text-title--line-height: 1.05;
  --text-section: 1.25rem;        /* 20 — section h2 (display) */
  --text-section--line-height: 1.2;
  --text-card: 1.1875rem;         /* 19 — card titles (sans bold) */
  --text-card--line-height: 1.2;
  --text-body: 0.9375rem;         /* 15 — body copy */
  --text-body--line-height: 1.5;
  --text-label: 0.75rem;          /* 12 — mono labels, buttons-sm, badges */
  --text-label--line-height: 1.4;
  --text-label--letter-spacing: 0.08em;
  --text-micro: 0.6875rem;        /* 11 — field labels, table headers */
  --text-micro--line-height: 1.4;
  --text-micro--letter-spacing: 0.08em;

  /* Elevation: hard shadows, never blurred */
  --shadow-hard-sm: 2px 2px 0 var(--color-ink);
  --shadow-hard: 4px 4px 0 var(--color-ink);
  --shadow-hard-lg: 6px 6px 0 var(--color-ink);
  --shadow-hard-cobalt: 4px 4px 0 var(--color-cobalt);
  --shadow-hard-red: 4px 4px 0 var(--color-red);
}

@layer base {
  html {
    background: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: 100%;
  }
  body {
    font-size: var(--text-body);
    line-height: 1.5;
  }
  :focus-visible {
    outline: 3px solid var(--color-cobalt);
    outline-offset: 3px;
  }
  ::selection {
    background: var(--color-yellow);
    color: var(--color-ink);
  }
}
```

`--color-*: initial` makes stray palette classes (`bg-blue-500`) stop compiling — that is the point.
`rounded-full` still works (static utility) and is reserved for spinners.

## 3. Spacing & layout scale

Use Tailwind's default 4px spacing scale. Standard values:

| Use | Class |
|---|---|
| Page container | `mx-auto max-w-300 px-6` (1200px) |
| Page vertical padding | `pt-10 pb-16` |
| Gap between page sections | `gap-7` |
| Card padding | `p-4` (dense) · `px-5 py-4` (ticket body) · `p-6` (panel) · `p-7` (hero) |
| Gap inside cards | `gap-2` (ticket) · `gap-4` (panel) |
| Card grid | `grid grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))] gap-6` |
| Ticket stub width | `w-21` (84px, card) · `w-33` (132px, detail hero) |

Prefer canonical v4 classes over arbitrary values (`w-21`, not `w-[84px]`); Tailwind IntelliSense flags them.

## 4. Contrast pairs (all ≥ 4.5:1)

| Fill | Text |
|---|---|
| `paper`, `surface`, `yellow`, `red`, `green`, `gray`, `periwinkle`, `subtle` | `ink` (or `muted` on paper/surface) |
| `cobalt`, `ink` | `white` (`yellow` allowed on `ink`) |
