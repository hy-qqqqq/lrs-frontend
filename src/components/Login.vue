<script setup>
// Utilities
import { ref } from 'vue'
import { loginUser } from '@/utils/service'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
// Variables
const data = ref({
  userID: '',
  userPassword: ''
})
const visible = ref(false)
const store = useUserStore()
const router = useRouter()
const rules = [value => !!value || "Required."]
// Functions
const handleLogin = async (event) => {
  const res = await event
  if (res.valid) {
    loginUser(data.value)
      .then((res) => {
        toast.success(res.data.message)
        store.setUser(res.data)
        sessionStorage.setItem('token', res.data.access_token)
        setTimeout(() => {router.push({ path: '/order' })}, 1000)
      })
      .catch((err) => {
        toast.error(err)
      })
    data.value = {}
  }
}
const toRegister = () => {
  router.push({ path: '/register' })
}
</script>

<template>
  <div class="grid h-screen">

    <div class="flex flex-col gap-6 items-center justify-center">
    <h1 class="font-serif">Lab Requirements Management</h1>
    <v-form
      @submit.prevent="handleLogin($event)"
      id="loginForm"
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
        :rules="rules"
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
        :rules="rules"
      ></v-text-field>
      <v-btn type="submit" color="primary" class="my-2">Login</v-btn>
      <v-btn type="button" color="primary" variant="tonal" @click="toRegister">Go to Register</v-btn>
    </v-form>
        
  </div>
  </div>
</template>