<template>
  <v-dialog>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Calendar"> </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const menu = ref(false);
const date = ref(null);
</script>
