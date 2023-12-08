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
                    <ProfileButton
                      :name="userFromStore.name"
                      :image="user?.image"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h1>{{ userFromStore.name }}</h1>
                <h2>{{ userFromStore.id }}</h2>
              </div>
            </div>
            <div>
              <v-text-field
                label="New Name"
                v-model.number="input"
              ></v-text-field>
              <v-btn @click="changeUsername">Change</v-btn>
            </div>
            <div>
              <p>Name and Id: {{ store.nameAndId }}</p>
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
const usersRef = storeToRefs(store);

console.log("UsersRef: ", usersRef.users.value[+userId - 1]);

const userFromStore = usersRef.users.value[+userId - 1];

const input = ref("");

const router = useRouter();

const changeUsername = () => {
  console.log("User Id: ", userId, "Input Value: ", input.value);
  store.updateUsername(+userId, input.value);
};

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
