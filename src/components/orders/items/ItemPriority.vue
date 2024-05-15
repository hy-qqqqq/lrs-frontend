<script setup>
// Defines
defineProps({
  priority: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div v-if="priority == '一般'" class="flex items-center">
    <div class="h-1.5 w-1.5 rounded-full bg-gray-500 me-2"></div>
    {{ priority }}
  </div>
  <div v-else-if="priority == '急單'" class="flex items-center">
    <div class="h-1.5 w-1.5 rounded-full bg-yellow-500 me-2"></div>
    {{ priority }}
  </div>
  <div v-else-if="priority == '特急單'" class="flex items-center">
    <div class="h-1.5 w-1.5 rounded-full bg-red-500 me-2"></div>
    {{ priority }}
  </div>
</template>