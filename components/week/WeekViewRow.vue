<template>
  <v-card-item>
    <div class="d-flex flex-row justify-space-between align-center">
      <p class="text-h6 font-weight-bold mx-2">{{ dayData.day }}</p>
      <p class="text-subtitle-2 mx-2">{{ dayData.date }}</p>
      <div class="flex-grow-1 d-flex justify-center align-center">
        {{ dayData.percentageTrackedTime.toFixed(0) }}%
      </div>
      <div class="mx-2">
        <v-icon
          size="x-large"
          color="success"
          v-if="dayData.percentageTrackedTime === 100"
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
