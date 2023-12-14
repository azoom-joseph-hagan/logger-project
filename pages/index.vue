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
      <div class="py-2 d-flex align-center ga-5">
        <BackButton :handleBack="handlePrevious" />
        <div v-if="viewMode === TimePeriod.Week">
          <p class="text-subtitle-2 text-md-h5">
            {{ weekRange?.firstDayOfWeek }} - {{ weekRange?.lastDayOfWeek }}
          </p>
        </div>
        <div v-else>
          <p class="text-subtitle-2 text-md-h5">
            {{ formattedDate.substring(0, 7) }}
          </p>
        </div>
        <NextButton :handleNext="handleNext" />
      </div>
    </div>
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
        <apexchart
          type="bar"
          :options="options"
          :series="barSeries"
        ></apexchart>
      </div>
      <div v-else>
        <apexchart type="donut" :options="options" :series="series"></apexchart>
      </div>
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
  adjustDateByWeek,
  adjustToMonthBoundary,
} from "~/util/dateRanges";

const store = useUserStore();

const selected = ref<Date | null>(null);
const formattedDate = ref(store.getLastUsedDate() || formatDate(new Date()));
const chartToggle = ref(true);

const user = computed(() => store.getCurrentUser());
const viewMode = computed(() => store.getViewMode());

const getTimePeriodData = (dayData, timePeriod: TimePeriod) => {
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
  displayData.value = getTimePeriodData(
    user.value?.projectData,
    viewMode.value
  );
  // getWeeklyData(
  //   user.value.projectData,
  //   formattedDate.value
  // );
});

watch(selected, (newValue) => {
  formattedDate.value = formatDate(newValue!);
  weekRange.value = getWeekRange(formattedDate.value);
  displayData.value = getTimePeriodData(user.value.projectData, viewMode.value);
  store.setLastUsedDate(formattedDate.value);
});

function aggregateProjectMinutes(weekData) {
  const projectTotals = {};

  weekData.forEach((day) => {
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

const handleNext = () => {
  if (viewMode.value === TimePeriod.Week) {
    selected.value = adjustDateByWeek(formattedDate.value, "forward");
  } else {
    selected.value = adjustToMonthBoundary(formattedDate.value, "forward");
  }
};

const handlePrevious = () => {
  if (viewMode.value === TimePeriod.Week) {
    selected.value = adjustDateByWeek(formattedDate.value, "backward");
  } else {
    selected.value = adjustToMonthBoundary(formattedDate.value, "backward");
  }
};
</script>

<style>
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
