<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          variant="tonal"
          v-bind="props"
          class="text-overline mb-2 text-blue"
        >
          {{ text }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-date-picker v-model="date"></v-date-picker>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps(["text"]);

const menu = ref(false);
const date = ref(null);
</script>

<style></style>
