<template>
  <div
    class="block d-flex flex-column align-center justify-center"
    :class="barColor"
    :style="{ width: percentage + '%' }"
  >
    <p>{{ project }}</p>
    <p>{{ percentage.toFixed(0) }}%</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  percentage: number;
  barColor: string;
  project: string;
}>();
</script>

<style scoped>
.position-relative {
  position: relative;
}

.project-absolute {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
