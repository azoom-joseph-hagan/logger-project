<template>
  <ClientOnly>
    <div>
      <v-card max-width="600" class="mx-auto">
        <h2 class="pt-5 mb-5">Add New User</h2>
        <v-text-field label="New Name" v-model="nameRef"></v-text-field>
        <v-text-field label="id" v-model.number="idRef"></v-text-field>
        <v-btn color="success" block @click="createUser">Add</v-btn>
        <div v-for="user in users">
          <p class="pa-2">{{ user.name }} {{ user.id }}</p>
        </div>
      </v-card>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/userStoreNew";
const store = useUserStore();

const nameRef = ref("");
const idRef = ref(store.users.length + 1);

const users = store.users;

const createUser = () => {
  const userObject = {
    name: nameRef.value,
    id: idRef.value,
    image: `https://randomuser.me/api/portraits/men/${idRef.value}.jpg`,
    projectData: [
      {
        date: "2022-12-15",
        day: "木",
        totalLoggedTimeMins: 0,
        totalTrackedTimeMins: 0,
        percentageTrackedTime: 0,
        trackedProjects: [],
      },
      {
        date: "2023-02-15",
        day: "水",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-07",
        day: "木",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-08",
        day: "金",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-09",
        day: "土",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 0,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-10",
        day: "日",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 0,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-11",
        day: "月",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-12",
        day: "火",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-13",
        day: "水",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-14",
        day: "木",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-15",
        day: "金",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-16",
        day: "土",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 0,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-17",
        day: "日",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 0,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-18",
        day: "月",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-19",
        day: "火",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-20",
        day: "水",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-21",
        day: "木",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-22",
        day: "金",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-23",
        day: "土",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 0,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-24",
        day: "日",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 0,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-25",
        day: "月",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
      {
        date: "2023-12-26",
        day: "火",
        percentageTrackedTime: 0,
        totalLoggedTimeMins: 480,
        totalTrackedTimeMins: 0,
        trackedProjects: [],
      },
    ],
  };
  store.addUser(userObject);
  store.setCurrentUser(idRef.value);
};
</script>

<style></style>
