// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.scss'],

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/sanity',
  ],
  sanity: {
    projectId: '4rbzhjxh',
    apiVersion: "2023-03-12"

  },
  experimental: {
    reactivityTransform: true
  }
})
