<template>
  <v-menu
    :close-on-content-click="false"
    v-model="menuOpen"
    content-class="custom-autocomplete-menu"
    location="bottom center"
  >
    <template v-slot:activator="{ props }">
      <v-btn variant="tonal" class="ml-2" v-bind="props">
        <div class="d-flex font-weight-bold text-overline align-center">
          <p class="mr-2">
            {{ user?.name }}
          </p>
          <v-avatar size="small">
            <v-img v-if="user?.image" alt="Avatar" :src="user.image"></v-img
          ></v-avatar>
        </div>
      </v-btn>
    </template>
    <v-list>
      <v-list-item class="ma-0 px-2" min-width="250">
        <v-autocomplete
          v-model="model"
          auto-select-first
          density="comfortable"
          hide-details="auto"
          clearable
          placeholder="Select Staff"
          :items="users"
          item-title="name"
          item-value="name"
          return-object
          variant="outlined"
        ></v-autocomplete>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import type { NewUserType } from "~/types";
import { useUserStore } from "../../stores/userStore";

const store = useUserStore();
const users = store.getAllUsers();
const user = computed(() => store.getCurrentUser());

const menuOpen = ref(false);
const model = ref<NewUserType | null>(null);

watch(model, (oldVal) => {
  if (model.value) {
    menuOpen.value = false;
    store.setCurrentUser(model.value.id);
  }
});
</script>
