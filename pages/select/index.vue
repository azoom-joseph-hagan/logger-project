<template>
  <v-date-picker v-model="selected" hide-header> </v-date-picker>
  <p>Formatted date: {{ formattedDate }}</p>
  <hr />
  <div v-if="weekRange">
    <p>First day of week: {{ weekRange.firstDayOfWeek }}</p>
    <li v-for="day in datesInWeeklyRange">
      <p class="text-grey">
        {{ day.date }}
      </p>
    </li>
    <p>Last day of week: {{ weekRange.lastDayOfWeek }}</p>
  </div>
  <hr />
  <div v-if="monthlyRange">
    <p>First day of month: {{ monthlyRange.firstDayOfMonth }}</p>
    <li v-for="day in datesInMonthlyRange">
      <p class="text-grey">
        {{ day.date }}
      </p>
    </li>
    <p>Last day of month: {{ monthlyRange.lastDayOfMonth }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import {
  getMonthRange,
  getMonthlyData,
  getWeekRange,
  getWeeklyData,
} from "../../util/dateRanges";
import { type TempDailyDataType } from "../../types";

const selected = ref(null);
const formattedDate = ref("");
const weekRange = ref<{ firstDayOfWeek: string; lastDayOfWeek: string } | null>(
  null
);
const monthlyRange = ref<{
  firstDayOfMonth: string;
  lastDayOfMonth: string;
} | null>(null);

const datesInWeeklyRange = ref<TempDailyDataType[] | null>(null);
const datesInMonthlyRange = ref<TempDailyDataType[] | null>(null);

const dailyDataArr = [
  {
    date: "2022-12-15",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-07",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-08",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-09",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-10",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-11",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-12",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-13",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-14",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-15",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-16",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-17",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-18",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-19",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-20",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-21",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-22",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-23",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-24",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-25",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-12-26",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
  {
    date: "2023-02-15",
    day: "月",
    percentageTrackedTime: 100,
    totalLoggedTimeMins: 480,
    totalTrackedTimeMins: 480,
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

watch(selected, (newValue) => {
  formattedDate.value = formatDate(newValue!);
  weekRange.value = getWeekRange(formattedDate.value);
  monthlyRange.value = getMonthRange(formattedDate.value);
  datesInWeeklyRange.value = getWeeklyData(dailyDataArr, formattedDate.value);
  datesInMonthlyRange.value = getMonthlyData(dailyDataArr, formattedDate.value);
});
</script>

<style>
li {
  list-style: none;
}
</style>
