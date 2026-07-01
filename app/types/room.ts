import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
import type {PortableTextBlock} from '@portabletext/types'

/** A Sanity image object, optionally carrying alt text and an array `_key`. */
export type RoomImage = SanityImageSource & {
  alt?: string
  _key?: string
}

/** The location a room belongs to, resolved from the referenced location doc. */
export interface LocationRef {
  name: string
  slug: string
  tagline?: string
}

/** A date range (YYYY-MM-DD) during which a room is already rented. */
export interface BookedRange {
  start: string
  end: string
}

/** Fields needed to render a room in lists/cards. */
export interface RoomCard {
  _id: string
  title: string
  slug: string
  roomType: string
  location: LocationRef
  /** Monthly rent in TWD; formatting (NT$ / mo) is done on the frontend. */
  price: number
  description: string
  mainImage: RoomImage
  /** Date ranges the room is already booked; used by the date filter. */
  bookedRanges?: BookedRange[]
}

/** Full room, used on the detail page. */
export interface RoomDetail extends RoomCard {
  body?: PortableTextBlock[]
  heroImage?: RoomImage
  gallery?: RoomImage[]
}

/** A location card on the /rooms landing and the navbar dropdown. */
export interface LocationCard {
  _id: string
  name: string
  slug: string
  tagline?: string
  image: RoomImage
  roomCount: number
}

/** A location, used as the header of a location page. */
export interface LocationDetail {
  _id: string
  name: string
  slug: string
  tagline?: string
  image: RoomImage
}
