<script setup>
// Utilities
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue'
import { headers, dataTypes } from './data/order.spec.js'
import { getOrders } from '@/utils/service.js'
import { useUserStore } from '@/stores/user.js'
import { useCounterStore } from '@/stores/counter.js'
import { useDisplay } from 'vuetify'
import { cStatus, cPriority } from './data/color.spec'
// Components
import OrderDetail from './orders/OrderDetail.vue'
import Sidebar from './Sidebar.vue'
import AddOrder from './orders/AddOrder.vue'
// Stores
const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)
const { user } = useUserStore()
const { smAndDown } = useDisplay()
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
const showDetail = ref({show: false})
const itemFilter = ref({})
const depFab = user.dep.includes('Fab')
// Functions
const computedItems = computed(() => {
  loading.value = true
  let res = items.value
  // process tabs
  if (toggle.value == 'approvals') {
    res = res.filter(item => item['approvedBy'] == user.id)
  } else if (toggle.value == 'myOrders') {
    res = res.filter(item => item['createdBy'] == user.id)
  } else if (toggle.value == 'myLabs') {
    res = res.filter(item => item['lab'] == user.dep)
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
const handleClick = (event, {item}) => {
  showDetail.value = {show:true, item:item}
}
</script>

<template>

<OrderDetail v-model:show="showDetail"/>
<Sidebar />

<div class="m-6">
  <div class="ml-64 flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <h1>Order</h1>
      <AddOrder v-if="depFab"/>
    </div>
    <v-divider class="border-opacity-100"></v-divider>
    <div class="flex flex-row justify-between items-center">
      <v-btn-toggle
        v-model="toggle"
        color="primary"
        variant="outlined"
      >
        <v-btn value="all">
          <v-icon icon="mdi-clipboard" start></v-icon>
          <span>All</span>
        </v-btn>
        <v-btn v-if="!depFab" value="myLabs">
          <v-icon icon="mdi-clipboard-alert" start></v-icon>
          <span>Lab Orders</span>
        </v-btn>
        <v-btn v-if="depFab" value="myOrders">
          <v-icon icon="mdi-clipboard-account" start></v-icon>
          <span>My Orders</span>
        </v-btn>
        <v-btn value="approvals">
          <v-icon icon="mdi-clipboard-check" start></v-icon>
          <span>Approvals</span>
        </v-btn>
      </v-btn-toggle>
      <div class="flex flex-row items-center gap-3">
        <v-menu :close-on-content-click="false" transition="slide-y-transition" location="left">
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
      :itemsPerPage="10"
      :row-props="{ class:'transition-all duration-100 hover:bg-blue-50 text-gray-700' }"
      :sort-by="[{ key: 'priority', order: 'desc' }]"
      :loading="loading"
      :mobile="smAndDown"
      :custom-filter="defaultFilter"
      :custom-key-filter="customKeyFilter"
      item-value="serialString"
      multi-sort
      single-select
      sticky
      class="max-h-[640px]"
      @click:row="handleClick"
    >
      <template v-slot:item.priority="{ value }">
        <v-chip density="comfortable" size="small" :color="cPriority[value]">{{ value }}</v-chip>
      </template>
      <template v-slot:item.createdAt="{ value }">
        {{ $filters.formatDate(value, 'LL') }}<br>
        <p class="text-xs">
        {{ $filters.formatDate(value, 'HH:mm:ss') }}
        </p>
      </template>
      <template v-slot:item.updatedAt="{ value }">
        {{ $filters.formatDate(value, 'LL') }}<br>
        <p class="text-xs">
        {{ $filters.formatDate(value, 'HH:mm:ss') }}
        </p>
      </template>
      <template v-slot:item.status="{ value }">
        <v-chip density="comfortable" size="small" :color="cStatus[value]">{{ value }}</v-chip>
      </template>
      <template v-slot:item.createdBy="{ value }">
        <v-chip density="comfortable" size="small">{{ value }}</v-chip>
      </template>
    </v-data-table>
  </div>
</div>

</template>

<style lang="css">
div.v-list-item__content > div.v-list-item-title {
  font-size: 0.9em;
}
div.v-list-item--density-default.v-list-item--one-line {
  min-height: 14px;
}
th.v-data-table__th {
  background-color: #F3F4F6;
}
</style>