<script setup>
// Components
import IconDownload from '../../icons/IconDownload.vue'
// Defines
defineProps({
  files: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ol class="flex flex-col relative ms-4 gap-5">                  
    <li v-for="(file, index) in files" :key="index" class="ms-8">            
      <span class="hover:animate-bounce absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
        <IconDownload />
      </span>
      <p class="mb-1 dark:text-white">
        {{ file }}
      </p>
    </li>
  </ol>
</template>