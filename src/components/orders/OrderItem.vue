<script setup>
// Components
import ItemTime from './items/ItemTime.vue'
import ItemStatus from './items/ItemStatus.vue'
import ItemPriority from './items/ItemPriority.vue'
// Defines
defineProps({
  item: {
    type: Object,
    required: true
  }
})
const showDetail = defineModel('showDetail')
</script>

<template>

  <!-- Serial num -->
  <td class="p-2 items-center">
    {{ item.serialNo }}
  </td>

  <!-- Priority -->
  <td class="p-2">
    <ItemPriority :priority="item.priority"/>
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
    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
    {{ item.createdBy }}
    </span>
  </td>

  <!-- Status -->
  <td class="p-2">
    <ItemStatus :status="item.status"/>
  </td>

  <!-- Action -->
  <td class="p-2">
    <div class="h-full flex gap-1">
      <button @click="showDetail=item" type="button" class="p-2 text-blue-700 cursor-pointer flex item-center">
        Details
      </button>
    </div>
  </td>

</template>