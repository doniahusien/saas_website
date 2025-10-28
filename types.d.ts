import type { AxiosInstance } from 'axios'

interface Country {
  id: number
  name: string
  phone_code: string
  phone_limit: number
  flag: string
}

interface User {
  id: number
  full_name: string
  avatar: string
  email: string
  phone_code: string
  phone: string
  user_type: 'customer' | 'admin' | string
  notifiable: boolean
  token: string
  points: number
  wallet: number
  country: Country
  default_address: unknown | null
  tenant: string
}

interface AuthStore {
  token: string | null
  userData: User | null
}

declare module '#app' {
  interface NuxtApp {
    $api: AxiosInstance
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: AxiosInstance
  }
}

interface ApiResponse<T> {
  data: T
  status: string
  message: string
}
