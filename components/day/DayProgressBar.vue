<template>
  <div class="flex-fill d-flex ma-1 pa-1 text-center mx-auto maxWidth">
    <template
      class="d-flex flex-fill justify-start"
      v-for="(dayPercent, index) in dailyTrackedProjects"
      :key="index"
    >
      <ProgressBarSection
        :percentage="dayPercent.percent"
        :barColor="dayPercent.color"
        :project="dayPercent.project"
        @delete-section="deleteProjectSection"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { TrackedProjectsType } from "~/types";

const props = defineProps<{
  dailyTrackedProjects: TrackedProjectsType[];
  deleteProjectSection: (projectName: string) => void;
}>();
</script>

<style scoped>
.maxWidth {
  max-width: 800px;
}
</style>
