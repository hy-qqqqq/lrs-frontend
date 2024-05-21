import { defineStore } from 'pinia'
import { useSessionStorage } from '@vueuse/core'
import { dataTypes } from '@/components/data/order.spec'

export const useUserStore = defineStore('user', () => {
  const user = useSessionStorage('user', {})

  function setUser(data) {
    const dep = data.dep in dataTypes['lab'] ? dataTypes['lab'][data.dep] : data.dep
    user.value = {
      id: data.userID,
      dep: dep,
    }
  }

  function clearUser() {
    user.value = {}
  }

  return { user, setUser, clearUser }
})