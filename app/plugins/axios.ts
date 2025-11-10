import axios, { type AxiosInstance } from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api: AxiosInstance = axios.create({
    baseURL: config.public.baseURL,
    headers: { Accept: 'application/json' },
  })

  api.interceptors.request.use((req) => {
    const token = useCookie<string | null>('jwt_token_saas').value
    if (token) req.headers.Authorization = `Bearer ${token}`

    const i18n = nuxtApp.$i18n

    const locale = typeof i18n?.locale === 'string' ? i18n.locale : i18n?.locale?.value

    req.headers['Accept-Language'] = locale || 'en' 

    return req
  })

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status ?? 500
      const message = error.response?.data?.message ?? 'Something went wrong'
      return Promise.reject({ statusCode: status, message })
    }
  )

  nuxtApp.provide('api', api)
})
