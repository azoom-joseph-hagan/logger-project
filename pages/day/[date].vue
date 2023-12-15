<template>
  <v-row max-width="800" class="my-1">
    <v-col>
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
            <div v-if="dailyTrackedData" class="d-sm-flex ga-sm-10">
              <DayStatistic
                title="Total logged time:"
                :displayData="projectLoggedTime"
              />
              <DayStatistic
                title="Current allocated time:"
                :displayData="projectTimeFormatted"
              />
            </div>
          </div>
        </v-col>
      </v-row>
      <div>
        <p
          class="text-red text-center font-weight-bold text-body-2 ml-2"
          v-if="error"
        >
          {{ error }}
          <v-btn variant="flat" color="red" @click="error = ''">OK</v-btn>
        </p>
      </div>
      <v-divider class="border-opacity-25 mx-auto my-4" inset></v-divider>
      <div class="d-flex justify-center">
        <p class="text-h6 mt-3" v-if="dailyTrackedData">
          {{ dailyTrackedData.percentageTrackedTime.toFixed(0) }} %
        </p>
      </div>
      <v-row max-width="800" class="mt-2">
        <v-col v-if="recordsExist">
          <DayProgressBar
            :dailyTrackedProjects="dailyTrackedData!.trackedProjects"
            :deleteProjectSection="deleteProjectSection"
          />
        </v-col>
      </v-row>
      <AllProjectAutocomplete
        :projectData="allProjects"
        :recentProjects="recentProjects"
        :addProjectPercentage="addProjectPercentage"
        :totalLoggedHours="dailyTotalMinutes!"
        @set-error="setError"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { provide, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatTimeFromMinutes } from "../../util/timeFunctions";
import { useUserStore } from "../../stores/userStore";
import { projects } from "../../data/projects";
import { randomArraySelection } from "../../util/randomArraySelection";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const date = route.params.date as string;
const error = ref("");

const user = computed(() => store.getCurrentUser());

const dailyTrackedData = computed(() => {
  if (user.value) {
    return store.getCurrentDay(user.value.id, date);
  }
});

const dailyTotalMinutes = computed(() => {
  if (user.value) {
    return store.getDailyTotalMins(user.value?.id, date);
  }
});

const dailyTrackedMinutes = computed(() => {
  if (user.value) {
    return store.getDailyTrackedMins(user.value.id, date);
  }
});

const recordsExist = computed(
  () =>
    dailyTrackedData.value && dailyTrackedData.value.trackedProjects.length > 0
);

const addProjectPercentage = (
  mins: number,
  project: string,
  color: string,
  trueColor: string
) => {
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
      trueColor,
    };

    if (user.value) {
      store.pushProjectData(user.value.id, date, projectData);
    }
  }
};

const setError = (errorMsg: string) => {
  error.value = errorMsg;
};

const deleteProjectSection = (projectName: string) => {
  {
    if (user.value) {
      return store.deleteProjectData(user.value.id, date, projectName);
    }
  }
};

const projectLoggedTime = computed(() =>
  formatTimeFromMinutes(dailyTotalMinutes.value!)
);

const projectTimeFormatted = computed(() =>
  formatTimeFromMinutes(dailyTrackedMinutes.value!)
);

const allProjects = projects;
const recentProjects: { name: string; color: string; trueColor: string }[] =
  randomArraySelection(projects, 5);

const handleBack = () => {
  router.back();
};

provide("addProjectPercentage", addProjectPercentage);
</script>
