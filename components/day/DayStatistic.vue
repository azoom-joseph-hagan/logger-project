<template>
  <div class="mt-1 mt-sm-2 bg-grey-lighten-3 pa-2 rounded">
    <p class="text-subtitle-1 text-center">{{ title }}</p>
    <p class="text-h6 text-md-h5 text-center">
      {{ displayData }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string; displayData: string }>();
</script>

<style></style>
