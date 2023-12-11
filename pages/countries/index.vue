<template>
  <ul>
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { createClient } from "@supabase/supabase-js";
import { onMounted, ref } from "vue";
const supabase = createClient(
  "https://dvnfdxnsscljdhkccqaq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2bmZkeG5zc2NsamRoa2NjcWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyNTM1NDksImV4cCI6MjAxNzgyOTU0OX0.lwwufLS6erUmK4BFhHjTpCkhjkw9OZfjtmATtT25TkI"
);
const countries = ref([]);

async function getCountries() {
  const { data } = await supabase.from("countries").select();
  countries.value = data;
}

onMounted(() => {
  getCountries();
});
</script>

<style></style>
