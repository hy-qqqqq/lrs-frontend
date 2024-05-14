<script setup>
// Defines
defineProps({
  time: {
    type: String,
    required: true
  }
})
</script>

<template>
  {{ $filters.formatDate(time, 'LL') }}
  <br />
  <p class="text-xs">
    {{ $filters.formatDate(time, 'hh:mm:ss') }}
  </p>
</template>