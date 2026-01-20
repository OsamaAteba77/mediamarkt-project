 // https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-24', 
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  // --- NEW: THE DATA SOURCE SWITCH ---
  runtimeConfig: {
    public: {
       
      dataSource: 'FIREBASE' 
    }
  },
  // ----------------------------------

  components: [
    { path: '~/components/atoms', prefix: 'Atom' },
    { path: '~/components/molecules', prefix: 'Molecule' },
    { path: '~/components/organisms', prefix: 'Organism' },
    '~/components'
  ],

  typescript: {
    strict: true,
    typeCheck: false 
  }
})