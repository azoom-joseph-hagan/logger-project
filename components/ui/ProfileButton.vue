<template>
  <v-menu>
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
      <v-list-item
        v-for="(user, index) in users"
        :key="index"
        :value="user.name"
        @click="handleSelect(user.id)"
      >
        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- <v-autocomplete
      :items="users"
      label="Select an user"
      item-title="name"
      item-value="id"
    ></v-autocomplete> -->
  </v-menu>
</template>

<script lang="ts" setup>
import { useUserStore } from "../../stores/userStoreNew";

const store = useUserStore();
const users = store.getAllUsers();
const user = computed(() => store.getCurrentUser());

const handleSelect = (id: number) => {
  store.setCurrentUser(id);
};
</script>
