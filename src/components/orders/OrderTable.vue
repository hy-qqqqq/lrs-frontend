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
  loading.value = true
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
const search = ref('')
const loading = ref(false)
const showDetail = ref(false)
const itemFilter = ref({})
const computedItems = computed(() => {
  loading.value = true
  let res = items.value
  Object.entries(itemFilter.value).forEach(([k, v]) => {
    if (v) {
      res = res.filter(item => item[k] == v)
    }
  })
  loading.value = false
  return res
})
// Functions
const defaultFilter = (value, query, item) => {
  if (value == null || query == null) return -1
  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase())
}
const customKeyFilter = {
    'createdAt': (v, q, i) => true,
    'updatedAt': (v, q, i) => true
}
</script>

<template>
  <OrderDetail v-model:show="showDetail"/>
  <form @submit.prevent="" id="filterForm" class="flex flex-row gap-5">
    <div class="grow">
      <v-text-field 
        v-model="search" 
        label="Type to search..." 
        density="compact"
        variant="outlined"
        hide-details
        clearable
      ></v-text-field>
    </div>
    <v-select
      v-for="(spec, field) in dataTypes" v-model="itemFilter[field]"
      :label="'Select '+ field"
      :items="Object.values(spec)"
      density="compact"
      variant="outlined"
      height="10"
      hide-details
      clearable
      class="max-w-40"
    ></v-select>
  </form>

  <v-data-table
    :headers="headers"
    :items="computedItems"
    :search="search"
    :itemsPerPage="-1"
    :header-props="{ class: 'bg-gray-100 capitalize sticky top-0' }"
    :sort-by="[{ key: 'priority', order: 'desc' }]"
    :loading="loading"
    :custom-filter="defaultFilter"
    :custom-key-filter="customKeyFilter"
    item-value="serialString"
    hide-default-footer
    class="shadow-sm max-h-[650px]"
  >
    <template v-slot:item="{ item }">
      <tr class="transition-all duration-500 hover:bg-gray-50 text-gray-500">
        <OrderItem :item="item" v-model:showDetail="showDetail"/>
      </tr>
    </template>
  </v-data-table>
</template>

<style lang="css">
div.v-list-item__content > div.v-list-item-title {
  font-size: 0.9em;
}
div.v-list-item--density-default.v-list-item--one-line {
  min-height: 14px;
}
</style>