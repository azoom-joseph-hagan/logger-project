<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="800" variant="elevated">
          <v-card-item>
            <v-row
              no-gutters
              class="d-flex flex-shrink-1 flex-grow-0 justify-space-between align-center"
            >
              <v-col cols="2" class="d-flex align-center justify-start">
                <BackButton :handleBack="handleBack" />
              </v-col>
              <v-col
                class="d-flex flex-grow-1 flex-shrink-0 align-center justify-center text-center"
              >
                <div class="">
                  <p>Day Id {{ dayId }}</p>
                  <p>Total logged time: {{ projectLoggedTime }}</p>
                  <p>Current allocated time: {{ projectTimeFormatted }}</p>
                  <p>{{ dailyTrackedData.percentageTrackedTime }} %</p>
                </div>
              </v-col>
              <v-col class="d-flex align-center flex-shrink-1" cols="2">
                <div></div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <v-sheet
                    class="flex-fill d-flex ma-1 pa-1 text-center"
                    style="height: 60px"
                  >
                    <template
                      class="d-flex flex-fill justify-start bg-green"
                      v-for="(dayPercent, index) in projectDayPercentage"
                      :key="index"
                    >
                      <ProgressBarSection
                        :percentage="dayPercent.percent"
                        :barColor="dayPercent.color"
                        :project="dayPercent.project"
                      />
                    </template>
                  </v-sheet>
                </v-card>
              </v-col>
            </v-row>
          </v-card-item>
          <DayProjectSelect
            title="Recent Projects: "
            :projectData="recentProjects"
          />
          <DayProjectSelect title="All Projects: " :projectData="allProjects" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { provide, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { trackedTimeData } from "../../../../../../../data/data";
import { formatTimeFromMinutes } from "../../../../../../../util/timeFunctions";
const { userId, weekId, dayId } = useRoute().params;

console.log("user ID: ", userId, "Week Id: ", weekId, "Day Id: ", dayId);

const router = useRouter();

type ProjectDayPercentageType = {
  percent: number;
  project: string;
  color: string;
};

const dailyTrackedData = ref(trackedTimeData[+dayId - 1 || 0]);

const projectDayPercentage = ref<ProjectDayPercentageType[]>([]);

const addProjectPercentage = (mins: number, project: string, color: string) => {
  console.log("Mins: ", mins, "Project: ", project, "Color: ", color);
  dailyTrackedData.value.totalTrackedTimeMins =
    dailyTrackedData.value.totalTrackedTimeMins + mins;
  const newPercent = +(
    (mins / dailyTrackedData.value.totalLoggedTimeMins) *
    100
  ).toFixed(2);
  dailyTrackedData.value.percentageTrackedTime =
    dailyTrackedData.value.percentageTrackedTime + newPercent;
  console.log("New Percentage", newPercent);

  projectDayPercentage.value.push({
    percent: newPercent,
    project,
    color,
  });
  dailyTrackedData.value.trackedProjects.push({
    project,
    mins,
    percent: newPercent,
    color,
  });

  console.log("Daily tracked data: ", dailyTrackedData);
};

const recentProjects = ["PRJ1", "PRJ2", "PRJ5", "PRJ4", "PRJ9"];
const allProjects = [
  "PRJ1",
  "PRJ2",
  "PRJ3",
  "PRJ4",
  "PRJ5",
  "PRJ6",
  "PRJ7",
  "PRJ8",
  "PRJ9",
  "PRJ10",
];

const handleBack = () => {
  router.back();
};

const projectLoggedTime = formatTimeFromMinutes(
  dailyTrackedData.value.totalLoggedTimeMins
);

const projectTimeFormatted = computed(() =>
  formatTimeFromMinutes(dailyTrackedData.value.totalTrackedTimeMins)
);

provide("addProjectPercentage", addProjectPercentage);
</script>
