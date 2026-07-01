# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run generate   # Static site generation
npm run preview    # Preview production build
```

## Architecture

Nuxt 4 project with `app/` as the source directory (Nuxt 4 default `srcDir`). All application code lives under `app/`.

```
app/
  app.vue                    # Root: <NuxtLayout> + <NuxtPage>
  layouts/default.vue        # Wraps every page with <AppNavbar> + dark bg
  components/
    AppNavbar.vue            # Logo, nav links (Rooms/Events/Contact), CTA button
    AppPagination.vue        # v-model numbered pager; self-hides when pageCount <= 1
  composables/
    useRooms.ts              # GROQ queries: useRoomsList / usePreviewRooms / useRoom(slug)
    useEvents.ts             # GROQ queries: useEventsIndex / useUpcomingEvents / useEvent(slug)
    useSanityImageUrl.ts     # urlFor(source) image-URL builder for Sanity images
  types/
    room.ts                  # RoomCard / RoomDetail
    event.ts                 # EventCard / EventDetail
  utils/
    roomFormat.ts            # roomLocation / roomPriceDisplay / roomAvailability … (auto-imported)
    eventFormat.ts           # eventDay / eventFullDate / eventTimeRange … (auto-imported)
  pages/
    index.vue                # Homepage (Hero, Stats, About, Rooms preview, Events preview, Contact)
    rooms/index.vue          # Full room listing
    rooms/[id].vue           # Room detail with photo hero, meta, CTA card
    events/index.vue         # Upcoming + past events
    events/[id].vue          # Event detail with gallery and details sidebar
  assets/css/main.css        # Google Fonts import + base html/body styles only
tailwind.config.ts           # Design token definitions (colors, fonts, radii)
```

**Data layer:** Content (rooms, events) lives in **Sanity** and is fetched with GROQ via the `@nuxtjs/sanity` module. Pages call composables that wrap `useSanityQuery` — no local store, no hardcoded arrays. Connection config is in `nuxt.config.ts` under `sanity` (driven by `SANITY_*` env vars; see `.env.example`), reading the `published` perspective only.

- **Composables** (`useRooms.ts`, `useEvents.ts`) centralize all GROQ. Each defines `CARD_FIELDS` (list/preview projection) and `DETAIL_FIELDS` (`CARD_FIELDS` + detail-only fields) so list and detail queries stay consistent. Preview queries (`usePreviewRooms`, `useUpcomingEvents`) slice server-side with `[0...3]` — prefer adding a limited query over fetching all + slicing client-side.
- **Routing by slug:** detail routes are `rooms/[id].vue` and `events/[id].vue`, but `route.params.id` is the Sanity **slug** (`slug.current`), *not* the document `_id`. The `[id]` filename is kept for route stability; queries filter on `slug.current == $slug`. Each detail page has an inline note to this effect.
- **Images:** `useSanityImageUrl()` returns `urlFor(source)`; build URLs with `.width().height().fit('crop').auto('format').url()`. Rich text (`body`) renders via `@portabletext/vue`'s `<PortableText>`, with a plain-text `description` fallback.
- **Formatting helpers** live in `app/utils/` and are auto-imported (Nuxt convention) — no explicit import needed in pages.

**Styling:** Tailwind CSS v3 via `@nuxtjs/tailwindcss` module. Custom design tokens in `tailwind.config.ts` map directly to the `.pen` design file variables: `bg-base`, `bg-raised`, `bg-card`, `bg-amber`, `bg-coral`, `text-primary`, `text-secondary`, `text-muted`, `text-on-amber`, `border-subtle`, `font-heading` (Fraunces), `font-body` (DM Sans), `rounded-md` (10px), `rounded-lg` (16px).

## Responsive design

The site is **mobile-first**: unprefixed utility classes describe the mobile layout (≈390px, matching the mobile frames in the `.pen` design file), and the **`lg:` prefix (≥1024px) restores the desktop layout** (≈1440px, matching the desktop frames). This split maps to the two widths designed in `upper_room_style2-1-1.pen`.

Conventions when building or editing pages:
- Write base classes for mobile, then add `lg:` overrides for desktop — e.g. `flex flex-col lg:flex-row`, `px-5 lg:px-20`, `text-[44px] lg:text-[80px]`.
- `lg` (1024px) is the **default** desktop breakpoint: tablets (768–1023px) get the mobile layout, since the wide desktop design needs room.
- To keep desktop and mobile sharing one DOM, prefer responsive classes over duplicated markup. The `md:contents` trick (on `events/index.vue`) lets a mobile wrapper `<div>` collapse at its breakpoint so its children rejoin the parent flex row.

### Tablet (`md`, 768px) overrides

Some areas were intentionally promoted to switch at `md` so tablets get the **desktop** look instead of the mobile one. Standard page horizontal padding at tablet is `px-20` (80px) — keep promoted sections aligned to that. Current `md:` promotions:

- **`AppNavbar.vue`** — bar height `md:h-[72px]`, logo `md:w-12 md:h-12`, brand name `md:text-xl`. The nav links + CTA vs. hamburger dropdown still switch at `lg` (tablet keeps the hamburger), and bar padding stays `lg:px-16`.
- **Homepage Hero** ("Feel at Home") — `md:` throughout (layout, padding `md:pl-20`, buttons row). Heading is three-step: `text-[44px] md:text-[64px] lg:text-[80px]` so 80px doesn't crowd the tablet width.
- **Homepage Rooms Preview** ("Choose Your Room") — `md:` throughout, including padding `md:px-20`, title `md:text-[40px]`, and the room rows going horizontal (`md:flex-row`).
- **Homepage Events Preview** ("Join the Community") — section padding `md:px-20`, title `md:text-[40px]`, and the header's "All Events" button moves to the right at `md` (`md:flex-row`/`md:justify-between`), matching Rooms Preview. The 3 event cards still go side-by-side only at `lg` (`lg:flex-row`).
- **Homepage About** ("WHO WE ARE") — text column horizontal padding `md:px-20` and the overlay quote's left offset `md:left-20`, so its content aligns to 80px at tablet. The image/text columns still go side-by-side only at `lg` (`lg:flex-row`).
- **Homepage Contact** ("Ready to move in?") — horizontal padding `md:px-20`. Title + buttons still stack until `lg`.
- **`/events` Upcoming rows** — row layout only (`md:flex-row`, `md:contents`, button `md:w-auto`); the section's horizontal padding stays `px-5 lg:px-20` so the left edge stays aligned with the unchanged header and Past Events sections.

When editing any of the above, keep its breakpoints consistent with the notes here. Everything not listed (Stats Bar, Events/Rooms list pages, detail pages, etc.) uses the default `lg` breakpoint.

## Critical: Tailwind integration

Do **not** use `@tailwindcss/vite` or import it in `nuxt.config.ts`. It is incompatible with Nuxt 4's Rolldown bundler on Windows and causes a "Class extends value undefined" crash. Always use the `@nuxtjs/tailwindcss` module approach (listed in `modules` array in `nuxt.config.ts`). Similarly, `tailwindcss` must stay at v3 — v4 has the same Rolldown incompatibility.

The `@rolldown/binding-win32-x64-msvc` package must be present in dependencies on this Windows machine; it was not installed automatically by npm due to a known optional dependency bug.
