<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="800" variant="elevated">
          <v-card-item>
            <div>
              <div class="d-flex justify-center align-center py-4">
                <div class="d-flex flex-column justify-center align-center">
                  <div class="d-flex justify-center align-center">
                    <v-btn variant="tonal" class="text-overline text-blue">
                      2023/12/06
                    </v-btn>
                    <ProfileButton :name="user?.name" :image="user?.image" />
                  </div>
                </div>
              </div>
              <h1>{{ userFromStore.name }}</h1>
              <h2>{{ userFromStore.id }}</h2>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userData } from "../../../data/data";
import { useUserStore } from "../../../stores/userStore";
const { userId } = useRoute().params;
const store = useUserStore();
const userFromStore = store.users[+userId - 1];
console.log("User from store: ", userFromStore);

const router = useRouter();

const users = ref(userData);
const user = users.value.find((user) => user.id === +userId);

const handleClick = (dayId: number) => {
  console.log("Clicked");
  router.push({ path: `/users/${userId}/week/${dayId}` });
};

const handleBack = () => {
  console.log("BACK");
};

const handleNext = () => {
  console.log("NEXT");
};
</script>
