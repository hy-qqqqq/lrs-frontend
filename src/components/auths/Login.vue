<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    login() {
      // check validation
      if (!this.username || !this.password) {
        this.errorMessage = 'Please enter both username and password.';
        return;
      }

      // sending a request to your backend
      // login backend 
      console.log('Username:', this.username);
      console.log('Password:', this.password);

      // clear form fields
      this.username = '';
      this.password = '';
      this.errorMessage = '';
    }
  }
};
</script>

<style scoped>
@import '@/assets/login.css';
</style>
