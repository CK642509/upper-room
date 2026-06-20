import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
import type {PortableTextBlock} from '@portabletext/types'

/** A Sanity image object, optionally carrying alt text and an array `_key`. */
export type RoomImage = SanityImageSource & {
  alt?: string
  _key?: string
}

/** Fields needed to render a room in lists/cards. */
export interface RoomCard {
  _id: string
  title: string
  slug: string
  roomType: string
  district: string
  city: string
  /** Monthly rent in TWD; formatting (NT$ / mo) is done on the frontend. */
  price: number
  status: 'available' | 'rented'
  description: string
  mainImage: RoomImage
}

/** Full room, used on the detail page. */
export interface RoomDetail extends RoomCard {
  /** Empty = available immediately. Only meaningful while status is available. */
  availableFrom?: string
  body?: PortableTextBlock[]
  heroImage?: RoomImage
  gallery?: RoomImage[]
}
