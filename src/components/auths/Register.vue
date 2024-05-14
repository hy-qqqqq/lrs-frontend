<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="userID">User ID:</label>
        <input type="text" id="userID" v-model="userID" required>
      </div>
      <div class="form-group">
        <label for="userPassword">Password:</label>
        <input type="password" id="userPassword" v-model="userPassword" required>
      </div>
      <div class="form-group">
        <label for="department">Department:</label>
        <select id="department" v-model="department" required>
          <option value="" disabled>---Select Department---</option>
          <option value="Fab A">Fab A</option>
          <option value="Fab B">Fab B</option>
          <option value="Fab C">Fab C</option>
          <option value="化學實驗室">化學實驗室</option>
          <option value="表面分析實驗室">表面分析實驗室</option>
          <option value="成分分析實驗室">成分分析實驗室</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userID: '',
      userPassword: '',
      department: '',
      errorMessage: ''
    };
  },
  methods: {
    register() {
      // Check validation
      if (!this.userID || !this.userPassword || !this.department) {
        this.errorMessage = 'Please fill out all fields.';
        return;
      }

      // Sending a request to your backend
      const data = {
        userID: this.userID,
        userPassword: this.userPassword,
        dep: this.department
      };

      axios.post('http://localhost:5001/api/register', data)
        .then(response => {
          console.log(response.data); // Log the response from the backend
          // Optionally, you can handle successful registration here
          // For example, display a success message to the user
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = 'An error occurred while registering. Please try again.';
        });

      // Clear form fields
      this.userID = '';
      this.userPassword = '';
      this.department = '';
      this.errorMessage = '';
    }
  }
};
</script>


<style scoped>
@import '@/assets/register.css';
</style>
