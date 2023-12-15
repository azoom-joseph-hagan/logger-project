<template>
  <div v-if="projectMinutes.length === 0" class="d-flex justify-center">
    <p class="text-grey-darken-2">No Data</p>
  </div>
  <div class="chart mx-auto" v-else>
    <div class="d-flex justify-end">
      <v-btn-toggle
        v-model="chartToggle"
        color="primary"
        mandatory
        rounded="100"
        variant="tonal"
        density="compact"
      >
        <v-btn density="comfortable" icon="mdi-chart-pie"></v-btn>
        <v-btn density="comfortable" icon="mdi-chart-bar"></v-btn>
      </v-btn-toggle>
    </div>

    <div v-if="chartToggle">
      <apexchart type="bar" :options="options" :series="barSeries"></apexchart>
    </div>
    <div v-else>
      <apexchart type="donut" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { WeekDataType } from "~/types";

const chartToggle = ref(1);

const props = defineProps<{
  displayData: WeekDataType[];
}>();

const displayData = computed(() => props.displayData);

function aggregateProjectMinutes(weekData: WeekDataType[]) {
  const projectTotals: {
    [key: string]: { color: string; mins: number; trueColor: string };
  } = {};

  weekData.forEach((day: WeekDataType) => {
    day.trackedProjects.forEach((project) => {
      if (!projectTotals[project.project]) {
        projectTotals[project.project] = {
          mins: 0,
          color: project.color,
          trueColor: project.trueColor,
        };
      }
      projectTotals[project.project].mins += project.mins;
    });
  });

  const projects = Object.entries(projectTotals).map(([name, data]) => ({
    name,
    value: data.mins,
    color: data.color,
    trueColor: data.trueColor,
  }));
  return projects;
}

const projectMinutes = computed(() => {
  return aggregateProjectMinutes(displayData.value);
});

const labels = computed(() => projectMinutes.value.map((item) => item.name));
const values = computed(() => projectMinutes.value.map((item) => item.value));
const seriesColors = computed(() =>
  projectMinutes.value.map((item) => item.trueColor)
);

const series = ref(values);
const barSeries = computed(() => [
  {
    name: "Time",
    data: values.value,
  },
]);

const options = computed(() => ({
  labels: labels.value,
  legend: {
    position: "bottom",
  },
  chart: {
    toolbar: {
      show: false,
    },
  },
  colors: seriesColors.value,
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
  dataLabels: {
    style: {
      colors: ["#2f2f30"],
    },
    dropShadow: {
      enabled: false,
    },
  },
}));
</script>

<style>
.apexcharts-tooltip-text {
  color: #2f2f30;
}
.chart {
  width: 360px;
}
@media (min-width: 450px) {
  .chart {
    width: 440px;
  }
}

@media (min-width: 600px) {
  .chart {
    width: 590px;
  }
}

@media (min-width: 992px) {
  .chart {
    width: 800px;
  }
}
</style>
