<script setup lang="ts">
import type {ApproxLocation} from '~/types/room'

// Google Map showing an approximate area as a translucent circle — the
// center is an editor-chosen nearby landmark, never the exact address.
// Loaded through the @nuxt/scripts googleMaps registry with language=en so
// labels render in English (Google has full English coverage for Taiwan,
// including MRT stations and POIs) regardless of the visitor's locale.
const props = defineProps<{
  center: ApproxLocation
  /** Circle radius in meters. */
  radius?: number
}>()

const apiKey = useRuntimeConfig().public.googleMapsKey

const mapEl = ref<HTMLDivElement | null>(null)

const {onLoaded} = useScriptGoogleMaps({
  apiKey,
  // Map + Circle both live in the core 'maps' library; skip the registry's
  // default 'places' (autocomplete etc.), which this map doesn't use.
  libraries: ['maps'],
  language: 'en',
  region: 'TW',
})

onMounted(() => {
  if (!apiKey || !mapEl.value) return
  onLoaded(async ({maps}) => {
    const gm = (await maps) as unknown as typeof google.maps
    const {Map, Circle} = (await gm.importLibrary('maps')) as google.maps.MapsLibrary
    const center = {lat: props.center.lat, lng: props.center.lng}
    const map = new Map(mapEl.value!, {
      center,
      zoom: 15,
      // Ctrl+scroll to zoom, so the map doesn't trap page scrolling.
      gestureHandling: 'cooperative',
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      // No pins/POI popups: the map marks an area, not a destination.
      clickableIcons: false,
    })
    new Circle({
      map,
      center,
      radius: props.radius ?? 200,
      strokeColor: '#CC604A',
      strokeWeight: 3,
      fillColor: '#CC604A',
      fillOpacity: 0.18,
    })
  })
})
</script>

<template>
  <!-- Beige placeholder shows until Google Maps initializes into the div
       (and stays if no API key is configured). -->
  <div ref="mapEl" class="h-full w-full bg-[#F2EFE9]" />
</template>
