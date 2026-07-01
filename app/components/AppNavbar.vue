<script setup lang="ts">
const mobileMenuOpen = ref(false)
const roomsMenuOpen = ref(false)
const roomsMenuRef = ref<HTMLElement | null>(null)
const roomsMenuButtonRef = ref<HTMLButtonElement | null>(null)

// Locations power the Rooms dropdown (desktop) and sub-links (mobile).
const {data: locationsData} = await useLocationsList()
const locations = computed(() => locationsData.value ?? [])

const navLinks = [
  { to: '/events', label: 'Events' },
  { to: '#contact', label: 'Contact' },
]

function closeMenu() {
  mobileMenuOpen.value = false
}

function openRoomsMenu() {
  roomsMenuOpen.value = true
}

function closeRoomsMenu(returnFocus = false) {
  roomsMenuOpen.value = false

  if (returnFocus) {
    roomsMenuButtonRef.value?.focus()
  }
}

function toggleRoomsMenu() {
  roomsMenuOpen.value = !roomsMenuOpen.value
}

function onRoomsMenuFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget

  if (!(nextTarget instanceof Node) || !roomsMenuRef.value?.contains(nextTarget)) {
    closeRoomsMenu()
  }
}
</script>

<template>
  <nav class="relative w-full h-16 md:h-[72px] bg-base px-5 lg:px-16 flex items-center justify-between">
    <NuxtLink to="/" class="flex items-center gap-2 lg:gap-[10px] min-w-0" @click="closeMenu">
      <img
        src="/logo.jpg"
        alt="Upper Room Taipei Housing"
        class="w-9 h-9 md:w-12 md:h-12 rounded-md object-cover shrink-0"
      />
      <span class="font-heading text-base md:text-xl font-bold text-primary truncate">Upper Room Taipei Housing</span>
    </NuxtLink>

    <!-- Desktop nav links -->
    <div class="hidden lg:flex items-center gap-8">
      <!-- Rooms with hover dropdown -->
      <div
        ref="roomsMenuRef"
        class="relative flex items-center gap-1"
        @mouseenter="openRoomsMenu"
        @mouseleave="closeRoomsMenu()"
        @focusin="openRoomsMenu"
        @focusout="onRoomsMenuFocusOut"
      >
        <NuxtLink
          to="/rooms"
          class="font-body text-sm font-medium text-secondary hover:text-primary transition-colors"
        >
          Rooms
        </NuxtLink>
        <button
          ref="roomsMenuButtonRef"
          id="rooms-menu-button"
          type="button"
          class="font-body text-sm font-medium text-secondary hover:text-primary transition-colors flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
          aria-label="Toggle room locations menu"
          aria-haspopup="true"
          :aria-expanded="roomsMenuOpen"
          aria-controls="rooms-menu"
          @click.stop="toggleRoomsMenu"
          @keydown.enter.prevent="toggleRoomsMenu"
          @keydown.space.prevent="toggleRoomsMenu"
          @keydown.esc.prevent="closeRoomsMenu(true)"
        >
          <span class="text-[10px] transition-transform" :class="roomsMenuOpen ? 'rotate-180' : ''">▾</span>
        </button>

        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div
            v-show="roomsMenuOpen"
            id="rooms-menu"
            class="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
            aria-labelledby="rooms-menu-button"
            :aria-hidden="!roomsMenuOpen"
            @keydown.esc.prevent="closeRoomsMenu(true)"
          >
            <div class="w-[240px] bg-raised border border-subtle rounded-[12px] shadow-lg shadow-black/30 p-2 flex flex-col">
              <NuxtLink
                v-for="location in locations"
                :key="location._id"
                :to="`/rooms/${location.slug}`"
                class="flex flex-col gap-0.5 rounded-[8px] px-3 py-2.5 hover:bg-card transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                <span class="font-body text-sm font-semibold text-primary">{{ location.name }}</span>
                <span v-if="location.tagline" class="font-body text-[12px] text-muted">{{ location.tagline }}</span>
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>

      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="font-body text-sm font-medium text-secondary hover:text-primary transition-colors"
      >
        {{ link.label }}
      </NuxtLink>
    </div>

    <!-- Desktop CTA -->
    <NuxtLink
      to="#contact"
      class="hidden lg:inline-block font-body text-sm font-bold text-on-amber bg-amber rounded-full py-[10px] px-[22px] hover:opacity-90 transition-opacity"
    >
      Get in Touch
    </NuxtLink>

    <!-- Mobile hamburger -->
    <button
      type="button"
      class="lg:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2 shrink-0"
      :aria-expanded="mobileMenuOpen"
      aria-label="Toggle menu"
      @click="mobileMenuOpen = !mobileMenuOpen"
    >
      <span
        class="block w-[22px] h-0.5 rounded-sm bg-primary transition-transform"
        :class="mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''"
      />
      <span
        class="block w-[22px] h-0.5 rounded-sm bg-primary transition-opacity"
        :class="mobileMenuOpen ? 'opacity-0' : ''"
      />
      <span
        class="block w-[22px] h-0.5 rounded-sm bg-primary transition-transform"
        :class="mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''"
      />
    </button>

    <!-- Mobile dropdown menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="mobileMenuOpen"
        class="lg:hidden absolute top-full left-0 z-50 w-full bg-base border-b border-subtle flex flex-col px-5 py-4 gap-1 shadow-lg shadow-black/30"
      >
        <!-- Rooms + location sub-links -->
        <NuxtLink
          to="/rooms"
          class="font-body text-base font-medium text-secondary hover:text-primary py-3 transition-colors"
          @click="closeMenu"
        >
          Rooms
        </NuxtLink>
        <NuxtLink
          v-for="location in locations"
          :key="location._id"
          :to="`/rooms/${location.slug}`"
          class="font-body text-sm font-normal text-muted hover:text-primary pl-4 py-2 transition-colors"
          @click="closeMenu"
        >
          {{ location.name }}
        </NuxtLink>

        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="font-body text-base font-medium text-secondary hover:text-primary py-3 transition-colors"
          @click="closeMenu"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="#contact"
          class="mt-2 font-body text-sm font-bold text-on-amber bg-amber rounded-full py-3 text-center hover:opacity-90 transition-opacity"
          @click="closeMenu"
        >
          Get in Touch
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>
