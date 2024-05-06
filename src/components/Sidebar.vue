<script setup>
import IconUser from './icons/IconUser.vue'
import IconOrder from './icons/IconOrder.vue'
import IconLogout from './icons/IconLogout.vue'
import IconApproval from './icons/IconApproval.vue'
import IconDashboard from './icons/IconDashboard.vue'
import IconNotification from './icons/IconNotification.vue'
</script>

<template>

<aside id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
  <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">

    <!-- Routes -->
    <ul class="space-y-2 font-medium">
      <li>
        <router-link :to="{ name: 'dashboard' }" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <IconDashboard class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/> 
          <span class="ms-3">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'order' }" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <IconOrder class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span class="flex-1 ms-3 whitespace-nowrap">Order</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'approval' }" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <IconApproval class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span class="flex-1 ms-3 whitespace-nowrap">Approval</span>
        </router-link>
      </li>
      </ul>

      <!-- Functions -->
      <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <IconNotification class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span class="flex-1 ms-3 whitespace-nowrap">Notification</span>
              <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <IconUser class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
            <span class="flex-1 ms-3 whitespace-nowrap">User</span>
            <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">tsmc-100</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <IconLogout class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
            <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
          </a>
         </li>
      </ul>
   </div>
</aside>

</template>
