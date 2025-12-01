import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import VueGoogleMaps from '@fawmi/vue-google-maps'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const key = config.public?.googleMapsApiKey || ''

  if (!key) {
    console.warn('[google-maps] googleMapsApiKey is empty — map will not load on client.')
    return
  }

  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key,
      libraries: 'places,marker',
      v: 'weekly'
    }
  })
})