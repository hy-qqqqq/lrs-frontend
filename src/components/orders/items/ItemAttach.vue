<script setup>
// Utilities
import { ref } from 'vue'
import { downloadFile } from '@/utils/service'
// Components
import Alert from '@/components/utils/Alert.vue'
// Defines
defineProps({
  files: {
    type: Array,
    required: true
  }
})
// Variables
const showAlert = ref({show: false})
// Functions
const handleDownload = (file) => {
  downloadFile(file)
    .then((res) => {
      let blob = new Blob([res.data], { type: res.headers['content-type'] })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = file
      link.click()
    })
    .catch((err) => showAlert.value = {show: true, success: false, message: err})
}
</script>

<template>
<Alert :show="showAlert"/>
  <ol class="flex flex-col relative ms-4 gap-5">                  
    <li v-for="(file, index) in files" :key="index" class="ms-8">            
      <span @click="handleDownload(file)" class="cursor-pointer hover:animate-bounce absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
        <v-icon icon="mdi-tray-arrow-down" size="x-small" color="grey-darken-1"></v-icon>
      </span>
      <p class="mb-1 dark:text-white truncate" :value="file">
        {{ file.split("/")[2] }}
      </p>
    </li>
  </ol>
</template>