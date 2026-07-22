import type {RoomImage} from './room'

/** One entry of the amber stats bar under the hero. */
export interface HomepageStat {
  value: string
  label: string
}

/** One button in the shared "Ready to move in?" contact footer. */
export interface ContactMethod {
  _key: string
  label: string
  url: string
}

/**
 * The `homepage` singleton document. Every field is optional — consumers fall
 * back to the hardcoded copy when the document (or a field) is missing.
 */
export interface HomepageContent {
  stats?: HomepageStat[]
  /** May contain newlines; rendered with `whitespace-pre-line`. */
  aboutHeading?: string
  aboutBody?: string
  /** Without quotation marks; the template adds them. */
  aboutQuote?: string
  aboutImage?: RoomImage
  contactHeading?: string
  contactSubheading?: string
  contactMethods?: ContactMethod[]
}
