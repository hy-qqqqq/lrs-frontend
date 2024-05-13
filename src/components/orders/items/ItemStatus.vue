<script setup>
// Defines
defineProps({
  status: {
    type: String,
    required: true
  }
})
</script>

<template>
  <span v-if="status == 'Issued'" class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
    {{ status }}
  </span>
  <span v-else-if="status == 'Approved'" class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600">
    {{ status }}
  </span>
  <span v-else-if="status == 'Completed'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
    {{ status }}
  </span>
  <span v-else-if="status == 'Rejected'" class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
    {{ status }}
  </span>
</template>