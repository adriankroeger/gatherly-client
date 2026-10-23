# Component recipes

Primitives live in `src/components/ui/`, domain components (ticket card, seat meter, countdown…) in
`src/components/`. Variants are a plain `Record<Variant, string>` of class strings — no extra dependency needed.
Class order inside a string: layout → box → border/shadow → type → color → states.

Tailwind v4 has built-in `aria-busy:`, `aria-disabled:`, `aria-pressed:`, `aria-expanded:`, `aria-selected:`
variants. Others need the arbitrary form: `aria-[invalid=true]:`, `aria-[current=page]:`.

Every recipe lists its states. Build all of them.

---

## Button

States: default · hover · focus · pressed · loading · disabled. Variants: `primary` · `secondary` · `danger` · `link`.
Sizes: `sm` (h-9, tables/inline) · `md` (h-12, default) · `lg` (h-14, the one hero CTA per screen).

```tsx
const base =
  "inline-flex items-center justify-center gap-2 border-2 border-ink font-mono font-semibold uppercase tracking-wider " +
  "motion-safe:transition-[transform,box-shadow] motion-safe:duration-100 " +
  "hover:-translate-x-0.5 hover:-translate-y-0.5 " +
  "active:translate-x-1 active:translate-y-1 active:shadow-none " +
  "aria-busy:translate-x-1 aria-busy:translate-y-1 aria-busy:shadow-none aria-busy:cursor-progress " +
  "disabled:translate-0 disabled:cursor-not-allowed disabled:border-dashed disabled:border-disabled " +
  "disabled:bg-subtle disabled:text-muted disabled:shadow-none";

const sizes = {
  sm: "h-9 px-3 text-micro shadow-hard-sm hover:shadow-hard",
  md: "h-12 px-5 text-label shadow-hard hover:shadow-hard-lg",
  lg: "h-14 px-6 font-display text-lg shadow-hard hover:shadow-hard-lg",
} as const;

const variants = {
  primary: "bg-cobalt text-white focus-visible:outline-yellow",
  secondary: "bg-surface text-ink hover:bg-yellow",
  danger: "bg-red text-ink",
  link: "h-auto border-0 bg-transparent px-0 shadow-none underline decoration-2 underline-offset-4 hover:translate-0 hover:bg-yellow hover:shadow-none",
} as const;
```

- Loading: keep the button mounted, set `aria-busy`, swap the label to a verb + "…" (`Booking…`). Don't add a spinner.
- Disabled: use real `disabled` (or `aria-disabled` when it must stay focusable to show a tooltip).
- One `primary` per region. Destructive confirmation dialogs put `danger` on the right.

## Text field (`Field` = label + control + message)

States: default · focus · invalid · disabled · read-only. Works for `input`, `select`, `textarea`.

```tsx
<div className="flex flex-col gap-1">
  <label htmlFor={id} className="font-mono text-micro font-semibold uppercase">Title</label>
  <input
    id={id}
    aria-invalid={!!error}
    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
    className="h-11 border-2 border-ink bg-surface px-3 text-body text-ink placeholder:text-muted
               focus-visible:outline-none focus-visible:shadow-hard-cobalt
               aria-[invalid=true]:bg-red-soft aria-[invalid=true]:shadow-hard-red
               disabled:border-dashed disabled:border-disabled disabled:bg-subtle disabled:text-muted"
  />
  {error ? (
    <span id={`${id}-error`} className="self-start border-2 border-ink bg-red px-1.5 font-mono text-micro font-semibold uppercase">
      {error}
    </span>
  ) : hint ? (
    <span id={`${id}-hint`} className="font-mono text-micro text-muted uppercase">{hint}</span>
  ) : null}
</div>
```

- Focus on inputs is the cobalt **shadow**, not the outline (the outline is for buttons/links).
- Server `ProblemDetail` field errors render here verbatim; a summary `Alert` above the form says how many fields failed.

## Filter chip (toggle)

States: default · hover · focus · pressed (selected) · disabled.

```tsx
<button
  type="button"
  aria-pressed={selected}
  className="h-9 border-2 border-ink bg-surface px-3.5 font-mono text-label font-semibold uppercase
             hover:bg-yellow aria-pressed:bg-ink aria-pressed:text-yellow"
>
  Tech
</button>
```

Group chips in `<div role="group" aria-label="Category" className="flex flex-wrap gap-2">`.

## Tag (category / metadata)

Static, not interactive: `border-2 border-ink px-2 font-mono text-micro font-semibold uppercase self-start`.
Emphasised tag (e.g. "Last 2 seats"): add a fill — `bg-red`, `bg-yellow`.

## Status badge (booking states)

One component, one map. Never style a status ad hoc.

```tsx
const statusStyles = {
  PENDING: "bg-yellow",
  CONFIRMED: "bg-green",
  FAILED: "bg-red",
  EXPIRED: "bg-gray",
  WAITLISTED: "bg-periwinkle",
  CANCELLED: "border-dashed bg-surface line-through",
} as const satisfies Record<BookingStatus, string>;

<span className={`inline-block border-2 border-ink px-2.5 py-0.5 font-mono text-label font-semibold uppercase ${statusStyles[status]}`}>
  {label[status]}
</span>
```

Typing the map with `satisfies Record<BookingStatus, string>` (from the generated OpenAPI types) makes the compiler
fail when the backend adds a status.

## Stamp ("Sold out", "Expired" on a ticket)

`font-display text-xs uppercase border-2 border-ink px-1.5 py-0.5 -rotate-4 inline-block` — the only rotated element
besides the logo mark. Use it only on top of ticket cards.

