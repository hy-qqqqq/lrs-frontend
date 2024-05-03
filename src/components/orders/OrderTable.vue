<script setup>
import OrderItem from './OrderItem.vue'
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
</script>

<template>
  <table class="w-full rounded-xl table-auto text-left leading-loose">
    <thead>
      <tr class="bg-gray-100 capitalize">
        <th class="font-bold p-2" v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody class="text-gray-500">
      <tr class="transition-all duration-500 hover:bg-gray-50" v-for="(item, index) in items" :key="index">
        <OrderItem :item="item"/>
      </tr>
    </tbody>
  </table>
</template>