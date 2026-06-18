<script setup lang="ts">
import { rooms } from '~/composables/useData'
</script>

<template>
  <main>
    <!-- Page Header -->
    <section class="relative overflow-hidden h-[200px] lg:h-[220px]">
      <img
        src="https://images.unsplash.com/photo-1595139367629-c4601c4ffe06?w=1440&q=80"
        alt="Rooms"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(13,24,41,0.93) 0%, rgba(13,24,41,0.80) 100%)"
      />
      <div class="relative z-10 h-full flex flex-col justify-center px-5 lg:px-0 lg:pl-20 gap-2">
        <p class="font-body text-[11px] font-bold text-amber tracking-[3px] uppercase">ROOMS</p>
        <h1 class="font-heading text-[40px] lg:text-[52px] font-bold text-primary">Find Your Space</h1>
        <p class="font-body text-[15px] font-normal text-secondary">
          Fully furnished rooms for expats in Taipei — all bills included.
        </p>
      </div>
    </section>

    <!-- Rooms Grid -->
    <section class="w-full bg-base py-9 lg:py-12 px-5 lg:px-20 flex flex-col gap-5 lg:gap-0">
      <div
        v-for="room in rooms"
        :key="room.id"
        class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7 lg:py-7 lg:border-b lg:border-subtle"
      >
        <img
          :src="room.listImage"
          :alt="room.name"
          class="w-full lg:w-[240px] h-[200px] lg:h-[156px] object-cover rounded-[10px] shrink-0"
        />
        <div class="flex-1 flex flex-col gap-2">
          <h3 class="font-heading text-[24px] font-bold text-primary">{{ room.name }}</h3>
          <p class="font-body text-[13px] font-normal text-muted">📍 {{ room.location }}</p>
          <p class="font-body text-sm font-normal text-secondary leading-[1.6]">{{ room.description }}</p>
          <div class="flex items-center gap-3 mt-1">
            <span class="font-heading text-[22px] font-bold text-amber">{{ room.priceDisplay }}</span>
            <span
              :class="room.status === 'available'
                ? 'bg-available-bg text-available'
                : 'bg-rented-bg text-rented'"
              class="font-body text-[11px] font-bold rounded-full py-1 px-3"
            >
              {{ room.status === 'available' ? 'Available' : 'Rented' }}
            </span>
          </div>
        </div>
        <NuxtLink
          :to="`/rooms/${room.id}`"
          :class="room.status === 'available'
            ? 'bg-amber text-on-amber hover:opacity-90'
            : 'bg-card text-muted hover:bg-subtle'"
          class="font-body text-[13px] font-bold rounded-[10px] py-[13px] px-6 shrink-0 text-center w-full lg:w-auto transition-all"
        >
          View Room
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
