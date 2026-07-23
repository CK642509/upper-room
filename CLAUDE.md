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
  app.vue                    # Root: <NuxtLayout> + <NuxtPage>, site-wide SEO defaults
  error.vue                  # Full-app error page (404/500). Standalone by design — no AppNavbar/AppFooter (the navbar fetches from Sanity, and a Sanity outage lands here); all navigation goes through clearError()
  layouts/default.vue        # Wraps every page: <AppNavbar> + page + <AppFooter>, dark bg
  components/
    AppNavbar.vue            # Logo, Rooms dropdown (locations), Events/Contact links, CTA
    AppFooter.vue            # Shared "Ready to move in?" contact section (id="contact"); buttons from the homepage singleton
    AppPagination.vue        # v-model numbered pager; self-hides when pageCount <= 1
    AppAreaMap.vue           # Google Map showing an approximate area as a translucent circle
    AppQrModal.vue           # Popup shown by AppFooter for contact buttons that have a qrImage
  composables/
    useRooms.ts              # GROQ: useLocationsList / useLocation / useRoomsByLocation / usePreviewRooms / useRoom(slug)
    useEvents.ts             # GROQ: useEventsIndex / useUpcomingEvents / useEvent(slug)
    useHomepage.ts           # GROQ: useHomepageContent() — the `homepage` singleton doc
    useSanityImageUrl.ts     # urlFor(source) URL builder + useSanityImageAttrs() responsive src/srcset/sizes helper
  types/
    room.ts                  # RoomCard / RoomDetail / LocationCard / LocationDetail / BookedRange
    event.ts                 # EventCard / EventDetail
    homepage.ts              # HomepageContent / HomepageStat / ContactMethod
  utils/
    roomFormat.ts            # roomLocation / roomPriceDisplay / isRoomFreeForRange … (auto-imported)
    eventFormat.ts           # eventDay / eventFullDate / eventTimeRange … (auto-imported)
  pages/
    index.vue                # Homepage (Video hero, Stats, About, Rooms preview, Events preview)
    rooms/index.vue          # Location (district) cards — entry point to rooms
    rooms/[location]/index.vue   # Rooms in one location, with date filter + pagination
    rooms/[location]/[room].vue  # Room detail with photo hero, meta, CTA card
    events/index.vue         # Upcoming + past events
    events/[id].vue          # Event detail with gallery and details sidebar
  assets/css/main.css        # Google Fonts import + base html/body styles only
