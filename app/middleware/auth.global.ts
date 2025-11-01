import { useAppAuth } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAppAuth();
  const localePath = useLocalePath()
  const publicPaths = [
    '/auth/login',
    '/auth/signup',
    '/auth/verify',
    '/auth/forgot-pass',
    '/auth/change-pass',
  ]

  const pathWithoutLocale = to.path.replace(/^\/(ar|en)(?=\/|$)/, '')

  const isPublic = publicPaths.some((path) =>
    pathWithoutLocale.startsWith(path)
  )

  if (!auth.isLoggedIn && !isPublic) {
    return navigateTo(localePath('/auth/login'))
  }

  if (auth.isLoggedIn && isPublic) {
    return navigateTo(localePath('/'))
  }
})
