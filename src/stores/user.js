import { defineStore } from 'pinia'
import { useSessionStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const user = useSessionStorage('user', {})

  function setUser(userID, dep) {
    user.value = {
      id: userID,
      dep: dep
    }
  }

  function clearUser() {
    user.value = {}
  }

  return { user, setUser, clearUser }
})