<template>
  <div>
    <div class="d-flex justify-center pl-2 pt-2">
      <v-btn-toggle
        v-model="toggle"
        color="primary"
        mandatory
        rounded="100"
        variant="text"
        density="compact"
      >
        <v-btn density="compact">週</v-btn>
        <v-btn density="compact">月</v-btn>
      </v-btn-toggle>
    </div>
    <div class="d-flex justify-space-between align-center px-5 py-10">
      <BackButton
        variant="outlined"
        color="black"
        :handleBack="handleBack"
        :disabled="!canGoBack"
      />
      <div class="d-flex flex-column">
        <ProfileButton :name="user?.name" :image="user?.image" />
        <p class="py-2">{{ dateTitle }} - {{ dateEndTitle }}</p>
      </div>
      <NextButton :handleNext="handleNext" :disabled="!canGoForward" />
    </div>
    <div class="chart mx-auto">
      <apexchart type="donut" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeekDataType } from "~/types";
import { useUserStore } from "../stores/userStore";
import { createWeekLaterDate } from "~/util/createWeekLaterDate";

const toggle = ref(0);

const store = useUserStore();

const user = computed(() => store.getCurrentUser());

const weekNumber = ref(0);

function aggregateProjectMinutes(weekData: WeekDataType[]) {
  return weekData.map((week) => {
    const projectTotals = {};
    const weekStartDate = week[0].date; // Assuming the first day of the week represents the week's date

    week.forEach((day) => {
      day.trackedProjects.forEach((project) => {
        if (!projectTotals[project.project]) {
          projectTotals[project.project] = 0;
        }
        projectTotals[project.project] += project.mins;
      });
    });

    const projects = Object.entries(projectTotals).map(([name, value]) => ({
      name,
      value,
    }));

    return { date: weekStartDate, projects };
  });
}

const weeklyProjectMinutes = computed(() =>
  aggregateProjectMinutes(user.value.weekData)
);

const dateTitle = computed(
  () => weeklyProjectMinutes.value[weekNumber.value].date
);

const dateEndTitle = computed(() => createWeekLaterDate(dateTitle.value));

const labels = computed(() =>
  weeklyProjectMinutes.value[weekNumber.value].projects.map((item) => item.name)
);
const values = computed(() =>
  weeklyProjectMinutes.value[weekNumber.value].projects.map(
    (item) => item.value
  )
);

const series = ref(values);
const options = ref({
  labels: labels.value,
  legend: {
    position: "bottom",
  },
});

const canGoBack = computed(() => weekNumber.value > 0);
const canGoForward = computed(
  () =>
    weeklyProjectMinutes &&
    weekNumber.value < weeklyProjectMinutes.value.length - 1
);

const handleBack = () => {
  if (canGoBack.value) weekNumber.value = weekNumber.value - 1;
};

const handleNext = () => {
  if (canGoForward.value) {
    weekNumber.value = weekNumber.value + 1;
  }
};
</script>

<style>
.chart {
  width: 400px;
}
@media (min-width: 450px) {
  .chart {
    width: 400px;
  }
}

@media (min-width: 600px) {
  .chart {
    width: 550px;
  }
}

@media (min-width: 992px) {
  .chart {
    width: 700px;
  }
}
</style>
