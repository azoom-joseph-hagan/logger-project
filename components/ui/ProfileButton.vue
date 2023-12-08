<template>
  <v-btn variant="tonal" class="ml-2">
    <div class="d-flex font-weight-bold text-overline align-center">
      <p class="mr-2">
        {{ name }}
      </p>

      <v-avatar size="small">
        <v-img v-if="image" alt="Avatar" :src="image"></v-img
      ></v-avatar>
    </div>
  </v-btn>
</template>

<script lang="ts" setup>
const props = defineProps(["name", "image"]);
</script>
