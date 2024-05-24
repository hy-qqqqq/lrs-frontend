<script setup>
// Utilities
import { ref } from 'vue'
import { registerUser } from '@/utils/service'
import { useRouter } from 'vue-router';
// Variables
const data = ref({
  userID: '',
  userPassword: '',
  dep: '',
  email: '',
})
const errorMessage = ref('')
const router = useRouter()
// Functions
const handleRegister = async () => {
  registerUser(data.value)
    .then((res) => {
      alert('Register successful!')
      router.push({ path: '/login' })
    })
    .catch((err) => {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        errorMessage.value = err.response.data.error
      } else {
        errorMessage.value = 'An error occurred while registering. Please try again.'
      }
    })
  data.value = {}
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
    <div class="register-container">
      <p class="register-title">Register</p>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="userID">User ID:</label>
          <input type="text" id="userID" v-model="data.userID" required>
        </div>
        <div class="form-group">
          <label for="userPassword">Password:</label>
          <input type="password" id="userPassword" v-model="data.userPassword" required>
        </div>
        <div class="form-group">
          <label for="department">Department:</label>
          <select id="department" v-model="data.dep" required>
            <option value="" disabled>---Select Department---</option>
            <option value="Fab A">Fab A</option>
            <option value="Fab B">Fab B</option>
            <option value="Fab C">Fab C</option>
            <option value="chemical">化學實驗室</option>
            <option value="surface">表面分析實驗室</option>
            <option value="composition">成分分析實驗室</option>
          </select>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="data.email" required>
        </div>
        <button type="submit">Register</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/register.css';
</style>
