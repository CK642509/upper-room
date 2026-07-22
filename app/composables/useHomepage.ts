import type {HomepageContent} from '~/types/homepage'

/**
 * The `homepage` singleton (stats bar, About section, contact buttons).
 * Used by the homepage and by <AppFooter> on every page — useSanityQuery
 * dedupes the request by query key, so it only fetches once per page.
 */
export function useHomepageContent() {
  return useSanityQuery<HomepageContent>(`*[_type == "homepage"][0]{
    stats[]{value, label},
    aboutHeading,
    aboutBody,
    aboutQuote,
    aboutImage,
    contactHeading,
    contactSubheading,
    contactMethods[]{_key, label, url}
  }`)
}
