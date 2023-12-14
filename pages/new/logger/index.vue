<template>
  <v-row>
    <v-col v-if="dayData">
      <v-card-item>
        <div>
          <div class="d-flex justify-center align-center py-4">
            <div class="d-flex flex-column justify-center align-center">
              <div class="d-flex">
                <CalendarButton
                  :formattedDate="formattedDate"
                  @date-selected="dateSelected"
                />
                <ProfileButton :name="user?.name" :image="user?.image" />
              </div>
              <v-row class="mt-2">
                <BackButton :handleBack="handlePrevious" />
                <div
                  class="text-subtitle-2 text-md-h5 text-center font-weight-bold mb-5 mx-3 my-2"
                >
                  <p class="inline-block">
                    {{ weekRange?.firstDayOfWeek }} -
                    {{ weekRange?.lastDayOfWeek }}
                  </p>
                </div>
                <NextButton :handleNext="handleNext" />
              </v-row>
            </div>
          </div>
          <v-card color="grey-lighten-3 mx-auto" max-width="800">
            <div v-if="dayData.length !== 0">
              <WeekViewRow
                v-for="(day, index) in dayData"
                :dayData="day"
                @button-clicked="handleClick(day.date)"
              />
            </div>
            <div v-else>
              <p>No data</p>
            </div>
          </v-card>
        </div>
      </v-card-item>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/userStoreNew";
import { computed, ref, watch } from "vue";
import {
  getWeeklyData,
  getWeekRange,
  formatDate,
  adjustDateByWeek,
} from "../../../util/dateRanges";

type NewUserType = {
  name: string;
  id: number;
  image: string;
  projectData: [];
};

type NewWeekDataType = {
  date: string;
  day: string;
  totalLoggedTimeMins: number;
  totalTrackedTimeMins: number;
  percentageTrackedTime: number;
  trackedProjects: TrackedProjectsType[];
};

type TrackedProjectsType = {
  project: string;
  mins: number;
  percent: number;
  color: string;
};

const router = useRouter();
const store = useUserStore();

const selected = ref<Date | null>(null);

const formattedDate = ref(store.getLastUsedDate() || formatDate(new Date()));
const user = computed(() => store.getCurrentUser());

const dayData = ref<NewWeekDataType[]>(
  getWeeklyData(user.value.projectData, formattedDate.value)
);
const weekRange = ref<{ firstDayOfWeek: string; lastDayOfWeek: string } | null>(
  getWeekRange(formattedDate.value)
);

watch(user, (newUser, oldUser) => {
  dayData.value = getWeeklyData(user.value.projectData, formattedDate.value);
});

watch(selected, (newValue) => {
  formattedDate.value = formatDate(newValue!);
  weekRange.value = getWeekRange(formattedDate.value);
  dayData.value = getWeeklyData(user.value.projectData, formattedDate.value);
  store.setLastUsedDate(formattedDate.value);
});

const handleClick = (dayId: string) => {
  store.setLastUsedDate(dayId);
  router.push({ path: `/new/day/${dayId}` });
};

const handleNext = () => {
  selected.value = adjustDateByWeek(formattedDate.value, "forward");
};

const handlePrevious = () => {
  selected.value = adjustDateByWeek(formattedDate.value, "backward");
};

const dateSelected = (selectedDate: Date) => {
  selected.value = formatDate(selectedDate);
};
</script>

<style></style>
