// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Activation des modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  // Configuration de l'application
  app: {
    head: {
      title: 'Pepeline - Prédiction de Satisfaction Passager',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Prédiction de satisfaction passager avec interface iOS-like' },
        { name: 'theme-color', content: '#000000' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    // Configuration des transitions de page
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },

  // Configuration des imports automatiques
  imports: {
    dirs: ['stores', 'composables', 'utils']
  },

  // Configuration des composants auto-importés
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['.vue'],
      ignore: ['**/*.spec.*', '**/*.test.*']
    }
  ],

  // Configuration de TypeScript
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },

  // Configuration du développement
  devtools: { enabled: true },

  // Configuration de la compatibilité
  experimental: {
    payloadExtraction: false,
    componentIslands: true,
    viewTransition: true
  },

  // Configuration du cache et des performances
  nitro: {
    routeRules: {
      '/**': { 
        cache: { 
          maxAge: 60 * 60,
          staleMaxAge: 60 * 60,
          headersOnly: true
        }
      }
    },
    compressPublicAssets: true,
    minify: true
  },

  // Configuration de Vite
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue': ['vue'],
            'pinia': ['pinia']
          }
        }
      }
    },
    server: {
      hmr: {
        overlay: true,
        protocol: 'ws',
        timeout: 30000
      }
    }
  },

  compatibilityDate: '2025-01-11'
})