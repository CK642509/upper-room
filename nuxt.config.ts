export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      // Page titles come from each page's useSeoMeta + the titleTemplate in
      // app.vue — don't set a static `title` here or it feeds the template
      // and doubles up ("Upper Room · Upper Room").
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' },
      ],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sanity',
    '@nuxt/scripts',
    '@nuxtjs/sitemap',
    // Auto-generates robots.txt from site config: the Sitemap line is derived
    // from `site.url` (so it follows NUXT_PUBLIC_SITE_URL per environment), and
    // non-production deploys are set noindex automatically. Replaces the old
    // static public/robots.txt which hard-coded the production host.
    '@nuxtjs/robots',
  ],
  // Canonical site identity, used by the sitemap module (absolute URLs) and
  // overridable per-environment via NUXT_PUBLIC_SITE_URL (e.g. previews).
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.upperroom.tw',
    name: 'Upper Room Taipei Housing',
  },
  runtimeConfig: {
    public: {
      // Mirrors site.url for app code (canonical/og:url in app.vue); the
      // NUXT_PUBLIC_SITE_URL env var overrides it at runtime by convention.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.upperroom.tw',
      // Google Maps JS API key for the room-detail area map (loaded via the
      // @nuxt/scripts googleMaps registry). Public by design — Maps JS keys
      // are always visible client-side; the key's HTTP-referrer restriction
      // is the abuse control. Empty = the map section renders a placeholder.
      googleMapsKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_KEY || '',
    },
  },
  // Static routes (/, /rooms, /events) are picked up automatically from
  // `pages/`; the dynamic Sanity-backed routes come from this endpoint.
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
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
      },
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@sanity/client',
        '@sanity/image-url',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },
})