import { useAppAuth } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAppAuth()
  const publicPaths = [
    '/auth/login',
    '/auth/signup',
    '/auth/verify',
    '/auth/forgot-password',
    '/auth/change-pass',
    '/', 
  ]

  const pathWithoutLocale = to.path.replace(/^\/(ar|en)(?=\/|$)/, '')

  const isPublic = publicPaths.some((path) =>
    pathWithoutLocale.startsWith(path)
  )

  if (!auth.isLoggedIn && !isPublic) {
    return navigateTo('/auth/login')
  }

  if (auth.isLoggedIn && isPublic) {
    return navigateTo('/')
  }
})
