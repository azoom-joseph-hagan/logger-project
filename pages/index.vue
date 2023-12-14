<template>
  <div>
    <div class="d-flex justify-center pl-2 pt-2">
      <WeekMonthToggleBtn />
    </div>
    <div class="d-flex justify-center flex-column align-center px-5 py-10">
      <div class="d-flex">
        <CalendarButton
          :formattedDate="formattedDate"
          @date-selected="dateSelected"
        />
        <ProfileButton :name="user?.name" :image="user?.image" />
      </div>
      <p class="py-2">
        <div v-if="viewMode === TimePeriod.Week">
          {{ weekRange?.firstDayOfWeek }} - {{ weekRange?.lastDayOfWeek }}
        </div>
        <div v-else>
          {{ formattedDate.substring(0, 7) }}
        </div>
      </p>
    </div>
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
  <div id="chart" v-if="chartToggle">
        <apexchart type="bar" height="350" :options="options" :series="barSeries"></apexchart>
      </div>
    <div class="chart mx-auto" v-else>
      <apexchart type="donut" :options="options" :series="series"></apexchart>
    </div>

  </div>
</template>

<script setup lang="ts">
import { TimePeriod, type NewWeekDataType } from "~/types";
import { useUserStore } from "../stores/userStoreNew";
import {
  formatDate,
  getMonthlyData,
  getWeekRange,
  getWeeklyData,
} from "~/util/dateRanges";

const store = useUserStore();

const selected = ref<Date | null>(null);
const formattedDate = ref(formatDate(new Date()));
const chartToggle = ref(false)

const user = computed(() => store.getCurrentUser());
const viewMode = computed(() => store.getViewMode());

const getTimePeriodData = (dayData, timePeriod: TimePeriod) => {
  // console.log("getTimePeriod", dayData, timePeriod);
  if (timePeriod === TimePeriod.Week) {
    return getWeeklyData(user.value.projectData, formattedDate.value);
  } else {
    return getMonthlyData(user.value.projectData, formattedDate.value);
  }
};

const displayData = ref<NewdisplayDataType[]>(
  getTimePeriodData(user.value.projectData, viewMode.value)
);

watch(viewMode, (oldValue) => {
  displayData.value = getTimePeriodData(displayData.value, viewMode.value);
});



const weekRange = ref<{ firstDayOfWeek: string; lastDayOfWeek: string } | null>(
  getWeekRange(formattedDate.value)
);

const dateSelected = (selectedDate: Date) => {
  selected.value = formatDate(selectedDate);
};

watch(user, (newUser, oldUser) => {
  displayData.value = getTimePeriodData(user.value?.projectData, viewMode.value)
  // getWeeklyData(
  //   user.value.projectData,
  //   formattedDate.value
  // );
});

watch(selected, (newValue) => {
  formattedDate.value = formatDate(newValue!);
  weekRange.value = getWeekRange(formattedDate.value);
  displayData.value = getTimePeriodData(
    user.value.projectData,
    viewMode.value
  );
});

function aggregateProjectMinutes(weekData) {
  const projectTotals = {};

  weekData.forEach((day) => {
    day.trackedProjects.forEach((project) => {
      if (!projectTotals[project.project]) {
        projectTotals[project.project] = { mins: 0, color: project.color };
      }
      projectTotals[project.project].mins += project.mins;
    });
  });

  const projects = Object.entries(projectTotals).map(([name, data]) => ({
    name,
    value: data.mins,
    color: data.color,
  }));
  return projects;
}

const projectMinutes = computed(() => {
  return aggregateProjectMinutes(displayData.value);
});

const labels = computed(() => projectMinutes.value.map((item) => item.name));
const values = computed(() => projectMinutes.value.map((item) => item.value));

const series = ref(values);
const barSeries = computed(() =>[{
            name: 'Time',
            data: values.value
          }])
const options = ref({
  labels: labels.value,
  legend: {
    position: "bottom",
  },
});
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
