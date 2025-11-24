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
 /*  const sessionToken = computed(() => appAuth.isLoggedIn) */

  const router = useRouter()
  const sessionToken = useCookie<string | null>('jwt_token_saas')
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
  (req: AxiosRequestConfig & { headers?: any; params?: any; skipLocation?: boolean } = {}) => {
    req.headers = req.headers || {}
    req.params = req.params || {}

    req.headers['Accept-Language'] = i18n?.locale?.value || 'en'

    if (sessionToken.value) {
      req.headers.Authorization = `Bearer ${sessionToken.value}`
    } else if (guest_token?.value) {
      req.params.guest_token = req.params.guest_token ?? guest_token.value
    }

    if (req.skipLocation) {
      return req
    }
    const userDataLocal = appAuth.getUserData || appAuth.userData
    const rawUserLocation = useCookie('userLocation').value

    let userLocation: { lat?: number; lng?: number } | null = null
    if (rawUserLocation) {
      try {
        userLocation =
          typeof rawUserLocation === 'string'
            ? JSON.parse(rawUserLocation)
            : rawUserLocation
      } catch {
        userLocation = null
      }
    }

    if (userDataLocal?.default_address?.id) {
      req.params.address_id = req.params.address_id ?? userDataLocal.default_address.id
    } else if (userLocation?.lat && userLocation?.lng) {
      req.params.lat = req.params.lat ?? userLocation.lat
      req.params.lng = req.params.lng ?? userLocation.lng
    }

    return req
  }
)


  api.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error?.status
      if (status === 401) {
        appAuth.userData = null
        appAuth.token = null
        useCookie('session_user_token').value = null
        useCookie('session_user_data').value = null
        useCookie('user_guest_token').value = null
        router.push(localePath('/auth/login'))
        return Promise.reject({ statusCode: 401, message: 'Unauthorized' })
      }

      const message = error?.message ?? 'Something went wrong'
     /*  return Promise.reject({ statusCode: status ?? 500, message }) */
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