## Ticket card (event in a list)

States: default · hover (lift) · featured/soonest (yellow stub + `shadow-hard-cobalt`-style lift) · low seats ·
sold out (gray stub + stamp + waitlist button) · loading skeleton.

```
<article className="flex border-2 border-ink bg-surface shadow-hard
                    motion-safe:transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg">
  <div  stub   className="flex w-21 flex-none flex-col items-center justify-center border-r-2 border-dashed border-ink py-3.5">
        MON (font-mono text-label) / 06 (font-display text-4xl leading-none) / 18:30 (font-mono text-label)
  <div  body   className="flex min-w-0 flex-1 flex-col gap-2 px-5 py-4">
        Tag · h2 card title (font-sans text-card font-bold, the <Link> covers the card) · venue (text-sm text-muted)
        · footer pinned with mt-auto: seats line (font-mono text-label uppercase) | low-seats tag | stamp + waitlist button
```

- Stub fill: `bg-surface` normal, `bg-yellow` for the highlighted event, `bg-subtle` when sold out.
- Low seats = ≤ 10% left or ≤ 3 seats → red tag "Last N seats".
- The whole card is clickable through the title link (`after:absolute after:inset-0` on the link, `relative` on the
  card); nested buttons get `relative z-10`.

## Panel (generic raised surface)

`border-2 border-ink bg-surface p-6 shadow-hard` with a heading `font-mono text-label font-semibold uppercase`.
Booking panel and hero card use `shadow-hard-lg`. Sections inside are separated with `border-t-2 border-ink pt-4`.

## Alert (inline, in-flow)

| Kind | Classes | Role |
|---|---|---|
| Attention / conflict (409) | `bg-yellow` | `alert` |
| Error | `bg-red` | `alert` |
| Success | `bg-green` | `status` |
| Info | `bg-periwinkle` | `status` |

Shell: `flex flex-col gap-2.5 border-2 border-ink p-4 shadow-hard`. Title in `font-display text-base uppercase`, one
sentence of body, at most one `secondary sm` action.

## Toast

Same look as a one-line alert (`flex items-center gap-3 border-2 border-ink px-4 py-3 shadow-hard font-semibold`),
fixed bottom-right, `role="status"` (success/info) or `role="alert"` (errors). Action is a mono underlined text
button pushed right with `ml-auto`. Auto-dismiss success after 5s; errors stay until dismissed.

## Seat meter

20 segments in `grid grid-cols-20 gap-[3px]`, each `h-3`; booked = `bg-ink`, free = `bg-surface border-2 border-ink`.
Above it: label "Seats left" (mono) and the count `font-display text-5xl` + `/ 40` in mono. `aria-hidden` on the
segments; the count is the accessible text.

## Countdown

`font-mono text-2xl font-semibold tabular-nums` showing `mm:ss`, computed from the server's `expiresAt`. Under 60 s:
wrap in `bg-red px-1`. At zero: replace with the `EXPIRED` status badge. Lives in a ticket-stub column
(`border-l-2 border-dashed border-ink w-30`) next to the booking status.

## Progress (report jobs)

Bordered track `h-4 border-2 border-ink bg-surface`, fill `bg-cobalt` with a 2px white stripe every 12px
(`bg-[repeating-linear-gradient(90deg,var(--color-cobalt)_0_10px,var(--color-white)_10px_12px)]`), width = percent.
Label to the right in mono: `Attendee report 60%`. Use `role="progressbar"` with `aria-valuenow`.

## Table (admin / DLQ / my bookings)

```
wrapper   overflow-x-auto border-2 border-ink bg-surface shadow-hard
header    flex items-center justify-between border-b-2 border-ink px-5 py-4 (title font-display text-section uppercase + count badge)
thead tr  bg-ink text-white text-left font-mono text-micro font-semibold uppercase
th/td     px-5 py-3
tbody tr  border-t-2 border-ink · hover:bg-yellow-soft · selected: bg-yellow-soft
ids       font-mono text-[13px]
actions   right-aligned Button size="sm" (secondary, danger)
```

## Navigation

- Header bar: `border-b-2 border-ink bg-surface`, logo = yellow square `-rotate-8` + "GATHERLY" in `font-display`.
- Nav links: `px-3.5 py-2.5 font-mono text-label font-semibold uppercase`; current = `bg-ink text-white`
  (`aria-current="page"`, use TanStack `activeProps`).
- Breadcrumb: mono label size, links underlined, separator `/`.
- Pagination: square `size-11` buttons (secondary sm style), current = `bg-ink text-yellow`, disabled prev/next
  follow the button disabled state. Left side: `Showing 1–6 of 24` in mono.

## Skeleton

Same outer shape as the real component, but `border-dashed` and no shadow; text replaced by `bg-subtle` bars of
realistic widths (85% title, 55% meta). A ticket stub skeleton uses
`bg-[repeating-linear-gradient(45deg,var(--color-paper)_0_8px,var(--color-subtle)_8px_16px)]`. Add `aria-busy="true"`
and a visible mono "Loading…" label.

## Empty & error panels

```
<div className="flex flex-col items-center gap-2.5 border-2 border-ink bg-surface p-6 text-center shadow-hard">   // error: shadow-hard-red, role="alert"
  <strong className="font-display text-2xl uppercase">Nothing showing</strong>
  <p className="text-sm">One sentence: why, and what to do.</p>
  <Button size="sm" variant="secondary">Clear filters</Button>   // error: variant="primary" "Retry"
</div>
```
