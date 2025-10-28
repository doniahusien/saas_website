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
    console.log(req)
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
