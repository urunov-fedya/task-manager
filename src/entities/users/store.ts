import { defineStore } from 'pinia'
import type { User } from './types'

type State = {
  user: User | null
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      user: null,
    }
  },
  actions: {
    setUser(user: State['user']) {
      this.user = user
    },
  },
  getters: {
    isAuthenticated: state => state.user !== null,
  },
  persist: true,
})
