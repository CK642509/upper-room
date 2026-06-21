<script setup lang="ts">
import { PortableText } from '@portabletext/vue'

const route = useRoute()
// NOTE: the [id] route param is the Sanity slug (slug.current), not the document _id.
// The file stays [id] for route stability — treat the value as a slug.
const {data: room} = await useRoom(route.params.id as string)

if (!room.value) {
  throw createError({ statusCode: 404, message: 'Room not found' })
}

const urlFor = useSanityImageUrl()
</script>

<template>
  <main v-if="room">
    <!-- Photo Hero -->
    <section class="relative overflow-hidden h-[340px] lg:h-[480px]">
      <img
        :src="urlFor(room.heroImage || room.mainImage).width(1600).height(960).fit('crop').auto('format').url()"
        :alt="(room.heroImage || room.mainImage).alt || room.title"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(13,24,41,0) 40%, rgba(13,24,41,1) 100%)"
      />

      <!-- Back link -->
      <NuxtLink
        to="/rooms"
        class="absolute top-6 left-5 lg:left-20 z-10 font-body text-[13px] font-semibold text-primary bg-[rgba(13,24,41,0.60)] rounded-full py-2 px-4 flex items-center gap-1.5 hover:bg-[rgba(13,24,41,0.80)] transition-colors"
      >
        ← All Rooms
      </NuxtLink>

      <!-- Thumbnails -->
      <div v-if="room.gallery?.length" class="absolute bottom-6 left-5 lg:bottom-[100px] lg:left-20 z-10 flex gap-2">
        <img
          v-for="(thumb, i) in room.gallery"
          :key="thumb._key ?? i"
          :src="urlFor(thumb).width(200).height(140).fit('crop').auto('format').url()"
          :alt="thumb.alt || `${room.title} photo ${i + 1}`"
          class="w-[100px] h-[64px] lg:h-[70px] object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </section>

    <!-- Detail Area -->
    <section class="w-full flex flex-col lg:flex-row bg-base">
      <!-- Left Column -->
      <div class="w-full lg:w-[860px] lg:min-w-0 flex flex-col gap-6 lg:gap-8 py-8 lg:py-12 px-5 lg:px-20 pb-8 lg:pb-16">
        <!-- Tag row -->
        <div class="flex items-center gap-2.5">
          <p class="font-body text-[11px] font-bold text-amber tracking-[3px] uppercase">{{ room.roomType }}</p>
          <span
            :class="room.status === 'available'
              ? 'bg-available-bg text-available'
              : 'bg-rented-bg text-rented'"
            class="font-body text-[11px] font-bold rounded-full py-1 px-3"
          >
            {{ room.status === 'available' ? 'Available' : 'Rented' }}
          </span>
        </div>

        <!-- Room title -->
        <h1 class="font-heading text-[40px] lg:text-[52px] font-bold text-primary">{{ room.title }}</h1>

        <!-- Meta row -->
        <div class="grid grid-cols-2 gap-4 lg:flex lg:gap-10">
          <div class="flex flex-col gap-1">
            <p class="font-body text-[10px] font-bold text-muted tracking-[2px] uppercase">LOCATION</p>
            <p class="font-body text-[15px] font-semibold text-primary">{{ roomLocationShort(room) }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-body text-[10px] font-bold text-muted tracking-[2px] uppercase">MONTHLY RENT</p>
            <p class="font-body text-[15px] font-semibold text-primary">{{ roomPrice(room.price) }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-body text-[10px] font-bold text-muted tracking-[2px] uppercase">AVAILABLE</p>
            <p class="font-body text-[15px] font-semibold text-primary">{{ roomAvailability(room) }}</p>
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
      </div>

      <!-- Right Column -->
      <div class="w-full lg:flex-1 py-0 lg:py-12 px-5 lg:px-0 lg:pr-16 pb-12 lg:pb-16">
        <div class="w-full lg:min-w-[400px] bg-raised rounded-[16px] flex flex-col gap-5 p-6 lg:p-8">
          <h3 class="font-heading text-[26px] font-bold text-primary">Interested?</h3>
          <p class="font-body text-sm font-normal text-secondary leading-[1.6]">
            We'll get back to you within 24 hours to arrange a viewing.
          </p>
          <a
            href="https://wa.me/"
            class="w-full font-body text-[15px] font-bold text-on-amber bg-amber rounded-[10px] py-[15px] flex justify-center items-center hover:opacity-90 transition-opacity"
          >
            Message on WhatsApp
          </a>
          <a
            href="#"
            class="w-full font-body text-[15px] font-semibold text-amber border border-amber rounded-[10px] py-[15px] flex justify-center items-center hover:bg-amber/10 transition-colors"
          >
            Contact via Line
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
