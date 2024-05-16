<script setup>
import { ref } from 'vue'
// Components
import ItemHistory from './items/ItemHistory.vue'
import ItemPriority from './items/ItemPriority.vue'
import ItemStatus from './items/ItemStatus.vue'
import ItemAttach from './items/ItemAttach.vue'
import IconAccordion from '../icons/IconAccordion.vue'
// Defines
const show = defineModel('show', {required: true})
const showAttach = ref(false)
const showHistory = ref(false)
const showDelete = ref(false)
// Functions
const closeAll = () => {
  show.value = false
  showAttach.value = false
  showHistory.value = false
  showDelete.value = false
}
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
<div v-if="show!=false" @click="closeAll" id="detail-modal" class="overflow-y-auto overflow-x-hidden flex fixed z-50 justify-end items-start px-5 py-20 w-full inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-200/50 visible">
  <!-- Modal content -->
  <div @click.stop="" class="flex flex-col relative bg-white rounded-lg shadow dark:bg-gray-700 gap-5 max-h-full w-80">
    <!-- Modal header -->
    <div class="flex items-center justify-between p-5 shadow-sm">
      <h4 class="font-semibold text-gray-900 dark:text-white">
        Order Details
      </h4>
      <button @click="closeAll" type="button" class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </div>
    <!-- Modal body -->
    <div class="relative overflow-y-auto text-sm">
      <ol class="flex flex-col gap-5 justify-between px-5"> 
        <li class="text-base text-blue-800 font-semibold">
          {{ show.serialString }}
        </li>
        <li class="flex justify-between">
          <p>Priority</p>
          <ItemPriority :priority="show.priority"/>
        </li>
        <li class="flex justify-between">
          <p>Fabrication</p>
          <p>{{ show.factory }}</p>
        </li>
        <li class="flex justify-between">
          <p>Lab</p>
          <p>{{ show.lab }}</p>
        </li>
        <li class="flex justify-between">
          <p>Issuer</p>
          <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
            {{ show.createdBy }}
          </span>
        </li>
        <li class="flex justify-between">
          <p>Status</p>
          <ItemStatus :status="show.status"/>
        </li>
        <li class="flex flex-col gap-5">
          <button @click="showHistory=!showHistory" type="button" class="flex items-center justify-between w-full font-medium rtl:text-right">
            <span>History</span>
            <IconAccordion v-bind:class="{'rotate-180': showHistory}" class="text-gray-400"/>
          </button>
          <ItemHistory v-if="showHistory" :item="show"/>
        </li>
        <li v-if="show.allFilePaths" class="flex flex-col gap-5">
          <button @click="showAttach=!showAttach" type="button" class="flex items-center justify-between w-full font-medium rtl:text-right">
            <span>Attachment</span>
            <IconAccordion v-bind:class="{'rotate-180': showAttach}" class="text-gray-400"/>
          </button>
          <ItemAttach v-if="showAttach" :files="show.allFilePaths"/>
        </li>
      </ol>
    </div>
    <!-- Modal control -->
    <div class="flex justify-end gap-1 p-5 border-t rounded-t">
      <button @click="showDelete=true" class="border text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white font-medium rounded-lg text-sm px-3 py-2">
        Delete
      </button>
      <button v-if="show.status=='Issued'" class="border text-white border-blue-700 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2">
        Approve 
      </button>
      <button v-if="show.status=='Approved'" class="border text-white border-blue-700 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2">
        Complete
      </button>
    </div>
  </div>
</div>
</transition>

</template>