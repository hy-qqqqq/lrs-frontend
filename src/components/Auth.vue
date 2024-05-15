<script setup>
import { ref } from 'vue';
import Login from './auths/Login.vue';
import Register from './auths/Register.vue';

const token = ref('login');

const changeTokenToRegister = () => {
  token.value = 'register';
};
</script>

<template>
  <div v-if="token === 'hello'">hello</div>
  <div v-else-if="token === 'login'"><Login /></div>
  <div v-else-if="token === 'register'"><Register /></div>
</template>
