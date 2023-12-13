<template>
  <div class="d-flex flex-column justify-center align-center">
    <h1>DATE</h1>
    <h2>{{ date }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
const date = route.params.date;
</script>

<style></style>
