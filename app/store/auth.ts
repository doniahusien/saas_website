import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useAppAuth = defineStore('authStore', {
  state: () => ({
    token: useCookie<string | null>('jwt_token_saas').value || null,
    userData: useCookie<any | null>('saas_user_data').value || null,
    tempVerifyData: null,
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
    async signup(payload) {
      const { $api } = useNuxtApp();
      const toast = useToast();
      const router = useRouter();

      try {
        const { data } = await $api.post('/auth/register', {
          full_name: payload.name,
          email: payload.email,
          phone_code: payload.phone_code,
          phone: payload.phone,
          password: payload.password,
          password_confirmation: payload.password,
          device_type: payload.device_type || 'web',
          device_token: payload.device_token || '123456',
        }, {
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Signup Response:', data);

        if (data && data.data === null) {
          this.tempVerifyData = {
            phone_code: payload.phone_code,
            phone: payload.phone,
          };

          toast.success('Successfully registered. Please activate your account.');
          router.push('/auth/verify');
        } else {
          toast.error('Registration failed. Please try again.');
        }

      } catch (error: any) {
        console.error('Signup Error:', error);
        toast.error(error.response?.data?.message || 'Signup failed');
        throw error;
      }
    },
    async verifyPhone(payload) {
      const { $api } = useNuxtApp()
      const toast = useToast()
      const router = useRouter()

      try {
        const { data } = await $api.post("/auth/verify_phone", {
          phone_code: payload.phone_code,
          phone: payload.phone,
          verification_code: payload.verification_code,
          device_type: "web",
        })

        if (data.status === "success") {
          this.setAuthData(data.data)
          toast.success(data.message || "Account verified successfully")
          router.push("/")
        } else {
          toast.error(data.message || "Verification failed")
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Verification failed")
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
