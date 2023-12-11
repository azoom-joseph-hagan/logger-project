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
                      v-if="user"
                      :name="user.name"
                      :image="user.image"
                    />
                  </div>
                </div>
              </div>
              <div v-if="user">
                <h1>{{ user.name }}</h1>
              </div>
            </div>
            <v-text-field
              label="New Name"
              v-model.number="input"
            ></v-text-field>
            <v-btn variant="outlined" @click="changeUsername">Change</v-btn>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../../stores/userStore";
const store = useUserStore();
const input = ref("");

const { userId } = useRoute().params;
const user = store.getCurrentUser(+userId);

const changeUsername = () => {
  store.updateUsername(+userId, input.value);
};

const handleBack = () => {
  console.log("BACK");
};

const handleNext = () => {
  console.log("NEXT");
};
</script>
