<script setup>
</script>

<template>
<nav class="bg-white drop-shadow sticky top-0">
  <div class="mx-auto px-8">
    <div class="relative flex h-16 items-center">
      <div class="flex items-stretch justify-start gap-5">
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 261.76 226.69"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>
          <p class="font-bold">Lab Requirements Management</p>
        </div>
        <div class="flex items-center gap-3">
          <router-link class="text-gray-500 hover:underline underline-offset-4 text-sm font-medium" :to="{ name: 'dashboard' }">Dashboard</router-link>
          <router-link class="text-gray-500 hover:underline underline-offset-4 text-sm font-medium" :to="{ name: 'order' }">Order</router-link>
          <router-link class="text-gray-500 hover:underline underline-offset-4 text-sm font-medium" :to="{ name: 'approval' }">Approval</router-link>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2">
        <button type="button" class="relative rounded-full bg-gray-500 p-1 text-gray-200 hover:text-white">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>

        <div class="relative ml-3">
          <button type="button" class="relative flex rounded-full bg-gray-500" id="user-menu-button">
            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>