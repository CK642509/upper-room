// Rooms store structured data in Sanity (district + city, numeric price, status
// + optional availableFrom). The display strings the old hardcoded data carried
// (location, locationShort, priceDisplay, availability) are derived here.
const TIME_ZONE = 'Asia/Taipei'

/** 'Zhongzheng District, Taipei' — long form used on the detail page. */
export function roomLocation(room: {district: string; city: string}): string {
  return `${room.district} District, ${room.city}`
}

/** 'Zhongzheng, Taipei' — short form used on cards and the meta row. */
export function roomLocationShort(room: {district: string; city: string}): string {
  return `${room.district}, ${room.city}`
}

/** 'NT$22,000'. */
export function roomPrice(price: number): string {
  return `NT$${price.toLocaleString('en-US')}`
}

/** 'NT$22,000 / mo'. */
export function roomPriceDisplay(price: number): string {
  return `${roomPrice(price)} / mo`
}

/** 'Immediately' | 'Currently Rented' | 'From June 1, 2026'. */
export function roomAvailability(room: {status: string; availableFrom?: string}): string {
  if (room.status === 'rented') return 'Currently Rented'
  if (!room.availableFrom) return 'Immediately'
  const date = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(room.availableFrom))
  return `From ${date}`
}
