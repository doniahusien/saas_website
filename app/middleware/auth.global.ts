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
  const protectedPaths = [
    '/checkout',
  ]

  const pathWithoutLocale = to.path.replace(/^\/(ar|en)(?=\/|$)/, '')

  const isPublic = publicPaths.some((path) => pathWithoutLocale.startsWith(path))
  const isProtected = protectedPaths.some((path) => pathWithoutLocale.startsWith(path))

  if (isProtected && !auth.isLoggedIn) {
    return navigateTo(localePath('/auth/login'))
  }

  if (auth.isLoggedIn && isPublic) {
    return navigateTo(localePath('/'))
  }

    if (['/auth/verify', '/auth/change-pass'].includes(to.path)) {
      const { tempVerifyData } = auth; 
    if (!tempVerifyData || !tempVerifyData.phone) {
      return navigateTo(localePath('/auth/login')); 
    }
  }
})
