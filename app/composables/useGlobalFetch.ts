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

  const method = (options.method || 'GET').toString().toUpperCase()

  try {
    return await $fetch<T>(url, {
      baseURL: config.public.baseURL,
      method,
      ...(options.body && { body: options.body }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale.value||'en',
        ...options.headers,
      },
      ...(options.params && { params: options.params }),
    })
  } catch (error: any) {
    console.error(error)
    throw error
  }
}
