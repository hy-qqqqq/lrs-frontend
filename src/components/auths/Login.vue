<script setup>
// Utilities
import { ref } from 'vue'
import { loginUser } from '@/utils/service'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
// Variables
const data = ref({
  userID: '',
  userPassword: ''
})
const store = useUserStore()
const router = useRouter()
// Functions
const handleLogin = async () => {
  loginUser(data.value)
    .then((res) => {
      store.setUser(res.data)
      sessionStorage.setItem('token', res.data.access_token)
      alert('Login successful!')
      router.push({ path: '/order' })
    })
    .catch((err) => {
      console.error(err);
      alert('Invalid user ID or password.')
    })
  data.value = {}
}
const toRegister = () => {
  router.push({ path: '/register' })
}

</script>

<template>
  <div class="h-screen grid grid-cols-2 justify-items-center items-center">
    <div class="flex flex-row gap-8 items-center">
      <img alt="Vue logo" class="logo" src="../../assets/logo.svg" width="125" height="125" />
      <div>
        <h1 class="green">Lab Requirements Management</h1>
        <h3>
          <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a> +
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind CSS</a>.
        </h3>
      </div>
    </div>
    <div class="login-container">
      <p class="login-title">Login</p>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">User ID:</label>
          <input type="text" id="username" v-model="data.userID" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="data.userPassword" required>
        </div>
        <button type="submit" class="login-button">Log In</button>
        <button type="button" @click="toRegister" class="register-button">Register</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/login.css';
</style>
