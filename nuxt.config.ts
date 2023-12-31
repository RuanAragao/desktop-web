// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-vitest',
    '@nuxtjs/stylelint-module',
  ],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  routeRules: {
    '/**': {
      prerender: true,
      ssr: true,
    },
  },
})
