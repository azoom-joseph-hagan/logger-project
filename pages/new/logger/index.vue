<template>
  <v-row>
    <v-col v-if="dayData">
      <v-card-item>
        <div>
          <div class="d-flex justify-center align-center py-4">
            <div class="d-flex flex-column justify-center align-center">
              <div class="d-flex">
                <v-menu :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="tonal"
                      v-bind="props"
                      class="text-overline mb-2 text-blue"
                    >
                      {{ formattedDate }}
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-date-picker v-model="selected" hide-header>
                      </v-date-picker>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <ProfileButton :name="user?.name" :image="user?.image" />
              </div>
              <v-row class="mt-2 d-flex">
                <div class="text-h6 text-center font-weight-bold mb-5 mx-3">
                  {{ weekRange?.firstDayOfWeek }} -
                  {{ weekRange?.lastDayOfWeek }}
                </div>
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
import { getWeeklyData, getWeekRange } from "../../../util/dateRanges";

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

const userId = 1;

const router = useRouter();
const store = useUserStore();
const user: NewUserType = store.getUserFromId(userId);
const formattedDate = ref(formatDate(new Date()));
const dayData = ref<NewWeekDataType[]>(
  getWeeklyData(user.projectData, formattedDate.value)
);
const selected = ref(null);
const weekRange = ref<{ firstDayOfWeek: string; lastDayOfWeek: string } | null>(
  getWeekRange(formattedDate.value)
);

function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

watch(selected, (newValue) => {
  console.log(selected.value);
  formattedDate.value = formatDate(newValue!);
  console.log(formatDate(newValue!));
  weekRange.value = getWeekRange(formattedDate.value);
  dayData.value = getWeeklyData(user.projectData, formattedDate.value);
});

const handleClick = (dayId: string) => {
  router.push({ path: `/new/day/${dayId}` });
  console.log("Clicked");
};
</script>

<style></style>
