<script setup>
import IconEdit from '../icons/IconEdit.vue'
import IconDownload from '../icons/IconDownload.vue'
import IconTrashcan from '../icons/IconTrashcan.vue'
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>

  <td class="p-2 items-center">
    {{ item.serialNo }}
  </td>

  <td class="p-2">
    <div v-if="item.priority == '一般'" class="flex items-center">
      <div class="h-1.5 w-1.5 rounded-full bg-gray-500 me-2"></div>
      {{ item.priority }}
    </div>
    <div v-if="item.priority == '急件'" class="flex items-center">
      <div class="h-1.5 w-1.5 rounded-full bg-yellow-500 me-2"></div>
      {{ item.priority }}
    </div>
    <div v-if="item.priority == '特急'" class="flex items-center">
      <div class="h-1.5 w-1.5 rounded-full bg-red-500 me-2"></div>
      {{ item.priority }}
    </div>
  </td>

  <td class="p-2">
    {{ item.factory }}
  </td>

  <td class="p-2">
    {{ item.lab }}
  </td>

  <td class="p-2">
    {{ $filters.formatDate(item.createdAt, 'LL') }}
    <br />
    <p class="text-xs">
      {{ $filters.formatDate(item.createdAt, 'hh:mm:ss') }}
      by
      {{ item.createdBy }}
    </p>
  </td>

  <td class="p-2">
    {{ $filters.formatDate(item.approvedAt, 'LL') }}
    <br />
    <p class="text-xs">
      {{ $filters.formatDate(item.approvedAt, 'hh:mm:ss') }}
      by
      {{ item.approvedBy }}
    </p>
  </td>

  <td class="p-2">
    {{ $filters.formatDate(item.completedAt, 'LL') }}
    <br />
    <p class="text-xs">
      {{ $filters.formatDate(item.completedAt, 'hh:mm:ss') }}
      by
      {{ item.completedBy }}
    </p>
  </td>

  <td class="p-2">
    <span v-if="item.status == 'Issued'" class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
      {{ item.status }}
    </span>
    <span v-else-if="item.status == 'Approved'" class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600">
      {{ item.status }}
    </span>
    <span v-else-if="item.status == 'Completed'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
      {{ item.status }}
    </span>
    <span v-else-if="item.status == 'Rejected'" class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
      {{ item.status }}
    </span>
  </td>

  <td class="p-2">
    <div class="h-full flex gap-1">
      <button class="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-gray-500 flex item-center">
        <IconEdit />
      </button>
      <button class="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-gray-500 flex item-center">
        <IconTrashcan />
      </button>
      <button class="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-gray-500 flex item-center">
        <IconDownload />
      </button>
    </div>
  </td>

</template>