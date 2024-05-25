<script setup>
// Utilities
import { ref } from 'vue'
import { registerUser } from '@/utils/service'
import { useRouter } from 'vue-router';
// Variables
const data = ref({
  userID: '',
  userPassword: '',
  dep: null,
  email: '',
})
const router = useRouter()
const visible = ref(false)
const rules = {
  required: [value => !!value || "Required."],
  emailFmt: [ v => /.+@.+/.test(v) || 'Invalid Email address' ]
}
// Functions
const handleRegister = async (event) => {
  const res = await event
  if (res.valid) {
    registerUser(data.value)
      .then((res) => {
        alert('Register successful!')
        router.push({ path: '/login' })
      })
      .catch((err) => {
        console.error(err);
      })
    data.value = {}
  }
}
const toLogin = () => {
  router.push({ path: '/login' })
}
// Data
const depItems =  [
  {title: 'Fab A', value: 'Fab A'},
  {title: 'Fab B', value: 'Fab B'},
  {title: 'Fab C', value: 'Fab C'},
  {title: '化學實驗室', value: 'chemical'},
  {title: '表面分析實驗室', value: 'surface'},
  {title: '成分分析實驗室', value: 'composition'},
]
</script>

<template>
  <div class="grid h-screen">

    <div class="flex flex-col gap-6 items-center justify-center">
    <h1 class="font-serif">Lab Requirements Management</h1>
    <v-form
      @submit.prevent="handleRegister($event)"
      id="registerForm"
      class="flex flex-col gap-2 w-80"
    >

      <v-text-field
        v-model="data.userID"
        id="username"
        name="username"
        label="User ID"
        placeholder="Enter your user ID"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :rules="rules.required"
      ></v-text-field>

      <v-text-field
        v-model="data.userPassword"
        id="password"
        name="password"
        label="Password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        :rules="rules.required"
      ></v-text-field>

      <v-text-field
        v-model="data.email"
        id="email"
        name="email"
        label="Email Address" 
        type="email"
        placeholder="Enter your email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        :rules="rules.emailFmt"
      ></v-text-field>

      <v-select
        v-model="data.dep"
        id="dep"
        name="dep"
        label="Department"
        prepend-inner-icon="mdi-briefcase"
        variant="outlined"
        :items="depItems"
        :rules="rules.required"
      ></v-select>

      <v-btn type="submit" color="primary" class="my-2">Register</v-btn>
      <v-btn type="button" color="primary" variant="tonal" @click="toLogin">Go to Login</v-btn>
    </v-form>

    </div>
  </div>

</template>
