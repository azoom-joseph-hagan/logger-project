<template>
  <v-btn
    icon="mdi-chevron-right"
    :color="color || 'black'"
    :variant="variant || 'outlined'"
    size="large"
    @click="handleNext"
  ></v-btn>
</template>

<script lang="ts" setup>
const props = defineProps(["handleNext", "variant", "color"]);
</script>
