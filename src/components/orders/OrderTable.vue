<script setup>
import { ref, computed } from "vue"
import { dataTypes } from '../data/order.spec.js'
// Components
import OrderItem from './OrderItem.vue'
import OrderDetail from './OrderDetail.vue'
// Defines
const props = defineProps({
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
const showDetail = ref(false)
const itemFilter = ref({})
const computedItems = computed(() => {
  let res = props.items
  Object.entries(itemFilter.value).forEach(([k, v]) => {
    if (v) {
      res = res.filter(item => item[k] == v)
    }
  })
  return res
})
// Functions
const updateFilter = (event) => {
  itemFilter.value[event.target.id] = event.target.value
}
</script>

<template>
  <OrderDetail v-model:show="showDetail"/>
  <form id="filterForm" class="flex flex-row gap-5">
    <div class="grow">
      <input id="approvedBy" class="w-full text-gray-600 appearance-none focus:outline-none focus:ring-blue-500 focus:ring-inset focus:ring-1 shadow-sm border text-sm rounded-lg p-2" placeholder="Search for order serial number">
    </div>
    <select v-for="(value, name) in dataTypes" @change="updateFilter($event)" :id="name" class="text-gray-600 cursor-pointer invalid:text-gray-400 focus:outline-none focus:ring-blue-500 focus:ring-inset focus:ring-1 hover:bg-gray-100/50 shadow-sm border text-sm rounded-lg p-2">
      <option value="" selected>Filter {{ name }}</option>
      <option v-for="val in value" :value="val.name">{{ val.name }}</option>
    </select>
  </form>

  <table class="w-full table-auto text-left leading-loose">
    <thead>
      <tr class="bg-gray-100 capitalize">
        <th class="font-bold p-2" v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody class="text-gray-500">
      <tr class="transition-all duration-500 hover:bg-gray-50" v-for="(item, index) in computedItems" :key="index">
        <OrderItem v-model:showDetail="showDetail" :item="item"/>
      </tr>
    </tbody>
  </table>
</template>