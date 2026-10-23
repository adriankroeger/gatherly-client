---
name: gatherly-ui
description: Gatherly's "Box Office" design system (neo-brutalist ticket style, Tailwind v4). Use for ANY frontend UI work in this client — creating or changing routes, components, layouts, forms, tables, Tailwind classes, colors, typography, or the pending/error/empty/loading states of a screen — so every component looks and behaves consistently in every state, from the first skeleton to the final version.
---

# Gatherly UI — "Box Office"

Gatherly looks like a box office: tickets, stamps, ink. Every surface has a **2px ink border**, every raised
thing has a **hard offset shadow with no blur**, nothing is rounded. Cobalt means "act", yellow means
"look here". Visual reference (all three boards = the source of truth):
https://claude.ai/artifact/QFMkR4bcrEW5GvqPovN7wR — row "C · Box Office".

## Before writing any UI

1. **Tokens installed?** `src/styles.css` must contain the `@theme` block from
   [references/tokens.md](references/tokens.md), and `index.html` the Google Fonts `<link>`. If not, install them
   first — never work around missing tokens with hex values or arbitrary classes.
2. **Primitive exists?** Look in `src/components/ui/` for the component you need. If it is missing, build it from
   the recipe in [references/components.md](references/components.md) — all states, not just the default.
3. **Screen pattern?** For a route or page, follow [references/patterns.md](references/patterns.md): layout,
   pending/error/empty components, and how async booking states are shown.

## The ten rules

1. **Tokens only.** Colors, fonts, shadows and text sizes come from `@theme` (`bg-cobalt`, `shadow-hard`,
   `font-display`, `text-label`). No hex codes, no `bg-[#...]`, no Tailwind palette colors (`bg-blue-500`).
2. **Borders are ink, 2px.** `border-2 border-ink`. Dividers: `border-t-2 border-ink`. **Dashed** borders mean
   exactly three things: ticket perforation, disabled, or placeholder/loading.
3. **No radius.** `rounded-*` utilities are removed by the theme. The only round thing allowed is `rounded-full` for a
   spinner. Ever.
4. **Hard shadows only.** `shadow-hard-sm` (dense controls) → `shadow-hard` (cards, buttons) → `shadow-hard-lg`
   (hero card, booking panel). A colored shadow is a *state*: `shadow-hard-cobalt` = focused/featured,
   `shadow-hard-red` = error. Never blur.
5. **Three typefaces, three jobs.**
   - `font-display` (Archivo Black, always `uppercase`): page titles, section titles, big numbers (seats left,
     waitlist position, ticket date).
   - `font-sans` (IBM Plex Sans): body copy, card titles (`font-bold`), descriptions.
   - `font-mono` (IBM Plex Mono, `uppercase tracking-wider`): labels, nav, buttons, badges, metadata, timers, ids.
6. **Color has meaning — never decorative.**
   | Token | Means |
   |---|---|
   | `cobalt` | primary action, current page, focus |
   | `yellow` | attention, highlight, PENDING, hover on secondary |
   | `red` | danger, FAILED, error, "last seats" |
   | `green` | success, CONFIRMED, live connection |
   | `periwinkle` | waitlist, the current user, info |
   | `gray` | EXPIRED, inactive |
   Text on cobalt or ink is `text-white`; on every other fill it is `text-ink`.
7. **One yellow highlight per view.** The marker behind a heading word (`bg-yellow px-2`) is used once per page.
8. **Motion is mechanical.** Only `transform` and `box-shadow` animate, 100ms. Hover lifts
   (`-translate-x-0.5 -translate-y-0.5` + bigger shadow), press sinks into the shadow
   (`translate-x-1 translate-y-1 shadow-none`). Wrap in `motion-safe:`.
9. **Every interactive element has every state** — see the checklist below. A component is not done until all its
   applicable states exist.
10. **Accessible by construction.** Real `<button>`, `<a>`, `<label>`; `aria-invalid` + `aria-describedby` on
    invalid fields; `aria-busy` while loading; `aria-current` for nav/pagination; `aria-pressed` for toggle chips;
    `role="alert"` for errors, `role="status"` for toasts and live updates. Touch targets ≥ 44px (`h-11`); dense
    table actions may use `h-9`.

## State checklist

Before finishing a component or screen, tick every row that applies:

| State | How it looks | How it is expressed |
|---|---|---|
| Default | ink border, hard shadow | — |
| Hover | lifts 2px, `shadow-hard-lg`; secondary turns `bg-yellow` | `hover:` |
| Focus | 3px outline, offset 3px: cobalt (yellow on cobalt fills) | `focus-visible:` only |
| Pressed / loading | sunk: `translate-x-1 translate-y-1 shadow-none`, label "Verb…" | `active:` / `aria-busy` |
| Disabled | dashed `border-disabled`, `bg-subtle`, `text-muted`, no shadow | `disabled:` / `aria-disabled` |
| Selected / current | inverted: `bg-ink text-yellow` (chips, nav, page number) | `aria-pressed` / `aria-current` |
| Invalid | `bg-red-soft shadow-hard-red` + red tag message below | `aria-invalid` |
| Pending data | skeleton in the real layout, dashed border, `bg-subtle` bars | route `pendingComponent` |
| Empty | bordered panel, display title, one sentence, one action | explicit branch |
| Error | `shadow-hard-red`, display title, cause, **Retry** | route `errorComponent` |
| Optimistic | the item already shows its new state; rolls back on error with an alert | mutation `onMutate`/`onError` |
| Live | green "● Live" tag in the header while the SSE stream is open | SSE hook state |

## Voice & microcopy

- Numbers and dates are in german/european style
- Verbs on actions are written in the imperative mood (e.g. Book seat)
- General tone is neutral
- Error and info messages are concise and contain the relevant info and data

## Growing the system

- A new color, size or shadow goes into `@theme` **and** [references/tokens.md](references/tokens.md) first, then
  into code. Never introduce a one-off value in a component.
- A new reusable component gets a recipe in [references/components.md](references/components.md) with all its states.
- Before inventing a new pattern, check whether an existing one (ticket card, stamp, tag, hard-shadow panel)
  already expresses it.
