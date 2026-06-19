<script setup lang="ts">
const mobileMenuOpen = ref(false)

const navLinks = [
  { to: '/rooms', label: 'Rooms' },
  { to: '/events', label: 'Events' },
  { to: '#contact', label: 'Contact' },
]

function closeMenu() {
  mobileMenuOpen.value = false
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
