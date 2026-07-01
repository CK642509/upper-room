<script setup lang="ts">
const route = useRoute()
const locationSlug = route.params.location as string

const {data: location} = await useLocation(locationSlug)
if (!location.value) {
  throw createError({ statusCode: 404, message: 'Location not found' })
}

const {data: roomsData} = await useRoomsByLocation(locationSlug)
const urlFor = useSanityImageUrl()

// Date range filter (YYYY-MM-DD strings from native date inputs).
const from = ref('')
const to = ref('')
function clearDates() {
  from.value = ''
  to.value = ''
}
const filtering = computed(() => Boolean(from.value && to.value))

const rooms = computed(() => roomsData.value ?? [])
const visibleRooms = computed(() =>
  rooms.value.filter((room) => isRoomFreeForRange(room, from.value, to.value)),
)
</script>

<template>
  <main v-if="location">
    <!-- Location Header -->
    <section class="relative overflow-hidden h-[260px] lg:h-[340px]">
      <img
        :src="urlFor(location.image).width(1600).height(680).fit('crop').auto('format').url()"
        :alt="location.image.alt || location.name"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(13,24,41,0.55) 0%, rgba(13,24,41,0.92) 100%)"
      />
      <!-- Back link -->
      <NuxtLink
        to="/rooms"
        class="absolute top-6 left-5 lg:left-20 z-20 font-body text-[13px] font-semibold text-primary bg-[rgba(13,24,41,0.60)] rounded-full py-2 px-4 flex items-center gap-1.5 hover:bg-[rgba(13,24,41,0.80)] transition-colors"
      >
        ← All Areas
      </NuxtLink>
      <div class="relative z-10 h-full flex flex-col justify-end px-5 lg:px-20 pb-7 lg:pb-10 gap-2">
        <p class="font-body text-[11px] font-bold text-amber tracking-[3px] uppercase">ROOMS</p>
        <h1 class="font-heading text-[40px] lg:text-[56px] font-bold text-primary">{{ location.name }}</h1>
        <p v-if="location.tagline" class="font-body text-[15px] font-normal text-secondary">
          {{ location.tagline }}
        </p>
      </div>
    </section>

    <!-- Date Filter -->
    <section class="w-full bg-raised border-b border-subtle px-5 lg:px-20 py-5 lg:py-6">
      <div class="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">
        <div class="flex flex-col gap-1.5">
          <label class="font-body text-[11px] font-bold text-muted tracking-[2px] uppercase">Move in</label>
          <input
            v-model="from"
            type="date"
            :max="to || undefined"
            class="font-body text-sm text-primary bg-card border border-subtle rounded-[10px] py-2.5 px-3.5 focus:outline-none focus:border-amber [color-scheme:dark]"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="font-body text-[11px] font-bold text-muted tracking-[2px] uppercase">Move out</label>
          <input
            v-model="to"
            type="date"
            :min="from || undefined"
            class="font-body text-sm text-primary bg-card border border-subtle rounded-[10px] py-2.5 px-3.5 focus:outline-none focus:border-amber [color-scheme:dark]"
          />
        </div>
        <button
          v-if="filtering"
          type="button"
          class="font-body text-[13px] font-semibold text-amber border border-amber rounded-[10px] py-2.5 px-5 hover:bg-amber/10 transition-colors w-full lg:w-auto"
          @click="clearDates"
        >
          Clear dates
        </button>
        <p v-if="filtering" class="font-body text-[13px] text-muted lg:ml-auto self-center">
          {{ visibleRooms.length }} of {{ rooms.length }} rooms available
        </p>
      </div>
    </section>

    <!-- Rooms List -->
    <section class="w-full bg-base py-9 lg:py-12 px-5 lg:px-20 flex flex-col gap-5 lg:gap-0">
      <div
        v-for="room in visibleRooms"
        :key="room._id"
        class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7 lg:py-7 lg:border-b lg:border-subtle"
      >
        <img
          :src="urlFor(room.mainImage).width(480).height(312).fit('crop').auto('format').url()"
          :alt="room.mainImage.alt || room.title"
          class="w-full lg:w-[240px] h-[200px] lg:h-[156px] object-cover rounded-[10px] shrink-0"
        />
        <div class="flex-1 flex flex-col gap-2">
          <h3 class="font-heading text-[24px] font-bold text-primary">{{ room.title }}</h3>
          <p class="font-body text-[13px] font-normal text-muted">📍 {{ roomLocationShort(room) }}</p>
          <p class="font-body text-sm font-normal text-secondary leading-[1.6]">{{ room.description }}</p>
          <div class="flex items-center gap-3 mt-1">
            <span class="font-heading text-[22px] font-bold text-amber">{{ roomPriceDisplay(room.price) }}</span>
          </div>
        </div>
        <NuxtLink
          :to="`/rooms/${location.slug}/${room.slug}`"
          class="font-body text-[13px] font-bold rounded-[10px] py-[13px] px-6 shrink-0 text-center w-full lg:w-auto bg-amber text-on-amber hover:opacity-90 transition-opacity"
        >
          View Room
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <p v-if="!visibleRooms.length" class="font-body text-[15px] text-muted py-10 text-center">
        <template v-if="filtering">No rooms available for these dates. Try a different range.</template>
        <template v-else>No rooms in this area yet.</template>
      </p>
    </section>
  </main>
</template>
