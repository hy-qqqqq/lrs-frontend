<script setup>
// Utilities
import { logoutUser } from '@/utils/service'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
// Variables
const store = useUserStore()
const router = useRouter()
const depFab = store.user.dep.includes('Fab')
// Functions
const handleLogout = async () => {
  logoutUser()
    .then((res) => {
      console.log(res.data);
      store.clearUser()
      sessionStorage.removeItem('token');
      alert('Logout successful!');
      router.push({ path: '/login' });
    })
    .catch((err) => {
      console.error(err);
      alert('Logout failed.');
    })
}
</script>

<template>
<aside id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
  <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">

    <!-- Routes -->
    <ul class="space-y-2 font-medium">
      <li>
        <router-link :to="{ name: 'dashboard' }" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <v-icon icon="mdi-view-dashboard" color="currentColor"></v-icon>  
          <span class="ms-3">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'order' }" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <v-icon icon="mdi-list-box" color="currentColor"></v-icon>  
          <span class="flex-1 ms-3 whitespace-nowrap">Order</span>
        </router-link>
      </li>
    </ul>

    <!-- Functions -->
    <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
      <li>
        <v-tooltip :text="store.user.dep" location="bottom">
          <template v-slot:activator="{ props }">
          <a v-bind="props" href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <v-icon icon="mdi-account" color="currentColor"></v-icon>
            <span class="flex-1 ms-3 whitespace-nowrap">User</span>
            <v-chip density="compact" :color="depFab?'primary':'pink-lighten-2'">{{ store.user.id }}</v-chip>
          </a>
          </template>
        </v-tooltip>
      </li>
      <li>
        <a href="#" @click="handleLogout" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <v-icon icon="mdi-logout-variant" color="currentColor"></v-icon>
          <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
        </a>
      </li>
    </ul>
  </div>
</aside>
</template>
