<script setup>
import { ref } from "vue";
// Components
import OrderTable from './orders/OrderTable.vue'
import Sidebar from './Sidebar.vue'
import AddOrder from './orders/AddOrder.vue'
// Variables
const showAdd = ref(false)
const keyReload = ref(0)
</script>

<template>
  <Sidebar />
  <div class="m-6">
    <div class="ml-64 flex flex-col gap-4">
      <AddOrder v-model:show="showAdd" v-model:keyReload="keyReload"/>
      <div class="flex flex-row justify-between">
        <h1>
          Order
        </h1>
        <button @click="showAdd=!showAdd" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
          Add Order
        </button>
      </div>
      <v-divider class="border-opacity-100"></v-divider>
      <Suspense>
        <OrderTable :key="keyReload"/>
      </Suspense>
    </div>
  </div>
</template>