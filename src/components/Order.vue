<script setup>
import { ref, reactive } from "vue";
import { data, columns } from './data/order.spec.js'
import OrderTable from './orders/OrderTable.vue'
const items = ref(data) // TODO: replace mocked data with fetch
const headers = ref(columns)
</script>

<template>
  <div class="m-6 flex flex-col gap-4">
    <h1>
      Order
    </h1>
    <div>
      <OrderTable :items="items" :headers="headers"/>
    </div> 
  </div>
</template>