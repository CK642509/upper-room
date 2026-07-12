<script setup lang="ts">
const {data: roomsData} = await usePreviewRooms()
const previewRooms = computed(() => roomsData.value ?? [])
const {data: previewEventsData} = await useUpcomingEvents()
// Prefer scheduled events; when none are upcoming, fall back to recent past
// events so the section is never empty. Each card's own `upcoming` flag drives
// the "Past" label.
const previewEvents = computed(() => {
  const d = previewEventsData.value
  if (!d) return []
  return d.upcoming.length ? d.upcoming : d.recentPast
})
const imgAttrs = useSanityImageAttrs()
const heroVideoUrl = useRuntimeConfig().public.heroVideoUrl

// Wix-style pixel grid laid over the hero video: a 3×3 semi-transparent black
// cross pattern tiled at 3px. It masks the heavy compression artifacts of the
// low-bitrate background video (so 720p reads as sharp) while darkening the
// footage ~18% for overlay-content contrast.
const HERO_GRID =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAACXBIWXMAAAAAAAAAAQCEeRdzAAAAG0lEQVR4nGNkgIBIBgaG5SxQxjMQDeIsh8kAAEJBBEkNyJBnAAAAAElFTkSuQmCC'

// Homepage carries the full brand title itself, so skip the template suffix.
useHead({titleTemplate: null})
useSeoMeta({
  title: 'Upper Room — Co-living Rooms & Community Events in Taipei',
  description:
    'Furnished rooms for expats in Taipei, plus weekly events to help you actually connect with the city.',
  ogTitle: 'Upper Room — Co-living in Taipei',
  ogDescription: 'Furnished rooms for expats in Taipei, plus weekly events to help you actually connect with the city.',
  ogImage: 'https://images.unsplash.com/photo-1664947938370-f0c040bf9ced?w=1200&h=630&fit=crop&q=80',
})
</script>

