<template>
  <v-row class="my-1">
    <v-col class="">
      <div class="button-pos">
        <BackButton :handleBack="handleBack" />
      </div>
      <v-row no-gutters class="d-flex justify-space-between align-center">
        <v-col
          class="d-flex flex-grow-1 flex-shrink-0 align-center justify-center text-center"
        >
          <div>
            <span class="text-h5">
              {{ dailyTrackedData?.day }}
            </span>
            <span class="text-h6 ml-2 text-grey-darken-1"
              >({{ dailyTrackedData?.date }})</span
            >
            <p class="mt-2" v-if="dailyTrackedData">
              Total logged time: {{ projectLoggedTime }}
            </p>
            <p v-if="dailyTrackedData">
              Current allocated time: {{ projectTimeFormatted }}
            </p>
            <p class="text-h6 mt-3" v-if="dailyTrackedData">
              {{ dailyTrackedData.percentageTrackedTime.toFixed(0) }} %
            </p>
            <div>
              <p class="text-red font-weight-bold text-body-2" v-if="error">
                {{ error }}
                <v-btn variant="outlined" color="red" @click="error = ''"
                  >OK</v-btn
                >
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider class="border-opacity-25 mx-auto my-4" inset></v-divider>
      <v-row>
        <v-col class="wrapper">
          <div
            v-if="recordsExist"
            class="flex-fill d-flex ma-1 pa-1 text-center"
          >
            <template
              class="d-flex flex-fill justify-start"
              v-for="(dayPercent, index) in dailyTrackedData?.trackedProjects"
              :key="index"
            >
              <ProgressBarSection
                :percentage="dayPercent.percent"
                :barColor="dayPercent.color"
                :project="dayPercent.project"
                @delete-section="deleteProjectSection"
              />
            </template>
          </div>
        </v-col>
      </v-row>
      <DayProjectSelect
        title="Recent Projects: "
        :projectData="recentProjects"
      />
      <DayProjectSelect title="All Projects: " :projectData="allProjects" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { provide, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatTimeFromMinutes } from "../../../../../../../util/timeFunctions";
import { useUserStore } from "../../../../../../../stores/userStore";
import { projects } from "../../../../../../../data/projects";
import { randomArraySelection } from "../../../../../../../util/randomArraySelection";

const { userId, weekId, dayId } = useRoute().params;
const week = +weekId - 1;
const day = +dayId - 1;

const error = ref("");

const router = useRouter();
const store = useUserStore();

const dailyTrackedData = store.getCurrentDay(+userId, week, day);

const dailyTotalMinutes = computed(() =>
  store.getDailyTotalMins(+userId, week, day)
);
const dailyTrackedMinutes = computed(() =>
  store.getDailyTrackedMins(+userId, week, day)
);

const recordsExist = computed(
  () => dailyTrackedData && dailyTrackedData?.trackedProjects.length > 0
);

const addProjectPercentage = (mins: number, project: string, color: string) => {
  if (!dailyTrackedData || !dailyTotalMinutes) {
    console.log("Missing variable");
    console.log("Daily data: ", dailyTrackedData);
    console.log("Daily total mins: ", dailyTotalMinutes);
    console.log("Daily tracked mins: ", dailyTrackedMinutes);
    return;
  }

  if (mins == 0) {
    error.value = "Enter a number greater than 0";
    return;
  }
  if (dailyTrackedMinutes.value! + mins > dailyTotalMinutes.value!) {
    error.value =
      "Project total exceeds time worked. Please remove some projects or add more tracked time";
    return;
  } else {
    const projectData = {
      mins,
      project,
      color,
    };

    store.pushProjectData(+userId, week, day, projectData);
  }
};

const deleteProjectSection = (projectName: string) => {
  store.deleteProjectData(+userId, week, day, projectName);
};

const projectLoggedTime = computed(() =>
  formatTimeFromMinutes(dailyTotalMinutes.value!)
);

const projectTimeFormatted = computed(() =>
  formatTimeFromMinutes(dailyTrackedMinutes.value!)
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

<style scoped>
.button-pos {
  position: absolute;
  top: 60px;
  left: 10px;
}
.wrapper {
  max-width: 800px;
  margin: auto;
}
</style>
