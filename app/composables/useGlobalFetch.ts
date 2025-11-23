import { useAppAuth } from "~/store/auth"
import { useAppStore } from '~/store/app'
export const useGlobalFetch = async <T = any>(
  url: string,
  options: {
    method?: string
    body?: any
    headers?: Record<string, string>
    params?: Record<string, any>
  } = {}
): Promise<T> => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  
    const appAuth = useAppAuth()
    const appStore = useAppStore()
    const sessionToken = computed(() => appAuth.token)
    const guest_token = useCookie('user_guest_token')

  const method = (options.method || 'GET').toString().toUpperCase()

  try {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': locale.value || 'en',
      'Os': 'web',
      ...options.headers
    }
    let params = options.params ? { ...options.params } : {}

    if (sessionToken.value) {
      headers.Authorization = `Bearer ${sessionToken.value}`
    } else if (guest_token?.value) {
      params.guest_token = guest_token.value
    }

    return await $fetch<T>(url, {
      baseURL: config.public.baseURL,
      method,
      ...(options.body && { body: options.body }),
      headers,
      ...(Object.keys(params).length > 0 && { params }),
    })
  } catch (error: any) {
    console.error(error)
    throw error
  }
}