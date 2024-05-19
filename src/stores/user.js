import { ref } from 'vue'
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref({})

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