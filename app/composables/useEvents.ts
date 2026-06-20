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

/** The next few upcoming events (homepage preview). */
export function useUpcomingEvents() {
  return useSanityQuery<EventCard[]>(
    `*[_type == "event" && startDateTime >= now()] | order(startDateTime asc)[0...3]{${CARD_FIELDS}}`,
  )
}

/** A single event by its slug. */
export function useEvent(slug: string) {
  return useSanityQuery<EventDetail>(
    `*[_type == "event" && slug.current == $slug][0]{${DETAIL_FIELDS}}`,
    {slug},
  )
}
