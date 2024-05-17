<script setup>
defineModel('show', {type: Object, required: true})
</script>

<template>
  <v-snackbar
    v-model:="show.show"
    :timeout="2000"
    :text="show.message"
    :color="show.success?'success':'error'"
    location="top"
    variant="tonal"
  >
  </v-snackbar>
</template>