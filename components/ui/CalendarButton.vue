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
          <v-date-picker @input="onDateSelected" hide-header> </v-date-picker>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
const props = defineProps(["text", "model"]);
const date = ref(null);

const emit = defineEmits(["dateSelected"]);

const onDateSelected = (selectedDate) => {
  emit("dateSelected", selectedDate);
};

const menu = ref(false);
</script>

<style></style>
