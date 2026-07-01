import type {EventCard, EventDetail} from '~/types/event'

// Fields needed to render an event card/list row.
const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  category,
  startDateTime,
  description,
  mainImage,
  "upcoming": startDateTime >= now()
`

// Everything the detail page needs.
const DETAIL_FIELDS = `
  ${CARD_FIELDS},
  endDateTime,
  tagline,
  body,
  heroImage,
  gallery[]{..., _key},
  venue,
  organizer,
  attendees
`

/** Upcoming + past events, each already ordered for display. */
export function useEventsIndex() {
  return useSanityQuery<{upcoming: EventCard[]; past: EventCard[]}>(`{
    "upcoming": *[_type == "event" && startDateTime >= now()] | order(startDateTime asc){${CARD_FIELDS}},
    "past": *[_type == "event" && startDateTime < now()] | order(startDateTime desc){${CARD_FIELDS}}
  }`)
}

/**
 * Homepage events preview: the next few upcoming events, plus the most recent
 * past events as a fallback for when nothing is scheduled. The page shows
 * `upcoming` when it has entries, otherwise `recentPast` (each card carries its
 * own `upcoming` flag so past ones can be labelled). Both are sliced
 * server-side to at most 3.
 */
export function useUpcomingEvents() {
  return useSanityQuery<{upcoming: EventCard[]; recentPast: EventCard[]}>(`{
    "upcoming": *[_type == "event" && startDateTime >= now()] | order(startDateTime asc)[0...3]{${CARD_FIELDS}},
    "recentPast": *[_type == "event" && startDateTime < now()] | order(startDateTime desc)[0...3]{${CARD_FIELDS}}
  }`)
}

/** A single event by its slug. */
export function useEvent(slug: string) {
  return useSanityQuery<EventDetail>(
    `*[_type == "event" && slug.current == $slug][0]{${DETAIL_FIELDS}}`,
    {slug},
  )
}
