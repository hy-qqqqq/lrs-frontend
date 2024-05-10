<script setup>
// Components
import IconCalendar from '../icons/IconCalendar.vue'
// Defines
const show = defineModel('show', {required: true})
</script>

<template>

<!-- Main modal -->
<div v-if="show!=false" @click="show=false" id="timeline-modal" aria-hidden="true" class="overflow-y-auto overflow-x-hidden flex fixed z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-200/50">
  <!-- Modal content -->
  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
    <!-- Modal header -->
    <div class="flex items-center justify-start p-5 gap-2 border-b rounded-t dark:border-gray-600">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Order History No.{{ show.serialNo }}
      </h3>
    </div>
    <!-- Modal body -->
    <div class="p-4 md:p-5">
      <ol class="relative border-s border-gray-200 dark:border-gray-600 ms-3.5 mb-4 md:mb-5">                  
        <li v-if="show.status=='Completed'" class="mb-10 ms-8">            
          <span class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
            <IconCalendar />
          </span>
          <h3 class="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Completed by {{ show.completedBy }}
            <span v-if="show.status=='Completed'" class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>
          </h3>
          <time class="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            {{ $filters.formatDate(show.completedAt, 'LL @ hh:mm:ss') }}
          </time>
        </li>
        <li v-if="show.status=='Completed'||show.status=='Approved'" class="mb-10 ms-8">
          <span class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
            <IconCalendar />
          </span>
          <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Approved by {{ show.approvedBy }}
            <span v-if="show.status=='Approved'" class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>
          </h3>
          <time class="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            {{ $filters.formatDate(show.approvedAt, 'LL @ hh:mm:ss') }}
          </time>
        </li>
        <li v-else-if="show.status=='Rejected'" class="mb-10 ms-8">
          <span class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
            <IconCalendar />
          </span>
          <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Rejected by {{ show.approvedBy }}
            <span v-if="show.status=='Rejected'" class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>
          </h3>
          <time class="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            {{ $filters.formatDate(show.approvedAt, 'LL @ hh:mm:ss') }}
          </time>
        </li>
        <li class="ms-8">
          <span class="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
            <IconCalendar />
          </span>
          <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Created by {{ show.createdBy }}
            <span v-if="show.status=='Issued'" class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>
          </h3>
          <time class="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            {{ $filters.formatDate(show.createdAt, 'LL @ hh:mm:ss') }}
          </time>
        </li>
      </ol>
    </div>
  </div>
</div> 

</template>