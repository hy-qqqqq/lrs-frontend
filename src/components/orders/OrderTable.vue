<script setup>
import { ref } from "vue";
// Components
import OrderItem from './OrderItem.vue'
import HistoryOrder from './HistoryOrder.vue'
// Defines
defineProps({
  items: {
    type: Array,
    required: true
  },
  headers: {
    type: Array,
    required: true
  }
})
// Variables
const showHistory = ref(false)
</script>

<template>
  <HistoryOrder v-model:show="showHistory"/>
  <table class="w-full table-auto text-left leading-loose">
    <thead>
      <tr class="bg-gray-100 capitalize">
        <th class="font-bold p-2" v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody class="text-gray-500">
      <tr class="transition-all duration-500 hover:bg-gray-50" v-for="(item, index) in items" :key="index">
        <OrderItem v-model:showHistory="showHistory" :item="item"/>
      </tr>
    </tbody>
  </table>
</template>