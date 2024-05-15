<template>
  <div class="login-container">
    <p>Welcome to the login page!</p>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">User ID:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Log In</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios';

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
          console.log(response.data);
          const userToken = response.data.token;
          sessionStorage.setItem('token', userToken); // Store token in sessionStorage
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
    }
  }
};
</script>



<style scoped>
@import '@/assets/login.css';
</style>
