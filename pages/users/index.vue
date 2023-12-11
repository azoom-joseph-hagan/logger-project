<template>
  <h1>All Users</h1>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
  <v-btn @click="addUser">Add User</v-btn>
  <v-btn @click="addWeekData">Add Week Data</v-btn>
</template>

<script lang="ts" setup>
import { createClient } from "@supabase/supabase-js";
import { onMounted, ref } from "vue";
const supabase = createClient(
  "https://dvnfdxnsscljdhkccqaq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2bmZkeG5zc2NsamRoa2NjcWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyNTM1NDksImV4cCI6MjAxNzgyOTU0OX0.lwwufLS6erUmK4BFhHjTpCkhjkw9OZfjtmATtT25TkI"
);
const users = ref([]);

async function getUsers() {
  const { data } = await supabase.from("users").select();
  users.value = data;
}

const addUser = async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name: "Craig",
          image: "https://randomuser.me/api/portraits/men/6.jpg",
        },
      ])
      .select();
    if (data) {
      getUsers();
    }
  } catch (error) {
    console.log(error);
  }
};

const addWeekData = async () => {
  console.log("Week data called");
  if (users && users.value.length > 0) {
    const userId = users[0].id;
    const weeksData = [
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
    ];

    console.log([weeksData, userId]);

    // weeksData.forEach(async (week) => {
    //   const { error: weekError } = await supabase
    //     .from("weeks")
    //     .insert([{ week_data: week, user_id: userId }]);

    //   if (weekError) {
    //     console.error("Error inserting week data:", weekError);
    //   }
    // });
  }
};

onMounted(() => {
  getUsers();
});
</script>

<style></style>
