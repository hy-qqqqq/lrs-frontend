<script setup>
// Imports
import { ref, computed, onMounted } from "vue"
import { headers, dataTypes } from '../data/order.spec.js'
import { getOrders } from "@/utils/service.js";
// Components
import OrderItem from './OrderItem.vue'
import OrderDetail from './OrderDetail.vue'
// Hooks
onMounted(async () => {
  // fetch orders
  const { data } = await getOrders()
  // preprocess display names
  data.map(function (d) {
    d.priority = dataTypes.priority[d.priority]
    d.lab = dataTypes.lab[d.lab]
    return d
  })
  // set
  items.value = data
})
// Variables
const items = ref()
const showDetail = ref(false)
const itemFilter = ref({})
const computedItems = computed(() => {
  let res = items.value
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
    <select v-for="(spec, field) in dataTypes" @change="updateFilter($event)" :id="field" class="text-gray-600 cursor-pointer invalid:text-gray-400 focus:outline-none focus:ring-blue-500 focus:ring-inset focus:ring-1 hover:bg-gray-100/50 shadow-sm border text-sm rounded-lg p-2">
      <option value="" selected>Filter {{ field }}</option>
      <option v-for="(display) in spec" :value="display">{{ display }}</option>
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