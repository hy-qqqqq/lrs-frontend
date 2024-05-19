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
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">User ID:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="login-button">Log In</button>
        <button type="button" @click="navigateToRegister" class="register-button">Register</button>
      </form>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Check if username and password are provided
      if (!this.username || !this.password) {
        alert('Please enter both user ID and password.');
        return;
      }

      // Prepare data for login request
      const data = {
        userID: this.username,
        userPassword: this.password
      };

      // Send login request to the backend
      axios.post('http://localhost:5001/api/login', data)
        .then(response => {
          // Handle successful login
          const store = useUserStore()
          store.setUser(response.data.userID, response.data.dep)
          alert('Login successful!'); // You can redirect or perform other actions here
          this.$router.push({ path: '/order' }); // Navigate to the "hello" page
        })
        .catch(error => {
          // Handle login error
          console.error(error);
          alert('Invalid user ID or password.');
        });

      // Clear username and password fields after submission
      this.username = '';
      this.password = '';
    },
    navigateToRegister() {
      this.$router.push({ path: '/register' }); // Navigate to the register page
    }
  }
};
</script>



<style scoped>
@import '@/assets/login.css';
</style>
