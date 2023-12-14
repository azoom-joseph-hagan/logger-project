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
    weekData: [
      [
        {
          day: "月",
          date: "15-01-2023",
          totalLoggedTimeMins: 480,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "火",
          date: "16-01-2023",
          totalLoggedTimeMins: 450,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "水",
          date: "17-01-2023",
          totalLoggedTimeMins: 500,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "木",
          date: "18-01-2023",
          totalLoggedTimeMins: 480,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "金",
          date: "19-01-2023",
          totalLoggedTimeMins: 390,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "土",
          date: "20-01-2023",
          totalLoggedTimeMins: 0,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "日",
          date: "21-01-2023",
          totalLoggedTimeMins: 0,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
      ],
      [
        {
          day: "月",
          date: "22-01-2023",
          totalLoggedTimeMins: 480,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "火",
          date: "23-01-2023",
          totalLoggedTimeMins: 450,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "水",
          date: "24-01-2023",
          totalLoggedTimeMins: 500,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "木",
          date: "25-01-2023",
          totalLoggedTimeMins: 480,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "金",
          date: "26-01-2023",
          totalLoggedTimeMins: 390,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "土",
          date: "27-01-2023",
          totalLoggedTimeMins: 0,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "日",
          date: "28-01-2023",
          totalLoggedTimeMins: 0,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
      ],
    ],
  };
  store.addUser(userObject);
};
</script>

<style></style>
