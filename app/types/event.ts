import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
import type {PortableTextBlock} from '@portabletext/types'

/** A Sanity image object, optionally carrying alt text and an array `_key`. */
export type EventImage = SanityImageSource & {
  alt?: string
  _key?: string
}

/** Fields needed to render an event in lists/cards. */
export interface EventCard {
  _id: string
  title: string
  slug: string
  category: string
  /** ISO datetime; day/month/full date/upcoming are all derived from this. */
  startDateTime: string
  description: string
  mainImage: EventImage
  /** Derived in GROQ: startDateTime >= now(). */
  upcoming: boolean
}

/** Full event, used on the detail page. */
export interface EventDetail extends EventCard {
  endDateTime?: string
  tagline?: string
  body?: PortableTextBlock[]
  heroImage?: EventImage
  gallery?: EventImage[]
  venue?: string
  organizer?: string
  attendees?: string
}
