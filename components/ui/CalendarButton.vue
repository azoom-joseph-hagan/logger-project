<template>
  <div>
    <v-menu :close-on-content-click="false">
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
          <v-date-picker v-model="date" hide-header> </v-date-picker>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, watch } from "vue";
const props = defineProps(["formattedDate"]);
const date = ref(null);

const emit = defineEmits(["dateSelected"]);

watch(date, (newDate) => {
  emit("dateSelected", date.value);
});
</script>
