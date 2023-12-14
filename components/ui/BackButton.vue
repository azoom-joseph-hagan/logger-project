<template>
  <v-btn
    icon="mdi-chevron-left"
    :color="color || 'black'"
    :variant="variant || 'outlined'"
    size="small"
    @click="handleBack"
  />
</template>

<script lang="ts" setup>
const props = defineProps(["handleBack", "variant", "color"]);
</script>
