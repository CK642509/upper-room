export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Upper Room',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' },
      ],
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sanity', '@nuxt/scripts'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },
  // Sanity connection. Driven by env vars so the same build can point at the
  // local/test dataset (development) or the live one (production).
  // See .env.example. Defaults below are the dev-friendly values.
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || 'k6yyg6ms',
    dataset: process.env.SANITY_DATASET || 'development',
    apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
    // CDN = cached & fast (use in production); off = always fresh (use in dev).
    useCdn: process.env.SANITY_USE_CDN === 'true',
    // Public site reads published content only. (The module defaults to `raw`,
    // which exposes drafts and requires a token — wrong for a token-less
    // public frontend, and would return draft+published duplicates.)
    perspective: 'published',
  },
  scripts: {
    registry: {
      vercelAnalytics: {
        trigger: 'onNuxtReady',
      }
    }
  }
})