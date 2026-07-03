<script setup lang="ts">
// Site-wide SEO defaults. Each page sets its own title/description/ogImage via
// useSeoMeta; the template below appends the brand. Canonical + og:url follow
// the route so shared/indexed links always point at the production URL.
const route = useRoute()
const siteUrl = useRuntimeConfig().public.siteUrl
const pageUrl = () => new URL(route.path, siteUrl).href

useHead({
  titleTemplate: (title) => (title ? `${title} · Upper Room` : 'Upper Room — Co-living in Taipei'),
  link: [{rel: 'canonical', href: pageUrl}],
})

useSeoMeta({
  ogSiteName: 'Upper Room Taipei Housing',
  ogType: 'website',
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
