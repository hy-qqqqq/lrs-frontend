import { defineStore } from 'pinia'
import { useSessionStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const user = useSessionStorage('user', {})

  function setUser(data) {
    user.value = {
      id: data.userID,
      dep: data.dep,
      token: data.access_token
    }
  }

  function clearUser() {
    user.value = {}
  }

  return { user, setUser, clearUser }
})