<template>
  <v-card-item>
    <div class="d-flex flex-row justify-space-between align-center">
      <p class="text-h6 font-weight-bold mx-2">{{ dayData.day }}</p>
      <p class="d-none d-sm-inline text-caption mx-2">{{ dayData.date }}</p>
      <div class="w-100 d-flex bg-grey-lighten-2">
        <div
          v-if="+dayData.percentageTrackedTime.toFixed(0) == 0"
          class="text-caption flex-grow-1 d-flex justify-center align-center"
        >
          {{ dayData.percentageTrackedTime.toFixed(0) }}%
        </div>
        <template
          class="d-flex flex-fill justify-start"
          v-for="(dayPercent, index) in dayData.trackedProjects"
          :key="index"
        >
          <ProgressBarSection
            compact
            :percentage="dayPercent.percent"
            :barColor="dayPercent.color"
            :project="dayPercent.project"
          />
        </template>
      </div>
      <div class="mx-2">
        <v-icon
          size="x-large"
          color="success"
          v-if="+dayData.percentageTrackedTime.toFixed(0) === 100"
          >mdi-check-circle</v-icon
        >
        <v-icon
          size="x-large"
          color="grey"
          v-else-if="dayData.totalLoggedTimeMins === 0"
          >mdi-minus-circle</v-icon
        >
        <v-icon size="x-large" color="error" v-else>mdi-close-circle</v-icon>
      </div>
      <div class="mx-2">
        <v-btn
          icon="mdi-chevron-right"
          variant="tonal"
          size="small"
          @click="$emit('button-clicked')"
        ></v-btn>
      </div>
    </div>
    <v-divider class="mt-4"></v-divider>
  </v-card-item>
</template>

<script lang="ts" setup>
import type { WeekDataType } from "~/types";

const props = defineProps<{ dayData: WeekDataType }>();
</script>
