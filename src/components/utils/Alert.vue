<script setup>
defineModel('show', {type: Object, required: true})
</script>

<template>
<div v-if="show.show" @click="show.show=false" class="fixed z-50 inset-0 flex justify-center">
<div :class="[show.success ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50']" class="flex w-96 p-4 m-4 rounded-lg h-14" role="alert">
  <svg class="flex-shrink-0 w-4 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ms-3 text-sm font-medium">
    {{ show.message }}
  </div>
  <button @click="show.show=false" type="button" class="ms-auto -mx-1.5 -my-1.5 rounded-lg  p-1.5 inline-flex items-center justify-center h-8 w-8" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>
</div>
</template>