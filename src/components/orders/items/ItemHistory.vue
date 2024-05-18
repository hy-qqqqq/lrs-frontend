<script setup>
// Defines
const item = defineModel('item', {required: true})
</script>

<template>
  <ol class="flex flex-col relative border-s border-gray-200 dark:border-gray-600 ms-4 gap-5">                  
    <li v-if="item.status=='Completed'" class="ms-8">            
      <span class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
        <v-icon icon="mdi-calendar-month-outline" size="x-small" color="grey-darken-1"></v-icon>
      </span>
      <p class="mb-1 text-gray-900 dark:text-white">
        Completed by {{ item.completedBy }}
      </p>
      <time class="block mb-1 leading-none text-gray-500 dark:text-gray-400">
        {{ $filters.formatDate(item.completedAt, 'LL @ hh:mm:ss') }}
      </time>
    </li>
    <li v-if="item.status=='Completed'||item.status=='Approved'" class="ms-8">
      <span class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
        <v-icon icon="mdi-calendar-month-outline" size="x-small" color="grey-darken-1"></v-icon>
      </span>
      <p class="mb-1 text-gray-900 dark:text-white">
        Approved by {{ item.approvedBy }}
      </p>
      <time class="block mb-1 leading-none text-gray-500 dark:text-gray-400">
        {{ $filters.formatDate(item.approvedAt, 'LL @ hh:mm:ss') }}
      </time>
    </li>
    <li v-else-if="item.status=='Rejected'" class="ms-8">
      <span class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
        <v-icon icon="mdi-calendar-month-outline" size="x-small" color="grey-darken-1"></v-icon>
      </span>
      <p class="mb-1 text-gray-900 dark:text-white">
        Rejected by {{ item.approvedBy }}
      </p>
      <time class="block mb-1 leading-none text-gray-500 dark:text-gray-400">
        {{ $filters.formatDate(item.approvedAt, 'LL @ hh:mm:ss') }}
      </time>
    </li>
    <li class="ms-8">
      <span class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
        <v-icon icon="mdi-calendar-month-outline" size="x-small" color="grey-darken-1"></v-icon>
      </span>
      <p class="mb-1 text-gray-900 dark:text-white">
        Created by {{ item.createdBy }}
      </p>
      <time class="block mb-3 leading-none text-gray-500 dark:text-gray-400">
        {{ $filters.formatDate(item.createdAt, 'LL @ hh:mm:ss') }}
      </time>
    </li>
  </ol>
</template>