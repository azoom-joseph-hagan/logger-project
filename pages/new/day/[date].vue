<template>
  <v-row class="my-1">
    <v-col class="">
      <v-row no-gutters class="d-flex justify-space-between align-center">
        <v-col
          class="d-flex flex-grow-1 flex-shrink-0 align-center justify-center text-center ga-2"
        >
          <div>
            <div class="d-flex align-center justify-center align-center mb-4">
              <BackButton
                class="floatingBtn"
                :handleBack="handleBack"
                variant="text"
              />
              <div class="d-flex flex-md-row align-center">
                <span class="text-h5">
                  {{ dailyTrackedData?.day }}
                </span>
                <span class="text-md-h6 ml-2 text-grey-darken-1"
                  >({{ date }})</span
                >
              </div>
            </div>
            <ProfileButton />
            <div class="mt-4" v-if="dailyTrackedData">
              <p class="text-subtitle-1">Total logged time:</p>
              <p class="text-h5">{{ projectLoggedTime }}</p>
            </div>
            <div class="mt-4" v-if="dailyTrackedData">
              <p class="text-subtitle-1">Current allocated time:</p>
              <p class="text-h5">{{ projectTimeFormatted }}</p>
            </div>
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
        @set-error="setError"
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

const user = computed(() => store.getCurrentUser());
const dailyTrackedData = computed(() =>
  store.getCurrentDay(user.value.id, date)
);

const dailyTotalMinutes = computed(() =>
  store.getDailyTotalMins(user.value.id, date)
);

const dailyTrackedMinutes = computed(() =>
  store.getDailyTrackedMins(user.value.id, date)
);

const recordsExist = computed(
  () => dailyTrackedData && dailyTrackedData.value.trackedProjects.length > 0
);

const addProjectPercentage = (mins: number, project: string, color: string) => {
  if (!dailyTrackedData || !dailyTotalMinutes) {
    console.log("Missing variable");
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

    store.pushProjectData(user.value.id, date, projectData);
  }
};

const setError = (errorMsg: string) => {
  error.value = errorMsg;
};

const deleteProjectSection = (projectName: string) => {
  store.deleteProjectData(user.value.id, date, projectName);
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
.wrapper {
  max-width: 800px;
  margin: auto;
}
</style>
