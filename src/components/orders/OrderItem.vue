<script setup>
// Components
import ItemTime from './items/ItemTime.vue'
import { cStatus, cPriority } from '../data/color.spec'
// Defines
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>

  <!-- Serial num -->
  <td class="p-2 items-center">
    {{ item.serialString }}
  </td>

  <!-- Priority -->
  <td class="p-2">
    <v-chip density="comfortable" size="small" :color="cPriority[item.priority]">{{ item.priority }}</v-chip>
  </td>

  <!-- Fabrication -->
  <td class="p-2">
    {{ item.factory }}
  </td>

  <!-- Lab -->
  <td class="p-2">
    {{ item.lab }}
  </td>

  <!-- Start time -->
  <td class="p-2">
    <ItemTime :time="item.createdAt"/>
  </td>

  <!-- Update time -->
  <td class="p-2">
    <ItemTime v-if="item.status=='Issued'" :time="item.createdAt"/>
    <ItemTime v-else-if="item.status=='Approved' || item.status=='Rejected'" :time="item.approvedAt"/>
    <ItemTime v-else-if="item.status=='Completed'" :time="item.completedAt"/>
  </td>

  <!-- Issuer -->
  <td class="p-2">
    <v-chip density="comfortable" size="small">{{ item.createdBy }}</v-chip>
  </td>

  <!-- Status -->
  <td class="p-2">
    <v-chip density="comfortable" size="small" :color="cStatus[item.status]">{{ item.status }}</v-chip>
  </td>

</template>