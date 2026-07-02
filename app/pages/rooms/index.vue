<script setup lang="ts">
const {data} = await useLocationsList()
const locations = computed(() => data.value ?? [])
const imgAttrs = useSanityImageAttrs()

useSeoMeta({
  title: 'Rooms',
  description: 'Explore our fully furnished co-living rooms across Taipei — pick a neighbourhood to start.',
  ogTitle: 'Rooms · Upper Room',
  ogDescription: 'Explore our fully furnished co-living rooms across Taipei — pick a neighbourhood to start.',
  ogImage: 'https://images.unsplash.com/photo-1595139367629-c4601c4ffe06?w=1200&h=630&fit=crop&q=80',
})
</script>

<template>
  <main>
    <!-- Page Header -->
    <section class="relative overflow-hidden h-[200px] lg:h-[220px]">
      <img
        src="https://images.unsplash.com/photo-1595139367629-c4601c4ffe06?w=1440&q=80"
        alt="Rooms"
        fetchpriority="high"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(13,24,41,0.93) 0%, rgba(13,24,41,0.80) 100%)"
      />
      <div class="relative z-10 h-full flex flex-col justify-center px-5 lg:px-0 lg:pl-20 gap-2">
        <p class="font-body text-[11px] font-bold text-amber tracking-[3px] uppercase">ROOMS</p>
        <h1 class="font-heading text-[40px] lg:text-[52px] font-bold text-primary">Choose an Area</h1>
        <p class="font-body text-[15px] font-normal text-secondary">
          Explore our fully furnished rooms across Taipei — pick a neighbourhood to start.
        </p>
      </div>
    </section>

    <!-- Location Cards -->
    <section class="w-full bg-base py-9 lg:py-12 px-5 lg:px-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <NuxtLink
          v-for="location in locations"
          :key="location._id"
          :to="`/rooms/${location.slug}`"
          class="group relative overflow-hidden rounded-[16px] h-[220px] lg:h-[260px] flex items-end"
        >
          <img
            v-bind="imgAttrs(location.image, {width: 560, height: 520, sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'})"
            :alt="location.image.alt || location.name"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            class="absolute inset-0"
            style="background: linear-gradient(180deg, rgba(13,24,41,0) 35%, rgba(13,24,41,0.92) 100%)"
          />
          <div class="relative z-10 p-5 lg:p-6 flex flex-col gap-1">
            <h3 class="font-heading text-[24px] lg:text-[26px] font-bold text-primary">{{ location.name }}</h3>
            <p v-if="location.tagline" class="font-body text-[13px] font-normal text-secondary">
              {{ location.tagline }}
            </p>
            <p class="font-body text-[12px] font-semibold text-amber mt-1">
              {{ location.roomCount }} {{ location.roomCount === 1 ? 'room' : 'rooms' }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