server/api/__sitemap__/urls.ts   # Sitemap source: all location/room/event URLs from Sanity
tailwind.config.ts           # Design token definitions (colors, fonts, radii)
```

**Data layer:** Content (rooms, events) lives in **Sanity** and is fetched with GROQ via the `@nuxtjs/sanity` module. Pages call composables that wrap `useSanityQuery` — no local store, no hardcoded arrays. Connection config is in `nuxt.config.ts` under `sanity` (driven by `SANITY_*` env vars; see `.env.example`), reading the `published` perspective only.

- **Composables** (`useRooms.ts`, `useEvents.ts`) centralize all GROQ. Each defines `CARD_FIELDS` (list/preview projection) and `DETAIL_FIELDS` (`CARD_FIELDS` + detail-only fields) so list and detail queries stay consistent. Preview queries (`usePreviewRooms`, `useUpcomingEvents`) slice server-side with `[0...3]` — prefer adding a limited query over fetching all + slicing client-side.
- **Editable homepage copy** lives in a `homepage` **singleton** document (fixed `_id: 'homepage'`, pinned at the top of the Studio structure): the 4 stats-bar numbers, the About section (heading with preserved line breaks, body, photo quote, photo), and the contact footer (heading, subheading, contact buttons). `useHomepageContent()` fetches it; the homepage and `AppFooter.vue` (contact heading/subheading/buttons, shown on every page) both call it and **every field falls back to the original hardcoded copy** when the doc/field is missing — never render an empty section. Contact buttons are a free-form list; the footer styles them by index (first solid navy, later ones fade). A button whose `contactMethod` has a `qrImage` set opens `<AppQrModal>` (a centered popup) instead of navigating directly — editors frame the actual QR code via the image's hotspot in Studio so differently-sized/shaped source photos (e.g. a square LINE QR vs. a tall WhatsApp share card) still crop to the same on-screen square; the modal's own CTA reuses the button's `url` so mobile users can also tap straight through instead of scanning. Buttons without a `qrImage` (e.g. Email) keep the plain direct link. Seed/reset with `node scripts/seed-homepage.mjs` + `npx sanity dataset import scripts/homepage.ndjson <dataset> --replace` in the studio repo.
- **Rooms are grouped by location** (a separate Sanity `location` document each room references). `/rooms` lists locations, `/rooms/[location]` lists that location's rooms (client-side date-availability filter over `bookedRanges` + `<AppPagination>`), `/rooms/[location]/[room]` is the room detail. The navbar's Rooms dropdown is driven by `useLocationsList()`.
- **Routing by slug:** all dynamic route params (`[location]`, `[room]`, events' `[id]`) are Sanity **slugs** (`slug.current`), *not* document `_id`s; queries filter on `slug.current == $slug`. The room detail page 301-redirects to the canonical URL when the `[location]` segment doesn't match the room's actual location, so one room never serves under two URLs.
- **Hero video:** the homepage hero is a muted looping background `<video>` with a "Browse Rooms" CTA horizontally centered and anchored 1/4 of the hero height from the bottom (`h-3/4` + `justify-end` on the content wrapper; `sr-only` h1 keeps the SEO heading). The file is a low-bitrate 720p encode of client footage (~4MB; ffmpeg `libx264 -crf 29 -preset slow`, audio stripped, `+faststart`) hosted **off-Vercel on Cloudflare R2**, referenced via `runtimeConfig.public.heroVideoUrl` (`NUXT_PUBLIC_HERO_VIDEO_URL`); when unset the hero renders `public/hero-poster.jpg` instead. `.gitignore` excludes `*.mp4`, so neither the raw 4K source nor encodes enter the repo — for local dev, drop the encode into `public/` and point the env var at it (see `.env.example`). The low bitrate is masked by a Wix-style **pixel-grid overlay**: a 3×3 semi-transparent black cross-pattern PNG (data URI `HERO_GRID` in `index.vue`) tiled at 3px, which hides compression artifacts and darkens footage ~18%; a navy vignette gradient adds contrast for the overlay content.
- **Area map:** the room detail page shows a "Where you'll live" section (`<AppAreaMap>`) only when the room has `approxLocation` (`{lat, lng}` in `types/room.ts`, fetched via `DETAIL_FIELDS`). The map draws a translucent circle (`areaRadius` meters, default 200) around an editor-chosen nearby landmark — **never the exact address**, since the Sanity dataset is publicly readable. Google Maps loads through the `@nuxt/scripts` googleMaps registry (`language=en`, `region=TW`), keyed by `runtimeConfig.public.googleMapsKey` (`NUXT_PUBLIC_GOOGLE_MAPS_KEY`, see `.env.example` for key-restriction notes); with no key the section renders a beige placeholder div.
- **Images:** content `<img>`s bind `useSanityImageAttrs()` — `v-bind="imgAttrs(source, {width, height, sizes})"` produces responsive `src`/`srcset`/`sizes` (default variants 1x + 2x of `width`; full-viewport heroes pass `widths: [width / 2, width]`). For one-off URLs (e.g. `ogImage`), `useSanityImageUrl()` returns `urlFor(source)`; build URLs with `.width().height().fit('crop').auto('format').url()`. Rich text (`body`) renders via `@portabletext/vue`'s `<PortableText>`, with a plain-text `description` fallback.
- **Formatting helpers** live in `app/utils/` and are auto-imported (Nuxt convention) — no explicit import needed in pages.

**SEO:** every page sets its own `useSeoMeta` (title, description, `ogTitle`/`ogDescription`, and a 1200×630 `ogImage` — Sanity-derived on dynamic pages). Site-wide defaults live in `app.vue`: the `titleTemplate` (appends "· Upper Room"; the homepage opts out with `titleTemplate: null`), canonical link, `og:url`, `og:site_name`, `twitter:card`. Absolute URLs come from `runtimeConfig.public.siteUrl` / the `site.url` key in `nuxt.config.ts` (default `https://www.upperroom.tw`, overridable via `NUXT_PUBLIC_SITE_URL`). `@nuxtjs/sitemap` serves `/sitemap.xml`: static routes are auto-discovered from `pages/`, dynamic ones come from `server/api/__sitemap__/urls.ts` (which builds its own `@sanity/client` — the app-side composables aren't available in nitro). When adding a page or content type, add `useSeoMeta` to the page and, if it's a new dynamic route, extend the sitemap endpoint. `robots.txt` is generated by `@nuxtjs/robots` (not a static file in `public/`): its Sitemap line follows `site.url`, and non-production deploys are automatically set noindex.

**Third-party scripts:** the `@nuxt/scripts` module handles both Vercel Analytics (`scripts.registry.vercelAnalytics` in `nuxt.config.ts`, triggered `onNuxtReady`) and the Google Maps loader used by `AppAreaMap.vue`.

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
- **Homepage Hero** (video hero) — the CTA sits at the same relative position (bottom quarter) at every width; only the section height (`h-[480px] md:h-[660px]`) steps up at `md`.
- **Homepage Rooms Preview** ("Choose Your Room") — `md:` throughout, including padding `md:px-20`, title `md:text-[40px]`, and the room rows going horizontal (`md:flex-row`).
- **Homepage Events Preview** ("Join the Community") — section padding `md:px-20`, title `md:text-[40px]`, and the header's "All Events" button moves to the right at `md` (`md:flex-row`/`md:justify-between`), matching Rooms Preview. The 3 event cards still go side-by-side only at `lg` (`lg:flex-row`).
- **Homepage About** ("WHO WE ARE") — text column horizontal padding `md:px-20` and the overlay quote's left offset `md:left-20`, so its content aligns to 80px at tablet. The image/text columns still go side-by-side only at `lg` (`lg:flex-row`).
- **`AppFooter.vue`** ("Ready to move in?", the shared contact footer) — horizontal padding `md:px-20`. Title + buttons still stack until `lg`.
- **`/events` Upcoming rows** — row layout only (`md:flex-row`, `md:contents`, button `md:w-auto`); the section's horizontal padding stays `px-5 lg:px-20` so the left edge stays aligned with the unchanged header and Past Events sections.

When editing any of the above, keep its breakpoints consistent with the notes here. Everything not listed (Stats Bar, Events/Rooms list pages, detail pages, etc.) uses the default `lg` breakpoint.

## Critical: Tailwind integration

Do **not** use `@tailwindcss/vite` or import it in `nuxt.config.ts`. It is incompatible with Nuxt 4's Rolldown bundler on Windows and causes a "Class extends value undefined" crash. Always use the `@nuxtjs/tailwindcss` module approach (listed in `modules` array in `nuxt.config.ts`). Similarly, `tailwindcss` must stay at v3 — v4 has the same Rolldown incompatibility.

The `@rolldown/binding-win32-x64-msvc` package must be present in dependencies on this Windows machine; it was not installed automatically by npm due to a known optional dependency bug.
