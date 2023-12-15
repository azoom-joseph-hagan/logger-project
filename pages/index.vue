<template>
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
  <Charts :displayData="displayData" />
</template>

<script setup lang="ts">
import { TimePeriod, type WeekDataType } from "~/types";
import { useUserStore } from "../stores/userStore";
import {
  formatDate,
  getMonthlyData,
  getWeekRange,
  getWeeklyData,
  adjustDateByWeek,
  adjustToMonthBoundary,
} from "~/util/dateFunctions";

const store = useUserStore();

const selected = ref<string | null>(null);
const formattedDate = ref(store.getLastUsedDate() || formatDate(new Date()));

const user = computed(() => store.getCurrentUser());
const viewMode = computed(() => store.getViewMode());

const getTimePeriodData = (dayData: WeekDataType[], timePeriod: TimePeriod) => {
  if (!dayData) {
    return;
  }
  if (timePeriod === TimePeriod.Week) {
    return getWeeklyData(dayData, formattedDate.value);
  } else {
    return getMonthlyData(dayData, formattedDate.value);
  }
};

const displayData = ref<WeekDataType[]>(
  getTimePeriodData(user.value.projectData, viewMode.value)
);

watch(viewMode, (oldValue) => {
  displayData.value = getTimePeriodData(user.value.projectData, viewMode.value);
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
});

watch(selected, (newValue) => {
  formattedDate.value = formatDate(newValue!);
  weekRange.value = getWeekRange(formattedDate.value);
  displayData.value = getTimePeriodData(user.value.projectData, viewMode.value);
  store.setLastUsedDate(formattedDate.value);
});

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
