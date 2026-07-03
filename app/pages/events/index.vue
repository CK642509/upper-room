<script setup lang="ts">
const {data} = await useEventsIndex()
const upcoming = computed(() => data.value?.upcoming ?? [])
const past = computed(() => data.value?.past ?? [])
const urlFor = useSanityImageUrl()
const imgAttrs = useSanityImageAttrs()

// Client-side pagination over past events (same pattern as the rooms list),
// 9 cards per page = 3 rows of the lg 3-column grid. The pager component
// hides itself when there's only one page. No clamp/reset watches needed —
// unlike the rooms list there's no filter, so the list never reshapes.
const PAGE_SIZE = 9
const page = ref(1)
const pageCount = computed(() => Math.max(1, Math.ceil(past.value.length / PAGE_SIZE)))
const pagedPast = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return past.value.slice(start, start + PAGE_SIZE)
})

const pastTop = ref<HTMLElement | null>(null)
function goToPage(next: number) {
  page.value = next
  // Bring the top of the section into view when jumping pages.
  const behavior =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  pastTop.value?.scrollIntoView({behavior, block: 'start'})
}

// Share preview: use the nearest upcoming event's photo (or the latest past
// one) since the page has no hero image of its own.
const shareEvent = upcoming.value[0] ?? past.value[0]
useSeoMeta({
  title: 'Events',
  description: "Community and culture events in Taipei — every week there's something happening. Come for the event, stay for the friends.",
  ogTitle: 'Events · Upper Room',
  ogDescription: "Community and culture events in Taipei — every week there's something happening. Come for the event, stay for the friends.",
  ogImage: shareEvent ? urlFor(shareEvent.mainImage).width(1200).height(630).fit('crop').auto('format').url() : undefined,
})
</script>

<template>
  <main>
    <!-- Page Header -->
    <section class="w-full bg-raised flex flex-col gap-3 py-10 lg:py-14 px-5 lg:px-20 pb-10 lg:pb-12">
      <p class="font-body text-[11px] font-bold text-coral tracking-[3px] uppercase">EVENTS</p>
      <h1 class="font-heading text-[40px] lg:text-[52px] font-bold text-primary">Community &amp; Culture</h1>
      <p class="font-body text-[15px] font-normal text-secondary">
        Every week there's something happening. Come for the event, stay for the friends.
      </p>
    </section>

    <!-- Upcoming Section -->
    <section class="w-full bg-base py-9 lg:py-10 px-5 lg:px-20 pb-8 flex flex-col">
      <!-- Section header -->
      <div class="flex items-center gap-3 pb-5 border-b border-subtle mb-0">
        <div class="w-1 h-5 bg-coral rounded-sm" />
        <p class="font-body text-xs font-bold text-coral tracking-[2px] uppercase">UPCOMING</p>
      </div>

      <!-- Empty state: nothing scheduled right now -->
      <div
        v-if="!upcoming.length"
        class="flex flex-col items-center text-center gap-2 py-12 mt-5 bg-card rounded-[10px] px-6"
      >
        <span class="text-[28px]" aria-hidden="true">📅</span>
        <h3 class="font-heading text-[20px] font-bold text-primary">Nothing on the calendar yet</h3>
        <p class="font-body text-[14px] font-normal text-secondary max-w-[420px] leading-[1.6]">
          We're busy planning the next one — check back soon, or explore what we've done below.
        </p>
      </div>

      <!-- Event rows -->
      <div
        v-for="evt in upcoming"
        :key="evt._id"
        class="flex flex-col md:flex-row md:items-center gap-4 md:gap-7 py-6 border-b border-subtle"
      >
        <div class="flex items-start gap-4 md:contents">
          <!-- Date block -->
          <div class="w-16 bg-card rounded-[10px] flex flex-col items-center py-2 shrink-0">
            <span class="font-heading text-[30px] font-bold text-amber leading-none">{{ eventDay(evt.startDateTime) }}</span>
            <span class="font-body text-[10px] font-bold text-muted mt-0.5">{{ eventMonth(evt.startDateTime) }}</span>
          </div>

          <!-- Info -->
          <div class="flex-1 flex flex-col gap-1.5">
            <div class="flex items-center gap-2.5">
              <h3 class="font-heading text-[20px] font-bold text-primary">{{ evt.title }}</h3>
              <span class="font-body text-[11px] font-semibold text-muted bg-card rounded-full py-1 px-2.5 shrink-0">
                {{ evt.category }}
              </span>
            </div>
            <p class="font-body text-[13px] font-normal text-secondary leading-[1.6]">{{ evt.description }}</p>
          </div>
        </div>

        <!-- Details button -->
        <NuxtLink
          :to="`/events/${evt.slug}`"
          class="font-body text-[13px] font-bold text-on-amber bg-amber rounded-[10px] py-[10px] px-5 shrink-0 text-center w-full md:w-auto hover:opacity-90 transition-opacity"
        >
          Details
        </NuxtLink>
      </div>
    </section>

    <!-- Past Events -->
    <section v-if="past.length" ref="pastTop" class="w-full bg-base py-8 px-5 lg:px-20 pb-12 lg:pb-14 flex flex-col gap-0 scroll-mt-20">
      <!-- Section header -->
      <div class="flex items-center gap-3 pb-5 border-b border-subtle">
        <div class="w-1 h-5 bg-muted rounded-sm" />
        <p class="font-body text-xs font-bold text-muted tracking-[2px] uppercase">PAST EVENTS</p>
      </div>

      <!-- Past cards: single column on mobile, 3-column grid on desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-5">
        <div
          v-for="evt in pagedPast"
          :key="evt._id"
          class="bg-card rounded-[10px] overflow-hidden flex flex-col"
        >
          <img
            v-bind="imgAttrs(evt.mainImage, {width: 600, height: 320, sizes: '(min-width: 1024px) 33vw, 100vw'})"
            :alt="evt.mainImage.alt || evt.title"
            loading="lazy"
            decoding="async"
            class="w-full h-[180px] lg:h-[160px] object-cover"
          />
          <div class="flex flex-col gap-1.5 p-4 pb-5">
            <p class="font-body text-xs font-normal text-muted">{{ eventFullDate(evt.startDateTime) }}</p>
            <h3 class="font-heading text-[17px] font-bold text-primary">{{ evt.title }}</h3>
            <NuxtLink
              :to="`/events/${evt.slug}`"
              class="font-body text-xs font-semibold text-amber hover:underline"
            >
              View photos →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Pagination (hidden when there's a single page) -->
      <AppPagination :model-value="page" :page-count="pageCount" @update:model-value="goToPage" />
    </section>
  </main>
</template>
