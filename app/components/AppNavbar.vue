<template>
  <nav class="w-full h-[72px] bg-base px-16 flex items-center justify-between">
    <NuxtLink to="/" class="flex items-center gap-[10px]">
      <img src="/logo.jpg" alt="Upper Room" class="w-12 h-12 rounded-md object-cover" />
      <span class="font-heading text-xl font-bold text-primary">Upper Room</span>
    </NuxtLink>

    <div class="flex items-center gap-8">
      <NuxtLink
        to="/rooms"
        class="font-body text-sm font-medium text-secondary hover:text-primary transition-colors"
      >
        Rooms
      </NuxtLink>
      <NuxtLink
        to="/events"
        class="font-body text-sm font-medium text-secondary hover:text-primary transition-colors"
      >
        Events
      </NuxtLink>
      <NuxtLink
        to="#contact"
        class="font-body text-sm font-medium text-secondary hover:text-primary transition-colors"
      >
        Contact
      </NuxtLink>
    </div>

    <NuxtLink
      to="#contact"
      class="font-body text-sm font-bold text-on-amber bg-amber rounded-full py-[10px] px-[22px] hover:opacity-90 transition-opacity"
    >
      Get in Touch
    </NuxtLink>
  </nav>
</template>
