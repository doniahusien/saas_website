import { defineStore } from 'pinia'

export const useAppAuth = defineStore('authStore', {
  state: () => ({
    guest_token: useCookie<string | null>('user_guest_token').value || null,
    token: useCookie<string | null>('jwt_token_saas').value || null,
    userData: useCookie<any | null>('saas_user_data').value || null,
    tempVerifyData: useCookie<any | null>('saas_temp_verify').value || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserData: (state) => state.userData,
  },

  actions: {
    async getProfile() {
      const { $api } = useNuxtApp();
      await $api.get("/profile").then((res) => {
        this.userData = res.data.data;
        useCookie("saas_user_data").value = res.data.data;
      });

    },
    setTempVerifyData(data) {
      this.tempVerifyData = data;
      useCookie("saas_temp_verify").value = data;
    },
    clearTempVerifyData() {
      this.tempVerifyData = null;
      useCookie('saas_temp_verify').value = null;
    },

    setAuthData(user) {
      this.token = user.token
      this.guest_token = null
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
      async logout() {

        const {$api} = useNuxtApp()
        $api.post('auth/logout').then(() => {
          this.token = null
          this.userData = null
          useCookie('jwt_token_saas').value = null
          useCookie('saas_user_data').value = null
          useCookie('user_guest_token').value = null
          setTimeout(() => reloadNuxtApp(), 200)


        }).catch(() => {
          this.token = null
          this.userData = null
          useCookie('jwt_token_saas').value = null
          useCookie('saas_user_data').value = null
          useCookie('user_guest_token').value = null
          setTimeout(() => reloadNuxtApp(), 400)
        })
      
    },
  },
});