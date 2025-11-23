
import { useLazyFetch } from "#app"
type useLazyFetchType = typeof useLazyFetch
export const useAPILazyFetch: useLazyFetchType = (path, options = {}) => {
    const config = useRuntimeConfig()

    const i18n = useI18n()
    options.baseURL = config.public.baseURL
    options.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': i18n.locale.value,
    }


    return useLazyFetch(path, options)
}