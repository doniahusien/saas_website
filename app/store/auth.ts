import { defineStore } from 'pinia'

export const useAppAuth = defineStore('authStore', {
  state: () => ({
    token: useCookie<string | null>('jwt_token_saas').value || null,
    userData: useCookie<any | null>('saas_user_data').value || null,
    tempVerifyData: useCookie<any | null>('saas_temp_verify').value || null, // Ensure correct cookie name
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserData: (state) => state.userData,
  },

  actions: {
    setTempVerifyData(data) {
      this.tempVerifyData = data; 
      useCookie("saas_temp_verify").value = data; // Use consistent cookie name
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
});
