import type {RoomCard, RoomDetail} from '~/types/room'

// Fields needed to render a room card/list row.
const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  roomType,
  district,
  city,
  price,
  status,
  description,
  mainImage
`

// Everything the detail page needs.
const DETAIL_FIELDS = `
  ${CARD_FIELDS},
  availableFrom,
  body,
  heroImage,
  gallery[]{..., _key}
`

/** All rooms, ordered by rent (high to low). */
export function useRoomsList() {
  return useSanityQuery<RoomCard[]>(`*[_type == "room"] | order(price desc){${CARD_FIELDS}}`)
}

/** The first few rooms (homepage preview). */
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
