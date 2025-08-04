import axios from 'axios'
import { useUserStore } from '@entities'

export const apiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
})

apiService.interceptors.request.use(config => {
  const userStore = useUserStore()
  if (userStore.isAuthenticated) {
    config.headers.Authorization = `Bearer ${userStore.user?.token}`
  }

  return config
})
