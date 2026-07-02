import {createClient} from '@sanity/client'

// Dynamic routes for the sitemap (see `sitemap.sources` in nuxt.config.ts).
// Static pages are discovered from `pages/` automatically; this endpoint adds
// every Sanity-backed URL: location pages, room pages, and event pages.
//
// The app-side `useSanity()` composable isn't available in nitro routes, so we
// build a read-only client here from the same env vars (and dev defaults) that
// drive the `sanity` block in nuxt.config.ts.
export default defineSitemapEventHandler(async () => {
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID || 'k6yyg6ms',
    dataset: process.env.SANITY_DATASET || 'development',
    apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
    useCdn: true,
    perspective: 'published',
  })

  const {locations, rooms, events} = await client.fetch<{
    locations: string[]
    rooms: {slug: string; location: string}[]
    events: {slug: string; lastmod: string}[]
  }>(`{
    "locations": *[_type == "location" && defined(slug.current)].slug.current,
    "rooms": *[_type == "room" && defined(slug.current) && defined(location->slug.current)]{
      "slug": slug.current,
      "location": location->slug.current
    },
    "events": *[_type == "event" && defined(slug.current)]{"slug": slug.current, "lastmod": _updatedAt}
  }`)

  return [
    ...locations.map((slug) => ({loc: `/rooms/${slug}`})),
    ...rooms.map((room) => ({loc: `/rooms/${room.location}/${room.slug}`})),
    ...events.map((event) => ({loc: `/events/${event.slug}`, lastmod: event.lastmod})),
  ]
})
