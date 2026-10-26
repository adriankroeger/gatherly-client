# Screen patterns

## App shell (`src/routes/__root.tsx`)

```
<div className="min-h-dvh bg-paper text-ink">
  <header>  border-b-2 border-ink bg-surface
    container: mx-auto flex max-w-300 flex-wrap items-center gap-6 px-6 py-3
    logo · nav (flex-1, wraps) · [job progress chip] · [● Live tag] · account button (periwinkle, shadow-hard-sm, initials)
  <main className="mx-auto flex max-w-300 flex-col gap-7 px-6 pt-10 pb-16">
    <Outlet />
  <Toaster />  fixed bottom-6 right-6, flex-col gap-3
```

- Header wraps on narrow screens (`flex-wrap`); nothing is sticky.
- The job chip appears only while `useMutationState` reports a running report (plan step 32).
- The Live tag reflects the SSE connection (plan step 26); hide it, don't show "offline", when there is no stream.

## Page header

```
<div className="flex flex-wrap items-end justify-between gap-5">
  <div>
    <p className="font-mono text-label font-semibold uppercase">Now booking · Berlin</p>           // eyebrow, optional
    <h1 className="font-display text-hero uppercase">Upcoming <span className="bg-yellow px-2">events</span></h1>
  </div>
  <Button size="md" variant="primary">+ New event</Button>                                       // only if role allows
</div>
```

List pages use `text-hero`; detail and form pages use `text-title`. The yellow marker is the one highlight of the page.

## Route states (TanStack Router)

Every route that loads data defines all three; never leave the router defaults.

| Route option | Renders |
|---|---|
| `pendingComponent` | the page header (static parts) + skeletons in the real layout (6 ticket skeletons for a list, panel skeletons for detail) |
| `errorComponent` | the error panel with `shadow-hard-red`, the cause in one sentence, and **Retry** → `router.invalidate()` (+ `reset()` for query errors) |
| `notFoundComponent` | display title "No such event", one sentence, link back to the list |

Inside the component, branch explicitly for **empty** data (empty panel with the one action that fixes it — usually
"Clear filters"). Keep previous data visible while paging/filtering (`placeholderData: keepPreviousData`) and dim
nothing: the pagination button shows the loading state instead.

## Event list (plan steps 4, 6)

1. Page header.
2. Filter panel: `border-2 border-ink bg-surface p-4 shadow-hard`; row of fields (Search 2fr, Dates, Sort) that
   wraps, then a chip group for categories with the result count right-aligned in mono.
   Filters reflect the URL search params exactly — the selected chip is `aria-pressed`.
3. Ticket-card grid (`grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))] gap-6`).
4. Pagination row.

## Event detail (plan steps 4, 13, 21, 24, 26, 30)

Two columns that wrap: main `flex-[999_1_560px] min-w-0`, aside `flex-[1_1_340px]`, `gap-7`, `items-start`.

- **Main**: hero ticket (`shadow-hard-lg`, yellow stub `w-33` with weekday / day `text-6xl` display / month+year,
  body with tag, owner actions top-right, `text-title` h1, a 3-column `dl` of Doors · Venue · Host separated by
  `border-t-2`), then "About" (display `text-section`), then the booking-lifecycle legend if useful.
- **Aside**, top to bottom — show only what applies to the current user:
  1. Booking panel: "Seats left" count + seat meter + `Button size="lg"` "Book a seat" + mono hint.
  2. Your booking: a ticket-shaped row (status badge, one-line explanation, ticket id) with the countdown stub.
  3. Conflict alert (409) in yellow with "Join waitlist".
  4. Waitlist position: `bg-periwinkle` panel with `#N` in display type, "Updates live".

### Booking state → UI

| Server / client state | What the user sees |
|---|---|
| idle, seats > 0 | Booking panel, primary "Book a seat" |
| mutation pending | button `aria-busy` "Booking…", seat count already decremented (optimistic) |
| 409 conflict | count rolls back, yellow alert "last seat taken" + Join waitlist |
| PENDING | Your-booking row with `PENDING` badge + countdown from `expiresAt` |
| CONFIRMED | badge `CONFIRMED`, green success toast, countdown removed |
| FAILED | badge `FAILED`, red alert with Retry; seat released |
| EXPIRED | badge `EXPIRED` replaces the countdown at 00:00; Book button returns if seats remain |
| sold out | stamp "Sold out", booking panel replaced by "Join waitlist" (secondary, lg) |
| WAITLISTED | periwinkle position panel; promotion arrives as a success toast and switches to PENDING |

## Forms (plan steps 8, 16)

- One column, `max-w-160`, inside a panel (`p-6 shadow-hard`), fields `gap-5`.
- Submit row at the bottom, right-aligned: secondary "Cancel" (link back) + primary submit.
- On submit error: a red Alert at the top of the form ("Fix 2 fields before saving") **and** each field's message
  from the `ProblemDetail`; focus moves to the first invalid field.
- Submit button shows `aria-busy` + "Saving…" while the mutation runs; fields stay editable.
- Login/register: same panel, centered (`mx-auto w-full max-w-110`), page title `text-title`.

## Organizer & role-aware UI (plan step 18)

- Actions the user may not perform are **not rendered** (no disabled Edit buttons for strangers).
- Organizer dashboard = page header + table of "my events" (title, date, seats sold as `12 / 40` mono, status) +
  primary "New event".

## Admin: DLQ (plan step 28)

Table pattern from components.md; the count badge in the header is red when > 0, gray "0 in DLQ" otherwise.
Replay is `secondary sm`, Discard is `danger sm` and asks for confirmation. A replayed row disappears
optimistically.

## Jobs (plan step 32)

Each job is a panel row: report name, progress bar, status badge; when done, the row's action becomes a primary
`sm` "Download" link. The header chip mirrors the most recent running job.

## Status page (plan step 2)

A single panel: title "System status", one line per component (`db`, `rabbit`, …) with a `CONFIRMED`-styled `UP`
or `FAILED`-styled `DOWN` badge. Use the same error panel when the health endpoint is unreachable.
