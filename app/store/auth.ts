import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useAppAuth = defineStore('authStore', {
  state: () => ({
    token: useCookie<string | null>('jwt_token_saas').value || null,
    userData: useCookie<any | null>('saas_user_data').value || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserData: (state) => state.userData,
  },

  actions: {
    async login(payload) {
      const { $api } = useNuxtApp()
      const toast = useToast()
      const router = useRouter()

      try {
        const { data } = await $api.post('/auth/login', payload, {
          headers: { 'Content-Type': 'application/json' },
        })

        const user = data.data
        this.setAuthData(user)

        toast.success(data.message || 'Login successful')
        router.push('/')
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Login failed')
        throw error
      }
    },

    setAuthData(user) {
      this.token = user.token
      this.userData = user
      useCookie('jwt_token_saas').value = user.token
      useCookie('saas_user_data').value = user
    },

    clearAuthData() {
      this.token = null
      this.userData = null
      useCookie('jwt_token_saas').value = null
      useCookie('saas_user_data').value = null
      setTimeout(() => reloadNuxtApp(), 300)
    },
  },
})
