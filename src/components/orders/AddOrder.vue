<script setup>
// Imports
import { dataTypes } from '../data/order.spec.js'
// Defines
const show = defineModel('show', {required: true})
</script>

<template>

<transition
    enter-active-class="transition ease-out duration-150 transform"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-100 transform"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0">
<!-- Main modal -->
<div v-if="show!=false" @click="show=false" id="add-modal" aria-hidden="true" class="overflow-y-auto overflow-x-hidden flex fixed z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-200/50">
  <!-- Modal content -->
  <div @click.stop="" class="flex flex-col relative bg-white rounded-lg shadow dark:bg-gray-700 min-w-80 max-h-full">
    <!-- Modal header -->
    <div class="flex items-center justify-between p-5 shadow-sm">
      <h4 class="font-semibold text-gray-900 dark:text-white">
        Add Order
      </h4>
      <button @click="show=false" type="button" class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </div>
    <!-- Modal body -->
    <div class="relative overflow-y-auto p-5 text-sm">
      <form id="addForm" class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label for="factory" class="font-semibold">
            Fabrication
            <abbr title="required" class="text-red-500">*</abbr>
          </label>
          <select id="factory" required class="text-gray-600 appearance-none cursor-pointer invalid:text-gray-400 focus:outline-none focus:ring-blue-500 focus:ring-inset focus:ring-1 hover:bg-gray-100/50 shadow-sm border text-sm rounded-lg p-2">
            <option value="" disabled selected>Select your fabrication</option>
            <option v-for="(display, name) in dataTypes['factory']" :value="name">{{ display }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label for="lab" class="font-semibold">
            Laboratory
            <abbr title="required" class="text-red-500">*</abbr>
          </label>
          <select id="lab" required class="text-gray-600 appearance-none cursor-pointer invalid:text-gray-400 focus:outline-none focus:ring-blue-500 focus:ring-inset focus:ring-1 hover:bg-gray-100/50 shadow-sm border text-sm rounded-lg p-2">
            <option value="" disabled selected>Select the laboratory for the order</option>
            <option v-for="(display, name) in dataTypes['lab']" :value="name">{{ display }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label for="priority" class="font-semibold">
            Priority
            <abbr title="required" class="text-red-500">*</abbr>
          </label>
          <select id="priority" required class="text-gray-600 appearance-none cursor-pointer invalid:text-gray-400 focus:outline-none focus:ring-blue-500 focus:ring-inset focus:ring-1 hover:bg-gray-100/50 shadow-sm border text-sm rounded-lg p-2">
            <option value="" disabled selected>Select the order priority</option>
            <option v-for="(display, name) in dataTypes['priority']" :value="name">{{ display }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label for="approvedBy" class="font-semibold">Approver</label>
          <input id="approvedBy" class="text-gray-600 appearance-none focus:outline-none focus:ring-blue-500 focus:ring-inset focus:ring-1 shadow-sm border text-sm rounded-lg p-2" placeholder="Type in the approver id">
        </div>
        <div class="col-span-2 flex flex-col gap-1">
          <label for="file" class="font-semibold">Attachments</label>
          <input id="file" type="file" title="" multiple class="text-gray-600 border rounded-lg cursor-pointer shadow-sm focus:outline-none p-2
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100">
        </div>
        <button type="submit" class="col-span-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm py-2.5">Submit</button>
      </form>
    </div>
  </div>
</div> 
</transition>

</template>