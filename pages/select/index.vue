<template>
  <h1>{{ selected }}</h1>
  <v-select
    label="Select Something"
    v-model="selected"
    :items="items"
    item-title="en"
    item-value="jp"
  >
  </v-select>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const selected = ref("Select");
const items = [
  { en: "Item One", jp: "アイテム１" },
  { en: "Item Two", jp: "アイテム2" },
  { en: "Item Three", jp: "アイテム3" },
];
</script>
