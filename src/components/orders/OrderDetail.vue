<script setup>
// Utilities
import { ref } from 'vue'
import { delOrder, approveOrder, completeOrder, updateOrder, downloadFile } from '@/utils/service'
import { dataTypes } from '../data/addOrder.spec'
import { cStatus, cPriority } from '../data/color.spec'
import { useCounterStore } from '@/stores/counter'
import { toast } from 'vue3-toastify'
// Variables
const show = defineModel('show', {required: true})
const store = useCounterStore()
const refPriority = ref('regular')
// Functions
const closeAll = () => {show.value.show = false}
const getItemNo = () => show.value.item.serialNo
const handleDelete = async () => {
  delOrder(getItemNo())
    .then((res) => {
      toast.success(res.data.message)
      store.increment()
    })
    .catch((err) => toast.error(err))
  closeAll()
}
const handleApprove = async (action) => {
  approveOrder(getItemNo(), action)
    .then((res) => {
      toast.success(res.data.message)
      store.increment()
    })
    .catch((err) => toast.error(err))
  closeAll()
}
const handleComplete = async () => {
  completeOrder(getItemNo())
    .then((res) => {
      toast.success(res.data.message)
      store.increment()
    })
    .catch((err) => toast.error(err))
  closeAll()
}
const handleUpdate = async (show) => {
  updateOrder(getItemNo(), refPriority.value)
    .then((res) => {
      toast.success(res.data.message)
      store.increment()
    })
    .catch((err) => toast.error(err))
  show.value = false
  closeAll()
}
const handleDownload = async (file) => {
  downloadFile(file)
    .then((res) => {
      let blob = new Blob([res.data], { type: res.headers['content-type'] })
      let link = document.createElement('a')
      let url = window.URL.createObjectURL(blob)
      link.href = url
      link.download = file
      link.click()
      window.URL.revokeObjectURL(url)
    })
    .catch((err) => toast.error(err))
}
</script>

<template>

<v-dialog v-model="show.show" max-width="600" max-height="700" scrollable>

<v-card
  title="Order Details"
  :subtitle="show.item.serialString"
  color="primary"
  variant="text"
  class="mx-auto w-full bg-white"
>
<v-card-text>
  <v-list class="flex flex-col gap-4">
    <v-menu location="end" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props">
          <span>Priority</span>
          <span>
            <v-icon icon="mdi-pencil-circle" color="grey-darken-1" class="mr-2"></v-icon>
            <v-chip size="small" :color="cPriority[show.item.priority]">{{ show.item.priority }}</v-chip>
          </span>
        </v-list-item>
      </template>
      <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>Select to update priority</v-card-text>
        <v-card-text>
          <v-select
            v-model="refPriority"
            :items="dataTypes.priority"
            density="compact"
            hide-details
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn size="small" @click="isActive.value=false">Cancel</v-btn>
          <v-btn size="small" @click="handleUpdate(isActive)">Update</v-btn>
        </v-card-actions>
      </v-card>
      </template>
    </v-menu>

    <v-list-item>
      <span>Fabrication</span>
      <span>{{ show.item.factory }}</span>
    </v-list-item>
    <v-list-item>
      <span>Laboratory</span>
      <span>{{ show.item.lab }}</span>
    </v-list-item>
    <v-list-item>
      <span>Issuer</span>
      <v-chip size="small">{{ show.item.createdBy }}</v-chip>
    </v-list-item>
    <v-list-item>
      <span>Status</span>
      <v-chip size="small" :color="cStatus[show.item.status]">{{ show.item.status }}</v-chip>
    </v-list-item>
  </v-list>

  <v-expansion-panels flat static ripple multiple>
    <v-expansion-panel title="Description">
      <v-expansion-panel-text class="text-gray-600">
        <p class="whitespace-pre-wrap">
          {{ show.item.description?show.item.description:'No description...' }}
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel title="History">
      <v-expansion-panel-text>
        <v-timeline
          align="start"
          density="compact"
          dot-color="grey-darken-1"
          class="text-sm"
        >
          <v-timeline-item v-if="show.item.status=='Completed'" size="x-small">
            <div class="flex justify-between">
              <div class="flex flex-row gap-1 items-center">
                Completed by
                <v-chip size="small" density="compact">{{ show.item.completedBy }}</v-chip>
              </div>
              <span>{{ $filters.formatDate(show.item.completedAt, 'LL @ HH:mm:ss') }}</span>
            </div>
          </v-timeline-item>
          <v-timeline-item v-if="show.item.status!=='Issued'" size="x-small">
            <div class="flex justify-between">
              <div class="flex flex-row gap-1 items-center">
                <span v-if="show.item.status=='Rejected'">Rejected by</span>
                <span v-else>Approved by</span>
                <v-chip size="small" density="compact">{{ show.item.approvedBy }}</v-chip>
              </div>
              <span>{{ $filters.formatDate(show.item.approvedAt, 'LL @ HH:mm:ss') }}</span>
            </div>
          </v-timeline-item>
          <v-timeline-item size="x-small">
            <div class="flex justify-between">
              <div class="flex flex-row gap-1 items-center">
                Issued by
                <v-chip size="small" density="compact">{{ show.item.createdBy }}</v-chip>
              </div>
              <span>{{ $filters.formatDate(show.item.createdAt, 'LL @ HH:mm:ss') }}</span>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel v-if="show.item.allFilePaths" title="Attachment">
      <v-expansion-panel-text>
        <v-list class="flex flex-col gap-2">
          <v-list-item
            v-for="(file) in show.item.allFilePaths"
            @click="handleDownload(file)"
            :title="file.split('/')[2]"
            prepend-icon="mdi-download-circle"
            class="cursor-pointer"
          ></v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

</v-card-text>

<v-card-actions>
  <v-menu location="end">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" color="error">Delete</v-btn>
    </template>
    <v-card color="error" variant="tonal">
      <v-card-text>
        Are you sure to delete this order?
      </v-card-text>
      <v-card-actions>
        <v-btn size="small">Cancel</v-btn>
        <v-btn size="small" @click="handleDelete">Delete</v-btn>
      </v-card-actions>
    </v-card>    
  </v-menu>

  <v-menu v-if="show.item.status=='Issued' && show.item.approvedBy" location="end">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">Approve</v-btn>
    </template>
    <v-card color="primary" variant="tonal">
      <v-card-text>
        Are you sure to approve or reject this order?
      </v-card-text>
      <v-card-actions>
        <v-btn size="small">Cancel</v-btn>
        <v-btn size="small" @click="handleApprove('Reject')">Reject</v-btn>
        <v-btn size="small" @click="handleApprove('Approve')">Approve</v-btn>
      </v-card-actions>
    </v-card>    
  </v-menu>

  <v-menu v-else-if="show.item.status=='Approved' || (show.item.status=='Issued' && show.item.approvedBy=='')" location="end">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">Complete</v-btn>
    </template>
    <v-card color="primary" variant="tonal">
      <v-card-text>
        Are you sure to complete this order?
      </v-card-text>
      <v-card-actions>
        <v-btn size="small">Cancel</v-btn>
        <v-btn size="small" @click="handleComplete">Complete</v-btn>
      </v-card-actions>
    </v-card>    
  </v-menu>

</v-card-actions>
</v-card>
</v-dialog>

</template>

<style lang="css">
button.v-expansion-panel-title {
  padding: 16px;
}
div.v-list-item__content {
  display: flex;
  justify-content: space-between;
}
div.v-timeline-item__body {
  width: 100%;
}
</style>