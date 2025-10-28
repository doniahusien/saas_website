/* import { defineStore } from "pinia";

export const useAppAuth = defineStore("authStore", {
  state: (): AuthStore => ({
    token: useCookie<string | null>("jwt_token_almotamyiz").value || null,
    userData: useCookie<User | null>("almotamayiz_user_data").value || null,
    session_id: useCookie<string | null>("session_id").value || null,
  }),
  getters: {
    isLoggedIn: (state) => state.token,
    getUserData: (state) => state.userData,
  },
  actions: {
    async getProfile() {
      if (this.token) {
        const axios = useNuxtApp().$axios;
        await axios.get("profile").then((res) => {
          this.userData = res.data.data;
          useCookie("almotamayiz_user_data").value = res.data.data;
        });
      }
    },
    async logout() {
      if (this.token) {
        const axios = useNuxtApp().$axios;
        axios
          .post("logout", {
            device_type: "web",
          })
          .then(() => {
            this.token = null;
            this.userData = null;
            useCookie("jwt_token_almotamyiz").value = null;
            useCookie("almotamayiz_user_data").value = null;
            useCookie("user_guest_token").value = null;
            setTimeout(() => reloadNuxtApp(), 200);
          })
          .catch(() => {
            this.token = null;
            this.userData = null;
            useCookie("jwt_token_almotamyiz").value = null;
            useCookie("almotamayiz_user_data").value = null;
            useCookie("user_guest_token").value = null;
            setTimeout(() => reloadNuxtApp(), 400);
          });
      }
    },
  },
});
 */