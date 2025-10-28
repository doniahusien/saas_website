import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.baseURL,
    headers: {
      Accept: 'application/json',
    },
  })

  api.interceptors.request.use((req) => {
    if (process.client) {
      const token = localStorage.getItem('token')
      if (token) req.headers.Authorization = `Bearer ${token}`
    }

/*     console.log(`[Axios Request] → ${req.method?.toUpperCase()} ${req.url}`)
 */    return req
  })

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status || 500
      const message = error.response?.data?.message || 'Something went wrong'
      return Promise.reject({ statusCode: status, message })
    }
  )

  nuxtApp.provide('api', api)
})
