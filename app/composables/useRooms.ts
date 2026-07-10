import type {RoomCard, RoomDetail, LocationCard, LocationDetail} from '~/types/room'

// Fields needed to render a room card/list row.
const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  roomType,
  "location": location->{name, "slug": slug.current, tagline},
  price,
  description,
  mainImage,
  bookedRanges[]{start, end}
`

// Everything the detail page needs.
const DETAIL_FIELDS = `
  ${CARD_FIELDS},
  body,
  heroImage,
  gallery[]{..., _key},
  approxLocation{lat, lng},
  areaRadius
`

/** All locations, in display order, each with how many rooms it has. */
export function useLocationsList() {
  return useSanityQuery<LocationCard[]>(`*[_type == "location"] | order(order asc){
    _id,
    name,
    "slug": slug.current,
    tagline,
    image,
    "roomCount": count(*[_type == "room" && references(^._id)])
  }`)
}

/** A single location by its slug (location page header). */
export function useLocation(slug: string) {
  return useSanityQuery<LocationDetail>(
    `*[_type == "location" && slug.current == $slug][0]{_id, name, "slug": slug.current, tagline, image}`,
    {slug},
  )
}

/** All rooms in one location, ordered by rent (high to low). */
export function useRoomsByLocation(slug: string) {
  return useSanityQuery<RoomCard[]>(
    `*[_type == "room" && location->slug.current == $slug] | order(price desc){${CARD_FIELDS}}`,
    {slug},
  )
}

/** The most expensive few rooms (homepage preview). */
export function usePreviewRooms() {
  return useSanityQuery<RoomCard[]>(
    `*[_type == "room"] | order(price desc)[0...3]{${CARD_FIELDS}}`,
  )
}

/** A single room by its slug. */
export function useRoom(slug: string) {
  return useSanityQuery<RoomDetail>(
    `*[_type == "room" && slug.current == $slug][0]{${DETAIL_FIELDS}}`,
    {slug},
  )
}
