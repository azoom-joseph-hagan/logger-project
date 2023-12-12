<template>
  <v-row>
    <v-col>
      <v-card-item>
        <div>
          <div class="d-flex justify-center align-center py-4">
            <div class="d-flex flex-column justify-center align-center">
              <div class="d-flex">
                <v-btn variant="tonal" class="text-overline mb-2 text-blue">
                  2023/12/06
                </v-btn>
                <ProfileButton :name="user?.name" :image="user?.image" />
              </div>
              <v-row class="mt-2 d-flex">
                <BackButton
                  color="black"
                  variant="outlined"
                  :handleBack="handleBack"
                  :disabled="!canGoBack"
                />
                <div class="text-h5 text-center font-weight-bold mb-5 mx-3">
                  今週の時間登録
                </div>
                <NextButton
                  :handleNext="handleNext"
                  :disabled="!canGoForward"
                />
              </v-row>
            </div>
          </div>
          <v-card color="grey-lighten-3 mx-auto" max-width="800">
            <WeekViewRow
              v-for="(day, index) in dayData"
              :dayData="day"
              @button-clicked="handleClick(+index + 1)"
            />
          </v-card>
        </div>
      </v-card-item>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../../../../stores/userStore";
const { userId, weekId } = useRoute().params;

const router = useRouter();
const store = useUserStore();
const user = store.getUserFromId(+userId);
const dayData = user && user.weekData[+weekId - 1];

const canGoBack = computed(() => +weekId > 1);

const canGoForward = computed(() => user && +weekId < user.weekData.length);

const handleClick = (dayId: number) => {
  router.push({ path: `/users/${userId}/week/${weekId}/day/${dayId}` });
};

const handleBack = () => {
  if (canGoBack.value) {
    router.push({ path: `/users/${userId}/week/${+weekId - 1}/` });
  }
};

const handleNext = () => {
  if (canGoForward.value) {
    router.push({ path: `/users/${userId}/week/${+weekId + 1}/` });
  }
};
</script>
