import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { useAppAuth } from '~/store/auth'
import { useAppStore } from '~/store/app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const i18n: any = (nuxtApp as any).$i18n

  const appAuth = useAppAuth()
  const appStore = useAppStore()
  const branchCookie = useCookie<Branch | null>('selectedBranch')
  const storeId = computed(() => branchCookie.value?.id || null)
  const sessionToken = computed(() => appAuth.isLoggedIn)

  const router = useRouter()
  const guest_token = useCookie('user_guest_token')
  const localePath = useLocalePath()

  const api: AxiosInstance = axios.create({
    baseURL: config.public.baseURL,
    headers: {
      common: {
        'Accept-Language': i18n?.locale?.value || 'en',
        os: 'web',
        Accept: 'application/json',
      },
    },
  })

  api.interceptors.request.use(
    (req: AxiosRequestConfig & { headers?: any; params?: any } = {}) => {
      req.headers = req.headers || {}

      req.headers['Accept-Language'] = i18n?.locale?.value || 'en'

      if (sessionToken.value) {
        req.headers.Authorization = `Bearer ${sessionToken.value}`
      } else if (guest_token?.value) {
        req.params = {
          ...req.params,
          guest_token: guest_token.value,
        }
      }


      req.params = { ...(req.params || {}) }

      // Attach selected store id to every request when available so backend
      // receives the correct store context without requiring a full page reload.
      if (storeId.value) {
        req.params.store_id = req.params.store_id ?? storeId.value
      }
      const userDataLocal = appAuth.getUserData || appAuth.userData
      const rawUserLocation = useCookie('userLocation').value

      let userLocation: { lat?: number; lng?: number } | null = null
      if (rawUserLocation) {
        if (typeof rawUserLocation === 'string') {
          try {
            userLocation = JSON.parse(rawUserLocation)
          } catch (e) {
            userLocation = null
          }
        } else {
          userLocation = rawUserLocation
        }
      }

      if (userDataLocal) {
        const defaultAddressId = userDataLocal?.default_address?.id
        if (defaultAddressId) {
          req.params.address_id = req.params.address_id ?? defaultAddressId
        } else if (userLocation?.lat != null && userLocation?.lng != null) {
          req.params.lat = req.params.lat ?? userLocation.lat
          req.params.lng = req.params.lng ?? userLocation.lng
        }
      } else if (userLocation?.lat != null && userLocation?.lng != null) {
        req.params.lat = req.params.lat ?? userLocation.lat
        req.params.lng = req.params.lng ?? userLocation.lng
      }

      return req
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status
      if (status === 401) {
        appAuth.userData = null
        appAuth.token = null
        useCookie('session_user_token').value = null
        useCookie('session_user_data').value = null
        useCookie('user_guest_token').value = null
        router.push(localePath('/auth/login'))
        return Promise.reject({ statusCode: 401, message: 'Unauthorized' })
      }

      const message = error.response?.data?.message ?? 'Something went wrong'
      return Promise.reject({ statusCode: status ?? 500, message })
    }
  )

  return {
    provide: {
      axios: api,
      api: api,
      axiosToken: axios,
    },
  }
})
