<script setup>
// Utilities
import { ref } from 'vue'
import { dataTypes } from '../data/addOrder.spec.js'
import { addOrder } from '@/utils/service.js'
import { useCounterStore } from '@/stores/counter.js'
// Components
import Alert from '../utils/Alert.vue'
// Stores
const store = useCounterStore()
// Variables
const showAlert = ref({show: false})
const rules = [value => !!value || "Required."]
const form = ref({})
const formInstance = ref()
// Functions
const handleSubmit = async (event, show) => {
  const res = await event
  if (res.valid) {
    const formData = new FormData(event.target)
    if (event.target.file.files.length === 0) {
      formData.delete('file')
    }
    addOrder(formData)
      .then((res) => {
        show.value = false
        showAlert.value = {show: true, success: true, message: res.data.message}
        store.increment()
      })
      .catch((err) => showAlert.value = {show: true, success: false, message: err})
    formInstance.value.reset()
  }
}
</script>

<template>

<Alert :show="showAlert"/>
<v-dialog max-width="500">

<template v-slot:activator="{ props: activatorProps }">
  <v-btn
    v-bind="activatorProps"
    color="primary"
    text="Add Order"
  ></v-btn>
</template>
<template v-slot:default="{ isActive }">
<v-sheet class="mx-auto p-5 w-full">
  <h3 class="pb-5">Add New Order</h3>
    <v-form
      ref="formInstance"
      @submit.prevent="handleSubmit($event, isActive)"
      id="addForm"
      class="grid grid-cols-2 gap-4"
    >
      <v-select
        v-model="form.factory"
        id="factory"
        name="factory"
        label="Fabrication*"
        :items="dataTypes.factory"
        :rules="rules"
      ></v-select>
      <v-select
        v-model="form.lab"
        id="lab"
        name="lab"
        label="Laboratory*"
        :items="dataTypes.lab"
        :rules="rules"
      ></v-select>
      <v-select
        v-model="form.priority"
        id="priority"
        name="priority"
        label="Priority*"
        :items="dataTypes.priority"
        :rules="rules"
      ></v-select>
      <v-text-field
        label="Approver ID" 
        clearable
      ></v-text-field>
      <v-textarea
        id="description"
        name="description"
        label="Description"
        variant="outlined"
        clearable
        class="col-span-2"
      ></v-textarea>
      <v-file-input
        id="file"
        name="file"
        label="Upload attachments"
        hint="Accept: txt, pdf, png, jpg, jpeg."
        variant="outlined"
        multiple
        chips
        counter
        show-size
        class="col-span-2"
      ></v-file-input>
      <small class="col-span-2 text-caption text-medium-emphasis">* Indicates required field</small>
      <v-btn class="col-span-2" type="submit" color="primary" variant="tonal">Submit</v-btn>
    </v-form>
</v-sheet>
</template>
</v-dialog>

</template>