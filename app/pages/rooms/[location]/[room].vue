<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type {ContactMethod} from '~/types/homepage'

const route = useRoute()
// NOTE: the [room] route param is the Sanity room slug (slug.current), not the
// document _id. Rooms are nested under their location: /rooms/[location]/[room].
const {data: room} = await useRoom(route.params.room as string)

if (!room.value) {
  throw createError({ statusCode: 404, message: 'Room not found' })
}

// A room's canonical URL nests it under its own location. If the URL carries
// any other location slug (typo, stale link, or the room moved districts),
// permanently redirect to the canonical address instead of serving the same
// page under multiple URLs (duplicate content for search engines).
const locationSlug = route.params.location as string
if (room.value.location.slug !== locationSlug) {
  await navigateTo(`/rooms/${room.value.location.slug}/${room.value.slug}`, {redirectCode: 301, replace: true})
}

const urlFor = useSanityImageUrl()
const imgAttrs = useSanityImageAttrs()

// WhatsApp/Line CTA buttons reuse the same homepage-singleton contact
// methods as <AppFooter>, so editors manage one set of links/QR codes for
// both. Matched by URL domain (falling back to the label) since editor-added
// array items don't carry a stable `_key`.
const {data: homepageData} = await useHomepageContent()
function findContact(urlKeyword: string, labelKeyword: string) {
  return homepageData.value?.contactMethods?.find(
    (m) => m.url.toLowerCase().includes(urlKeyword) || m.label.toLowerCase().includes(labelKeyword),
  )
}
const whatsappMethod = computed(() => findContact('wa.me', 'whatsapp'))
const lineMethod = computed(() => findContact('line.me', 'line'))

const activeQrMethod = ref<ContactMethod | null>(null)
function onContactClick(method?: ContactMethod) {
  if (method?.qrImage) activeQrMethod.value = method
}

// Photos shown in the hero slot: the dedicated hero shot (or main image)
// first, then the gallery. Clicking a thumbnail swaps it into the hero.
const photos = computed(() => {
  const r = room.value
  return r ? [r.heroImage || r.mainImage, ...(r.gallery ?? [])] : []
})
const selectedPhoto = ref(0)
const heroPhoto = computed(() => photos.value[selectedPhoto.value] ?? photos.value[0]!)

useSeoMeta({
  title: room.value.title,
  description: room.value.description,
  ogTitle: `${room.value.title} · Upper Room`,
  ogDescription: room.value.description,
  ogImage: urlFor(room.value.mainImage).width(1200).height(630).fit('crop').auto('format').url(),
})
</script>

