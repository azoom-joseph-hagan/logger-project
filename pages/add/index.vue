<template>
  <ClientOnly>
    <div>
      <h2 class="pt-5">Add New User</h2>
      <v-text-field label="New Name" v-model="nameRef"></v-text-field>
      <v-text-field label="id" v-model.number="idRef"></v-text-field>
      <v-btn @click="createUser">Add</v-btn>
      <div v-for="user in users">
        <p class="pa-2">{{ user.name }} {{ user.id }}</p>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/userStore";
const store = useUserStore();

const nameRef = ref("");
const idRef = ref(null);

const users = store.users;

const createUser = () => {
  const userObject = {
    name: nameRef.value,
    id: idRef.value,
    image: `https://randomuser.me/api/portraits/men/${idRef.value}.jpg`,
    weekData: [
      [
        {
          day: "Monday",
          date: "15-01-2023",
          totalLoggedTimeMins: 480,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Tuesday",
          date: "16-01-2023",
          totalLoggedTimeMins: 450,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Wednesday",
          date: "17-01-2023",
          totalLoggedTimeMins: 500,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Thursday",
          date: "18-01-2023",
          totalLoggedTimeMins: 480,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Friday",
          date: "19-01-2023",
          totalLoggedTimeMins: 390,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Saturday",
          date: "20-01-2023",
          totalLoggedTimeMins: 0,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Sunday",
          date: "21-01-2023",
          totalLoggedTimeMins: 0,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
      ],
      [
        {
          day: "Monday",
          date: "22-01-2023",
          totalLoggedTimeMins: 480,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Tuesday",
          date: "23-01-2023",
          totalLoggedTimeMins: 450,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Wednesday",
          date: "24-01-2023",
          totalLoggedTimeMins: 500,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Thursday",
          date: "25-01-2023",
          totalLoggedTimeMins: 480,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Friday",
          date: "26-01-2023",
          totalLoggedTimeMins: 390,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Saturday",
          date: "27-01-2023",
          totalLoggedTimeMins: 0,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
        {
          day: "Sunday",
          date: "28-01-2023",
          totalLoggedTimeMins: 0,
          totalTrackedTimeMins: 0,
          percentageTrackedTime: 0,
          trackedProjects: [],
        },
      ],
    ],
  };
  console.log("added user: ", userObject);
  store.addUser(userObject);
};
</script>

<style></style>
