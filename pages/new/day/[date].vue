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
            <span class="text-h6 ml-2 text-grey-darken-1">({{ date }})</span>
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
      <AllProjectAutocomplete
        :projectData="allProjects"
        :recentProjects="recentProjects"
        :addProjectPercentage="addProjectPercentage"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { provide, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatTimeFromMinutes } from "../../../util/timeFunctions";
import { useUserStore } from "../../../stores/userStoreNew";
import { projects } from "../../../data/projects";
import { randomArraySelection } from "../../../util/randomArraySelection";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const date = route.params.date;
const error = ref("");

const user = store.getCurrentUser();
const dailyTrackedData = store.getCurrentDay(user.id, date);

const dailyTotalMinutes = computed(() =>
  store.getDailyTotalMins(user.id, date)
);

const dailyTrackedMinutes = computed(() =>
  store.getDailyTrackedMins(user.id, date)
);

const recordsExist = computed(
  () => dailyTrackedData && dailyTrackedData?.trackedProjects.length > 0
);

const addProjectPercentage = (mins: number, project: string, color: string) => {
  if (!dailyTrackedData || !dailyTotalMinutes) {
    console.log("Missing variable");
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

    store.pushProjectData(user.id, date, projectData);
  }
};

const deleteProjectSection = (projectName: string) => {
  store.deleteProjectData(user.id, date, projectName);
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
