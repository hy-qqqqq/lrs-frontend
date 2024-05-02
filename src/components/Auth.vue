<script setup>
import Login from './auths/Login.vue'
import Register from './auths/Register.vue'
const token = 'login' // TODO: this token is used for temporary dev
</script>

<template>
  <div class="h-screen grid grid-cols-2 justify-items-center items-center">
    <div class="flex flex-row gap-8 items-center">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <div>
        <h1 class="green">Lab Requirements Management</h1>
        <h3>
          <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a> +
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind CSS</a>.
        </h3>
      </div>
    </div>
    <div v-if="token == 'hello'">hello</div>
    <div v-else-if="token == 'login'"><Login /></div>
    <div v-else-if="token == 'register'"><Register /></div>
  </div>
</template>

