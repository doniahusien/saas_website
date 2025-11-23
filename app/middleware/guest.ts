
export default defineNuxtRouteMiddleware(async (to, from) => {
  const token: any = useCookie('session_user_token')

  if (token.value) {

    return navigateTo('/')
  }
})