<template>
  <main>
    <!-- Video hero: muted background footage of community events, with the
         Wix-style pixel grid + a navy vignette over it, and a centered logo
         badge + CTA. Without NUXT_PUBLIC_HERO_VIDEO_URL the static poster
         frame shows instead (same treatment). -->
    <section class="relative overflow-hidden h-[480px] md:h-[660px] bg-base">
      <video
        v-if="heroVideoUrl"
        :src="heroVideoUrl"
        poster="/hero-poster.jpg"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <img
        v-else
        src="/hero-poster.jpg"
        alt=""
        fetchpriority="high"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0"
        :style="{backgroundImage: `url(${HERO_GRID})`, backgroundSize: '3px 3px', backgroundRepeat: 'repeat'}"
        aria-hidden="true"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(13,24,41,0.45) 0%, rgba(13,24,41,0.12) 40%, rgba(13,24,41,0.45) 100%)"
        aria-hidden="true"
      />
      <div class="relative z-10 h-full flex flex-col items-center justify-center gap-8 md:gap-10 px-5">
        <h1 class="sr-only">Upper Room — Co-living Rooms & Community Events in Taipei</h1>
        <img
          src="/logo.jpg"
          alt="Upper Room Taipei Housing"
          fetchpriority="high"
          class="w-[150px] h-[150px] md:w-[210px] md:h-[210px] rounded-full object-cover ring-1 ring-primary/25 shadow-[0_12px_48px_rgba(0,0,0,0.55)]"
        />
        <NuxtLink
          to="/rooms"
          class="font-body text-[15px] font-bold text-on-amber bg-amber rounded-full py-[14px] px-[38px] text-center hover:opacity-90 transition-opacity"
        >
          Browse Rooms
        </NuxtLink>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="w-full bg-amber py-7 px-5 lg:px-20 grid grid-cols-2 gap-6 lg:flex lg:items-center lg:justify-between">
      <div
        v-for="stat in [
          { num: '12+', lbl: 'Furnished Rooms' },
          { num: '50+', lbl: 'Events This Year' },
          { num: '30+', lbl: 'Expat Residents' },
          { num: '5★', lbl: 'Average Rating' },
        ]"
        :key="stat.lbl"
        class="flex items-center justify-center lg:justify-start gap-3"
      >
        <span class="font-heading text-[32px] font-bold text-on-amber">{{ stat.num }}</span>
        <span class="font-body text-[13px] font-medium" style="color: rgba(13,24,41,0.67)">{{ stat.lbl }}</span>
      </div>
    </section>

    <!-- About Section -->
    <section class="w-full bg-raised flex flex-col lg:flex-row">
      <!-- Left -->
      <div class="order-2 lg:order-1 w-full lg:w-[640px] flex flex-col gap-6 py-12 lg:py-[72px] px-5 md:px-20">
        <p class="font-body text-[11px] font-bold text-amber tracking-[3px] uppercase">WHO WE ARE</p>
        <h2 class="font-heading text-[34px] lg:text-[44px] font-bold text-primary leading-[1.15]">
          Not just a room.<br>A community.
        </h2>
        <p class="font-body text-[15px] font-normal text-secondary leading-[1.75] lg:max-w-[480px]">
          Upper Room is built for international residents who want more than four walls. We host weekly dinners, language exchanges, hikes, and cultural events — because the best part of living abroad is the people you meet.
        </p>
        <div class="flex gap-6 lg:gap-8 mt-2">
          <div
            v-for="feat in [
              { icon: '🏘️', txt: 'Taipei locations' },
              { icon: '🎉', txt: 'Weekly events' },
              { icon: '🌍', txt: '30+ nationalities' },
            ]"
            :key="feat.txt"
            class="flex flex-col gap-1.5"
          >
            <span class="text-[24px]">{{ feat.icon }}</span>
            <span class="font-body text-[13px] font-medium text-secondary">{{ feat.txt }}</span>
          </div>
        </div>
      </div>
      <!-- Right -->
      <div class="order-1 lg:order-2 w-full lg:flex-1 relative overflow-hidden h-[300px] lg:h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1714978444624-1fcb0c550a72?w=900&q=80"
          alt="Community"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div
          class="absolute inset-0"
          style="background: linear-gradient(270deg, rgba(13,24,41,0) 50%, rgba(13,24,41,0.73) 100%)"
        />
        <p class="absolute font-heading text-[20px] lg:text-[22px] font-semibold text-primary bottom-6 left-5 md:left-20 lg:bottom-12 lg:left-12 max-w-[300px] lg:max-w-[500px]">
          "Best decision I made coming to Taiwan."
        </p>
      </div>
    </section>

    <!-- Rooms Preview (desktop layout from md / tablet up) -->
    <section class="w-full bg-base py-12 md:py-16 px-5 md:px-20 flex flex-col gap-8 md:gap-10">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex flex-col gap-1.5">
          <p class="font-body text-[11px] font-bold text-amber tracking-[3px] uppercase">FIND YOUR SPACE</p>
          <h2 class="font-heading text-[32px] md:text-[40px] font-bold text-primary">Choose Your Room</h2>
        </div>
        <NuxtLink
          to="/rooms"
          class="font-body text-sm font-semibold text-amber border border-amber rounded-[10px] py-[11px] px-[22px] self-start md:self-auto hover:bg-amber/10 transition-colors"
        >
          All Rooms →
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-5 md:gap-0">
        <div
          v-for="room in previewRooms"
          :key="room._id"
          class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 md:py-6 md:border-b md:border-subtle"
        >
          <img
            v-bind="imgAttrs(room.mainImage, {width: 400, height: 260, sizes: '(min-width: 768px) 200px, 100vw'})"
            :alt="room.mainImage.alt || room.title"
            loading="lazy"
            decoding="async"
            class="w-full md:w-[200px] h-[200px] md:h-[130px] object-cover rounded-[10px] shrink-0"
          />
          <div class="flex-1 flex flex-col gap-2">
            <h3 class="font-heading text-[22px] font-bold text-primary">{{ room.title }}</h3>
            <p class="font-body text-[13px] font-normal text-muted">📍 {{ roomLocation(room) }}</p>
            <p class="font-heading text-[20px] font-bold text-amber">{{ roomPriceDisplay(room.price) }}</p>
          </div>
          <div class="flex flex-row md:flex-col items-center justify-between md:justify-start gap-2.5">
            <NuxtLink
              :to="`/rooms/${room.location.slug}/${room.slug}`"
              class="font-body text-[13px] font-semibold text-primary bg-card rounded-[10px] py-[10px] px-5 hover:bg-subtle transition-colors"
            >
              Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Events Preview (header/padding promoted to md to match Rooms Preview) -->
    <section class="w-full bg-raised py-12 md:py-16 px-5 md:px-20 flex flex-col gap-8 md:gap-10">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex flex-col gap-1.5">
          <p class="font-body text-[11px] font-bold text-coral tracking-[3px] uppercase">WHAT'S HAPPENING</p>
          <h2 class="font-heading text-[32px] md:text-[40px] font-bold text-primary">Join the Community</h2>
        </div>
        <NuxtLink
          to="/events"
          class="font-body text-sm font-semibold text-coral border border-coral rounded-[10px] py-[11px] px-[22px] self-start md:self-auto hover:bg-coral/10 transition-colors"
        >
          All Events →
        </NuxtLink>
      </div>

      <div v-if="previewEvents.length" class="flex flex-col lg:flex-row gap-5">
        <NuxtLink
          v-for="evt in previewEvents"
          :key="evt._id"
          :to="`/events/${evt.slug}`"
          class="flex-1 bg-card rounded-[16px] overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-[transform,box-shadow]"
        >
          <div class="relative h-[170px] lg:h-[160px] overflow-hidden">
            <img
              v-bind="imgAttrs(evt.mainImage, {width: 600, height: 340, sizes: '(min-width: 1024px) 33vw, 100vw'})"
              :alt="evt.mainImage.alt || evt.title"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div
              class="absolute inset-0"
              style="background: linear-gradient(180deg, rgba(22,32,64,0) 0%, rgba(22,32,64,0.60) 100%)"
            />
            <div
              class="absolute top-4 left-4 bg-amber rounded-[10px] flex flex-col items-center py-2 px-[14px]"
            >
              <span class="font-heading text-[22px] font-bold text-on-amber leading-none">{{ eventDay(evt.startDateTime) }}</span>
              <span class="font-body text-[9px] font-bold text-on-amber">{{ eventMonth(evt.startDateTime) }}</span>
            </div>
            <span
              v-if="!evt.upcoming"
              class="absolute top-4 right-4 font-body text-[10px] font-bold text-primary tracking-[1px] uppercase bg-base/85 rounded-full py-1 px-2.5"
            >
              Past
            </span>
          </div>
          <div class="flex flex-col gap-2 p-5 pb-6">
            <h3 class="font-heading text-[20px] font-bold text-primary">{{ evt.title }}</h3>
            <p class="font-body text-[13px] font-normal text-secondary leading-[1.6]">{{ evt.description }}</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state: no events scheduled and none in the past yet -->
      <div
        v-else
        class="bg-card rounded-[16px] flex flex-col items-center text-center gap-2 py-12 px-6"
      >
        <span class="text-[28px]" aria-hidden="true">🎉</span>
        <h3 class="font-heading text-[20px] font-bold text-primary">No events just yet</h3>
        <p class="font-body text-[14px] font-normal text-secondary max-w-[420px] leading-[1.6]">
          We're planning something special — check back soon to join the community.
        </p>
      </div>
    </section>
  </main>
</template>
