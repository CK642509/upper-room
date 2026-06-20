import {createImageUrlBuilder} from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

/**
 * Returns an `urlFor(source)` helper that builds Sanity image URLs from the
 * current project/dataset config. Usage in a template:
 *   urlFor(event.mainImage).width(600).height(360).auto('format').url()
 */
export function useSanityImageUrl() {
  const config = useSanityConfig()
  const builder = createImageUrlBuilder({projectId: config.projectId, dataset: config.dataset})
  return (source: SanityImageSource) => builder.image(source)
}
