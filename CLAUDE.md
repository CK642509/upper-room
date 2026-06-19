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
  app.vue              # Root: <NuxtLayout> + <NuxtPage>
  layouts/default.vue  # Wraps every page with <AppNavbar> + dark bg
  components/
    AppNavbar.vue      # Logo, nav links (Rooms/Events/Contact), CTA button
  composables/
    useData.ts         # All static data — Room[] and Event[] arrays + helper functions
  pages/
    index.vue          # Homepage (Hero, Stats, About, Rooms preview, Events preview, Contact)
    rooms/index.vue    # Full room listing
    rooms/[id].vue     # Room detail with photo hero, meta, CTA card
    events/index.vue   # Upcoming + past events
    events/[id].vue    # Event detail with gallery and details sidebar
  assets/css/main.css  # Google Fonts import + base html/body styles only
tailwind.config.ts     # Design token definitions (colors, fonts, radii)
```

**Data layer:** All content (rooms, events) is hardcoded in `app/composables/useData.ts` as exported TypeScript arrays. Pages import directly — no API, no store. Room IDs are kebab-case strings used as route params (`studio-a`, `double-room-b`, `single-room-c`). Event IDs follow the same pattern.

**Styling:** Tailwind CSS v3 via `@nuxtjs/tailwindcss` module. Custom design tokens in `tailwind.config.ts` map directly to the `.pen` design file variables: `bg-base`, `bg-raised`, `bg-card`, `bg-amber`, `bg-coral`, `text-primary`, `text-secondary`, `text-muted`, `text-on-amber`, `border-subtle`, `font-heading` (Fraunces), `font-body` (DM Sans), `rounded-md` (10px), `rounded-lg` (16px).

## Responsive design

The site is **mobile-first**: unprefixed utility classes describe the mobile layout (≈390px, matching the mobile frames in the `.pen` design file), and the **`lg:` prefix (≥1024px) restores the desktop layout** (≈1440px, matching the desktop frames). This split maps to the two widths designed in `upper_room_style2-1-1.pen`.

Conventions when building or editing pages:
- Write base classes for mobile, then add `lg:` overrides for desktop — e.g. `flex flex-col lg:flex-row`, `px-5 lg:px-20`, `text-[44px] lg:text-[80px]`.
- The default Tailwind breakpoints are used; only `lg` (1024px) is the active breakpoint. Tablets (768–1023px) intentionally get the mobile layout, since the desktop design needs a wide viewport. Use `md:` only if a tablet-specific layout is genuinely needed.
- To keep desktop and mobile sharing one DOM, prefer responsive classes over duplicated markup. The `lg:contents` trick (on `events/index.vue`) lets a mobile wrapper `<div>` collapse on desktop so its children rejoin the parent flex row.
- `AppNavbar.vue` swaps the desktop nav links + CTA for a hamburger dropdown below `lg`; the menu open state lives in the component.

## Critical: Tailwind integration

Do **not** use `@tailwindcss/vite` or import it in `nuxt.config.ts`. It is incompatible with Nuxt 4's Rolldown bundler on Windows and causes a "Class extends value undefined" crash. Always use the `@nuxtjs/tailwindcss` module approach (listed in `modules` array in `nuxt.config.ts`). Similarly, `tailwindcss` must stay at v3 — v4 has the same Rolldown incompatibility.

The `@rolldown/binding-win32-x64-msvc` package must be present in dependencies on this Windows machine; it was not installed automatically by npm due to a known optional dependency bug.
