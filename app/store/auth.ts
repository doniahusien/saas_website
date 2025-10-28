import { defineStore } from 'pinia'

export const useAppAuth = defineStore('authStore', {
  state: (): AuthStore => ({
    token: useCookie<string | null>('jwt_token_saas').value || null,
    userData: useCookie<User | null>('saas_user_data').value || null,
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.token,
    getUserData: (state): User | null => state.userData,
  },

  actions: {
    async login(payload: { phone: string; password: string }) {
      const { $api } = useNuxtApp()
      const toast = useToast()
      const router = useRouter()

      try {
        const { data } = await $api.post('/auth/login', payload)
        const user = data.data

        this.setAuthData(user)
        toast.success(data.message)
        router.push('/')
      } catch (error: any) {
        toast.error(error.message || 'Login failed')
      }
    },

    async logout() {
      const { $api } = useNuxtApp()
      try {
        await $api.post('/logout', {
          device_type: 'web',
          device_token: '12345',
        })
      } catch (err) {
        console.error('Logout failed', err)
      } finally {
        this.clearAuthData()
      }
    },

    clearAuthData() {
      this.token = null
      this.userData = null
      useCookie('jwt_token_saas').value = null
      useCookie('saas_user_data').value = null
      useCookie('user_guest_token').value = null
      setTimeout(() => reloadNuxtApp(), 300)
    },

    setAuthData(user: User) {
      this.token = user.token
      this.userData = user
      useCookie('jwt_token_saas').value = user.token
      useCookie('saas_user_data').value = user
    },
  },
})
