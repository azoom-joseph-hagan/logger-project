<template>
  <v-row>
    <v-col v-if="dayData">
      <section class="logger-card">
        <div class="card-inner">
          <div class="header">
            <div class="button-container">
              <CalendarButton
                :formattedDate="formattedDate"
                @date-selected="dateSelected"
              />
              <ProfileButton />
            </div>
            <v-row class="date-container">
              <BackButton :handleBack="handlePrevious" />
              <div class="date-wrapper">
                <p class="date">
                  {{ weekRange?.firstDayOfWeek }} -
                  {{ weekRange?.lastDayOfWeek }}
                </p>
              </div>
              <NextButton :handleNext="handleNext" />
            </v-row>
          </div>
        </div>
        <div class="week-container">
          <div class="week-rows" v-if="dayData.length !== 0">
            <WeekViewRow
              v-for="(day, index) in dayData"
              :dayData="day"
              @button-clicked="handleClick(day.date)"
            />
          </div>
          <div v-else>
            <p>No data</p>
          </div>
        </div>
      </section>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import { computed, ref, watch, onMounted } from "vue";
import {
  getWeeklyData,
  getWeekRange,
  formatDate,
  adjustDateByWeek,
} from "../../util/dateFunctions";
import type { WeekDataType } from "~/types";

const router = useRouter();
const store = useUserStore();

const selected = ref<Date | string | null>(null);

const formattedDate = ref(store.getLastUsedDate() || formatDate(new Date()));
const user = computed(() => store.getCurrentUser());

const dayData = ref<WeekDataType[]>(
  getWeeklyData(user.value?.projectData || [], formattedDate.value)
);

onMounted(() => {
  if (user.value) {
    store.setCurrentUser(user.value.id);
  }
});

const weekRange = ref<{ firstDayOfWeek: string; lastDayOfWeek: string } | null>(
  getWeekRange(formattedDate.value)
);

watch(user, (newUser) => {
  if (newUser) {
    dayData.value = getWeeklyData(newUser.projectData, formattedDate.value);
  }
});

watch(selected, (newValue) => {
  formattedDate.value = formatDate(newValue!);
  weekRange.value = getWeekRange(formattedDate.value);
  if (user.value) {
    dayData.value = getWeeklyData(user.value.projectData, formattedDate.value);
  }
  store.setLastUsedDate(formattedDate.value);
});

const handleClick = (dayId: string) => {
  store.setLastUsedDate(dayId);
  router.push({ path: `/day/${dayId}` });
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

<style lang="scss" scoped>
.logger-card {
  background-color: #f6f6f6;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
}
.card-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 2rem;

  > .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.button-container {
  display: flex;
}

.date-container {
  margin-top: 0.5rem;
}

.date-wrapper {
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem 2rem 1rem 3rem;
  text-align: center;
  color: #4e4e4e;

  > .date {
    display: inline-block;
  }

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
}

.week-container {
  max-width: 750px;
  background-color: #ededed;
  border-radius: 0.5rem;
  margin: 0 auto;
}
.week-rows {
  margin-left: auto;
  margin-right: auto;
  margin: 0 auto;
}
</style>
