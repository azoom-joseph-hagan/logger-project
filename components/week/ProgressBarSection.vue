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
    <div class="d-flex align-center">
      <p :style="{ height: '15px' }"></p>
      <p class="mx-2" :class="compact ? 'd-none' : 'd-flex'">
        {{ percentage.toFixed(0) }}%
      </p>
      <v-btn
        :class="compact ? 'd-none' : 'd-flex'"
        size="small"
        density="compact"
        variant="plain"
        icon="mdi-delete-circle-outline"
        @click="$emit('delete-section', project)"
      ></v-btn>
    </div>
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
/* .project-absolute {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
} */
</style>
