import Toast, { type PluginOptions } from "vue-toastification"
import "vue-toastification/dist/index.css"

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false,
  }

  nuxtApp.vueApp.use(Toast, options)
})
