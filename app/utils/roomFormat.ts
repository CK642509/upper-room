import type {LocationRef, BookedRange} from '~/types/room'

// Rooms store structured data in Sanity (a referenced location + numeric price +
// bookedRanges). The display strings the old hardcoded data carried (location,
// priceDisplay) are derived here.

/** 'Xinyi District' — the location name, used on the detail page. */
export function roomLocation(room: {location: LocationRef}): string {
  return room.location.name
}

/** 'Xinyi District · Taipei 101 area' — name plus tagline when present. */
export function roomLocationShort(room: {location: LocationRef}): string {
  const {name, tagline} = room.location
  return tagline ? `${name} · ${tagline}` : name
}

/** 'NT$22,000'. */
export function roomPrice(price: number): string {
  return `NT$${price.toLocaleString('en-US')}`
}

/** 'NT$22,000 / mo'. */
export function roomPriceDisplay(price: number): string {
  return `${roomPrice(price)} / mo`
}

/**
 * True when the room has no booked range overlapping the selected [from, to]
 * range. When no range is selected (either bound missing), the room always
 * passes. Dates are 'YYYY-MM-DD' strings, so lexical comparison is correct.
 */
export function isRoomFreeForRange(
  room: {bookedRanges?: BookedRange[]},
  from?: string,
  to?: string,
): boolean {
  if (!from || !to) return true
  // Normalize a reversed selection so order doesn't matter.
  const lo = from <= to ? from : to
  const hi = from <= to ? to : from
  const ranges = room.bookedRanges ?? []
  return !ranges.some((r) => r.start <= hi && r.end >= lo)
}
