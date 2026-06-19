<script setup lang="ts">
import { events } from '~/composables/useData'

const route = useRoute()
const event = computed(() => events.find(e => e.id === route.params.id))

if (!event.value) {
  throw createError({ statusCode: 404, message: 'Event not found' })
}
</script>

<template>
  <main v-if="event">
    <!-- Hero -->
    <section class="relative overflow-hidden h-[420px] lg:h-[400px]">
      <img
        :src="event.heroImage || event.image"
        :alt="event.name"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(13,24,41,0.93) 0%, rgba(13,24,41,0.40) 70%, rgba(13,24,41,0) 100%)"
      />

      <!-- Back button -->
      <NuxtLink
        to="/events"
        class="absolute top-6 left-5 lg:left-20 z-10 font-body text-[13px] font-semibold text-primary rounded-full py-2 px-4 hover:opacity-80 transition-opacity"
        style="background: rgba(13,24,41,0.53)"
      >
        ← All Events
      </NuxtLink>

      <!-- Hero content -->
      <div class="absolute z-10 left-5 right-5 lg:left-20 lg:right-auto bottom-12 lg:bottom-16 flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <span
            class="font-body text-[13px] font-bold text-primary bg-coral rounded-full py-1.5 px-4"
          >
            {{ event.fullDate }}
          </span>
          <span
            v-if="!event.upcoming"
            class="font-body text-[11px] font-bold text-muted tracking-[2px] uppercase"
          >
            PAST EVENT
          </span>
          <span
            v-else
            class="font-body text-[11px] font-bold text-amber tracking-[2px] uppercase"
          >
            UPCOMING
          </span>
        </div>
        <h1 class="font-heading font-bold text-primary leading-[1.05] text-[36px] lg:text-[56px]">
          {{ event.name }}
        </h1>
        <p class="font-body text-[15px] lg:text-[17px] font-normal text-secondary leading-[1.6]">
          {{ event.tagline }}
        </p>
      </div>
    </section>

    <!-- Body Area -->
    <section class="w-full flex flex-col lg:flex-row bg-base">
      <!-- Left column -->
      <div class="w-full lg:w-[860px] lg:min-w-0 flex flex-col gap-6 lg:gap-8 py-8 lg:py-12 px-5 lg:px-20 pb-8 lg:pb-16">
        <h2 class="font-heading text-[24px] lg:text-[26px] font-bold text-primary">About this event</h2>
        <div class="font-body text-[15px] font-normal text-secondary leading-[1.85]">
          <p
            v-for="(paragraph, i) in (event.fullAbout || event.description).split('\n\n')"
            :key="i"
            :class="i > 0 ? 'mt-4' : ''"
          >
            {{ paragraph }}
          </p>
        </div>

        <!-- Photo gallery -->
        <div v-if="event.gallery && event.gallery.length" class="flex flex-col gap-4 mt-2">
          <p class="font-body text-[11px] font-bold text-muted tracking-[3px] uppercase">
            PHOTOS FROM THE EVENT
          </p>
          <!-- Row 1 -->
          <div class="flex flex-col lg:flex-row gap-3">
            <img
              v-for="(img, i) in event.gallery.slice(0, 3)"
              :key="i"
              :src="img"
              :alt="`Event photo ${i + 1}`"
              class="w-full lg:w-[220px] h-[200px] lg:h-[160px] object-cover rounded-[10px]"
            />
          </div>
          <!-- Row 2 -->
          <div v-if="event.gallery.length > 3" class="flex flex-col lg:flex-row gap-3">
            <img
              v-for="(img, i) in event.gallery.slice(3)"
              :key="i"
              :src="img"
              :alt="`Event photo ${i + 4}`"
              class="w-full h-[200px] lg:h-[140px] object-cover rounded-[10px]"
              :class="event.gallery.length - 3 === 1 ? 'lg:w-full' : 'lg:w-[336px]'"
            />
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="w-full lg:flex-1 py-0 lg:py-12 px-5 lg:px-0 lg:pr-16 pb-12 lg:pb-16">
        <div v-if="event.details" class="w-full lg:min-w-[400px] bg-raised rounded-[16px] flex flex-col gap-5 p-6 lg:p-7">
          <h3 class="font-heading text-[22px] font-bold text-primary">Event Details</h3>

          <div
            v-for="(item, key) in [
              { label: 'Date', value: event.details.date },
              { label: 'Time', value: event.details.time },
              { label: 'Venue', value: event.details.venue },
              { label: 'Organizer', value: event.details.organizer },
              { label: 'Attendees', value: event.details.attendees },
            ]"
            :key="key"
            class="flex gap-4 pb-4 border-b border-subtle last:border-0 last:pb-0"
          >
            <div class="w-8 h-8 rounded-[10px] bg-card flex items-center justify-center shrink-0 mt-0.5">
              <span class="text-[14px]">
                {{ ['📅', '🕐', '📍', '👥', '🌐'][key] }}
              </span>
            </div>
            <div class="flex flex-col gap-0.5">
              <p class="font-body text-[10px] font-bold text-muted tracking-[1.5px] uppercase">{{ item.label }}</p>
              <p class="font-body text-sm font-medium text-primary">{{ item.value }}</p>
            </div>
          </div>

          <!-- CTA for upcoming events -->
          <div v-if="event.upcoming" class="flex flex-col gap-3 mt-2">
            <a
              href="https://wa.me/"
              class="w-full font-body text-[15px] font-bold text-on-amber bg-amber rounded-[10px] py-[14px] flex justify-center items-center hover:opacity-90 transition-opacity"
            >
              Join via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
