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
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    configPath: 'tailwind.config.ts',
  }
})
