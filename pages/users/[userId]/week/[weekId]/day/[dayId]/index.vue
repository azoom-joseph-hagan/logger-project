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
                  <p>{{ dailyTrackedData?.day }}</p>
                  <p v-if="dailyTrackedData">
                    Total logged time: {{ projectLoggedTime }}
                  </p>
                  <p v-if="dailyTrackedData">
                    Current allocated time: {{ projectTimeFormatted }}
                  </p>
                  <p v-if="dailyTrackedData">
                    {{ dailyTrackedData.percentageTrackedTime.toFixed(0) }} %
                  </p>
                  <div>
                    <p class="text-red font-weight-bold" v-if="error">
                      {{ error }}
                      <v-btn @click="error = ''">OK</v-btn>
                    </p>
                  </div>
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
                      v-for="(
                        dayPercent, index
                      ) in dailyTrackedData?.trackedProjects"
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
import { provide, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatTimeFromMinutes } from "../../../../../../../util/timeFunctions";
const { userId, weekId, dayId } = useRoute().params;
import { useUserStore } from "../../../../../../../stores/userStore";
import { projects } from "../../../../../../../data/projects";
import { randomArraySelection } from "../../../../../../../util/randomArraySelection";

const week = +weekId - 1;
const day = +dayId - 1;

const error = ref("");

const router = useRouter();
const store = useUserStore();

const dailyTrackedData = store.getCurrentDay(+userId, week, day);

const addProjectPercentage = (mins: number, project: string, color: string) => {
  if (!dailyTrackedData) return;
  if (mins == 0) {
    error.value = "Enter a number greater than 0";
    return;
  }
  if (
    dailyTrackedData.totalTrackedTimeMins + mins >
    dailyTrackedData.totalLoggedTimeMins
  ) {
    error.value =
      "Project total exceeds time worked. Please remove some projects or add more tracked time";
    return;
  } else {
    dailyTrackedData.totalTrackedTimeMins =
      dailyTrackedData.totalTrackedTimeMins + mins;
    const newPercent = +((mins / dailyTrackedData.totalLoggedTimeMins) * 100);
    dailyTrackedData.percentageTrackedTime =
      dailyTrackedData.percentageTrackedTime + newPercent;

    const projectData = {
      mins,
      percent: newPercent,
      project,
      color,
    };

    store.pushProjectData(+userId, week, day, projectData);
  }
};

const projectLoggedTime = computed(() =>
  formatTimeFromMinutes(dailyTrackedData!.totalLoggedTimeMins)
);

const projectTimeFormatted = computed(() =>
  formatTimeFromMinutes(dailyTrackedData!.totalTrackedTimeMins)
);

const allProjects = projects;
const recentProjects: { name: string; color: string }[] = randomArraySelection(
  projects,
  5
);

const handleBack = () => {
  router.back();
};

provide("addProjectPercentage", addProjectPercentage);
</script>
