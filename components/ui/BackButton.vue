<template>
  <v-btn
    icon="mdi-chevron-left"
    :color="color || 'grey'"
    :variant="variant || 'tonal'"
    size="small"
    @click="handleBack"
  />
</template>

<script lang="ts" setup>
const props = defineProps(["handleBack", "variant", "color"]);
</script>
