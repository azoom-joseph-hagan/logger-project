<template>
  <div class="week-container">
    <div class="row-container">
      <p class="day">{{ dayData.day }}</p>
      <p class="date">{{ dayData.date }}</p>
      <div class="bar-container">
        <div
          v-if="+dayData.percentageTrackedTime.toFixed(0) == 0"
          class="zerotext"
        >
          {{ dayData.percentageTrackedTime.toFixed(0) }}%
        </div>
        <template
          class="bar-inner"
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
      <div class="element-container">
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
      <div class="element-container">
        <v-btn
          icon="mdi-timer-edit"
          variant="tonal"
          size="small"
          @click="$emit('button-clicked')"
        ></v-btn>
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script lang="ts" setup>
import type { WeekDataType } from "~/types";

const props = defineProps<{ dayData: WeekDataType }>();
</script>

<style scoped lang="scss">
.week-container {
  padding: 0.5rem 0.25rem;
}
.row-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > .day {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 1rem;
  }

  > .date {
    display: none;
    font-size: 0.8rem;
    color: rgb(82, 82, 82);
    margin: 0 1rem;

    @media (min-width: 500px) {
      display: inline;
    }
  }

  .bar-container {
    width: 100%;
    display: flex;
    background-color: rgb(200, 200, 200);

    > .zerotext {
      font-size: 0.9rem;
      display: flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
    }

    > .bar-inner {
      display: flex;
      justify-content: start;
    }
  }

  .element-container {
    margin: 0 0.5rem;
  }
}

.divider {
  height: 1px;
  margin: 1rem auto 0;
  width: 80%;
  background-color: rgb(222, 222, 222);
}
</style>
