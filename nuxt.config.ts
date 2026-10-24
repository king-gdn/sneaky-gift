// https://nuxt.com/docs/api/configuration/nuxt-config
import {dark} from '@clerk/themes'

// Without Clerk keys, `nuxt dev` uses the fixture-user sign-in (modules/dev-auth) instead of Clerk.
const useDevAuth = process.env.NODE_ENV !== 'production' && !process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  // Nuxt Modules
  // https://nuxt.com/modules
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/ui',
    ...(useDevAuth ? [] : ['@clerk/nuxt']),
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@formkit/auto-animate/nuxt',
    '@pinia/colada-nuxt',
    'nuxt-og-image',
    '@nuxtjs/mdc'
  ],
  clerk: {
    appearance: {
      baseTheme: dark
    }
  },
  fonts: {
    defaults: {
      weights: [200, 400],
      styles: ["normal"]
    },
    experimental: {
      processCSSVariables: true,
    },
  },
  routeRules: {
    '/create/**': {ssr: false},
    '/lists/**': {ssr: false},
  },

  hub: {
    database: true,
    kv: true,
    cache: true,
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: false
    }
  },
  // Development
  devtools: {enabled: true},
})