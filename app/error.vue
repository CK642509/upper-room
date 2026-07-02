<script setup lang="ts">
import type {NuxtError} from '#app'

// Rendered in place of the whole app when an error escapes (404s thrown by
// the detail pages, 500s, etc.). Kept self-contained — no <AppNavbar> or
// <AppFooter>, because the navbar fetches from Sanity and a Sanity outage is
// exactly one of the errors that lands here.
const props = defineProps<{error: NuxtError}>()

const is404 = computed(() => props.error.statusCode === 404)
const title = computed(() => (is404.value ? 'Page not found' : 'Something went wrong'))

useSeoMeta({title: () => `${props.error.statusCode} — ${title.value}`})

// Navigation must go through clearError so the error state is reset;
// a plain NuxtLink would leave the app stuck on the error page.
function goTo(path: string) {
  clearError({redirect: path})
}
</script>

<template>
  <div class="min-h-screen bg-base text-primary font-body flex flex-col">
    <!-- Slim standalone header -->
    <header class="w-full h-16 md:h-[72px] px-5 lg:px-16 flex items-center">
      <button type="button" class="flex items-center gap-2 lg:gap-[10px]" @click="goTo('/')">
        <img src="/logo.jpg" alt="Upper Room Taipei Housing" class="w-9 h-9 md:w-12 md:h-12 rounded-md object-cover shrink-0" />
        <span class="font-heading text-base md:text-xl font-bold text-primary">Upper Room Taipei Housing</span>
      </button>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center text-center gap-5 px-5 py-16">
      <p class="font-heading text-[80px] lg:text-[120px] font-bold text-amber leading-none">{{ error.statusCode }}</p>
      <h1 class="font-heading text-[32px] lg:text-[44px] font-bold text-primary">{{ title }}</h1>
      <p class="font-body text-[15px] font-normal text-secondary max-w-[440px] leading-[1.6]">
        <template v-if="is404">
          The page you're looking for doesn't exist or may have moved. Let's get you back somewhere cosy.
        </template>
        <template v-else>
          An unexpected error occurred. Try again in a moment, or head back to the homepage.
        </template>
      </p>
      <div class="flex flex-col md:flex-row items-center gap-3 md:gap-4 mt-2 w-full md:w-auto">
        <button
          type="button"
          class="font-body text-[15px] font-bold text-on-amber bg-amber rounded-full py-[14px] px-[30px] text-center w-full md:w-auto hover:opacity-90 transition-opacity"
          @click="goTo('/')"
        >
          Back to Home
        </button>
        <button
          type="button"
          class="font-body text-[15px] font-medium text-primary border border-primary/60 rounded-full py-[14px] px-[30px] text-center w-full md:w-auto hover:border-primary transition-colors"
          @click="goTo('/rooms')"
        >
          Browse Rooms →
        </button>
      </div>
    </main>
  </div>
</template>
