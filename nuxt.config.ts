import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  runtimeConfig: {
    stripeSecretKey: 'sk_test_51OrGF4BO3llQvdTxi8RlyHg8DRfxvvdcrahIbNIVaLWiYTZEKAlgdh9USNXGL7tVDQmKEfcQKYGODY3lF5ic02vS00Cki4cs3Y',
    stripeWebhookSecret: 'pk_test_51OrGF4BO3llQvdTx1QDJhWmG0meW6KBFAGAI38EjCWoyMjxkC6J7DtjtAgwtwUGMuHkF6H1WhdNPutacMJ0pYKtf00ub04DpPU',

    public: {
      googleMapsApiKey: "AIzaSyA8qi0TK3EDod0LlTXbQFf_DyEptiGgPFU",
      baseURL: "https://saas.khlod.aait-d.com/front_brand/api/app/",
      general: "https://saas.khlod.aait-d.com/front_brand/api/",
    },
  },

  app: {
    head: {
            title: 'MEA TELECOM',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },

                {
                    name: 'robots',
                    content: `index,follow`,
                },
            ],
    },
  },

  modules: [
    'unplugin-icons/nuxt',
    'nuxt-swiper',
    "@nuxt/image",
    "@nuxt/ui",
    'nuxt-icon',
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        defaultLocale: "en",
        langDir: "locales",
        lazy: true,
        locales: [
          { code: "en", file: "en.json", dir: "ltr", name: "English" },
          { code: "ar", file: "ar.json", dir: "rtl", name: "عربي" },
        ],
        detectBrowserLanguage: false,
        strategy: "prefix_except_default",
        vueI18n: "./i18n.config.ts",

      },
    ],
    "@pinia/nuxt",
    "@stefanobartoletti/nuxt-social-share",
  ],
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  css: ["@/assets/css/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],

  vite: {
    plugins: [tailwindcss()],
  },
});