<template>
  <main v-if="room">
    <!-- Photo Hero: object-contain so the image is never cropped top/bottom —
         tall photos pillarbox (blank space left/right) against bg-base instead. -->
    <section class="relative overflow-hidden h-[340px] lg:h-[480px] bg-base">
      <img
        v-bind="imgAttrs(heroPhoto, {width: 1600, height: 960, widths: [800, 1600], sizes: '100vw'})"
        :alt="heroPhoto.alt || room.title"
        fetchpriority="high"
        class="absolute inset-0 w-full h-full object-contain"
      />
      <div
        class="absolute inset-0 pointer-events-none"
        style="background: linear-gradient(180deg, rgba(13,24,41,0) 80%, rgba(13,24,41,0.9) 100%)"
      />

      <!-- Back link -->
      <NuxtLink
        :to="`/rooms/${locationSlug}`"
        class="absolute top-6 left-5 lg:left-20 z-10 font-body text-[13px] font-semibold text-primary bg-[rgba(13,24,41,0.60)] rounded-full py-2 px-4 flex items-center gap-1.5 hover:bg-[rgba(13,24,41,0.80)] transition-colors"
      >
        ← {{ room.location.name }}
      </NuxtLink>
    </section>

    <!-- Photo strip: thumbnails live below the hero (not overlaid on it) so a
         long gallery never obscures the photo. Click to swap into the hero
         above. Scrolls horizontally when there are more thumbs than fit. -->
    <section v-if="photos.length > 1" class="w-full bg-base px-5 lg:px-20 pt-4 lg:pt-6 pb-2">
      <div class="flex gap-2 overflow-x-auto">
        <button
          v-for="(thumb, i) in photos"
          :key="thumb._key ?? i"
          type="button"
          class="shrink-0 rounded-sm overflow-hidden transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          :class="i === selectedPhoto ? 'ring-2 ring-amber' : 'hover:opacity-80'"
          :aria-label="`Show photo ${i + 1} of ${photos.length}`"
          :aria-pressed="i === selectedPhoto"
          @click="selectedPhoto = i"
        >
          <img
            :src="urlFor(thumb).width(200).height(140).fit('crop').auto('format').url()"
            :alt="thumb.alt || `${room.title} photo ${i + 1}`"
            class="block w-[100px] h-[64px] lg:h-[70px] object-cover"
          />
        </button>
      </div>
    </section>

    <!-- Detail Area -->
    <section class="w-full flex flex-col lg:flex-row bg-base">
      <!-- Left Column -->
      <div class="w-full lg:w-[860px] lg:min-w-0 flex flex-col gap-6 lg:gap-8 py-8 lg:py-12 px-5 lg:px-20 pb-8 lg:pb-16">
        <!-- Tag row -->
        <div class="flex items-center gap-2.5">
          <p class="font-body text-[11px] font-bold text-amber tracking-[3px] uppercase">{{ room.roomType }}</p>
        </div>

        <!-- Room title -->
        <h1 class="font-heading text-[40px] lg:text-[52px] font-bold text-primary">{{ room.title }}</h1>

        <!-- Meta row -->
        <div class="grid grid-cols-2 gap-4 lg:flex lg:gap-10">
          <div class="flex flex-col gap-1">
            <p class="font-body text-[10px] font-bold text-muted tracking-[2px] uppercase">LOCATION</p>
            <p class="font-body text-[15px] font-semibold text-primary">{{ roomLocation(room) }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-body text-[10px] font-bold text-muted tracking-[2px] uppercase">MONTHLY RENT</p>
            <p class="font-body text-[15px] font-semibold text-primary">{{ roomPrice(room.price) }}</p>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-px bg-subtle" />

        <!-- About -->
        <h3 class="font-heading text-[24px] font-bold text-primary">About this room</h3>
        <div class="font-body text-[15px] font-normal text-secondary leading-[1.8] [&_p]:mt-4 [&_p:first-child]:mt-0 [&_a]:text-amber [&_a]:underline">
          <PortableText v-if="room.body?.length" :value="room.body" />
          <p v-else>{{ room.description }}</p>
        </div>

        <!-- Area map: a circle around an approximate point, not the address.
             Rooms without coordinates simply don't get this section. -->
        <template v-if="room.approxLocation">
          <div class="w-full h-px bg-subtle" />
          <h3 class="font-heading text-[24px] font-bold text-primary">Where you'll live</h3>
          <div class="w-full h-[280px] lg:h-[380px] rounded-lg overflow-hidden border border-subtle">
            <AppAreaMap :center="room.approxLocation" :radius="room.areaRadius" />
          </div>
          <p class="font-body text-[13px] font-normal text-muted">
            The highlighted circle shows the general area. We share the exact address when you book a viewing.
          </p>
        </template>
      </div>

      <!-- Right Column -->
      <div class="w-full lg:flex-1 py-0 lg:py-12 px-5 lg:px-0 lg:pr-16 pb-12 lg:pb-16">
        <div class="w-full lg:min-w-[400px] bg-raised rounded-[16px] flex flex-col gap-5 p-6 lg:p-8">
          <h3 class="font-heading text-[26px] font-bold text-primary">Interested?</h3>
          <p class="font-body text-sm font-normal text-secondary leading-[1.6]">
            We'll get back to you within 24 hours to arrange a viewing.
          </p>
          <component
            :is="whatsappMethod?.qrImage ? 'button' : 'a'"
            :type="whatsappMethod?.qrImage ? 'button' : undefined"
            :href="whatsappMethod?.qrImage ? undefined : whatsappMethod?.url || 'https://wa.me/'"
            class="w-full font-body text-[15px] font-bold text-on-amber bg-amber rounded-[10px] py-[15px] flex justify-center items-center hover:opacity-90 transition-opacity"
            @click="onContactClick(whatsappMethod)"
          >
            Message on WhatsApp
          </component>
          <component
            :is="lineMethod?.qrImage ? 'button' : 'a'"
            :type="lineMethod?.qrImage ? 'button' : undefined"
            :href="lineMethod?.qrImage ? undefined : lineMethod?.url || '#'"
            class="w-full font-body text-[15px] font-semibold text-amber border border-amber rounded-[10px] py-[15px] flex justify-center items-center hover:bg-amber/10 transition-colors"
            @click="onContactClick(lineMethod)"
          >
            Contact via Line
          </component>
        </div>
      </div>
    </section>

    <AppQrModal v-if="activeQrMethod" :method="activeQrMethod" @close="activeQrMethod = null" />
  </main>
</template>
