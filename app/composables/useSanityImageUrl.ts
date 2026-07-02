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

/**
 * Returns an `imgAttrs(source, opts)` helper producing the `src`/`srcset`/
 * `sizes` attributes for a responsive `<img v-bind="imgAttrs(...)">`.
 *
 * `width`/`height` are the designed display size (they fix the crop's aspect
 * ratio); `widths` are the variants offered to the browser (default: 1x and 2x
 * of `width`), and `sizes` tells it how wide the image actually renders, e.g.
 * '(min-width: 768px) 200px, 100vw'. Full-viewport heroes should pass
 * `widths: [width / 2, width]` so the 1x design size stays the largest file.
 */
export function useSanityImageAttrs() {
  const urlFor = useSanityImageUrl()
  return (
    source: SanityImageSource,
    {width, height, sizes, widths = [width, width * 2]}: {width: number; height: number; sizes: string; widths?: number[]},
  ) => {
    const at = (w: number) =>
      urlFor(source).width(w).height(Math.round((height / width) * w)).fit('crop').auto('format').url()
    return {
      src: at(width),
      srcset: widths.map((w) => `${at(w)} ${w}w`).join(', '),
      sizes,
    }
  }
}
