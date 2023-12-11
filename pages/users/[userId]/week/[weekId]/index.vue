<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="800" variant="elevated">
          <v-card-item>
            <div>
              <div class="d-flex justify-space-between align-center py-4">
                <BackButton
                  color="black"
                  variant="outlined"
                  :handleBack="handleBack"
                />
                <div class="d-flex flex-column justify-center align-center">
                  <div class="d-flex">
                    <v-btn variant="tonal" class="text-overline mb-2 text-blue">
                      2023/12/06
                    </v-btn>
                    <ProfileButton :name="user?.name" :image="user?.image" />
                  </div>
                  <div class="text-h5 text-center font-weight-bold mb-5">
                    今週の時間登録
                  </div>
                </div>
                <NextButton :handleNext="handleNext" />
              </div>
              <v-card color="grey-lighten-3">
                <WeekViewRow
                  v-for="(day, index) in dayData"
                  :dayData="day"
                  @button-clicked="handleClick(+index + 1)"
                />
              </v-card>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../../../../stores/userStore";
const { userId, weekId } = useRoute().params;

const router = useRouter();
const store = useUserStore();
const user = store.getCurrentUser(+userId);
const dayData = user && user.weekData[+weekId - 1];

const handleClick = (dayId: number) => {
  router.push({ path: `/users/${userId}/week/${weekId}/day/${dayId}` });
};

const handleBack = () => {
  if (+weekId > 1) {
    router.push({ path: `/users/${userId}/week/${+weekId - 1}/` });
  }
};

const handleNext = () => {
  if (user && +weekId < user.weekData.length) {
    router.push({ path: `/users/${userId}/week/${+weekId + 1}/` });
  }
};
</script>
