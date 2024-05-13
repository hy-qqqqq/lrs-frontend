<script setup>
import { ref, reactive } from "vue";
import { data, columns } from './data/order.spec.js'
// Components
import OrderTable from './orders/OrderTable.vue'
import Sidebar from './Sidebar.vue'
import AddOrder from "./orders/AddOrder.vue";
// Variables
const items = ref(data) // TODO: replace mocked data with fetch
const headers = ref(columns)
const showAdd = ref(false)
</script>

<template>
  <Sidebar />
  <div class="m-6">
    <div class="ml-64 flex flex-col gap-4">
      <div class="flex flex-row justify-between">
        <h1>
          Order
        </h1>
        <button @click="showAdd=!showAdd" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
          Add Order
        </button>
      </div>
      <AddOrder v-model:show="showAdd"/>  
      <OrderTable :items="items" :headers="headers"/>
    </div>
  </div>
</template>