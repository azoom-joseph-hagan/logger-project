<template>
  <div>
    <v-menu :close-on-content-click="false" v-model="menuOpen">
      <template v-slot:activator="{ props }">
        <v-btn
          variant="tonal"
          v-bind="props"
          class="text-overline mb-2 text-blue"
        >
          {{ formattedDate }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-date-picker v-model="date" hide-header show-adjacent-months>
          </v-date-picker>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
const props = defineProps(["formattedDate"]);
const date = ref(null);
const menuOpen = ref(false);

watch(date, (oldVal) => {
  menuOpen.value = false;
});

const emit = defineEmits(["dateSelected"]);

watch(date, (newDate) => {
  emit("dateSelected", date.value);
});
</script>
