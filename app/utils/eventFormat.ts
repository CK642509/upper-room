// Event dates are stored as a single ISO datetime in Sanity. Everything the UI
// shows (day, month, full date, time range) is derived here, formatted in the
// venue's timezone so server and client render identically (no hydration drift).
const TIME_ZONE = 'Asia/Taipei'

/** '14', '05' — zero-padded day of month. */
export function eventDay(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {timeZone: TIME_ZONE, day: '2-digit'}).format(new Date(iso))
}

/** 'JUN' — uppercase 3-letter month. */
export function eventMonth(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {timeZone: TIME_ZONE, month: 'short'})
    .format(new Date(iso))
    .toUpperCase()
}

/** 'June 14, 2026'. */
export function eventFullDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

/** '7:00 PM'. */
export function eventTime(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(iso))
}

/** '7:00 PM - 10:00 PM', or just the start time when there's no end. */
export function eventTimeRange(startIso: string, endIso?: string): string {
  const start = eventTime(startIso)
  return endIso ? `${start} - ${eventTime(endIso)}` : start
}
