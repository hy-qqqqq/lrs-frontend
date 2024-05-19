<script setup>
// Utilities
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue'
import { headers, dataTypes } from '../data/order.spec.js'
import { getOrders } from '@/utils/service.js'
import { useUserStore } from '@/stores/user.js'
import { useCounterStore } from '@/stores/counter.js'
// Components
import OrderItem from './OrderItem.vue'
import OrderDetail from './OrderDetail.vue'
// Stores
const userStore = useUserStore()
const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)
// Hooks
onMounted(async () => {
  await handleGet()
})
watch(count, async () => {
  await handleGet()
})
// Variables
const items = ref([])
const toggle = ref('all')
const search = ref('')
const loading = ref(false)
const showDetail = ref(false)
const itemFilter = ref({})
// Functions
const computedItems = computed(() => {
  loading.value = true
  let res = items.value
  // process tabs
  if (toggle.value == 'approvals') {
    res = res.filter(item => item['approvedBy'] == userStore.user.id)
  } else if (toggle.value == 'myOrders') {
    res = res.filter(item => item['createdBy'] == userStore.user.id)
  }
  // process filters
  Object.entries(itemFilter.value).forEach(([k, v]) => {
    if (v) {
      res = res.filter(item => item[k] == v)
    }
  })
  loading.value = false
  return res
})
const defaultFilter = (value, query, item) => {
  if (value == null || query == null) return -1
  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase())
}
const customKeyFilter = {
    'createdAt': (v, q, i) => true,
    'updatedAt': (v, q, i) => true
}
const handleGet = async () => {
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
}
</script>

<template>
  <OrderDetail v-model:show="showDetail"/>
  <div class="flex flex-row justify-between items-center">
    <v-btn-toggle
      v-model="toggle"
      divided
    >
      <v-btn value="all">
        <v-icon icon="mdi-clipboard" start></v-icon>
        <span>All</span>
      </v-btn>
      <v-btn value="approvals">
        <v-icon icon="mdi-clipboard-check" start></v-icon>
        <span>Approvals</span>
      </v-btn>
      <v-btn value="myOrders">
        <v-icon icon="mdi-clipboard-account" start></v-icon>
        <span>My Orders</span>
      </v-btn>
    </v-btn-toggle>
    <div class="flex flex-row items-center gap-3">
      <v-menu :close-on-content-click="false" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-filter-multiple-outline" variant="plain"></v-btn>
        </template>
        <div class="p-4 text-sm flex flex-col gap-3 bg-white border rounded-lg shadow-xl">
          <div v-for="(spec, field) in dataTypes">
            Select {{ field }}
            <v-chip-group v-model="itemFilter[field]">
              <v-chip v-for="(display) in spec"
                :value="display"
                :text="display"
                variant="outlined"
                size="small"
                filter
              ></v-chip>
            </v-chip-group>
          </div>
        </div>
      </v-menu>
      <v-text-field 
        v-model="search" 
        label="Type to search..." 
        density="compact"
        variant="outlined"
        hide-details
        clearable
        class="w-60"
      ></v-text-field>
    </div>
  </div>

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
    class="shadow-sm max-h-[630px]"
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