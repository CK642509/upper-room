<script setup lang="ts">
import { rooms, events } from '~/composables/useData'

const previewRooms = rooms.slice(0, 2)
const previewEvents = events.filter(e => e.upcoming).slice(0, 3)
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="relative overflow-hidden h-[660px]">
      <img
        src="https://images.unsplash.com/photo-1664947938370-f0c040bf9ced?w=1440&q=80"
        alt="Co-living in Taiwan"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(90deg, rgba(13,24,41,0.93) 0%, rgba(13,24,41,0.40) 60%, rgba(13,24,41,0.07) 100%)"
      />
      <div class="relative z-10 h-full flex flex-col justify-center pl-20 pt-16 max-w-4xl">
        <p class="font-body text-sm font-semibold text-amber mb-7">🌏  Co-living in Taiwan</p>
        <h1
          class="font-heading font-bold text-primary leading-none"
          style="font-size: 80px; max-width: 740px"
        >
          Feel at Home.<br>Meet Your People.
        </h1>
        <p
          class="font-body text-[17px] font-normal text-secondary mt-7 leading-[1.65]"
          style="max-width: 500px"
        >
          Furnished rooms for expats in Taipei, plus weekly events<br>
          to help you actually connect with the city.
        </p>
        <div class="flex items-center gap-4 mt-7">
          <NuxtLink
            to="/rooms"
            class="font-body text-[15px] font-bold text-on-amber bg-amber rounded-full py-[14px] px-[30px] hover:opacity-90 transition-opacity"
          >
            Browse Rooms
          </NuxtLink>
          <NuxtLink
            to="/events"
            class="font-body text-[15px] font-medium text-primary border border-primary/60 rounded-full py-[14px] px-[30px] hover:border-primary transition-colors"
          >
            See Events →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="w-full bg-amber py-7 px-20 flex items-center justify-between">
      <div
        v-for="stat in [
          { num: '12+', lbl: 'Furnished Rooms' },
          { num: '50+', lbl: 'Events This Year' },
          { num: '30+', lbl: 'Expat Residents' },
          { num: '5★', lbl: 'Average Rating' },
        ]"
        :key="stat.lbl"
        class="flex items-center gap-3"
      >
        <span class="font-heading text-[32px] font-bold text-on-amber">{{ stat.num }}</span>
        <span class="font-body text-[13px] font-medium" style="color: rgba(13,24,41,0.67)">{{ stat.lbl }}</span>
      </div>
    </section>

    <!-- About Section -->
    <section class="w-full bg-raised flex">
      <!-- Left -->
      <div class="w-[640px] flex flex-col gap-6 py-[72px] px-20">
        <p class="font-body text-[11px] font-bold text-amber tracking-[3px] uppercase">WHO WE ARE</p>
        <h2 class="font-heading text-[44px] font-bold text-primary leading-[1.15]">
          Not just a room.<br>A community.
        </h2>
        <p class="font-body text-[15px] font-normal text-secondary leading-[1.75]" style="max-width: 480px">
          Upper Room is built for international residents who want more than four walls. We host weekly dinners, language exchanges, hikes, and cultural events — because the best part of living abroad is the people you meet.
        </p>
        <div class="flex gap-8 mt-2">
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
      <div class="flex-1 relative overflow-hidden" style="height: 480px">
        <img
          src="https://images.unsplash.com/photo-1714978444624-1fcb0c550a72?w=900&q=80"
          alt="Community"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div
          class="absolute inset-0"
          style="background: linear-gradient(270deg, rgba(13,24,41,0) 50%, rgba(13,24,41,0.73) 100%)"
        />
        <p
          class="absolute font-heading text-[22px] font-semibold text-primary"
          style="bottom: 48px; left: 48px; max-width: 500px"
        >
          "Best decision I made coming to Taiwan."
        </p>
      </div>
    </section>

    <!-- Rooms Preview -->
    <section class="w-full bg-base py-16 px-20 flex flex-col gap-10">
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <p class="font-body text-[11px] font-bold text-amber tracking-[3px] uppercase">FIND YOUR SPACE</p>
          <h2 class="font-heading text-[40px] font-bold text-primary">Choose Your Room</h2>
        </div>
        <NuxtLink
          to="/rooms"
          class="font-body text-sm font-semibold text-amber border border-amber rounded-[10px] py-[11px] px-[22px] hover:bg-amber/10 transition-colors"
        >
          All Rooms →
        </NuxtLink>
      </div>

      <div class="flex flex-col">
        <div
          v-for="room in previewRooms"
          :key="room.id"
          class="flex items-center gap-8 py-6 border-b border-subtle"
        >
          <img
            :src="room.previewImage"
            :alt="room.name"
            class="w-[200px] h-[130px] object-cover rounded-[10px] shrink-0"
          />
          <div class="flex-1 flex flex-col gap-2">
            <h3 class="font-heading text-[22px] font-bold text-primary">{{ room.name }}</h3>
            <p class="font-body text-[13px] font-normal text-muted">📍 {{ room.location }}</p>
            <p class="font-heading text-[20px] font-bold text-amber">{{ room.priceDisplay }}</p>
          </div>
          <div class="flex flex-col items-center gap-2.5">
            <span
              :class="room.status === 'available'
                ? 'bg-available-bg text-available'
                : 'bg-rented-bg text-rented'"
              class="font-body text-[11px] font-bold rounded-full py-1.5 px-[14px]"
            >
              {{ room.status === 'available' ? 'Available' : 'Rented' }}
            </span>
            <NuxtLink
              :to="`/rooms/${room.id}`"
              class="font-body text-[13px] font-semibold text-primary bg-card rounded-[10px] py-[10px] px-5 hover:bg-subtle transition-colors"
            >
              Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Events Preview -->
    <section class="w-full bg-raised py-16 px-20 flex flex-col gap-10">
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <p class="font-body text-[11px] font-bold text-coral tracking-[3px] uppercase">WHAT'S HAPPENING</p>
          <h2 class="font-heading text-[40px] font-bold text-primary">Join the Community</h2>
        </div>
        <NuxtLink
          to="/events"
          class="font-body text-sm font-semibold text-coral border border-coral rounded-[10px] py-[11px] px-[22px] hover:bg-coral/10 transition-colors"
        >
          All Events →
        </NuxtLink>
      </div>

      <div class="flex gap-5">
        <div
          v-for="evt in previewEvents"
          :key="evt.id"
          class="flex-1 bg-card rounded-[16px] overflow-hidden flex flex-col"
        >
          <div class="relative h-[160px] overflow-hidden">
            <img :src="evt.image" :alt="evt.name" class="absolute inset-0 w-full h-full object-cover" />
            <div
              class="absolute inset-0"
              style="background: linear-gradient(180deg, rgba(22,32,64,0) 0%, rgba(22,32,64,0.60) 100%)"
            />
            <div
              class="absolute top-4 left-4 bg-amber rounded-[10px] flex flex-col items-center py-2 px-[14px]"
            >
              <span class="font-heading text-[22px] font-bold text-on-amber leading-none">{{ evt.day }}</span>
              <span class="font-body text-[9px] font-bold text-on-amber">{{ evt.month }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-2 p-5 pb-6">
            <h3 class="font-heading text-[20px] font-bold text-primary">{{ evt.name }}</h3>
            <p class="font-body text-[13px] font-normal text-secondary leading-[1.6]">{{ evt.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="w-full bg-amber py-14 px-20 flex items-center justify-between">
      <div class="flex flex-col gap-2">
        <h2 class="font-heading text-[36px] font-bold text-on-amber">Ready to move in?</h2>
        <p class="font-body text-[15px] font-normal" style="color: rgba(13,24,41,0.67)">
          We reply within 24 hours. No commitment needed.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <a
          href="https://wa.me/"
          class="font-body text-sm font-bold text-primary bg-[#0D1829] rounded-full py-[13px] px-[22px] flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          WhatsApp
        </a>
        <a
          href="#"
          class="font-body text-sm font-bold text-primary rounded-full py-[13px] px-[22px] flex items-center gap-2 hover:opacity-80 transition-opacity"
          style="background: rgba(13,24,41,0.60)"
        >
          Line
        </a>
        <a
          href="mailto:hello@upperroom.co"
          class="font-body text-sm font-bold text-primary rounded-full py-[13px] px-[22px] flex items-center gap-2 hover:opacity-80 transition-opacity"
          style="background: rgba(13,24,41,0.40)"
        >
          Email
        </a>
      </div>
    </section>
  </main>
</template>
