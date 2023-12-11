<template>
  <div
    class="block d-flex align-center justify-center"
    :class="`${barColor} ${compact ? 'flex-row' : 'flex-column'}`"
    :style="{ width: percentage + '%' }"
  >
    <p
      :class="compact ? 'd-none d-sm-flex  text-sm-caption' : 'text-subtitle-1'"
    >
      {{ project }}
    </p>
    <p :style="{ height: '15px' }"></p>
    <p :class="compact ? 'd-none' : 'd-flex'">{{ percentage.toFixed(0) }}%</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  percentage: number;
  barColor: string;
  project: string;
  compact?: boolean;
}>();
</script>

<style scoped>
.project-absolute {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
