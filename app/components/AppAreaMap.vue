<script setup lang="ts">
import type {ApproxLocation} from '~/types/room'

// Leaflet map showing an approximate area as a translucent circle — the
// center is an editor-chosen nearby landmark, never the exact address.
const props = defineProps<{
  center: ApproxLocation
  /** Circle radius in meters. */
  radius?: number
}>()

const radius = computed(() => props.radius ?? 300)
const latLng = computed<[number, number]>(() => [props.center.lat, props.center.lng])
</script>

<template>
  <ClientOnly>
    <LMap
      class="h-full w-full"
      :zoom="15"
      :center="latLng"
      :use-global-leaflet="false"
      :options="{scrollWheelZoom: false}"
    >
      <!-- Standard OpenStreetMap tiles: the classic full-color style (beige
           blocks, orange roads, green parks) — CARTO's light/dark basemaps
           looked too washed-out here. -->
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
      <LCircle
        :lat-lng="latLng"
        :radius="radius"
        color="#F5C128"
        :weight="2"
        fill-color="#F5C128"
        :fill-opacity="0.15"
      />
    </LMap>
    <!-- Placeholder while the client-only map hydrates; matches OSM's beige
         land color so the swap-in doesn't flash. -->
    <template #fallback>
      <div class="h-full w-full bg-[#F2EFE9] animate-pulse" />
    </template>
  </ClientOnly>
</template>
