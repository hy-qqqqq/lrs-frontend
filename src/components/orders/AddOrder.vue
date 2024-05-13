<script setup>
// Defines
const show = defineModel('show', {required: true})
</script>

<template>

<!-- Main modal -->
<div v-if="show!=false" @click="show=false" id="add-modal" aria-hidden="true" class="overflow-y-auto overflow-x-hidden flex fixed z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-200/50">
  <!-- Modal content -->
  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
    <!-- Modal header -->
    <div class="flex items-center justify-start p-5 gap-2 border-b rounded-t dark:border-gray-600">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Add Order
      </h3>
    </div>
    <!-- Modal body -->
    <div class="p-4 md:p-5">
    </div>
  </div>
</div> 

</template>