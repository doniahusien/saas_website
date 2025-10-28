import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: 'https://saas.khlod.aait-d.com/Mac/api/app',
      general: "https://saas.khlod.aait-d.com/Mac/api"
    }
  },
  app: {
    head: {
      title: "SaaS",
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ]
    },
  },
  modules: ["@nuxt/image", "@nuxt/ui", [
    '@vee-validate/nuxt',
    {
      autoImports: true,

      componentNames: {
        Form: 'VeeForm',
        Field: 'VeeField',
        FieldArray: 'VeeFieldArray',
        ErrorMessage: 'VeeErrorMessage',
      },
    },
  ], [
      "@nuxtjs/i18n",
      {
        defaultLocale: "en",
        langDir: "locales",
        lazy: false,
        locales: [
          { code: "en", file: "en.json", dir: "ltr", name: "English" },
          { code: "ar", file: "ar.json", dir: "rtl", name: "عربي" },
        ],
        detectBrowserLanguage: false,
      },
    ], "@pinia/nuxt"],
    pinia: {
    autoImports: ['defineStore', 'storeToRefs'], },
  css: ["@/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});